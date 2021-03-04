
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("runit").addEventListener('click',runScript);
});

function runScript() {
    chrome.runtime.sendMessage({message: "run script"}, function(response) {
      });
}