angular.module('unico')
    .controller('ClientCtrl', function ($scope, socket, http) {
        $scope.validating = 1;
        $scope.validateEmail = function () {
            if ($scope.data.email.length != 0) {
                $http.post('/validate/email', {
                    email: $scope.data.email
                })
                    .success(function (d) {
                        if (!d.success) {
                            $scope.validating = 3;
                            $scope.validateEmailStatus = d.message;
                        } else {
                            $scope.validating = 2;
                            $scope.validateEmailStatus = 'Válido';
                        }
                    })
                    .error(function (d) {
                        $scope.validating = 4;
                        $scope.validateEmailStatus = d.error.message;
                    });
            } else {
                $scope.validating = 0;
                $scope.validateEmailStatus = 'Aguardando preenchimento';
            }
        }

        $scope.endereco = {
            cep: ''
        };
        $scope.validaCep = function () {
            $http.post('/cep', {
                cep: $scope.endereco.cep
            })
                .success(function (d) {
                    //{“bairro”: “Santana”, “logradouro”: “Rua Volunt\u00e1rios da P\u00e1tria”, “cep”: “02011200″, “uf”: “SP”, “localidade”: “S\u00e3o Paulo”}
                    $scope.endereco.logradouro = d.logradouro;
                    $scope.endereco.bairro = d.bairro;
                    $scope.endereco.uf = d.uf;
                    $scope.endereco.cidade = d.localidade;
                })
                .error(function (d) {

                });
        }
    });