var PageURL = 'http://calilew.github.io';

var images = {
  large: {
    fashionImages:[],
    portraitImages:[],
    travelImages:[]
  },
  thumb: {
    fashionImages:[],
    portraitImages:[],
    travelImages:[]
  }
}

var numFashion = 18;
var numPortraits = 17;
var numTravel = 23;

for(i = 1; i <= numFashion; i++){
  images.large.fashionImages.push(PageURL+'/img/fashion/large/'+i+'.jpg');
  images.thumb.fashionImages.push(PageURL+'/img/fashion/'+i+'.jpg');
}
for(i = 1; i <= numPortraits; i++){
  images.large.portraitImages.push(PageURL+'/img/portraits/large/'+i+'.jpg');
  images.thumb.portraitImages.push(PageURL+'/img/portraits/'+i+'.jpg');
}
for(i = 1; i <= numTravel; i++){
  images.large.travelImages.push(PageURL+'/img/travel/large/'+i+'.jpg');
  images.thumb.travelImages.push(PageURL+'/img/travel/'+i+'.jpg');
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
