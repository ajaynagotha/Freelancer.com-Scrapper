const API_KEY = 'API_KEY_FROM_PREVIOUS_STEP';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SPREADSHEET_TAB_NAME = 'main';

function onGAPILoad() {
  gapi.client.init({
    // Don't pass client nor scope as these will init auth2, which we don't want
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  }).then(function () {
    console.log('gapi initialized')
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      gapi.auth.setToken({
        'access_token': token,
      });

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SPREADSHEET_TAB_NAME,
      }).then(function(response) {
        console.log(`Got ${response.result.values.length} rows back`)
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}