snack.factory('OrderItem', function() {

    function OrderItem() {
        this.id = null;
        this.name = '';
        this.qty = 0;
        this.type = '';
    }

    OrderItems.prototype = {
        getId: function getId() {
            return this.id;
        },
        getName: function getName() {
            return this.name;
        },
        getQty: function getQty() {
            return this.qty;
        },
        getType: function getType() {
            return this.type;
        }
    }

    return new OrderItems();
});