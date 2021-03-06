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

  $( "#presale" ).submit(function( event ) {
    if ( $('div.checkbox-group.required :checkbox:checked').length > 0){
      swal("Obrigado!!", "Seus dados foram enviados com sucesso!!!", "success")
      $('#presale')[0].reset();
    }else{
      swal("Ops!!", "Precisa selecionar um item para interesse de compra.", "info")
    }
  });


  $('#aniimated-thumbnials').lightGallery({
    thumbnail:true
  });

  $('body').mousemove(function(e){
    $('.follow').css({'top': e.clientY + 10, 'left': e.clientX + 10});
  });


  var spreadsheetID = "17cCrmBKKAAO_qGV7TMLIJ8KsUXHPhfQTMYM41myKvl8";

  // Make sure it is public or set to Anyone with link can view
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
  var dataSet;


  var dataSet = new Array();

  $.getJSON(url, function(data) {

    var entry = data.feed.entry;

    $(entry).each(function(index, data){
      // Column names are name, age, etc.
      console.log(data.gsx$title.$t);
      dataSet.push([data.gsx$title.$t, data.gsx$date.$t, data.gsx$system.$t]);



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
