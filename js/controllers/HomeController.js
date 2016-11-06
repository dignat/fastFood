snack.controller('HomeController', ['$scope', 'SnackService', 'Order', 'OrderItem', '$cacheFactory', function ($scope, snack, Order, OrderItem, $cacheFactory) {

    $scope.foodToOrder = snack.fastFood;
    $scope.order = {};
    $scope.cart = {};
    $scope.items = [];
    $scope.schedule = [];
    $scope.cache = $cacheFactory('cacheID');
    $scope.keys = [];
    $scope.put = function (key, value) {
        $scope.cache.put(key, value);
        $scope.keys.push(key);
    };
    $scope.count = 0;
    
    $scope.addItems = function addItems(itemID) {
        angular.forEach($scope.foodToOrder, function (orderItems) {
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
        angular.forEach($scope.cart, function (item) {
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

        angular.forEach($scope.cart, function (itemsInCart) {
            if (itemsInCart.type == 'sandwich') {
                qty += itemsInCart.qty;
                sandwich = itemsInCart.type;
                $scope.timeToWait += (itemsInCart.qty * (snack.timeToPrepare.sandwich + snack.timeToServe.serveToCustomer)) / 60;
            } else if (itemsInCart.type == 'jackedPotato') {
                jacked = itemsInCart.type;
                qty = itemsInCart.qty;
                $scope.timeToWait += (itemsInCart.qty * (snack.timeToPrepare.jackedPotato.microwave + snack.timeToPrepare.jackedPotato.topping + snack.timeToServe.serveToCustomer))
            }
        });
        for (var i = 0; i < qty; i++) {
            var prepare = 0;
            var serve = 0;

            prepare += i * ($scope.timeToPrepare.sandwich + $scope.timeToServe.serveToCustomer);
            serve += $scope.timeToServe.serveToCustomer + prepare + 30;

            $scope.schedule.push({
                sandwich: sandwich,
                jacket: jacket,
                index: i,
                prepare: prepare,
                serve: serve,
                qty: qty,
                type: type
            });

        }
        $scope.count++;
        $scope.order[$scope.count] = {'cart': $scope.cart, 'items': $scope.items};
        $scope.put('order', $scope.order);
        $scope.cart = {};
    };

    $scope.cancelOrder = function cancelOrder() {
        $scope.items = {};
        $scope.order = {};
        $scope.timeToWait = 0;
        $scope.cart = {};
        $scope.schedule = [];
    };

    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };


}]);