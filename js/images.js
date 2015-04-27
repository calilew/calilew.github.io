var PageURL = ‘http://calilew.github.io’

var fashionImages = [];
var portraitImages = [];
var travelImages = [];

$.ajax({
  url: PageURL+"/img/fashion",
  success: function(data){
     $(data).find("a:contains(.jpg)").each(function(){
        // will loop through
        fashionImages.push($(this).attr("href"));
     });
     pageReload()
  }
});
$.ajax({
  url: PageURL+"/img/portaits",
  success: function(data){
     $(data).find("a:contains(.jpg)").each(function(){
        // will loop through
        portraitImages.push($(this).attr("href"));
     });
     pageReload()
  }
});
$.ajax({
  url: PageURL+"/img/travel",
  success: function(data){
     $(data).find("a:contains(.jpg)").each(function(){
        // will loop through
        travelImages.push($(this).attr("href"));
     });
     pageReload()
  }
});

function pageReload(){
  React.render(<Page fashionImages={fashionImages} portraitImages={portraitImages} travelImages={travelImages}/>,document.getElementById('main'));
}
