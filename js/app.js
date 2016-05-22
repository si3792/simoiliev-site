app = angular.module('mainApp', ['smoothScroll', 'ngSanitize', 'snapscroll']);


app.controller('mainController', ['$scope', 'smoothScroll', function($scope, smoothScroll) {

  $scope.cardsData = [{
      title: "Jacobs University Bremen",
      subtitle: "BSc in Computer Science",
      description: "I am in my second year of studies, with expected graduation in 2017. For more information about Jacobs University Bremen, <a target='_blank' href='http://www.jacobs-university.de'>visit the official site</a>."
    }, {
      title: "Video Games Programming",
      subtitle: "Experience in Unity3D",
      description: "Making simple 2D games has been a hobby of mine for years. In my opinion, video game programming is a medium that teaches a lot about OOP and good software design, while being a very creative endeavour as well. <a href='#' scroll-to='liftoff-area'>Check out my latest project!</a>"
    }, {
      title: "Algorithmic Experience",
      subtitle: "Competitive programmer since 2008",
      description: "Participating in numerous national and international programming competitions has helped me build a solid foundation of problem solving, knowledge about different algorithms and the related complexity theory."
    }, {
      title: "Web development",
      subtitle: "Basic knowledge of front-end",
      description: "A course in web applications I took recently sparked my interest in it. I am familiar with HTML, CSS, JS; as well as frameworks like Angular, Bootstrap, Materialize, etc. You can check out the github repository for this website <a>here</a>"
    }, {
      title: "My CV",
      subtitle: "Full Curriculum Vitae",
      description: "For more information, you can <a>grab my full CV as a pdf.</a>"
    }

  ];


}]);

app.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      })}
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
