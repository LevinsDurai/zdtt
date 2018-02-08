function objInitializer() {
    location.href = 'javascript:chrome_addons_inner_text=""; void 0';
    AnchorTagsList = [];
    if (zdtt_lastHighlightedObj != undefined) {
        delete zdtt_lastHighlightedObj["dontEdit"];
        zdtt_lastHighlightedObj = undefined;
    }
    zdttTriggerOldFocused = undefined;
    zd_tt_addTooltipObj = {
        "components": [{
            "type": "ARTICLESNIPPET",
            "preferences": null,
            "order": "0",
            "solutionId": undefined,
            "content": ""
        }],
        "isEnabled": true,
        "name": undefined,
        "preferences": {
            "bgColor": "#ffffff",
            "viewSize": "LARGE"
        },
        "triggers": [],
        "viewtype": "TOOLTIP"
    };
    ConfigureObjectForEdit = undefined;
    zd_tt_arrayOfElements = [];
    Trigger_option = "HOVER";
    zdtt_nowStatus = "new";
    lastArticleKBshortContent = undefined;
    lastObjectOfUpdatedTriggerFUB = undefined;
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

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

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function sidePanel_align_EventBinder() {
    this.iconSpan = document.getElementById("sidePanel_float").firstElementChild;
    this.status = "Right";
    this.leftIcon = `<svg class="zohodesk-tooltip-svg-icon-medium"><use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#Tooltip-alignleft"></use></svg>`;
    this.rightIcon = `<svg class="zohodesk-tooltip-svg-icon-medium"><use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#Tooltip-alignright"></use></svg>`;
}
sidePanel_align_EventBinder.prototype.toggle = function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.status == "Right" ? this.iconSpan.innerHTML = this.leftIcon : this.iconSpan.innerHTML = this.rightIcon;
    this.status == "Right" ? this.status = "Left" : this.status = "Right";
    var element = document.getElementById("ToolTipEditorPosition");
    element.className.indexOf('zohodesk-Tooltip-panel-left') == -1 ? element.className += " zohodesk-Tooltip-panel-left" : element.className = element.className.split(' zohodesk-Tooltip-panel-left').join('');
};
sidePanel_align_EventBinder.prototype.thisBinder = function() {
    this.toggle = this.toggle.bind(this);
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_toggleHighlighter() {
    var li = document.getElementsByClassName('zohodesk-Tooltip-toggleTap-li');
    li[0].addEventListener('mousedown', function() {
        if (li[0].className.indexOf(' zohodesk-Tooltip-selectedOpts') == -1) {
            li[0].className += " zohodesk-Tooltip-selectedOpts";
            if (zdtt_elementSelectorObj != undefined) {
                zdtt_elementSelectorObj.detachClickListener();
            }
            if (lastObjectOfUpdatedTriggerFUB != undefined) {
                zdttElementEventRemover(lastObjectOfUpdatedTriggerFUB);
                Chrome_Extension_RequireFunctionFlow([lastObjectOfUpdatedTriggerFUB]);
            }
            objInitializer();
            zd_tt_removeMouseOverElements();
            zd_tt_triggerListInitiater(listOfTriggersObj);
            li[1].className = li[1].className.split(" zohodesk-Tooltip-selectedOpts").join("");
            if (li[1].className.indexOf("zohodesk-Tooltip-hide") == -1) {
                li[1].className += " zohodesk-Tooltip-hide";
            }
            li[2].className = li[2].className.split(" zohodesk-Tooltip-selectedOpts").join("");
        }
    });
    li[2].addEventListener('mousedown', function() {
        if (li[2].className.indexOf(' zohodesk-Tooltip-selectedOpts') == -1) {
            objInitializer();
            if (lastObjectOfUpdatedTriggerFUB != undefined) {
                zdttElementEventRemover(lastObjectOfUpdatedTriggerFUB);
                Chrome_Extension_RequireFunctionFlow([lastObjectOfUpdatedTriggerFUB]);
            }
            if (zdtt_elementSelectorObj != undefined) {
                zdtt_elementSelectorObj.detachClickListener();
            }
            document.getElementById("ZDTT_switching_comonElem").className = document.getElementById("ZDTT_switching_comonElem").className.split(" zohodesk-Tooltip-height").join('');
            li[0].className = li[0].className.split(" zohodesk-Tooltip-selectedOpts").join("");
            li[1].className = li[1].className.split(" zohodesk-Tooltip-selectedOpts").join("");
            if (li[1].className.indexOf("zohodesk-Tooltip-hide") == -1) {
                li[1].className += " zohodesk-Tooltip-hide";
            }
            li[2].className += " zohodesk-Tooltip-selectedOpts";
            zd_tt_removeMouseOverElements();
            location.href = 'javascript:chrome_addons_inner_text=""; void 0';
            zd_tt_addNewTrigger("new");
            zdtt_nowStatus = "new";
        }
    });
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */


function ZDTT_topHeaderTapsCreater() {
    // sample.eventBinders();
    if (document.getElementById("header-comenContainer") == undefined) {
        var header = document.getElementById('zdtt_headerContainer');
        var html = `<ul class="zohodesk-Tooltip-cl-both zohodesk-Tooltip-list" id="zdtt-taps-parent">
              <li class="zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-fl-lft zohodesk-Tooltip-selectOpts zohodesk-Tooltip-selectedOpts" id="triggerListViewTap">
                Triggers
              </li>
              <li class="zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-fl-lft zohodesk-Tooltip-selectOpts zohodesk-Tooltip-hide" id="updateTriggerNameTap">
              </li>
              <li class="zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-greenclr zohodesk-Tooltip-fl-rt zohodesk-Tooltip-selectOpts" id="addNewTriggerTap">
                + Add New
              </li>
            </ul>`;
        var div = document.createElement('div');
        div.className = "zohodesk-Tooltip-selectOptsContent";
        div.id = "header-comenContainer";
        div.innerHTML = html;
        header.appendChild(div);
        zd_tt_toggleHighlighter();
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function ZDTT_topHeaderTapsRemover() {
    var element = document.getElementById('header-comenContainer');
    element.parentElement.removeChild(element);
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */


function zd_tt_cloaseTooltip() {
    document.getElementById("closeEditor").onclick = function(e) {
        minimiseZDTTsidePanel();
    }
}



/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_exitAsapTooltip() {
    var parent = document.getElementById("ToolTipEditorPosition");
    parent.parentElement.removeChild(parent);
}


/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */


function inputParentFocus(e) {
    var parent = e.target.parentElement;
    if (parent.className.indexOf("zd_tt_notfilledErrorStyle") != -1) {
        parent.className = parent.className.split(" zd_tt_notfilledErrorStyle").join("");
        blurPosition();
    }
    parent.className += " zohodesk-Tooltip-active"
};


/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */


function zd_tt_addTrggerPoint(e) {
    var successMsg = document.getElementById("zdtt_triggerSelectedMsg");
    if (successMsg.className.indexOf("zohodesk-Tooltip-hide") == -1) {
        successMsg.className += " zohodesk-Tooltip-hide";
    }
    zdtt_elementSelectorObj.attachListeners();
    e.currentTarget.nextElementSibling.className = e.currentTarget.nextElementSibling.className.split(" zohodesk-Tooltip-hide").join("");
    e.currentTarget.className += " zohodesk-Tooltip-panel-form-field-notallowed";
    document.getElementById("zd_tt_changePointer").removeEventListener("click", zd_tt_addTrggerPoint, true);
    blurPosition();
};


/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_showTMEO(e) {
    zd_tt_showTrigger(e.target);
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_showTrigger(e) {
    document.getElementById("zohodesk_tooltip_trigger").innerHTML = e.innerHTML;
    if (e.innerHTML == "On Hover") {
        Trigger_option = "HOVER";
    } else {
        Trigger_option = "CLICK";
    }
}


/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_triggerSOS(e) {
    zd_tt_triggerSizeOptionSelector(e.target)
}


/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_triggerSizeOptionSelector(e) {
    var obj = undefined;
    if (zdtt_nowStatus == "new") {
        obj = zd_tt_addTooltipObj;
    } else if (zdtt_nowStatus == "update") {
        obj = ConfigureObjectForEdit;
    }
    document.getElementById("zohodesk_tooltip_size_shown_id").innerHTML = e.innerHTML;
    if (e.innerText == "Small") {
        obj.preferences.viewSize = "SMALL";
        document.getElementById("zdttSizeCharInform").innerHTML = "Max 70 characters";
    } else if (e.innerText == "Medium") {
        obj.preferences.viewSize = "MEDIUM";
        document.getElementById("zdttSizeCharInform").innerHTML = "Max 100 characters";
    } else if (e.innerText == "Large") {
        obj.preferences.viewSize = "LARGE";
        document.getElementById("zdttSizeCharInform").innerHTML = "Max 150 characters";
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function Chrome_Extension_Get_Select_Article(e) {
    var obj = undefined;
    var injectTheIframeValue = document.getElementsByClassName("KB_Editor_iframe")[0];
    var childrens = e.target.parentElement.children;
    if (zdtt_nowStatus == "new") {
        obj = zd_tt_addTooltipObj;
    } else if (zdtt_nowStatus == "update") {
        obj = ConfigureObjectForEdit;
    }
    var zd_tt_editerInnerConent = obj.components["0"].content.split(" ").join("");
    if (childrens.length != 0) {
        for (i = 0; i < childrens.length; i++) {
            if (childrens[i] == e.target) {
                if (e.target.id == ArticlesObject[i].id) {
                    document.getElementById("searchArticleBox").value = ArticlesObject[i].title;
                    document.getElementById("Chrome_Extension_AnChorTag").removeAttribute("ancId");

                    postContentIntotheEditor(i, obj, injectTheIframeValue, zd_tt_editerInnerConent)

                    document.getElementById("Chrome_Extension_AnChorTag").innerHTML = "Select Anchor tag";
                    AnchorTagsList = [];
                    hide("searchDisplay");
                    zd_tt_articleSelected = true;
                    document.getElementById("zd_tt_artInpError").innerText = "";
                    document.getElementById("zdtt_aserchParent").className = document.getElementById("zdtt_aserchParent").className.split(" zd_tt_notfilledErrorStyle").join('');
                    window.postMessage({
                        name: "SingleArticle",
                        article: e.target.id
                    }, "*");
                }
            }
        }
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function Zohodesk_Tooltip_mousedownActionShow(e) {
    if (ZohodeskTooltipCommonShowHideVariable != "") {
        tempVariable = ZohodeskTooltipCommonShowHideVariable;
        document.addEventListener('click', Zohodesk_Tooltip_clickActionHide, true);
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function postContentIntotheEditor(i, obj, injectTheIframeValue, zd_tt_editerInnerConent) {
    requestAPI('https://' + commomDomainNameForAPI + '/api/web/solutionsnippet/snippets/' + ArticlesObject[i].id + '?orgId=' + organitationID).get().then((res) => {
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
                Chrome_Extension_ArticleSummary = ArticlesObject[i].summary;
                lastArticleKBshortContent = ArticlesObject[i].summary;
                if (zd_tt_editerInnerConent == "" || zd_tt_editerInnerConent == "<div><br></div>") {
                    obj.components["0"].content = ArticlesObject[i].summary;
                    injectTheIframeValue.contentDocument.body.innerHTML = "<div>" + ArticlesObject[i].summary + "</div>";
                }
            }
        } else {
            if (res.obj.message == "You Have No Permission to Perform this Action") {
                createToolTipErrorPopupBox({
                    id: "editorBody",
                    buttons: [{
                        id: "zd_tt_permissionErrors",
                        content: "ok"
                    }],
                    content: "<b>You have no permission to configure this portal.</b> sorry contact your PORTAL admin."
                });
                document.addEventListener("mousedown", errorPopupCallbackFunction, true);
            }
        }
    })
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function hide(elementId) {
    var element = document.getElementById(elementId);
    if (element != undefined) {
        element.parentElement.className = element.parentElement.className.split(" zohodesk-Tooltip-active").join("");
        var getClass = element.className;
        var splitClass = getClass.split(" ");
        if (splitClass[splitClass.length - 1] == "zohodesk-displayBlock") {
            var ordinaryClass = splitClass.slice(0, splitClass.length - 1);
            ordinaryClass = ordinaryClass.join(" ");
            element.className = ordinaryClass;
        }
        if (tempVariable == ZohodeskTooltipCommonShowHideVariable) {
            ZohodeskTooltipCommonShowHideVariable = "";
        }
    }
    document.removeEventListener('click', Zohodesk_Tooltip_clickActionHide, true);
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zohoDesk_callEditerIntegration() {
    if (document.getElementsByClassName("desk_support_chromeAddons").length === 3) {
        location.href = "javascript:functionLoaderCheck(); void 0";
    }
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function show(elementId) {
    var element = document.getElementById(elementId);
    if (element != undefined) {
        if (elementId != "triggerTapDropdown" && elementId != "zohoDeskUserDetailsInfoPopup") {
            element.parentElement.className += " zohodesk-Tooltip-active";
        }
        var getClass = element.className;
        var splitClass = getClass.split(" ");
        if (splitClass[splitClass.length - 1] != "zohodesk-displayBlock") {
            var addClass = getClass + " zohodesk-displayBlock";
            element.className = addClass;
        }
        ZohodeskTooltipCommonShowHideVariable = elementId;
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function Zohodesk_Tooltip_clickActionHide() {
    hide(tempVariable);
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function getArticleName(searchStr) {
    searchStr = searchStr + "*";
    window.postMessage({
        name: "Article",
        article: searchStr
    }, "*");
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function objectCreaters(type) {
    var obj = undefined;
    if (type == "new") {
        obj = zd_tt_addTooltipObj;
    } else if (type == "update") {
        obj = ConfigureObjectForEdit;
    }
    return {
        'triggerObjUpdater': function(e) {
            if (e.target.value.trim() == "") {
                obj.name = undefined;
                var nameSpanList = document.getElementsByClassName("zdatt_triggerNames");
                for (var i = 0; i < nameSpanList.length; i++) {
                    nameSpanList[i].innerHTML = "trigger name";
                }
                var errorElem = document.getElementById("zd_tt_tnError");
                if (errorElem.innerText.trim() == "") {
                    errorElem.innerHTML = "* Fill the trigger name input box .";
                }
                blurPosition();
            } else {
                obj.name = e.target.value.trim();
                var nameSpanList = document.getElementsByClassName("zdatt_triggerNames");
                for (var i = 0; i < nameSpanList.length; i++) {
                    nameSpanList[i].innerHTML = obj.name;
                }
                document.getElementById("zd_tt_tnError").innerHTML = "";
                blurPosition();
            }
        },
        'elementsArrayCreater': function(obj) {
            if (obj.type == "add") {
                var blrDiv = document.getElementsByClassName('zohodesk-Tooltip-plurdiv');
                if (blrDiv.length != 0) {
                    var len = blrDiv.length;
                    for (var i = 0; i < len; i++) {
                        blrDiv[0].parentElement.removeChild(blrDiv[0]);
                    }
                    if (document.getElementsByClassName("zohodesk-Tooltip-panel-contentplur").length != 0) {
                        var elemClass = document.getElementsByClassName("zohodesk-Tooltip-panel-contentplur")[0];
                        elemClass.className = elemClass.className.split(" zohodesk-Tooltip-panel-contentplur").join("");
                    }
                }
                zd_tt_arrayOfElements.push(obj.elemSelector);
                var addTPInput = document.getElementById("zdTT_triggerPointCount");
                if (zd_tt_arrayOfElements.length == 0) {
                    if (addTPInput.className.indexOf("zohodesk-Tooltip-hide") == -1) {
                        addTPInput.className = " zohodesk-Tooltip-hide";
                    }
                } else {
                    if (addTPInput.className.indexOf("zohodesk-Tooltip-hide") != -1) {
                        addTPInput.className = addTPInput.className.split(" zohodesk-Tooltip-hide").join("");
                    }
                    addTPInput.innerText = zd_tt_arrayOfElements.length;
                }
                ArrayUndoElementList = [obj.elemSelector];
            } else if (obj.type == "remove") {
                var element = document.querySelector(obj.elemSelector);
                zd_tt_arrayOfElements = zd_tt_arrayOfElements.filter(function(elementSelector) {
                    return elementSelector != obj.elemSelector;
                });

                var addTPInput = document.getElementById("zdTT_triggerPointCount");
                if (zd_tt_arrayOfElements.length == 0) {
                    if (addTPInput.className.indexOf("zohodesk-Tooltip-hide") == -1) {
                        addTPInput.className += " zohodesk-Tooltip-hide";
                    }
                } else {
                    if (addTPInput.className.indexOf("zohodesk-Tooltip-hide") != -1) {
                        addTPInput.className = addTPInput.className.split(" zohodesk-Tooltip-hide").join("");
                    }
                    addTPInput.innerText = zd_tt_arrayOfElements.length;
                }
                element.removeChild(element.querySelector("#zd_tt_triggerNameSpan"));
                element.className = element.className.split(" zohodesk-Tooltip-Configureborder").join("");
                if (zd_tt_arrayOfElements.length == 0) {
                    var contPlurParent = document.getElementById("ZDTT_switching_comonElem").querySelector(".zohodesk-Tooltip-panel-content");
                    contPlurParent.className += " zohodesk-Tooltip-panel-contentplur";
                    contPlurParent.scrollTop = 0;
                    var contPlurChild = document.createElement("div");
                    contPlurChild.className = "zohodesk-Tooltip-plurdiv";
                    contPlurParent.appendChild(contPlurChild);
                    blurPosition();
                }
                if (zd_tt_arrayOfElements.length < 5 && zd_tt_addTPBlocked) {
                    var input = document.getElementById("zd_tt_changePointer");
                    if (input.className.indexOf("zohodesk-Tooltip-panel-form-field-notallowed") != -1) {
                        input.className = input.className.split(" zohodesk-Tooltip-panel-form-field-notallowed").join("");
                    }
                    input.addEventListener("click", zd_tt_addTrggerPoint, true);
                    zd_tt_addTPBlocked = false;
                }
            }
        },

    }
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function blurPosition() {
    var blurElem = document.getElementsByClassName("zohodesk-Tooltip-plurdiv")[0];
    if (blurElem != undefined) {
        var lastElem = document.getElementById("zdtt_plurPositionElem");
        blurElem.style.top = (lastElem.offsetHeight + lastElem.offsetTop + 3) + "px";
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function inputParentBlur(e) {
    if (e.target.id == "zd_tt_triggerName") {
        if (e.target.value.trim() == "") {
            e.target.parentElement.className += " zd_tt_notfilledErrorStyle";
            document.getElementById("zd_tt_tnError").innerText = "* Fill the trigger name input box .";
            blurPosition();
        }
    }
    if (e.target.id.trim() == "searchArticleBox") {
        if (zd_tt_articleSelected != true) {
            e.target.parentElement.className += " zd_tt_notfilledErrorStyle";
            document.getElementById("zd_tt_artInpError").innerText = "* search and choose any one article .";
        }
    }
    e.target.parentElement.className = e.target.parentElement.className.split(" zohodesk-Tooltip-active").join('')
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zdTT_logOut() {
    requestAPI("https://accounts.zoho.com/logout").get().then((res) => {
        chrome.runtime.sendMessage({
            "message": "zd_ATTitsEnabledStatus",
            "data": zd_ATTitsEnabled
        });
        zd_ATTitsEnabled = zd_ATTitsEnabled ? false : true;
    });
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_commenEventsBinder() {
    var zdtt_sidePanalAlign = new sidePanel_align_EventBinder();
    zdtt_sidePanalAlign.thisBinder();
    document.getElementById("sidePanel_float").onmouseup = zdtt_sidePanalAlign.toggle;
    zd_tt_cloaseTooltip();
    userDetailsPopupEvent();
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function userDetailsPopupEvent() {
    let userInfIcon = document.getElementById("userInfoIcon");
    userInfIcon.onclick = userInfoIconEvent;
    let logout = document.getElementById("ZDTT_logOutBtn");
    logout.onclick = zdTT_logOut;
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function userInfoIconEvent(event) {
    show("zohoDeskUserDetailsInfoPopup");
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */


function zd_tt_loadinigContainerRemove() {
    var loading = document.getElementById('zdtt_loadingContainer');
    if (loading != undefined) {
        loading.parentElement.removeChild(loading);
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_loadinigContainerAdd(id) {
    var loading = `<div class="loading-area" id="zdtt_loadingContainer">
                  <div class="loading-content">
                      <div class="loading-item"></div>
                  </div>
                  <div>loading...</div>
              </div>`;
    document.getElementById(id).innerHTML = loading;
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zd_tt_highlightTrigger(e) {
    var zd_tt_ConfSelectedTrigger;
    var li = zd_tt_getParentLi(e.target);
    if (li.className.indexOf("zohodesk-Tooltip-triggerlist-FocusedTriggerDetails") == -1) {
        li.className += " zohodesk-Tooltip-triggerlist-FocusedTriggerDetails";
        if (zdttTriggerOldFocused != undefined) {
            zdttTriggerOldFocused.className = zdttTriggerOldFocused.className.split(" zohodesk-Tooltip-triggerlist-FocusedTriggerDetails").join("");
            delete zdtt_lastHighlightedObj["dontEdit"]
        }
        zdttTriggerOldFocused = li;
    }
    for (var i = 0; i < listOfTriggersObj.length; i++) {
        if (li.id == listOfTriggersObj[i].id) {
            var currentObj = listOfTriggersObj[i];
            currentObj["dontEdit"] = true;
            zdtt_lastHighlightedObj = currentObj;
            break
        }
    }
    if (zdtt_lastHighlighted.length != 0) {
        for (var j = 0; j < zdtt_lastHighlighted.length; j++) {
            zd_tt_ConfSelectedTrigger = document.querySelector(zdtt_lastHighlighted[j]);
            if (zd_tt_ConfSelectedTrigger != null) {
                zd_tt_ConfSelectedTrigger.className = zd_tt_ConfSelectedTrigger.className.replace(" zohodesk-Tooltip-Configureborder", "");
                zd_tt_ConfSelectedTrigger.removeChild(zd_tt_ConfSelectedTrigger.firstElementChild);
            }
        }
        zdtt_lastHighlighted = [];
    }
    zdATTupdatedElemetsHighlighter(currentObj);
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function deleteTheConfiguredTriggerEventFromRemoveEvent(element, event, zdtt_elementSelectorObj) {
    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        singleElementEventRemover(element, event);
        var parent = zdtt_getParentElementFC(e.target);
        var path = fullPath(parent);
        zdtt_elementSelectorObj.elementsArrayCreater({
            "type": "remove",
            "elemSelector": path
        });
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zdATTupdatedElemetsHighlighter(currentObj) {
    for (var i = 0; i < currentObj.triggers.length; i++) {
        var a = i;
        var triggerElement = document.querySelector(currentObj.triggers[i].element);
        if (triggerElement != null) {
            zdtt_lastHighlighted.push(currentObj.triggers[i].element);
            if (triggerElement.className.indexOf(" zohodesk-Tooltip-Configureborder") == -1) {
                triggerElement.className += " zohodesk-Tooltip-Configureborder";
                var triggerNameSpan = document.createElement("span");
                triggerNameSpan.className = "zohodesk-Tooltip-ConfigureCnt";
                triggerNameSpan.id = "zd_tt_triggerNameSpan";
                triggerNameSpan.innerHTML = "<span class='zdatt_triggerNames'>" + currentObj.name + "</span>";
                if (zdtt_nowStatus == "update") {
                    var dele = document.createElement("span");
                    dele.className = "zohodesk-Tooltip-deleteIcn-cont";
                    dele.innerHTML = `<svg style="display: block;" class="zohodesk-Tooltip-deleteIcn"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use></svg>`;
                    dele.onmouseup = deleteTheConfiguredTriggerEventFromRemoveEvent(currentObj.triggers[i].element, currentObj.triggers[i].event, zdtt_elementSelectorObj);
                    triggerNameSpan.appendChild(dele);
                }
                triggerElement.prepend(triggerNameSpan);
                zd_tt_ConfSelectedTrigger = triggerElement;
            }
        }
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function deleteCallBackCreater(elem, cls) {
    return function(res) {
        if (res.responseStatus === 200) {
            if (elem.parentElement != null) {
                if (elem.className.indexOf("zohodesk-Tooltip-animatt") != -1) {
                    elem.parentElement.removeChild(elem);
                } else {
                    setTimeout(function() {
                        elem.parentElement.removeChild(elem);
                    }, 300);
                }
            }
            for (var j = 0; j < listOfTriggersObj.length; j++) {
                if (elem.id == listOfTriggersObj[j].id) {
                    zdttElementEventRemover(listOfTriggersObj[j]);
                    for (var l = 0; l < listOfTriggersObj[j].triggers.length; l++) {
                        var ConfSelectedTrigger = document.querySelector(listOfTriggersObj[j].triggers[l].element);
                        if (ConfSelectedTrigger != undefined) {
                            ConfSelectedTrigger.className = ConfSelectedTrigger.className.replace(" zohodesk-Tooltip-Configureborder", "");
                            if (ConfSelectedTrigger.querySelector('.zohodesk-Tooltip-ConfigureCnt') != undefined) {
                                ConfSelectedTrigger.removeChild(ConfSelectedTrigger.querySelector('.zohodesk-Tooltip-ConfigureCnt'));
                            }
                        }
                    }
                    zd_tt_ConfSelectedTrigger = undefined;
                    listOfTriggersObj.splice(j, 1);
                    if (TriggerListAllObjMaintanense.length != 0) {
                        for (var i = 0; i < TriggerListAllObjMaintanense.length; i++) {
                            if (TriggerListAllObjMaintanense[i].id == elem.id) {
                                TriggerListAllObjMaintanense.splice(i, 1);
                            }
                        }
                    }
                    if (listOfTriggersObj.length == 0) {
                        var noTriggers = `<div class="loading-area empty-trigger-content">
                                                    <svg class="emptytrigger">
                                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#emptytrigger"></use>
                                                    </svg>
                                                    <div class="empty-message">No Triggers Has Been Added Yet</div>
                                                    <div class="zohodesk-Tooltip-txtcntr" id="zd_tt_empty_buttonParent">
                                                    </div>
                                                </div>`;
                        var loading = document.getElementById('zdtt_loadingContainer');
                        if (loading != undefined) {
                            loading.parentElement.removeChild(loading);
                        }
                        if (TriggerListAllObjMaintanense.length == 0) {
                            document.getElementById("header-comenContainer").parentElement.removeChild(document.getElementById("header-comenContainer"));
                            document.getElementById("ZDTT_switching_comonElem").className += " zohodesk-Tooltip-height";
                            document.getElementById("ZDTT_switching_comonElem").innerHTML = noTriggers;
                        } else {
                            document.getElementById("zd_tt_listParent").innerHTML = noTriggers;
                        }
                        var aNB = document.createElement("button");
                        aNB.className = "zohodesk-Tooltip-form-button";
                        aNB.innerText = "+ Add New";

                        aNB.addEventListener("click", function(e) {
                            zd_tt_addNewTrigger("new");
                            zdtt_nowStatus = "new"
                        });
                        document.getElementById("zd_tt_empty_buttonParent").appendChild(aNB);
                    }
                }
            }
        } else {
            if (res.obj.message == "You Have No Permission to Perform this Action") {
                createToolTipErrorPopupBox({
                    id: "editorBody",
                    buttons: [{
                        id: "zd_tt_permissionErrors",
                        content: "ok"
                    }],
                    content: "<b>You have no permission to configure this portal.</b> sorry contact your PORTAL admin."
                });
                document.addEventListener("mousedown", errorPopupCallbackFunction, true);
            } else {
                elem.className = elem.className.split(cls).join("");
                elem.className = elem.className.split(" zohodesk-Tooltip-heightAnim").join("");
            }
        }
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function deleteSelectedTrigger(elem) {
    var positionStatus = "Right";
    var sidePanel = document.getElementById("editorBody");
    if (sidePanel.className.indexOf("zohodesk-Tooltip-panel-left") != -1) {
        positionStatus = "Left";
    }
    elem.preventDefault();
    elem.stopPropagation();
    elem = elem.target.parentNode.parentNode;
    if (elem.localName == "div") {
        elem = elem.parentNode;
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

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zdtt_saveTrigger(e) {

    var finalObj = undefined;
    if (zdtt_nowStatus == "new") {
        finalObj = zd_tt_addTooltipObj;
        var msg = "saving ...";
    } else if (zdtt_nowStatus == "update") {
        finalObj = ConfigureObjectForEdit;
        var msg = "uploading ...";
    }
    if (finalObj.name == undefined || finalObj.name == "") {
        if (document.getElementById("zd_tt_triggerName").parentElement.className.indexOf("zd_tt_notfilledErrorStyle") == -1) {
            document.getElementById("zd_tt_triggerName").parentElement.className += " zd_tt_notfilledErrorStyle";
        }
        document.getElementById("zd_tt_tnError").innerText = "* Fill the trigger name input box .";
    }
    if (finalObj.components["0"].solutionId == undefined) {
        if (document.getElementById("zdtt_aserchParent").className.indexOf("zd_tt_notfilledErrorStyle") == -1) {
            document.getElementById("zdtt_aserchParent").className += " zd_tt_notfilledErrorStyle";
        }
        document.getElementById("zd_tt_artInpError").innerText = "* Search and choose any one article .";
    }
    if (zd_tt_arrayOfElements.length == 0) {
        createToolTipErrorPopupBox({
            id: "editorBody",
            buttons: [{
                id: "zd_tt_ok",
                content: "ok"
            }],
            content: "select the atleast one trigger point to save message ."
        });
    }
    if (ArrayUndoElementList.length != 0) {
        createToolTipErrorPopupBox({
            id: "editorBody",
            buttons: [{
                id: "zd_tt_ok",
                content: "ok"
            }],
            content: "hit a done button to confirm a trigger point ."
        });
    }
    if (finalObj.name != undefined && finalObj.name != "") {
        if (ArrayUndoElementList.length == 0) {
            if (finalObj.components["0"].solutionId != undefined) {
                if (zd_tt_arrayOfElements.length != 0) {
                    let formParent = document.getElementById("ZDTT_switching_comonElem").querySelector(".zohodesk-Tooltip-panel-content");
                    formParent.scrollTop = 0;
                    if (formParent != undefined && formParent != null) {
                        if (formParent.className.indexOf("zohodesk-Tooltip-panel-contentplur") == -1) {
                            formParent.className += " zohodesk-Tooltip-panel-contentplur";
                            let plurdiv = document.createElement("div");
                            plurdiv.className = "zohodesk-Tooltip-plurdiv";
                            formParent.prepend(plurdiv);
                            let loadingDiv = document.createElement("div");
                            loadingDiv.className = "loading-area"
                            loadingDiv.id = "zdtt_loadingContainer";
                            loadingDiv.style.left = 0;
                            loadingDiv.style.zIndex = 99999;
                            loadingDiv.innerHTML = "<div class='loading-content'><div class='loading-item'></div></div><div>" + msg + "</div>";
                            formParent.prepend(loadingDiv);
                            plurdiv.style.top = 0;
                            plurdiv.style.cursor = "default";
                        }
                    }
                    zdtt_saveTriggerAPIcall(e);
                }
            }
        }
    }
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function zdtt_saveTriggerAPIcall(e) {
    e.target.removeEventListener("click", zdtt_saveTrigger, true);
    var windowLocationHref = window.location.pathname; //+"#"+window.location.href.split("#")[1];
    var finalObj = undefined;
    if (zdtt_nowStatus == "new") {
        finalObj = zd_tt_addTooltipObj;
    } else if (zdtt_nowStatus == "update") {
        delete ConfigureObjectForEdit.modifiedBy;
        delete ConfigureObjectForEdit.viewCount;
        if(typeof(ConfigureObjectForEdit.preferences)!="object"){
            if(typeof(ConfigureObjectForEdit.preferences)=="string"){
                ConfigureObjectForEdit.preferences = JSON.parse(ConfigureObjectForEdit.preferences)
            }
            else if(typeof(ConfigureObjectForEdit.preferences)=="undefined"){
                ConfigureObjectForEdit.preferences = {};
            }
        }
        finalObj = ConfigureObjectForEdit;
    }
    finalObj.triggers = [];
    zd_tt_arrayOfElements.forEach(function(arg) {
        finalObj.triggers.push({
            "element": arg,
            "event": Trigger_option,
            "url": windowLocationHref
        });
    });
    var popupBackgroundColor = window.getComputedStyle(document.getElementById('editerToolsContainer').querySelector(".KB_Editor_iframe").contentDocument.body, null).getPropertyValue('background-color');
    popupBackgroundColor = popupBackgroundColor.toLocaleLowerCase();
    if (popupBackgroundColor == "") {
        popupBackgroundColor = "#ffffff";
    }
    if (popupBackgroundColor.indexOf("#") == -1) {
        if (popupBackgroundColor.indexOf("rgba") != -1) {
            var arrayOfRGBA = popupBackgroundColor.split("rgba(")[1].split(")")[0].split(",");
            var arrayOfRGB = zd_colorValueChanger.RGBAtoRGB(arrayOfRGBA[0], arrayOfRGBA[1], arrayOfRGBA[2], arrayOfRGBA[3], 255, 255, 255);
            arrayOfRGB = arrayOfRGB.split("rgb(")[1].split(")")[0].split(",");
            popupBackgroundColor = zd_colorValueChanger.rgbToHex(parseInt(arrayOfRGB[0]), parseInt(arrayOfRGB[1]), parseInt(arrayOfRGB[2]));
        } else if (popupBackgroundColor.indexOf("rgb") != -1) {
            var arrayOfRGB = popupBackgroundColor.split("rgb(")[1].split(")")[0].split(",");
            popupBackgroundColor = zd_colorValueChanger.rgbToHex(parseInt(arrayOfRGB[0]), parseInt(arrayOfRGB[1]), parseInt(arrayOfRGB[2]));
        }
    }
    var anc = document.getElementById("Chrome_Extension_AnChorTag");
    if (anc.getAttribute("ancId") != null) {
        finalObj.preferences["selector"] = anc.getAttribute("ancId");
    } else if (finalObj.preferences.selector != undefined) {
        delete finalObj.preferences["selector"];
    }
    finalObj.preferences.bgColor = popupBackgroundColor;
    finalObj.components[0].content = document.getElementById('editerToolsContainer').querySelector(".KB_Editor_iframe").contentDocument.body.innerHTML;
    if (zdtt_nowStatus == "new") {
        var Zohodesk_Chrome_Extension_Save_Configure_Snippet_Url = "https://" + commomDomainNameForAPI + "/api/web/extensions/" + ExtensionProjectId + "/messages?orgId=" + organitationID;
        requestAPI(Zohodesk_Chrome_Extension_Save_Configure_Snippet_Url).post('', finalObj).then((res) => {
            if (res.responseStatus === 200) {
                res = res.obj;
                if (res.data == undefined) {
                    ZDTT_topHeaderTapsCreater();
                    Chrome_Extension_RequireFunctionFlow([res]);
                    objInitializer();
                    TriggerListAllObjMaintanense[TriggerListAllObjMaintanense.length] = res;
                    listOfTriggersObj[listOfTriggersObj.length] = res;
                    location.href = 'javascript:chrome_addons_inner_text=""; void 0';
                    AnchorTagsList = [];
                    zd_tt_articleSelected = false;
                    zdtt_elementSelectorObj.detachClickListener();
                    zdtt_elementSelectorObj = undefined;
                    zd_tt_removeMouseOverElements();
                    zd_tt_triggerListInitiater(listOfTriggersObj);
                    document.getElementById("triggerListViewTap").className += " zohodesk-Tooltip-selectedOpts";
                    document.getElementById("addNewTriggerTap").className = document.getElementById("addNewTriggerTap").className.split(" zohodesk-Tooltip-selectedOpts").join("");
                }
            } else {
                let formParent = document.getElementById("ZDTT_switching_comonElem").querySelector(".zohodesk-Tooltip-panel-content");
                if (formParent != undefined && formParent != null) {
                    if (formParent.className.indexOf("zohodesk-Tooltip-panel-contentplur") != -1) {
                        formParent.className = formParent.className.split(" zohodesk-Tooltip-panel-contentplur").join("");
                        let plurdiv = formParent.querySelector(".zohodesk-Tooltip-plurdiv");
                        if (plurdiv != undefined || plurdiv != null) {
                            formParent.removeChild(plurdiv);
                        }
                        let loadingDiv = document.getElementById("zdtt_loadingContainer");
                        if (loadingDiv != undefined && loadingDiv != null) {
                            formParent.removeChild(loadingDiv);
                        }
                    }
                }
                document.getElementById("TooltipSave").addEventListener("click", zdtt_saveTrigger, true);
                if (res.obj.message == "Invalid Value For Param name") {
                    res.obj.message = "Invalid Trigger Name .";
                }
                createToolTipErrorPopupBox({
                    id: "editorBody",
                    buttons: [{
                        id: "zd_tt_ok",
                        content: "ok"
                    }],
                    content: res.obj.message
                });
            }
        })
    } else if (zdtt_nowStatus == "update") {
        if (ConfigureObjectForEdit.dontEdit != undefined) {
            delete ConfigureObjectForEdit.dontEdit
        }
        var Zohodesk_Chrome_Extension_Update_Configure_Snippet_Url = "https://" + commomDomainNameForAPI + "/api/web/extensions/" + ExtensionProjectId + "/messages/" + ConfigureObjectForEdit.id + "?orgId=" + organitationID;
        requestAPI(Zohodesk_Chrome_Extension_Update_Configure_Snippet_Url).put('', ConfigureObjectForEdit).then((res) => {
            if (res.responseStatus === 200) {
                res = res.obj;
                listOfTriggersObj[zd_tt_focusedElementInd] = res;
                if (lastObjectOfUpdatedTriggerFUB != undefined) {
                    zdttElementEventRemover(lastObjectOfUpdatedTriggerFUB);
                    Chrome_Extension_RequireFunctionFlow([res]);
                }
                location.href = 'javascript:chrome_addons_inner_text=""; void 0';
                objInitializer();
                AnchorTagsList = [];
                for (var w = 0; w < TriggerListAllObjMaintanense.length; w++) {
                    if (TriggerListAllObjMaintanense[w].id == res.id) {
                        TriggerListAllObjMaintanense[w] = res;
                    }
                }
                zd_tt_articleSelected = false;
                zd_tt_focusedElementInd = undefined;
                zdtt_nowStatus == "new";
                zdtt_elementSelectorObj.detachClickListener();
                zdtt_elementSelectorObj = undefined;
                zd_tt_removeMouseOverElements();
                var li = document.getElementById("updateTriggerNameTap");
                li.className = li.className.split(" zohodesk-Tooltip-selectedOpts").join(" zohodesk-Tooltip-hide");
                document.getElementsByClassName("zohodesk-Tooltip-toggleTap-li")[0].className += " zohodesk-Tooltip-selectedOpts";
                li.innerText = "";
                zd_tt_triggerListInitiater(listOfTriggersObj);
            } else {

                if (res.obj.message == "You Have No Permission to Perform this Action") {
                    createToolTipErrorPopupBox({
                        id: "editorBody",
                        buttons: [{
                            id: "zd_tt_permissionErrors",
                            content: "ok"
                        }],
                        content: "<b>You have no permission to configure this portal.</b> sorry contact your PORTAL admin."
                    });
                    document.addEventListener("mousedown", errorPopupCallbackFunction, true);
                } else {
                    let formParent = document.getElementById("ZDTT_switching_comonElem").querySelector(".zohodesk-Tooltip-panel-content");
                    if (formParent != undefined && formParent != null) {
                        if (formParent.className.indexOf("zohodesk-Tooltip-panel-contentplur") != -1) {
                            formParent.className = formParent.className.split(" zohodesk-Tooltip-panel-contentplur").join("");
                            let plurdiv = formParent.querySelector(".zohodesk-Tooltip-plurdiv");
                            if (plurdiv != undefined && plurdiv != null) {
                                formParent.removeChild(plurdiv);
                            }
                            let loadingDiv = document.getElementById("zdtt_loadingContainer");
                            if (loadingDiv != undefined && loadingDiv != null) {
                                formParent.removeChild(loadingDiv);
                            }
                        }
                    }
                    document.getElementById("TooltipSave").addEventListener("click", zdtt_saveTrigger, true);
                    createToolTipErrorPopupBox({
                        id: "editorBody",
                        buttons: [{
                            id: "zd_tt_ok",
                            content: "ok"
                        }],
                        content: res.obj.message
                    });
                }
            }
        });
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
