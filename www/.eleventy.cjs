

module.exports = eleventyConfig => {
	const postcss = import('../build/postcss.js')

	// Build missing.css
	eleventyConfig.on('eleventy.before', async () => (await postcss).default())
	eleventyConfig.addWatchTarget('src')
	eleventyConfig.addWatchTarget('build')

	eleventyConfig.addCollection('demos', coll => coll.getFilteredByGlob('www/demos/*'))

	const mdContainer = require("../node_modules/@gerhobbelt/markdown-it-container/dist/markdownItContainer.cjs")
	eleventyConfig.setLibrary('md',
		require("markdown-it")({
			html: true,
			breaks: false,
			linkify: true
		})
		.use(require("markdown-it-attrs"))
		.use(require("markdown-it-deflist"))
		.use(mdContainer, "box")
	)

	return {
		dir: {
			input: 'www/',
			output: 'dist/',
			includes: 'includes/',
		},
		htmlTemplateEngine: 'njk',
	}
}

