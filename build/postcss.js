const fs = require('node:fs/promises')
const path = require('node:path')

const postcss = require('postcss')

const presetEnv = require('postcss-preset-env')
const atImport = require('postcss-import')
const importGlob = require('postcss-import-ext-glob')


const entrypoint = path.join(__dirname, '../src/main.css')
const dist     = path.join(__dirname, '../dist')
const target     = path.join(dist, '/missing.css')

const pc = postcss([
	importGlob(),
	atImport(),
	presetEnv({ browsers: 'last 2 versions', stage: 1 }),
])

module.exports = async () => {
	const css = await fs.readFile(entrypoint, { encoding: 'utf8' })
	const result = await pc.process(css, {
		from: entrypoint,
		to: target,
	})
	await fs.mkdir(dist, { recursive: true })
	await fs.writeFile(target, result.css, { flag: 'w' })
}

if (require.main === module) module.exports()

