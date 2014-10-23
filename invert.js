var invertLevel = 80;
insertcss();

function insertcss() {
	var css = 'html {-webkit-filter: invert(' + invertLevel.toString() + '%) !important;}' + 
	          'img, video {-webkit-filter: invert(' + invertLevel.toString() + '%) !important; }', // the 100% invert inverts 100 back to 0

	head = document.getElementsByTagName('head')[0],
	style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	// injecting the css to the head
	head.appendChild(style);
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request);
  	console.log(sender);
      console.log("Inversion level received from options->background:" + request.invertNumber + " , will now assign.");
      invertLevel = request.invertNumber;
      console.log(invertLevel);
      insertcss();
});
