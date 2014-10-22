var invertLevel = 0;
var invertLevelString = invertLevel.toString();

var css = 'html {-webkit-filter: invert(' + invertLevelString + '%) !important; }' + 
          'img, video {-webkit-filter: invert(' + invertLevelString + '%) !important; }',

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
