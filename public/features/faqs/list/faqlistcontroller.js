// const { data } = require("jquery");

var module = angular.module('ums');
module.controller("faqlistcontroller", ["$scope","$location",  "faqFactory", faqlstController]);


function  faqlstController ($scope,$location , faqFactory){
    
    faqFactory. getAllFaq()
        .then((data) => {
            $scope.faqs = data;

        }, (err) => {
            $scope.error="An error occured.";
        });

        $scope.onAddfaq = (faqId) => {
            $location.path('/faqs' + faqId);
        }
    
        
}