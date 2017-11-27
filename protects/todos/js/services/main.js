// 业务逻辑的相关操作方法写这里
// 什么是业务逻辑, 就是处理数据的

(function (angular) {
	angular.module('app.service.main',[])
		.service('MainService',['$window',function($window){
			var storage = $window.localStorage;
			var loaclSave = function(){
				storage['myText'] = JSON.stringify(texts);
			}
			function getId(){
				var id = new Date().getTime();
				return id;
			}
			var texts = storage['myText'] ? JSON.parse(storage['myText']) : [
				{
					id:0,
					text:'Taste JavaScript',
					isComplated : true,
				},
				{
					id:1,
					text:'Buy a unicorn',
					isComplated : false,
				}
			];
			this.getText = function(){
				return texts;
			}
			this.addText = function(text){
				var obj = {};
				obj.text = text;
				obj.isComplated = false;
				obj.id = getId();
				texts.push(obj);
				loaclSave();
			};

			this.delete = function(index){
				texts.splice(index,1);
				loaclSave();
			};

			this.check = function(index){
				texts[index].isComplated = !texts[index].isComplated;
				loaclSave();
			};

			//修改内容
			this.isFocus = false;
			this.changeText = function(id,index){
				this.isFocus = {bool:true,index:index};
				this.currentId = id;
			}

			this.save = function(){
				this.currentId = -1;
				this.isFocus = false;
				loaclSave();
			}
			//时刻保存
			this.saveNow = function(){
				loaclSave();
			}


			this.clearCompleted = function(){
				for(var i = texts.length-1; i >= 0; i--){
					if(texts[i].isComplated === true){
						texts.splice(i,1);
					}
				}
				loaclSave();
			};

			this.count = function(){
				var number = 0;
				for(var i = 0; i < texts.length;i++){
					if(texts[i].isComplated !== true){
						number++;
					}
				}
				return number;
			}

			var now = true;
			this.checkAll = function(){
				if(this.count() === 0){
					now = false;
				}
				for(var item of texts){
					item.isComplated = now;
				}
				now = !now;
				loaclSave();
			}



		}])


})(angular)
