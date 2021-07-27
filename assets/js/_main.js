/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function() {
  // FitVids init
  $("#main").fitVids();
  var travelMapWidth = 636;   // will be the value that the original provided coords are mapped to
  var travelMapHeight = 398;
  // Sticky sidebar
  var stickySideBar = function() {
    var show =
      $(".author__urls-wrapper button").length === 0
        ? $(window).width() > 1024 // width should match $large Sass variable
        : !$(".author__urls-wrapper button").is(":visible");
    if (show) {
      // fix
      $(".sidebar").addClass("sticky");
    } else {
      // unfix
      $(".sidebar").removeClass("sticky");
    }
  };

  var adjustTravelMap = function () {
    const updatedHeight = $("#usa_img").height();
    const updatedWidth = $("#usa_img").width();
    var shapes = $('#usa_mapping > area');
    const heightChange = updatedHeight / travelMapHeight;
    const widthChange = updatedWidth / travelMapWidth;
    for (let i = 0; i < shapes.length; i++) {
      const typeOfShape = shapes[i].getAttribute('shape');
      if (typeOfShape == 'poly' || typeOfShape == 'rect') {
        const existingCoords = shapes[i].getAttribute('coords').split(',').map(Number);
        console.log(existingCoords)
        const updatedCoords = [];
        for (let j = 0; j < existingCoords.length; j++) {
          var updatedCoord;
          if (j % 2 === 0) {  // x coordinate
            updatedCoord = existingCoords[j] * widthChange
          }
          else {    // y coordinate
            updatedCoord = existingCoords[j] * heightChange
          }
          updatedCoords.push(Number.parseFloat(updatedCoord).toFixed(4));
        }
        console.log(updatedCoords);
        const stringifiedNewCoords = updatedCoords.join(',');
        shapes[i].setAttribute('coords', stringifiedNewCoords);
      }
    }
    travelMapHeight = updatedHeight;
    travelMapWidth = updatedWidth;
  }



  stickySideBar();
  adjustTravelMap();


  $(window).resize(function() {
    stickySideBar();
    if ($("#usa_img").width() != travelMapWidth || $("#usa_img").height() != travelMapHeight) {
      adjustTravelMap();
    }
  });

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Close search screen with Esc key
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
  });

  // Search toggle
  $(".search__toggle").on("click", function() {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function() {
      $(".search-content input").focus();
    }, 400);
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500
  });

  // Gumshoe scroll spy init
  if($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true // if true, emit custom events
    });
  }

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
  ).addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Add anchors for headings
  $('.page__content').find('h1, h2, h3, h4, h5, h6').each(function() {
    var id = $(this).attr('id');
    if (id) {
      var anchor = document.createElement("a");
      anchor.className = 'header-link';
      anchor.href = '#' + id;
      anchor.innerHTML = '<span class=\"sr-only\">Permalink</span><i class=\"fas fa-link\"></i>';
      anchor.title = "Permalink";
      $(this).append(anchor);
    }
  });

//   // Updating image map on resize
//   window.onload = function () {
//     var ImageMap = function (map, img) {
//             var n,
//                 areas = map.getElementsByTagName('area'),
//                 len = areas.length,
//                 coords = [],
//                 previousWidth = 128;
//             for (n = 0; n < len; n++) {
//                 coords[n] = areas[n].coords.split(',');
//             }
//       console.log('coords')
//       console.log(coords)
//       this.resize = function () {
//               console.log('resizing')
//                 var n, m, clen,
//           x = img.offsetWidth / previousWidth;
//         console.log('the x value')
//         console.log(x);
//                 for (n = 0; n < len; n++) {
//                     clen = coords[n].length;
//                     for (m = 0; m < clen; m++) {
//                         coords[n][m] *= x;
//                     }
//                     areas[n].coords = coords[n].join(',');
//         }
//         console.log('areas')
//         console.log(areas)
//                 previousWidth = document.body.clientWidth;
//                 return true;
//             };
//             window.onresize = this.resize;
//         },
//         imageMap = new ImageMap(document.getElementById('usa_mapping'), document.getElementById('usa_img'));
//    console.log(imageMap);
//    imageMap.resize();
//     return;
// }
});
