var zdttTriggerOldFocused = undefined;
var zd_TT_sidePanelViewed = true ;
var zd_ATTitsEnabled = false;
var requestAPI = undefined ;
var organitationID = undefined;
var commomDomainNameForAPI = "desk.zoho.com";
var zd_tt_triggerListing = "ALL";
var zdTT_user = {};  
var lastLoadingElem = undefined;

var ConfigureObjects = undefined;
var TriggerListAllObjMaintanense = [];
var listOfTriggersObj = undefined;

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
        if(obj.elemName=="svg"){
            var element = document.createElementNS("http://www.w3.org/2000/svg",obj.elemName);
        }
        else{
            var element = document.createElement(obj.elemName);
        }
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
    } 
    else if (obj.innerText) {
        el.innerText = obj.innerText;
    } 
    else if (obj.value) {
        el.value = obj.value;
    } 
    if (obj.child){
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
zdttDomElement.prototype.bindEvents = function(el, eventArray) {
    for(eventObj of eventArray){
        for (var key in eventObj) {
            el.addEventListener(key, eventObj[key]);
        }
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


function zdttLoading(elem){
    return {
        inject : function(){
            var loading = `<div class="loading-area" id="zdtt_loadingContainer">
                  <div class="loading-content">
                      <div class="loading-item"></div>
                  </div>
                  <div>loading...</div>
              </div>`;
            elem.innerHTML = loading;
        },
        remove : function(){
            var loadingElem = elem.querySelector("#zdtt_loadingContainer");
            elem.removeChild(loadingElem);
            lastLoadingElem = undefined;
        }
    }
}

function zdATTupdatedElemetsHighlighter(currentObj) {
    var ind=0;
    for( triggers of currentObj.triggers ){
        var triggerElement = document.querySelector(triggers.element);
        if(triggerElement){
            zdtt_lastHighlighted.push(triggers.element);
            if(triggerElement.className.indexOf(" zohodesk-Tooltip-Configureborder") == -1){
                triggerElement.className += " zohodesk-Tooltip-Configureborder";
                var nameSpan = domElement.create({
                    elemName: "span",
                    attributes: {
                        class: "zohodesk-Tooltip-ConfigureCnt",
                        id:"zd_tt_triggerNameSpan"
                    },
                    elementData: {
                        innerHTML: "<span class='zdatt_triggerNames'>" + currentObj.name + "</span>"
                    }
                });
                if(zdtt_nowStatus == "update"){
                    var deleteSpan = domElement.create({
                        elemName: "span",
                        attributes: {
                            class: "zohodesk-Tooltip-deleteIcn-cont",
                            id:"zd_tt_triggerNameSpan"
                        },
                        elementData: {
                            innerHTML: `<svg style="display: block;" class="zohodesk-Tooltip-deleteIcn"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use></svg>`
                        },
                        // callbackList:[{mouseup:deleteTheConfiguredTriggerEventFromRemoveEvent(currentObj.triggers[i].element, currentObj.triggers[i].event, zdtt_elementSelectorObj)}]
                    });
                    nameSpan.appendChild(deleteSpan);
                }
                triggerElement.prepend(nameSpan);
            }
        }
        ind++
    }
}

function unHighlightTheOld() {
    if (zdttTriggerOldFocused) {
        zdttTriggerOldFocused.className = zdttTriggerOldFocused.className.split(" zohodesk-Tooltip-triggerlist-FocusedTriggerDetails").join("");
        if (zdtt_lastHighlightedObj) {
            delete zdtt_lastHighlightedObj["dontEdit"]
        }
        zdttTriggerOldFocused = undefined;
    }
    if (zdtt_lastHighlighted.length != 0) {
        for (selector of zdtt_lastHighlighted) {
            zd_tt_ConfSelectedTrigger = document.querySelector(selector);
            if (zd_tt_ConfSelectedTrigger) {
                zd_tt_ConfSelectedTrigger.className = zd_tt_ConfSelectedTrigger.className.replace(" zohodesk-Tooltip-Configureborder", "");
                zd_tt_ConfSelectedTrigger.removeChild(zd_tt_ConfSelectedTrigger.querySelector("#zd_tt_triggerNameSpan"));
            }
        }
        zdtt_lastHighlighted = [];
    }
}

function zdttHighlightTriggerElems(elem){
    return function(){
        unHighlightTheOld();
        var zd_tt_ConfSelectedTrigger;
        if (elem.className.indexOf("zohodesk-Tooltip-triggerlist-FocusedTriggerDetails") == -1) {
            elem.className += " zohodesk-Tooltip-triggerlist-FocusedTriggerDetails";
            zdttTriggerOldFocused = elem;
        }
        for(trigger of listOfTriggersObj){
            if(elem.id == trigger.id){
                trigger["dontEdit"] = true;
                zdtt_lastHighlightedObj = trigger;
                break;
            }
        }
        zdATTupdatedElemetsHighlighter(trigger);
    }
}

function ZohoDesk_tooltip_triggerList_creator(obj) {
    var toggleElement = zdttContainers.zdtt_sidepanelSwitchingComp;
    if (toggleElement.className.indexOf("zohodesk-Tooltip-height") != -1) {
        toggleElement.className = toggleElement.className.split("zohodesk-Tooltip-height").join("");
    }
    var parent = domElement.create({
        elemName: "ul",
        attributes: {
            class:"zohodesk-Tooltip-list"
        }
    })
    if (obj != undefined) {
        for (var i = 0; i < obj.length; i++) {
            var nothing = 0;
            for (var k = 0; k < obj[i].triggers.length; k++) {
                if (document.querySelector(obj[i].triggers[k].element) == null) {
                    nothing++;
                }
            }
            var currentObj = obj[i];

            var countMsg = "(" + currentObj.triggers.length + ")";
            if (nothing != 0) {
                countMsg = " (" + currentObj.triggers.length + ")" + "<span style='color:red'>(" + nothing + ")</span>"
            }
            var div1 = domElement.create({
                elemName: "div",
                attributes: {
                    class:"zohodesk-Tooltip-columnone"
                },
                elementData:{
                    innerHTML : "<div class='zohodesk-Tooltip-ArticleName' title='" + currentObj.name + " (" + currentObj.triggers.length + ")" + "' id='zd_tt_triggerName'>" + currentObj.name + countMsg + "</div><div class='zohodesk-Tooltip-AuthorName' title='" + currentObj.modifiedBy.name + "'>" + currentObj.modifiedBy.name + "</div>"
                }
            })

            var div2 = domElement.create({
                elemName: "div",
                attributes: {
                    class:"zohodesk-Tooltip-columntwo"
                },
                elementData:{
                    innerHTML : "<div class='zohodesk-Tooltip-ArticleViews' title='" + currentObj.viewCount + "'>" + currentObj.viewCount + "</div>"
                }
            })

            var deleteIcon = domElement.create({
                elemName: "svg",
                attributes: {
                    class:"zohodesk-Tooltip-deleteIcn"
                },
                elementData:{
                    innerHTML : `<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use>`
                }
            })
            var editIcon = domElement.create({
                elemName: "svg",
                attributes: {
                    class:"zohodesk-Tooltip-deleteIcn"
                },
                elementData:{
                    innerHTML : `<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#edit"></use>`
                }
            })
            var div3 = domElement.create({
                elemName: "div",
                attributes: {
                    class:"zohodesk-Tooltip-columnthree"
                },
                elementData:{
                    child : [editIcon,deleteIcon]
                }
            })

            var li = domElement.create({
                elemName: "li",
                attributes: {
                    class:"zohodesk-Tooltip-cl-both zohodesk-Tooltip-triggerlist",
                    id:currentObj.id,
                    inf:i
                },
                elementData:{
                    child:[div1,div2,div3]
                }
            })
            li.onclick=zdttHighlightTriggerElems(li);
            deleteIcon.onclick = zdttDeleteTrigger(li);

            // div = document.createElement('div');
            // div.className = ;
            // div.innerHTML = `<svg class="zohodesk-Tooltip-deleteIcn"></svg><svg class="zohodesk-Tooltip-deleteIcn"></svg>`;
            // div.lastChild.addEventListener('click', zdttDeleteTrigger(li));
            // div.firstChild.addEventListener('click', zd_tt_triggerUpdateObjFinder);
            // li.appendChild(div);
            parent.appendChild(li);
        }
        var list = domElement.create({
            elemName: "div",
            elementData:{
                child:[parent]
            }
        })
        // var div = document.createElement('div');
        // div.appendChild(parent);
        return list;
    } else {
        var list = domElement.create({
            elemName: "div",
            elementData:{
                child:[parent]
            }
        })
        // var div = document.createElement('div');
        // div.appendChild(parent);
        return list;
    }
}



function zdttDeleteTrigger(elem){
    return function(event){
        event.preventDefault();
        event.stopPropagation();
        var positionStatus = "Right";
        var sidePanel = zdttContainers.zdtt_sidePanelDirectChild;
        if (sidePanel.className.indexOf("zohodesk-Tooltip-panel-left") != -1) {
            positionStatus = "Left";
        }
        if (elem.id != "" || elem.id != null || elem.id != undefined) {
            var animClass = "";
            if (positionStatus == "Left") {
                animClass += " zohodesk-Tooltip-animat-left";
            } else {
                animClass += " zohodesk-Tooltip-animat";
            }
            elem.className += animClass;
            setTimeout(function() {
                if (elem.className.indexOf("zohodesk-Tooltip-animat") != -1) {
                    elem.className += " zohodesk-Tooltip-heightAnim";
                }
            }, 400);
            var callBack = deleteCallBackCreater(elem, animClass);
            var Zohodesk_Chrome_Extension_Delete_Configured_Snippet_URL = "https://" + commomDomainNameForAPI + "/api/web/extensions/" + ExtensionProjectId + "/messages/" + elem.id + "?orgId=" + organitationID;
            requestAPI(Zohodesk_Chrome_Extension_Delete_Configured_Snippet_URL).del().then(callBack);
        }
    }
}

function listFilterCreater() {
    var filterOptText = (zd_tt_triggerListing == "CREATED_BY_ME") ? "Created By Me" : "All";
    zdttContainers.filterSwitch = domElement.create({
        elemName: "span",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-selectbox  zohodesk-Tooltip-CategoryName",
            id: "zdtt_spanDropDown"
        },
        elementData: {
            innerHTML: filterOptText
        },
        parent: zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".zohodesk-Tooltip-Category")
    })
    var popup = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-Selectbox-dropdown",
            id: "triggerTapDropdown"
        },
        elementData: {
            innerHTML: `<div class="zohodesk-Tooltip-dropdown-content">
                    <ul class="zohodesk-Tooltip-list"></ul>
                </div>`
        },
        parent: zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".zohodesk-Tooltip-Category")
    })
    var callBackOfAllBtn = zd_tt_triggerListFilter("ALL");
    var callBackOfcrtbymeBtn = zd_tt_triggerListFilter("CREATED_BY_ME");
    var allBtn = domElement.create({
        elemName: "li",
        attributes: {
            class: "zohodesk-Tooltip-dropdown-options",
            id: "zd_tt_TriggerAll"
        },
        elementData: {
            innerHTML: "All"
        },
        callbackList:[{mousedown:callBackOfAllBtn}],
        parent: popup.querySelector(".zohodesk-Tooltip-list")
    })
    var crtByMeBtn = domElement.create({
        elemName: "li",
        attributes: {
            class: "zohodesk-Tooltip-dropdown-options",
            id: "zd_tt_CreatedByMe"
        },
        elementData: {
            innerHTML: "Created By Me"
        },
        callbackList:[{mousedown:callBackOfcrtbymeBtn}],
        parent: popup.querySelector(".zohodesk-Tooltip-list")
    })
    var popupCallback = zdtt_popupShow(popup);
    zdttContainers.filterSwitch.onmouseup = popupCallback;
}

function zd_tt_triggerListInitiater(obj, loading) {
    if (obj.length != 0) {

        var triggerLists = ZohoDesk_tooltip_triggerList_creator(obj);


        // var div = document.createElement('div');
        // div.className = "zohodesk-Tooltip-panel-content zohodesk-Tooltip-trigger-content";
        // div.id = "zd_tt_listParent";
        // div.appendChild(triggerLists);
        loading.remove();
        // zd_tt_loadinigContainerRemove();
        zdttContainers.zdtt_sidepanelSwitchingComp.innerHTML = `<div class="zohodesk-Tooltip-TriggersTitle zohodesk-Tooltip-cl-both" id="zig">
            <div class="zohodesk-Tooltip-TriggersTitlelft">
                <div class="zohodesk-Tooltip-Category"></div>
            </div>
            <div class="zohodesk-Tooltip-TriggersTitlert">Views</div>
        </div>`;

        listFilterCreater();
        zdttContainers.ListParent = domElement.create({
            elemName: "div",
            attributes: {
                class:"zohodesk-Tooltip-panel-content zohodesk-Tooltip-trigger-content",
                id:"zd_tt_listParent"
            },
            elementData:{
                child:[triggerLists]
            },
            parent:zdttContainers.zdtt_sidepanelSwitchingComp
        })
        // document.getElementById("ZDTT_switching_comonElem").appendChild(div);
        // if (zd_tt_triggerListing == "CREATED_BY_ME") {
        //     document.getElementById("zdtt_spanDropDown").innerHTML = "Created By Me";
        // }
        // document.getElementById("zdtt_spanDropDown").onmouseup = function() {
        //     show('triggerTapDropdown');
        // };
        // document.getElementById('zd_tt_CreatedByMe').onmousedown = zd_tt_triggerListFilter;
        // document.getElementById('zd_tt_TriggerAll').onmousedown = zd_tt_triggerListFilter;
    } 
    else {
        // var noTriggers = `<div class="loading-area empty-trigger-content">
        //                                     <svg class="emptytrigger">
        //                                         <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#emptytrigger"></use>
        //                                     </svg>
        //                                     <div class="empty-message">No Triggers Has Been Added Yet</div>
        //                                     <div class="zohodesk-Tooltip-txtcntr" id="zd_tt_empty_buttonParent">
        //                                     </div>
        //                                 </div>`;
        // zd_tt_loadinigContainerRemove();
        // if (TriggerListAllObjMaintanense.length != 0) {
        //     if (document.getElementById("ZDTT_switching_comonElem").querySelector("#zig") == undefined) {
        //         document.getElementById("ZDTT_switching_comonElem").innerHTML = `<div class="zohodesk-Tooltip-TriggersTitle zohodesk-Tooltip-cl-both" id="zig">
        //           <div class="zohodesk-Tooltip-TriggersTitlelft">
        //             <div class="zohodesk-Tooltip-Category">
        //               <span class="zohodesk-Tooltip-panel-form-selectbox  zohodesk-Tooltip-CategoryName" id="zdtt_spanDropDown">All</span>
        //               <div class="zohodesk-Tooltip-Selectbox-dropdown" id="triggerTapDropdown">
        //                 <div class="zohodesk-Tooltip-dropdown-content">
        //                   <ul class="zohodesk-Tooltip-list">
        //                     <li class="zohodesk-Tooltip-dropdown-options" id="zd_tt_TriggerAll">All</li>
        //                     <li class="zohodesk-Tooltip-dropdown-options" id="zd_tt_CreatedByMe">Created By Me</li>
        //                   </ul>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //           <div class="zohodesk-Tooltip-TriggersTitlert">Views</div>
        //         </div>`;
        //         if (zd_tt_triggerListing == "CREATED_BY_ME") {
        //             document.getElementById("zdtt_spanDropDown").innerHTML = "Created By Me";
        //         }
        //         document.getElementById("zdtt_spanDropDown").onmouseup = function() {
        //             show('triggerTapDropdown');
        //         };
        //         document.getElementById('zd_tt_CreatedByMe').onmousedown = zd_tt_triggerListFilter;
        //         document.getElementById('zd_tt_TriggerAll').onmousedown = zd_tt_triggerListFilter;
        //     }
        //     var zdtt_listParentDiv = document.createElement("div");
        //     zdtt_listParentDiv.id = "zd_tt_listParent";
        //     zdtt_listParentDiv.className = "zohodesk-Tooltip-panel-content zohodesk-Tooltip-trigger-content";
        //     zdtt_listParentDiv.innerHTML = noTriggers;
        //     document.getElementById("ZDTT_switching_comonElem").appendChild(zdtt_listParentDiv);
        // } else {
        //     document.getElementById("ZDTT_switching_comonElem").innerHTML = noTriggers;
        // }
        // var aNB = document.createElement("button");
        // aNB.className = "zohodesk-Tooltip-form-button";
        // aNB.innerText = "+ Add New";
        // aNB.addEventListener("click", function(e) {
        //     zd_tt_addNewTrigger("new");
        //     zdtt_nowStatus = "new";
        //     if (TriggerListAllObjMaintanense.length != 0) {
        //         document.getElementById("ZDTT_switching_comonElem").className = document.getElementById("ZDTT_switching_comonElem").className.split(" zohodesk-Tooltip-height").join("");
        //         if (document.getElementById("header-comenContainer") != undefined) {
        //             var zd_tt_selOpt = document.getElementsByClassName("zohodesk-Tooltip-selectedOpts");
        //             if (zd_tt_selOpt != undefined) {
        //                 for (var z = 0; z < zd_tt_selOpt.length; z++) {
        //                     zd_tt_selOpt[z].className = zd_tt_selOpt[z].className.split("zohodesk-Tooltip-selectedOpts").join("");
        //                 }
        //             }
        //             document.getElementById("addNewTriggerTap").className += " zohodesk-Tooltip-selectedOpts";
        //         }
        //     }
        // });
        // document.getElementById("zd_tt_empty_buttonParent").appendChild(aNB);
    }
}






function getConfiguredMessages(filter,loading) {
    var currentDomainName = window.location.hostname;
    requestAPI("https://" + commomDomainNameForAPI + "/api/web/extensions/" + ExtensionProjectId + "/messages?" + filter + "isEnabled=true&orgId=" + organitationID).get().then((res) => {
        if (res.responseStatus === 200) {
            res = res.obj;
            if (zd_ATTitsEnabled) {
                // Chrome_Extension_RequireFunctionFlow(res);
                ConfigureObjects = res;
                for (var x = 0; x < res.length; x++) {
                    TriggerListAllObjMaintanense[x] = res[x];
                }
                listOfTriggersObj = res;
                if (res.length != 0) {
                    zd_tt_triggerListInitiater(res,loading);
                    ZDTT_topHeaderTapsCreater();
                } 
                else {
                    zd_tt_triggerListInitiater([],loading);
                }
                chrome.runtime.sendMessage({
                    "message": "updateCookie",
                    "web": "desk",
                    "cName": "crmcsr"
                });

            }
        } 
        else {
            createToolTipErrorPopupBox({
                buttons: [{
                    id: "zd_tt_permissionErrors",
                    content: "ok",
                    callbackList: {
                        mousedown: closeEPwithcloseExtension
                    }
                }],
                content: "<b>unable to reach the server.</b> Please try again some time later."
            });
        }
    })
}

window.addEventListener("message", function(event) {
    if (event.data.type === "toolTip_orgId") {
        organitationID = event.data.orgId;
        AsapId = event.data.AsapId;
        AsapName = event.data.AsapName;
        asapPortalID = event.data.asapPortalID;
    }
    else if (event.data.name == "Zohodesk_Chrome_Extension_AsapDetails") {
        var filter = "";
        if (event.data.filter != undefined) {
            filter = event.data.filter;
        }
        lastLoadingElem = zdttLoading(zdttContainers.zdtt_sidepanelSwitchingComp);
        lastLoadingElem.inject();
        getConfiguredMessages(filter,lastLoadingElem);
    }
})


// While publish, need to remove all console.log statememts.

function Chrome_Extension_ExecuteEditor() {
    // window.postMessage({
    //     name: "Department"
    // }, "*")
    chrome.runtime.sendMessage({
        "zdttMsg": "zdtt_Inject_sidePanel_file"
    });
    chrome.runtime.sendMessage({
        "message": "previewMode"
    });
}

function Chrome_Extension_AddExtension(AsapId, organitationID, AsapName, domainName) {
    requestAPI(" https://" + commomDomainNameForAPI + "/api/web/extensions?isEnabled=true&orgId=" + organitationID + "&extensionName=" + encodeURIComponent(AsapName) + "&domain=" + encodeURIComponent(domainName) + "&asapId=" + AsapId).post().then((res) => {
        if (res.responseStatus === 200) {
            res = res.obj;
            if (res.data != "you_dontHave_A_permission") {
                ExtensionProjectId = res.id;
                Chrome_Extension_ExecuteEditor();
            } else {
                createToolTipErrorPopupBox({
                    buttons: [{
                        id: "zd_tt_permissionErrors",
                        content: "ok",
                        callbackList: {
                            mousedown: closeEPwithcloseExtension
                        }
                    }],
                    content: "<b>You dont have a admin permission for this portal.</b> sorry Permission is denited."
                });
            }
        } else {
            createToolTipErrorPopupBox({
                buttons: [{
                    id: "zd_tt_permissionErrors",
                    content: "ok",
                    callbackList: {
                        mousedown: closeEPwithcloseExtension
                    }
                }],
                content: "<b>unable to reach the server.</b> Please try again some time later."
            });
        }
    })
}

function Chrome_Extension_GetExtension(AsapId, organitationID) {
    var domainName = window.location.hostname;
    requestAPI(" https://" + commomDomainNameForAPI + "/api/web/extensions?orgId=" + organitationID + "&domain=" + encodeURIComponent(domainName) + "&asapId=" + AsapId).get().then((res) => {
        if (res.responseStatus === 200) {
            console.log(res);
            res = res.obj;
            if (res[0] != undefined) {
                ExtensionProjectId = res[0].id;
                Chrome_Extension_ExecuteEditor();
            } else {
                Chrome_Extension_AddExtension(AsapId, organitationID, AsapName, domainName);
            }
        } else {
            createToolTipErrorPopupBox({
                buttons: [{
                    id: "zd_tt_permissionErrors",
                    content: "ok",
                    callbackList: {
                        mousedown: closeEPwithcloseExtension
                    }
                }],
                content: "<b>unable to reach the server.</b> Please try again some time later."
            });
        }
    })
}


function portalAPI(IAMAGENTTICKET) {
    if (organitationID != undefined) {
        requestAPI("https://" + commomDomainNameForAPI + "/api/v1/myinfo?orgId=" + organitationID).get().then((res) => {
            if (res.responseStatus === 200) {
                res = res.obj;
                zdTT_user.name = res.firstName + " " + res.lastName; // We are using 'zdTT_user.name' instead of the 'zdtt_userName'.
                zdTT_user.mId = res.emailId; // We are using 'zdTT_user.mId' instead of the 'zdtt_mailId'.
                zdTT_user.img = res.photoURL; // We are using 'zdTT_user.img' instead of the 'zdtt_userImg'.
                zdTT_user.proId = res.id; // We are using 'zdTT_user.proId' instead of the 'zdtt_myProId'.
                zdTT_user.id = res.profileId
                if (res.message == undefined) {
                    requestAPI("https://" + commomDomainNameForAPI + "/api/v1/profiles/" + zdTT_user.id + "?orgId=" + organitationID).get().then((res) => { // We are using 'zdTT_user.id' instead of the 'res.profileId'.
                        if (res.responseStatus === 200) {
                            res = res.obj;
                            if (res.permissions.setup.portal == true) {
                                Chrome_Extension_GetExtension(AsapId, organitationID);
                            } else {
                                createToolTipErrorPopupBox({
                                    buttons: [{
                                        id: "zd_tt_permissionErrors",
                                        content: "ok",
                                        callbackList: {
                                            mousedown: closeEPwithcloseExtension
                                        }
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
                            callbackList: {
                                mousedown: closeEPwithcloseExtension
                            }
                        }],
                        content: "<b>You are not in the portal .</b> sorry Permission is denited."
                    });
                } else if (res.message == "Invalid Value For Query Param orgId") {
                    createToolTipErrorPopupBox({
                        buttons: [{
                            id: "zd_tt_permissionErrors",
                            content: "ok",
                            callbackList: {
                                mousedown: closeEPwithcloseExtension
                            }
                        }],
                        content: "<b>unable to reach the server.</b> sorry try again some time later."
                    });
                } else if (res.message == "Invalid Portal") {
                    createToolTipErrorPopupBox({
                        buttons: [{
                            id: "zd_tt_permissionErrors",
                            content: "ok",
                            callbackList: {
                                mousedown: closeEPwithcloseExtension
                            }
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

/* manual background color input option */

document.getElementById("ChromeAddonManualBackgroundColorInput").addEventListener("input", );



function manualBackgroundColorSetter(e) {
    var bc = e.srcElement.value;
    if (bc != "") {
        try {
            if (isNaN(bc)) {
                tooltipBackgroundColourChanger(bc);
            }
            if (LastFocusedBC != document.getElementById("chromeAdd-onEditAddonButtonContainer").style.backgroundColor) {
                lastSelectedColorOptionNode.style.borderColor = "";
            }
        } catch (error) {
            console.log(error);
        }
    }
}


function zdttEditorBGColorChanger(color){
    return window.getComputedStyle( document.body ,null).getPropertyValue('background-color');
}



function tooltipBackgroundColourChanger(color) {
    var a = document.getElementsByClassName("KB_Editor_iframe")[0];
    a.contentDocument.body.style.backgroundColor = color;
    document.getElementById("chromeAdd-onEditAddonButtonContainer").style.background = color;
}

function separateColorHighliter(e) {
    if (e.srcElement.firstElementChild != null) {
        childEle = e.srcElement.firstElementChild;
        parentEle = childEle.parentNode;
    } else {
        childEle = e.target;
        parentEle = childEle.parentNode;
    }
    var bc = window.getComputedStyle(childEle, null).getPropertyValue('background-color');
    parentEle.style.borderColor = bc;
    if (lastSelectedColorOptionNode != null) {
        if (lastSelectedColorOptionNode != parentEle) {
            lastSelectedColorOptionNode.style.borderColor = "";
        }
    }
    tooltipBackgroundColourChanger(bc);
    LastFocusedBC = bc;
    lastSelectedColorOptionNode = parentEle;
}