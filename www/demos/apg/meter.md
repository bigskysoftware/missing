---
title: Meter
templateEngine: [vento, md]
apg:
 quote: |
  A meter is a graphical display of a numeric value that varies within a defined range.
 url: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
---


## Notes

Missing.css uses the `<meter>`{ .language-html } element for meters.
To indicate progress, use the `<progress>`{ .language-html } element instead.


{{ include "demo_kbd.vto" }}


## Example

<figure>
	<fieldset>
		<legend>Meter Examples</legend>
		<div class="packed table rows">
			<p>
				<label for="disk-meter">Disk Usage</label>
				<meter id="disk-meter" min="0" max="100" low="33" high="66" optimum="80" value="50">
			<p>
				<label for="memory-meter">Memory Usage</label>
				<meter id="memory-meter" min="0" max="100" low="33" high="66" optimum="20" value="10">
			<p>
				<label for="cpu-meter">CPU Load</label>
				<meter id="cpu-meter" min="0" max="100" low="33" high="66" optimum="50" value="55">
			<p>
				<label for="battery-meter">Battery</label>
				<meter id="battery-meter" min="0" max="100" low="33" high="66" optimum="80" value="20">
		</div>
	</fieldset>

	<fieldset>
		<legend>Progress Examples</legend>
		<div class="packed table rows">
			<p>
				<label for="install-progress">Installing...</label>
				<meter id="install-progress" max="100" value="10">
			<p>
				<label for="import-progress">Importing...</label>
				<meter id="import-progress" max="100" value="80">
			<p>
				<label for="upload-progress">Uploading...</label>
				<meter id="upload-progress" max="100" value="50">
		</div>
	</feildset>
</figure>
