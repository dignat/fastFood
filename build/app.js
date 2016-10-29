var snack = angular.module('snack', ['ngRoute', 'ui.bootstrap', 'angular.filter']);



snack.controller('HomeController', ['$scope', 'SnackService', 'Order', 'OrderItems', '$cacheFactory',function($scope, snack, Order, OrderItems, $cacheFactory) {

    $scope.foodToOrder = snack.fastFood;
    $scope.order = {};
    $scope.cart = {};
    $scope.items = [];
    $scope.schedule = [];
    $scope.cache = $cacheFactory('cacheID');
    $scope.keys = [];
    $scope.put = function(key, value) {
        $scope.cache.put(key, value);
        $scope.keys.push(key);
    };
    $scope.count = 0;


    $scope.dataFromForm = function(item) {
        if (item != null) { console.log(item);
            item.qty = 1;
            $scope.order[item.id] = {id: item.id, name: item.name, type: item.type, qty: item.qty};
            item.qty++;
        }else {
            item.qty = 0;
        }
    };

    /*$scope.countItems = function countItems() {
        $scope.results = {};
        var order = $scope.order;
        $scope.items = {};
        angular.forEach(order, function(item) {
            //if you want to count duplicate items this is the best
               // items[item.name] = (items[item.name] || 0) +1;
            $scope.items[item.id] = ({id:item.id,name:item.name,type:item.type,qty:item.qty});
        });

        $scope.results = $scope.items;

    };*/

    $scope.addItems = function addItems(itemID) {
        angular.forEach($scope.foodToOrder, function(orderItems){
            if (orderItems.id == itemID) {
                $scope.cart[orderItems.id] = {
                    id: orderItems.id,
                    name: orderItems.name,
                    type: orderItems.type,
                    qty: orderItems.qty
                }
            }
        });
        $scope.items = Order.getOrderItems($scope.cart);

        return $scope.cart;
    };

    $scope.increase = function increase(itemID) {
        angular.forEach($scope.cart, function (item) {
            if (item.id == itemID) {
                item.qty++;
                if (item.qty == 45) {
                    item.qty = 0;
                }
            }
        });
    };

        $scope.decrease = function decrease(itemID) {
            angular.forEach($scope.cart, function(item) {
                if (item.id == itemID) {
                    if (item.qty > 0) {
                        item.qty--;
                    }
                    if (item.qty == 0) {
                        $scope.order[item.id] = {};
                        $scope.items[item.id] = {};
                    }
                }
            });
        };

    $scope.orderToCart = function orderToCart() {
        $scope.timeToPrepare = snack.timeToPrepare;
        $scope.timeToServe = snack.timeToServe;
        $scope.message = '';
        $scope.timeToWait = 0;
        var qty = 0;
        var sandwich = '';
        var jacked = '';

        angular.forEach($scope.cart, function(itemsInCart) {
            if (itemsInCart.type == 'sandwich') {
                qty += itemsInCart.qty;
                sandwich = itemsInCart.type;
                $scope.timeToWait += (itemsInCart.qty * (snack.timeToPrepare.sandwich + snack.timeToServe.serveToCustomer)) / 60;
            } else if (itemsInCart.type == 'jackedPotato') {
                jacked = itemsInCart.type;
                qty = itemsInCart.qty;
                $scope.timeToWait += (itemsInCart.qty * (snack.timeToPrepare.jackedPotato.microwave + snack.timeToPrepare.jackedPotato.topping +  snack.timeToServe.serveToCustomer))
            }
        });
        $scope.schedule.push({
            prepareTimeSandwich: $scope.timeToPrepare.sandwich,
            serveTimeSandwich: $scope.timeToServe.serveToCustomer,
            qty: qty,
            sandwich: sandwich,
            jacked: jacked
        });
        $scope.count++;
        $scope.order[$scope.count] = {'cart':$scope.cart, 'items': $scope.items};
        $scope.put('order', $scope.order);
console.log($scope.schedule);
        $scope.cart = {};
    };

    $scope.cancelOrder = function cancelOrder() {
        $scope.items = {};
        $scope.order = {};
        $scope.timeToWait = 0;
        $scope.cart = {};
        $scope.schedule = [];
    };

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
        return input;
    };


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
         {id: 1, name:'tunaMayo', type: 'sandwich',qty: 1},
         {id: 2, name:'hamAndCheese',type: 'sandwich', qty: 1},

    ]

});
snack.factory('Order', function(){

    function Order() {
        this.id = null;
        this.total = 0;
        this.items = {};

    }

    Order.prototype = {

        getOrderId: function getOrderId() {
            return this.id;
        },
        getOrderItems: function getOrderItems(items) {
            return items;
        }
    };

    return new Order();
});
snack.factory('OrderItems', function() {

    function OrderItems() {
        this.id = null;
        this.name = '';
        this.qty = 0;
        this.type = '';
    }

    OrderItems.prototype = {
        getOrderItemId: function getOrderItemId() {
            return this.id;
        },
        getOrderItemName: function getOrderItemName() {
            return this.name;
        },
        getOrderItemQty: function getOrderItemQty() {
            return this.qty;
        },
        getOrderItemType: function getOrderItemType() {
            return this.type;
        }
    }

    return new OrderItems();
});
snack.filter('makeRange', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i=0; i<total; i++) {
            input.push(i);
        }

        return input;
    };
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
