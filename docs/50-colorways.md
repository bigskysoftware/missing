---
title: Colorways
url: ./colorways/
---

# Colorways

A colorway is a group of shades of a color, with specific roles. For instance,
here is the `.ok` colorway in the missing.css source code:

<figure>

  ~~~ css
  .ok {
      --box-bg: var(--ok-bg);
      --accent: var(--ok-fg);
      --faded-fg: var(--ok-faded-fg);
  }
  ~~~

<figcaption>src/util/colorway.css</figcaption>
</figure>

The following colorways are provided by default:

 * <dfn>`.plain`</dfn> is the default. {.plain .bg .color}
 * <dfn>`.info`</dfn> is used to highlight information without any emotional 
   affect. {.info .bg .color}
 * <dfn>`.ok`</dfn> is used to indicate successes, insertions, desired
   states. {.ok .bg .color}
 * <dfn>`.warn`</dfn> is used to warn the user, although there may not necessarily be a bad
   situation. {.warn .bg .color}
 * <dfn>`.bad`</dfn> is used for errors, deletions, failure states. {.bad .bg .color}

Applying the colorway class to an element will not change its appearance by 
default. Use the <dfn>`.bg`</dfn>, <dfn>`.color`</dfn> and <dfn>`.border`</dfn>
classes to use an aspect of the colorway:

<figure>

  ~~~ html
  <p><b class="ok color border">Do:</b> Use color to help users scan information
      quickly
  <p><b class="bad color">Don't:</b> Use color as the only way to communicate
      a piece of information
  ~~~

</figure>

## Custom colorways

If you want, you can make your own colorway simply with a class that sets the 
appropriate CSS variables. We recommend naming your colorways after their 
purpose, as opposed to their specific color.

<figure>

  ~~~ css
  .done {
    --box-bg: lavender;
    --accent: rebeccapurple;
  }
  ~~~

</figure>

<figure>
  <h3 class="<h2>">Pull requests</h3>
  <h3 class="<h4>">Add "ok" colorway</h3>
  <p>Authored by alice@example.com &middot; 
  <chip class="ok color">Open</span>

  <h3 class="<h4>">Add "done" colorway</h3>
  <p>Authored by bob@example.com &middot; 
  <chip class="color" style="
    --box-bg: lavender;
    --accent: rebeccapurple;">Merged</span>

  <h3 class="<h4>">Add "red" colorway</h3>
  <p>Authored by alice@example.com &middot; 
  <chip class="bad color">Closed</span>
</figure>
