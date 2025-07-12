import stylelint from 'npm:stylelint';
import noUnsupportedBrowserFeatures from 'npm:stylelint-no-unsupported-browser-features';
import { resolve } from 'jsr:@std/path/resolve'

async function checkCssCompact() {
  const result = await stylelint.lint({
    cwd: resolve(import.meta.dirname, '../'),
    files: 'src/**/*.css',
    formatter: 'string',
    config: {
      plugins: [noUnsupportedBrowserFeatures],
      rules: {
        'plugin/no-unsupported-browser-features': [true, {
          browsers: "> 0.9% and last 2 versions and not dead",
          ignorePartialSupport: true,
        }],
      },
    },
  });

  if (result.errored) {
    console.log(result.report);
    Deno.exit(1);
  }
}

checkCssCompact();
