// checking ...
function sample(){
    console.log("33333")   
}
window.addEventListener("message", function(event) {
    if (event.data.name == "UrlCheck") {
        if (typeof(ZohoHCAsap) != "undefined") {
            function zAsapObjGetter() {
                var orgId = ZohoHCAsap._defaultoptions.myAppPortalId;
                var AsapId = ZohoHCAsap._defaultoptions.id;
                var AsapName = ZohoHCAsap._defaultoptions.name;
                var asapPortalIDforApi = ZohoHCAsap._defaultoptions._orgId;
                window.postMessage({
                    type: "toolTip_orgId",
                    orgId: orgId,
                    AsapId: AsapId,
                    AsapName: AsapName,
                    asapPortalID: asapPortalIDforApi
                }, "*")
            };
            zAsapObjGetter();
        } else {
            window.postMessage({
                type: "Asap_Not_Found"
            }, "*")
        }
    } else if (event.data.name == "Department") {
        if (ZohoHCAsap._defaultoptions.departmentId == "-1") {
            window.postMessage({
                name: "department",
                value: "All"
            }, "*");
        } else {
            ZohoHCAsap.API.Kb.Departments(null, function(response) {
                    window.postMessage({
                        name: "department",
                        value: response.data[0].name
                    }, "*");
                },
                function(errResponse) {
                    // "console.log(errResponse)"
                })
        }
    } else if (event.data.name == "Article") {
        ZohoHCAsap.API.Kb.Articles.Search({
                searchStr: event.data.article
            }, function(response) {
                window.postMessage({
                    name: "article",
                    value: response.data
                }, "*");
            },
            function(errResponse) {
                // "console.log(errResponse)"
            })
    } else if (event.data.name == "SingleArticle") {
        ZohoHCAsap.API.Kb.Articles({
                id: event.data.article
            }, function(response) {
                window.postMessage({
                    name: "SingleArticleObject",
                    value: response
                }, "*");
            },
            function(errResponse) {
                // "console.log(errResponse)"
            })
    } else if (event.data.name == "GoAsapArticle") {
        ZohoHCAsap.KB.Articles.Open({
            id: event.data.value
        });
    } else if (event.data.name == "closeAsapWebApp") {
        var zdttAsapViewer = document.getElementById("zohohc-asap-viewers");
        if (zdttAsapViewer != undefined) {
            document.getElementById("zohohc-asap-viewers").className += " tempAsapStyle-from-tooltipAddon";
        }
        ZohoHCAsap.Close();
    } else if (event.data.name == "unregisterTheAsapTooltip") {
        ZohoHCAsap.ContextualHelper.UnRegisterTips(ZohoHCAsap.ContextualHelper.tips(window.location.pathname))
    } else if (event.data.name == "registerTheAsapTooltip") {
        var zdAsapTool = document.getElementById("zohohc-asap-viewers");
        zdAsapTool.className = zdAsapTool.className.split(" tempAsapStyle-from-tooltipAddon").join("");
        ZohoHCAsap.ContextualHelper.RegisterTips(ZohoHCAsap.ContextualHelper.tips(window.location.pathname))
    }
}, false);
