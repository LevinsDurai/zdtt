// var zd_tt_arrayOfElements = [];

// var lastArticleKBshortContent = undefined;

// var lastObjectOfUpdatedTriggerFUB = undefined;
// var zdtt_lastHighlighted = [];
// var ArrayUndoElementList = [];
// var zdtt_nowStatus = "new";
// var AnchorTagsList = [];
// var ConfigureObjectForEdit;
// var Trigger_option = "HOVER";
// var zd_tt_articleSelected = false;
// var ZohodeskTooltipCommonShowHideVariable = "";
// var zdtt_elementSelectorObj = undefined;
// var zd_tt_addTooltipObj = {
//     "components": [{
//         "type": "ARTICLESNIPPET",
//         "preferences": null,
//         "order": "0",
//         "solutionId": undefined,
//         "content": ""
//     }],
//     "isEnabled": true,
//     "name": undefined,
//     "preferences": {
//         "bgColor": "#ffffff",
//         "viewSize": "LARGE"
//     },
//     "triggers": [],
//     "viewtype": "TOOLTIP"
// };


















// function zd_tt_addNewTrigger(type) {
//     if (type == "new") {
//         location.href = 'javascript:chrome_addons_inner_text=""; void 0';
//     }
//     var func = objectCreaters(type);
//     var html = `<div class="zohodesk-Tooltip-panel-content zohodesk-Tooltip-panel-contentplur">
//     <div class="zohodesk-Tooltip-plurdiv" ></div>
//    <div class="zohodesk-Tooltip-panel-headline-text">Trigger Name <span style="color: #ff6f64;"> *</span> </div>
//    <div class="zohodesk-Tooltip-panel-form-field" style="margin-bottom:0px;">
//       <input type="text" class="zohodesk-Tooltip-text-box zohodesk-Tooltip-input" placeholder="eg,.Header info icon" id="zd_tt_triggerName">
//    </div>
//    <span class="zd_tt_errorbox" id="zd_tt_tnError"></span>
//    <div class="zohodesk-Tooltip-container" id="zd_tt_elementAlertBox">
//         <div class="zohodesk-Tooltip-descriptionBox">
//             <div class="zohodesk-Tooltip-descriptionBox-text">Please select a trigger point from the current page to configure new tooltip.(<b>Note : </b> some text)</div>
//         </div>
//     </div>
//     <div class="zohodesk-Tooltip-container" id="zdtt_plurPositionElem">
//         <span class="zohodesk-Tooltip-button zohodesk-Tooltip-button-primary" id="zd_tt_changePointer" ><span id="zd_tt_changePointer_nameValue">Change pointer</span><span class="zdtt_numberCountSpan zohodesk-Tooltip-hide" id="zdTT_triggerPointCount"></span></span>
//         <input type="button" name="" value="Cancel" class="zohodesk-Tooltip-button zohodesk-Tooltip-button-secondary zohodesk-Tooltip-hide" style="margin-left:10px;" id="zdTT_changeTriggerCancel">
//         <span class="zdtt-done zohodesk-Tooltip-hide" id="zdtt_triggerSelectedMsg">
//             <span class="zohodesk-Tooltip-circlesvg">
//                 <span class="zohodesk-Tooltip-tick"></span>
//                 <svg class="zohodesk-Tooltip-part">  
//                     <g class="zohodesk-Tooltip-g"> 
//                         <circle class="zohodesk-Tooltip-circle"></circle>
//                     </g> 
//                 </svg>
//             </span>
//             <span class="zohodesk-Tooltip-selected">Added Successfully .</span>
//         </span>
//         <div class="zohodesk-Tooltip-descriptionBox zohodesk-Tooltip-cl-both zohodesk-Tooltip-hide">
//           <div class="zohodesk-Tooltip-fl-lft">
//               <span class="zohodesk-Tooltip-tickicon">
//                   <svg class="icon">
//                     <use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#tick"></use>
//                   </svg>
//               </span>
//               <span class="zohodesk-Tooltip-successtxt">New Trigger Pointer selected</span>
//           </div>
//           <div class="zohodesk-Tooltip-fl-lft">   
//             <input type="button" name="" value="Done" class="zohodesk-Tooltip-button zohodesk-Tooltip-button-active" id="zdTT_changeTriggerDone">
//             <input type="button" name="" value="Cancel" class="zohodesk-Tooltip-button zohodesk-Tooltip-button-secondary" style="margin-left:10px;" id="zdTT_changeTriggerCancel">
//           </div>
//         </div>
//    </div>
//    <div class="zohodesk-Tooltip-panel-headline-text">Choose Article <span style="color: #ff6f64;"> *</span> </div>
//    <div class="zohodesk-Tooltip-panel-form-field"  id="zdtt_aserchParent" style="margin-bottom:0px">
//       <div class="zohodesk-Tooltip-form-field-icons">
//          <span class="zohodesk-Tooltip-editor-iconarticle">
//             <svg class="zohodesk-tooltip-svg-icon">
//                <use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#Tooltip-article"></use>
//             </svg>
//          </span>
//       </div>
//       <input type="text" class="zohodesk-Tooltip-text-box zohodesk-Tooltip-input" placeholder="Search..." id="searchArticleBox">
//       <div class="zohodesk-Tooltip-Selectbox-dropdown zohodesk-Tooltip-Selectbox-dropdown-search" id="searchDisplay">
//          <div class="zohodesk-Tooltip-dropdown-header">
//             <span class="zohodesk-Tooltip-search-icon">
//                <span class="zohodesk-Tooltip-editor-icontoprightsearch">
//                   <svg class="zohodesk-tooltip-svg-icon-small">
//                      <use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#Tooltip-search"></use>
//                   </svg>
//                </span>
//             </span>
//             <span class="zohodesk-Tooltip-search-result">Did you mean <span id="zd_tt_searchName"></span>?</span>
//          </div>
//       </div>
//    </div>
//    <span class="zd_tt_errorbox" id="zd_tt_artInpError"></span>
//    <div class="zohodesk-Tooltip-panel-form-field zohodesk-Tooltip-panel-form-field-notallowed zohodesk-Tooltip-hide" id="Chrome_Extension_AnchorTagTotalParent" style="margin-top:15px">
//       <div class="zohodesk-Tooltip-form-field-icons">
//          <span class="zohodesk-Tooltip-editor-iconanchor">
//             <svg class="zohodesk-tooltip-svg-icon">
//                <use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#Tooltip-anchor"></use>
//             </svg>
//          </span>
//       </div>
//       <div class="zohodesk-Tooltip-panel-form-selectbox zohodesk-Tooltip-placeholder-tag" id="Chrome_Extension_AnChorTag" style="cursor:not-allowed">Anchor tag not selected</div>
//       <div class="zohodesk-Tooltip-Selectbox-dropdown zohodesk-Tooltip-tags" id="Chrome_Extension_AnChorTag_Show">
//       </div>
//    </div>
//    <div class="zohodesk-Tooltip-multi-form-field">
//       <div class="zohodesk-Tooltip-fields">
//          <div class="zohodesk-Tooltip-panel-form-field-label">Tooltip Size</div>
//          <div class="zohodesk-Tooltip-panel-form-field">
//             <div class="zohodesk-Tooltip-panel-form-selectbox" id="zohodesk_tooltip_size_shown_id">Large</div>
//             <div class="zohodesk-Tooltip-Selectbox-dropdown" id="zohodesk_tooltip_size_dropDown_id">
//                <div class="zohodesk-Tooltip-dropdown-content">
//                   <ul class="zohodesk-Tooltip-list">
//                      <li class="zohodesk-Tooltip-dropdown-options" id="zohodesk-Tooltip-small">Small</li>
//                      <li class="zohodesk-Tooltip-dropdown-options" id="zohodesk-Tooltip-medium">Medium</li>
//                      <li class="zohodesk-Tooltip-dropdown-options" id="zohodesk-Tooltip-large">Large</li>
//                   </ul>
//                </div>
//             </div>
            
//          </div>
//       </div>
//       <div class="zohodesk-Tooltip-fields">
//          <div class="zohodesk-Tooltip-panel-form-field-label">Activate Trigger</div>
//          <div class="zohodesk-Tooltip-panel-form-field">
//             <div class="zohodesk-Tooltip-panel-form-selectbox" id="zohodesk_tooltip_trigger">On Hover</div>
//             <div class="zohodesk-Tooltip-Selectbox-dropdown" id="zohodesk_tooltip_trigger_options">
//                <div class="zohodesk-Tooltip-dropdown-content">
//                   <ul class="zohodesk-Tooltip-list">
//                      <li class="zohodesk-Tooltip-dropdown-options" id="zohodesk_tooltip_trigger_options_onClick">On Click</li>
//                      <li class="zohodesk-Tooltip-dropdown-options" id="zohodesk_tooltip_trigger_options_onHover">On Hover</li>
//                   </ul>
//                </div>
//             </div>
//          </div>
//       </div>
//    </div>
//    <div class="zohodesk-Tooltip-panel-headline-text">Add Snippet <div class="zohodesk-Tooltip-charactertxt" id="zdttSizeCharInform">Max 150 characters</div></div>
//    <div class="zohodesk-Tooltip-editor-content">
//       <div id="editerToolsContainer"></div>
//       <!-- <div class="zohodesk-Tooltip-editAddonButtonContainer" id="chromeAdd-onEditAddonButtonContainer">
//          <input type="text" placeholder="View More" class="zohodesk-Tooltip-popup-button zohodesk-Tooltip-popup-button-input" />
//          </div> -->
//       <div class="zohodesk-Tooltip-color-picker zohodesk-Tooltip-cl-both">
//          <div class="zohodesk-Tooltip-lft-bar zohodesk-Tooltip-fl-lft">
//             <ul class="zohodesk-Tooltip-cl-both zohodesk-Tooltip-list" id="zd_tt_toggleTapsParent">
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-1"></span>
//                </li>
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-2"></span>
//                </li>
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-3"></span>
//                </li>
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-4"></span>
//                </li>
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-5"></span>
//                </li>
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-6"></span>
//                </li>
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-7"></span>
//                </li>
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-8"></span>
//                </li>
//                <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-9"></span>
//                </li>
//             </ul>
//          </div>
//          <div class="zohodesk-Tooltip-rt-bar zohodesk-Tooltip-fl-rt">
//             <div class="zohodesk-Tooltip-user-input">
//                <span class="zohodesk-Tooltip-color-name">
//                <input type="" id="ChromeAddonManualBackgroundColorInput" placeholder="eg.,#000000" class="zohodesk-Tooltip-color-value">
//                </span>
//                <!-- <span class="zohodesk-Tooltip-user-color">
//                   <ul class="zohodesk-Tooltip-cl-both">
//                   <li class="zohodesk-Tooltip-clr-box">
//                   <span class="zohodesk-Tooltip-color" id="zohodesk-Tooltip-color-10"></span>
//                   </li>
//                   </ul>
//                   </span>  -->
//             </div>
//          </div>
//       </div>
//    </div>
// </div>
// <div class="zohodesk-Tooltip-panel-footer">
//    <div class="zohodesk-Tooltip-footer-button zohodesk-Tooltip-footer-button-save" id="TooltipSave">save</div>
//    <div class="zohodesk-Tooltip-footer-button zohodesk-Tooltip-footer-button-delete" id="TooltipCancel">cancel</div>
// </div>
// `;
//     var parent = document.getElementById("ZDTT_switching_comonElem");
//     parent.innerHTML = html;
//     zohoDesk_callEditerIntegration();
//     var triggerNameInput = document.getElementById("zd_tt_triggerName");
//     var articleSearchInput = document.getElementById("searchArticleBox");
//     var saveButtonElem = document.getElementById("TooltipSave");
//     document.getElementById("zohodesk_tooltip_size_shown_id").onmouseup = function(e) {
//         show("zohodesk_tooltip_size_dropDown_id");
//     }
//     document.getElementById("zohodesk-Tooltip-small").onmouseup = zd_tt_triggerSOS;
//     document.getElementById("zohodesk-Tooltip-medium").onmouseup = zd_tt_triggerSOS;
//     document.getElementById("zohodesk-Tooltip-large").onmouseup = zd_tt_triggerSOS;

//     document.getElementById("zohodesk_tooltip_trigger").onmouseup = function(e) {
//         show("zohodesk_tooltip_trigger_options");
//     }
//     document.getElementById("zohodesk_tooltip_trigger_options_onClick").onmouseup = zd_tt_showTMEO;
//     document.getElementById("zohodesk_tooltip_trigger_options_onHover").onmouseup = zd_tt_showTMEO;
//     document.getElementById("TooltipCancel").onmouseup = function(e) {
//         zd_tt_triggerListInitiater(listOfTriggersObj);
//         if (zdtt_elementSelectorObj != undefined) {
//             zdtt_elementSelectorObj.detachClickListener();
//             zdtt_elementSelectorObj = undefined;
//         };
//         if (lastObjectOfUpdatedTriggerFUB != undefined) {
//             zdttElementEventRemover(lastObjectOfUpdatedTriggerFUB);
//             Chrome_Extension_RequireFunctionFlow([lastObjectOfUpdatedTriggerFUB]);
//         }
//         var taps = document.getElementsByClassName("zohodesk-Tooltip-selectedOpts");
//         if (taps.length != 0) {
//             var len = taps.length;
//             for (var i = 0; i < len; i++) {
//                 taps[0].className = taps[0].className.split("zohodesk-Tooltip-selectedOpts").join("");
//             }
//         }
//         if (document.getElementById("header-comenContainer") != undefined) {
//             if (document.getElementById("updateTriggerNameTap").className.indexOf(" zohodesk-Tooltip-hide") == -1) {
//                 document.getElementById("updateTriggerNameTap").className += "zohodesk-Tooltip-hide";
//             }
//             document.getElementById("triggerListViewTap").className += " zohodesk-Tooltip-selectedOpts";
//         }
//         zd_tt_removeMouseOverElements();
//         objInitializer();
//         zdtt_nowStatus = "new";
//     };
//     articleSearchInput.oninput = function(e) {
//         if (document.getElementById("searchArticleBox").value == "") {
//             hide("searchDisplay");
//         } else {
//             document.getElementById("zd_tt_searchName").innerHTML = e.target.value;
//             getArticleName(e.target.value);
//         }
//     }
//     zdtt_elementSelectorObj = new zd_tt_elementSelector({
//         "elementsArrayCreater": func.elementsArrayCreater
//     });
//     triggerNameInput.onfocus = inputParentFocus;
//     articleSearchInput.onfocus = inputParentFocus;
//     triggerNameInput.onblur = inputParentBlur;
//     articleSearchInput.onblur = inputParentBlur;
//     triggerNameInput.oninput = func.triggerObjUpdater;
//     saveButtonElem.addEventListener("click", zdtt_saveTrigger, true);
//     setTimeout(function() {
//         if (zd_tt_arrayOfElements.length >= 5) {
//             triggerNameInput.focus();
//         } else {
//             document.getElementById("zd_tt_changePointer").click();
//         }
//     }, 400);
//     if (type == "new") {
//         document.getElementById("zd_tt_changePointer_nameValue").innerText = "Add trigger point";
//     }
//     document.getElementById("zd_tt_changePointer").addEventListener("click", zd_tt_addTrggerPoint, true);
//     document.getElementById("zdTT_changeTriggerDone").onclick = function(e) {
//         zdtt_elementSelectorObj.detachClickListener();
//         e.target.parentElement.parentElement.previousElementSibling.className = e.target.parentElement.parentElement.previousElementSibling.className.split(" zohodesk-Tooltip-hide").join("");
//         e.target.parentElement.parentElement.className += " zohodesk-Tooltip-hide";
//         var elems = document.getElementsByClassName("zohodesk-Tooltip-currentShad");
//         var child = undefined;
//         if (elems.length != 0) {
//             for (var i = 0; i < elems.length; i++) {
//                 elems[i].className = elems[i].className.split(" zohodesk-Tooltip-currentShad").join('');
//             }
//             prvsElems = undefined;
//         }
//         ArrayUndoElementList = [];
//         blurPosition();
//     };
//     document.getElementById('zdTT_changeTriggerCancel').onclick = function(e) {
//         zdtt_elementSelectorObj.detachClickListener();
//         let countSpan = document.getElementById("zdTT_triggerPointCount");
//         if (ArrayUndoElementList.length != 0) {
//             zd_tt_arrayOfElements = zd_tt_arrayOfElements.filter(function(element) {
//                 return element != ArrayUndoElementList[0];
//             });
//             if (zd_tt_arrayOfElements.length == 0) {
//                 if (countSpan.className.indexOf("zohodesk-Tooltip-hide") == -1) {
//                     countSpan.className += "  zohodesk-Tooltip-hide"
//                 }
//             } else {
//                 if (countSpan.className.indexOf("zohodesk-Tooltip-hide") != -1) {
//                     countSpan.className = countSpan.className.split("  zohodesk-Tooltip-hide").join("");
//                 }
//                 countSpan.innerText = zd_tt_arrayOfElements.length;
//             }
//         }
//         var addBtn = document.getElementById("zd_tt_changePointer");
//         if (addBtn.className.indexOf("zohodesk-Tooltip-panel-form-field-notallowed") != -1) {
//             addBtn.className = addBtn.className.split(" zohodesk-Tooltip-panel-form-field-notallowed").join("");
//         }
//         addBtn.addEventListener("click", zd_tt_addTrggerPoint, true);
//         e.currentTarget.className += " zohodesk-Tooltip-hide";
//         var elems = document.getElementsByClassName("zohodesk-Tooltip-currentShad");
//         if (elems.length != 0) {
//             for (var i = 0; i < elems.length; i++) {
//                 elems[i].className = elems[i].className.split(" zohodesk-Tooltip-currentShad").join('');
//             }
//         }
//         blurPosition();
//     };
//     if (type == "new") {
//         setTimeout(function() {
//             document.getElementById('editerToolsContainer').querySelector(".KB_Editor_iframe").contentDocument.body.innerHTML = "<div><br></div>";
//         }, 1000);
//     }
// };













// var tempVariable;
// document.addEventListener('mousedown', Zohodesk_Tooltip_mousedownActionShow, true);























// var zd_tt_commonComponent = `<div class="zohodesk-Tooltip-panel" id="editorBody">
//     <div style="height: 0; width: 0; position: absolute; visibility: hidden">
//    <svg xmlns="http://www.w3.org/2000/svg">
//    <symbol id="Tooltip-dragdrop" viewBox="0 0 48 48">
//         <g>
//           <path d="M10.95,33.95L1,24l9.95-9.95v7.662h10.761V10.95H14.05L24,1l9.95,9.95h-7.662v10.761H37.05l-0.001-7.662L47,24l-9.95,9.95
//           v-7.662H26.288V37.05h7.662L24,47l-9.95-9.95h7.662V26.288H10.95V33.95z M10.95,33.95"></path>
//         </g>
//       </symbol>
//    <symbol id="Tooltio-Maximize-icon" viewBox="0 0 48 48">
//         <path class="st0" d="M66-54h-86c-11,0-20-9-20-20v-86c0-11,9-20,20-20h86c11,0,20,9,20,20v86C86-63,77-54,66-54z"/>
// <path class="st1" d="M-180.7-144.5c0.4-2,2.1-3.4,4-3.4l28.1,0l0.6,0.7l-2.3,13.1c-0.1,0.3-0.3,0.5-0.6,0.5l-17.3,0l-6,32.1h32
//     l11.9-59.4h-11.5l-0.6-0.8l2.3-13.1c0.1-0.3,0.3-0.5,0.6-0.5h21.7c1.2,0,2.4,0.5,3.2,1.5c0.8,1,1.1,2.2,0.9,3.4l-16,80
//     c-0.4,1.9-2.1,3.3-4,3.3H-178l-15.1,9L-180.7-144.5z"/>
// <g>
//     <path class="st1" d="M48.1-85.1c-0.5,2.3-1.6,4.2-3.3,5.6c-1.7,1.4-3.6,2.1-5.9,2.1h-39c-0.2,0-0.5,0.1-1,0.3
//         c-0.4,0.2-0.8,0.3-1.1,0.3L-13-68.2c-0.5,0.3-0.9,0.3-1.4,0.1c-0.4-0.2-0.7-0.6-0.7-1.1l11.3-60c0.5-2.1,1.5-3.9,3.2-5.4
//         c1.7-1.5,3.7-2.3,6-2.3h24c1.1,0,1.9,0.4,2.6,1.1c0.6,0.7,0.8,1.6,0.6,2.6l-1,5.6c0,0.8-0.3,1.4-1,1.9c-0.6,0.5-1.4,0.7-2.2,0.7
//         H10.1c-0.8,0-1.5,0.2-2.2,0.7c-0.6,0.5-1,1.1-1,1.9L1.9-92.8c-0.3,1-0.1,1.8,0.6,2.5c0.6,0.7,1.5,1,2.6,1h29.7
//         c0.7,0,1.4-0.2,2.1-0.7c0.6-0.5,1-1.1,1-1.8l9.8-53.4c0.2-1,0-1.8-0.7-2.5c-0.6-0.7-1.5-1-2.5-1h-4.6c-1.1,0-1.9-0.4-2.6-1.1
//         c-0.6-0.7-0.8-1.6-0.6-2.6l2.1-11.3c0.2-0.7,0.6-1.4,1.1-1.9c0.5-0.5,1.2-0.8,1.9-0.8h10.3c2.5-0.2,4.7,0.8,6.6,2.9
//         c1.9,2.1,2.6,4.6,2.1,7.4L48.1-85.1z M16.1-102.7c0.3,0.4,0.7,0.6,1.2,0.6H26c0.2,0,0.5-0.1,0.9-0.3c0.4-0.2,0.6-0.4,0.6-0.7l1-6.6
//         l-6.6,4.1l-5.2-4.6l-1,6.1C15.7-103.5,15.9-103.1,16.1-102.7z M27.8-111.7c-0.2,0-0.5-0.1-0.8-0.1h-8.7c-0.3,0-0.5,0-0.6,0.1
//         c-0.1,0-0.3,0.2-0.5,0.5l4.6,4.1l6.6-4.1C28.3-111.5,28-111.7,27.8-111.7z"/>
// </g>
// <path class="st2" d="M207-54h-86c-11,0-20-9-20-20v-86c0-11,9-20,20-20h86c11,0,20,9,20,20v86C227-63,218-54,207-54z"/>
// <g>
//     <path class="st1" d="M189.1-85.1c-0.5,2.3-1.6,4.2-3.3,5.6c-1.7,1.4-3.6,2.1-5.9,2.1h-39c-0.2,0-0.5,0.1-1,0.3
//         c-0.4,0.2-0.8,0.3-1.1,0.3L128-68.2c-0.5,0.3-0.9,0.3-1.4,0.1c-0.4-0.2-0.7-0.6-0.7-1.1l11.3-60c0.5-2.1,1.5-3.9,3.2-5.4
//         c1.7-1.5,3.7-2.3,6-2.3h24c1.1,0,1.9,0.4,2.6,1.1c0.6,0.7,0.8,1.6,0.6,2.6l-1,5.6c0,0.8-0.3,1.4-1,1.9c-0.6,0.5-1.4,0.7-2.2,0.7
//         h-18.4c-0.8,0-1.5,0.2-2.2,0.7c-0.6,0.5-1,1.1-1,1.9l-5.1,29.7c-0.3,1-0.1,1.8,0.6,2.5c0.6,0.7,1.5,1,2.6,1h29.7
//         c0.7,0,1.4-0.2,2.1-0.7c0.6-0.5,1-1.1,1-1.8l9.8-53.4c0.2-1,0-1.8-0.7-2.5c-0.6-0.7-1.5-1-2.5-1h-4.6c-1.1,0-1.9-0.4-2.6-1.1
//         c-0.6-0.7-0.8-1.6-0.6-2.6l2.1-11.3c0.2-0.7,0.6-1.4,1.1-1.9c0.5-0.5,1.2-0.8,1.9-0.8h10.3c2.5-0.2,4.7,0.8,6.6,2.9
//         c1.9,2.1,2.6,4.6,2.1,7.4L189.1-85.1z M157.1-102.7c0.3,0.4,0.7,0.6,1.2,0.6h8.7c0.2,0,0.5-0.1,0.9-0.3c0.4-0.2,0.6-0.4,0.6-0.7
//         l1-6.6l-6.6,4.1l-5.2-4.6l-1,6.1C156.7-103.5,156.9-103.1,157.1-102.7z M168.8-111.7c-0.2,0-0.5-0.1-0.8-0.1h-8.7
//         c-0.3,0-0.5,0-0.6,0.1c-0.1,0-0.3,0.2-0.5,0.5l4.6,4.1l6.6-4.1C169.3-111.5,169-111.7,168.8-111.7z"/>
// </g>
// <g>
//     <path d="M35.7,39c-0.3,1.1-0.8,2-1.5,2.6c-0.8,0.7-1.7,1-2.8,1H13.1c-0.1,0-0.2,0-0.4,0.1c-0.2,0.1-0.4,0.1-0.5,0.1l-5.1,4.1
//         c-0.2,0.1-0.4,0.1-0.6,0c-0.2-0.1-0.3-0.3-0.3-0.5l5.3-28.1c0.2-1,0.7-1.8,1.5-2.5c0.8-0.7,1.7-1.1,2.8-1.1h11.3
//         c0.5,0,0.9,0.2,1.2,0.5c0.3,0.3,0.4,0.7,0.3,1.2L28,19c0,0.4-0.1,0.7-0.4,0.9c-0.3,0.2-0.6,0.3-1,0.3H18c-0.4,0-0.7,0.1-1,0.3
//         c-0.3,0.2-0.4,0.5-0.4,0.9l-2.4,13.9c-0.1,0.5,0,0.9,0.3,1.2c0.3,0.3,0.7,0.5,1.2,0.5h13.9c0.3,0,0.7-0.1,1-0.3
//         c0.3-0.2,0.4-0.5,0.4-0.8l4.6-25c0.1-0.5,0-0.9-0.3-1.2c-0.3-0.3-0.7-0.5-1.1-0.5h-2.2c-0.5,0-0.9-0.2-1.2-0.5
//         c-0.3-0.3-0.4-0.7-0.3-1.2l1-5.3c0.1-0.3,0.3-0.6,0.5-0.9C32.2,1.1,32.5,1,32.8,1h4.8c1.2-0.1,2.2,0.4,3.1,1.4c0.9,1,1.2,2.2,1,3.5
//         L35.7,39z M20.8,30.8c0.1,0.2,0.3,0.3,0.6,0.3h4.1c0.1,0,0.2,0,0.4-0.1c0.2-0.1,0.3-0.2,0.3-0.3l0.5-3.1l-3.1,1.9l-2.4-2.2
//         l-0.5,2.9C20.6,30.3,20.7,30.6,20.8,30.8z M26.2,26.5c-0.1,0-0.2,0-0.4,0h-4.1c-0.1,0-0.2,0-0.3,0c0,0-0.1,0.1-0.2,0.2l2.2,1.9
//         l3.1-1.9C26.5,26.6,26.4,26.5,26.2,26.5z"/>
// </g>
//    </symbol>
//       <symbol id="Tooltio-plus" viewBox="0 0 32 32">
//          <path d="M16,2.7c0.4,0,0.7,0.1,0.9,0.4s0.4,0.6,0.4,0.9v10.7H28c0.4,0,0.7,0.1,0.9,0.4c0.3,0.3,0.4,0.6,0.4,0.9
//             c0,0.4-0.1,0.7-0.4,0.9c-0.3,0.3-0.6,0.4-0.9,0.4H17.3V28c0,0.4-0.1,0.7-0.4,0.9c-0.3,0.3-0.6,0.4-0.9,0.4c-0.4,0-0.7-0.1-0.9-0.4
//             c-0.3-0.3-0.4-0.6-0.4-0.9V17.3H4c-0.4,0-0.7-0.1-0.9-0.4S2.7,16.4,2.7,16s0.1-0.7,0.4-0.9c0.3-0.3,0.6-0.4,0.9-0.4h10.7V4
//             c0-0.4,0.1-0.7,0.4-0.9C15.3,2.8,15.6,2.7,16,2.7z"/>
//       </symbol>
//       <symbol id="tick" viewBox="0 0 48 48">
//         <path class="st0" d="M44,14.625l-25,25l-15-15l6.25-6.25l8.75,8.75l18.75-18.75L44,14.625z" fill="#4EC36D"></path>
//     </symbol>
//       <symbol id="delete" viewBox="0 0 48 48">
//                 <path d="M9.048,44.472C9.107,45.885,10.27,47,11.684,47h24.632c1.414,0,2.577-1.115,2.637-2.528l1.759-30.705H7.288L9.048,44.472z
//                 M29.572,22.99c0-0.592,0.479-1.072,1.072-1.072h1.714c0.592,0,1.072,0.48,1.072,1.072v14.786c0,0.592-0.48,1.072-1.072,1.072
//                 h-1.714c-0.592,0-1.072-0.479-1.072-1.072V22.99z M22.072,22.99c0-0.592,0.479-1.072,1.071-1.072h1.715
//                 c0.592,0,1.071,0.48,1.071,1.072v14.786c0,0.592-0.48,1.072-1.071,1.072h-1.715c-0.592,0-1.071-0.479-1.071-1.072V22.99z
//                  M14.57,22.99c0-0.592,0.479-1.072,1.072-1.072h1.714c0.592,0,1.072,0.48,1.072,1.072v14.786c0,0.592-0.48,1.072-1.072,1.072
//                 h-1.714c-0.592,0-1.072-0.479-1.072-1.072V22.99z M14.57,22.99"></path>
//                 <path d="M41.883,3.701H30.519V1.553C30.519,1.248,30.272,1,29.966,1H18.034c-0.305,0-0.553,0.248-0.553,0.553v2.148H6.117
//                 c-0.914,0-1.656,0.741-1.656,1.656v5.201h39.077V5.357C43.539,4.443,42.797,3.701,41.883,3.701L41.883,3.701z M41.883,3.701"></path>
//             </symbol>

//       <symbol id="Tooltip-addon" viewBox="0 0 32 32">
//          <path d="M26.4,0.4H5.6c-2.8,0-5.1,2.3-5.1,5.1v16.1c0,2.8,2.3,5.1,5.1,5.1h5.6l4.8,4.8l4.8-4.8h5.6c2.8,0,5.1-2.3,5.1-5.1v-16
//             C31.5,2.7,29.2,0.4,26.4,0.4L26.4,0.4z M17,20.4H7.2c-0.6,0-1.2-0.5-1.2-1.2S6.6,18,7.2,18H17c0.6,0,1.2,0.5,1.2,1.2
//             S17.7,20.4,17,20.4z M24.8,15.2H7.2C6.6,15.2,6,14.7,6,14s0.5-1.2,1.2-1.2h17.6c0.6,0,1.2,0.5,1.2,1.2S25.4,15.2,24.8,15.2
//             L24.8,15.2z M24.8,10H7.2C6.6,10,6,9.5,6,8.8s0.5-1.2,1.2-1.2h17.6c0.6,0,1.2,0.5,1.2,1.2C26,9.5,25.4,10,24.8,10L24.8,10z"/>
//       </symbol>
//       <symbol id="Tooltip-alignleft" viewBox="0 0 32 32">
//          <path d="M28.1,0.4H3.9C2,0.4,0.4,2,0.4,3.9v24.2c0,1.9,1.6,3.5,3.5,3.5l0,0h24.2c1.9,0,3.5-1.6,3.5-3.5V3.9C31.6,2,30,0.4,28.1,0.4z
//             M29,28.1c0,0.5-0.4,0.8-0.8,0.8H15.5V3h12.6c0.5,0,0.8,0.4,0.8,0.8L29,28.1L29,28.1z"/>
//       </symbol>
//       <symbol id="Tooltip-alignright" viewBox="0 0 32 32">
//          <path d="M31.3,2.6c-0.4-1-1.4-1.8-2.5-2c-0.2,0-0.4-0.1-0.7-0.1H3.9C2,0.4,0.4,2,0.4,3.9v24.2c0,1.9,1.6,3.5,3.5,3.5h24.2
//             c0.2,0,0.5,0,0.7-0.1c1.1-0.2,2-1,2.5-2c0.2-0.4,0.3-0.9,0.3-1.3V3.9C31.6,3.4,31.5,3,31.3,2.6L31.3,2.6z M3.9,29
//             c-0.5,0-0.8-0.4-0.8-0.8V3.9c0-0.5,0.4-0.8,0.8-0.8h12.6V29L3.9,29L3.9,29z"/>
//       </symbol>
//       <symbol id="edit" viewBox="0 0 48 48">
//          <path d="M46,7l-3.9-3.9c-1.3-1.3-3.4-1.3-4.6,0L16.1,24.4l8.6,8.6L46,11.7C47.3,10.4,47.3,8.3,46,7z M14.2,26.2l-1.8,10.4l10.4-1.8
//             L14.2,26.2z M39,42.3H4.6V7.8H28l3.6-3.6h-28C2.2,4.3,1,5.5,1,6.9v36.4c0,1.4,1.2,2.6,2.6,2.6H40c1.4,0,2.6-1.2,2.6-2.6V19.7
//             L39,23.3V42.3z"></path>
//       </symbol>
//       <symbol id="delete" viewBox="0 0 48 48">
//          <path d="M9.048,44.472C9.107,45.885,10.27,47,11.684,47h24.632c1.414,0,2.577-1.115,2.637-2.528l1.759-30.705H7.288L9.048,44.472z
//             M29.572,22.99c0-0.592,0.479-1.072,1.072-1.072h1.714c0.592,0,1.072,0.48,1.072,1.072v14.786c0,0.592-0.48,1.072-1.072,1.072
//             h-1.714c-0.592,0-1.072-0.479-1.072-1.072V22.99z M22.072,22.99c0-0.592,0.479-1.072,1.071-1.072h1.715
//             c0.592,0,1.071,0.48,1.071,1.072v14.786c0,0.592-0.48,1.072-1.071,1.072h-1.715c-0.592,0-1.071-0.479-1.071-1.072V22.99z
//             M14.57,22.99c0-0.592,0.479-1.072,1.072-1.072h1.714c0.592,0,1.072,0.48,1.072,1.072v14.786c0,0.592-0.48,1.072-1.072,1.072
//             h-1.714c-0.592,0-1.072-0.479-1.072-1.072V22.99z M14.57,22.99"></path>
//          <path d="M41.883,3.701H30.519V1.553C30.519,1.248,30.272,1,29.966,1H18.034c-0.305,0-0.553,0.248-0.553,0.553v2.148H6.117
//             c-0.914,0-1.656,0.741-1.656,1.656v5.201h39.077V5.357C43.539,4.443,42.797,3.701,41.883,3.701L41.883,3.701z M41.883,3.701"></path>
//       </symbol>
//       <symbol id="Tooltip-anchor" viewBox="0 0 32 32">
//          <path d="M30.7,16l-5.1,3.9l2.2,0.8c-2.1,3.6-5.9,6.2-10.3,6.5V14h3.1v-2.3h-3.1V8.8c1.7-0.5,3-2.1,3-4c0-2.3-1.9-4.1-4.2-4.1
//             s-4.2,1.9-4.2,4.1c0,1.9,1.2,3.5,3,4v2.8H12V14h3.1v13.3c-4.8-0.4-8.7-3.6-10.7-7.7l2.4-0.8l-4.7-4.1l-1.6,6.4L3.1,20
//             C4,26.4,9.6,31.2,16.3,31.2c6.2,0,11.5-4.3,12.9-10l2.4,1.1L30.7,16L30.7,16z M16.3,6.4c-0.9,0-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6
//             s1.6,0.7,1.6,1.6C17.9,5.7,17.2,6.4,16.3,6.4C16.3,6.4,16.3,6.4,16.3,6.4z"/>
//       </symbol>
//       <symbol id="logout" viewBox="0 0 48 48">
//          <path d="M25.389,46.5c-12.406,0-22.5-10.094-22.5-22.5s10.094-22.5,22.5-22.5c6.055,0,11.733,2.369,15.991,6.672
//             c0.636,0.643,0.983,1.493,0.979,2.396c-0.005,0.903-0.36,1.751-1.003,2.387c-0.637,0.631-1.481,0.979-2.378,0.979
//             c-0.91,0-1.764-0.356-2.403-1.003c-2.979-3.01-6.952-4.667-11.186-4.667c-8.677,0-15.736,7.06-15.736,15.737
//             c0,8.677,7.06,15.736,15.736,15.736c4.232,0,8.204-1.656,11.183-4.664c0.64-0.646,1.494-1.002,2.404-1.002
//             c0.896,0,1.741,0.347,2.379,0.978c1.324,1.312,1.335,3.458,0.023,4.783C37.119,44.132,31.442,46.5,25.389,46.5z M34.17,32.249
//             c-0.625,0-1.299-0.495-1.299-1.295v-3.854h-9.058c-1.709,0-3.1-1.391-3.1-3.1s1.391-3.099,3.1-3.099h9.058v-3.854
//             c0-0.8,0.674-1.295,1.298-1.295c0.266,0,0.524,0.086,0.748,0.247l9.657,6.953c0.341,0.245,0.537,0.627,0.537,1.047
//             c0,0.421-0.196,0.804-0.537,1.05l-9.656,6.954C34.695,32.163,34.436,32.249,34.17,32.249L34.17,32.249z"></path>
//       </symbol>
//       <symbol id="Tooltip-article" viewBox="0 0 32 32">
//          <path d="M27.7,31.6c1.2,0,2.2-0.9,2.2-2.2V2.6c0-1.2-0.9-2.2-2.2-2.2H12.1v6.9c0,1.8-1.3,3.1-3.1,3.1H2.1v18.9
//             c0,1.2,0.9,2.2,2.2,2.2L27.7,31.6L27.7,31.6z M16.5,26.1H8.9c-0.5,0-1.1-0.4-1.1-1.1c0-0.5,0.4-1.1,1.1-1.1h7.6
//             c0.5,0,1.1,0.4,1.1,1.1C17.6,25.6,17,26.1,16.5,26.1L16.5,26.1L16.5,26.1z M24.2,20.9H8.9c-0.5,0-1.1-0.4-1.1-1.1
//             c0-0.5,0.4-1.1,1.1-1.1h15.3c0.5,0,1.1,0.4,1.1,1.1C25.1,20.3,24.7,20.9,24.2,20.9L24.2,20.9z M8.9,13.2h15.3c0.5,0,1.1,0.4,1.1,1.1
//             s-0.4,1.1-1.1,1.1H8.9c-0.5,0-1.1-0.4-1.1-1.1S8.4,13.2,8.9,13.2L8.9,13.2z M3.1,9.2h6c0.9,0,1.8-0.8,1.8-1.8V1.4
//             c0-0.5-0.4-0.9-0.9-0.9c-0.3,0-0.4,0.1-0.7,0.3L2.5,7.6C1.9,8.1,2.3,9.2,3.1,9.2C3.1,9.2,3.1,9.2,3.1,9.2z"/>
//       </symbol>
//       <symbol id="Tooltip-bgclr" viewBox="0 0 32 32">
//          <path d="M16,0.4C7.4,0.4,0.4,7.4,0.4,16S7.4,31.6,16,31.6c1.4,0,2.6-1.2,2.6-2.6c0-0.7-0.2-1.2-0.7-1.7c-0.4-0.5-0.7-1-0.7-1.7
//             c0-1.4,1.2-2.6,2.6-2.6h3.1c4.9,0,8.7-3.8,8.7-8.6C31.6,6.7,24.6,0.4,16,0.4L16,0.4L16,0.4z M6.5,16c-1.4,0-2.6-1.2-2.6-2.6
//             s1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6S7.9,16,6.5,16C6.5,16,6.5,16,6.5,16z M11.7,9.1c-1.4,0-2.6-1.2-2.6-2.6s1.2-2.6,2.6-2.6
//             s2.6,1.2,2.6,2.6S13.1,9.1,11.7,9.1L11.7,9.1z M20.3,9.1c-1.4,0-2.6-1.2-2.6-2.6s1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6
//             C22.9,7.9,21.7,9.1,20.3,9.1L20.3,9.1z M25.5,16c-1.4,0-2.6-1.2-2.6-2.6s1.2-2.6,2.6-2.6c1.4,0,2.6,1.2,2.6,2.6S26.9,16,25.5,16
//             C25.5,16,25.5,16,25.5,16z"/>
//       </symbol>
//       <symbol id="Tooltip-close" viewBox="0 0 32 32">
//          <path d="M16,0.4C7.4,0.4,0.4,7.4,0.4,16s7,15.6,15.6,15.6s15.6-7,15.6-15.6S24.6,0.4,16,0.4C16,0.4,16,0.4,16,0.4z M21.9,21.9
//             c-0.6,0.6-1.6,0.6-2.3,0L16,18.4L12.4,22c-0.6,0.6-1.6,0.6-2.3,0s-0.6-1.6,0-2.3l3.7-3.7l-3.5-3.5c-0.6-0.6-0.6-1.6,0-2.3
//             s1.6-0.6,2.3,0l3.5,3.5l3.3-3.3c0.6-0.6,1.6-0.6,2.3,0s0.6,1.6,0,2.3l-3.3,3.3l3.6,3.6C22.5,20.3,22.5,21.3,21.9,21.9L21.9,21.9z"/>
//       </symbol>
//       <symbol id="Tooltip-edit" viewBox="0 0 32 32">
//          <path d="M0.4,23v8.5H9L26,14.5l-8.5-8.6L0.4,23L0.4,23z M30.8,6L26,1.2c-0.5-0.5-1.1-0.8-1.9-0.8s-1.3,0.3-1.9,0.8l-3.4,3.4l8.5,8.5
//             l3.4-3.4c0.5-0.5,0.8-1.1,0.8-1.9C31.6,7.2,31.3,6.6,30.8,6z"/>
//       </symbol>
//       <symbol id="Tooltip-headereye" viewBox="0 0 32 32">
//          <path d="M16,5.4C8.9,5.4,2.8,9.8,0.4,16C2.8,22.2,8.9,26.6,16,26.6S29.2,22.2,31.6,16C29.2,9.8,23.1,5.4,16,5.4
//             C16,5.4,16,5.4,16,5.4z M16,23.1c-4,0-7.1-3.1-7.1-7.1S12,8.9,16,8.9s7.1,3.1,7.1,7.1S20,23.1,16,23.1L16,23.1z M16,11.8
//             c-2.4,0-4.3,1.8-4.3,4.2s1.8,4.2,4.3,4.2c2.4,0,4.2-1.8,4.2-4.2S18.4,11.8,16,11.8L16,11.8z"/>
//       </symbol>
//       <!--
//          <symbol id="Tooltip-headerquestion" viewBox="0 0 32 32">
//          <path fill="#444" d="M15.778 0.444c-8.578 0.133-15.467 7.156-15.333 15.778 0.133 8.578 7.156 15.467 15.778 15.333 8.578-0.133 15.467-7.156 15.333-15.778-0.133-8.578-7.156-15.467-15.778-15.333v0zM15.733 25.467h-0.089c-1.333-0.044-2.267-1.022-2.222-2.311s0.978-2.222 2.267-2.222h0.089c1.378 0.044 2.267 1.022 2.222 2.356 0 1.289-0.933 2.178-2.267 2.178v0zM21.289 14.444c-0.311 0.444-0.978 0.978-1.867 1.644l-0.933 0.667c-0.533 0.4-0.844 0.8-0.933 1.156-0.089 0.311-0.133 0.356-0.133 0.978v0.133h-3.644v-0.311c0.044-1.244 0.089-2 0.578-2.622 0.8-0.978 2.622-2.133 2.711-2.178 0.267-0.178 0.489-0.4 0.622-0.667 0.4-0.533 0.533-0.933 0.533-1.333 0-0.578-0.178-1.067-0.489-1.556-0.311-0.444-0.933-0.667-1.778-0.667s-1.467 0.267-1.822 0.844c-0.356 0.578-0.533 1.2-0.533 1.822v0.133h-3.733v-0.178c0.089-2.267 0.933-3.956 2.444-4.889 0.933-0.622 2.133-0.933 3.511-0.933 1.822 0 3.333 0.444 4.533 1.289 1.2 0.889 1.822 2.178 1.822 3.911 0.044 1.022-0.267 1.911-0.889 2.756v0z"></path>
//          </symbol>
//          -->
//       <symbol id="Tooltip-headerquestion" viewBox="0 0 32 32">
//          <path d="M15.8,0.4C7.2,0.6,0.3,7.6,0.4,16.2c0.1,8.6,7.2,15.5,15.8,15.3c8.6-0.1,15.5-7.2,15.3-15.8C31.4,7.2,24.4,0.3,15.8,0.4
//             C15.8,0.4,15.8,0.4,15.8,0.4z M15.7,25.5L15.7,25.5c-1.4,0-2.4-1-2.3-2.3s1-2.2,2.3-2.2h0.1c1.4,0,2.3,1,2.2,2.4
//             C18,24.6,17.1,25.5,15.7,25.5L15.7,25.5L15.7,25.5z M21.3,14.4c-0.3,0.4-1,1-1.9,1.6l-0.9,0.7c-0.5,0.4-0.8,0.8-0.9,1.2
//             c-0.1,0.3-0.1,0.4-0.1,1V19h-3.6v-0.3c0-1.2,0.1-2,0.6-2.6c0.8-1,2.6-2.1,2.7-2.2c0.3-0.2,0.5-0.4,0.6-0.7c0.4-0.5,0.5-0.9,0.5-1.3
//             c0-0.6-0.2-1.1-0.5-1.6c-0.3-0.4-0.9-0.7-1.8-0.7s-1.5,0.3-1.8,0.8c-0.4,0.6-0.5,1.2-0.5,1.8v0.1H9.9v-0.2c0.1-2.3,0.9-4,2.4-4.9
//             c0.9-0.6,2.1-0.9,3.5-0.9c1.8,0,3.3,0.4,4.5,1.3c1.2,0.9,1.8,2.2,1.8,3.9C22.2,12.7,21.9,13.6,21.3,14.4L21.3,14.4L21.3,14.4z"/>
//       </symbol>
//       <symbol id="emptytrigger" viewBox="0 0 32 32">
//          <path fill="#ffcf73" d="M26.768 31.2h-19.888c-0.352 0-0.64-0.288-0.64-0.64v-14.256c0-0.352 0.288-0.64 0.64-0.64h19.888c0.352 0 0.64 0.288 0.64 0.64v14.256c0 0.352-0.288 0.64-0.64 0.64z"></path>
//          <path fill="#d6eaf2" d="M24.032 15.664c0.592-1.024 0.928-2.208 0.928-3.44 0-4.112-3.648-7.44-8.16-7.44s-8.16 3.328-8.16 7.44c0 1.248 0.336 2.416 0.928 3.44h14.464zM18.448 22.8c1.584 0 2.88 1.296 2.88 2.88s-1.296 2.88-2.88 2.88-2.88-1.296-2.88-2.88 1.296-2.88 2.88-2.88z"></path>
//          <path fill="#e8f4f7" d="M16.8 4.784c-0.432 0-0.848 0.032-1.264 0.096-0.944 1.168-1.52 2.592-1.52 4.128 0 3.072 2.24 5.68 5.344 6.656h4.656c0.592-1.024 0.928-2.208 0.928-3.44 0.016-4.112-3.632-7.44-8.144-7.44zM10.608 17.856h1.728l3.968 4.256c0.176 0.192 0.16 0.48-0.016 0.656l-0.272 0.256c-0.192 0.176-0.48 0.16-0.656-0.016l-4.672-5.008c-0.032-0.048-0.048-0.096-0.080-0.144zM27.408 16.544c0-0.496-0.4-0.896-0.896-0.896h-19.376c-0.496 0-0.896 0.4-0.896 0.896v1.312h21.152v-1.312z"></path>
//          <path fill="#e8f4f7" d="M18.448 22.784c-0.592 0-1.136 0.176-1.584 0.48-0.016 0.112-0.016 0.24-0.016 0.352 0 2.032 1.472 3.744 3.456 4.272 0.64-0.528 1.040-1.328 1.040-2.224-0.016-1.584-1.312-2.88-2.896-2.88z"></path>
//          <path fill="#004d88" d="M20.208 9.168c-0.016 0-0.016 0-0.032 0-1.44-0.304-1.936-1.376-1.952-1.424-0.032-0.064 0-0.144 0.064-0.16 0.064-0.032 0.144 0 0.16 0.064 0 0.016 0.464 1.008 1.776 1.28 0.064 0.016 0.112 0.080 0.096 0.144 0 0.064-0.048 0.096-0.112 0.096zM13.424 9.168c-0.064 0-0.112-0.048-0.128-0.096-0.016-0.064 0.032-0.128 0.096-0.144 1.312-0.272 1.76-1.28 1.776-1.28 0.032-0.064 0.096-0.096 0.16-0.064s0.096 0.096 0.064 0.16c-0.016 0.048-0.512 1.12-1.968 1.424 0.016 0 0 0 0 0zM9.6 15.632c-0.544-1.088-0.848-2.304-0.848-3.6 0-4.432 3.616-8.032 8.064-8.032 0.032 0 0.96-0.096 2.032-0.464 1.184-0.4 2.032-0.992 2.544-1.696-0.032 0.48-0.24 1.168-1.12 1.568l-0.32 0.144 0.32 0.16c0.032 0.016 0.624 0.304 1.2 0.192-0.16 0.256-0.512 0.576-1.248 0.528h-0.768l0.688 0.32c2.832 1.312 4.672 4.176 4.672 7.296 0 1.296-0.304 2.528-0.848 3.6h0.368c0.512-1.088 0.816-2.32 0.816-3.6 0-3.056-1.68-5.872-4.336-7.328 0.944-0.208 1.104-1.056 1.104-1.056l0.064-0.336-0.304 0.16c-0.304 0.16-0.688 0.112-0.944 0.048 1.264-0.816 0.944-2.256 0.944-2.272l-0.112-0.464-0.208 0.448c-0.944 2.064-4.544 2.448-4.576 2.464-4.608 0-8.368 3.744-8.368 8.368 0 1.296 0.288 2.512 0.816 3.6h0.368v-0.048zM15.824 22.944c-0.224 0-0.432-0.080-0.592-0.256l-4.416-4.736c-0.304-0.336-0.288-0.848 0.032-1.152 0.336-0.304 0.848-0.288 1.152 0.032l4.416 4.736c0.304 0.336 0.288 0.848-0.032 1.152v0c-0.16 0.144-0.352 0.224-0.56 0.224zM11.408 16.912c-0.112 0-0.24 0.048-0.336 0.128-0.192 0.176-0.208 0.48-0.016 0.688l4.416 4.736c0.176 0.192 0.48 0.208 0.688 0.016v0c0.192-0.176 0.208-0.48 0.016-0.688l-4.416-4.736c-0.096-0.096-0.224-0.144-0.352-0.144z"></path>
//          <path fill="#d6eaf2" d="M20.336 17.008c-1.536-0.336 0.112-3.024 0.24-3.216-0.064-0.096-0.096-0.16-0.096-0.16s-1.632 1.456-1.808 1.808c-0.192 0.352-0.192 0.96 0.32 1.52 0.384 0.432 1.2 0.208 1.568 0.080-0.096 0-0.16-0.016-0.224-0.032zM14.624 15.056c0 0-1.52 0.176-2.4-1.328l-0.912 5.328c0 0 0.208 1.344 0.96 1.472 0.752 0.112 1.248-0.224 1.44-0.576 0.224-0.368 0.912-4.896 0.912-4.896zM30.432 27.072c0.192 0 0.336 0.144 0.336 0.336s-0.144 0.336-0.336 0.336c-0.192 0-0.336-0.144-0.336-0.336s0.16-0.336 0.336-0.336zM30.432 26.848c-0.304 0-0.56 0.256-0.56 0.56s0.256 0.56 0.56 0.56 0.56-0.256 0.56-0.56c0-0.32-0.24-0.56-0.56-0.56v0zM4.272 22.832c0.192 0 0.336 0.144 0.336 0.336s-0.144 0.336-0.336 0.336-0.336-0.144-0.336-0.336c0-0.192 0.16-0.336 0.336-0.336zM4.272 22.608c-0.304 0-0.56 0.256-0.56 0.56s0.256 0.56 0.56 0.56 0.56-0.256 0.56-0.56c0-0.304-0.24-0.56-0.56-0.56v0z"></path>
//          <path fill="#e8f4f7" d="M13.008 14.656l-0.912 5.328c0 0 0.032 0.24 0.144 0.528-0.704-0.16-0.912-1.456-0.912-1.456l0.912-5.328c0-0.016 0.304 0.864 0.768 0.928z"></path>
//          <path fill="#004d88" d="M15.616 9.872c0.32 0 0.576 0.256 0.576 0.576s-0.256 0.576-0.576 0.576-0.576-0.256-0.576-0.576c0-0.32 0.256-0.576 0.576-0.576zM18.080 9.872c0.32 0 0.576 0.256 0.576 0.576s-0.256 0.576-0.576 0.576-0.576-0.256-0.576-0.576c0-0.32 0.256-0.576 0.576-0.576zM18.816 28.496c-1.728 0-3.136-1.408-3.136-3.136s1.408-3.136 3.136-3.136 3.136 1.408 3.136 3.136-1.408 3.136-3.136 3.136zM18.816 22.56c-1.536 0-2.8 1.248-2.8 2.8s1.264 2.8 2.8 2.8 2.8-1.248 2.8-2.8-1.248-2.8-2.8-2.8zM19.872 17.44c-0.032 0-0.096 0-0.128 0-0.4-0.032-0.752-0.208-1.008-0.512-0.528-0.624-0.448-1.552 0.176-2.096l1.44-1.28c0.064-0.064 0.176-0.048 0.224 0.016 0.064 0.064 0.048 0.176-0.016 0.224l-1.456 1.296c-0.48 0.416-0.544 1.136-0.144 1.616 0.208 0.24 0.48 0.384 0.784 0.4 0.304 0.032 0.608-0.064 0.832-0.272l2.176-2.016c0.064-0.064 0.16-0.064 0.224 0.016 0.064 0.064 0.064 0.16-0.016 0.224l-2.176 2.032c-0.24 0.224-0.576 0.352-0.912 0.352zM11.168 19.040l0.864-5.312c0.016-0.096 0.096-0.16 0.176-0.128 0.096 0.016 0.16 0.096 0.128 0.176l-0.864 5.312c-0.048 0.304 0.048 0.608 0.24 0.848s0.464 0.4 0.768 0.432c0.624 0.080 1.2-0.368 1.28-1.008l0.672-4.32c0-0.080 0.096-0.16 0.176-0.128 0.080 0 0.16 0.096 0.128 0.176l-0.64 4.288c-0.096 0.816-0.832 1.392-1.648 1.296-0.4-0.048-0.736-0.24-0.976-0.544-0.016-0.032-0.048-0.080-0.064-0.112-0.192-0.288-0.272-0.64-0.24-0.976zM16.4 22.496l0.56 0.576-0.24 0.24-0.56-0.592 0.24-0.224zM18.608 25.84c0-0.144 0.016-0.24 0.048-0.304s0.096-0.144 0.208-0.24c0.080-0.080 0.144-0.144 0.192-0.224 0.048-0.064 0.064-0.144 0.064-0.24s-0.032-0.176-0.080-0.224c-0.048-0.048-0.128-0.080-0.224-0.080-0.080 0-0.16 0.016-0.208 0.064-0.064 0.048-0.080 0.112-0.080 0.208h-0.352v-0.016c0-0.176 0.064-0.32 0.176-0.416 0.128-0.096 0.288-0.144 0.48-0.144 0.208 0 0.384 0.048 0.496 0.16s0.176 0.256 0.176 0.448c0 0.128-0.032 0.24-0.112 0.352s-0.16 0.208-0.288 0.304c-0.064 0.048-0.096 0.096-0.112 0.144s-0.016 0.112-0.016 0.192h-0.368v0.016zM18.992 26.464h-0.368v-0.352h0.368v0.352z"></path>
//          <path fill="#e46f7f" d="M7.456 16.464c0.16 0 0.288 0.128 0.288 0.288s-0.128 0.288-0.288 0.288-0.288-0.128-0.288-0.288 0.128-0.288 0.288-0.288z"></path>
//          <path fill="#6dad3b" d="M9.36 16.464c0.16 0 0.288 0.128 0.288 0.288s-0.128 0.288-0.288 0.288-0.288-0.128-0.288-0.288 0.128-0.288 0.288-0.288z"></path>
//          <path fill="#ec5063" d="M28.864 23.92c0.24 0 0.448 0.208 0.448 0.448s-0.208 0.448-0.448 0.448-0.448-0.208-0.448-0.448 0.208-0.448 0.448-0.448zM28.864 23.696c-0.368 0-0.672 0.304-0.672 0.672s0.304 0.672 0.672 0.672 0.672-0.304 0.672-0.672-0.288-0.672-0.672-0.672v0zM4.944 16.992c0.24 0 0.448 0.208 0.448 0.448s-0.208 0.448-0.448 0.448-0.448-0.208-0.448-0.448c0-0.256 0.208-0.448 0.448-0.448zM4.944 16.768c-0.368 0-0.672 0.304-0.672 0.672s0.304 0.672 0.672 0.672 0.672-0.304 0.672-0.672c0-0.384-0.304-0.672-0.672-0.672v0zM1.344 21.952h0.208v0.128h-0.208v0.24h-0.128v-0.24h-0.208v-0.128h0.208v-0.224h0.128c0 0 0 0.224 0 0.224zM29.824 30.544h0.208v0.128h-0.208v0.24h-0.128v-0.24h-0.208v-0.128h0.208v-0.224h0.128v0.224z"></path>
//          <path fill="#f2c157" d="M8.432 16.464c0.16 0 0.288 0.128 0.288 0.288s-0.128 0.288-0.288 0.288-0.288-0.128-0.288-0.288 0.128-0.288 0.288-0.288zM28.432 28.192c0.128 0 0.224 0.096 0.224 0.224s-0.096 0.224-0.224 0.224c-0.128 0-0.224-0.096-0.224-0.224s0.096-0.224 0.224-0.224zM28.432 27.968c-0.24 0-0.448 0.208-0.448 0.448s0.208 0.448 0.448 0.448 0.448-0.208 0.448-0.448-0.208-0.448-0.448-0.448v0zM2.832 20.272c0.128 0 0.224 0.096 0.224 0.224s-0.096 0.224-0.224 0.224-0.224-0.096-0.224-0.224c0-0.112 0.096-0.224 0.224-0.224zM2.832 20.064c-0.24 0-0.448 0.208-0.448 0.448s0.208 0.448 0.448 0.448 0.448-0.208 0.448-0.448c-0.016-0.256-0.208-0.448-0.448-0.448v0zM5.008 19.84h0.208v0.128h-0.208v0.24h-0.128v-0.24h-0.208v-0.128h0.208v-0.224h0.128v0.224zM29.376 26.096h0.208v0.128h-0.208v0.24h-0.128v-0.24h-0.208v-0.128h0.208v-0.224h0.128v0.224zM12.656 29.632c-2.272 0-4.432-0.256-6.4-0.72v1.392c0 0.496 0.4 0.896 0.896 0.896h19.376c0.496 0 0.896-0.4 0.896-0.896v-5.664c-2.8 2.976-8.368 4.992-14.768 4.992z"></path>
//       </symbol>
//       <symbol id="Tooltip-move" viewBox="0 0 32 32">
//          <path d="M31.2,15.2l-4.4-4.4c-0.2-0.2-0.5-0.3-0.8-0.3s-0.6,0.1-0.8,0.3s-0.3,0.5-0.3,0.8v2.2h-6.7V7.1h2.2c0.3,0,0.6-0.1,0.8-0.3
//             s0.3-0.5,0.3-0.8s-0.1-0.6-0.3-0.8l-4.4-4.4c-0.2-0.2-0.5-0.3-0.8-0.3s-0.6,0.1-0.8,0.3l-4.4,4.4c-0.2,0.2-0.3,0.5-0.3,0.8
//             s0.1,0.6,0.3,0.8s0.5,0.3,0.8,0.3h2.2v6.7H7.1v-2.2c0-0.3-0.1-0.6-0.3-0.8S6.3,10.4,6,10.4s-0.6,0.1-0.8,0.3l-4.4,4.4
//             c-0.2,0.2-0.3,0.5-0.3,0.8s0.1,0.6,0.3,0.8l4.4,4.4c0.2,0.2,0.5,0.3,0.8,0.3s0.6-0.1,0.8-0.3s0.3-0.5,0.3-0.8v-2.2h6.7v6.7h-2.2
//             c-0.3,0-0.6,0.1-0.8,0.3s-0.3,0.5-0.3,0.8s0.1,0.6,0.3,0.8l4.4,4.4c0.2,0.2,0.5,0.3,0.8,0.3s0.6-0.1,0.8-0.3l4.4-4.4
//             c0.2-0.2,0.3-0.5,0.3-0.8s-0.1-0.6-0.3-0.8s-0.5-0.3-0.8-0.3h-2.2v-6.7h6.7v2.2c0,0.3,0.1,0.6,0.3,0.8s0.5,0.3,0.8,0.3
//             s0.6-0.1,0.8-0.3l4.4-4.4c0.2-0.2,0.3-0.5,0.3-0.8S31.5,15.4,31.2,15.2C31.2,15.2,31.2,15.2,31.2,15.2z"/>
//       </symbol>
//       <symbol id="TooltipEditor-align-center" viewBox="0 0 32 32">
//          <path d="M8,9.1h16v1.7H8V9.1z M8,17.1h16v1.7H8V17.1z"/>
//          <path class="stblu" d="M12,13.1h8v1.7h-8V13.1z M12,21.1h8v1.7h-8V21.1z"/>
//       </symbol>
//       <symbol id="TooltipEditor-align-justify" viewBox="0 0 32 32">
//          <path d="M8,9.1h16v1.7H8V9.1z M8,17.1h16v1.7H8V17.1z"/>
//          <path class="stblu" d="M8,13.1h16v1.7H8V13.1z M8,21.1h16v1.7H8V21.1z"/>
//       </symbol>
//       <symbol id="TooltipEditor-align-left" viewBox="0 0 32 32">
//          <path d="M8,9.1h16v1.7H8V9.1z M8,17.1h16v1.7H8V17.1z"/>
//          <path class="stblu" d="M8,13.1h8v1.7H8V13.1z M8,21.1h8v1.7H8V21.1z"/>
//       </symbol>
//       <symbol id="TooltipEditor-align-right" viewBox="0 0 32 32">
//          <path d="M8,9.1h16v1.7H8V9.1z M8,17.1h16v1.7H8V17.1z"/>
//          <path class="stblu" d="M16,13.1h8v1.7h-8V13.1z M16,21.1h8v1.7h-8V21.1z"/>
//       </symbol>
//       <symbol id="TooltipEditor-clrpick" viewBox="0 0 32 32">
//          <path d="M21.5,10.6l-1.3,1.3l0.3,0.3c0.2,0.2,0.3,0.6,0.2,1c-0.1,0.3-0.2,0.6-0.4,0.8s-0.5,0.3-0.8,0.3s-0.6-0.1-0.8-0.3l-0.4-0.4
//             l-5.9,5.9c-0.5,0.3-1,0.5-1.5,0.5s-1-0.2-1.3-0.5s-0.5-0.8-0.5-1.3s0.2-1,0.5-1.3l5.9-5.9l-0.4-0.4c-0.2-0.2-0.3-0.5-0.3-0.8
//             s0.1-0.6,0.3-0.8c0.3-0.3,0.8-0.5,1.1-0.5c0.3,0,0.6,0.1,0.7,0.3l0.3,0.3l1.3-1.3C18.9,7.2,19.4,7,20,7s1.1,0.2,1.5,0.6
//             s0.6,0.9,0.6,1.5S21.9,10.2,21.5,10.6z"/>
//          <path class="stwhi" d="M16.2,9.5c-0.1,0-0.3,0.1-0.4,0.2l0.8,0.9l2.7,2.7c0.2-0.1,0.3-0.3,0.3-0.4L16.2,9.5z"/>
//          <path class="stblu" d="M23.4,23.5H14c-0.5,0-0.8-0.4-0.8-0.8s0.4-0.8,0.8-0.8h9.3c0.5,0,0.8,0.4,0.8,0.8S23.8,23.5,23.4,23.5z
//             M10.4,17.6c-0.1,0.1-0.2,0.3-0.2,0.6c0,0.2,0.1,0.4,0.2,0.6c0.1,0.1,0.3,0.2,0.6,0.2c0.2,0,0.4-0.1,0.6-0.2l5.9-5.9l-1.1-1.1
//             C16.4,11.8,10.4,17.6,10.4,17.6z M9.5,20.3c-0.1,0-0.2,0-0.3,0.1c-0.2,0.3-1.5,2-1.5,2.8c0,1,0.8,1.7,1.7,1.7c1,0,1.7-0.8,1.7-1.7
//             c0-0.8-1.2-2.5-1.5-2.8C9.8,20.3,9.7,20.3,9.5,20.3C9.5,20.3,9.5,20.3,9.5,20.3z"/>
//       </symbol>
//       <symbol id="TooltipEditor-list-number" viewBox="0 0 32 32">
//          <path d="M11.9,9.8h13v1.9h-13V9.8z M11.9,15.3h13v1.9h-13C11.9,17.2,11.9,15.3,11.9,15.3z M11.9,20.7h13v1.9h-13V20.7z"/>
//          <path class="stblu" d="M7.1,12.6l0.6-0.1V9.7H7.1V9.2l1.3-0.3v3.5L9,12.6v0.5H7.1C7.1,13.1,7.1,12.6,7.1,12.6z M7.1,18v-0.5l1.1-1.4
//             c0.2-0.2,0.3-0.4,0.3-0.6c0.1-0.2,0.1-0.3,0.1-0.4c0-0.2,0-0.3-0.1-0.4s-0.2-0.2-0.3-0.2c-0.2,0-0.3,0.1-0.4,0.2S7.7,15,7.7,15.2
//             H7.1c0-0.4,0.1-0.7,0.3-0.9c0.2-0.3,0.5-0.4,0.9-0.4c0.4,0,0.6,0.1,0.8,0.3s0.3,0.5,0.3,0.9c0,0.2-0.1,0.5-0.2,0.7
//             c-0.1,0.2-0.3,0.5-0.6,0.8L8,17.4h0.9L9,17h0.5v1H7.1z M7.8,20.6h0.4c0.2,0,0.3-0.1,0.4-0.2s0.1-0.2,0.1-0.4c0-0.2,0-0.3-0.1-0.4
//             s-0.2-0.2-0.3-0.2s-0.2,0-0.3,0.1c-0.1,0.1-0.1,0.2-0.1,0.4H7.1c0-0.3,0.1-0.6,0.3-0.8s0.5-0.3,0.8-0.3c0.4,0,0.6,0.1,0.9,0.3
//             c0.2,0.2,0.3,0.5,0.3,0.9c0,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.4,0.4c0.2,0.1,0.3,0.2,0.4,0.4s0.2,0.4,0.2,0.6
//             c0,0.4-0.1,0.7-0.3,0.9s-0.5,0.3-0.9,0.3c-0.3,0-0.6-0.1-0.8-0.3s-0.3-0.5-0.3-0.9l0,0h0.7c0,0.2,0,0.3,0.1,0.4s0.2,0.2,0.4,0.2
//             s0.3-0.1,0.4-0.2c0.1-0.1,0.1-0.2,0.1-0.4s0-0.4-0.1-0.5s-0.2-0.2-0.4-0.2H7.8C7.8,21.2,7.8,20.6,7.8,20.6z"/>
//       </symbol>
//       <symbol id="TooltipEditor-list-round" viewBox="0 0 32 32">
//          <path d="M11.8,9.3H25v2H11.8V9.3z M11.8,14.9H25v2H11.8V14.9z M11.8,20.4H25v2H11.8V20.4z"/>
//          <path class="stblu" d="M8.3,20.1c0.7,0,1.3,0.6,1.3,1.3S9,22.7,8.3,22.7S7,22.1,7,21.4S7.6,20.1,8.3,20.1z M8.3,14.6
//             c0.7,0,1.3,0.6,1.3,1.3S9,17.2,8.3,17.2S7,16.6,7,15.9S7.6,14.6,8.3,14.6z M8.3,9.3c0.7,0,1.3,0.6,1.3,1.3S9,11.9,8.3,11.9
//             S7,11.3,7,10.6S7.6,9.3,8.3,9.3z"/>
//       </symbol>
//       <symbol id="TooltipEditor-list-permalink" viewBox="0 0 32 32">
//          <path d="M12.9,24c-1.3,0-2.6-0.5-3.5-1.4c-0.9-1-1.4-2.2-1.4-3.5s0.5-2.6,1.4-3.5l1.4-1.4c0.1-0.1,0.3-0.2,0.5-0.2s0.3,0.1,0.5,0.2
//             c0.2,0.3,0.2,0.7,0,0.9l-1.4,1.4c-0.7,0.7-1.1,1.6-1.1,2.6s0.4,1.9,1.1,2.6c0.7,0.7,1.6,1,2.6,1s1.9-0.4,2.6-1l1.4-1.4
//             c0.1-0.1,0.3-0.2,0.5-0.2s0.3,0.1,0.5,0.2c0.1,0.1,0.2,0.3,0.2,0.5s-0.1,0.3-0.2,0.5l-1.4,1.4C15.5,23.5,14.2,24,12.9,24z M14,18.6
//             c-0.2,0-0.3-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5s0.1-0.3,0.2-0.5l4.5-4.5c0.1-0.1,0.3-0.2,0.5-0.2s0.3,0.1,0.5,0.2
//             c0.2,0.3,0.2,0.7,0,0.9l-4.5,4.5C14.4,18.6,14.2,18.6,14,18.6z M20.3,18.4c-0.2,0-0.3-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5
//             s0.1-0.3,0.2-0.5l1.8-1.8c1.4-1.4,1.4-3.7,0-5.2C21,9.7,20,9.3,19.1,9.3c-1,0-1.9,0.4-2.6,1.1l-1.8,1.8c-0.1,0.1-0.3,0.2-0.5,0.2
//             s-0.3-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5s0.1-0.3,0.2-0.5l1.8-1.8c1-0.9,2.3-1.4,3.6-1.4s2.6,0.5,3.5,1.4c1.9,1.9,1.9,5,0,7
//             l-1.8,1.8C20.6,18.3,20.5,18.4,20.3,18.4z"/>
//       </symbol>
//       <symbol id="TooltipEditor-tab-height" viewBox="0 0 32 32">
//          <path fill="#444" d="M10.5 11.1v-1.5h4.5v1.5l-1.2 0.3v3.7h4.4v-3.7l-1.2-0.3v-1.5h4.5v1.5l-1.2 0.3v9.2l1.2 0.3v1.5h-4.5v-1.5l1.2-0.3v-3.5h-4.4v3.5l1.2 0.3v1.5h-4.5v-1.5l1.1-0.3v-9.2l-1.1-0.3z"></path>
//       </symbol>
//       <symbol id="TooltipEditor-txtbold" viewBox="0 0 32 32">
//          <path d="M16.2,9c1.6,0,2.9,0.3,3.9,1s1.4,1.6,1.4,2.9c0,0.6-0.2,1.2-0.5,1.7s-0.8,0.9-1.5,1.1c0.8,0.2,1.5,0.6,1.9,1.2
//             s0.6,1.3,0.6,2c0,1.3-0.4,2.4-1.3,3c-0.9,0.7-2.1,1-3.8,1H10v-1.7l1.5-0.3V11L10,10.7V9H16.2z M14.3,14.9h2c0.8,0,1.3-0.2,1.7-0.5
//             s0.6-0.8,0.6-1.3c0-0.6-0.2-1.1-0.6-1.4s-1-0.5-1.8-0.5h-1.9C14.3,11.2,14.3,14.9,14.3,14.9z M14.3,16.8v4h2.6
//             c0.7,0,1.3-0.2,1.7-0.5s0.6-0.8,0.6-1.4c0-0.7-0.2-1.2-0.5-1.6s-0.9-0.5-1.6-0.5H14.3z"/>
//       </symbol>
//       <symbol id="TooltipEditor-txtitalic" viewBox="0 0 32 32">
//          <path d="M15.2,10.7L15.8,9h5.8L21,10.7L19.3,11l-3.9,10l1.4,0.3L16.2,23h-5.8l0.7-1.7l1.6-0.3l3.9-10C16.6,11,15.2,10.7,15.2,10.7z"
//             />
//       </symbol>
//       <symbol id="TooltipEditor-txtunderline" viewBox="0 0 32 32">
//          <path d="M14.9,8v1.5l-1.3,0.3v6.3c0,0.8,0.2,1.4,0.6,1.8s1,0.6,1.8,0.6c0.8,0,1.4-0.2,1.8-0.6s0.7-1,0.7-1.8V9.7l-1.3-0.3V8h5v1.5
//             l-1.3,0.3v6.3c0,1.4-0.4,2.4-1.3,3.2c-0.9,0.7-2.1,1.1-3.5,1.1c-1.5,0-2.6-0.4-3.5-1.1s-1.3-1.8-1.3-3.2V9.7L9.8,9.5V8
//             C9.8,8,14.9,8,14.9,8z"/>
//          <path class="stblu" d="M9.5,22h13v2h-13V22z"/>
//       </symbol>
//       <symbol id="Tooltip-search" viewBox="0 0 32 32">
//          <path d="M12.6,25.3C5.7,25.3,0,19.7,0,12.6C0,5.7,5.5,0,12.5,0s12.6,5.5,12.6,12.5C25.3,19.5,19.5,25.3,12.6,25.3
//             C12.6,25.3,12.6,25.3,12.6,25.3z M12.6,2.6c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S18.2,2.6,12.6,2.6
//             C12.6,2.6,12.6,2.6,12.6,2.6z M30.6,32c-0.3,0-0.7-0.2-0.9-0.3l-9.9-10.2c-0.3-0.7-0.2-1.4,0.3-1.7s1-0.2,1.4,0l9.9,10.2
//             c0.5,0.5,0.3,1.4-0.2,1.9C31.1,31.8,30.8,32,30.6,32z M4.3,13.3c-0.3,0-0.7-0.3-0.7-0.7c0-4.8,4-8.8,8.8-8.8c0.3,0,0.5,0.3,0.5,0.7
//             S12.6,5,12.5,5C8.5,5.2,5,8.5,5,12.6C5,13,4.7,13.3,4.3,13.3z"/>
//       </symbol>
//    </svg>
// </div>
//    <div class="zohodesk-Tooltip-panel-header" id="zdtt_headerContainer">
//       <div class="zohodesk-Tooltip-cl-both">
//          <div class="zohodesk-Tooltip-fl-lft">
//             <span class="zohodesk-Tooltip-panel-header-text zohodesk-Tooltip-clrWhite">Asap</span>
//             <!--<div class="zohodesk-Tooltip-headerquestion-icon">
//                <span class="zohodesk-Tooltip-editor-iconheaderquestion">
//                  <svg class="zohodesk-tooltip-svg-icon-medium">
//                    <use xlink:href="#Tooltip-headerquestion"></use>
//                  </svg>
//                </span>
//                </div> -->
//          </div>
//          <div class="zohodesk-Tooltip-fl-rt">
//             <div id="sidePanel_float" class="zohodesk-Tooltip-inline-icons zohodesk-Tooltip-selected-inline-icons">
//                <span class="zohodesk-Tooltip-editor-iconalignleft">
//                   <svg class="zohodesk-tooltip-svg-icon-medium">
//                      <use xlink:href="#Tooltip-alignright"></use>
//                   </svg>
//                </span>
//             </div>
//             <div class="zohodesk-Tooltip-inline-icons" id="userInfoIcon">
//                <div class="zohodesk-Tooltip-usricon">
//                   <img src="` + zdtt_userImg + `">
//                </div>
//                <div class="zohodesk-Tooltip-usrinfopopup zohodesk-Tooltip-Selectbox-dropdown" id="zohoDeskUserDetailsInfoPopup">
//                   <div class="zohodesk-Tooltip-usrinfoHead">
//                      <div class="zohodesk-Tooltip-usricon">
//                         <img src="` + zdtt_userImg + `">
//                      </div>
//                      <div class="zohodesk-Tooltip-usrinfoCont">
//                         <div class="zohodesk-Tooltip-usrName" title="` + zdtt_userName + `">` + zdtt_userName + `</div>
//                         <div class="zohodesk-Tooltip-usrId" title="` + zdtt_mailId + `">` + zdtt_mailId + `</div>
//                      </div>
//                   </div>
//                   <div class="zohodesk-Tooltip-usrinfoFoot">
//                      <input id="ZDTT_logOutBtn" type="button" value="Logout">
//                   </div>
//                </div>
//             </div>
//             <div class="zohodesk-Tooltip-inline-icons">
//                <span class="zohodesk-Tooltip-editor-iconclose panel-close" id="closeEditor">
//                   <svg class="zohodesk-tooltip-svg-icon-medium">
//                      <use xlink:href="#Tooltip-close"></use>
//                   </svg>
//                </span>
//             </div>
//          </div>
//       </div>
//    </div>
//    <div class="zohodesk-Tooltip-pstnrltv zohodesk-Tooltip-height" id='ZDTT_switching_comonElem'></div>
// </div>
// `;

// if (document.getElementById("ToolTipEditorPosition") != undefined) {
//     document.getElementById("ToolTipEditorPosition").parentElement.removeChild(document.getElementById("ToolTipEditorPosition"));
// }

// var zd_tt_positionComponent = document.createElement("div");
// zd_tt_positionComponent.id = "ToolTipEditorPosition";
// zd_tt_positionComponent.className = "zohodesk-tooltip-displayinline zohodesk-Tooltip-panel-right";
// document.body.appendChild(zd_tt_positionComponent);
// document.getElementById("ToolTipEditorPosition").innerHTML = zd_tt_commonComponent;
// window.postMessage({
//     name: "Zohodesk_Chrome_Extension_AsapDetails"
// }, "*");
// zd_tt_loadinigContainerAdd("ZDTT_switching_comonElem");










// var maxZIndexValue = findHighestZIndex('div');
// var editerBodyZI = maxZIndexValue + 2;
// var ASapBodyZI = maxZIndexValue + 5;
// document.getElementById('ToolTipEditorPosition').style.zIndex = editerBodyZI;
// var asapCondainerSItimer = setInterval(function() {
//     if (document.getElementById("zohohc-asap-viewers") != undefined) {
//         document.getElementById("zohohc-asap-viewers").style.zIndex = ASapBodyZI;
//         clearInterval(asapCondainerSItimer);
//     }
// }, 500);



















// zd_tt_commenEventsBinder(); 


/* fresh code for side panel ... */

var zdttContainers = {};
var zdttTabs={};
var zdtt_lastHighlighted = [];
var zdtt_nowStatus = "new";
var Trigger_option = "HOVER";
var zd_tt_addTooltipObj = {
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

function zdttCommonEventsBinder(){
	document.addEventListener('click', zdtt_mousedownActionShow , true);
}

function zdtt_mousedownActionShow(e) {
    if (ZohodeskTooltipCommonShowHideVariable != undefined) {
        zdtt_popupHide(ZohodeskTooltipCommonShowHideVariable);
    }
}


function zdtt_popupHide(element){
	// var element = document.getElementById(elementId);
    if (element != undefined) {
        element.parentElement.className = element.parentElement.className.split(" zohodesk-Tooltip-active").join("");
        var getClass = element.className;
        var splitClass = getClass.split(" ");
        if(element.className.indexOf("zohodesk-displayBlock")!=-1){
        	element.className = element.className.split(" zohodesk-displayBlock").join("");
        }
        // if (splitClass[splitClass.length - 1] == "zohodesk-displayBlock") {
        //     var ordinaryClass = splitClass.slice(0, splitClass.length - 1);
        //     ordinaryClass = ordinaryClass.join(" ");
        //     element.className = ordinaryClass;
        // }
        // if (tempVariable == ZohodeskTooltipCommonShowHideVariable) {
        ZohodeskTooltipCommonShowHideVariable = undefined;
        // }
    }
}


function zdtt_popupShow(elem){
	return function(e) {
		if(elem!=undefined){
			if( elem.id != "triggerTapDropdown" && elem.id != "zohoDeskUserDetailsInfoPopup" ){
				elem.parentElement.className += " zohodesk-Tooltip-active";
			}
			if( elem.className.indexOf("zohodesk-displayBlock") == -1 ){
				elem.className += " zohodesk-displayBlock";
			}
			ZohodeskTooltipCommonShowHideVariable = elem ;
		}
	}
}



function zdttSidePanelAlignmentEvent(parent,switchElem) {
	this.switchElem = switchElem.getElementsByTagName("use")[0] ;
	this.parent = parent ;
    this.status = "Right";
    this.toggle = this.toggle.bind(this);
    switchElem.onclick = this.toggle;
}
zdttSidePanelAlignmentEvent.prototype.toggle = function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.switchElem.href.baseVal = this.status == "Right" ? "#Tooltip-alignleft" : "#Tooltip-alignright" ;
    this.status == "Right" ? this.status = "Left" : this.status = "Right";
    this.parent.className.indexOf('zohodesk-Tooltip-panel-left') == -1 ? this.parent.className += " zohodesk-Tooltip-panel-left" : this.parent.className = this.parent.className.split(' zohodesk-Tooltip-panel-left').join('');
};

function zdTT_logOut() {
    requestAPI("https://accounts.zoho.com/logout").get().then((res) => {
        chrome.runtime.sendMessage({
            "message": "zd_ATTitsEnabledStatus",
            "data": zd_ATTitsEnabled
        });
        zd_ATTitsEnabled = zd_ATTitsEnabled ? false : true;
    });
}

function getArticleName(searchStr) {
    searchStr = searchStr + "*";
    window.postMessage({
        name: "zdttArticleSearch",
        searchStr: searchStr
    }, "*");
};

function zdttArticleSearch(popup) {
    return function(e) {
        console.log(e.target.value, "#######")
        if (e.target.value.trim() == "") {
            hide(popup);
        } else {
            zdttContainers.searchRes.querySelector("#zd_tt_searchName").innerHTML = e.target.value;
            getArticleName(e.target.value);
        }
    }
}

function parentHighlighter(elem,action){
	if(action){
		if(action.when=="click"){
			action.element.tabIndex = -1;
		}
	}
	return{
		focus : function(){
			if(elem.className.indexOf("zohodesk-Tooltip-active")==-1){
				elem.className +=" zohodesk-Tooltip-active";
			}
		},
		unfocus : function(){
			if(elem.className.indexOf("zohodesk-Tooltip-active")!=-1){
				elem.className =elem.className.split(" zohodesk-Tooltip-active").join("");
			}
		}
	}
}

function triggerSizeCallback(type,switchElem){
	return function(event){
		switchElem.innerHTML=type;
	}
}

function triggerActionCallback(type,switchElem){
	return function(event){
		switchElem.innerHTML=type;
		Trigger_option = type=="On Hover" ? "HOVER" : "CLICK"
	}
}


function zdttFormElementCreater(type) {
    if (zdtt_nowStatus == "new") {
        var obj = zd_tt_addTooltipObj;
    }
    // else if (zdtt_nowStatus == "update") {
    //     var obj = ConfigureObjectForEdit;
    // }


    var triggerNameInp = domElement.create({
        elemName: "input",
        attributes: {
            class: "zohodesk-Tooltip-text-box zohodesk-Tooltip-input",
            id: "zd_tt_triggerName",
            placeholder: "eg,.Header info icon",
            type: "text"
        },
        elementData: {
            value: obj.components["0"].content
        }
    });
    var triggerNameBox = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-field"
        },
        elementData: {
            child: [triggerNameInp]
        }
    });
    var triggerNameAction = parentHighlighter(triggerNameBox);
    triggerNameInp.onfocus = triggerNameAction.focus;
    triggerNameInp.onblur = triggerNameAction.unfocus;
    var tnbe = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zd_tt_tnError");
    tnbe.parentElement.insertBefore(triggerNameBox, tnbe);



    zdttContainers.searchRes = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-Selectbox-dropdown zohodesk-Tooltip-Selectbox-dropdown-search",
            id: "searchDisplay"
        },
        elementData: {
            innerHTML: `<div class="zohodesk-Tooltip-dropdown-header">
            <span class="zohodesk-Tooltip-search-icon">
               <span class="zohodesk-Tooltip-editor-icontoprightsearch">
                  <svg class="zohodesk-tooltip-svg-icon-small">
                     <use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#Tooltip-search"></use>
                  </svg>
               </span>
            </span>
            <span class="zohodesk-Tooltip-search-result">Did you mean <span id="zd_tt_searchName"></span>?</span>
         </div>
         <div class="zohodesk-Tooltip-dropdown-content" id="zohodesk_Tooltip_dropdown_articles_parent_id1"></div>`
        }
    });
    zdttContainers.searchInp = domElement.create({
        elemName: "input",
        attributes: {
            class: "zohodesk-Tooltip-text-box zohodesk-Tooltip-input",
            id: "searchArticleBox",
            placeholder: "Search...",
            type: "text"
        },
        callbackList:[{input:zdttArticleSearch(zdttContainers.searchRes)}]
    });
    var searchBox = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-field",
            id: "zdtt_aserchParent"
        },
        elementData: {
            innerHTML: `<div class="zohodesk-Tooltip-form-field-icons">
		         <span class="zohodesk-Tooltip-editor-iconarticle">
		            <svg class="zohodesk-tooltip-svg-icon">
		               <use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#Tooltip-article"></use>
		            </svg>
		         </span>
		      </div>`,
            child: [zdttContainers.searchInp, zdttContainers.searchRes]
        }
    });
    var searchAction = parentHighlighter(searchBox);
    zdttContainers.searchInp.onfocus = searchAction.focus;
    zdttContainers.searchInp.onblur = searchAction.unfocus;
    var searchBeforeElem = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zd_tt_artInpError");
    searchBeforeElem.parentElement.insertBefore(searchBox, searchBeforeElem);


    var triggerSizePopup = domElement.create({
    	elemName : "div",
    	attributes : {
    		class: "zohodesk-Tooltip-Selectbox-dropdown",
    		id : "zohodesk_tooltip_size_dropDown_id"
    	},
    	elementData:{
    		innerHTML:`<div class="zohodesk-Tooltip-dropdown-content"><ul class="zohodesk-Tooltip-list"></ul></div>`
    	}
    });
    var triggerSizeSwitch = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-selectbox",
            id:"zohodesk_tooltip_size_shown_id"
        },
        elementData: {
            innerHTML:obj.preferences.viewSize=="LARGE" ? "Large" : obj.preferences.viewSize=="MEDIUM" ? "Medium" : "Small"
        }
    });
    
    var opts = [{id:"zohodesk-Tooltip-small",name:"Small"},{id:"zohodesk-Tooltip-medium",name:"Medium"},{id:"zohodesk-Tooltip-large",name:"Large"}]
    for (opt of opts) {
        var li = domElement.create({
            elemName: "li",
            attributes: {
                class: "zohodesk-Tooltip-dropdown-options",
                id: opt.id
            },
            elementData: {
                innerHTML: opt.name
            },
            callbackList:[{click:triggerSizeCallback(opt.name,triggerSizeSwitch)}]
        });
        triggerSizePopup.querySelector(".zohodesk-Tooltip-list").appendChild(li);
    }
    var triggerSizeBox = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-field"
        },
        elementData: {
            child: [triggerSizeSwitch, triggerSizePopup]
        },
        parent: zdttContainers.zdtt_sidepanelSwitchingComp.querySelectorAll(".zohodesk-Tooltip-panel-form-field-label")[0].parentElement
    });

    var sizeAction = parentHighlighter(triggerSizeBox,{when:"click",element:triggerSizeSwitch});
    triggerSizeSwitch.onfocus = sizeAction.focus;
    triggerSizeSwitch.onblur = sizeAction.unfocus;

    var popupCallback = zdtt_popupShow(triggerSizePopup);
    triggerSizeSwitch.onmouseup = popupCallback;

    /* trigger action popup */ 

    var triggerActionPopup = domElement.create({
    	elemName : "div",
    	attributes : {
    		class: "zohodesk-Tooltip-Selectbox-dropdown",
    		id : "zohodesk_tooltip_size_dropDown_id"
    	},
    	elementData:{
    		innerHTML:`<div class="zohodesk-Tooltip-dropdown-content"><ul class="zohodesk-Tooltip-list"></ul></div>`
    	}
    });
    var triggerActionSwitch = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-selectbox",
            id:"zohodesk_tooltip_trigger"
        },
        elementData: {
            innerHTML:Trigger_option=="CLICK" ? "On Click" : "On Hover"
        }
    });
    
    var opts = [{id:"zohodesk_tooltip_trigger_options_onClick",name:"On Click"},{id:"zohodesk_tooltip_trigger_options_onHover",name:"On Hover"}]
    for (opt of opts) {
        var li = domElement.create({
            elemName: "li",
            attributes: {
                class: "zohodesk-Tooltip-dropdown-options",
                id: opt.id
            },
            elementData: {
                innerHTML: opt.name
            },
            callbackList:[{click:triggerActionCallback(opt.name,triggerActionSwitch)}]
        });
        triggerActionPopup.querySelector(".zohodesk-Tooltip-list").appendChild(li);
    }
    var triggerSizeBox = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-field"
        },
        elementData: {
            child: [triggerActionSwitch, triggerActionPopup]
        },
        parent: zdttContainers.zdtt_sidepanelSwitchingComp.querySelectorAll(".zohodesk-Tooltip-panel-form-field-label")[1].parentElement
    });

    var sizeAction = parentHighlighter(triggerSizeBox,{when:"click",element:triggerActionSwitch});
    triggerActionSwitch.onfocus = sizeAction.focus;
    triggerActionSwitch.onblur = sizeAction.unfocus;

    var popupCallback = zdtt_popupShow(triggerActionPopup);
    triggerActionSwitch.onmouseup = popupCallback;

    zdttContainers.editorParent = domElement.create({
    	elemName : "div",
    	attributes:{
    		id : "editerToolsContainer"
    	}
    });
    zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".zohodesk-Tooltip-editor-content").prepend(zdttContainers.editorParent)

    var manualBCInp = domElement.create({
        elemName: "input",
        attributes: {
            id: "ChromeAddonManualBackgroundColorInput",
            placeholder:"eg.,#000000",
			class:"zohodesk-Tooltip-color-value"            
        },
        callbackList:[{input:manualBackgroundColorSetter}],
        parent: zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".zohodesk-Tooltip-color-name")
    });
    zdttInstantBGColorsCreater(zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zd_tt_toggleTapsParent"));

}






function zd_tt_addNewTrigger(type) {
	if(type=="new"){
        window.postMessage({
            name: "EditorInitiater",
            value: "" 
        }, "*")
	}
    // var func = objectCreaters(type);
    var html = `<div class="zohodesk-Tooltip-panel-content zohodesk-Tooltip-panel-contentplur">
    <div class="zohodesk-Tooltip-plurdiv" ></div>
   <div class="zohodesk-Tooltip-panel-headline-text">Trigger Name <span style="color: #ff6f64;"> *</span> </div>
   <span class="zd_tt_errorbox" id="zd_tt_tnError"></span>
   <div class="zohodesk-Tooltip-container" id="zd_tt_elementAlertBox">
        <div class="zohodesk-Tooltip-descriptionBox">
            <div class="zohodesk-Tooltip-descriptionBox-text">Please select a trigger point from the current page to configure new tooltip.(<b>Note : </b> some text)</div>
        </div>
    </div>
    <div class="zohodesk-Tooltip-container" id="zdtt_plurPositionElem">
        <span class="zohodesk-Tooltip-button zohodesk-Tooltip-button-primary" id="zd_tt_changePointer" ><span id="zd_tt_changePointer_nameValue">Change pointer</span><span class="zdtt_numberCountSpan zohodesk-Tooltip-hide" id="zdTT_triggerPointCount"></span></span>
        <input type="button" name="" value="Cancel" class="zohodesk-Tooltip-button zohodesk-Tooltip-button-secondary zohodesk-Tooltip-hide" style="margin-left:10px;" id="zdTT_changeTriggerCancel">
        <span class="zdtt-done zohodesk-Tooltip-hide" id="zdtt_triggerSelectedMsg">
            <span class="zohodesk-Tooltip-circlesvg">
                <span class="zohodesk-Tooltip-tick"></span>
                <svg class="zohodesk-Tooltip-part">  
                    <g class="zohodesk-Tooltip-g"> 
                        <circle class="zohodesk-Tooltip-circle"></circle>
                    </g> 
                </svg>
            </span>
            <span class="zohodesk-Tooltip-selected">Added Successfully .</span>
        </span>
        <div class="zohodesk-Tooltip-descriptionBox zohodesk-Tooltip-cl-both zohodesk-Tooltip-hide">
          <div class="zohodesk-Tooltip-fl-lft">
              <span class="zohodesk-Tooltip-tickicon">
                  <svg class="icon">
                    <use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#tick"></use>
                  </svg>
              </span>
              <span class="zohodesk-Tooltip-successtxt">New Trigger Pointer selected</span>
          </div>
          <div class="zohodesk-Tooltip-fl-lft">   
            <input type="button" name="" value="Done" class="zohodesk-Tooltip-button zohodesk-Tooltip-button-active" id="zdTT_changeTriggerDone">
            <input type="button" name="" value="Cancel" class="zohodesk-Tooltip-button zohodesk-Tooltip-button-secondary" style="margin-left:10px;" id="zdTT_changeTriggerCancel">
          </div>
        </div>
   </div>
   <div class="zohodesk-Tooltip-panel-headline-text">Choose Article <span style="color: #ff6f64;"> *</span> </div>
   
   <span class="zd_tt_errorbox" id="zd_tt_artInpError"></span>
   <div class="zohodesk-Tooltip-multi-form-field">
      <div class="zohodesk-Tooltip-fields">
         <div class="zohodesk-Tooltip-panel-form-field-label">Tooltip Size</div>
      </div>
      <div class="zohodesk-Tooltip-fields">
         <div class="zohodesk-Tooltip-panel-form-field-label">Activate Trigger</div>
      </div>
   </div>
   <div class="zohodesk-Tooltip-panel-headline-text">Add Snippet <div class="zohodesk-Tooltip-charactertxt" id="zdttSizeCharInform">Max 150 characters</div></div>
   <div class="zohodesk-Tooltip-editor-content">
      <div class="zohodesk-Tooltip-color-picker zohodesk-Tooltip-cl-both">
         <div class="zohodesk-Tooltip-lft-bar zohodesk-Tooltip-fl-lft">
            <ul class="zohodesk-Tooltip-cl-both zohodesk-Tooltip-list" id="zd_tt_toggleTapsParent">
               
            </ul>
         </div>
         <div class="zohodesk-Tooltip-rt-bar zohodesk-Tooltip-fl-rt">
            <div class="zohodesk-Tooltip-user-input">
               <span class="zohodesk-Tooltip-color-name"></span>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="zohodesk-Tooltip-panel-footer">
   <div class="zohodesk-Tooltip-footer-button zohodesk-Tooltip-footer-button-save" id="TooltipSave">save</div>
   <div class="zohodesk-Tooltip-footer-button zohodesk-Tooltip-footer-button-delete" id="TooltipCancel">cancel</div>
</div>
`;
    var parent = zdttContainers.zdtt_sidepanelSwitchingComp;
    parent.innerHTML = html;
    zdttFormElementCreater("new");
    window.postMessage({name:"createEditor"},"*");
    // zohoDesk_callEditerIntegration();
    // var triggerNameInput = document.getElementById("zd_tt_triggerName");
    // var articleSearchInput = document.getElementById("searchArticleBox");
    // var saveButtonElem = document.getElementById("TooltipSave");
    // document.getElementById("zohodesk_tooltip_size_shown_id").onmouseup = function(e) {
    //     show("zohodesk_tooltip_size_dropDown_id");
    // }
    // document.getElementById("zohodesk-Tooltip-small").onmouseup = zd_tt_triggerSOS;
    // document.getElementById("zohodesk-Tooltip-medium").onmouseup = zd_tt_triggerSOS;
    // document.getElementById("zohodesk-Tooltip-large").onmouseup = zd_tt_triggerSOS;

    // document.getElementById("zohodesk_tooltip_trigger").onmouseup = function(e) {
    //     show("zohodesk_tooltip_trigger_options");
    // }
    // document.getElementById("zohodesk_tooltip_trigger_options_onClick").onmouseup = zd_tt_showTMEO;
    // document.getElementById("zohodesk_tooltip_trigger_options_onHover").onmouseup = zd_tt_showTMEO;
    // document.getElementById("TooltipCancel").onmouseup = function(e) {
    //     zd_tt_triggerListInitiater(listOfTriggersObj);
    //     if (zdtt_elementSelectorObj != undefined) {
    //         zdtt_elementSelectorObj.detachClickListener();
    //         zdtt_elementSelectorObj = undefined;
    //     };
    //     if (lastObjectOfUpdatedTriggerFUB != undefined) {
    //         zdttElementEventRemover(lastObjectOfUpdatedTriggerFUB);
    //         Chrome_Extension_RequireFunctionFlow([lastObjectOfUpdatedTriggerFUB]);
    //     }
    //     var taps = document.getElementsByClassName("zohodesk-Tooltip-selectedOpts");
    //     if (taps.length != 0) {
    //         var len = taps.length;
    //         for (var i = 0; i < len; i++) {
    //             taps[0].className = taps[0].className.split("zohodesk-Tooltip-selectedOpts").join("");
    //         }
    //     }
    //     if (document.getElementById("header-comenContainer") != undefined) {
    //         if (document.getElementById("updateTriggerNameTap").className.indexOf(" zohodesk-Tooltip-hide") == -1) {
    //             document.getElementById("updateTriggerNameTap").className += "zohodesk-Tooltip-hide";
    //         }
    //         document.getElementById("triggerListViewTap").className += " zohodesk-Tooltip-selectedOpts";
    //     }
    //     zd_tt_removeMouseOverElements();
    //     objInitializer();
    //     zdtt_nowStatus = "new";
    // };
    // articleSearchInput.oninput = function(e) {
    //     if (document.getElementById("searchArticleBox").value == "") {
    //         hide("searchDisplay");
    //     } else {
    //         document.getElementById("zd_tt_searchName").innerHTML = e.target.value;
    //         getArticleName(e.target.value);
    //     }
    // }
    // zdtt_elementSelectorObj = new zd_tt_elementSelector({
    //     "elementsArrayCreater": func.elementsArrayCreater
    // });
    // triggerNameInput.onfocus = inputParentFocus;
    // articleSearchInput.onfocus = inputParentFocus;
    // triggerNameInput.onblur = inputParentBlur;
    // articleSearchInput.onblur = inputParentBlur;
    // triggerNameInput.oninput = func.triggerObjUpdater;
    // saveButtonElem.addEventListener("click", zdtt_saveTrigger, true);
    // setTimeout(function() {
    //     if (zd_tt_arrayOfElements.length >= 5) {
    //         triggerNameInput.focus();
    //     } else {
    //         document.getElementById("zd_tt_changePointer").click();
    //     }
    // }, 400);
    // if (type == "new") {
    //     document.getElementById("zd_tt_changePointer_nameValue").innerText = "Add trigger point";
    // }
    // document.getElementById("zd_tt_changePointer").addEventListener("click", zd_tt_addTrggerPoint, true);
    // document.getElementById("zdTT_changeTriggerDone").onclick = function(e) {
    //     zdtt_elementSelectorObj.detachClickListener();
    //     e.target.parentElement.parentElement.previousElementSibling.className = e.target.parentElement.parentElement.previousElementSibling.className.split(" zohodesk-Tooltip-hide").join("");
    //     e.target.parentElement.parentElement.className += " zohodesk-Tooltip-hide";
    //     var elems = document.getElementsByClassName("zohodesk-Tooltip-currentShad");
    //     var child = undefined;
    //     if (elems.length != 0) {
    //         for (var i = 0; i < elems.length; i++) {
    //             elems[i].className = elems[i].className.split(" zohodesk-Tooltip-currentShad").join('');
    //         }
    //         prvsElems = undefined;
    //     }
    //     ArrayUndoElementList = [];
    //     blurPosition();
    // };
    // document.getElementById('zdTT_changeTriggerCancel').onclick = function(e) {
    //     zdtt_elementSelectorObj.detachClickListener();
    //     let countSpan = document.getElementById("zdTT_triggerPointCount");
    //     if (ArrayUndoElementList.length != 0) {
    //         zd_tt_arrayOfElements = zd_tt_arrayOfElements.filter(function(element) {
    //             return element != ArrayUndoElementList[0];
    //         });
    //         if (zd_tt_arrayOfElements.length == 0) {
    //             if (countSpan.className.indexOf("zohodesk-Tooltip-hide") == -1) {
    //                 countSpan.className += "  zohodesk-Tooltip-hide"
    //             }
    //         } else {
    //             if (countSpan.className.indexOf("zohodesk-Tooltip-hide") != -1) {
    //                 countSpan.className = countSpan.className.split("  zohodesk-Tooltip-hide").join("");
    //             }
    //             countSpan.innerText = zd_tt_arrayOfElements.length;
    //         }
    //     }
    //     var addBtn = document.getElementById("zd_tt_changePointer");
    //     if (addBtn.className.indexOf("zohodesk-Tooltip-panel-form-field-notallowed") != -1) {
    //         addBtn.className = addBtn.className.split(" zohodesk-Tooltip-panel-form-field-notallowed").join("");
    //     }
    //     addBtn.addEventListener("click", zd_tt_addTrggerPoint, true);
    //     e.currentTarget.className += " zohodesk-Tooltip-hide";
    //     var elems = document.getElementsByClassName("zohodesk-Tooltip-currentShad");
    //     if (elems.length != 0) {
    //         for (var i = 0; i < elems.length; i++) {
    //             elems[i].className = elems[i].className.split(" zohodesk-Tooltip-currentShad").join('');
    //         }
    //     }
    //     blurPosition();
    // };
    // if (type == "new") {
    //     setTimeout(function() {
    //         document.getElementById('editerToolsContainer').querySelector(".KB_Editor_iframe").contentDocument.body.innerHTML = "<div><br></div>";
    //     }, 1000);
    // }
};








































function zdttCommonHeaderCreater(){
	var headerChild = `<div class="zohodesk-Tooltip-cl-both">
         <div class="zohodesk-Tooltip-fl-lft">
            <span class="zohodesk-Tooltip-panel-header-text zohodesk-Tooltip-clrWhite">Asap</span>
            
         </div>
         <div id="zdttHeaderCom" class="zohodesk-Tooltip-fl-rt">
            
            <div class="zohodesk-Tooltip-inline-icons"></div>
         </div>
      </div>`;
    var tempElem = domElement.create({
	    elemName: "div",
	    elementData:{
	    	innerHTML : headerChild
	    }
	});
    var closeIconParent = tempElem.querySelector(".zohodesk-Tooltip-inline-icons");
    var closeIcon = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-editor-iconclose panel-close",
            id: "closeEditor"
        },
        elementData: {
            innerHTML: `<svg class="zohodesk-tooltip-svg-icon-medium"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Tooltip-close"></use></svg>`
        },
        parent : closeIconParent
    });

	var headerCom = tempElem.querySelector("#zdttHeaderCom");
    var userIcon = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-inline-icons",
            id: "userInfoIcon"
        },
        elementData: {
            innerHTML: `<div class="zohodesk-Tooltip-usricon"><img></div><div class="zohodesk-Tooltip-usrinfopopup zohodesk-Tooltip-Selectbox-dropdown" id="zohoDeskUserDetailsInfoPopup"><div class="zohodesk-Tooltip-usrinfoHead"><div class="zohodesk-Tooltip-usricon"><img></div><div class="zohodesk-Tooltip-usrinfoCont"></div></div><div class="zohodesk-Tooltip-usrinfoFoot"></div></div>`
        }
    });
    var popupCallback = zdtt_popupShow(userIcon.querySelector("#zohoDeskUserDetailsInfoPopup"));
    userIcon.onclick = popupCallback;
	headerCom.prepend(userIcon);
	var userImgParents=tempElem.querySelectorAll(".zohodesk-Tooltip-usricon");
	for(userImg of userImgParents){
		var imgTag = userImg.getElementsByTagName("img");
		if(imgTag.length){
			imgTag[0].src= zdTT_user.img;
		}
	}
	var userDetailsPopupParent = tempElem.querySelector(".zohodesk-Tooltip-usrinfoCont");
	var logoutParent = tempElem.querySelector(".zohodesk-Tooltip-usrinfoFoot");
    
	var toggleElem = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-inline-icons zohodesk-Tooltip-selected-inline-icons",
            id: "sidePanel_float"
        },
        elementData: {
            innerHTML: `<span class="zohodesk-Tooltip-editor-iconalignleft"><svg class="zohodesk-tooltip-svg-icon-medium"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Tooltip-alignright"></use></svg></span>`
        }
    });
    headerCom.prepend(toggleElem);
	domElement.create(
		{elemName: "div",attributes:{class:"zohodesk-Tooltip-usrName",title:zdTT_user.name},
	    elementData:{innerHTML : zdTT_user.name},
	    parent : userDetailsPopupParent
	});
	domElement.create(
		{elemName: "div",attributes:{class:"zohodesk-Tooltip-usrId",title:zdTT_user.mId},
	    elementData:{innerHTML : zdTT_user.mId},
	    parent : userDetailsPopupParent
	});







	domElement.create(
		{elemName: "input",attributes:{id:"ZDTT_logOutBtn",type:"button"},
	    elementData:{value : "Logout"},
	    callbackList:[{click:zdTT_logOut}],
	    parent : logoutParent
	});

    return tempElem.querySelector(".zohodesk-Tooltip-cl-both")
}

function zdttHighlighterRemover(obj) {
	for(trigger of obj.triggers){
		var elem = document.querySelector(trigger.element);
		if(elem){
			elem.className = elem.className.replace(" zohodesk-Tooltip-Configureborder", "");
			var nameBoard = elem.querySelector('.zohodesk-Tooltip-ConfigureCnt'); 
			if (nameBoard) {
                elem.removeChild(nameBoard);
            }
		}
	}
}


function emptyListPageCreater(){
    if (listOfTriggersObj.length == 0) {

    	var emptyPage = domElement.create({
	        elemName: "div",
	        attributes: {
	            class: "loading-area empty-trigger-content"
	        },
	        elementData: {
	            innerHTML: `<svg class="emptytrigger"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#emptytrigger"></use></svg><div class="empty-message">No Triggers Has Been Added Yet</div><div class="zohodesk-Tooltip-txtcntr" id="zd_tt_empty_buttonParent"></div>`
	        }
	    });
	    if(lastLoadingElem){
	    	lastLoadingElem.remove();
	    }
	    if(!TriggerListAllObjMaintanense.length){
	    	if(zdttContainers.headerTabsParent){
	    		zdttContainers.headerTabsParent.parentElement.removeChild(zdttContainers.headerTabsParent);
	    		delete zdttContainers.headerTabsParent;
	    		zdttContainers.zdtt_sidepanelSwitchingComp.className += " zohodesk-Tooltip-height";
	    		zdttContainers.zdtt_sidepanelSwitchingComp.innerHTML = "";
	    		zdttContainers.zdtt_sidepanelSwitchingComp.appendChild(emptyPage);
	    	}
	    }
        else {
            zdttContainers.ListParent.innerHTML = "";
            zdttContainers.ListParent.appendChild(emptyPage);
        }
        var addNewBtn = domElement.create({       // add callback on click to button;
	        elemName: "button",
	        attributes: {
	            class: "zohodesk-Tooltip-form-button"
	        },
	        elementData: {
	            innerHTML: `+ Add New`
	        },
	        parent:emptyPage.querySelector("#zd_tt_empty_buttonParent")
	    });

        // addNewBtn.addEventListener("click", function(e) {
        //     zd_tt_addNewTrigger("new");
        //     zdtt_nowStatus = "new"
        // });

    }
}



function zd_tt_triggerListFilter(inp){
	return function(e){
		e.preventDefault();
		e.stopPropagation();
		if(inp=="ALL"){
			if(zd_tt_triggerListing != "ALL"){
				unHighlightTheOld()
				if(zdttContainers.ListParent){
					zdttContainers.ListParent.parentElement.removeChild(zdttContainers.ListParent);
					delete zdttContainers.ListParent;
				}
				lastLoadingElem = zdttLoading(zdttContainers.zdtt_sidepanelSwitchingComp);
        		lastLoadingElem.inject();
        		listOfTriggersObj = TriggerListAllObjMaintanense.slice();
        		zd_tt_triggerListInitiater(listOfTriggersObj,lastLoadingElem);
        		zd_tt_triggerListing = "ALL";
        		zdttContainers.filterSwitch.innerHTML = "All";
        		// Chrome_Extension_RequireFunctionFlow(listOfTriggersObj);
        		// zd_tt_removeMouseOverElements();
			}
		}
		else if(inp=="CREATED_BY_ME"){
			if (zd_tt_triggerListing != "CREATED_BY_ME") {
				unHighlightTheOld()
	            if(zdttContainers.ListParent){
					zdttContainers.ListParent.parentElement.removeChild(zdttContainers.ListParent);
					delete zdttContainers.ListParent;
				}
	            lastLoadingElem = zdttLoading(zdttContainers.zdtt_sidepanelSwitchingComp);
        		lastLoadingElem.inject();
	            if (zdTT_user.proId) {
	                let filteredArray = [];
	                for(triggerObj of TriggerListAllObjMaintanense){
	                	if(zdTT_user.proId == triggerObj.modifiedBy.id){
	                		filteredArray.push(triggerObj);
	                	}
	                }
	                listOfTriggersObj = filteredArray;
	                zd_tt_triggerListInitiater(listOfTriggersObj,lastLoadingElem);
	                zd_tt_triggerListing = "CREATED_BY_ME";
	                zdttContainers.filterSwitch.innerHTML = "Created By Me";
	                // Chrome_Extension_RequireFunctionFlow(listOfTriggersObj);
	            }
	            // zd_tt_removeMouseOverElements();
	        }
		}
	}
}


function deleteCallBackCreater(elem, cls) {
    return function(res) {
        if (res.responseStatus === 200) {
        	unHighlightTheOld();
            if (elem.parentElement != null) {
                if (elem.className.indexOf("zohodesk-Tooltip-animatt") != -1) {
                    elem.parentElement.removeChild(elem);
                } else {
                    setTimeout(function() {
                        elem.parentElement.removeChild(elem);
                    }, 300);
                }
            }
            var ind = 0
            for (trigger of listOfTriggersObj) {
                if (elem.id == trigger.id) {
                    // zdttElementEventRemover(trigger)
                    zdttHighlighterRemover(trigger);
                    // zd_tt_ConfSelectedTrigger = undefined;
                    listOfTriggersObj.splice(ind, 1);
                    if (TriggerListAllObjMaintanense.length != 0) {
                        var Ind = 0;
                        for (Triger of TriggerListAllObjMaintanense) {
                            if (Triger.id == elem.id) {
                                TriggerListAllObjMaintanense.splice(Ind, 1);
                            }
                            Ind++
                        }
                    }
                    emptyListPageCreater();
                }
                ind++
            }
        } else {
            if (res.obj.message == "You Have No Permission to Perform this Action") {
                createToolTipErrorPopupBox({
                    id: "editorBody",
                    buttons: [{
                        id: "zd_tt_permissionErrors",
                        content: "ok",
                        callbackList: {
                            mousedown: closeEPwithcloseExtension
                        }
                    }],
                    content: "<b>You have no permission to configure this portal.</b> Please contact your PORTAL admin."
                });
            } else {
                elem.className = elem.className.split(cls).join("");
                elem.className = elem.className.split(" zohodesk-Tooltip-heightAnim").join("");
            }
        }
    }
}

function ZDTT_topHeaderTapsCreater() {
    if (zdttContainers.headerTabsParent == undefined) {
    	zdttTabs.list = domElement.create({
	        elemName: "li",
	        attributes: {
	            class: "zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-fl-lft zohodesk-Tooltip-selectOpts zohodesk-Tooltip-selectedOpts",
	            id: "triggerListViewTap"
	        },
	        elementData: {
	            innerHTML: "Triggers"
	        }
	    });
	    zdttTabs.update = domElement.create({
	        elemName: "li",
	        attributes: {
	            class: "zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-fl-lft zohodesk-Tooltip-selectOpts zohodesk-Tooltip-hide",
	            id: "updateTriggerNameTap"
	        },
	        elementData: {
	            innerHTML: ""
	        }
	    });

	    zdttTabs.addNew = domElement.create({
	        elemName: "li",
	        attributes: {
	            class: "zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-greenclr zohodesk-Tooltip-fl-rt zohodesk-Tooltip-selectOpts",
	            id: "addNewTriggerTap"
	        },
	        elementData: {
	            innerHTML: "+ Add New"
	        },
	        callbackList:[{click:function(){zd_tt_addNewTrigger("new")}}]
	    });
    	var ul = domElement.create({
	        elemName: "ul",
	        attributes: {
	            class: "zohodesk-Tooltip-cl-both zohodesk-Tooltip-list",
	            id: "zdtt-taps-parent"
	        },
	        elementData: {
	            child: [zdttTabs.list,zdttTabs.update,zdttTabs.addNew]
	        }
	    });

    	zdttContainers.headerTabsParent = domElement.create({
	        elemName: "div",
	        attributes: {
	            class: "zohodesk-Tooltip-selectOptsContent",
	            id: "header-comenContainer"
	        },
	        elementData: {
	            child: [ul]
	        }
	    });
	    zdttContainers.zdtt_sidepanelHeader.appendChild(zdttContainers.headerTabsParent);
        // var header = document.getElementById('zdtt_headerContainer');
        // var html = `<ul class="zohodesk-Tooltip-cl-both zohodesk-Tooltip-list" id="zdtt-taps-parent">
        //       <li class="zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-fl-lft zohodesk-Tooltip-selectOpts zohodesk-Tooltip-selectedOpts" id="triggerListViewTap">
        //         Triggers
        //       </li>
        //       <li class="zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-fl-lft zohodesk-Tooltip-selectOpts zohodesk-Tooltip-hide" id="updateTriggerNameTap">
        //       </li>
        //       <li class="zohodesk-Tooltip-toggleTap-li zohodesk-Tooltip-greenclr zohodesk-Tooltip-fl-rt zohodesk-Tooltip-selectOpts" id="addNewTriggerTap">
        //         + Add New
        //       </li>
        //     </ul>`;
        // var div = document.createElement('div');
        // div.className = "zohodesk-Tooltip-selectOptsContent";
        // div.id = "header-comenContainer";
        // div.innerHTML = html;
        // header.appendChild(div);


        // zd_tt_toggleHighlighter();
    }
}

function zdttInstantBGColorsCreater(elem){
    for (var i = 1; i < 10; i++) {
        
    	var span = domElement.create({
            elemName: "span",
            attributes: {
                class: "zohodesk-Tooltip-color",
                id:"zohodesk-Tooltip-color-"+i
            },
            callbackList:[{click:separateColorHighliter}]
        })

        var li = domElement.create({
            elemName: "li",
            attributes: {
                class: "zohodesk-Tooltip-clr-box"
            },
            elementData:{
            	child : [span]
            },
            parent:elem
        })

    }

}



zdttContainers.zdtt_sidepanelSwitchingComp = domElement.create({
    elemName: "div",
    attributes: {
        id: "ZDTT_switching_comonElem",
        class:"zohodesk-Tooltip-pstnrltv zohodesk-Tooltip-height"
    }
})
var zdtt_CommonHeader = zdttCommonHeaderCreater();
zdttContainers.zdtt_sidepanelHeader = domElement.create({
    elemName: "div",
    attributes: {
        id: "zdtt_headerContainer",
        class:"zohodesk-Tooltip-panel-header"
    },
    elementData:{
    	child : [zdtt_CommonHeader]
    }
})
zdttContainers.zdtt_sidePanelDirectChild = domElement.create({
    elemName: "div",
    attributes: {
        id: "editorBody",
        class:"zohodesk-Tooltip-panel"
    },
	elementData: {
        child: [zdtt_Temp.sidePanelSVG.content.cloneNode(true),zdttContainers.zdtt_sidepanelHeader,zdttContainers.zdtt_sidepanelSwitchingComp]
    }
})

zdttContainers.zdtt_sidePanel = domElement.create({
    elemName: "div",
    attributes: {
        id: "ToolTipEditorPosition",
        class:"zohodesk-tooltip-displayinline zohodesk-Tooltip-panel-right"
    },
	elementData: {
        child: [zdttContainers.zdtt_sidePanelDirectChild]
    }
}) 



var zdtt_sidePanelHost = domElement.create({
    elemName: "div",
    attributes: {
        id: "zdtt_sidePanelHost"
    },
    parent: zdttTempParent
})
shadowRootCreater(zdtt_sidePanelHost, zdtt_Temp.sidePanel, [zdttContainers.zdtt_sidePanel])
window.postMessage({
    name: "Zohodesk_Chrome_Extension_AsapDetails"
}, "*");

console.log("side panel body");

var maxZIndexValue = findHighestZIndex('div');
var editerBodyZI = zdtt_pageMaxZIndexValue + 5;
var ASapBodyZI = zdtt_pageMaxZIndexValue + 8;
zdttContainers.zdtt_sidePanel.style.zIndex = editerBodyZI;
var asapCondainerSItimer = setInterval(function() {
    if (document.getElementById("zohohc-asap-viewers") != undefined) {
        document.getElementById("zohohc-asap-viewers").style.zIndex = ASapBodyZI;
        clearInterval(asapCondainerSItimer);
    }
}, 500);

var panelToggle = new zdttSidePanelAlignmentEvent(zdttContainers.zdtt_sidePanel,zdtt_CommonHeader.querySelector("#sidePanel_float"));