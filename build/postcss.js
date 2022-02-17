const fs = require('node:fs/promises')
const path = require('node:path')
const postcss = require('postcss')
const presetEnv = require('postcss-preset-env')
const atImport = require('postcss-import')

const entrypoint = path.join(__dirname, '../src/main.css')
const target     = path.join(__dirname, '../dist/missing.css')

const pc = postcss([
	atImport(),
	presetEnv({ browsers: 'last 2 versions', stage: 1 }),
])

fs.readFile(entrypoint, { encoding: 'utf8' })
	.then(css =>
		pc.process(
			css,
			{
				from: entrypoint,
				to: target,
			},
		)
	).then(result => {
		fs.writeFile(target, result.css)
	})
