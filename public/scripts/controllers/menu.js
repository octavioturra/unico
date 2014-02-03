angular.module('unico')
    .controller('MenuCtrl', function ($scope) {
        $scope.sideMenu = 'closed';
        $scope.openMenu = function () {
            $scope.sideMenu = 'opened';
        };
        $scope.closeMenu = function () {
            $scope.sideMenu = 'closed';
        };

    })