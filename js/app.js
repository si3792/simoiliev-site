app = angular.module('mainApp', ['smoothScroll', 'ngSanitize', 'snapscroll']);


app.controller('mainController', ['$scope', '$document', '$window', '$interval', '$timeout', 'preloader', 'smoothScroll', function($scope, $document, $window, $interval, $timeout, preloader, smoothScroll) {

    $scope.cardsData = [{
            title: "Web development",
            subtitle: "Frontend and Backend",
            description: "I have experience using Django REST framework for developing backend server applications. " +
                "I am also familar with HTML, CSS, JS on the frontend; as well as Angular, Bootstrap and tools like npm and Karma. " +
                "<a href='#' scroll-to='usersystem-area'> <b>Check out my latest web project. </b> </a>"
        }, {
            title: "Video Games Programming",
            subtitle: "Unity3D makes me happy",
            description: "I made my first video game when I was 11. Over the years I've been to a few game jams and worked on video games as a hobby." +
                " In my opinion, video game programming is a medium that teaches a lot about OOP and good software design, while being a very <i>creative</i> endeavour as well."
        }, {
            title: "Algorithmic Experience",
            subtitle: "Competitive programmer since 2008",
            description: "Participating in numerous programming competitions has helped me build a foundation of problem solving." +
                " <ul><li> I represented Jacobs University Bremen at <a href='http://www.nwerc.eu/'><b>NWERC 2014 and 2015 in Linköping, Sweden.</b></a> </li> </ul>"
        }, {
            title: "About me",
            subtitle: "Interests and preferences",
            description: "<ul> <li> I am an avid <b><a target='_blank' href='http://simoiliev.me/images/arch-linux.png'>linux user</a></b> </li>" +
                "<li> ... interested in networking and networking security</li>" +
                "<li> <b>Python</b> has been my favourite language of late </li>" +
                "<li> ... though C++ is what I've written the most code in </li>" +
                "<li> ... and I try to <a href='https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/'><b>stay away from PHP.</b> </a></li>" +
                "</ul>"

        }, {
            title: "My CV",
            subtitle: "Full Curriculum Vitae",
            description: "<b><p>For more information, you can <a href='http://simoiliev.me/cv_Simo.pdf' target='_blank'>grab my full CV as a pdf.</a></p></b><br>" +
                "<i>Also, if you are wondering about the background, this is a shot I took of my beautiful hometown, <a target='_blank' href='https://en.wikipedia.org/wiki/Plovdiv'><b>Plovdiv</b></a>.</i>"
        }

    ];

    /* Images for preloading */
    $scope.imageLocations = [
        "../images/icough-1.png",
        "../images/icough-2.png",
        "../images/icough-3.png",
        "../images/icough-4.png"
    ];
    preloader.preloadImages($scope.imageLocations)

    $scope.icoughClassBacks = [
        'icough-back-1',
        'icough-back-2',
        'icough-back-3',
        'icough-back-4'
    ];
    $scope.backsIndex = 0;
    /**
     *    Switch icough backgrounds
     */
    $scope.changeBackground = function() {
        var el = angular.element(document.querySelector('#icough-area'));
        var oldIndex = $scope.backsIndex;
        $scope.backsIndex = ($scope.backsIndex + $scope.icoughClassBacks.length + 1) % $scope.icoughClassBacks.length;

        el.addClass($scope.icoughClassBacks[$scope.backsIndex]);
        el.removeClass($scope.icoughClassBacks[oldIndex]);


    };
    $scope.changeBackground();
    $interval($scope.changeBackground, 1700);

    $scope.footerText = '';
    $scope.changeFooterText = function(newtext) {
        $scope.footerText = newtext;
    };


    $scope.SNAP_DELTA_MAX = window.innerHeight / 3;
    $scope.SNAP_DELTA_MIN = 2;
    $scope.SNAP_TIME_DELTA = 200;
    $scope.snapping = false; // True during snapping
    $scope.curPos = 0;
    $scope.SNAPPING_ENABLED = true;
    $scope.SNAPPING_ENABLED_MIN_WIDTH = 1280;

    $scope.scrollTo = function(position) {
        var element = document.getElementById(position);
        smoothScroll(element, {
            'duration': 700
        });
    };

    $document.on('scroll', function() {
        // do your things like logging the Y-axis

        $scope.curPos = $window.scrollY;

        if(!$scope.snapping) {
          $scope.lastScrolled = moment();
        }
        // console.log(curPos);
    });

    $scope.triggerSnapping = function() {
        if(!$scope.SNAPPING_ENABLED)return;
        if ($scope.snapping) return;
        if((moment() - $scope.lastScrolled) < $scope.SNAP_TIME_DELTA)return;

        for (var area in $scope.areasY) {
            var obj = $scope.areasY[area];
            if (Math.abs($scope.curPos - obj.position) < $scope.SNAP_DELTA_MAX && Math.abs($scope.curPos - obj.position) > $scope.SNAP_DELTA_MIN) {
                console.log('Snapping to ' + area); //
                $scope.scrollTo(area);
                $scope.snapping = true;
                $scope.disableScroll();
                $timeout(function() {
                    $scope.enableScroll();
                    $scope.snapping = false;
                }, 700);
            }
        }
    };
    $interval($scope.triggerSnapping, 50);


    $scope.updateAreasY = function() {

        if(window.innerWidth < $scope.SNAPPING_ENABLED_MIN_WIDTH)$scope.SNAPPING_ENABLED = false;
        else $scope.SNAPPING_ENABLED = true;

        $scope.areasY = {
            'intro-area': {
                'position': $('#intro-area').offset().top
            },
            'overview-area': {
                'position': $('#overview-area').offset().top
            },
            'liftoff-area': {
                'position': $('#liftoff-area').offset().top
            },
            'usersystem-area': {
                'position': $('#usersystem-area').offset().top
            },
            'icough-area': {
                'position': $('#icough-area').offset().top
            },
            'footer-area': {
                'position': $('#footer-area').offset().top
            }
        };

        //console.log($scope.areasY);
    };
    $scope.updateAreasY();
    $interval($scope.updateAreasY, 1000);


    // LOGIC For temporary scroll disabling
    var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    $scope.disableScroll = function() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    $scope.enableScroll = function() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

}]);

app.directive('compile', ['$compile', function($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                return scope.$eval(attrs.compile);
            },
            function(value) {
                element.html(value);
                $compile(element.contents())(scope);
            })
    }
}]);


app.directive("overviewCard", function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: '../shared/overview-card.html'
    }
});
