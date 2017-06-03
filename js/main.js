$(document).ready(function(){

  var $doc = $('html, body');
  $('.internalink').click(function() {


      var topmargin = 250;



      if( ($.attr(this, 'href').localeCompare('#sale') == 0) ||
          ($.attr(this, 'href').localeCompare('#galery') == 0)){
        topmargin = 48;
      }


      $doc.animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top - topmargin
      }, 500);
      return false;
  });


// init controller
  var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

  // build scenes
  new ScrollMagic.Scene({triggerElement: "#parallax1"})
          .setTween("#parallax1 > div", {y: "100%", ease: Linear.easeNone})
          .addIndicators()
          .addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#parallax2"})
          .setTween("#parallax2 > div", {y: "100%", ease: Linear.easeNone})
          .addIndicators()
          .addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#parallax3"})
          .setTween("#parallax3 > div", {y: "70%", ease: Linear.easeNone})
          .addIndicators()
          .addTo(controller);


  var nav = $('.nav-container');
    $(window).scroll(function () {
      if ($(this).scrollTop() > 208) {
        nav.addClass("f-nav");
      } else {
        nav.removeClass("f-nav");
      }
  });

$('#aniimated-thumbnials').lightGallery({
    thumbnail:true
});


// GOOLE SHEETS
 var spreadsheetID = "17cCrmBKKAAO_qGV7TMLIJ8KsUXHPhfQTMYM41myKvl8";
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 $.getJSON(url, function(data) {
  var entry = data.feed.entry;
  var dataSet = [];
  $(entry).each(function(i, data){
    console.log( entry[i].gsx$date.$t);
    dataSet.push([entry[i].gsx$title.$t, entry[i].gsx$date.$t,entry[i].gsx$system.$t]);
  });

  $('#example').DataTable({
    data: dataSet,
    columns: [
      { title: 'Título' },
      { title: 'Lançamento' },
      { title: 'Console' }
    ]
  });
 });


});
