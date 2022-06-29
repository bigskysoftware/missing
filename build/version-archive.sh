#!/bin/sh
set -e

root_dist=$(realpath dist)
dir=$(mktemp -d)

command -v git grep deno

cleanup() {
    rm -rf dist/src.tmp.d
}

trap cleanup EXIT
cleanup

git clone . $dir

cd $dir
echo "Entered $PWD"
git tag --list | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+' | while read tag
do
    echo "${0}: Checking out $tag"
    git switch --detach $tag
    echo "${0}: Building $tag"
    deno task css

    echo "${0}: Built, placing into /$tag/"
    mkdir -p $root_dist/archive/$tag
    cp dist/missing* $root_dist/archive/$tag/
done

