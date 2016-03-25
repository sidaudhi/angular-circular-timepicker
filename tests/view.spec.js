describe('view', function(){
  var element, scope;
	beforeEach(module('angular.circular.datetimepicker'));
  beforeEach(inject(function(_$compile_,_$rootScope_) {
    scope = _$rootScope_.$new();
    element = _$compile_('<circulartimepicker model="datetime"></circulartimepicker>')(scope);
    scope.$digest();
  }));
  describe('display date',function(){
    describe('with scoped input',function(){
      var defaultInput = moment('2015-08-22T18:00:00.000Z')
      beforeEach(inject(function(_$compile_,_$rootScope_) {
        scope.datetime = defaultInput.toDate();
        scope.$digest();
      }));
      it("should display the date from rootscope",function(){
        $(element).find('.datetimepicker-display').text().should.equal(defaultInput.format('YYYY-MM-DD hh:mm A'));
      });
    });
    describe('with no input',function(){
      var defaultInput = moment();
      defaultInput = defaultInput.minute(5*Math.ceil(defaultInput.minute()/5));

      it("should display the date rounded to nearest 5 minutes",function(){
        $(element).find('.datetimepicker-display').text().should.equal(defaultInput.format('YYYY-MM-DD hh:mm A'));
      });
    });
  });
  describe('on open',function(){
    beforeEach(inject(function() {
      element.find('button').triggerHandler('click');
    }));
    describe('toggle button',function(){
      it('should display timepicker on click',function(){
        $(element).find('.datetimepicker-modal').should.have.length(1);
      });
      it('should hide timepicker on second click',function(){
        element.find('button').triggerHandler('click');
        $(element).find('.datetimepicker-modal').should.have.length(0);
      });
    });
    describe('modal close',function(){
      it('should hide timepicker',function(){
        $(element).find('.datetimepicker-close').triggerHandler('click');
        $(element).find('.datetimepicker-modal').should.have.length(0);
      })
    })
    describe('modal background',function(){
      it('should hide timepicker',function(){
        $(element).find('.datetimepicker-modal').triggerHandler('click');
        $(element).find('.datetimepicker-modal').should.have.length(0);
      })
    })
    describe('click on date tab',function(){
      it("should set tab to date",function(){
        $(element).find('.datetimepicker-tab-date').triggerHandler('click');
        $(element).find('.datetimepicker-date-section').should.have.length(1);
      })
    })
  });
});
