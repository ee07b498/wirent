/**
 * @Date:   2017-07-11T11:20:25+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-07-26T11:07:41+10:00
 */



'use strict'
app.controller('propertyAddInstanceCtrl', ['$scope','$modalInstance','items', '$timeout',function($scope, $modalInstance, items, $timeout) {

  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };
  $scope.someGroupFn = function(item) {

    if (item.name[0] >= 'A' && item.name[0] <= 'M')
      return 'From A - M';

    if (item.name[0] >= 'N' && item.name[0] <= 'Z')
      return 'From N - Z';

  };

  $scope.personAsync = {
    selected: "wladimir@email.com"
  };
  $scope.peopleAsync = [];

  $timeout(function() {
    $scope.peopleAsync = [{
        name: 'Adam',
        email: 'adam@email.com',
        age: 12,
        country: 'United States'
      },
      {
        name: 'Amalie',
        email: 'amalie@email.com',
        age: 12,
        country: 'Argentina'
      },
      {
        name: 'Estefanía',
        email: 'estefania@email.com',
        age: 21,
        country: 'Argentina'
      },
      {
        name: 'Adrian',
        email: 'adrian@email.com',
        age: 21,
        country: 'Ecuador'
      },
      {
        name: 'Wladimir',
        email: 'wladimir@email.com',
        age: 30,
        country: 'Ecuador'
      },
      {
        name: 'Samantha',
        email: 'samantha@email.com',
        age: 30,
        country: 'United States'
      },
      {
        name: 'Nicole',
        email: 'nicole@email.com',
        age: 43,
        country: 'Colombia'
      },
      {
        name: 'Natasha',
        email: 'natasha@email.com',
        age: 54,
        country: 'Ecuador'
      },
      {
        name: 'Michael',
        email: 'michael@email.com',
        age: 15,
        country: 'Colombia'
      },
      {
        name: 'Nicolás',
        email: 'nicole@email.com',
        age: 43,
        country: 'Colombia'
      }
    ];
  }, 3000);

  $scope.counter = 0;
  $scope.someFunction = function(item, model) {
    $scope.counter++;
    $scope.eventResult = {
      item: item,
      model: model
    };
  };

  $scope.removed = function(item, model) {
    $scope.lastRemoved = {
      item: item,
      model: model
    };
  };

  $scope.person = {};
  $scope.people = [{
      name: 'Adam',
      email: 'adam@email.com',
      age: 12,
      country: 'United States'
    },
    {
      name: 'Amalie',
      email: 'amalie@email.com',
      age: 12,
      country: 'Argentina'
    },
    {
      name: 'Estefanía',
      email: 'estefania@email.com',
      age: 21,
      country: 'Argentina'
    },
    {
      name: 'Adrian',
      email: 'adrian@email.com',
      age: 21,
      country: 'Ecuador'
    },
    {
      name: 'Wladimir',
      email: 'wladimir@email.com',
      age: 30,
      country: 'Ecuador'
    },
    {
      name: 'Samantha',
      email: 'samantha@email.com',
      age: 30,
      country: 'United States'
    },
    {
      name: 'Nicole',
      email: 'nicole@email.com',
      age: 43,
      country: 'Colombia'
    },
    {
      name: 'Natasha',
      email: 'natasha@email.com',
      age: 54,
      country: 'Ecuador'
    },
    {
      name: 'Michael',
      email: 'michael@email.com',
      age: 15,
      country: 'Colombia'
    },
    {
      name: 'Nicolás',
      email: 'nicolas@email.com',
      age: 43,
      country: 'Colombia'
    }
  ];

  $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

  $scope.multipleDemo = {};
  $scope.multipleDemo.colors = ['Blue', 'Red'];
  $scope.multipleDemo.selectedPeople = [$scope.people[5], $scope.people[4]];
  $scope.multipleDemo.selectedPeopleWithGroupBy = [$scope.people[8], $scope.people[6]];
  $scope.multipleDemo.selectedPeopleSimple = ['samantha@email.com', 'wladimir@email.com'];


  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('propertymgmCtrl', ['$scope', '$http', '$modal', '$log', '$timeout', function($scope, $http, $modal, $log, $timeout) {


  $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyAdd.html',
      controller: 'propertyAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);
