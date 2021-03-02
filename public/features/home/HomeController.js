var module = angular.module("ums");

module.controller("HomeController", ["$scope", HomeController])

function HomeController($scope) {
    $scope.message = "Hi from home controller!";
}