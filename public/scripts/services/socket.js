angular.module('unico').factory('socket', function () {
    var socket = io.connect('http://localhost');
    return socket;
});