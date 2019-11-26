import jsx from './modules/jsx/jsx.js'; jsx.buildIn();

(async()=>{
	const properties = await (await fetch(`https://runkit.io/ursi/css-properties/branches/master`)).json();
	properties.push({
		property: `pointer-events`,
		title: `Scalable Vector Graphics 2`,
		url: `https://svgwg.org/svg2-draft/interact.html#PointerEventsProp`,
	})

	properties.propSort(`property`);
	console.log(properties);
	document.body.appendChild(pug(`table`, {properties}));
	addEventListener(`keydown`, function f(e) {
		if (!f.query) f.query = ``;
		clearTimeout(f.to);
		f.query += e.key;
		f.to = setTimeout(()=> f.query = ``, 1000);
		for (let property of document.getElementsByClassName(`property`))
			if (property.textContent.startsWith(f.query)) {
				property.scrollIntoView({block: `start`});
				break;
			}
	});
})();
