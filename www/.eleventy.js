
const postcss = require('../build/postcss.js')

module.exports = eleventyConfig => {

	// Build missing.css
	eleventyConfig.on('eleventy.before', postcss)
	eleventyConfig.addWatchTarget('src')
	eleventyConfig.addWatchTarget('build')

	return {
		dir: {
			input: 'www/',
			output: 'dist/',
			includes: 'includes/',
		},
		htmlTemplateEngine: 'njk',
	}
}

