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