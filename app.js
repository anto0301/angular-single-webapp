(function()
{
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('listItemDescription',listItemDescription)
    .directive('listItem',listItem);

    NarrowItDownController.$inject=['$scope'];
    NarrowItDownController.$inject=['MenuSearchService'];

    function NarrowItDownController(MenuSearchService)
    {
        var NarrowItDown=this;
        var promise=MenuSearchService.getMatchedMenuItems();  
        var AllItems;    
        NarrowItDown.SearchTerm='';
        
           
        promise.then(function (response) 
        {                         
            AllItems=response.data.menu_items;
            NarrowItDown.foundItems= AllItems;
        });

        NarrowItDown.foundItemsEvent=function()
        {
            //var object_by_id =  NarrowItDown.foundItems.find(item => item.id === 877);
            //NarrowItDown.foundItems =  NarrowItDown.AllItems.some(item => item.description.includes('chicken'));
            
            NarrowItDown.items= [];
            angular.forEach(AllItems, function(item) {
                if(item.description.toLowerCase().indexOf(NarrowItDown.SearchTerm) >= 0 ) 
                NarrowItDown.items.push(item);
            });
            NarrowItDown.foundItems= NarrowItDown.items;
        };    
        
        NarrowItDown.removeItem=function(itemIndex)        {
            NarrowItDown.items.splice(itemIndex,1);
        };
        
    }

    function listItemDescription(){
        var ddo={
            template:'{{item.description}}'
        }
        return ddo;
    }

    function listItem(){
        var ddo={
            templateUrl:'MenuList.html',
            scope :{
                items:'<',
                itemRemove:'='
            },
            controller:NarrowItDownController,
            controllerAs: 'NarrowItDown',
            bindToController:true
        };
        return ddo;
    }

    MenuSearchService.$inject=['$http']
    function MenuSearchService($http)
    {
        var service=this;            
        var foundItems=[];
        service.getMatchedMenuItems=function(searchTerm)
        {
            var response =$http({
            method: "GET",
            url:"https://davids-restaurant.herokuapp.com/menu_items.json"
            })
            return response;
        };
    }
})();