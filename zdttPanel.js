var parent = document.createElement("div");
parent.id = "sampleShadow";
parent.class = "parent" ;
document.getElementsByTagName('html')[0].appendChild(parent);


var innerHTML = `
	<script>
		debugger;
		function updatePathObj(id){
			this.elem = document.getElementById(id);
		};
		updatePathObj.prototype.updateInnerText = function(data){
			debugger;
			this.elem.querySelector(data.id).innerText = data.value;
		};
		var updater = new updatePathObj("sampleShadow");
		console.log("rendered");

	</script>
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