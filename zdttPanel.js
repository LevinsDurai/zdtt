var parent = document.createElement("div");
parent.id = "sampleShadow";
parent.class = "parent" ;
document.getElementsByTagName('html')[0].appendChild(parent);

var innerHTML = `
	<script>
		function updatePathObj(id){
			this.elem = document.getElementById(id);
		};
		updatePathObj.prototype.updateInnerText = function(data){
			this.elem.querySelector(data.id).innerText = data.value;
		};
		var updater = new updatePathObj("sampleShadow");
		
	</script>
	<div>
		<b id="pathShown"></b>
	</div>
`
var shadowRoot = parent.createShadowRoot();
shadowRoot.innerHTML = innerHTML;