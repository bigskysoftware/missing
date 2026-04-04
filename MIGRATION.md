# Migration guide


The migration guide is a work in progress.


## Removed classes
- `.-dark-theme`: Set `html { color-sheme: dark; }` instead.
- `.-no-light-theme`: Set `html { color-sheme: light; }` instead.
- `.all:initial`
- `.grid`: Use new helper, **TODO**

## Renamed classes
- `.f-row` -> `.flex-row`
- `.f-col` -> `.flex-col`
- `.f-switch` -> `.flex-switch`
- `.primary-font` -> `.main-font`
- `.big` -> `.<big>`

## Removed variables
- `--rhythm`: Set a value for the `line-height`{.token .attr-name} property on the `html` element instead.
- `--grid-row-width`:
- `--grid-col-width`:


## Rename variables
- `--f-switch-threshold` -> `--flex-switch-threshold`
