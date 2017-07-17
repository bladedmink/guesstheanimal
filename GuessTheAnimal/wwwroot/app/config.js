'use strict';

(function (app) {

    var config = ["$stateProvider", "$urlRouterProvider", "$httpProvider", "$locationProvider", "NotificationProvider",

        function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, NotificationProvider) {

            // default page
            $urlRouterProvider.otherwise("/s1/home");

            $locationProvider.hashPrefix(''); //Remove the ! in URL

            NotificationProvider.setOptions({
                delay: 5000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top'
            });


            $stateProvider
                .state('s1', {
                    abstract: true,
                    url: "/s1",
                    templateUrl: "app/pages/_layout/layout.html",
                    controller: "MainController as vm",
                })
                // Game
                .state('s1.game', {
                    url: "/home",
                    templateUrl: "App/pages/game/GameView.html",
                    controller: "GameController as vm",
                    data: { pageTitle: "Guess the Animal" }
                });



        }];

    app.config(config)
        .run(["$rootScope", "$state",

            function ($rootScope, $state) {

                $rootScope.$state = $state;

            }]);


}(angular.module(clientHtmlAppName)));