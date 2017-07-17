(function (app) {

    var MainController = ["$rootScope", "$scope", "$window",

        function ($rootScope, $scope, $window) {

            var vm = this;

            vm.userDetails = {};

            // ---------------------------
            // Initialize
            // ---------------------------
            function init() {
                console.log("MainController Initialised");
            }

            // initialize
            init();

        }];

    app.controller("MainController", MainController);

}(angular.module(clientHtmlAppName)));