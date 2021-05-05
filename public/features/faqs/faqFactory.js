var module = angular.module("ums");
module.factory("faqFactory", ["$http", faqFactory]);

function faqFactory($http){

    var _getAllFaqs  =() =>{
        return $http.get('http://localhost:3000/faqs')
            .then((res) => {
                return res.data;
            }, (response) => {
                return "An error occured while calling /user api"
            });
    }

    var _insertfaq = (faq) => {
        return $http({
            url:'http://localhost:3000/faq',
            method:'post',
            data:faq
        })
        .then((res) => {
            return "success."
        } , (error) => {
            return "unsuccess"
        });
    }

    var _updatefaq = (faq) =>{
        return $http({
                url: 'http://localhost:3000/faq',
                method: 'PUT',
                data: faq
            })
             .then((res) =>{
                 return "success"
             }, (error) => {
                return "An error occured while updating user"
             })
    }
    
    return {
        insertfaq:_insertfaq,
        updatefaq:_updatefaq,
        getAllFaq:_getAllFaqs
    };
    
}