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
for(j = 1; j <= numPortraits; j++){
  images.large.portraits.push(PageURL+'/img/portraits/large/'+j+'.jpg');
  images.thumb.portraits.push(PageURL+'/img/portraits/'+j+'.jpg');
}
for(k = 1; k <= numTravel; k++){
  images.large.travel.push(PageURL+'/img/travel/large/'+k+'.jpg');
  images.thumb.travel.push(PageURL+'/img/travel/'+k+'.jpg');
}

// function preloadImage(url)
// {
//     var img=new Image();
//     img.src=url;
// }
// for(l in images.thumb.fashionImages){
//   preloadImage(images.thumb.fashion[i])
//   // preloadImage(images.large.fashion[i])
// }
// for(m in images.thumb.portaits){
//   preloadImage(images.thumb.portraits[j])
//   // preloadImage(images.large.portraits[j])
// }
// for(n in images.thumb.travel){
//   preloadImage(images.thumb.travel[k])
//   // preloadImage(images.large.travel[k])
// }
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
