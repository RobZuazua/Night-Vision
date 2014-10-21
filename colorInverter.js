function invertHex(hexnum){
  if(hexnum.length != 6) {
    alert("Hex color must be six hex numbers in length.");
    return false;
  }
  
  hexnum = hexnum.toUpperCase();
  var splitnum = hexnum.split("");
  var resultnum = "";
  var simplenum = "FEDCBA9876".split("");
  var complexnum = new Array();
  complexnum.A = "5";
  complexnum.B = "4";
  complexnum.C = "3";
  complexnum.D = "2";
  complexnum.E = "1";
  complexnum.F = "0";
  
  for(i=0; i<6; i++){
    if(!isNaN(splitnum[i])) {
      resultnum += simplenum[splitnum[i]]; 
    } else if(complexnum[splitnum[i]]){
      resultnum += complexnum[splitnum[i]]; 
    } else {
      alert("Hex colors must only include hex numbers 0-9, and A-F");
      return false;
    }
  }
  
  return resultnum;
}



//var head = document.querySelector.("head");
//for (var i =0, l = head.childnodes.length; i < l; i++){






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
















/*
var color = ($('#header > div.top_outer > div > a > span > span').css("color"));



var all = $("body *");
console.log("jere");
console.log(all);
for each (var elem in all) {

	console.log(all[i]);
	console.log(elem);
	console.log($('#header > div.top_outer > div > a > span > span'));
	var domElementColor = elem.css("color");
	domElementColor = rgb2hex(domElementColor);
	domElementColor.replace("#","");
	domElementColor = invertHex(domElementColor);
	elem.css("color") = domElementColor;
}


color = rgb2hex(color);
alert(color);

*/

//Function to convert hex format to a rgb color
function rgb2hex(rgb) {
var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }