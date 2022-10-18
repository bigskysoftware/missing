import { compile } from "../_build/postcss.ts";
export default async function* () {
  for (const [filename, content] of Object.entries(await compile())) {
    yield { url: "/" + filename, content };
  }
}
