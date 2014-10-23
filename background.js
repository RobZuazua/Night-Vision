var enabled = false; // requires persistent: true in manifest.json to hold the value across tabs
var enabledByAuto = false;
var disabledOutside = true;

var manuallyDisabledOnTabIds = [];

var settings = {};

settings.getBeginHour = function() { return parseInt(settings.begin.split(":")[0]); }
settings.getBeginMin  = function() { return parseInt(settings.begin.split(":")[1]); }
settings.getEndHour   = function() { return parseInt(settings.end.split(":")[0]); }
settings.getEndMin    = function() { return parseInt(settings.end.split(":")[1]); }

function currentTime() {
    var date = new Date();
    var current_time = {};
    current_time.hour = date.getHours();
    current_time.min = date.getMinutes();
    return current_time; 
}

// Reset
function clearSettings() { 
    chrome.storage.sync.clear(function(item){
        console.log("Clearing settings and logging the cleared item"); console.log(item);
    });
}

function retrieveSettings() {
    chrome.storage.sync.get(null, function(item){ // null gets the entire contents of storage
        console.log("logging the retrieved item from storage"); console.log(item);

        settings.auto = item.auto; // There, more efficient since we know the properties beforehand
        settings.invertNumber = item.invertNumber;
        settings.begin = item.begin;
        settings.end = item.end;
    });
}

function autoEnable(current_time) {
    console.log(current_time);
    console.log(settings.auto);
    if (settings.auto === true) {
        // debugger;
        if ((current_time.hour >= settings.getBeginHour() && current_time.hour <= settings.getEndHour()) ||  
            ((current_time.hour == settings.getBeginHour && current_time.hour == settings.getEndHour()) && (current_time.min >= settings.getBeginMin() && current_time.min <= settings.getEndMin()))) {
            console.log("2");
            if (!enabled) {
                enabled = true;
                enabledByAuto = true;
                setBadge({text:"on", color:"#4AA0AA"});
                // need to determine alarm to switch off
            } else {
                // blank
            }
        } else if (((settings.getEndHour() - settings.getBeginHour() < 0) || (settings.getEndHour() - settings.getBeginHour() == 0 && settings.getBeginMin() - settings.getEndMin() < 0)) && (current_time.hour >= settings.getBeginHour() && current_time.min >= settings.getBeginMin())) {
            if (!enabled) {
                enabled = true;
                enabledByAuto = true;
                setBadge({text:"on", color:"#4AA0AA"});
            } else {
                // blank
            }
        } else {
            if (enabledByAuto) {
                enabled = false;
                enabledByAuto = false;
                setBadge({text:"", color:""});
            } else {
                // blank
            }
        }
    } else {
        if (enabledByAuto) {
            enabled = false;
            enabledByAuto = false;
            setBadge({text:"", color:""});
        } else {
            // blank
        }
    }
}

function setBadge(properties) {
    chrome.browserAction.setBadgeText({"text": properties.text});
    chrome.browserAction.setBadgeBackgroundColor({"color": properties.color}); //#4AA0AA - blue
}

function injectScript(file_name, tab_id) {
    chrome.tabs.executeScript(tab_id, { "file": file_name }, function() {
        if (file_name === "invert.js") {
            chrome.tabs.getCurrent(function(tab) {
                console.log("get current tab on immediate options change stuff, to avoid reload");
                chrome.tabs.executeScript(tab.id, { "file": file_name }, function() {
                    // blank
                });
            });
        }
        console.log(file_name + " added to tab id:" + tab_id);
    });
}

chrome.tabs.onActivated.addListener(function(o) {
    if (enabled) { 
        if (manuallyDisabledOnTabIds.indexOf(o.tabId) === -1) { // if not found in manually disabled, then inject script on tab activation
            injectScript("invert.js", o.tabId); 
        } else {
            // blank
        }
    }
    else {
        injectScript("revert.js", o.tabId); 
    }
});


chrome.tabs.onUpdated.addListener(function(id, o, tab) {
    if (enabled) 
        { injectScript("invert.js", tab.id); } 
}); 

chrome.browserAction.onClicked.addListener(function(tab) {
    if (!enabledByAuto) {
        enabled = !enabled;

        if (enabled) {
            setBadge({text:"on", color:"#4AA0AA"});
            injectScript("invert.js", tab.id);
        } else {
            setBadge({text:"", color:""});        
            injectScript("revert.js", tab.id); // and disable 
        }

    } else { // enabled by automatic, so ManuallyDisabled comes into play
        var i = manuallyDisabledOnTabIds.indexOf(tab.id);
        
        if (i !== -1) { // the tab is already in the disabled tabs list, so the user wants to make the tab dark
            manuallyDisabledOnTabIds.splice(i, 1);
            injectScript("invert.js", tab.id);
            setBadge({text:"on", color:"#4AA0AA"});
        } else { // the tab is not in disabledTabs list, so
            manuallyDisabledOnTabIds.push(tab.id); // add it on
            injectScript("revert.js", tab.id); // and disable
            setBadge({text:"on", color:"#4AA0AA"}); // blue
        }
    }
});

chrome.storage.onChanged.addListener(function() {
    retrieveSettings();
    autoEnable(currentTime());
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request == true) { // either a slider or time or any change is handled the same
       console.log("g"); 
      retrieveSettings();
      messageContentScripts();
    }
});

function messageContentScripts() {
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            console.log(tabs[i].id);
            chrome.tabs.sendMessage(tabs[i].id, settings, function(response) {
                // nothing here
            });
        }
    });
}

retrieveSettings();
autoEnable(currentTime());

var clearer = setInterval(function() {
    retrieveSettings();
    autoEnable(currentTime());
}, 2000);
