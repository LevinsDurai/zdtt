var zd_ATTitsEnabled = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.zdttMsg === "zd_tt_asapTTenabledStatus") {
        chrome.runtime.sendMessage({
            "zdttMsg": "zd_ATTitsEnabledStatus",
            "data": zd_ATTitsEnabled
        },function(response){
            switch(response.zdttMsg){
                case "activeTooltip":
                    window.postMessage({
                        name: "zdttIsEnabled"  // We are using "zdttIsEnabled" instead of the "unregisterTheAsapTooltip" and "closeAsapWebApp".  
                    }, "*");
                    chrome.runtime.sendMessage({
                        "zdttMsg": "injectSidePanel"
                    },function(response){
                        switch(response.zdttMsg){
                            case "bindEvent":
                                eventBinder();
                                break;
                        }
                    })
                    break;
                case "deactiveTooltip":
                    window.postMessage({
                        name: "zdttIsDisabled"  // We are using "zdttIsDisabled" instead of the "registerTheAsapTooltip".  
                    }, "*");
                    break;
            }
        });
        zd_ATTitsEnabled = zd_ATTitsEnabled ? false : true;
    }
})


function eventBinder(){
    document.addEventListener("click",callback,true)
}
function callback(event){
    var path = fullPath(event.target);
    window.postMessage({
        name: "elemSelected",
        value : path
    }, "*")
}

function fullPath(selectedElement) {
    var isIDExist = false;
    var elementPath = [];
    var childs;
    if (selectedElement.id != "") {
        elementPath.unshift("[id='" + selectedElement.id + "']")
        return elementPath[0]
    }

    while (!isIDExist) {
        childs = selectedElement.parentElement.children
        for (var c = 0; childs[c] != selectedElement; c++);
        elementPath.unshift(selectedElement.tagName + ":nth-child(" + (c + 1) + ")")
        selectedElement = selectedElement.parentElement
        if (selectedElement.id !== "") {
            elementPath.unshift("[id='" + selectedElement.id + "']")
            isIDExist = true
        } else if (selectedElement.tagName == "HTML") {
            elementPath.unshift("HTML")
            isIDExist = true
        }
    }
    return elementPath.join(" > ")
}