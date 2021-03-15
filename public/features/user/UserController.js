
// adding controller in this app (UMS)
var module = angular.module("ums");
module.controller("UserController", ["$scope", "UserFactory", UserController]);

function UserController($scope, UserFactory) {
    $scope.title = "My First Angular Application!";

    var onGetData = (data) => {
        $scope.users = data;
    }

    var onError = (response) => {
        $scope.error = "An error occured while trying to get data.";
    }

        UserFactory.getAllUsers()
            .then(onGetData, onError);

        $scope.onEditClick = (id) => {
            UserFactory.getUserById(id)
                .then((data) => {
                    $scope.user = data;
                }, onError);
        }


    $scope.onUpdateClick = () => {
        UserFactory.updateUser($scope.user)
            .then(() => {
                UserFactory.getAllUsers().then(onGetData, onError);
            });
    }

    $scope.onDeleteClick = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            UserFactory.onDeleteClick(id)
                .then((result) => {
                    alert('record deleted successfully.');
                    UserFactory.getAllUsers().then(onGetData, onError);
                });
        }

    }
}
