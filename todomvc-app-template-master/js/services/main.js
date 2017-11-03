(function (angular) {

//	注册一个新模块
	angular.module('app.services.main', [])
		.service('MainService', ['$window', function($window) {
			var storage = $window.localStorage;
			var todos = storage['myData'] ? JSON.parse(storage['myData']) : [
				{
					id : 0,
					text : 'javascript',
					isCompleted : false,
					isEditing : false
				},{
					id : 1,
					text : 'jquery',
					isCompleted : false,
					isEditing : false
				}
			];

			//获取唯一的id
			function getId() {
				var id = new Date().getTime();
				return id;
			}

			this.save = function() {
				storage['myData'] = JSON.stringify(todos);
			}

			//控制私有字段的访问权限
			this.get = function () {
				return todos;
			}

			// 业务逻辑都必须出现在服务中（专门定义业务逻辑）
			// 添加todo
			this.add = function(text) {
				todos.push({
					// 自动增长？
					id: getId(),
					// 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
					text: text,
					isCompleted: false,
					isEditing : false
				});
				this.save();
			};

			// 处理删除
			this.remove = function(index) {
				for (var i = 0; i < todos.length; i++) {
					todos.splice(index,1)
					}

				this.save();
			};

			// 清空已完成
			this.clearCompleted = function() {
				var result = [];
				for (var i = 0; i < todos.length; i++) {
					if (!todos[i].isCompleted) {
						result.push(todos[i]);
					}
				}
				todos = result;
				this.save();
				// 此时我们将todos指向了一个新的地址
				return todos;
			};

			// // 是否有已经完成的
			// this.existCompleted = function() {
			// 	for (var i = 0; i < todos.length; i++) {
			// 		if (todos[i].isCompleted) {
			// 			return true;
			// 		}
			// 	}
			// 	return false;
			// };

			// 是否重新编辑
			this.existEditing = function (e) {
				for (var i = 0; i < todos.length; i++){
					if (e.code === 'Enter'){
						todos.isEditing = false;
					}else{
						todos.isEditing = true;
					}

				}
			};

			//实时更新未完成的数量
			this.getNum = function () {
				var n = 0;
				for (var i = 0; i < todos.length; i++){
					if (todos.isCompleted === false){
						n++;
					}
				}
				return n;
			};

			// 更新
			this.update = function(id, target) {
				this.save();
			};

			this.toggleAll = function() {
				for (var i = 0; i < todos.length; i++) {
					todos[i].isComplated = todos[i].isComplated === true ? false : true;
				}
				this.save();
			};

		}]);
})(angular)
