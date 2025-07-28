---
title: Flexbox
url: ./flex/
---

# Flexbox

<details>
  <summary>Contents:</summary>

  [[toc]]

</details>


## Flex containers

<dfn>`.flex-row`</dfn> and <dfn>`.flex-column`</dfn> will create non-wrapping Flexbox containers, with `flex-direction` set to `row` and `column` respectively.

<dfn>`.flex-switch`</dfn> will create a Flexbox container that will switch from row to column when the width of an individual descendant exceeds the <dfn>`--flex-switch-threshold`</dfn> variable (default `15ch`).

All of `.flex-row`, `.flex-column` and `.flex-switch` will remove margins from their children, and have a [gap] set to `--gap`.

**Deprecated:**{.bad .color} The original names for these classes, `.f-row`, `.f-col`, and `.f-switch` (as well as `--f-switch-threshold`), have been deprecated in favor of the more intuitive names given above.
The original names will be removed in version 2.0.

[gap]: https://developer.mozilla.org/en-US/docs/Web/CSS/gap


The following utility classes are meant to be applied to flex containers:


### `justify-content`

 - <dfn>`.justify-content:start`</dfn>
 - <dfn>`.justify-content:end`</dfn>
 - <dfn>`.justify-content:baseline`</dfn>
 - <dfn>`.justify-content:center`</dfn>
 - <dfn>`.justify-content:stretch`</dfn>
 - <dfn>`.justify-content:space-between`</dfn>
 - <dfn>`.justify-content:space-around`</dfn>
 - <dfn>`.justify-content:space-evenly`</dfn>
 {role=list .tool-bar}

### `align-items`

 - <dfn>`.align-items:start`</dfn>
 - <dfn>`.align-items:end`</dfn>
 - <dfn>`.align-items:baseline`</dfn>
 - <dfn>`.align-items:center`</dfn>
 - <dfn>`.align-items:stretch`</dfn>
 {role=list .tool-bar}

### `flex-wrap`

 - <dfn>`.flex-wrap:nowrap`</dfn>
 - <dfn>`.flex-wrap:wrap`</dfn>


## Flex children

The following utility classes can be used on flex children:

### `align-self`

 - <dfn>`.align-self:start`</dfn>
 - <dfn>`.align-self:end`</dfn>
 - <dfn>`.align-self:baseline`</dfn>
 - <dfn>`.align-self:center`</dfn>
 - <dfn>`.align-self:stretch`</dfn>
 {role=list .tool-bar}

### `flex-grow`

 - <dfn>`.flex-grow:0`</dfn>
 - <dfn>`.flex-grow:1`</dfn>
 - <dfn>`.flex-grow:2`</dfn>
 - <dfn>`.flex-grow:3`</dfn>
 - <dfn>`.flex-grow:4`</dfn>
 - <dfn>`.flex-grow:5`</dfn>
 - <dfn>`.flex-grow:6`</dfn>
 - <dfn>`.flex-grow:7`</dfn>
 - <dfn>`.flex-grow:8`</dfn>
 - <dfn>`.flex-grow:9`</dfn>
 - <dfn>`.flex-grow:10`</dfn>
 - <dfn>`.flex-grow:11`</dfn>
 - <dfn>`.flex-grow:12`</dfn>
 {role=list .tool-bar}
