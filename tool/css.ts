import {
  browserslistToTargets,
  bundle,
  transform,
} from "npm:lightningcss@1.21.7";
import browserslist from "npm:browserslist";
import { dirname } from "std/path/dirname.ts";

const input = Deno.args[0],
  output = Deno.args[1] ?? input.replace("src/", "dist/"),
  outputMin = output.replace(/.css$/i, ".min.css");

// Compile

const compile = bundle({
  filename: input,
  drafts: { nesting: true },
  errorRecovery: true,
  minify: false,
  targets: browserslistToTargets(
    browserslist(">= 0.25% and not ie 11"),
  ),
});

// Show errors

for (
  const { loc: { column, line, filename }, type, message } of compile.warnings
) {
  console.warn(
    `\n%c%s%c:%c%s%c:%c%s%c\n%s %c%s`,
    "color: #ff0",
    filename,
    "color: #066",
    "color: #099",
    line,
    "color: #066",
    "color: #099",
    column,
    "font-weight: bold",
    message,
    "color: grey",
    type,
  );
}

await Deno.mkdir(dirname(output), { recursive: true });
await Deno.writeFile(output, compile.code);

// Minify

const minify = transform({
  code: compile.code,
  filename: output,
  drafts: { nesting: true },
  errorRecovery: true,
  minify: true,
});

await Deno.mkdir(dirname(outputMin), { recursive: true });
await Deno.writeFile(outputMin, minify.code);
