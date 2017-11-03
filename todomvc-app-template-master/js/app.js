(function (angular) {
	'use strict';


	// // 1. 为应用程序创建一个模块，用来管理界面的结构
	// var myApp = angular.module('app', ['ngRoute', 'app.controllers.main']);
	//
	// // 路由配置
	// myApp.config(['$routeProvider', function($routeProvider) {
	// 	$routeProvider
	// 	// /asdasda {status:asdasda}
	// 		.when('/:status?', {
	// 			controller: 'MainController',
	// 			templateUrl: 'template'
	// 		})
	// 		.otherwise({ redirectTo: '/' });
	// }]);


	var app = angular.module('app', ['ngRoute']);

	app.config(function ($routeProvider) {
		$routeProvider
			.when('/:url?', {
				templateUrl: 'template',
				controller: 'Ctrl'
			})
			.otherwise({redirectTo: '/'})
	})

	app.controller('Ctrl', function ($scope, $window, $location, $routeParams) {
		var storage = $window.localStorage;
		$scope.data = storage['myData'] ? JSON.parse(storage['myData']) : [
			{
				text: 'javascript',
				isCompleted: false,
				isEditing: false,
				id: 0
			}, {
				text: 'jquery',
				isCompleted: false,
				isEditing: false,
				id: 1
			}];
		$scope.toggle = function () {
			localSave();
		};
		var localSave = function () {
			storage['myData'] = JSON.stringify($scope.data);
		};
		$scope.addList = function (e) {
			if (e.code === 'Enter' && $scope.msg !== ' ' && $scope.msg !== undefined) {
				var item = {};
				item.text = $scope.msg;
				item.id = getId();
				item.isCompleted = false;
				item.isEditing = false;
				$scope.data.push(item);
				// console.log($scope.data);
				$scope.msg = ' ';
			}
			localSave();
		};
		$scope.delClick = function (n) {
			$scope.data.splice(n, 1);
			localSave();

		};
		//如果传入的参数是id
		// $scope.click = function (id) {
		// 	for(var i =0;i<$scope.data.length;i++){
		// 		if ($scope.data[i].id === id){
		// 			$scope.data.splice(i,1);
		// 		}
		// 	}
		// }
		//用lodash. _remove
		// $scope.click = function (item) {
		// 	_.remove($scope.data,function (n) {
		// 		return n === item;
		// 	})
		// }
		$scope.dbclick = function (item) {
			item.isEditing = true;
			// item.text = '';

		};
		$scope.editClick = function (e, item) {
			if (e.code === 'Enter') {
				item.isEditing = false;
			}
			localSave();
		};
		$scope.blur = function (item) {
			item.isEditing = false;
		};
		$scope.allClear = function () {
			// var result = [];
			for (var i = 0; i < $scope.data.length; i++) {
				// if ($scope.data[i].isCompleted === false){
				// 	result.push($scope.data[i])
				// }
				if ($scope.data[i].isCompleted === true) {
					$scope.data.splice(i, 1);
					i--;
				}
			}
			localSave();
			// $scope.data = result;
		};
		$scope.toggleAll = function () {
			for (var i = 0; i < $scope.data.length; i++) {
				$scope.data[i].isCompleted = $scope.data[i].isCompleted === true ? false : true;
			}
			localSave();
		};
		$scope.selector = {};

		// $scope.completeClick = function () {
		// 	$scope.selector = {isCompleted : true};
		// };


		//通过H5的$location中的$$hash 判断事件什么时候发生变化
		// $scope.$location = $location;
		// // console.log($location);
		// $scope.isSelected = false;
		// $scope.$watch('$location.$$hash',function (newVal) {
		// 	switch (newVal){
		// 		case '/active':
		// 			$scope.selector = {isCompleted : false};
		// 			$scope.isSelected = true;
		// 		break;
		// 		case '/completed':
		// 			$scope.selector = {isCompleted : true};
		// 			$scope.isSelected = true;
		// 		break;
		// 		default:
		// 			$scope.selector = {};
		// 	}
		// });
		var url = $routeParams.url;
		switch (url) {
			case 'active':
				$scope.selector = {isCompleted: false};
				break;
			case 'completed':
				$scope.selector = {isCompleted: true};
				break;
			case '':
				$scope.selector = {};
				break;
			default:
				$scope.selector = {};
		}


		$scope.getItemsNum = function () {
			var n = 0;
			for (var i = 0; i < $scope.data.length; i++) {
				if ($scope.data[i].isCompleted === false) {
					n++;
				}
			}
			;
			return n;
		}

	})

	function getId() {
		var id = new Date().getTime();
		return id;
	}
})(angular);
