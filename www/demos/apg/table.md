---
title: Table
templateEngine: [vento, md]
apg:
 quote: |
  Like an HTML &lt;table> element, a WAI-ARIA table is a static tabular structure containing one or more rows that each contain one or more cells; it is not an interactive widget.
  Thus, its cells are not focusable or selectable.
  The grid pattern is used to make an interactive widget that has a tabular structure.

  However, tables are often used to present a combination of information and interactive widgets.
  Since a table is not a widget, each widget contained in a table is a separate stop in the page tab sequence.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/table/
---


## Notes

Missing.css uses the `<table>`{ .language-html } element for tables; for full-width tables, use the `.width:100%` utility class.
["Pseudo-tables"][] can be created from other elements by applying the `.table` and `.rows` classes.

["Pseudo-tables"]: /docs/layout/#pseudo-tables

{{ include "demo_kbd.vto" }}


## Example

<figure>
	<table class="width:100%">
		<caption>
			Front-end web developer course 2021
		</caption>
		<thead>
			<tr><th scope=col>Person
				<th scope=col>Most interest in
				<th scope=col>Age
		</thead>
		<tbody>
			<tr><th scope=row>Chris
				<td>HTML tables
				<td>22
			<tr><th scope=row>Dennis
				<td>Web accessibility
				<td>45
			<tr><th scope=row>Sarah
				<td>JavaScript frameworks
				<td>29
			<tr><th scope=row>Karen
				<td>Web performance
				<td>36
		</tbody>
		<tfoot>
			<tr>
				<th scope=row colspan=2 style="text-align: end;">Average age
				<td>33
			</tr>
		</tfoot>
	</table>

	<small>
		Example from <a href=https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table>The Table element</a>, <cite>MDN Web Docs</cite>
	</small>
</figure>
