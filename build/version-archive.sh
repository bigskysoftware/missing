#!/bin/sh
set -e

root_dist=$(realpath dist)
dir=$(mktemp -d)

command -v git
command -v grep
command -v deno

git fetch --tags
echo tags:
git tag --list
git clone . $dir
git fetch --tags

cd $dir
echo "Entered $PWD" >&2

git tag --list | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+' | while read tag
do
    echo "${0}: Checking out $tag" >&2
    git switch --detach $tag
    echo "${0}: Building $tag" >&2
    deno task css

    echo "${0}: Built, placing into /$tag/" >&2
    mkdir -p $root_dist/archive/$tag
    cp dist/missing* $root_dist/archive/$tag/
done

