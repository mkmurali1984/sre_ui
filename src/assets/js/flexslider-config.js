jQuery(document).ready(function () {
  jQuery(".flexslider").each(function () {
    var sliderInstance = jQuery(this);
      (sliderAutoplay =
      sliderInstance.attr("data-autoplay") == "yes" ? true : false),
      (sliderPagination =
        sliderInstance.attr("data-pagination") == "yes" ? true : false),
      (sliderArrows =
        sliderInstance.attr("data-arrows") == "yes" ? true : false),
      (sliderDirection = sliderInstance.attr("data-direction")
        ? sliderInstance.attr("data-direction")
        : "horizontal"),
      (sliderStyle = sliderInstance.attr("data-style")
        ? sliderInstance.attr("data-style")
        : "fade"),
      (sliderSpeed = sliderInstance.attr("data-speed")
        ? sliderInstance.attr("data-speed")
        : "5000"),
      (sliderPause = sliderInstance.attr("data-pause") == "yes" ? true : false),
      sliderInstance.flexslider({
        animation: sliderStyle,
        easing: "swing",
        direction: sliderDirection,
        slideshow: sliderAutoplay,
        slideshowSpeed: sliderSpeed,
        animationSpeed: 600,
        initDelay: 0,
        randomize: false,
        pauseOnHover: sliderPause,
        controlNav: sliderPagination,
        directionNav: sliderArrows,
        prevText: "",
        nextText: "",
        // start: function () { jQuery(".flex-caption").fadeIn(); }
      });
  });
});
