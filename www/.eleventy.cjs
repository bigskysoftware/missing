

module.exports = eleventyConfig => {
	const postcss = import('../build/postcss.js')

	// Build missing.css
	eleventyConfig.on('eleventy.before', async () => (await postcss).default())
	eleventyConfig.addWatchTarget('src')
	eleventyConfig.addWatchTarget('build')

	eleventyConfig.addCollection('demos', coll => coll.getFilteredByGlob('www/demos/*'))

	eleventyConfig.setLibrary('md',
		require("markdown-it")({
			html: true,
			breaks: true,
			linkify: true
		})
		.use(require("markdown-it-attrs"))
		.use(require("markdown-it-deflist"))
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

