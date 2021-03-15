var module = angular.module('ums');
module.controller("SurveyListController", ["$scope", "$location", "SurveyFactory", SurveyListController]);

function SurveyListController($scope, $location, SurveyFactory) {

    SurveyFactory.getAllSurvey()
        .then((data) => {
            $scope.surveys = data;
        }, (err) => {
            $scope.error = "An error occured. " + JSON.stringify(err);
        });

        $scope.onAddQuestions = (surveyId) => {
            $location.path('/add-question/' + surveyId);
        }
}