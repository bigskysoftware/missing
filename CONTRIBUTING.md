
# Contribute to missing.css


## Issues

PRs are not the only form of contributing. Reporting issues is also important
and helps a lot. And, like PRs, issues that don't match the project's goals or
standards of quality will not be accepted.

Don't be afraid! We take it upon ourselves to help people contribute. You might
get follow-up questions or asked for more information when you submit an issue.
It's not productive to close issues just because we don't like them.

For feature requests, prefer [Discussions][] instead of Issues, unless the
feature is directly in our [RFP][] or [Concepts][] pages. Otherwise, once a
feature is agreed upon and there is interest in implementing it, issues can be
created.

missing.css is developed on a "free to use, pay to demand" basis. Contributors
are not beholden to users and can work on whatever they like. If you need a
specific feature or bugfix for your business, consider putting up a bounty.
(Not recommended: Making an unsolicited donation and then demanding specific
work. That's not how you buy something).

[RFP]: https://missing.style/rfp/
[Concepts]: https://missing.style/concepts/
[Discussions]: https://github.com/bigskysoftware/missing/discussions


## Development Environment

Install [Deno][] and [Lightning CSS][].

  ~~~ sh
  curl -fsSL deno.land/install.sh | sh # see https://deno.land/manual@v1.36.4/getting_started/installation
  npm i -g lightningcss-cli
  ~~~

  * Build all of missing.css (CSS and JS):
      ~~~ sh
      deno task build
      ~~~

  * Build just the CSS:
      ~~~ sh
      deno task css
      ~~~

  * Start a development server:
      ~~~ sh
      deno task serve
      ~~~
    This will serve the missing.css website, which uses the CSS directly from source.

[Deno]: https://deno.land/
[Lightning CSS]: https://lightningcss.dev/


## Branching

You'll notice that we don't have a `master` or `main` branch. Instead, the 
`dev` branch is the default. This way, the default place to open a pull request
is the right one.

The `prod` branch will contain the last published version of the code.
Changes to the website and docs can also be made directly against the
`prod` branch.

That's it! We don't expect to use feature branches that often, instead working
directly on `dev` because CSS is hard to merge.


## Publishing a release

To publish a new release:

  * Make sure there is a changelog in `www/releases/`:

      ~~~ sh
      cat >www/releases/4.2.0.md <<EOF
      ---
      release: 4.2.0
      ---

      # Changelog

       - **Breaking:**{.color.warn} Removed everything
      EOF
      ~~~
    
    Some older changelogs have a list of `artifacts` -- this is a leftover
    from when we used our own distribution instead of npm.

  * Create a git tag matching the regex `^v\d+\.\d+\.\d+` (i.e.: `v1.2.2`,
    `v1.3.3-special-build-1`, NOT `1.1.2`, `v3`, `v1.2-alpha`). It's important
    that the git tag has the correct format since we use the regex above in
    code.


## Dev Notes

You can note your thoughts and leave notes for maintainers in the `dev-notes`
file. The structure is:

  ~~~
  YYYY-MM-DD

  Your notes here

  -- your-github-username
  ~~~

Leave two empty lines between notes.


## Project Structure

  * `src/` -- the CSS source code. This is processed with Lightning CSS.

  * `www/` -- the project website, built with [Lume]
      * `demos/` -- demo pages. These should have a `name` specified in the
        frontmatter. They will be listed in the demo page (`../demos.md`).
      * `releases/` -- release notes.

  * `dist/` -- build results. This is also where the built website is.
      * `missing.css` -- unminified dev build
      * `missing.min.css` -- minified
      * `missing.min.css.br` -- minified + gzip compressed
      * `missing.min.css.gz` -- minified + brotli compressed
      * `missing-prism.css` (& `.min.css`, etc.) -- [Prism] theme
      * `archive` -- past releases of the above

[Lume]: https://lume.land
[Prism]: https://prismjs.com
