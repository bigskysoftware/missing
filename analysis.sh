
CLASS_RE='\.([a-zA-Z0-9-_]|\\.)*(?=\s*[{,])'

function selectors {
    grep -Poh "$CLASS_RE" "$@" | sort | uniq
}

function is-in-docs {
    grep -F "$1" docs/* >/dev/null
}

selectors src/*.css | sed 's/\\//' | while read sel; do is-in-docs "$sel" || echo "$sel"; done
