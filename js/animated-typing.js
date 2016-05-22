$(function() {

/*
      // Disable animated typing on mobile devices
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(".typing").html('Computer Science Major');
      } else { }
*/

        $(".typing").typed({
          strings: ['Computer <br> ^100 Science <br> ^100 Major'],
          typeSpeed: 1.5,
          showCursor: false,
          startDelay: 4250
        });


    });
