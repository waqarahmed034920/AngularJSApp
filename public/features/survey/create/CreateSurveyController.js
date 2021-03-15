var module = angular.module("ums");
module.controller("CreateSurveyController", ["$scope", "SurveyFactory", CreateSurveyController]);

function CreateSurveyController($scope, SurveyFactory) {

    $scope.survey = {
        name: '', description: '', startDate: '', endDate: '', 
        backButton: true, reviewable: true, internalOnly: true, 
        surveyFor: 'students' 
    }

    $scope.insert = () => {
        SurveyFactory.insertSurvey($scope.survey)
        .then((res) => {
            alert('Survey saved successfully.')
        })
    }

}