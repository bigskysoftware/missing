const fs = require('node:fs/promises')
const path = require('node:path')

const postcss = require('postcss')

const presetEnv = require('postcss-preset-env')
const atImport = require('postcss-import')
const importGlob = require('postcss-import-ext-glob')
const cssnano = require('cssnano')


const entrypoint = path.join(__dirname, '../src/main.css')
const dist       = path.join(__dirname, '../dist')

const prodTarget = path.join(dist, '/missing.min.css')
const devTarget  = path.join(dist, '/missing.css')

module.exports = async () => {
	const pcMain = postcss([
		importGlob(),
		atImport(),
		presetEnv({
			browsers: 'last 2 versions',
			stage: 0,
			features: {
				'logical-properties-and-values': false,
			},
		}),
	])

	const pcMinifier = postcss([cssnano({ preset: 'default' })])

	const css = await fs.readFile(entrypoint, { encoding: 'utf8' })

	await fs.mkdir(dist, { recursive: true })

	const result =
		await pcMain.process(css, { from: entrypoint, to: devTarget })
	await fs.writeFile(devTarget, result.css, { flag: 'w' })

	const minified =
		await pcMinifier.process(result, { from: entrypoint, to: prodTarget })
	await fs.writeFile(prodTarget, minified.css, { flag: 'w' })
}

module.exports()

