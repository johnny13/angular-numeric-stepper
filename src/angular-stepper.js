angular.module('revolunet.stepper', [])

.directive('numericStepper', function() {
    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {
            min: '=',
            max: '=',
            stepBy: '='
        },
        template:   '<span></span>' +
                    '<div><button ng-disabled="isOverMax()" ng-click="increment()">+</button>' +
                    '<button ng-disabled="isOverMin()" ng-click="decrement()">-</button></div>',
        link: function(scope, iElement, iAttrs, ngModelController) {

            ngModelController.$render = function() {
                iElement.find('span').text(ngModelController.$viewValue);
                // update the validation status
                checkValidity();
            };

            // when model change, cast to integer
            ngModelController.$formatters.push(function(value) {
                return parseInt(value, 10);
            });

            // when view change, cast to integer
            ngModelController.$parsers.push(function(value) {
                return parseInt(value, 10);
            });

            function checkValidity() {
                // check if min/max defined to check validity
                var valid = !(scope.isOverMin(true) || scope.isOverMax(true));
                // set our model validity
                // the outOfBounds is an arbitrary key for the error.
                // will be used to generate the CSS class names for the errors
                ngModelController.$setValidity('outOfBounds', valid);
            }

            function updateModel(offset) {
                // update the model, call $parsers pipeline...
                ngModelController.$setViewValue(ngModelController.$viewValue + offset);
                // update the local view
                ngModelController.$render();
            }

            scope.isOverMin = function(strict) {
                var offset = strict ? 0 : scope.stepBy;
                return (angular.isDefined(scope.min) && (ngModelController.$viewValue - offset) < parseInt(scope.min, 10));
            };

            /**
             * @name isOverMax
             * @param strict
             * @description When the user clicks the increment button, increments the value by the step coefficient
             */
            scope.isOverMax = function(strict) {
                var offset = strict ? 0 : scope.stepBy;
                return (angular.isDefined(scope.max) && (ngModelController.$viewValue + offset) > parseInt(scope.max, 10));
            };


            /**
             * @name increment
             * @description When the user clicks the increment button, increments the value by the step coefficient
             */
            scope.increment = function() {
                if(angular.isDefined(scope.stepBy) && !isNaN(Number(scope.stepBy))){
                    updateModel(+Number(scope.stepBy));
                }
            };

            /**
             * @name decrement
             * @description UWhen the user clicks the increment button, decrements the value by the step coefficient
             */
            scope.decrement = function() {
                if(angular.isDefined(scope.stepBy) && !isNaN(Number(scope.stepBy))){
                    updateModel(-Number(scope.stepBy));
                }
            };

            // check validity on start, in case we're directly out of bounds
            checkValidity();

            // watch out min/max and recheck validity when they change
            scope.$watch('min+max', function() {
                checkValidity();
            });
        }
    };
});
