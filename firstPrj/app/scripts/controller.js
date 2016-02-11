'use strict';

angular.module('gpApp')

    .controller('summController', ['$scope', '$stateParams', '$state', 'currencyService',
    function($scope, $stateParams, $state, currencyService) {
        $scope.firstN = parseInt($stateParams.f);
        $scope.secondN = parseInt($stateParams.s)
        $scope.selectedCurrencyCode = '';
        $scope.result = 0;

        currencyService.getCurrency().$promise.then(function(curr){
            console.log('Curr: ', curr);
            $scope.selectedCurrency = 'AUD';
            $scope.rates = curr.rates;
            $scope.onChangeCurrency('AUD');
            
            $scope.selectedCurrencyCode = 'AUD';
        });
        
        $scope.$watch('selectedCurrencyCode', function(newValue){
            if (!newValue) return
            var selectedRate = _.findWhere($scope.rates, {code: selectedCurrencyCode})
            $scope.result = selectedRate * ($scope.firstN + $scope.secondN)
        })

        $scope.updateUrl = function(){
            $state.go('sum', {f: $scope.firstN, s: $scope.secondN});
        };

        
    }])

    .controller('funnyGame', ['$scope', function($scope){
        $scope.funny_string = "";

        var fency =  function(str){
            var str1 = str.split(' ');
            var arr = [];

            for(var i = 0; i < str1.length; i++) {
                var a = str1[i][0].toUpperCase() + str1[i].slice(1);
                arr[i] = a;
            }
            return arr.join(" ");
        };

        var exclaim = function(statement){
            return statement + '!';
        };

        $scope.getFunnyString = _.compose(exclaim,fency);

    }])

;
