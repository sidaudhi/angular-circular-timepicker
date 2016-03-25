describe('functional', function(){
  var element, scope;
	beforeEach(module('angular.circular.datetimepicker'));
  beforeEach(inject(function(_$compile_,_$rootScope_) {
    scope = _$rootScope_.$new();
    element = _$compile_('<circulartimepicker model="datetime"></circulartimepicker>')(scope);
    scope.$digest();
  }));
  describe('configuration', function() {
    it("initial state should be false", function() {
      element.isolateScope().state.should.be.false;
    })
    it("initial tab should be time", function() {
      element.isolateScope().tab.should.equal('time');
    })
    it("modal should be true", function() {
      element.isolateScope().config.modal.should.be.true;
    })
    it("months should have 12 entries", function() {
      element.isolateScope().months.should.have.length(12);
    });
    it("days should have 7 entries", function() {
      element.isolateScope().dayNames.should.have.length(7);
    })
  });
  describe('display date',function(){
    describe('with scoped input',function(){
      var defaultInput = moment('2015-08-22T18:00:00.000Z')
      beforeEach(inject(function(_$compile_,_$rootScope_) {
        scope.datetime = defaultInput.toDate();
        scope.$digest();
      }));
      it("should hold scoped input in display",function(){
        element.isolateScope().display.should.equal(defaultInput.format('YYYY-MM-DD hh:mm A'));
      });
      it("should hold correct hour",function(){
        element.isolateScope().hour.should.equal(11);
      });
      it("should hold correct minute",function(){
        element.isolateScope().minute.should.equal(defaultInput.minute());
      });
      it("should hold correct meridian",function(){
        element.isolateScope().meridian.should.equal('PM');
      });
      it("should hold correct preview date",function(){
        element.isolateScope().datePreview.should.equal(defaultInput.format('YYYY-MM-DD'))
      });
      it("should hold correct preview time",function(){
        element.isolateScope().timePreview.should.equal(defaultInput.format('hh:mm A'))
      });
    });
    describe('with no input',function(){
      var defaultInput = moment();
      defaultInput = defaultInput.minute(5*Math.ceil(defaultInput.minute()/5));

      it("should hold rounded input in display",function(){
        element.isolateScope().display.should.equal(defaultInput.format('YYYY-MM-DD hh:mm A'));
      });

    });
  });
  describe('on open',function(){
    beforeEach(inject(function() {
      element.find('button').triggerHandler('click');
    }));
    describe('click on toggle button',function(){
      it("should set state to true on first click",function(){
        element.isolateScope().state.should.be.true;
      })
      it("should set state to false on second click",function(){
        element.find('button').triggerHandler('click');
        element.isolateScope().state.should.be.false;
      })
    });
    describe('click on modal close',function(){
      it("should set state to false",function(){
        $(element).find('.datetimepicker-close').triggerHandler('click');
        element.isolateScope().state.should.be.false;
      })
    })
    describe('click on modal background',function(){
      it("should set state to false",function(){
        $(element).find('.datetimepicker-modal').triggerHandler('click');
        element.isolateScope().state.should.be.false;
      })
    })
    describe('click on date tab',function(){
      it("should set tab to date",function(){
        $(element).find('.datetimepicker-tab-date').triggerHandler('click');
        element.isolateScope().tab.should.equal('date');
      })
    })
  })
});
