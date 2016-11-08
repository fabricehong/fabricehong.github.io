window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css";t.id="matchmediajs-test";i.parentNode.insertBefore(t,i);n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle;e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(t.styleSheet){t.styleSheet.cssText=i}else{t.textContent=i}return n.width==="1px"}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());
;
(function ($, drupalSettings) {
  "use strict";

  /**
   * Provides the plugin for paywall with drupalSettings configurations and user status.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.VideoDetail = {
    attach: function (context) {

      // STORE ACTIVE VIDEO SECTION ELEMENTS
      var $activeVideo = $('.active-video'),
          $activeVideoTitle = $activeVideo.find('.active-video-title'),
          $activeVideoDate = $activeVideo.find('.active-video-date'),
          $activeVideoDesc = $activeVideo.find('.active-video-desc'),
          $activeVideoIframe = $activeVideo.find('iframe'),
          $activeVideoImg = $activeVideo.find('.hidden-picture img'),
          $shareMail = $activeVideo.find('.share-email'),
          $shareFacebook = $activeVideo.find('.share-facebook'),
          $shareTwitter = $activeVideo.find('.share-twitter');

        $(".related-video-link").click(function() {

          if (!$activeVideo.length) {
            // We go to that video page
            return true;
          }

          // Store thumb video info
          var clickedVideoTitle = $(this).find('.related-video-title').html(),
              clickedVideoUrl = $(this).attr('data-url'),
              clickedVideoDate = $(this).find('.related-video-date').html(),
              //clickedVideoDuration = $(this).find('.video-duration').html(),    NOT USED FOR NOW
              clickedVideoDesc = $(this).attr('data-desc'),  //remove html tags
              clickedVideoImg = $(this).find('figure.picture img').attr('src'),
              clickedVideoPageUrl = $(this).attr('data-pageurl'),
              clickedVideoShareEmail = 'mailto:?subject=Le%20Temps%20%7C%20Partage%20%C3%A0%20un%20ami&body=Bonjour%2C%0D%0AUn%20ami%20vous%20recommande%20un%20article%20du%20Temps%0D%0A%0D%0A' + clickedVideoTitle + '.%0D%0A' + clickedVideoPageUrl + '%0D%0A%0D%0ACordialement%2C%0D%0ALe%20Temps',
              clickedVideoShareFaceBook = 'https://www.facebook.com/sharer.php?u=' + clickedVideoPageUrl + '?utm_source=facebook&utm_medium=share&utm_campaign=video'+ '&display=popup&ref=plugin&src=share_button',
              clickedVideoShareTweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(clickedVideoTitle) + '%0D%0A'+ encodeURIComponent(clickedVideoPageUrl + '?utm_source=twitter&utm_medium=share&utm_campaign=video') + '%20&via=letemps',

          // Store main video info
              mainVideoTitle = $('.active-video').find('.active-video-title').html(),
              mainVideoUrl = $('.active-video').attr('data-url') + '?&theme=dark&autohide=2&cc_load_policy=1&showinfo=0&autoplay=1',
              mainVideoDate = $('.active-video').find('.active-video-date').html(),
              //clickedVideoDuration = $(this).find('.video-duration').html(),    NOT USED FOR NOW
              mainVideoDesc = $('.active-video').find('.active-video-desc').html(),  //remove html tags
              mainVideoImg = $activeVideoImg.attr('src'),
              mainVideoPageUrl = $('.active-video').attr('data-pageurl');


          // get youtube id
          var match = clickedVideoUrl.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
          var youtube_id = (match && match[1].length == 11) ? match[1] : false;

          if (!youtube_id) {
            return true;
          }

          // LOAD INFO INTO THUMB SECTION
          $(this).find('.related-video-title').html(mainVideoTitle);
          $(this).find('.related-video-date').html(mainVideoDate);
          $(this).attr('data-desc', $activeVideoDesc.html());
          $(this).find('img').attr('src', mainVideoImg);
          $(this).attr('data-url', $activeVideoIframe.attr('src').replace('?&theme=dark&autohide=2&cc_load_policy=1&showinfo=0&autoplay=1',''));
          $(this).attr('data-pageurl', mainVideoPageUrl);

          // LOAD INFO IN ACTIVE SECTION
          $activeVideoTitle.html(clickedVideoTitle);
          $activeVideoDesc.html(clickedVideoDesc);
          $activeVideoIframe.attr('src', 'https://www.youtube.com/embed/' + youtube_id + '?&theme=dark&autohide=2&cc_load_policy=1&showinfo=0&autoplay=1');
          $activeVideoDate.html(clickedVideoDate);
          //$activeVideoImg.attr('data-img', clickedVideoImg);
          $activeVideoImg.attr('src', clickedVideoImg);
          $activeVideo.attr('data-pageurl', clickedVideoPageUrl);
          $shareMail.attr('href', clickedVideoShareEmail);
          $shareFacebook.attr('href', clickedVideoShareFaceBook);
          $shareTwitter.attr('href', clickedVideoShareTweet);

          // SCROLL BACK TO PLAYER
          $('html, body').animate({
            scrollTop:$('.bg-mine-shaft').offset().top -30
          }, 500);

          // SCROLL BACK TO VIDEO DESC TOP
          $('.active-video .active-video-description-container').animate({
            scrollTop: 0
          }, 500);

           // HOP SWISS
           return false;
        });
    }};
}) (jQuery, drupalSettings);
;
(function ($, Drupal) {
  // The class might be on the wrapping li or the a tag itself, support both.
  $('a.menu-link-login, .menu-link-login a').each(function () {
    var newHref = $(this).attr('href').replace(/([?&]destination=)[^&]*/, '$1' + window.location.pathname);
    $(this).attr('href', newHref);
  })
})(jQuery, Drupal);
;
