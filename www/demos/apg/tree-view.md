---
title: Tree View
templateEngine: [vento, md]
apg:
 quote: |
  A tree view widget presents a hierarchical list.
  Any item in the hierarchy may have child items, and items that have children may be expanded or collapsed to show or hide the children.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
shortcuts:
 - keys: ["Down Arrow"]
   text: Moves focus to the next node that is focusable without opening or closing a node.
 - keys: ["Up Arrow"]
   text: Moves focus to the previous node that is focusable without opening or closing a node.
 - keys: ["Home"]
   text: Moves focus to the first node in the tree without opening or closing a node.
 - keys: ["End"]
   text: Moves focus to the last node in the tree that is focusable without opening a node.
 - keys: ["Enter"]
   text: Activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node.
---


## Notes

**Dev Note:**  The current keyboard specification listed on this page is incomplete.
Refer to the APG page when implementing this pattern.
{ .warn .box }

{{ include "demo_kbd.vto" }}

## Example
<noscript>

This example requires JavaScript to be activated.

</noscript>

<figure>
<h3 id=documents:label>My Documents</h3>

<style>
  aria-treeitem:not([aria-expanded=true]) > aria-group {
	display: none;
  }

  aria-treeitem {
	aria-icon.when-open { display: none }
	&:state(expanded) {
	  aria-icon.when-closed { display: none }
	  aria-icon.when-open { display: block }
	}
  }
</style>
</style>
<aria-tree id=tree aria-labelledby=documents:label>
	<aria-treeitem>
		<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
		<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
		<span>Projects</span>
		<aria-group>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=file-text></aria-icon>
				project-1.docx
			</aria-treeitem>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=file-text></aria-icon>
				project-2.docx
			</aria-treeitem>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
				<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
				<span>project-3</span>
				<aria-group>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-3A.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-3B.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-3C.docx
					</aria-treeitem>
				</aria-group>
			</aria-treeitem>
			<aria-treeitem>project-4.docx</aria-treeitem>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
				<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
				<span>project-5</span>
				<aria-group>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-5A.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-5B.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-5C.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-5D.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-5E.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						project-5F.docx
					</aria-treeitem>
				</aria-group>
			</aria-treeitem>
		</aria-group>
	</aria-treeitem>
	<aria-treeitem>
		<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
		<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
		<span>Reports</span>
		<aria-group>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
				<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
				<span>report-1</span>
				<aria-group>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-1A.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-1B.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-1C.docx
					</aria-treeitem>
				</aria-group>
			</aria-treeitem>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
				<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
				<span>report-2</span>
				<aria-group>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-2A.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-2B.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-2C.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-2D.docx
					</aria-treeitem>
				</aria-group>
			</aria-treeitem>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
				<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
				<span>report-3</span>
				<aria-group>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-3A.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-3B.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-3C.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						report-3D.docx
					</aria-treeitem>
				</aria-group>
			</aria-treeitem>
		</aria-group>
	</aria-treeitem>
	<aria-treeitem>
		<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
		<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
		<span>Letters</span>
		<aria-group>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
				<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
				<span>letter-1</span>
				<aria-group>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-1A.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-1B.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-1C.docx
					</aria-treeitem>
				</aria-group>
			</aria-treeitem>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
				<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
				<span>letter-2</span>
				<aria-group>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-2A.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-2B.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-2C.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-2D.docx
					</aria-treeitem>
				</aria-group>
			</aria-treeitem>
			<aria-treeitem>
				<aria-icon fetch slot=leading name=folder-open class="when-open"></aria-icon>
				<aria-icon fetch slot=leading name=folder-closed class="when-closed"></aria-icon>
				<span>letter-3</span>
				<aria-group>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-3A.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-3B.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-3C.docx
					</aria-treeitem>
					<aria-treeitem>
						<aria-icon fetch slot=leading name=file-text></aria-icon>
						letter-3D.docx
					</aria-treeitem>
				</aria-group>
			</aria-treeitem>
		</aria-group>
	</aria-treeitem>
</aria-tree>

<label>File or Folder Selected: <input id="last_action" type="text" size="15" readonly=""></label>

</figure>

<script type=module src=/dist/js/icon.js></script>
<script type=module src=/dist/js/tree.js></script>
<script>
	const tree = document.getElementById("tree")
	const input = document.getElementById("last_action")
	tree.addEventListener("change", (e) => {
		const treeitem = e.detail.selected
		let label = treeitem.getAttribute("aria-label")
		if (!label) {
			let child = treeitem.firstElementChild
			label = child ? child.innerText : treeitem.innerText
		}
		input.value = label.trim()
	})
</script>
