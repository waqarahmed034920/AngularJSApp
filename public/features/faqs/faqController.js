var module = angular.module("ums");
module.controller("faqController", ["$scope", "faqFactory", faqcontroller]);

function faqcontroller($scope, faqFactory){
    const initializefaq  = () =>{
            $scope.faq = { 
            faq: '',
            answer: ''
        }
    }
    
    initializefaq();
    
    $scope.Save = () => {
        
        faqFactory.insertfaq($scope.faq)
        .then((res) => {
            alert('faq saved successfully.');
            initializefaq();
        })
    }
}
