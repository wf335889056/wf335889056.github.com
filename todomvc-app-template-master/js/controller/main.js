(function (angular) {

	'use strict';

	// 独立的模块
	var controllers = angular.module('app.controllers.main', ['app.services.main']);

	controllers.controller('MainController', [
		'$scope',
		'$routeParams',
		'$route',
		'MainService',
		function($scope, $routeParams, $route, MainService) {

			// 文本框需要一个模型，为了拿到文本输入的值
			$scope.msg = '';

			// 任务列表也需要一个
			// 每一个任务的结构 { id: 1, text: '学习', completed: true }
			$scope.data = MainService.get();

			// 添加todo
			$scope.addList = function(e) {
				if (e.code === 'Enter' && $scope.msg !== ' ' && $scope.msg !== undefined){
					// 参数校验 界面逻辑
					if (!$scope.msg) {
						return;
					}
					MainService.add($scope.msg);
					// 清空文本框
					$scope.msg = '';
				}
			};

			// 处理删除
			$scope.delClick =  MainService.remove; // === function(index) {
			//   // 此处是界面逻辑
			//   MainService.remove(index);
			 // };

			// 清空已完成
			$scope.allClear = function() {
				var newTodos = MainService.clearCompleted();
				$scope.todos = newTodos;
			};

			// 当前编辑哪个元素
			$scope.dbClick = function() {
				// 界面逻辑
				MainService.existEditing();
			};
			$scope.editClick = function(e) {
				MainService.existEditing(e);
				this.save;
			};

			$scope.toggleAll = MainService.toggleAll;

			$scope.toggle = function() {
				MainService.save();
			}

			// 状态筛选
			$scope.selector = {}; // {} {completed:true} {completed:false}
			// 取路由中匹配出来的数据
			var status = $routeParams.status;
			switch (status) {
				case 'active':
					$scope.selector = { completed: false };
					break;
				case 'completed':
					$scope.selector = { completed: true };
					break;
				default:
					$route.updateParams({ status: '' });
					$scope.selector = {};
					break;
			}

			// 自定义比较函数, 默认filter过滤器使用的是模糊匹配
			$scope.equalCompare = function(source, target) {
				return source === target;
			};

			//未完成的数量
			$scope.getItemsNum = MainService.getNum;

		}
	]);
})(angular)
