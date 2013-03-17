'use strict';

describe('Controller Tests', function () {

    beforeEach(module('pd'));

    describe('IntlCtrl', function () {
        /*
         * http://docs.angularjs.org/api/ngMock.$httpBackend
         * http://docs.angularjs.org/tutorial/step_05
         * */
        var scope, ctrl, $httpBackend;

        beforeEach(
            inject(
                function (_$httpBackend_, $rootScope, $controller) {
                    $httpBackend = _$httpBackend_;
                    $httpBackend.expectGET('/api/c3p0?limit=12&offset=0').
                        respond([
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'a', reveal: 'aa'},
                        {hint: 'b', reveal: 'bb'}
                    ]);
                    scope = $rootScope.$new();
                    ctrl = $controller('IntlCtrl', {$scope: scope});
                }
            )
        );

        it('should set the number of cols', function () {
            expect(scope.cols.length).toEqual(0);
            $httpBackend.flush();
            expect(scope.cols.length).toEqual(3);
        });

        it('should calculate the number of rows', function () {
            expect(scope.rows.length).toEqual(0);
            $httpBackend.flush();
            expect(scope.rows.length).toEqual(4);
            scope.$apply(scope.cards.length = 30);
            expect(scope.rows.length).toEqual(10);
        });

        it('should post a new card', function () {
            $httpBackend.flush(); // initial GET
            var howMany = scope.cards.length;
            $httpBackend.expectPOST('/api/c3p0').respond({hint: '垚', reveal: 'yao'});
            scope.addCard('垚', 'yao');
            $httpBackend.flush();
            expect(scope.cards.length).toBe(howMany + 1);
        });

        it('should fetch cards by offset and limit', function () {
            $httpBackend.flush(); // initial GET
            $httpBackend.expectGET('/api/c3p0?limit=12&offset=12').respond([
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'}
            ]);
            scope.busy = false;
            scope.fetchCards();
            $httpBackend.flush();
            expect(scope.offset).toBe(18);
        });

        it('should set busy if response length is less than limit', function(){
            $httpBackend.flush(); // initial GET
            $httpBackend.expectGET('/api/c3p0?limit=12&offset=12').respond([
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'}
            ]);
            scope.busy = false;
            scope.fetchCards();
            $httpBackend.flush();
            expect(scope.busy).toBeFalsy();
            $httpBackend.expectGET('/api/c3p0?limit=12&offset=24').respond([
                {hint: 'a', reveal: 'aa'},
                {hint: 'a', reveal: 'aa'}
            ]);
            scope.fetchCards();
            $httpBackend.flush();
            expect(scope.busy).toBeTruthy();

        });

    });


});

