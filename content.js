var zd_ATTitsEnabled = false;
var requestAPI = undefined ;
var organitationID = undefined;
var commomDomainNameForAPI = "desk.zoho.com";
var zdTT_user = {};  

function findHighestZIndex(elem) {
    var elems = document.getElementsByTagName(elem);
    var highest = 0;
    for (var i = 0; i < elems.length; i++) {
        var zindex = document.defaultView.getComputedStyle(elems[i]).getPropertyValue("z-index");
        if ((parseInt(zindex) > highest) && (zindex != 'auto')) {
            highest = parseInt(zindex);
        }
    }
    return highest;
}

var zdtt_pageMaxZIndexValue = parseInt(findHighestZIndex('div'));

/* shadow dom creater function */
function shadowRootCreater(hostElem, template , childrens) {
    if (hostElem) {
        var shadowRoot = hostElem.createShadowRoot();
        if (template) {
            shadowRoot.appendChild(template.content.cloneNode(true));
        }
        if(childrens){
            for(child of childrens){
                shadowRoot.appendChild(child);
            }
        }
    }
}
/* shadow dom creater function end */

/* 
    ElementCreater function sample argument structure :- 
    ----------------------------------------------------
    {
        elemName: "element name" ,
        attributes : {
            id:"element id name" ,
            class:"element Class name"  
        },
        elementData:{
            innerHTML : "",
            innerText : "",
            value     : ""
        },
        parent : "parent element id" or return created element ,
        callbackList : callBack List Of Obj
    }

    if you need to add any attribute for the elemet , add the attribute name in the attributes obj ...
*/


var zdttDomElement = function() {}
zdttDomElement.prototype.create = function(obj) {
    if (obj.elemName != undefined) {
        var element = document.createElement(obj.elemName);
        obj.attributes != undefined && this.setAttributes(element, obj.attributes);
        obj.callbackList != undefined && this.bindEvents(element, obj.callbackList);
        obj.elementData != undefined && this.setData(element, obj.elementData);
        if (typeof(obj.parent) == "undefined") {
            return element
        } else if (typeof(obj.parent) == "string") {
            document.getElementById(obj.parent).appendChild(element);
        } else if(obj.parent instanceof Element){
            obj.parent.appendChild(element);
        }
        return element
    }
};
zdttDomElement.prototype.setData = function(el, obj) {
    if (obj.innerHTML) {
        el.innerHTML = obj.innerHTML;
    } else if (obj.innerText) {
        el.innerText = obj.innerText;
    } else if (obj.value) {
        el.value = obj.value;
    } else if (obj.child){
        for(child of obj.child){
            el.appendChild(child);
        }
    }
}
zdttDomElement.prototype.setAttributes = function(el, attrs) {
    for (var key in attrs) {
        if(attrs[key]!=undefined){
            el.setAttribute(key, attrs[key]);
        }
    }
}
zdttDomElement.prototype.bindEvents = function(el, eventObj) {
    for (var key in eventObj) {
        el.addEventListener(key, eventObj[key]);
    }
}
var domElement = new zdttDomElement();
/* ElementCreater ended ...  */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.zdttMsg === "zd_tt_asapTTenabledStatus") {
        chrome.runtime.sendMessage(
            {
                "zdttMsg": "zd_ATTitsEnabledStatus",
                "data": zd_ATTitsEnabled
            },
            runtimeMsgCallBack
        );
        zd_ATTitsEnabled = zd_ATTitsEnabled ? false : true;
    }
    else if(request.zdttMsg === "cookieGet"){
        var cookieRes = JSON.parse(request.cookieValue);
        if (cookieRes.csrf != "cookieNotFound" && cookieRes.agent != "cookieNotFound") {
            requestAPI = apiCallerCreater(cookieRes.csrf);
            portalAPI(cookieRes.agent);
        } else {
            console.log(request)
            // var viewportwidth = document.documentElement.clientWidth;
            // zd_TTNWindow = window.open("https://accounts.zoho.com/login", "Zoho Sign in", "width=520,height=640,top=0,right=0,screenX=0,screenY=0");
            // zd_TTNWindow.moveTo(viewportwidth - 520, 65);
            // signinPopupClosedOrNot();
        }


    }
})

window.addEventListener("message", function(event) {
    if (event.data.type === "toolTip_orgId") {
        organitationID = event.data.orgId;
        AsapId = event.data.AsapId;
        AsapName = event.data.AsapName;
        asapPortalID = event.data.asapPortalID;
    }
})


function portalAPI(IAMAGENTTICKET) {
    if (organitationID != undefined) {
        requestAPI("https://" + commomDomainNameForAPI + "/api/v1/myinfo?orgId=" + organitationID).get().then((res) => {
            if (res.responseStatus === 200) {
                res = res.obj;
                zdTT_user.name  = res.firstName + " " + res.lastName; // We are using 'zdTT_user.name' instead of the 'zdtt_userName'.
                zdTT_user.mId   = res.emailId;                        // We are using 'zdTT_user.mId' instead of the 'zdtt_mailId'.
                zdTT_user.img   = res.photoURL;                       // We are using 'zdTT_user.img' instead of the 'zdtt_userImg'.
                zdTT_user.proId = res.id;                             // We are using 'zdTT_user.proId' instead of the 'zdtt_myProId'.
                zdTT_user.id    = res.profileId
                if (res.message == undefined) {
                    requestAPI("https://" + commomDomainNameForAPI + "/api/v1/profiles/" + zdTT_user.id + "?orgId=" + organitationID).get().then((res) => {  // We are using 'zdTT_user.id' instead of the 'res.profileId'.
                        if (res.responseStatus === 200) {
                            res = res.obj;
                            if (res.permissions.setup.portal == false) {
                                Chrome_Extension_GetExtension(AsapId, organitationID);
                            } else {
                                createToolTipErrorPopupBox({
                                    buttons: [{
                                        id: "zd_tt_permissionErrors",
                                        content: "ok",
                                        callbackList : {mousedown:closeEPwithcloseExtension}
                                    }],
                                    content: "<b>You have no permission to configure this portal.</b> Please contact your PORTAL admin."
                                });
                            }
                        }
                    });
                }
            } else {
                res = res.obj;
                if (res.message == "MyZsupport is not accessible") {
                    createToolTipErrorPopupBox({
                        buttons: [{
                            id: "zd_tt_permissionErrors",
                            content: "ok",
                            callbackList : {mousedown:closeEPwithcloseExtension}
                        }],
                        content: "<b>You are not in the portal .</b> sorry Permission is denited."
                    });
                } else if (res.message == "Invalid Value For Query Param orgId") {
                    createToolTipErrorPopupBox({
                        buttons: [{
                            id: "zd_tt_permissionErrors",
                            content: "ok",
                            callbackList : {mousedown:closeEPwithcloseExtension}
                        }],
                        content: "<b>unable to reach the server.</b> sorry try again some time later."
                    });
                } else if (res.message == "Invalid Portal") {
                    createToolTipErrorPopupBox({
                        buttons: [{
                            id: "zd_tt_permissionErrors",
                            content: "ok",
                            callbackList : {mousedown:closeEPwithcloseExtension}
                        }],
                        content: "<b>You are not in the portal .</b> sorry Permission is denited."
                    });
                } else {
                    var viewportwidth = document.documentElement.clientWidth;
                    zd_TTNWindow = window.open("https://accounts.zoho.com/login", "Zoho Sign in", "width=520,height=640,top=0,right=0,screenX=0,screenY=0");
                    zd_TTNWindow.moveTo(viewportwidth - 520, 65);
                    signinPopupClosedOrNot();
                }
            }
        });
    }
}
/* sample code */ 
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
/* sample code */

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


function runtimeMsgCallBack(response) {
    switch (response.zdttMsg) {
        case "activeTooltip":
            chrome.runtime.sendMessage({"zdttMsg": "getCookie"});
            window.postMessage({name: "UrlCheck"}, "*");
            window.postMessage({name: "closeAsapWebApp"}, "*"); // if asap was opened , it's used for close ASAP
            window.postMessage({name: "unregisterTheAsapTooltip"}, "*"); // it's used for unregister the tips from ASAP
            
        /* sample code */ 
            chrome.runtime.sendMessage({
                "zdttMsg": "injectSidePanel"
            }, function(response) {
                switch (response.zdttMsg) {
                    case "bindEvent":
                        eventBinder();
                        break;
                }
            })
        /* sample code */

            break;

        case "deactiveTooltip":
            window.postMessage({name: "zdttIsDisabled"}, "*"); // We are using "zdttIsDisabled" instead of the "registerTheAsapTooltip".  
            break;

    }
}