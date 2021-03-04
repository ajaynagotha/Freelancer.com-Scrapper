
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == 'started') {
    document.getElementsByTagName('body')[0].innerHTML += "<div id='loader' style='z-index:1000;position:absolute;left:0;top:0;height:100vh;width:100%;background:rgb(0,0,0,0.5);display:flex;flex-direction:column;justify-content:center'><h1 style='color:white;width:100%;text-align:center'>Loading...<br/>Please Wait</h1></div>";
    document.getElementById('result').style.display = 'none';
  }
  else if (request.message == 'completed') {
    document.getElementById('loader').remove();
    document.getElementById('result').style.display = 'block';
  }
  else if (request.message == "run script") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      if (url == "https://www.freelancer.com/search/projects/?ngsw-bypass=&w=f") {
        chrome.tabs.executeScript({
          file: 'inject.js'
        })
      }
    });
  }
  else if (request.message == "done") {
    sendResponse("ok")
  }
  else {
    let url = tabs[0].url;
    if (url == "https://www.freelancer.com/search/projects/?ngsw-bypass=&w=f") {
      chrome.tabs.create({
        url: chrome.extension.getURL('./index.html'),
        active: false
      }, function (tab) {
        // After the tab has been created, open a window to inject the tab
        chrome.windows.create({
          tabId: tab.id,
          type: 'popup',
          focused: true
        });
      });
    }
  }
  return true;
});