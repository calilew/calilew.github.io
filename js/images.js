var PageURL = 'http://calilew.github.io'

var fashionImages = [];
var portraitImages = [];
var travelImages = [];

var numFashion = 18;
var numPortraits = 17;
var numTravel = 23;

for(i = 1; i <= numFashion; i++){
  fashionImages.push(PageURL+'/img/fashion/'+i+'.jpg');
}
for(i = 1; i <= numPortraits; i++){
  portraitImages.push(PageURL+'/img/portraits/'+i+'.jpg');
}
for(i = 1; i <= numTravel; i++){
  travelImages.push(PageURL+'/img/travel/'+i+'.jpg');
}
// $.ajax({
//   url: PageURL+"/img/fashion",
//   success: function(data){
//      $(data).find("a:contains(.jpg)").each(function(){
//         // will loop through
//         fashionImages.push($(this).attr("href"));
//      });
//      pageReload()
//   }
// });
// $.ajax({
//   url: PageURL+"/img/portaits",
//   success: function(data){
//      $(data).find("a:contains(.jpg)").each(function(){
//         // will loop through
//         portraitImages.push($(this).attr("href"));
//      });
//      pageReload()
//   }
// });
// $.ajax({
//   url: PageURL+"/img/travel",
//   success: function(data){
//      $(data).find("a:contains(.jpg)").each(function(){
//         // will loop through
//         travelImages.push($(this).attr("href"));
//      });
//      pageReload()
//   }
// });
