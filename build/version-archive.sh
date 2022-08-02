#!/bin/sh
set -e
{
    command -v git
    command -v grep
    command -v deno
} >/dev/null

project_root=$(realpath .)
repo=https://github.com/bigskysoftware/missing # TODO: add fast path of cloning from existing repo (doesn't work in netlify build)

function build_version {
    local tag="$1"

    local destdir="$project_root/dist/archive/$tag/"
    mkdir -p $destdir

    local cached="$project_root/.missingcss-releases-cache/$tag/"
    if [ -d "$cached" ]; then
        cp "$cached"/* "$destdir";                 echo "Copying $tag artifacts from cache"
    else
        if [ -z "$cloned" ]; then
            cloned=$(mktemp -d)
            cd "$cloned"
            git clone $repo .;                     echo "Cloned into $PWD" >&2
        fi
        git switch --detach $tag;                  echo "Checked out $tag" >&2
        deno task css;                             echo "Built $tag" >&2
        mkdir -p "$cached"
        cp dist/missing* "$cached";                echo "Caching $tag artifacts" >&2
        cp dist/missing* $destdir;                 echo "Placing into /$tag/" >&2
    fi


}

git tag --list \
| grep -E '^v[0-9]+\.[0-9]+\.[0-9]+' \
| while read tag; do
    echo "# Tag $tag #" >&2
    build_version $tag
done

