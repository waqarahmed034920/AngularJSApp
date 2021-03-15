var module = angular.module("ums");
module.factory("SurveyFactory", ["$http", SurveyFactory]);

function SurveyFactory($http) {
    // private
    var _getAllSurvey = () => {
        return $http.get('http://localhost:3000/surveys')
            .then((res) => {
                return res.data;
            }, (response) => {
                return "An error occured while calling /user api";
            });
    }

    // private
    var _getSurveyById = (id) => {
        return $http.get('http://localhost:3000/survey/' + id)
            .then((res) => {
                return res.data;
            }, (response) => {
                return "An error occured while trying user by id";
            })
    }

    // private
    var _updateSurvey = (survey) => {
        return $http({
            url: 'http://localhost:3000/survey',
            method: 'PUT',
            data: survey
        })
            .then((res) => {
                return "success."
            }, (error) => {
                return "An error occured while updating user";
            });
    }

    // private
    var _insertSurvey = (survey) => {
        return $http({
            url: 'http://localhost:3000/survey',
            method: 'post',
            data: survey
        })
            .then((res) => {
                return "success."
            }, (error) => {
                return "un success"
            });
    }

    var _insertQuestion =(question) => {
        return $http({
            url:'http://localhost:3000/question',
            method: 'post',
            data: question
        })
        .then((res) =>{
            return "success."

        }, (error) =>{
            return "un success"
        });
    }

    // public
    return {
        getAllSurvey: _getAllSurvey,
        getSurveyById: _getSurveyById,
        updateSurvey: _updateSurvey,
        insertSurvey: _insertSurvey,
        insertQuestion:_insertQuestion
    };


}