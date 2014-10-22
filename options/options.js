function save_options() {
  // get form data
  var invert_number = $('#invert-level-slider').attr('data-slider'); // slider
  var auto = document.getElementById('auto-checkbox').checked;
  console.log(auto);
  var begin = document.getElementById('begin').value;
  var end = document.getElementById('end').value;

  var save_obj = {
    invertNumber: invert_number,
    auto: auto,
    begin: begin,
    end: end
  };

  chrome.storage.sync.set(save_obj, function() {
    console.log(save_obj)
  });
}

function restore_options() {
  // use default value invert_number = 80 and auto = true with begin at 12 midnight and end at 6 am
  chrome.storage.sync.get({
    invertNumber: 80,
    auto: true,
    begin: "00:00",
    end: "06:00"
  }, function(item) {
    $('#invert-level-slider').attr('data-slider', item.invertNumber); // this is how you set stuff for attr
    document.getElementById('auto-checkbox').checked = item.auto;
    console.log(item.auto);
    document.getElementById('begin').value = item.begin;
    document.getElementById('end').value = item.end;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

// save options on window close
$(window).on("beforeunload", function() { 
  save_options();
});

// Foundation theme stuff
$(document).foundation();




