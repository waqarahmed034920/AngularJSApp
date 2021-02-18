

function MainController($scope, $http) {
    $scope.title = "My First Angular Application!";

    var onGetData = (response) => {
        $scope.users = response.data;
    }

    var onError = (response) => {
        $scope.error = "An error occured while trying to get data.";
    }

    $http.get('http://localhost:3000/users').then(onGetData, onError);

    $scope.onEditClick = (id) => {
        $http.get('http://localhost:3000/user/' + id)
        .then((response) => {
            $scope.user = response.data;
        }, onError);
    }

    $scope.onUpdateClick = () => {
        $http({
            url: 'http://localhost:3000/user',
            method: 'PUT',
            data: $scope.user
        })
        .then((response) => {
            $http.get('http://localhost:3000/users').then(onGetData, onError);
        }, onError);
    }

    $scope.onDeleteClick = () => {
        if (confirm('This would delete the user. Are you sure?')) {
            $http({
                url: 'http://localhost:3000/user/' + $scope.user.id,
                method: 'DELETE'
            })
            .then((response) => {
                $scope.user = {};
                $http.get('http://localhost:3000/users').then(onGetData, onError);
            }, onError);    
        }
    }

}
