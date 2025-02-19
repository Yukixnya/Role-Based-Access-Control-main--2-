app.controller('UserController', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.users = [];
    $scope.newUser = {};

    // Load users from the server
    const loadUsers = function () {
        UserService.getUsers()
            .then(function (response) {
                $scope.users = response.data;
            })
            .catch(function (error) {
                console.error('Error fetching users:', error);
            });
    };

    // Add a new user
    $scope.addUser = function () {
        if ($scope.newUser.name && $scope.newUser.email) {
            UserService.addUser($scope.newUser)
                .then(function (response) {
                    $scope.users.push(response.data);
                    $scope.newUser = {};
                })
                .catch(function (error) {
                    console.error('Error adding user:', error);
                });
        }
    };

    // Initialize
    loadUsers();
}]);
