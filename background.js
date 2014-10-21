var hour = (new Date()).getHours();
console.log(hour);

var enabled = false; // requires persistent: true in manifest.json to hold the value across tabs

chrome.tabs.onActivated.addListener(function(o) {
	console.log(o);

	if (enabled) {
		chrome.tabs.executeScript(o.tabId, { "file": "invert.js" }, function() {
            console.log("invert added");
        });
	}

	else {
		chrome.tabs.executeScript(o.tabId, { "file": "revert.js" }, function() {
            console.log("revert added");
        });
	}
});


chrome.tabs.onUpdated.addListener(function(id, o, tab) {
	console.log(tab);

	if (enabled) {
        chrome.tabs.executeScript(tab.id, { "file": "invert.js" }, function() {
            console.log("invert added");
        });
	}
}); 

chrome.browserAction.onClicked.addListener(function(tab) {
	enabled = !enabled;

	if (enabled) {
		console.log(tab);

		// Add the badge
		chrome.browserAction.setBadgeText({"text":"ON"});
		chrome.browserAction.setBadgeBackgroundColor({"color":"#FBD131"});

        chrome.tabs.executeScript(tab.id, { "file": "invert.js" }, function() {
            console.log("invert added");
        });
	} 

	else {
		// Remove
		chrome.browserAction.setBadgeText({"text":""});
		chrome.browserAction.setBadgeBackgroundColor({"color":""});

        chrome.tabs.executeScript(tab.id, { "file": "revert.js" }, function() {
            console.log("revert added");
        });
	}
});
