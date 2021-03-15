// creating angular application ums. (User Management System)
var app = angular.module("ums", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'features/home/HomeController.html',
            controller: 'HomeController'
        })
        .when('/users', {
            templateUrl: 'features/user/UserController.html',
            controller: 'UserController'
        })
        .when('/create-survey', {
            templateUrl: 'features/survey/create/CreateSurvey.html',
            controller: 'CreateSurveyController'
        })
        .when('/survey-list', {
            templateUrl: 'features/survey/list/SurveyList.html',
            controller: 'SurveyListController'
        })
        .when('/add-question/:Id', {
            templateUrl: 'features/survey/addQuestion/addQuestion.html',
            controller: 'addQuestionController'
        })
        .otherwise('/');
})
