#!/usr/bin/env -S deno run -A --no-lock --node-modules-dir=none

import stylelint from 'npm:stylelint';
import browserCompat from 'npm:stylelint-browser-compat';
import { resolve } from 'jsr:@std/path/resolve'

const result = await stylelint.lint({
  cwd: resolve(import.meta.dirname, '../../../..'),
  files: 'src/**/*.css',
  formatter: 'string',
  config: {
    plugins: [browserCompat],
    rules: {
      'plugin/browser-compat': [
        true,
        {
          allow: {
            features: ['at-rules.supports'],
            flagged: false,
            partialImplementation: false,
            prefix: true,
          },
          browserslist: [Deno.env.get("BROWSERSLIST")],
        },
      ],
    },
  },
});

if (result.errored) {
  console.log(result.report);
  Deno.exit(1);
}
