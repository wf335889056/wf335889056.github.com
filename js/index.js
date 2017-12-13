(function (angular) {
    angular.module('app', [])
        .controller('Ctrl', function ($scope, $http) {
            $scope.today = '今天';
            $scope.day = new Date().getDate();
            var weekIndex = new Date().getDay();
            $scope.weekArr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            $scope.week = $scope.weekArr[weekIndex];
            $http({
                url: 'https://free-api.heweather.com/v5/weather?city=hangzhou&key=545d63e185fc48169a43cbabba6e74d2'
            }).then(function (data) {
                $scope.data = data.data;
                $scope.city = $scope.data.HeWeather5[0].daily_forecast[0];
                $scope.curr = $scope.data.HeWeather5[0].now;
                $scope.weather = $scope.curr.cond.txt;
                $scope.maxTmp = $scope.city.tmp.max;
                $scope.minTmp = $scope.city.tmp.min;
                $scope.wind = $scope.curr.wind.dir + ' ' + $scope.curr.wind.sc;
                $scope.air = $scope.city = $scope.data.HeWeather5[0].aqi.city.qlty;
                $scope.pm = $scope.city = $scope.data.HeWeather5[0].aqi.city.pm25;
                $scope.weathers = $scope.data.HeWeather5[0].hourly_forecast;
                $scope.suggestion = $scope.data.HeWeather5[0].suggestion.sport.txt;
                $scope.future = $scope.data.HeWeather5[0].daily_forecast;
                $scope.weather1 = $scope.data.HeWeather5[0].daily_forecast[1].cond.txt_d;
                $scope.weather2 = $scope.data.HeWeather5[0].daily_forecast[2].cond.txt_d;
                $scope.maxTmp1 = $scope.data.HeWeather5[0].daily_forecast[1].tmp.max;
                $scope.minTmp1 = $scope.data.HeWeather5[0].daily_forecast[1].tmp.min;
                $scope.maxTmp2 = $scope.data.HeWeather5[0].daily_forecast[2].tmp.max;
                $scope.minTmp2 = $scope.data.HeWeather5[0].daily_forecast[2].tmp.min;
                $scope.days = [
                    {
                        title: '明天:',
                        weather: $scope.weather1,
                        tmp: $scope.minTmp1 + '~' + $scope.maxTmp1 + '℃'
                    },
                    {
                        title: '后天:',
                        weather: $scope.weather2,
                        tmp: $scope.minTmp2 + '~' + $scope.maxTmp2 + '℃'
                    }
                ]
            })
        })


}(angular))