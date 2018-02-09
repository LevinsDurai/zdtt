window.addEventListener("message", function(event) {
    if (event.data.name == "EditorInitiater") {
        chrome_addons_inner_text = event.data.value;
    }
    else if (event.data.name == "createEditor") {
        console.log("editer called");
        functionLoaderCheck();
    }
}, false);
