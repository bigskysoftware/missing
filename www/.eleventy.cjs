

module.exports = eleventyConfig => {
	const postcss = import('../build/postcss.js')

	// Build missing.css
	eleventyConfig.on('eleventy.before', async () => (await postcss).default)
	eleventyConfig.addWatchTarget('src')
	eleventyConfig.addWatchTarget('build')

	eleventyConfig.addCollection('demos', coll => coll.getFilteredByGlob('www/demos/*'))

	return {
		dir: {
			input: 'www/',
			output: 'dist/',
			includes: 'includes/',
		},
		htmlTemplateEngine: 'njk',
	}
}

