angular.module('unico').controller('MainCtrl', function ($scope, socket) {
    socket.on('total', function(d){
        $scope.total = data.total;
    });
});