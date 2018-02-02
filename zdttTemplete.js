var zdttTempParent = document.getElementsByTagName('html')[0];



var zdtt_Temp = {
	errorBackgroundLayer : domElement.create({elemName: "template",attributes: {id: "zdtt_errorBLPtemp"},elementData: {innerHTML: zdttStyles.errorBackgroundLayer},parent: zdttTempParent}),
	errorPopup : domElement.create({elemName: "template",attributes: {id: "zdtt_errorPPtemp"},elementData: {innerHTML: zdttStyles.errorPopup},parent: zdttTempParent})
}