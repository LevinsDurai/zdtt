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
