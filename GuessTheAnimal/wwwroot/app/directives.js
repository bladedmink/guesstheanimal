(function (app) {

    /**
     * pageTitle - Directive for set Page title - mata title
     */
    var pageTitle = ["$rootScope", "$timeout", function ($rootScope, $timeout) {
        return {
            link: function (scope, element) {
                var listener = function (event, toState, toParams, fromState, fromParams) {

                    var title = 'Guess the Animal | Welcome';
                    // Create your own title pattern
                    if (toState.data && toState.data.pageTitle) title = 'Guess the Animal | ' + toState.data.pageTitle;
                    $timeout(function () {
                        element.text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        }
    }];


    

    /**
     * fullScroll - Directive for slimScroll with 100%
     */
    var fullScroll = ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                $timeout(function () {
                    element.slimscroll({
                        height: '100%',
                        railOpacity: 0.9
                    });

                });
            }
        };
    }];
    
    
    /**
     * loading - displays a spinner while the panel is loading
     */
    var isSectionLoading = function () {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: '/app/directives/isSectionLoading.html'
        };
    };

    app
        //.factory()
        .directive('pageTitle', pageTitle)
        .directive('isSectionLoading', isSectionLoading);

}(angular.module(clientHtmlAppName)));