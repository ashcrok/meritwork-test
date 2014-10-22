/**
 * Created by ashcrok on 10/21/2014.
 */
myApp.controller('MainCtrl', function ($scope, $http, $window, $location) {

    $scope.sidebarToggled       = false;

    $scope.sidebarToggle = function($event) {
        $event.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $scope.sidebarToggled = !$scope.sidebarToggled;
    };


    var user1 = {
        'avatar'    : 'https://en.opensuse.org/images/0/0b/Icon-user.png',
        'service'   : 'Web Developer',
        'username'  : 'Mihai Pricop',
        'type'      : '1'
    };

    var user2 = {
        'avatar'    : 'https://en.opensuse.org/images/0/0b/Icon-user.png',
        'service'   : 'Java Developer',
        'username'  : 'Mihai Pricop',
        'type'      : '1'
    };

    var user3 = {
        'avatar'    : 'https://en.opensuse.org/images/0/0b/Icon-user.png',
        'service'   : 'Tester',
        'username'  : 'Mihai Pricop',
        'type'      : '1'
    };

    var user4 = {
        'avatar'    : 'https://en.opensuse.org/images/0/0b/Icon-user.png',
        'service'   : 'Software Engineer',
        'username'  : 'Alexandru Alex',
        'type'      : '2'
    };

    var users = [user1,user2,user3,user4];

    for (user in users) {
        users[user]['type'] = getGetOrdinal(parseInt(users[user]['type']));
    }

    $scope.users = users;


});