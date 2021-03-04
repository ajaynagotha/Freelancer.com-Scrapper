console.log(" ********************************************************* ");
var pages = prompt("enter number of pages", 1);
var posts = new Array();
var p = 3;
function getPosts() {
var allPosts = document.getElementsByClassName('search-result-list')[0].getElementsByTagName('li');
console.log(allPosts.length);
console.log("all posts", allPosts.length)
for (var i = 0; i < allPosts.length-1; i++) {
if(allPosts[i].getAttribute("ng-repeat")!= "project in search.results.projects") continue;
  jobtitle = allPosts[i].getElementsByClassName('info-card-title')[0].innerHTML.trim();
  jobDescription = allPosts[i].getElementsByClassName('info-card-description')[0].innerHTML.trim().replace(/\n/g, '');
  budget = allPosts[i].getElementsByClassName('info-card-price')[0].getElementsByTagName("span")[0].innerHTML.trim().replace('\n', '').replace(/ /g, '');
  skills = allPosts[i].getElementsByClassName('info-card-skills')[0].getElementsByTagName('span');
  var sarr = new Array();
  for(k=0; k < skills.length; k++) {
      sarr.push(skills[k].innerHTML)
  };
  skills = sarr.join(',');
  console.log("Job title: ", jobtitle);
  console.log("Job description: ", jobDescription);
  console.log("Budget: ",budget)
  console.log(" ********************************************************* ");
  tposts = new Array();
  tposts[0] = jobtitle;
  tposts[1] = jobDescription;
  tposts[2] = budget;
  tposts[3] = skills;
  posts.push(tposts);
}
plength = document.querySelectorAll('[ng-repeat="page in pages"]').length;
document.querySelectorAll('[ng-repeat="page in pages"]')[plength-2].getElementsByTagName('a')[0].click();
console.log(posts);
console.log(plength);
}
var k = 0;
for(j=0; j<Number(pages);j++) {
  setTimeout((function() {
     getPosts();
  }), 5000*k)
  k++
}