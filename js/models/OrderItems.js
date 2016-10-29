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