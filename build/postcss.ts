import * as path from "std/path/mod.ts";
import postcss from "https://esm.sh/postcss@8.4.16";
import nesting from "https://esm.sh/postcss-nesting@10.1.7?dev&deps=postcss@8.4.16";
import atImport from "https://esm.sh/postcss-easy-import@4.0.0?dev&deps=postcss@8.4.16";
import mixins from "https://esm.sh/postcss-mixins@9.0.2?dev&deps=postcss@8.4.16";
import autoprefixer from "https://esm.sh/autoprefixer@10.4.7?dev&deps=postcss@8.4.16";
import csso from "https://esm.sh/csso@3.5.1";

const dist = "dist";

const pc = postcss([
  atImport(),
  nesting(),
  mixins(),
  autoprefixer({ overrideBrowserslist: ">1% and not ie 11" }),
]);

const buildFile = async (entrypoint: string, targetName: string) => {
  const src = await Deno.readTextFile(entrypoint);
  const dest = path.join(dist, targetName + ".css");
  const destMinified = path.join(dist, targetName + ".min.css");

  const result = await pc.process(src, {
    from: entrypoint,
    to: dest,
  });

  const output = result.css;

  const outputMinified = csso.minify(result.css).css;

  await Deno.mkdir(dist, { recursive: true });
  await Promise.all([
    write(output, dest),
    write(outputMinified, destMinified),
  ]);
};

const build = () => {
  buildFile("src/main.css", "missing");
  buildFile("src/syntax.css", "missing-prism");
};

const write = async (data: string, path: string | URL) => {
  await Deno.writeTextFile(path, data);
  if (import.meta.main) console.log("Wrote " + path);
};

export default build;
if (import.meta.main) await build();
