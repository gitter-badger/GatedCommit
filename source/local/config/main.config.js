/*globals app:true*/
app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    'use strict';
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('Home', {
            url: '/',
            views: {
                Main: {
                    templateUrl: 'partials/home.html'
                }
            }
        })
        .state('About', {
            url: '/About',
            views: {
                Main: {
                    templateUrl: 'partials/about.html'
                }
            }
        })
        .state('Register', {
            url: '/Register',
            views: {
                Main: {
                    templateUrl: 'partials/register.html'
                }
            }
        });
}]);