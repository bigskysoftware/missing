#!/usr/bin/env -S deno run --allow-read=. --allow-write=.

import { join, basename, dirname } from "std/path/mod.ts";
import { extract } from "lume/deps/front_matter.ts";

const distDir = "dist";
const artifactsDir = "releases/_artifacts";

function artifact(release: string, artifact: string) {
    const src = join(distDir, artifact);
    const dst = join(artifactsDir, release, artifact);
    Deno.mkdirSync(dirname(dst), { recursive: true });
    return Deno.copyFile(src, dst);
}

function release(filePath: string) {
    const release = "v" + basename(filePath).split(".").slice(0, -1).join(".");
    const text = Deno.readTextFileSync(filePath);
    const frontmatter = extract(text).attrs;
    const artifactsObject = frontmatter["artifacts"] as Tree<string>;
    const artifacts = leaves(artifactsObject);
    artifacts.forEach(a => artifact(release, a));
}

function leaves(tree: Tree<string>): string[] {
    return Object.values(tree).flatMap(node => {
        if (typeof node === "string") return node;
        return leaves(node);
    })
}

interface Tree<T> { [key: string]: T | Tree<T> }

release(Deno.args[0])
