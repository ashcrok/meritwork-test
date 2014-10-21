/**
 * Created by ashcrok on 10/17/2014.
 */
dexterApp.controller('NewSurveyCtrl', function($http, $scope, $modalInstance, $cookies) {

    $scope.input = {};
    $scope.inputSelect = [];
    $scope.question = {};
    $scope.isElaborated = false;

    /*var answers1 = {
        'option1' : 'da',
        'option2' : 'nu'
    };

    var answers2 = {
        'option1' : 'da',
        'option2' : 'nu'
    };

    var answers3 = {
        'option1' : 'da',
        'option2' : 'nu'
    };

    var question1 = {
        'title' : 'este vara?',
        'answers' : answers1
    }

    var question2 = {
        'title' : 'fumezi iarba?',
        'answers' : answers2
    }

    var question3 = {
        'title' : 'mesteci guma?',
        'answers' : answers3
    }

    $scope.inputSelect = [question1, question2, question3];*/


    $scope.elaborate = function(question) {
        $scope.question = question;
        $scope.isElaborated = true;
    };

    $scope.add_question = function() {
        var answers = {}

        var newQuestion = {
            'title': '',
            'answers': answers
        }

        $scope.inputSelect.push(newQuestion);

        $scope.elaborate(newQuestion);
    };

    $scope.add_answer = function(question) {
        question.answers["option3"] = "option";
    };

    $scope.submit = function() {
        console.log($scope.inputSelect);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };



});