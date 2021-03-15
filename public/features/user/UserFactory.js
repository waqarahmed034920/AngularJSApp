// reterieve the application here.
var module = angular.module("ums");
module.factory("UserFactory", ["$http", UserFactory]);

// object return karey ga.
function UserFactory($http) {

    var _getAllUsers = () => {
        var p = $http.get('http://localhost:3000/users')
            .then((response) => {
                return response.data;
            }, (response) => {
                return "An error occured while calling /users api";
            });
        return p;

    }

    var _getUserById = (id) => {
        var p = $http.get('http://localhost:3000/user/' + id)
                .then((response) => {
                    return response.data;
                }, (response) => {
                    return "An error occured while trying user by id";
                })
        return p;
    }


    var _updateUser = (user) => {
        return $http({
            url: 'http://localhost:3000/user',
            method: 'PUT',
            data: user
        })
        .then((response) => {
            return "success."
        }, (error) => {
            return "An error occured while updating user";
        });

    }

    var _onDeleteClick = (id) =>{
        return $http.delete('http:/user/' + id)
        .then((response) => {
            return true;
        });
    }

    return {
        getAllUsers: _getAllUsers,
        getUserById: _getUserById,
        updateUser: _updateUser,
        onDeleteClick:_onDeleteClick
    };
}
