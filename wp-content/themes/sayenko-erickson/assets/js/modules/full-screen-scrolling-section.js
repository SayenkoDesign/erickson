import $ from 'jquery';

export default {
	init() {
		var fullScreenScrollingSectionVars = {
          content_break_point: "1200",
          container_hundred_percent_height_mobile: "0",
          is_sticky_header_ignored: "0"
        };
        
        function getStickyHeaderHeight(a) {
            return $(".site-header.fixed").outerHeight();
        }
        
        $(window).load(function() {
          // Check if page is already loaded scrolled, without anchor scroll script. If so, move to beginning of correct scrolling section.
          if (
            $("#content").find(".full-screen-scroll-section").length &&
            "undefined" === typeof $(".full-screen-page-load-link").attr("href")
          ) {
            setTimeout(function() {
              scrollToCurrentScrollSection();
            }, 400);
          }
        });
        
        $(document).ready(function() {
          var mainContentScrollSections = $("#content").find(
              ".full-screen-scroll-section"
            ),
            lastYPosition,
            onlyOneScrollSectionOnPage,
            stickyHeaderHeight =
              !Boolean(
                Number(fullScreenScrollingSectionVars.is_sticky_header_ignored)
              ) && "function" === typeof getStickyHeaderHeight
                ? getStickyHeaderHeight(true)
                : 0,
            adminbarHeight = $("#wpadminbar").length
              ? parseInt($("#wpadminbar").height(), 10)
              : 0,
            sectionTopOffset = stickyHeaderHeight + adminbarHeight,
            overallSectionHeight;
        
          // Check if there are 100% height scroll sections.
          if (mainContentScrollSections.length) {
            if (
              !$("#content").find(".non-hundred-percent-height-scrolling").length &&
              1 === mainContentScrollSections.length &&
              !$.trim($("#sliders-container").html())
            ) {
              // uncomment if you only want full height scrolling sections on page
              //mainContentScrollSections.addClass( 'active' );
              //mainContentScrollSections.find( '.full-screen-scroll-section-nav li:first a' ).addClass( 'active' );
              //onlyOneScrollSectionOnPage = true;
            }
        
            // Set correct heights for the wrapping scroll sections and individual scroll elements, based on the number of elements, sticky header and admin bar.
            mainContentScrollSections.each(function() {
              if (1 < $(this).children("div").length) {
                overallSectionHeight = sectionTopOffset
                  ? "calc(" +
                    ($(this)
                      .children("div")
                      .size() *
                      100 +
                      50) +
                    "vh - " +
                    sectionTopOffset +
                    "px)"
                  : $(this)
                      .children("div")
                      .size() *
                      100 +
                    50 +
                    "vh";
        
                // Set correct height for the wrapping scroll section.
                $(this).css("height", overallSectionHeight);
        
                // Set the correct height offset per section and also for the nav.
                if (sectionTopOffset) {
                  $(this)
                    .find(".hundred-percent-height-scrolling")
                    .css("height", "calc(100vh - " + sectionTopOffset + "px)");
        
                  $(this)
                    .find(".full-screen-scroll-section-nav")
                    .css("top", "calc(50% + " + sectionTopOffset / 2 + "px)");
                }
              }
            });
        
            // Set the last scroll position to the initial loading value.
            lastYPosition = $(window).scrollTop();
        
            $(window).scroll(function() {
              var currentYPosition = $(window).scrollTop();
        
              // Position the elements of a scroll section correctly.
              $(".full-screen-scroll-section").each(function() {
                if (
                  1 < $(this).children("div").length &&
                  !$(this).hasClass("full-screen-scroll-section-mobile-disabled")
                ) {
                  $(this).fullScreenPositionScrollSectionElements(
                    lastYPosition,
                    currentYPosition,
                    onlyOneScrollSectionOnPage
                  );
                }
              });
        
              lastYPosition = currentYPosition;
            });
        
            // Set the "active" class to the correct scroll nav link and the correct section element.
            $(".full-screen-scroll-section-link").on("click", function(e) {
              var scrollSection = $(this).parents(".full-screen-scroll-section"),
                numberOfLastActive = parseInt(
                  $(this)
                    .parents(".full-screen-scroll-section-nav")
                    .find(".full-screen-scroll-section-link.active")
                    .data("element"),
                  10
                ),
                numberOfNewActive = parseInt($(this).data("element"), 10),
                numberOfScrolledElements = Math.abs(
                  numberOfNewActive - numberOfLastActive
                ),
                scrollAnimationTime =
                  (350 + 30 * (numberOfScrolledElements - 1)) *
                  numberOfScrolledElements;
        
              e.preventDefault();
        
              // If slide is already active, do nothing.
              if (0 === numberOfScrolledElements) {
                return;
              }
                      
              if (20 < numberOfScrolledElements) {
                scrollAnimationTime = (350 + 30 * 20) * numberOfScrolledElements;
              }
        
              // Add active class to the correct section element.
              $(this)
                .parents(".full-screen-scroll-section")
                .find(".full-screen-scroll-section-element")
                .removeClass("active");
             
              
              // Scroll to correct position of current section.
              $("html, body").animate(
                {
                  scrollTop:
                    Math.ceil(scrollSection.offset().top) +
                    $(window).height() * ($(this).data("element") - 1)
                },
                scrollAnimationTime,
                "linear"
              );
            });
          }
        
          if ($(".hundred-percent-height").length) {
            setCorrectResizeValuesForScrollSections();
        
            $(window).on("resize", function() {
              setCorrectResizeValuesForScrollSections();
            });
          }
        });
        
        function setCorrectResizeValuesForScrollSections() {
          var mainContentScrollSections = $("#content").find(
              ".full-screen-scroll-section"
            ),
            stickyHeaderHeight = 0,
            stickyHeaderHeight = 0,
            sectionTopOffset = 0,
            adminbarHeight = 0;
        
          // Check if there are 100% height scroll sections.
          if (mainContentScrollSections.length) {
            // Resize the fixed containers, to fit the correct area.
            $(".full-screen-scroll-section.active")
              .find(".full-screen-scroll-section-element")
              .css({
                left: $("#content").offset().left
              });
        
            $(".full-screen-scroll-section")
              .find(".full-screen-scroll-section-element")
              .css({
                width: $("#content").width()
              });
        
            if (
              0 ==
              fullScreenScrollingSectionVars.container_hundred_percent_height_mobile
            ) {
              // jshint ignore:line
        
              // Mobile view.
              if (
                Modernizr.mq(
                  "only screen and (max-width: " +
                    fullScreenScrollingSectionVars.content_break_point +
                    "px)"
                )
              ) {
                $(".full-screen-scroll-section")
                  .removeClass("active")
                  .addClass("full-screen-scroll-section-mobile-disabled");
                $(".full-screen-scroll-section").attr("style", "");
                $(".full-screen-scroll-section")
                  .find(".full-screen-scroll-section-element")
                  .attr("style", "");
                $(".full-screen-scroll-section")
                  .find(".hundred-percent-height-scrolling")
                  .css("height", "auto");
                $(".full-screen-scroll-section")
                  .find(".fullwidth-center-content")
                  .css("height", "auto");
              } else {
                // Desktop view.
                if (
                  $(".full-screen-scroll-section").hasClass(
                    "full-screen-scroll-section-mobile-disabled"
                  )
                ) {
                  $(".full-screen-scroll-section")
                    .find(".fullwidth-center-content")
                    .css("height", "");
        
                  if (
                    !Boolean(
                      Number(fullScreenScrollingSectionVars.is_sticky_header_ignored)
                    ) &&
                    "function" === typeof getStickyHeaderHeight
                  ) {
                    stickyHeaderHeight = getStickyHeaderHeight(true);
                  }
                  if ($("#wpadminbar").length) {
                    adminbarHeight = parseInt($("#wpadminbar").height(), 10);
                  }
                  sectionTopOffset = stickyHeaderHeight + adminbarHeight;
        
                  // Set correct heights for the wrapping scroll sections, based on the number of elements.
                  mainContentScrollSections.each(function() {
                    if (1 < $(this).children("div").length) {
                      $(this).css(
                        "height",
                        $(this)
                          .children("div")
                          .size() *
                          100 +
                          50 +
                          "vh"
                      );
        
                      $(this)
                        .find(".hundred-percent-height-scrolling")
                        .css("height", "calc(100vh - " + sectionTopOffset + "px)");
                    }
                  });
        
                  scrollToCurrentScrollSection();
                }
              }
            }
          }
        
          // Special handling of 100% height containers without scrolling sections.
          if (
            $(".hundred-percent-height.non-hundred-percent-height-scrolling").length
          ) {
            if (
              !Boolean(
                Number(fullScreenScrollingSectionVars.is_sticky_header_ignored)
              ) &&
              "function" === typeof getStickyHeaderHeight
            ) {
              stickyHeaderHeight = getStickyHeaderHeight(true);
            }
            if ($("#wpadminbar").length) {
              adminbarHeight = parseInt($("#wpadminbar").height(), 10);
            }
            sectionTopOffset = stickyHeaderHeight + adminbarHeight;
        
            if (
              0 ==
              fullScreenScrollingSectionVars.container_hundred_percent_height_mobile
            ) {
              // jshint ignore:line
        
              // Mobile view.
              if (
                Modernizr.mq(
                  "only screen and (max-width: " +
                    fullScreenScrollingSectionVars.content_break_point +
                    "px)"
                )
              ) {
                $(".hundred-percent-height.non-hundred-percent-height-scrolling").css(
                  "height",
                  "auto"
                );
        
                $(".hundred-percent-height.non-hundred-percent-height-scrolling")
                  .find(".fullwidth-center-content")
                  .css("height", "auto");
              } else {
                // Desktop view.
                $(".hundred-percent-height.non-hundred-percent-height-scrolling").css(
                  "height",
                  "calc(100vh - " + sectionTopOffset + "px)"
                );
        
                $(".hundred-percent-height.non-hundred-percent-height-scrolling")
                  .find(".fullwidth-center-content")
                  .css("height", "");
              }
            }
          }
        }
        
        function scrollToCurrentScrollSection() {
          var currentScrollPosition = $(window).scrollTop(), // jshint ignore:line
            viewportTop = Math.ceil($(window).scrollTop()),
            viewportHeight = $(window).height(),
            viewportBottom = Math.floor(viewportTop + viewportHeight),
            stickyHeaderHeight =
              !Boolean(
                Number(fullScreenScrollingSectionVars.is_sticky_header_ignored)
              ) && "function" === typeof getStickyHeaderHeight
                ? getStickyHeaderHeight(true)
                : 0,
            adminbarHeight = $("#wpadminbar").length
              ? parseInt($("#wpadminbar").height(), 10)
              : 0;
        
          viewportTop += stickyHeaderHeight + adminbarHeight;
        
          // Get the scroll section in view, but only if not while loading when a one page scroll link is present.
          if (!$(".full-screen-page-load-link").hasClass("load-scroll-section-link")) {
            $(".full-screen-scroll-section").each(function() {
              var section = $(this),
                sectionTop = Math.ceil(section.offset().top),
                sectionHeight = Math.ceil(section.outerHeight()),
                sectionBottom = Math.floor(sectionTop + sectionHeight);
        
              // Scrolled position is inside a scroll section.
              if (sectionTop <= viewportTop && sectionBottom >= viewportBottom) {
                section.addClass("active");
        
                // Scroll to beginning position of correct section.
                $("html, body").animate(
                  {
                    scrollTop: sectionTop - 50
                  },
                  {
                    duration: 50,
                    easing: "easeInExpo",
                    complete: function() {
                      $("html, body").animate(
                        {
                          scrollTop: sectionTop
                        },
                        {
                          duration: 50,
                          easing: "easeOutExpo",
                          complete: function() {
                            // Remove the mobile disabling class if in desktop mode.
                            if (
                              !Modernizr.mq(
                                "only screen and (max-width: " +
                                  fullScreenScrollingSectionVars.content_break_point +
                                  "px)"
                              )
                            ) {
                              $(".full-screen-scroll-section").removeClass(
                                "full-screen-scroll-section-mobile-disabled"
                              );
                            }
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                // Added as this was breaking resize without it
                // Remove the mobile disabling class if in desktop mode.
                if (
                  !Modernizr.mq(
                    "only screen and (max-width: " +
                      fullScreenScrollingSectionVars.content_break_point +
                      "px)"
                  )
                ) {
                  $(".full-screen-scroll-section").removeClass(
                    "full-screen-scroll-section-mobile-disabled"
                  );
                }
              }
            });
          }
        }
        
        (function($) {
          "use strict";
        
          $.fn.fullScreenPositionScrollSectionElements = function(
            lastYPosition,
            currentYPosition,
            onlyOneScrollSectionOnPage
          ) {
            var section = $(this),
              sectionTop = Math.ceil(section.offset().top),
              sectionHeight = Math.ceil(section.outerHeight()),
              sectionBottom = Math.floor(sectionTop + sectionHeight),
              viewportTop = Math.ceil($(window).scrollTop()),
              viewportHeight = $(window).height(),
              viewportBottom = Math.floor(viewportTop + viewportHeight),
              numberOfElements = section.find(".full-screen-scroll-section-element")
                .length,
              currentSegment = 0,
              sectionWidth,
              sectionTopOffset,
              sectionLeftOffset,
              sectionPadding,
              i;
        
            onlyOneScrollSectionOnPage = onlyOneScrollSectionOnPage || false;
        
            // Top offset is 0 or wpadminbar height if no sticky header is used.
            sectionTopOffset = $("#wpadminbar").length
              ? parseInt($("#wpadminbar").height(), 10)
              : 0;
        
            // We have a non-transparent sticky header, so we need correct top offset.
            sectionTopOffset +=
              !Boolean(
                Number(fullScreenScrollingSectionVars.is_sticky_header_ignored)
              ) && "function" === typeof getStickyHeaderHeight
                ? getStickyHeaderHeight(true)
                : 0;
        
            // Add the sticky header offset to the viewpot top for calcs.
            viewportTop += sectionTopOffset;
        
            // Set the correct offsets for general use.
            sectionWidth = $("#content").width();
            sectionLeftOffset = $("#content").offset().left;
            sectionPadding = "0";
        
            // Make sure there is more than one scroll section, otherwise the one will always be active.
            if (!onlyOneScrollSectionOnPage) {
              // Set the section to active if it is in viewport.
              if (sectionTop <= viewportTop && sectionBottom >= viewportBottom) {
                section.addClass("active");
              } else {
                section.removeClass("active");
              }
            }
        
            // Scrolling down.
            if (lastYPosition < currentYPosition) {
              // Get the current element by checking in which section segment the viewport top is.
              for (i = 1; i < numberOfElements; i++) {
                if (
                  viewportTop >= sectionTop + viewportHeight * i &&
                  viewportTop < sectionTop + viewportHeight * (i + 1)
                ) {
                  currentSegment = i + 1;
                }
              }
        
              // First element comes into viewport.
              if (
                sectionTop <= viewportTop &&
                sectionTop + viewportHeight > viewportTop
              ) {
                // Set correct element to be active.
                section
                  .find(".full-screen-scroll-section-element")
                  .removeClass("active");
                section.children(":nth-child(1)").addClass("active");
        
                // Set correct navigation link to be active.
                section.find(".full-screen-scroll-section-nav a").removeClass("active");
                section
                  .find(
                    '.full-screen-scroll-section-nav a[data-element="' +
                      section.children(":nth-child(1)").data("element") +
                      '"] '
                  )
                  .addClass("active");
        
                // When entering a scroll section all elements need to be positioned fixed and other values set depending on layout.
                section.find(".full-screen-scroll-section-element").css({
                  position: "fixed",
                  top: sectionTopOffset,
                  left: sectionLeftOffset,
                  padding: "0 " + sectionPadding,
                  width: sectionWidth
                });
        
                section.children(":nth-child(1)").css("display", "block");
              } else if (
                sectionBottom <= viewportBottom &&
                "absolute" !==
                  section
                    .find(".full-screen-scroll-section-element")
                    .last()
                    .css("position")
              ) {
                // Last element is in viewport and it is scrolled further down, so exiting scroll section.
        
                section
                  .find(".full-screen-scroll-section-element")
                  .removeClass("active");
                section
                  .find(".full-screen-scroll-section-element")
                  .last()
                  .addClass("active");
        
                section
                  .find(".full-screen-scroll-section-element")
                  .css("position", "absolute");
        
                section
                  .find(".full-screen-scroll-section-element")
                  .last()
                  .css({
                    top: "auto",
                    left: "0",
                    bottom: "0",
                    padding: ""
                  });
              } else if (
                0 < currentSegment &&
                !section
                  .children(":nth-child(" + currentSegment + ")")
                  .hasClass("active")
              ) {
                // Transition between individual elements.
        
                // Set correct element to be active.
                section
                  .find(".full-screen-scroll-section-element")
                  .removeClass("active");
                section
                  .children(":nth-child(" + currentSegment + ")")
                  .addClass("active");
        
                // Set correct navigation link to be active.
                section.find(".full-screen-scroll-section-nav a").removeClass("active");
                section
                  .find(
                    '.full-screen-scroll-section-nav a[data-element="' +
                      section
                        .children(":nth-child(" + currentSegment + ")")
                        .data("element") +
                      '"] '
                  )
                  .addClass("active");
              }
            } else if (lastYPosition > currentYPosition) {
              // Scrolling up.
        
              // Get the current element by checking in which section segment the viewport top is.
              for (i = 1; i < numberOfElements; i++) {
                if (
                  sectionTop + viewportHeight * i > viewportTop &&
                  sectionTop + viewportHeight * (i - 1) < viewportTop
                ) {
                  currentSegment = i;
                }
              }
        
              // Entering the last element of a scrolling section.
              if (
                sectionBottom >= viewportBottom &&
                sectionTop + viewportHeight * (numberOfElements - 1) < viewportTop &&
                "fixed" !==
                  section
                    .find(".full-screen-scroll-section-element")
                    .last()
                    .css("position")
              ) {
                // Set correct element to be active.
                section
                  .find(".full-screen-scroll-section-element")
                  .removeClass("active");
                section
                  .find(".full-screen-scroll-section-element")
                  .last()
                  .addClass("active");
        
                // Set correct navigation link to be active.
                section.find(".full-screen-scroll-section-nav a").removeClass("active");
                section
                  .find(
                    '.full-screen-scroll-section-nav a[data-element="' +
                      section
                        .find(".full-screen-scroll-section-element")
                        .last()
                        .data("element") +
                      '"] '
                  )
                  .addClass("active");
        
                // When entering a scroll section all elements need to be positioned fixed and other values set depending on layout.
                section.find(".full-screen-scroll-section-element").css({
                  position: "fixed",
                  top: sectionTopOffset,
                  left: sectionLeftOffset,
                  padding: "0 " + sectionPadding,
                  width: sectionWidth
                });
        
                section
                  .find(".full-screen-scroll-section-element")
                  .last()
                  .css("display", "block");
              } else if (
                (sectionTop >= viewportTop ||
                  (0 === $(window).scrollTop() &&
                    section
                      .find(".full-screen-scroll-section-element")
                      .first()
                      .hasClass("active"))) &&
                "" !==
                  section
                    .find(".full-screen-scroll-section-element")
                    .first()
                    .css("position")
              ) {
                // First element is in viewport and it is further scrolled up.
        
                section
                  .find(".full-screen-scroll-section-element")
                  .removeClass("active");
                section
                  .find(".full-screen-scroll-section-element")
                  .first()
                  .addClass("active");
        
                section.find(".full-screen-scroll-section-element").css("position", "");
        
                section
                  .find(".full-screen-scroll-section-element")
                  .first()
                  .css("padding", "");
              } else if (
                0 < currentSegment &&
                !section
                  .children(":nth-child(" + currentSegment + ")")
                  .hasClass("active")
              ) {
                // Transition between individual elements.
        
                // Set correct element to be active.
                section
                  .find(".full-screen-scroll-section-element")
                  .removeClass("active");
                section
                  .children(":nth-child(" + currentSegment + ")")
                  .addClass("active");
        
                // Set correct navigation link to be active.
                section.find(".full-screen-scroll-section-nav a").removeClass("active");
                section
                  .find(
                    '.full-screen-scroll-section-nav a[data-element="' +
                      section
                        .children(":nth-child(" + currentSegment + ")")
                        .data("element") +
                      '"] '
                  )
                  .addClass("active");
              }
            }
          };
        })($);

	},
};
