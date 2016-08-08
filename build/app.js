var snack = angular.module('snack', ['ngRoute']);



snack.controller('HomeController', ['$scope', 'SnackService', function($scope, snack) {

    $scope.foodToOrder = snack.fastFood;
    $scope.order = {};

    $scope.dataFromForm = function(item) {
        if (item != null) {
            $scope.order[item.id] = {id: item.id, name: item.name, type: item.type, qty: item.qty};
        }
    };

    $scope.countItems = function countItems() {
        $scope.results = {};
        var order = $scope.order;
        var items = {};
        angular.forEach(order, function(item) {
            var qty = item.qty+1;
            //if you want to count duplicate items this is the best
               // items[item.name] = (items[item.name] || 0) +1;
            items[item.id] = ({id:item.id,name:item.name,type:item.type,qty:qty});

        });

        $scope.results = items;

    };

    $scope.increase = function increase(itemID) {
        angular.forEach($scope.results, function (item) {
            if (item.id == itemID) {
                item.qty++;
                if (item.qty == 45) {
                    item.qty = 0;
                }
            }
        });
    };

        $scope.decrease = function decrease(itemID) {
            angular.forEach($scope.results, function(item) {
                if (item.id == itemID) {
                    if (item.qty > 0) {
                        item.qty--;
                    }
                    if (item.qty == 0) {
                        $scope.order[item.id] = {};
                        $scope.results[item.id] = {};
                    }
                }
            });
        };

    $scope.orderToCart = function orderToCart() {
        $scope.cart = {};
        $scope.timeToPrepare = snack.timeToPrepare;
        $scope.timeToServe = snack.timeToServe;
        $scope.message = '';
        $scope.timeToWait = 0;

        angular.forEach($scope.results, function(itemsInCart) {
            if (itemsInCart.type == 'sandwich') {
                $scope.timeToWait = (itemsInCart.qty * (snack.timeToPrepare.sandwich + snack.timeToServe.serveToCustomer)) / 60; console.log($scope.timeToWait);
            } else if (itemsInCart.type == 'jackedPotato') {
                $scope.timeToWait = (itemsInCart.qty * (snack.timeToPrepare.jackedPotato.microwave + snack.timeToPrepare.jackedPotato.topping +  snack.timeToServe.serveToCustomer))
            }
        });
    };

    $scope.cancelOrder = function cancelOrder() {
        $scope.results = {};
        $scope.order = {};
        $scope.timeToWait = 0;
    }

}]);
snack.service('SnackService', function(){

        this.timeToPrepare = {
            sandwich: 60,
            jackedPotato: {
                microwave: 170,
                topping: 30
            }
        };
        this.timeToServe = {
            serveToCustomer: 30
        };


    this.fastFood = [
         {id: 1, name:'tunaMayo', type: 'sandwich',qty: 0},
         {id: 2, name:'hamAndCheese',type: 'sandwich', qty: 0},

    ]

});
/**
 * Created by nesrin on 8/8/16.
 */
snack.filter('time', function() {

    var conversions = {
        'ss': angular.identity,
        'mm': function(value) { return value * 60; },
        'hh': function(value) { return value * 3600; }
    };

    var padding = function(value, length) {
        var zeroes = length - ('' + (value)).length,
            pad = '';
        while(zeroes-- > 0) pad += '0';
        return pad + value;
    };

    return function(value, unit, format, isPadded) {
        var totalSeconds = conversions[unit || 'ss'](value),
            hh = Math.floor(totalSeconds / 3600),
            mm = Math.floor((totalSeconds % 3600) / 60),
            ss = totalSeconds % 60;

        format = format || 'hh:mm:ss';
        isPadded = angular.isDefined(isPadded)? isPadded: true;
        hh = isPadded? padding(hh, 2): hh;
        mm = isPadded? padding(mm, 2): mm;
        ss = isPadded? padding(ss, 2): ss;

        return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
    };
});
