
CLASS_RE='\.[a-zA-Z-_]([a-zA-Z0-9-_]|\\.)*'

function selectors {
    grep -Poh "$CLASS_RE" "$@" | sort | uniq
}

function is-in-docs {
    grep -F "$1" www/docs/* >/dev/null
}

files=(src/aria.css	src/flex.css src/main.css src/utils.css \
src/colorways.css src/grid.css src/missing.css src/variables.css \
src/components.css src/layout.css)

selectors ${files[@]} | sed 's/\\//' | while read sel; do is-in-docs "$sel" || echo "$sel"; done
