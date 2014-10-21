/**
 * Created by ashcrok on 10/21/2014.
 */
myApp.controller('MainCtrl', function ($scope, $rootScope, $window, $location) {

    var user1 = {
        'name'      : 'vasile',
        'avatar'    : 'http://png-4.findicons.com/files/icons/2443/bunch_of_cool_bluish_icons/512/user.png',
        'service'   : 'programmer',
        'degree'    : '2nd'
    }

    var user2 = {
        'name'      : 'andrei',
        'avatar'    : 'http://png-4.findicons.com/files/icons/2443/bunch_of_cool_bluish_icons/512/user.png',
        'service'   : 'programmer',
        'degree'    : '1st'
    }

    var user3 = {
        'name'      : 'radu',
        'avatar'    : 'http://png-4.findicons.com/files/icons/2443/bunch_of_cool_bluish_icons/512/user.png',
        'service'   : 'programmer',
        'degree'    : '4th'
    }

    $scope.users = [user1, user2, user3];

});