
import { join, dirname, fromFileUrl } from 'https://deno.land/std@0.139.0/path/mod.ts'

import { gzip } from "https://deno.land/x/compress@v0.4.5/mod.ts"
import { compress as brotli } from 'https://deno.land/x/brotli@v0.1.4/mod.ts'

import postcss from "https://esm.sh/postcss"

// Plugins
import nesting from 'https://esm.sh/postcss-nesting?dev'
import customSelectors from 'https://esm.sh/postcss-custom-selectors?dev'
import atImport from 'https://esm.sh/postcss-import?dev'
import importGlob from 'https://esm.sh/postcss-import-ext-glob?dev'
import mixins from 'https://esm.sh/postcss-mixins?dev'
import autoprefixer from 'https://esm.sh/autoprefixer?dev'

import csso from 'https://esm.sh/csso@3.5.1'

// Paths
console.log(import.meta.url)
const __dirname = dirname(fromFileUrl(import.meta.url))

const entrypoint = join(__dirname, '../src/main.css')
const dist       = join(__dirname, '../dist/')

const prodTarget = join(dist, '/missing.min.css')
const devTarget  = join(dist, '/missing.css')

const dec = new TextDecoder
const enc = new TextEncoder

const build = async () => {
	const postcssMain = postcss([
		importGlob(),
		atImport(),
		nesting(),
		customSelectors(),
		mixins(),
		autoprefixer({ overrideBrowserslist: ">1% and not ie 11" }),
	])

	const css = dec.decode(await Deno.readFile(entrypoint))

	await Deno.mkdir(dist, { recursive: true })

	const result =
		await postcssMain.process(css, { from: entrypoint, to: devTarget })
	const outputCss = enc.encode(result.css)
	await w(outputCss, devTarget)

	const minifyResult = csso.minify(result.css)
	const minifiedCSS = enc.encode(minifyResult.css)
	await w(minifiedCSS, prodTarget)

	await Promise.all([
		w(brotli(minifiedCSS), prodTarget + ".br"),
		w(gzip  (minifiedCSS), prodTarget + ".gz"),
	])
}


const w = async (data: Uint8Array, path: string | URL) => {
	await Deno.writeFile(path, data)
	console.log("Wrote " + path)
}

if (import.meta.main) await build()

export default build

