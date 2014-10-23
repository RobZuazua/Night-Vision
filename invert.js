// var script = document.createElement('script');
// script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

var invertLevel = 80;
var unique = "luminosity-extension-head-i";

function removeElementById(id){
    var element = document.getElementById(id);
    console.log("Removing:");
    console.log(element);
    if (element != null) {
		// element.parentNode.removeChild(element);
		element.outerHTML = "";
		delete element;
	}
}

function insertcss() {
	var css = 'html {-webkit-filter: invert(' + invertLevel.toString() + '%) !important;}' + 
	          'img, video, object {-webkit-filter: invert(' + invertLevel.toString() + '%) !important; }', // the 100% invert inverts 100 back to 0

	head = document.getElementsByTagName('head')[0],
	style = document.createElement('style');

	style.type = 'text/css';
	style.id = unique;

	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	// injecting the css to the head
    console.log("Adding:");
	console.log(style);
	head.appendChild(style);
}

function removecss(id) {
	removeElementById(id);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request);
  	console.log(sender);
    console.log("Inversion level received from options->background:" + request.invertNumber + " , will now assign.");
    
    invertLevel = request.invertNumber;
    removecss(unique);
    insertcss();
});
