angular.module('unico')
    .controller('ProductCtrl', function ($scope, socket, _) {
        $scope.product = {};
        $scope.loadState = 0;

        function processaProduto(p) {
            var fst = false;
            p.images = _(p.images).map(function (i) {
                return {
                    id: _.uniqueId('i'),
                    thumb: i.thumb,
                    normal: i.normal,
                    selected: (function () {
                        if (!fst) {
                            fst = true;
                            return true;
                        }
                        return false;
                    })();
                }
            });
            $scope.product = p;
        }

        socket.on('product', function (d) {
            if (d.product) {
                processaProduto(d.product);
                $scope.loadState = 1;
            } else {
                $scope.loadState = 3;
            }
            $scope.$apply();
        });
    });