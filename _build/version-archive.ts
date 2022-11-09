#!/usr/bin/env -S deno run -A

import $ from "https://deno.land/x/dax@0.15.0/mod.ts";

const projectRoot = $.path.join($.path.fromFileUrl(import.meta.url), "../..");
const repo = "https://github.com/bigskysoftware/missing"; // TODO: add fast path of cloning from existing repo (doesn't work in netlify build)

const clonedRepo = await Deno.makeTempDir();
$.logStep(`Cloning repo into ${clonedRepo}`);
await $.cd(clonedRepo);
await $`git clone ${repo} .`.quiet();

async function buildVersion(gitTag: string) {
  const dest = $.path.join(projectRoot, "/dist/archive/", gitTag);
  await Deno.mkdir(dest, { recursive: true });
  $.logLight("Destination:", dest);
  const cachePath = $.path.join(
    projectRoot,
    "releases/_artifacts",
    gitTag,
  );

  if (await $.exists(cachePath)) {
    $.logLight("Found", gitTag, "in release cache: ", cachePath);
    $.logStep("Copying", gitTag, "artifacts from cache");
    await $.fs.copy(cachePath, dest, { overwrite: true });
  } else {
    $.logStep("Checking out", `${gitTag}`);
    await $`git switch --detach ${gitTag}`.quiet();

    $.logStep(`Building ${gitTag}`);
    await $`deno task css
      || deno run -A --unstable _build/postcss.ts
      `.quiet();

    $.logStep(`Caching ${gitTag} artifacts`);
    $.logStep(`Placing ${gitTag} artifacts into archive/${gitTag}`);
    await Deno.mkdir(cachePath, { recursive: true });
    await $.logGroup(async () => {
      for await (const file of $.fs.expandGlob("missing*", { root: "dist" })) {
        $.logStep(`Copying ${file.path}`);
        await Promise.all([
          $`cp -r ${file.path} ${cachePath}`.quiet(),
          $`cp -r ${file.path} ${dest}`.quiet(),
        ]);
      }
    });
  }
}

for (const line of await $`git tag --list`.lines()) {
  if (/^v\d+\.\d+\.\d+/.test(line)) {
    $.logStep(`Building ${line}`);
    await $.logGroup(() => buildVersion(line));
  }
}
