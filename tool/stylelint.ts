import stylelint from 'npm:stylelint';
import noUnsupportedBrowserFeatures from 'npm:stylelint-no-unsupported-browser-features';
import { resolve } from 'jsr:@std/path/resolve'

import browsers from './browserslist.json' with { type: 'json' }

async function checkCssCompact() {
  const result = await stylelint.lint({
    cwd: resolve(import.meta.dirname, '../'),
    files: 'src/**/*.css',
    formatter: 'string',
    config: {
      plugins: [noUnsupportedBrowserFeatures],
      rules: {
        'plugin/no-unsupported-browser-features': [true, {
          browsers: browsers.query,
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
