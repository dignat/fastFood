snack.factory('Order', function(){

    function Order() {
        this.id = null;
        this.total = 0;
        this.items = {};

    }

    Order.prototype = {

        getId: function getId() {
            return this.id;
        },
        getOrderItems: function getOrderItems(items) {
            return items;
        }
    };

    return new Order();
});