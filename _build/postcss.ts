#!/usr/bin/env -S deno run -A --unstable

import * as path from "std/path/mod.ts";
import postcss from "https://esm.sh/postcss@8.4.16";
import nesting from "https://esm.sh/postcss-nesting@10.1.7";
import atImport from "https://esm.sh/postcss-import@15.0.0";
import autoprefixer from "https://esm.sh/autoprefixer@10.4.13";
import csso from "https://esm.sh/csso@3.5.1";

const dist = "dist";

const pc = postcss([
  atImport(),
  nesting(),
  autoprefixer({ overrideBrowserslist: ">1% and not ie 11" }),
]);

export const compile = async () => {
  const builds = await Promise.all([
    compileFile("src/missing.css", "missing"),
    compileFile("src/missing-prism.css", "missing-prism"),
  ])
  return builds.reduce((acc, cur) => Object.assign(acc, cur), {});
};

const build = () => {
  compile().then(write);
};

const write = async (files: Record<string, string>) => {
  await Deno.mkdir(dist, { recursive: true });

  await Promise.all(
    Object.entries(files).map(([filename, content]) =>
      writeFile(content, filename)
    ),
  );
};

export const compileFile = async (
  entrypoint: string,
  targetName: string,
): Promise<Record<string, string>> => {
  const src = await Deno.readTextFile(entrypoint);
  const dest = targetName + ".css";
  const destMinified = targetName + ".min.css";

  const result = await pc.process(src, {
    from: entrypoint,
    to: dest,
  });

  const output = result.css;

  const outputMinified = csso.minify(result.css).css;

  return { [dest]: output, [destMinified]: outputMinified };
};


const writeFile = async (data: string, dest: string) => {
  await Deno.writeTextFile(path.join(dist, dest), data);
  if (import.meta.main) console.log("Wrote " + dest);
};

export default build;
if (import.meta.main) await build();
