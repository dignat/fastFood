snack.service('SnackService', function(){

        this.timeToPrepare = {
            sandwich: 60,
            jacket: {
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