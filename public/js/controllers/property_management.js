app.controller('AbnTestController', function($scope, $timeout) {
    var apple_selected, tree, treedata_avm, treedata_geography;
    $scope.my_tree_handler = function(branch) {
      var _ref;
      $scope.output = "You selected: " + branch.label;
      if ((_ref = branch.data) != null ? _ref.description : void 0) {
        return $scope.output += '(' + branch.data.description + ')';
      }
    };
    apple_selected = function(branch) {
      return $scope.output = "APPLE! : " + branch.label;
    };
    treedata_avm = [
       {
        label: 'Entire Rent',
        data: {
          definition: "There are 1000 properties for entire renting",
          data_can_contain_anything: true
        },
        onSelect: function(branch) {
          return $scope.output = "Notice: " + branch.data.definition;
        },
        children: [
          {
            label: 'Kingsford',
            children: [
              {
                label: 'Granny Smith',
                onSelect: apple_selected
              }, {
                label: 'Red Delicous',
                onSelect: apple_selected
              }, {
                label: 'Fuji',
                onSelect: apple_selected
              }
            ]
          }, {
            label: 'Kengston',
            children: [
              {
                label: 'Granny Smith',
                onSelect: apple_selected
              }, {
                label: 'Red Delicous',
                onSelect: apple_selected
              }, {
                label: 'Fuji',
                onSelect: apple_selected
              }
            ]
          }
        ]
      }, {
        label: 'Share Rent',
        children: [
          {
            label: 'The Rocks',
            children: ['Igneous', 'Sedimentary', 'Metamorphic']
          }, {
            label: 'Zetland',
            children: ['Aluminum', 'Steel', 'Copper']
          }, {
            label: 'Greensqure',
            children: [
              {
                label: 'Thermoplastic',
                children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
              }, {
                label: 'Thermosetting Polymer',
                children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
              }
            ]
          }
        ]
      }
    ];
    treedata_geography = [
      {
        label: 'North America',
        children: [
          {
            label: 'Canada',
            children: ['Toronto', 'Vancouver']
          }, {
            label: 'USA',
            children: ['New York', 'Los Angeles']
          }, {
            label: 'Mexico',
            children: ['Mexico City', 'Guadalajara']
          }
        ]
      }, {
        label: 'South America',
        children: [
          {
            label: 'Venezuela',
            children: ['Caracas', 'Maracaibo']
          }, {
            label: 'Brazil',
            children: ['Sao Paulo', 'Rio de Janeiro']
          }, {
            label: 'Argentina',
            children: ['Buenos Aires', 'Cordoba']
          }
        ]
      }
    ];
    $scope.my_data = treedata_avm;
    $scope.try_changing_the_tree_data = function() {
      if ($scope.my_data === treedata_avm) {
        return $scope.my_data = treedata_geography;
      } else {
        return $scope.my_data = treedata_avm;
      }
    };
    $scope.my_tree = tree = {};
    $scope.try_async_load = function() {
      $scope.my_data = [];
      $scope.doing_async = true;
      return $timeout(function() {
        if (Math.random() < 0.5) {
          $scope.my_data = treedata_avm;
        } else {
          $scope.my_data = treedata_geography;
        }
        $scope.doing_async = false;
        return tree.expand_all();
      }, 1000);
    };
    return $scope.try_adding_a_branch = function() {
      var b;
      b = tree.get_selected_branch();
      return tree.add_branch(b, {
        label: 'New Branch',
        data: {
          something: 42,
          "else": 43
        }
      });
    };
});
