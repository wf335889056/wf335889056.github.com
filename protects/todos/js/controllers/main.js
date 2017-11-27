(function (angular) {
	angular.module('app.controllers.main', ['app.service.main'])
		.controller('AppCtrl', function ($scope, $routeParams,MainService) {
			$scope.texts = MainService.getText();

			$scope.addText = function(e,text){
				var keycode = window.event ? e.keyCode : e.which;
				if(keycode==13 && $scope.text !== '' && $scope.text !== undefined){
					MainService.addText(text);
					$scope.text = '';
				}
			};
			// $scope.delete = function (index) {
			// 	MainService.delete(index);
			// }
			$scope.delete = MainService.delete;

			$scope.check = MainService.check;

			$scope.changeText = MainService.changeText;

			$scope.save = MainService.save;

			$scope.saveNow = MainService.saveNow;

			$scope.clearCompleted = MainService.clearCompleted;


			if($routeParams.url == 'active'){
				$scope.title = '这是a页面';
				$scope.find = {isComplated:false};
			}else if($routeParams.url == 'completed'){
				$scope.find = {isComplated:true};
			}else{
				$scope.find = {};
			}

			$scope.count = MainService.count;

			$scope.checkAll = MainService.checkAll;




		})
})(angular);

