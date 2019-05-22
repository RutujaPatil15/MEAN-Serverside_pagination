angular.module('Myapp', ['ngTable','ngResource'])

.controller('myCtrl',function($scope,$http,$resource,NgTableParams){
    function gett(page,count)
    {
    var Api = $resource("/get_employee_personal_data");
    $scope.tableParams = new NgTableParams({count: count,page:page},{
        counts: [5, 10, 20],
        getData: function(params) {
            //console.log(params);
        // ajax request to api
        return Api.get(params.url()).$promise.then(function(result) {
            //console.log(params)
         params.total(result.itemCount); // recal. page nav controls
         return result.items;
        });
      }
    });
    } 
     gett(1,5);
})