
import { join, dirname, fromFileUrl } from 'https://deno.land/std@0.139.0/path/mod.ts'

import { gzip } from "https://deno.land/x/compress@v0.4.5/mod.ts"
import { compress as brotli } from 'https://deno.land/x/brotli@v0.1.4/mod.ts'

import postcss from "https://esm.sh/postcss@8.4.13"

// Plugins
import nesting from 'https://esm.sh/postcss-nesting?deps=postcss@8.4.13'
import customSelectors from 'https://esm.sh/postcss-custom-selectors?deps=postcss@8.4.13'
import atImport from 'https://esm.sh/postcss-import?deps=postcss@8.4.13'
import importGlob from 'https://esm.sh/postcss-import-ext-glob?deps=postcss@8.4.13'
import mixins from 'https://esm.sh/postcss-mixins?deps=postcss@8.4.13'
import cssnano from 'https://esm.sh/cssnano?deps=postcss@8.4.13'

// Paths
const __dirname = dirname(fromFileUrl(import.meta.url))

const entrypoint = join(__dirname, '../src/main.css')
const dist       = join(__dirname, '../dist/')

const prodTarget = join(dist, '/missing.min.css')
const devTarget  = join(dist, '/missing.css')

const dec = new TextDecoder
const enc = new TextEncoder

const build = async () => {
	const postcssMain = postcss([
		nesting(),
		customSelectors(),
		importGlob(),
		atImport(),
		mixins(),
	])

	// const postcssMinifier = postcss([cssnano({ preset: 'default' })])

	const css = dec.decode(await Deno.readFile(entrypoint))

	await Deno.mkdir(dist, { recursive: true })

	const result =
		await postcssMain.process(css, { from: entrypoint, to: devTarget })
	const outputCss = enc.encode(result.css)
	await w(outputCss, devTarget)

	// const minifyResult =
	// 	await postcssMinifier.process(result, { from: entrypoint, to: prodTarget })
	// const minifiedCSS = enc.encode(minifyResult.css)
	// await w(minifiedCSS, prodTarget)

	// await Promise.all([
	// 	w(brotli(minifiedCSS), prodTarget + ".br"),
	// 	w(gzip  (minifiedCSS), prodTarget + ".gz"),
	// ])
}


const w = async (data: Uint8Array, path: string | URL) => {
	await Deno.writeFile(path, data)
	console.log("Wrote " + path)
}

build()

export default build

