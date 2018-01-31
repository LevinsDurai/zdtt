var parent = document.createElement("div");
parent.id = "sampleShadow";
parent.class = "parent" ;
document.getElementsByTagName('html')[0].appendChild(parent);


var innerHTML = `
	<div>
		<b id="pathShown"></b>
	</div>
`
var temp = document.createElement("template");
temp.id = "zdttTemp";
temp.innerHTML = innerHTML;
document.getElementsByTagName('html')[0].appendChild(temp);


var shadowRoot = parent.createShadowRoot();
shadowRoot.appendChild(document.querySelector("#zdttTemp").content);