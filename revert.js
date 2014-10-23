var invertLevel = 0;

var css = 'html {-webkit-filter: invert(' + invertLevel.toString() + '%) !important; }' + 
          'img, video, multimedia {-webkit-filter: invert(' + invertLevel.toString() + '%) !important; }',

head = document.getElementsByTagName('head')[0],
style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
	style.styleSheet.cssText = css;
} else {
	style.appendChild(document.createTextNode(css));
}

//injecting the css to the head
head.appendChild(style);

// Is reversion always 0? 

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//       console.log("Inversion level received from options->background:" + request.invertNumber + " , will now assign.");
//       invertLevel = request.invertNumber;
// });