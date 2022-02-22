
# Contribute to missing.css


## Development Environment

Node.js and npm are needed.

  * Get set up:
      ~~~ sh
      npm install
      ~~~

  * Build just the CSS:
      ~~~ sh
      npm run build
      ~~~

  * Build the website, which also builds the CSS:
      ~~~ sh
      npm run www
      ~~~

  * Start a development server, which will watch the code and automatically
    refresh in the browser:
      ~~~ sh
      npm run dev
      ~~~


## Project Structure

  * `src/` -- the CSS source code. This is processed with PostCSS (see build/).
      * `main.css` -- definitions used project-wide.
      * `core/`
        * `sanitize.css` -- a CSS reset
      * `elements/` -- HTML elements, organized by spec
          * `sections.css` -- 4.1 The document element, 4.3 Sections
          * `grouping.css` -- 4.4 Grouping content
          * `inline.css` -- 4.5 Text-level semantics, 4.7 Edits
          * `embedded.css` -- 4.8 Embedded content
          * `tabular.css` -- 4.9 Tabular data
          * `forms.css` -- 4.10 Forms
          * `interactive.css` -- 4.11 Interactive elements
      * `components/` -- components. Each component can be used as
        a class (`<div class="my-component">`),
        an attribute (<div my-component>) or a custom tag (`<my-component>`).

        Each component should have a documentation comment, explaining its
        purpose, appearance and usage.

  * `www/` -- the project website, built with eleventy
      * `demos/` demo pages. These should have a `name` specified in the
        frontmatter. They will be listed in the demo page (`../demos.md`).

  * `build/` -- buildscripts
      * `postcss.js` -- builds the CSS.

  * `dist/` -- build results. This is also where the built website is.
      * `missing.css` -- unminified dev build
      * `missing.min.css` -- minified
      * `missing.min.css.br` -- minified + gzip compressed
      * `missing.min.css.gz` -- minified + brotli compressed

