var PageURL = 'http://calilew.github.io'

var images = {
  large: {
    fashion:[],
    portraits:[],
    travel:[]
  },
  thumb: {
    fashion:[],
    portraits:[],
    travel:[]
  }
}

var numFashion = 18;
var numPortraits = 17;
var numTravel = 23;

for(i = 1; i <= numFashion; i++){
  images.large.fashion.push(PageURL+'/img/fashion/large/'+i+'.jpg');
  images.thumb.fashion.push(PageURL+'/img/fashion/'+i+'.jpg');
}
for(i = 1; i <= numPortraits; i++){
  images.large.portaits.push(PageURL+'/img/portraits/large/'+i+'.jpg');
  images.thumb.portaits.push(PageURL+'/img/portraits/'+i+'.jpg');
}
for(i = 1; i <= numTravel; i++){
  images.large.travel.push(PageURL+'/img/travel/large/'+i+'.jpg');
  images.thumb.travel.push(PageURL+'/img/travel/'+i+'.jpg');
}

function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}
for(i in images.thumb.fashionImages){
  preloadImage(images.thumb.fashion[i])
  // preloadImage(images.large.fashion[i])
}
for(j in images.thumb.portaits){
  preloadImage(images.thumb.portraits[j])
  // preloadImage(images.large.portraits[j])
}
for(k in images.thumb.travel){
  preloadImage(images.thumb.travel[k])
  // preloadImage(images.large.travel[k])
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
