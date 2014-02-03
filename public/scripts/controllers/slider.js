angular.module('unico')
    .controller('SliderCtrl', function ($scope) {
        var selectedPos = 0;
        $scope.selectImage = function (d) {
            selectedPos = 0;
            _($scope.product.images).each(function (i, n) {
                if (i.selected)
                    i.selected = false;
                if (i.id === d.id) {
                    i.selected = true;
                    selectedPos = n;
                }
                console.log(n)
            });
        }
        $scope.nextImage = function () {
            _($scope.product.images).each(function (i, n) {
                i.selected = false;
            });
            selectedPos = (selectedPos + 1);
            $scope.product.images[selectedPos % 4].selected = true
        }
        $scope.beforeImage = function () {
            _($scope.product.images).each(function (i, n) {
                i.selected = false;
            });
            selectedPos = selectedPos + 3;
            $scope.product.images[(selectedPos) % 4].selected = true
        }
    });