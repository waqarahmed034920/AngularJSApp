var module = angular.module('ums');
module.controller("addQuestionController", ["$scope", "$routeParams", "SurveyFactory", addQuestionController]);

function addQuestionController($scope, $routeParams, SurveyFactory) {
    const surveyId = $routeParams.Id;
    const initializeQuestion = () => {
        $scope.question = {
            surveyId: surveyId,
            question: '',
            options: []
        }
    }

    initializeQuestion();

    $scope.addOption = () => {
        $scope.question.options.push({
            text: '', type: ''
        })
    }

    $scope.deleteOption = (index) => {
        $scope.question.options.splice(index, 1);
    }

    $scope.saveQuestion = () => {
        SurveyFactory.insertQuestion($scope.question)
            .then((res) => {
                initializeQuestion();
            })
    }

}

