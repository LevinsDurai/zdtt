/* sample code */ 
	var sampleParent = domElement.create({
	    elemName: "div",
	    attributes: {
	        id: "sampleShadow",
	        class: "parent"
	    }
	})
	document.getElementsByTagName('html')[0].appendChild(sampleParent);

	var sampleTemplete = domElement.create({
	    elemName: "template",
	    attributes: {
	        id: "zdttTemp"
	    },
	    elementData: {
	        innerHTML: `<div><b id="pathShown"></b></div>`
	    }
	})
	document.getElementsByTagName('html')[0].appendChild(sampleTemplete);

	shadowRootCreater(sampleParent, document.querySelector("#zdttTemp"))
	window.postMessage({
	    name: "createObj"
	}, "*")
/* sample code ended */