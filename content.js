var zdttTriggerOldFocused = undefined;
var CloseIconMouseOverAction;
var zdtt_lastHighlightedObj = undefined;
var ArticlesObject = undefined;
var LastFocusedBC = undefined;
var lastSelectedColorOptionNode = undefined;
var zd_TT_sidePanelViewed = true ;
var zd_ATTitsEnabled = false;
var requestAPI = undefined ;
var organitationID = undefined;
var commomDomainNameForAPI = "desk.zoho.com";
var zd_tt_triggerListing = "ALL";
var zdTT_user = {};  
var lastLoadingElem = undefined;
var zd_tt_articleSelected = undefined;
var zd_tt_selectedArticleTitle = undefined;

var ConfigureObjects = undefined;
var TriggerListAllObjMaintanense = [];
var listOfTriggersObj = undefined;
var finalizedColor = "rgb(250,250,250)";

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
            if(loadingElem){
                elem.removeChild(loadingElem);
            }
            lastLoadingElem = undefined;
        }
    }
}

function deleteTheConfiguredTriggerEventFromRemoveEvent(element, event, zdtt_elementSelectorObj) {
    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        singleElementEventRemover(element, event);
        var parent = document.querySelector(element);
        var path = fullPath(parent);
        zdtt_elementSelectorObj.elementsArrayCreater({
            "type": "remove",
            "elemSelector": path
        });
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
                        callbackList:[{mouseup:deleteTheConfiguredTriggerEventFromRemoveEvent(triggers.element, triggers.event, zdtt_elementSelectorObj)}]
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
            editIcon.onclick = zdUpdateTrigger(currentObj);

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

function zdUpdateTrigger(currentObj){
    return function(){
        var focusedTriggerObj;
        var ind = 0;
        for(var obj of listOfTriggersObj){
            if(obj.id == currentObj.id){
                focusedTriggerObj = obj;
                zd_tt_focusedElementInd = ind;
            }
            ind++
        }
        if (focusedTriggerObj != undefined) {
            lastObjectOfUpdatedTriggerFUB = JSON.parse(JSON.stringify(focusedTriggerObj));
            ConfigureObjectForEdit = JSON.parse(JSON.stringify(focusedTriggerObj));
            zd_tt_addNewTrigger("update");
            updateTabClicked(ConfigureObjectForEdit.name);
            // zd_tt_triggerUpdate(focusedTriggerObj);
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
    zdttContainers.filterSwitch.onclick = popupCallback;
}

function zd_tt_triggerListInitiater(obj, loading) {
    if (obj.length != 0) {

        var triggerLists = ZohoDesk_tooltip_triggerList_creator(obj);
        // var div = document.createElement('div');
        // div.className = "zohodesk-Tooltip-panel-content zohodesk-Tooltip-trigger-content";
        // div.id = "zd_tt_listParent";
        // div.appendChild(triggerLists);
        if(loading){
            loading.remove();
        }
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
        emptyListPageCreater()
        if(loading){
            loading.remove();
        }
    }
}






function getConfiguredMessages(filter,loading) {
    var currentDomainName = window.location.hostname;
    requestAPI("https://" + commomDomainNameForAPI + "/api/web/extensions/" + ExtensionProjectId + "/messages?" + filter + "isEnabled=true&orgId=" + organitationID).get().then((res) => {
        if (res.responseStatus === 200) {
            res = res.obj;
            if (zd_ATTitsEnabled) {
                Chrome_Extension_RequireFunctionFlow(res);
                ConfigureObjects = res;
                for (var x = 0; x < res.length; x++) {
                    TriggerListAllObjMaintanense[x] = res[x];
                }
                listOfTriggersObj = res;
                if (res.length != 0) {
                    // zd_tt_triggerListInitiater(res,loading);
                    ZDTT_topHeaderTapsCreater();
                    listTabClicked();
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
                    callbackList: [{mousedown: closeEPwithcloseExtension}]
                }],
                content: "<b>unable to reach the server.</b> Please try again some time later."
            });
        }
    })
}

function postContentIntotheEditor(article, obj, injectTheIframeValue, zd_tt_editerInnerConent) {
    requestAPI('https://' + commomDomainNameForAPI + '/api/web/solutionsnippet/snippets/' + article.id + '?orgId=' + organitationID).get().then((res) => {
        if (res.responseStatus === 200) {
            if (res.obj.length != 0) {
                obj.components["0"].contentId = res.obj["0"].id;
                Chrome_Extension_ArticleSummary = res.obj["0"].snippet;
                lastArticleKBshortContent = res.obj["0"].snippet;
                if (zd_tt_editerInnerConent == "" || zd_tt_editerInnerConent == "<div><br></div>") {
                    obj.components["0"].content = res.obj["0"].snippet;
                    injectTheIframeValue.contentDocument.body.innerHTML = res.obj["0"].snippet;
                }
            } else {
                Chrome_Extension_ArticleSummary = article.summary;
                lastArticleKBshortContent = article.summary;
                if (zd_tt_editerInnerConent == "" || zd_tt_editerInnerConent == "<div><br></div>") {
                    obj.components["0"].content = article.summary;
                    injectTheIframeValue.contentDocument.body.innerHTML = "<div>" + article.summary + "</div>";
                }
            }
        } else {
            if (res.obj.message == "You Have No Permission to Perform this Action") {
                createToolTipErrorPopupBox({
                    id: "editorBody",
                    buttons: [{
                        id: "zd_tt_permissionErrors",
                        content: "ok",
                        callbackList: [{mousedown: closeEPwithcloseExtension}]
                    }],
                    content: "<b>You have no permission to configure this portal.</b> Please contact your PORTAL admin."
                });
            }
        }
    })
}

function zdttArticleSelectorBinder(id) {
    return function(e) {
        var obj = undefined;
        var injectTheIframeValue = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".KB_Editor_iframe");
        if (zdtt_nowStatus == "new") {
            obj = zd_tt_addTooltipObj;
        } else if (zdtt_nowStatus == "update") {
            obj = ConfigureObjectForEdit;
        }
        var zd_tt_editerInnerConent = obj.components["0"].content.split(" ").join("");
        for (article of ArticlesObject) {
            if (id == article.id) {
                zdttContainers.searchInp.value = article.title;
                postContentIntotheEditor(article, obj, injectTheIframeValue, zd_tt_editerInnerConent)
                zdtt_popupHide(zdttContainers.searchRes);
                zd_tt_articleSelected = true;
                zd_tt_selectedArticleTitle = article.title;
                zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zd_tt_artInpError").innerText = "";
                zdttContainers.searchInp.parentElement.className = zdttContainers.searchInp.parentElement.className.split(" zd_tt_notfilledErrorStyle").join('');
                window.postMessage({
                    name: "SingleArticle",
                    article: e.target.id
                }, "*");
            }
        }
    }
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
    else if (event.data.name == "articleSearchResult") {
        ArticlesObject = event.data.value;
        var parentDiv = zdttContainers.searchRes.querySelector("#zohodesk_Tooltip_dropdown_articles_parent_id1");
        parentDiv.innerHTML = "";

        var container = domElement.create({
            elemName: "ul",
            attributes: {
                class: "zohodesk-Tooltip-list"
            }
        });


        // var container = document.createElement("ul");
        // container.className = "zohodesk-Tooltip-list";
        if (ArticlesObject != undefined) {
            for(article of ArticlesObject){
               var child = domElement.create({
                    elemName: "li",
                    attributes: {
                        class: "zohodesk-Tooltip-dropdown-options",
                        id:article.id
                    },
                    elementData:{
                        child:[document.createTextNode(article.title)]
                    },
                    callbackList:[{click:zdttArticleSelectorBinder(article.id)}],
                    parent:container
                }); 
            }
            parentDiv.appendChild(container);
            // var element = document.getElementById("searchDisplay").getElementsByTagName('div')[1];
            // if (element != undefined) {
            //     element.parentElement.removeChild(element);
            // }
            // document.getElementById("searchDisplay").appendChild(parentDiv);
            // show("searchDisplay");
            zdtt_popupShow(zdttContainers.searchRes)()

            // document.getElementById("zohodesk_Tooltip_dropdown_articles_parent_id1").onclick = function(e) {
            //     Chrome_Extension_Get_Select_Article(e);
            // }
        }
    }
    else if (event.data.name == "SingleArticleObject") {
        var element;
        if (zdtt_nowStatus == "new") {
            zd_tt_addTooltipObj.components[0].solutionId = event.data.value.id;
            if (zd_tt_addTooltipObj.preferences["selector"] != undefined) {
                delete zd_tt_addTooltipObj.preferences["selector"];
            }
        } else if (zdtt_nowStatus == "update") {
            ConfigureObjectForEdit.components[0].solutionId = event.data.value.id;
            if (ConfigureObjectForEdit.preferences["selector"] != undefined) {
                delete ConfigureObjectForEdit.preferences["selector"];
            }
        }
    }
})

function ZT_HexColorValue() {};
ZT_HexColorValue.prototype.rgbToHex = function(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
};
ZT_HexColorValue.prototype.componentToHex = function(c) {
    this.hex = c.toString(16);
    return this.hex.length == 1 ? "0" + this.hex : this.hex;
}
ZT_HexColorValue.prototype.RGBAtoRGB = function(r, g, b, a, r2, g2, b2) {
    var r3 = Math.round(((1 - a) * r2) + (a * r))
    var g3 = Math.round(((1 - a) * g2) + (a * g))
    var b3 = Math.round(((1 - a) * b2) + (a * b))
    return "rgb(" + r3 + "," + g3 + "," + b3 + ")";
}

var zd_colorValueChanger = new ZT_HexColorValue();

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

function zd_tt_removeMouseOverElements() {
    zdtt_lastHighlighted = [];
    var elems = document.getElementsByClassName("zohodesk-Tooltip-currentShad");
    var child = undefined;
    if (elems.length) {
        for (var i = 0; i < elems.length; i++) {
            elems[i].className = elems[i].className.split("zohodesk-Tooltip-currentShad").join('');
        }
        prvsElems = undefined;
    }
    elems = document.getElementsByClassName("zohodesk-Tooltip-Configureborder");
    var len = elems.length;
    if (elems.length != 0) {
        for (var i = 0; i < len; i++) {
            var temp = elems[0];
            child = temp.querySelector("#zd_tt_triggerNameSpan");
            temp.className = temp.className.split("zohodesk-Tooltip-Configureborder").join('');
            if (child != undefined) {
                child.parentElement.removeChild(child);
            }
            child = undefined;
        }
    }
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
                        callbackList: [{mousedown: closeEPwithcloseExtension}]
                    }],
                    content: "<b>You dont have a admin permission for this portal.</b> sorry Permission is denited."
                });
            }
        } else {
            createToolTipErrorPopupBox({
                buttons: [{
                    id: "zd_tt_permissionErrors",
                    content: "ok",
                    callbackList: [{mousedown: closeEPwithcloseExtension}]
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
                    callbackList: [{mousedown: closeEPwithcloseExtension}]
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
                                        callbackList: [{mousedown: closeEPwithcloseExtension}]
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
                            callbackList: [{mousedown: closeEPwithcloseExtension}]
                        }],
                        content: "<b>You are not in the portal .</b> sorry Permission is denited."
                    });
                } else if (res.message == "Invalid Value For Query Param orgId") {
                    createToolTipErrorPopupBox({
                        buttons: [{
                            id: "zd_tt_permissionErrors",
                            content: "ok",
                            callbackList: [{mousedown: closeEPwithcloseExtension}]
                        }],
                        content: "<b>unable to reach the server.</b> sorry try again some time later."
                    });
                } else if (res.message == "Invalid Portal") {
                    createToolTipErrorPopupBox({
                        buttons: [{
                            id: "zd_tt_permissionErrors",
                            content: "ok",
                            callbackList: [{mousedown: closeEPwithcloseExtension}]
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
            setTimeoutVarForDeactive = setInterval(deactiveAsapTT, 500);
            break;

    }
}

var setTimeoutVarForDeactive;

function zd_tt_removeElement(sidePanelHost) {
    if(sidePanelHost){
        sidePanelHost.parentElement.removeChild(sidePanelHost);
    }
}

function deactiveAsapTT() {
    let minimizeIconHost = document.getElementById("zdtt_minimizeIconHost");
    let sidePanelHost    = document.getElementById("zdtt_sidePanelHost");

    let popBody = document.getElementById("ToolTipEditorPosition");
    let maximizeIcon = document.getElementById("maxiIcon");
    if(minimizeIconHost){
        minimizeIconHost.parentElement.removeChild(minimizeIconHost);
    }
    if(sidePanelHost){
        clearInterval(setTimeoutVarForDeactive);
        zd_tt_removeMouseOverElements();
        document.removeEventListener("mouseover",mouseLatestLocationFinder);
        mouseOverDone = true ;
        zd_tt_removeElement(sidePanelHost);
        overAllElementEventsRemover(TriggerListAllObjMaintanense);
        objInitializer();
    }
    ZD_ttErrorPopup.clearBindedEvent();
    ZD_ttErrorPopup.deleteTooltipErrorPopupBox();
}


/* manual background color input option */

// document.getElementById("ChromeAddonManualBackgroundColorInput").addEventListener("input", );



function manualBackgroundColorSetter(e) {
    var bc = e.srcElement.value;
    var latestBGC = "";
    if (bc != "") {
        try {
            if (isNaN(bc)) {
                latestBGC = tooltipBackgroundColourChanger(bc);
            }
            if (LastFocusedBC != latestBGC) {
                LastFocusedBC = undefined;
                finalizedColor = zdttEditorBGColorFinder(zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".KB_Editor_iframe").contentDocument.body);
                lastSelectedColorOptionNode.style.borderColor = "";
            }
        } catch (error) {
            console.log(error);
        }
    }
}


function zdttEditorBGColorFinder(elem){
    return window.getComputedStyle( elem ,null).getPropertyValue('background-color');
}



function tooltipBackgroundColourChanger(color) {
    var a = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".KB_Editor_iframe");
    a.contentDocument.body.style.backgroundColor = color;
    return zdttEditorBGColorFinder(a.contentDocument.body)
}

function separateColorHighliter(e) {
    var childEle = e.target;
    var parentEle = childEle.parentNode;
    var bc = zdttEditorBGColorFinder(childEle);
    finalizedColor = bc;
    if(bc=="rgb(255, 255, 255)"){
        parentEle.style.borderColor="rgba(0, 0, 0, 0.1)";
    }
    else{
        parentEle.style.borderColor = bc;
    };
    if (lastSelectedColorOptionNode) {
        if (lastSelectedColorOptionNode != parentEle) {
            lastSelectedColorOptionNode.style.borderColor = "";
        }
    }
    tooltipBackgroundColourChanger(bc);
    LastFocusedBC = bc;
    lastSelectedColorOptionNode = parentEle;
}

/* element select function revamp */

function removeSelectedTriggerPoint(path) {
    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.elementsArrayCreater({
            "type": "remove",
            "elemSelector": path
        })
    }
}

function findInnerElements(parentEleId, checkEle) {
    try {
        var innerElement = false
        var parentEle = document.getElementById(parentEleId);
        if (parentEle == checkEle) {
            innerElement = true;
        }
        var parentEleChild = parentEle.getElementsByTagName("*")
        var parentEleChildLen = parentEleChild.length
        for (i = 0; i < parentEleChildLen; i++) {
            if (checkEle == parentEleChild[i]) {
                innerElement = true
                break
            }
        }
        return innerElement
    } catch (err) {}
}

function zd_tt_elementSelector(obj) {
    this.selectedStatus = false;
    this.elementsArrayCreater = obj.elementsArrayCreater;
    this.prvsElems = undefined;
    this.Editor = this.Editor.bind(this);
    this.mouseover = this.mouseover.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseupEvent = this.mouseupEvent.bind(this);
    this.click = this.click.bind(this);
    this.dblclick = this.dblclick.bind(this);
};

zd_tt_elementSelector.prototype.Editor = function(e) {
    if (mouseOverDone == true) {
        if (e.target.className.indexOf(" zohodesk-Tooltip-Configureborder") == -1) {
            if (zd_tt_arrayOfElements.length <= 5) {
                var TName = undefined;
                var addTPInput = document.getElementById("zd_tt_changePointer");
                var elemPath = fullPath(e.target);
                this.elementsArrayCreater({
                    "type": "add",
                    "elemSelector": elemPath
                });
                e.target.className = e.target.className.split(" zohodesk-Tooltip-currentShad").join(" zohodesk-Tooltip-Configureborder");
                var delCallBack = removeSelectedTriggerPoint(elemPath);
                var deleteIcon = domElement.create({
                    elemName: "svg",
                    attributes: {
                        class:"zohodesk-Tooltip-deleteIcn"
                    },
                    elementData:{
                        innerHTML : `<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use>`
                    }
                })
                deleteIcon.style.display = "block";
                var dele = domElement.create({
                    elemName: "span",
                    attributes: {
                        class: "zohodesk-Tooltip-deleteIcn-cont"
                    },
                    elementData: {
                        child: [deleteIcon]
                    },
                    callbackList:[{click:delCallBack.bind(this)}]
                });

                if (zdttContainers.triggerNameInp.value.trim() != "") {
                    TName = zdttContainers.triggerNameInp.value;
                } else {
                    TName = "trigger name";
                }
                var triggerNameSpan = domElement.create({
                    elemName: "span",
                    attributes: {
                        class: "zohodesk-Tooltip-ConfigureCnt-addNew",
                        id: "zd_tt_triggerNameSpan"
                    },
                    elementData: {
                        innerHTML: "<span class='zdatt_triggerNames'>" + TName + "</span>",
                        child:[dele]
                    }
                });
                // var triggerNameSpan = document.createElement("span");
                // triggerNameSpan.className = "zohodesk-Tooltip-ConfigureCnt-addNew";
                // triggerNameSpan.id = "zd_tt_triggerNameSpan";
                // triggerNameSpan.innerHTML = "<span class='zdatt_triggerNames'>" + TName + "</span>";
                // var dele = document.createElement("span");
                // dele.className = "zohodesk-Tooltip-deleteIcn-cont";
                // dele.innerHTML = `<svg style="display: block;" class="zohodesk-Tooltip-deleteIcn"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use></svg>`;
                // dele.onclick = function(e) {
                //     e.preventDefault();
                //     e.stopPropagation();
                //     var parent = zdtt_getParentElementFC(e.target);
                //     var path = fullPath(parent);
                //     this.elementsArrayCreater({
                //         "type": "remove",
                //         "elemSelector": path
                //     });
                // }.bind(this);
                // triggerNameSpan.appendChild(dele);
                e.target.prepend(triggerNameSpan);
                this.selectedStatus = true;
                zdttAddTrigerPointer().bind();
                // let cancelBtn = document.getElementById("zdTT_changeTriggerCancel");
                // if (cancelBtn.className.indexOf("zohodesk-Tooltip-hide") == -1) {
                //     cancelBtn.className += " zohodesk-Tooltip-hide";
                // }
                // if (addTPInput.className.indexOf("zohodesk-Tooltip-panel-form-field-notallowed") != -1) {
                //     addTPInput.className = addTPInput.className.split(" zohodesk-Tooltip-panel-form-field-notallowed").join("");
                // }
                // addTPInput.addEventListener("click", zd_tt_addTrggerPoint, true);
                let successMsg = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zdtt_triggerSelectedMsg");
                successMsg.className = successMsg.className.split(" zohodesk-Tooltip-hide").join("");
                setTimeout(function() {
                    if (successMsg.className.indexOf("zohodesk-Tooltip-hide") == -1) {
                        successMsg.className += " zohodesk-Tooltip-hide";
                    }
                }, 2800);
                ArrayUndoElementList = [];
                blurPosition();
                if (zd_tt_arrayOfElements.length == 5) {
                    zdttAddTrigerPointer().unbind("limitReached");
                    // if (addTPInput.className.indexOf("zohodesk-Tooltip-panel-form-field-notallowed") == -1) {
                    //     addTPInput.className += " zohodesk-Tooltip-panel-form-field-notallowed";
                    // }
                    // addTPInput.removeEventListener("click", zd_tt_addTrggerPoint, true);
                    zd_tt_addTPBlocked = true;
                }
            } else {
                zdttAddTrigerPointer().unbind("limitReached");
                // if (addTPInput.className.indexOf("zohodesk-Tooltip-panel-form-field-notallowed") == -1) {
                //     addTPInput.className += " zohodesk-Tooltip-panel-form-field-notallowed";
                // }
                // addTPInput.removeEventListener("click", zd_tt_addTrggerPoint);
                zd_tt_addTPBlocked = true;
            }
        }
    }
}


zd_tt_elementSelector.prototype.mouseover = function(e) {
    if (e.target.localName != "use" && e.target.localName != "svg") {
        var nameSpan = findInnerElements('zd_tt_triggerNameSpan', e.target);
        var ElementListener = findInnerElements("zdtt_sidePanelHost", e.target);
        var TooltipListener = findInnerElements("Chrome_Extension_showContentId", e.target);
        var insertOption = findInnerElements('ze_link', e.target);
        var inserplurOption = findInnerElements('KB_Editor_Overlay', e.target);
        if (ElementListener != true && TooltipListener != true && insertOption != true && inserplurOption != true && nameSpan != true) {
            if (this.prvsElems != undefined && this.prvsElems != null) {
                this.prvsElems.className = this.prvsElems.className.split(" zohodesk-Tooltip-currentShad").join("");
            }
            if (e.target != document) {
                this.prvsElems = e.target;
            }
            if (this.prvsElems) {
                if (this.prvsElems.className.indexOf("configureElementsClass") == -1) {
                    this.prvsElems.className += " zohodesk-Tooltip-currentShad";
                }
            }
        }
    }
};

zd_tt_elementSelector.prototype.mousedown = function(e) {
    var ElementListener = findInnerElements("zdtt_sidePanelHost", e.target);
    var TooltipListener = findInnerElements("Chrome_Extension_showContentId", e.target);
    var insertOption = findInnerElements('ze_link', e.target);
    var inserplurOption = findInnerElements('KB_Editor_Overlay', e.target);
    var nameSpan = findInnerElements('zd_tt_triggerNameSpan', e.target);
    if (ElementListener != true && TooltipListener != true && insertOption != true && inserplurOption != true && nameSpan != true) {
        this.Editor(e);
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
    }
};

zd_tt_elementSelector.prototype.mouseupEvent = function(e) {
    var nameSpan = findInnerElements('zd_tt_triggerNameSpan', e.target);
    var ElementListener = findInnerElements("zdtt_sidePanelHost", e.target);
    var insertOption = findInnerElements('ze_link', e.target);
    var inserplurOption = findInnerElements('KB_Editor_Overlay', e.target);
    if (ElementListener != true && insertOption != true && inserplurOption != true && nameSpan != true) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
    }
};

zd_tt_elementSelector.prototype.click = function(e) {
    var nameSpan = findInnerElements('zd_tt_triggerNameSpan', e.target);
    var ElementListener = findInnerElements("zdtt_sidePanelHost", e.target);
    var TooltipListener = findInnerElements("Chrome_Extension_showContentId", e.target);
    var insertOption = findInnerElements('ze_link', e.target);
    var inserplurOption = findInnerElements('KB_Editor_Overlay', e.target);
    if (this.selectedStatus) {
        zdtt_elementSelectorObj.detachClickListener();
        this.selectedStatus = false;
    }
    if (ElementListener != true && TooltipListener != true && insertOption != true && inserplurOption != true && nameSpan != true) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
    }
};

zd_tt_elementSelector.prototype.dblclick = function(e) {
    document.removeEventListener('click', this.click, true);
    e.target.click();
    document.addEventListener('click', this.click, true);
};

zd_tt_elementSelector.prototype.attachListeners = function() {
    document.addEventListener("mouseover", this.mouseover, true);
    document.addEventListener("mousedown", this.mousedown, true);
    document.addEventListener("mouseup", this.mouseupEvent, true);
    document.addEventListener("click", this.click, true);
    document.addEventListener("dblclick", this.dblclick, true);
};

zd_tt_elementSelector.prototype.detachClickListener = function() {
    document.removeEventListener("mouseover", this.mouseover, true);
    document.removeEventListener("mousedown", this.mousedown, true);
    document.removeEventListener("mouseup", this.mouseupEvent, true);
    document.removeEventListener("click", this.click, true);
    document.removeEventListener("dblclick", this.dblclick, true);
};


function zdtt_getParentElementFC(e) {
    if (e.localName != "use" && e.localName != "svg") {
        if (e.className.indexOf("zohodesk-Tooltip-Configureborder") != -1) {
            return e;
        } else {
            return zdtt_getParentElementFC(e.parentElement);
        }
    } else {
        return zdtt_getParentElementFC(e.parentElement);
    }
}

/* element select function revamp end */


function withoutSidepanelEditOpt(obj) {
    var sidePanelElem = zdttContainers.zdtt_sidePanelDirectChild;
    var obj = obj;
    // var ind = ind;
    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        zd_tt_removeMouseOverElements();
        if (zdtt_lastHighlightedObj != undefined) {
            delete zdtt_lastHighlightedObj["dontEdit"];
        }
        zdtt_lastHighlightedObj = obj;
        zdtt_lastHighlightedObj["dontEdit"] = true;
        zd_TT_sidePanelViewed = true;
        if (sidePanelElem.className.indexOf("zohodesk-Tooltip-hide") != -1) {
            sidePanelElem.className = sidePanelElem.className.split(" zohodesk-Tooltip-hide").join("");
        }
        var maximizeIcon = document.getElementById("maxiIcon");
        if (maximizeIcon) {
            maximizeIcon.parentElement.removeChild(maximizeIcon);
        }
        // lastObjectOfUpdatedTriggerFUB = JSON.parse(JSON.stringify(obj));
        // ConfigureObjectForEdit = JSON.parse(JSON.stringify(obj));
        // zd_tt_focusedElementInd = ind;
        // zd_tt_triggerUpdate(obj);
        zdUpdateTrigger(obj)();
        zdATTupdatedElemetsHighlighter(obj);
    }
}


function dragElement(elmnt,parentElem) {
    var pos1 = 0,pos2 = 0,pos3 = 0,pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    elmnt.onclick = function(e){e.preventDefault();e.stopPropagation()}
    // if ( parentElem ) {
    // } else {
    //     elmnt.onmousedown = dragMouseDown;
    // }

    function dragMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener("mouseup",closeDragElement,true);
        document.addEventListener("mousemove",elementDrag,true);
    }

    function elementDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        var elemDimentions = parentElem.getBoundingClientRect();
        if (parentElem.offsetTop - pos2 > 5) {
            if(((parentElem.offsetTop - pos2)+elemDimentions.height+10) < window.innerHeight ){
                parentElem.style.top = (parentElem.offsetTop - pos2) + "px";
            }
        }
        if (parentElem.offsetLeft - pos1 > 10) {
            if(((parentElem.offsetLeft - pos1)+elemDimentions.width+30) < window.innerWidth ){
                parentElem.style.left = (parentElem.offsetLeft - pos1) + "px";
            }
        }
    }

    // function moveToCorner(a,b){
    //     if((a.width/2) > ( (b.width/2)+(b.left) )){
    //         elmnt.style.transition = "0.5s";
    //         elmnt.style.left = "10px";
    //     }
    //     else if((a.width/2) < ( (b.width/2)+(b.left) )){
    //         elmnt.style.transition = "0.5s";
    //         elmnt.style.left = (a.width-(b.width+30))+"px";
    //     }
    //     else{
    //         elmnt.style.transition = "0.5s";
    //         elmnt.style.left = "10px";
    //     }
    // }

    function closeDragElement() {
        // var winDimentions = {
        //     height : window.innerHeight ,
        //     width  : window.innerWidth
        // }
        // var targetDimentions = {
        //     height : parentElem.offsetHeight ,
        //     width  : parentElem.offsetWidth
        // }
        // moveToCorner(winDimentions,elmnt.getBoundingClientRect());
        // elmnt.style.transition = null;
        document.removeEventListener("mouseup",closeDragElement,true);
        document.removeEventListener("mousemove",elementDrag,true);
    }
}


function minimiseZDTTsidePanel() {

    

    // var maximizeElem = document.createElement("div");
    // maximizeElem.id="maxiIcon";
    // maximizeElem.className="maximiseIco zohodesk-Tooltip-hide";
    // maximizeElem.onclick = maximizeSidePanel;
    // maximizeElem.innerHTML = innerChilds ;

    // zdttTempParent.appendChild(maximizeElem);
    var maximizeElem = zdtt_minimizeIconHost.shadowRoot.querySelector("#maxiIcon");
    maximizeElem.style.zIndex = editerBodyZI;
    dragElement(maximizeElem.querySelector("#zdtt_dragDiv") ,maximizeElem);
    zd_TT_sidePanelViewed = false;
    objInitializer();
    zd_tt_removeMouseOverElements();
    var sidePanelParent = zdttContainers.zdtt_sidePanelDirectChild;
    if (sidePanelParent != undefined) {
        sidePanelParent.className += " zohodesk-Tooltip-hide";
    }
    maximizeElem.className = maximizeElem.className.split(" zohodesk-Tooltip-hide").join("")
    if (zdtt_elementSelectorObj != undefined) {
        zdtt_elementSelectorObj.detachClickListener();
        zdtt_elementSelectorObj = undefined;
    };
    if (TriggerListAllObjMaintanense.length != 0) {
        for (var i = 0; i < TriggerListAllObjMaintanense.length; i++) {
            var crntObj = TriggerListAllObjMaintanense[i];
            for (var j = 0; j < crntObj.triggers.length; j++) {
                var elem = document.querySelector(crntObj.triggers[j].element);
                if (elem != undefined) {
                    elem.className += " zohodesk-Tooltip-Configureborder";
                    var nameSpanPrnt = document.createElement("span");
                    nameSpanPrnt.className = "zohodesk-Tooltip-ConfigureCnt";
                    nameSpanPrnt.id = "zd_tt_triggerNameSpan";
                    nameSpanPrnt.innerHTML = "<span class='zdatt_triggerNames'>" + crntObj.name + " (" + crntObj.triggers.length + ")" + "</span>";
                    var editIcon = document.createElement("span");
                    editIcon.className = "zohodesk-Tooltip-deleteIcn-cont";
                    editIcon.innerHTML = "<svg style='display:block' class='zohodesk-Tooltip-deleteIcn'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#edit'></use></svg>";
                    editIcon.onmousedown = function(e) {
                        e.preventDefault();
                        e.stopPropagation()
                    };
                    editIcon.onmouseup = function(e) {
                        e.preventDefault();
                        e.stopPropagation()
                    };
                    editIcon.onclick = withoutSidepanelEditOpt(crntObj, i);
                    nameSpanPrnt.appendChild(editIcon);
                    elem.prepend(nameSpanPrnt);
                }
            }
        }
    }
}

function maximizeSidePanel(e){
    e.preventDefault();
    e.stopPropagation();
    if(e.target.className && e.target.className=="zohodesk-Tooltip-draggableDiv"){
        return
    }
    else if( (typeof(e.target.className)=="string") && e.target.className.trim()=="" ){
        return
    }
    zd_tt_removeMouseOverElements();
    var sidePanelElem = zdttContainers.zdtt_sidePanelDirectChild;
    if (sidePanelElem.className.indexOf("zohodesk-Tooltip-hide") != -1) {
        sidePanelElem.className = sidePanelElem.className.split(" zohodesk-Tooltip-hide").join("");
    }
    var maximizeIcon = zdtt_minimizeIconHost.shadowRoot.querySelector("#maxiIcon");
    if (maximizeIcon != undefined) {
        maximizeIcon.className += " zohodesk-Tooltip-hide";
    }
    zd_tt_triggerListInitiater(listOfTriggersObj);
    if (zdtt_elementSelectorObj != undefined) {
        zdtt_elementSelectorObj.detachClickListener();
        zdtt_elementSelectorObj = undefined;
    };
    if (lastObjectOfUpdatedTriggerFUB != undefined) {
        zdttElementEventRemover(lastObjectOfUpdatedTriggerFUB);
        Chrome_Extension_RequireFunctionFlow([lastObjectOfUpdatedTriggerFUB]);
    }
    // var taps = document.getElementsByClassName("zohodesk-Tooltip-selectedOpts");
    // if (taps.length != 0) {
    //     var len = taps.length;
    //     for (var i = 0; i < len; i++) {
    //         taps[0].className = taps[0].className.split("zohodesk-Tooltip-selectedOpts").join("");
    //     }
    // }
    // if (document.getElementById("header-comenContainer") != undefined) {
    //     if (document.getElementById("updateTriggerNameTap").className.indexOf(" zohodesk-Tooltip-hide") == -1) {
    //         document.getElementById("updateTriggerNameTap").className += "zohodesk-Tooltip-hide";
    //     }
    //     document.getElementById("triggerListViewTap").className += " zohodesk-Tooltip-selectedOpts";
    // }
    // zd_tt_removeMouseOverElements();
    // objInitializer();
    // zdtt_nowStatus = "new";
    listTabClicked();
}
