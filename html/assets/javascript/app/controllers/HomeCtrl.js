/**
 * Created by ashcrok(BO$$) on 8/15/14.
 */
dexterApp.controller('HomeCtrl', function ($scope, $http, $cookies) {
    $scope.sidebarCategory = 'main';
    $scope.$emit('select_sidebar_cat', $scope.sidebarCategory);

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];

    slides.push({
        image: 'http://www.travelsworlds.com/wp-content/uploads/2014/03/arizona-city-lightsheader-images-my-side-door-esu7vuvs.gif',
        text: 'City panorama'
    });

    slides.push({
        image: 'http://crosscutbay.com/files/2013/07/scratching-surface-1200x270.jpg',
        text: 'Into the North'
    });

    slides.push({
        image: 'http://thebeirnegroup.com/assets/headers-phone1-1200x270.jpg',
        text: 'Phone Company'
    });
});