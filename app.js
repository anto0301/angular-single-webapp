(function()
{
    angular.module('LunchCheck',[])
    .controller('LunchCheckController',LunchCheckController);
    LunchCheckController.$inject=['$scope'];
    function LunchCheckController($scope)
    {
        $scope.lunchitem="";
        $scope.checkStatus = function () 
        {         
            $scope.IsShowStatus=true;
            
            var strLength=  $scope.lunchitem.split(',').filter(function (el) {
                return el != '';
              }).length;

            if($scope.lunchitem==""||strLength==0)
            {                
                $scope.myStyle={color:'red'};
                $scope.textboxstyle={'border-color':'red'};
                $scope.statusMsg="Please enter data first!";
            }
            else if(strLength<=3)
            {
                $scope.myStyle={color:'Green'};
                $scope.textboxstyle={'border-color':'Green'};
                $scope.statusMsg="Enjoy!";
            }
            else if(strLength>3)
            {
                $scope.myStyle={color:'Green'};
                $scope.textboxstyle={'border-color':'Green'};
                $scope.statusMsg="Too much!";
            }
        };
    }

})();