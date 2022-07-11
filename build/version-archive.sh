#!/bin/sh
set -e
{
    command -v git
    command -v grep
    command -v deno
} >&-

project_root=$(realpath .)
repo=$project_root # TODO: add fast path of cloning from existing repo (doesn't work in netlify build)
cd $(mktemp -d)
git clone $repo .;                                 echo "Cloned into $PWD" >&2

git tag --list \
| grep -E '^v[0-9]+\.[0-9]+\.[0-9]+' \
| while read tag; do
    echo "# Tag $tag #" >&2
    git switch --detach $tag;                      echo "Checked out $tag" >&2

    deno task css;                                 echo "Built $tag" >&2

    destdir="$project_root/dist/archive/$tag/"
    mkdir -p $destdir
    cp dist/missing* $destdir;                     echo "Placing into /$tag/" >&2
done
