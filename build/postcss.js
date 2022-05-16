import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { brotliCompress as brotli, gzip } from 'node:zlib'

import postcss from 'postcss'

// Plugins

import nesting from 'postcss-nesting'
import customSelectors from 'postcss-custom-selectors'
import atImport from 'postcss-import'
import importGlob from 'postcss-import-ext-glob'
import mixins from 'postcss-mixins'
import cssnano from 'cssnano'


// Paths
const __dirname = dirname(fileURLToPath(import.meta.url))

const entrypoint = join(__dirname, '../src/main.css')
const dist       = join(__dirname, '../dist/')

const prodTarget = join(dist, '/missing.min.css')
const devTarget  = join(dist, '/missing.css')


const build = async () => {
	const postcssMain = postcss([
		importGlob(),
		atImport(),
		nesting(),
		customSelectors(),
		mixins(),
	])

	const postcssMinifier = postcss([cssnano({ preset: 'default' })])

	const css = await readFile(entrypoint, { encoding: 'utf8' })

	await mkdir(dist, { recursive: true })

	const result =
		await postcssMain.process(css, { from: entrypoint, to: devTarget })
	await w(result.css, devTarget)

	const { css: minifiedCSS } =
		await postcssMinifier.process(result, { from: entrypoint, to: prodTarget })
	await w(minifiedCSS, prodTarget)

	await Promise.all([
		compress(minifiedCSS, brotli).then(c => w(c, prodTarget + ".br")),
		compress(minifiedCSS, gzip  ).then(c => w(c, prodTarget + ".gz")),
	])
}

const compress = (data, compressor) => new Promise((resolve, reject) =>
	compressor(data, (err, compressed) => {
		if (err) reject(err)
		else resolve(compressed)
	})
)

const w = async (data, path) => {
	await writeFile(path, data, { flag: "w" })
	console.log("Wrote " + path)
}

build()

export default build

