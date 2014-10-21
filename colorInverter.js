javascript: (
function () { 
var invertLevel = 100;
var invertLevelString = invertLevel.toString();

document.documentElement.classList.add("invert-colors-extension-marker");
var css = 'html {-webkit-filter: invert(' + invertLevelString + '%) !important; }' + 
          'img, video {-webkit-filter: invert(' + invertLevelString + '%) !important; }',

head = document.getElementsByTagName('head')[0],
style = document.createElement('style');

// a hack, so you can "invert back" clicking the bookmarklet again
if (!window.counter) { window.counter = 1;} else  { window.counter ++;
if (window.counter % 2 == 0) { var css ='html {-webkit-filter: invert(0%); -moz-filter:    invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }'}
 };

style.type = 'text/css';
if (style.styleSheet){
style.styleSheet.cssText = css;
} else {
style.appendChild(document.createTextNode(css));
}

//injecting the css to the head
head.appendChild(style);
}());