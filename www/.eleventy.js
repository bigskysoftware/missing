
const postcss = require('../build/postcss.js')
const { EleventyRenderPlugin } = require("@11ty/eleventy")

module.exports = eleventyConfig => {
	eleventyConfig.on('eleventy.before', postcss)

	eleventyConfig.addPlugin(EleventyRenderPlugin)


	return {
		dir: {
			input: 'www/',
			output: 'dist/'
		}
	}
}

