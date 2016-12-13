app = angular.module('mainApp', ['smoothScroll', 'ngSanitize', 'snapscroll']);


app.controller('mainController', ['$scope', '$interval', 'preloader', 'smoothScroll', function($scope, $interval, preloader, smoothScroll) {

    $scope.cardsData = [{
            title: "Web development",
            subtitle: "Frontend and Backend",
            description: "I have experience using Django REST framework for developing backend server applications. " +
                "I am also familar with HTML, CSS, JS on the frontend; as well as Angular, Bootstrap and tools like npm and Karma. " +
                " You can check out the <a href='https://github.com/si3792/drf-angular-user-system'><b>github repository for my latest web project.</b></a>"
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
    preloader.preloadImages( $scope.imageLocations )

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
