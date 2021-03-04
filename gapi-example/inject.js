
chrome.runtime.sendMessage({message: "started"}, response => {})

console.log(" ********************************************************* ");
var pages = 10;
var posts = new Array();
var p = 3;
var status = 0;
function getPosts() {
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  var allPosts = document.getElementsByClassName('search-result-list')[0].getElementsByTagName('li');
  console.log(allPosts.length);
  console.log("all posts", allPosts.length)
  for (var i = 0; i < allPosts.length - 1; i++) {
    if (allPosts[i].getAttribute("ng-repeat") != "project in search.results.projects") continue;
    jobtitle = allPosts[i].getElementsByClassName('info-card-title')[0].innerHTML.trim();
    jobDescription = allPosts[i].getElementsByClassName('info-card-description')[0].innerHTML.trim().replace(/\n/g, '');
    budget = allPosts[i].getElementsByClassName('info-card-price')[0].getElementsByTagName("span")[0].innerHTML.trim().replace('\n', '').replace(/ /g, '');
    skills = allPosts[i].getElementsByClassName('info-card-skills')[0].getElementsByTagName('span');
    var sarr = new Array();
    for (k = 0; k < skills.length; k++) {
      sarr.push(skills[k].innerHTML)
    };
    skills = sarr.join(',');
    console.log("Job Title: ", jobtitle);
    console.log("Job Description: ", jobDescription);
    console.log("Budget: ", budget)
    console.log(" ********************************************************* ");
    var tposts = {
      Job_Title: jobtitle,
      Job_Description: jobDescription,
      Budget: budget,
      Skills: skills  
    }
    posts.push(tposts);
  }
  plength = document.querySelectorAll('[ng-repeat="page in pages"]').length;
  document.querySelectorAll('[ng-repeat="page in pages"]')[plength - 2].getElementsByTagName('a')[0].click();
  console.log("posts", posts);
  console.log("status", status);
  if(status == Number(pages)) {
    console.log("data", posts);
    chrome.runtime.sendMessage({ data: posts, message: "done" }, function (response) {
      var pdata = {data: posts}
      var http = new XMLHttpRequest();
      var url = 'http://localhost:8080/freelancer';
      var data = JSON.stringify(pdata);
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function () {
        if (http.readyState == 1) {
          chrome.runtime.sendMessage({message: "loading" }, function (response) {})
        }
        if (http.readyState == 4 && http.status == 200) {
          document.getElementsByTagName('body')[0].style.overflow = 'auto';
          console.log("Execution Completed");
          chrome.runtime.sendMessage({message: "completed"}, response => {})
        }
      }
      http.send(data);
    });
  }
}
var k = 0;
for (j = 0; j < Number(pages); j++) {
  setTimeout((function () {
    status++;
    getPosts(); 
  }), 4000 * k)

  k++;
}

