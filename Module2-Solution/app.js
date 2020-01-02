(function()
{
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingService',ShoppingService);

    ToBuyController.$inject=['$scope'];
    AlreadyBoughtController.$inject=['$scope'];
    ToBuyController.$inject=['ShoppingService'];
    AlreadyBoughtController.$inject=['ShoppingService'];

    function ToBuyController(ShoppingService)
    {
       var buyItem=this;
       buyItem.ToBuyListItems=[];
       buyItem.ToBuyListItems.push({ name :"Cookies",  qty :"10 "  }  );
       buyItem.ToBuyListItems.push({ name :"Chocolates",  qty :"20 "  }  );
       buyItem.ToBuyListItems.push({ name :"Fruits",  qty :"30 "  }  );
       buyItem.ToBuyListItems.push({ name :"Chips",  qty :"40 "  }  );
       buyItem.ToBuyListItems.push({ name :"Candy",  qty :"40 "  }  );
       buyItem.AddItem=function(itemName,qty,index){

        ShoppingService.addItem(itemName,qty);
        buyItem.ToBuyListItems.splice(index,1);
       }
    }

    function AlreadyBoughtController(ShoppingService)
    {
        var boughtItem=this;   
        boughtItem.ToBoughtItems=ShoppingService.getItems();             
    }

    function ShoppingService()
    {
        var service=this;
        var items=[];
        var validItem=[];
        service.addItem=function(itemName,qty)
        {
            var item= {
                name : itemName,
                qty : qty
            }   
                items.push(item);
        };
        service.getItems=function()
        {
            return items;
        };
    }
})();