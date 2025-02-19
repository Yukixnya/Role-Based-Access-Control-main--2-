app.factory('UserService', ['$http', function ($http) {
    const API_BASE_URL = '/api/user'; // Backend API endpoint

    return {
        getUsers: function () {
            return $http.get(API_BASE_URL);
        },
        addUser: function (user) {
            return $http.post(API_BASE_URL, user);
        },
    };
}]);
