(function (window,angular,_) {

	var app = angular.module('app', ['ngRoute','app.controllers.main']);
		// app.controller('MainController',function(){})
	app.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
			.when('/:url',{
				templateUrl:'template',
				controller:'AppCtrl'
			})
			.otherwise({
				redirectTo :'/a',
			})
	}]);



})(window,angular,_);
