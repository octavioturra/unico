angular.module('unico')
    .controller('PaymentCtrl', function ($scope) {
        var steps = ['initial', 'payment', 'complete'];
        $scope.paymentStep = 'initial';

        $scope.openPaymentMode = function () {
            $scope.paymentStep = steps[1];
        };
        $scope.closePaymentMode = function () {
            $scope.paymentStep = steps[0];
        };

        $scope.openPaymentComplete = function () {
            $scope.paymentStep = steps[2];
        };
        $scope.closePaymentMode = function () {
            $scope.paymentStep = steps[0];
        };

        var beforeMinimize = '';
        $scope.minimize = function () {
            if ($scope.paymentStep !== 'min') {
                beforeMinimize = $scope.paymentStep;
                $scope.paymentStep = 'min';
            } else {
                $scope.paymentStep = beforeMinimize;
            }
        };
    });