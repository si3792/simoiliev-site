app = angular.module('mainApp', ['smoothScroll', 'ngSanitize']);


app.controller('overviewController', ['$scope', function($scope){

  $scope.cardsData = [
    {
      title: "Jacobs University Bremen",
      subtitle: "BSc in Computer Science",
      image: "../images/jacobs-logo.png",
      description: "I am in my second year of studies, with expected graduation in 2017. For more information about Jacobs University Bremen, <a>visit the official site</a>."
    },
    {
      title: "Video Games Programming",
      subtitle: "Experience in Unity3D",
      image: "../images/unity.png",
      description: "Making simple 2D games has been a hobby of mine for years. In my opinion, video game programming is a medium that teaches a lot about OOP and good software design, while being a very creative endeavour as well.  Check out two of my game projects here."
    },
    {
      title: "Algorithmic Experience",
      subtitle: "Competitive programmer since 2008",
      image: "../images/algorithms.png",
      description: "Participating in numerous national and international programming competitions has helped me build a good foundation of problem solving, knowledge about different algorithms and the related complexity theory."
    },
    {
      title: "Web development",
      subtitle: "Basic knowledge of front-end",
      image: "../images/fullstack.png",
      description: "A course in web applications I took recently sparked my interest in it. I am familiar with HTML, CSS, JS; as well as frameworks like Angular, Bootstrap, Materialize, etc. You can check out the github repository for this website Here."
    },
    {
      title: "My CV",
      subtitle: "Full Curriculum Vitae",
      image: "../images/cv.png",
      description: "For more information, you can grab my CV as a pdf <b>HERE.</b>"
    }

  ];


}]);



app.directive("overviewCard", function(){

  return {
    restrict: 'E',
    scope: { data: '=' },
    templateUrl: '../shared/overview-card.html'
  }
});
