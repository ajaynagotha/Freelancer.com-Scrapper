//provide your google sheet email from gcloud service account
// provide key, you can generate this key from your service acount in gcloud
//spreadsheet Id in which you want to store your results
const CLIENT_EMAIL = 'gsheet@gsheet-freelancer.iam.gserviceaccount.com'; 
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnSkjBzgmI6Kbi\nwZ2JOtiDowr6jUvcoiWJ1sV728cHdrl7mfWjl7hWgy5okDJ230EHlFffKu2Rcegy\nyYJHyJeVdWAZzLT0Tzeqm5cjYjPOwOpTalt7DAkwGQ3HQrkgbWbWO2fjDPQQ1RKv\nFstWXrGdt/iuMuIj6CeMCHQL0He1gF5MWQRFJaY0Nz62lxLnwURwIzFOmyJB0F+K\nm2VAtHtuKjOieB5e7VXFaRKS5WcAVy5n9QU/bvtENH1fxu3eQErzgBVDBfmrW5e2\nXRz0VtKOUnYc2jDJAhqY0idzkbaCo5BXS9rYYuugBNWxjKHzJ8UgOXuFkQUrvrzZ\nNUl+f9RnAgMBAAECggEAILjMAHSfstLnCcWbXeNPxHfYxudqZk6lDxAecrqrdI9J\nep7DyGr92JYyNqu140CKBMSEZ5eK/n8MTxrRS981nztlP8alwn/YQJvMdVRZE+Dy\nNLzCBhB1n53W7xnjAi/EBLV7/ZJkDwLOc8b+oPdGwLXig5haWXGogqCIqmLtd2fB\n8V4Gqc/4NAMKyru6gEoo3sskPHgnoyR+t4p03KHID8vare33NYF7FqBQUtMx8Rjq\nzDgHnYyk9ukcz+2HjQJD1fETozcI5T1YnCGglewPByqMQPBLRhAFAf73Km5IfD7u\nkpn9emeh/7nuKslMvd4TXxj+DBYURr2SSamfHY0r4QKBgQDqoNKAq9c9iejybEAM\nFaEbDwmgw+Shl9y2Cvr8WHOBbN4je+nvoA6FT5Sk3rzOfp4G+BIQ7unvUqGYzmeT\n4xypaGvViS4AIeilxM4qEWibeVF9ruNFEQgWJdHi4YrI0NzXw/rn4ns1b2dUyqf9\nnUg5btAH4y9mHV0NBKGsPFwe1wKBgQC2hz1sBF/sK6EE5p4YsaQAs1uGryvEMps3\nWOaOv9IqzROJmDvXkMj0cdkAs+iYa8dVyRj6O/HvS4npZl6VQyLQuqZ11vyoeMTY\ntiRQDqH9Q2xh8XVZTxEFllRCi6XGPg9G5L58IQnz6T4bdUrcEcILcJ7t7mLP8nxt\nNGBQm9IU8QKBgQDSbxk9dGIg/H7kZrhu3jtXhH4zJV76m7TFxUVkbIR0MUtu8eVY\nGOrNIBoGYQtf/OoJABdb/pvsHOV4oq79UbXULyaAJ4ANeFwryT7LNj/nKcEwA1ot\nCOCC1LrRTU5nXASmtExmC5hLzbYUs4pGCfnMIRoN6PILGQzq7xt92ckZkwKBgFjk\ngkBR3Rlaoh+N5N7n3JROxTtRokH512fcDuTkfIlFuMcg8bvpEkUiEOnrtFJO4xRf\nTJ/Jg+jjY/XcWiHdQV5gGGN5YTD3J/7WrdajWbbLGESW4GyvOf37mWuTMRfb73q6\nOh6fxIYaSJn8xIlqyJLjtTLxDwRw9rIEeQeo62YxAoGBAOjX01dvJsLeDHEtNDTu\n7TOp5D/TzjgYzbDUCI8Y4vGB1uJ/15wRxxRaCnjrlID+aZxLKM1oDs0Rmszl7Vcs\nVDUjs7hSE0h71msc+nE3LzV7q15XQ5/kx0CR8UERF7OnwJft1aVovk7c4lqKF90P\nAJFwSzYdR+RJg806ZR3iy4R7\n-----END PRIVATE KEY-----\n'
const SHEET_ID = '1OkPqIN5lDv0-kLcWss1kiTStsNK1f5bYtuavC320fbE'

const GSheet = async (req, res) => {
    var d = new Date()
    console.log(req.body.data[0]);
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(SHEET_ID);
    
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY
    })
    .then((res) => {
        console.log("res", res)
    })
    .catch((err) => {
      res.json({message: "Google Authentication failed"})
    });
    await doc.loadInfo(); 
    const newSheet = await doc.addSheet({ title: 'Freelancer.com'+d.getTime(), headerValues: ['Job_Title', 'Job_Description', 'Budget', 'Skills'] } );
    const rows = await newSheet.addRows(req.body.data)
    const row = await newSheet.getRows();
    res.json({success: true})
}
module.exports = GSheet
