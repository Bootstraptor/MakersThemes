

//Animate on Scroll
AOS.init({
  duration: 1200,
})


// SlIK SLIDER

//Slik slider init
$('.slider-testimonials-1').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
   dots: true,
   fade: true,
   autoplay: true,
   //adaptiveHeight: true,
   autoplaySpeed: 2000
  });
  var navBtn = $('.navbar-toggler');
  var nav = $('#navbar-main');
  var collapseNav = $('.navbar-collapse');

  $(navBtn).on('click', function(){
    nav.addClass('bg-light');
    nav.removeClass('bg-transparent');
    nav.addClass('shadow-sm');
  }).off('click', function(){
    nav.removeClass('bg-light');
    nav.removeClass('shadow-sm');
    nav.addClass('bg-transparent');
  })

  $(window).scroll(function() {

    var top = 60;

    if ($(window).scrollTop() >= top) {

        nav.addClass('bg-light');
        nav.removeClass('bg-transparent');
        nav.addClass('shadow-sm');

    } else {

        nav.removeClass('bg-light');
        nav.removeClass('shadow-sm');
        nav.addClass('bg-transparent');
        if ($(collapseNav).hasClass('show')){
          $(navBtn).trigger('click')
        }


    }
  });

  var googleSheetUrl="https://docs.google.com/spreadsheets/d/1OWQqEZlWMOof_czquJYtMbFJSFg-UBsnVQ0OMeq23hg/edit?usp=sharing"
  //Send request to G-sheets if ok => start widget
  var spreadsheetID = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(googleSheetUrl)[1];
  // Make sure it is Public and Published to Web or set to Anyone with link can view
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  //var dataL = [];
  var dataL;
  var count;
  var dnld = 2000;
  var xhr2 = new XMLHttpRequest();
  //Call the open function, GET-type of request, url, true-asynchronous
  xhr2.open("GET", url, true);
  xhr2.onerror = function () {
      console.log('WIDGET ERROR: ** An error occurred during the transaction: Google Sheet file does not exist or wrong ID! Check that file exist and published in web or check ID. See more info on https://proven.ly/documentation')
  };
  //call the onload
  xhr2.onload = function() {
    //check if the status is 200(means everything is okay)
    if (this.readyState == 4 && this.status === 200 && this.status < 400) {
      //return server response as an object with JSON.parse
      //console.log(JSON.parse(this.responseText));
      dataL = JSON.parse(this.responseText).feed.entry.length;
      count = +dataL + dnld
      console.log(count);
      console.log('B I N G O!');
      startWidget();

    }

  };
  //call send
  xhr2.send();




  console.log(count)
  //var content = document.querySelector(".random-wrapper");
  //var content = document.querySelector(".inline-proof");

   function startWidget(){

    function animateValue(id, start, end, duration) {
      var range = end - start;
      var current = start;
      var increment = end > start? 1 : -1;
      var stepTime = Math.abs(Math.floor(duration / range));
      var obj = document.getElementById(id);
      var timer = setInterval(function() {
          current += increment;
          obj.innerHTML = current;
          if (current == end) {
              clearInterval(timer);
          }
      }, stepTime);
    }

    animateValue("value", 1, 2630, 100);
  }

  startWidget();
