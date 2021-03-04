  
      var CLIENT_ID = '190566737687-21lkugte8kegtcc3qv321g8cqebsrqjd.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyD7guW6TJ__5Jfu7W9iy6vnqJngaOkLOio';
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
      function onGAPILoad() {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
            SCOPES: SCOPES
          }).then(function () {
            alert("initialized")
            chrome.identity.getAuthToken({interactive: true}, function(token) {
              gapi.auth.setToken({
                'access_token': token,
              });
              gapi.client.sheets.spreadsheets.create({
                properties: {
                  title: "new Sheet"
                }
              }).then((response) => {
                  alert(response.result.SpreadSheetId)
              });
            })
          }, function(error) {
            console.log('error', error)
          });
      }
    
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listMajors();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }
    
      chrome.extension.onMessage.addListener(
        function(request, sender, sendResponse) {
          // Get the token
          chrome.identity.getAuthToken({interactive: true}, function(token) {
            // Set GAPI auth token
            
            gapi.auth.setToken({
              'access_token': token,
            });
      
            const body = {values: [[
              new Date(), // Timestamp
              request.title, // Page title
              request.url, // Page URl
            ]]};
      
            // Append values to the spreadsheet
            gapi.client.sheets.spreadsheets.values.append({
              spreadsheetId: SPREADSHEET_ID,
              range: SPREADSHEET_TAB_NAME,
              valueInputOption: 'USER_ENTERED',
              resource: body
            }).then((response) => {
              // On success
              console.log(`${response.result.updates.updatedCells} cells appended.`)
              sendResponse({success: true});
            });
          })
      
          // Wait for response
          return true;
        }
      );