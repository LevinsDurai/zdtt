var cookiesObj;
var projectDisplay = true;
var msgOnLoad = true;
var tabId;
var commomDomainNameForAPI = "desk.zoho.com";
var mess = "";

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            "zdttMsg": "zd_tt_asapTTenabledStatus"
        });
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var resp = {
            "zdttMsg": "invalidate query"
        }
        if (request.zdttMsg == "zd_ATTitsEnabledStatus") {
            if (request.data == true) {
                resp.zdttMsg = "deactiveTooltip";
            } else if (request.data == false) {
                resp.zdttMsg = "activeTooltip";
            }
            if (resp.zdttMsg == "activeTooltip") {
                chrome.browserAction.setIcon({
                    tabId: sender.tab.id,
                    path: zd_CONFIG.icon.active
                });
            } else {
                chrome.browserAction.setIcon({
                    tabId: sender.tab.id,
                    path: zd_CONFIG.icon.inactive
                });
            }
        }
        else if(request.zdttMsg == "injectSidePanel"){
            filesInjecter("injectSidePanel",sender);
            resp.zdttMsg = "bindEvent"

        }

        sendResponse(resp);
    }
)


var zd_CONFIG = {
    icon: {
        active: {
            '19': 'Tooltip_enabled_icon.png',
            '38': 'Tooltip_enabled_icon.png'
        },
        inactive: {
            '19': 'Tooltip_disble_icon.png',
            '38': 'Tooltip_disble_icon.png'
        }
    }
};

function filesInjecter(fn,sender){
    switch (fn) {
        case "injectSidePanel":
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, 
            function(tabs) {
                chrome.tabs.executeScript(sender.tab.id, {
                    file: "zdttPanel.js"
                });
            });
    }
}