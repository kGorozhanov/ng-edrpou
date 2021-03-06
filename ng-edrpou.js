'use strict';
angular.module('ngEdrpou', []).directive('checkEdrpou', function () {

    var linkFn = function (scope, elem, attrs, ngModelCtrl) {
        var getControlValue = function (edrpou, controls) {
            var sum = 0;
            for (var i = 0; i < controls.length; i++) {
                sum += +edrpou[i] * controls[i];
            }
            return sum % 11;
        }
        scope.$watch(attrs.ngModel, function (edrpou) {
            var result = false;
            var controlValue;

            if (+edrpou && edrpou.length === 8) {
                if (+edrpou < 30000000 || +edrpou > 60000000) {
                    controlValue = getControlValue(edrpou, [1, 2, 3, 4, 5, 6, 7]);
                    if (controlValue >= 10) controlValue = getControlValue(edrpou, [3, 4, 5, 6, 7, 8, 9]);
                } else {
                    controlValue = getControlValue(edrpou, [7, 1, 2, 3, 4, 5, 6]);
                    if (controlValue >= 10) controlValue = getControlValue(edrpou, [9, 3, 4, 5, 6, 7, 8]);
                }
                if (controlValue === +edrpou[7]) result = true;
            }

            ngModelCtrl.$setValidity('edrpou', result);
        });
    };
    return {
        restrict: 'A',
        link: linkFn,
        require: 'ngModel'
    };
});
