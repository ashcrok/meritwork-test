/**
 * Created by radu on 22/09/14.
 */
dexterApp.controller('NewThreadCtrl', function ($scope, $rootScope, $http, $location, $cookies, $modalInstance) {

    $scope.input = {};
    $scope.disabled = false;

    $scope.tags = [
        { text: 'Tag1' },
        { text: 'Tag2' },
        { text: 'Tag3' }
    ];

    $scope.ok = function() {

        if(!$scope.input.title || !$scope.input.text) {
            $scope.error = 'true';
            $scope.errorMessage = 'The title or the body of the post cannot be blank.';
        } else {
            $scope.error = 'false';
            var title       = $scope.input.title;
            var text        = $scope.input.text;
            var sessionId   = $cookies.session;

            $http.post(
                apiUrl + 'threads/create.json',
                {
                    'title':        title,
                    'text':         text,
                    'perm':         '22',
                    'author':       sessionId
                }).success(function(data) {
                    if(data.success) {
                        $modalInstance.close(data);
                    } else {
                        $scope.error = 'true';
                        $scope.errorMessage = data.error;
                    }
                }).error(function(data, status) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(data);
                    console.log(status);
                });
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});