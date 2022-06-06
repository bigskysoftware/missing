
import { join, dirname, fromFileUrl } from 'https://deno.land/std@0.139.0/path/mod.ts'

import { gzip } from "https://deno.land/x/compress@v0.4.5/mod.ts"
import { compress as brotli } from 'https://deno.land/x/brotli@v0.1.4/mod.ts'

import postcss from "https://esm.sh/postcss@8.4.3"

// Plugins
import nesting from "https://esm.sh/postcss-nesting@10.1.7?dev"
import customSelectors from "https://esm.sh/postcss-custom-selectors@6.0.0?dev"
import atImport from "https://esm.sh/postcss-easy-import@4.0.0?dev"
import mixins from "https://esm.sh/postcss-mixins@9.0.2?dev"
import autoprefixer from "https://esm.sh/autoprefixer@10.4.7?dev"

import csso from 'https://esm.sh/csso@3.5.1'

// Paths
const __dirname = dirname(fromFileUrl(import.meta.url))

const main = join(__dirname, '../src/main.css')
const syntax = join(__dirname, '../src/syntax.css')

const dist = join(__dirname, '../dist/')

const dec = new TextDecoder
const enc = new TextEncoder

const buildFile = async (entrypoint: string, targetName: string) => {
	const prodTarget = join(dist, targetName + '.min.css')
	const devTarget  = join(dist, targetName + '.css')

	const postcssMain = postcss([
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
	
	const minifyResult = csso.minify(result.css)
	const minifiedCSS = enc.encode(minifyResult.css)
	
	await Promise.all([
		w(outputCss, devTarget),
		w(minifiedCSS, prodTarget),
		w(brotli(minifiedCSS), prodTarget + ".br"),
		w(gzip  (minifiedCSS), prodTarget + ".gz"),
	])
}

const build = () => {
	buildFile(main, "missing")
	buildFile(syntax, "missing-prism")
}

const w = async (data: Uint8Array, path: string | URL) => {
	await Deno.writeFile(path, data)
	console.log("Wrote " + path)
}

if (import.meta.main) {
	await build()
}

export default build

