#!/bin/sh
set -e

root_dist=$(realpath dist)

command -v git grep deno

rm -rf dist/src.tmp.d
git clone . dist/src.tmp.d
(
    cd dist/src.tmp.d
    git tag --list | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+' | while read tag
    do
        echo "${0}: Checking out $tag"
        git checkout $tag
        echo "${0}: Building $tag"
        deno task css

        echo "${0}: Built, placing into /$tag/"
        mkdir -p $root_dist/archive/$tag
        cp dist/missing.* $root_dist/archive/$tag/
    done
)
rm -rf dist/src.tmp.d
deno task css
