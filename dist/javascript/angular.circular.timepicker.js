var app = angular.module('angular.datetimepicker',[]);
app.directive('datetimepicker',['$locale',function($locale){
  return {
    restrict: 'E',
    replace: true,
    scope:{
      model: '='
    },
    template: '<div class="datetimepicker">'
            +   '<div class="datetimepicker-modal" ng-click="setState(false)" ng-if="state && config.modal"  style="background-color:{{config.backgroundColor}}"></div>'
            +   '<div ng-click="setState(false)" class="datetimepicker-close" style="color:{{config.color}}" ng-if="state && config.modal">&#10006;</div>'
            +   '<input type="hidden" ng-model="model" />'
            +   '<button class="datetimepicker-toggle" ng-click="state=!state">&#128197;</button>'
            +   '<div class="datetimepicker-display">{{display}}</div>'
            +   '<div ng-if="state" class="datetimepicker-content" ng-class="{\'datetimepicker-absolute\':config.modal}">'
            +     '<div class="datetimepicker-tabs">'
            +       '<div class="datetimepicker-tab" ng-class="{\'active\':tab==\'date\'}" ng-click="tab=\'date\'">Date</div>'
            +       '<div class="datetimepicker-tab" ng-class="{\'active\':tab==\'time\'}" ng-click="tab=\'time\'">Time</div>'
            +     '</div>'
            +     '<div class="datetimepicker-preview" ng-if="tab==\'date\'">{{datePreview}}</div>'
            +     '<div class="datetimepicker-preview" ng-if="tab==\'time\'">{{timePreview}}</div>'
            +     '<div class="datetimepicker-section" ng-if="tab==\'date\'">'
            +       '<div class="datetimepicker-month">'
            +         '<div class="datetimepicker-action left" ng-click="addMonth(-1)"><</div>'
            +         '<div class="datetimepicker-action right" ng-click="addMonth(1)">></div>'
            +         '<div class="datetimepicker-current-month">{{displayMonth}} {{year}}</div>'
            +       '</div>'
            +       '<div class="datetimepicker-calendar">'
            +         '<div class="datetimepicker-day">S</div>'
            +         '<div class="datetimepicker-day">M</div>'
            +         '<div class="datetimepicker-day">T</div>'
            +         '<div class="datetimepicker-day">W</div>'
            +         '<div class="datetimepicker-day">T</div>'
            +         '<div class="datetimepicker-day">F</div>'
            +         '<div class="datetimepicker-day">S</div>'
            +         '<div class="datetimepicker-day datetimepicker-leading-day" ng-repeat="d in days.leadingDays">{{d}}</div>'
            +         '<div class="datetimepicker-day datetimepicker-active-day" ng-class="{\'selected\':day==d}" ng-click="setDay(d)" ng-repeat="d in days.days">{{d}}</div>'
            +         '<div class="datetimepicker-day datetimepicker-trailing-day" ng-repeat="d in days.trailingDays">{{d}}</div>'
            +       '</div>'
            +     '</div>'
            +     '<div class="datetimepicker-section" ng-if="tab==\'time\'">'
            +       '<div class="time-circle-outer">'
            +         '<div class="time-meridian time-left" ng-click="setMeridian(\'AM\')" ng-class="{\'selected\':meridian==\'AM\'}">AM</div>'
            +         '<div class="time-meridian time-right" ng-click="setMeridian(\'PM\')" ng-class="{\'selected\':meridian==\'PM\'}">PM</div>'
            +         '<div class="time-circle-center"></div>'
            +         '<div class="time-circle-hand time-circle-hand-large deg-{{minutes/5}}" ></div>'
            +         '<div class="time time-{{$index+1}}" ng-class="{\'selected\':minutes==time}" ng-click="setMinutes(time)" ng-repeat="time in [5,10,15,20,25,30,35,40,45,50,55,0]">{{time}}</div>'
            +         '<div class="time-circle-inner">'
            +           '<div class="time-circle-hand deg-{{hour}}" ></div>'
            +           '<div class="time time-{{$index+1}}" ng-class="{\'selected\':hour==time}" ng-click="setHour(time)" ng-repeat="time in [1,2,3,4,5,6,7,8,9,10,11,12]">{{time}}</div>'
            +         '</div>'
            +       '</div>'
            +     '</div>'
            +   '</div>'
            + '</div>',
    link: function(scope,element,attributes){
      scope.state = false;
      scope.tab = 'time';
      scope.config = {
        modal: true,
        color:'rgba(255,255,255,0.75)',
        backgroundColor: 'rgba(0,0,0,0.75)'
      };
      scope.$watch('model',function(){
        var date;
        if(!scope.model){
          date = new Date();
        }else{
          date = scope.model
        }
        scope.month = date.getMonth();
        scope.day = date.getDate();
        scope.year = date.getFullYear();
        var hour = date.getHours();
        if(hour > 12){
          scope.meridian = "PM";
        }else{
          scope.meridian = "AM";
        }
        scope.hour = hour % 12 == 0 ? 12 : hour % 12;
        scope.minutes = Math.ceil(date.getMinutes()/5)*5;
        if(scope.minutes == 60)
          scope.minutes = 55;
      })

      scope.setDay = function(d){
        scope.day = d;
      }

      scope.setState = function(state){
        scope.state = false;
      }

      scope.setHour = function(hour){
        scope.hour = hour;
      }

      scope.setMeridian = function(meridian){
        scope.meridian = meridian;
      }

      scope.setMinutes = function(minutes){
        scope.minutes = minutes;
      }

      scope.$watch('[month,day,year,hour,minutes,seconds,meridian]',function(){
        var dateString = scope.year+"-"+(scope.month+1).toString().paddingLeft("00")+"-"+scope.day.toString().paddingLeft("00");
        var timeString = scope.hour.toString().paddingLeft("00")+":"+scope.minutes.toString().paddingLeft("00")+" "+scope.meridian;
        scope.model = new Date(dateString+" "+timeString);
        scope.displayMonth = $locale.DATETIME_FORMATS.MONTH[scope.month];
        scope.display = dateString+" "+timeString;
        scope.days = scope.getDaysInMonth(scope.year,scope.month);
        scope.datePreview = dateString;
        scope.timePreview = timeString;
      });

      var days = [];
      for(var i=1;i<=31;i++){
        days.push(i);
      }
      scope.getDaysInMonth = function(year,month){
        var firstDayOfWeek = 0;
        var firstDayOfMonth = new Date(year, month, 1),
            lastDayOfMonth = new Date(year, month + 1, 0),
            lastDayOfPreviousMonth = new Date(year, month, 0),
            daysInMonth = lastDayOfMonth.getDate(),
            daysInLastMonth = lastDayOfPreviousMonth.getDate(),
            dayOfWeek = firstDayOfMonth.getDay(),
            leadingDays = (dayOfWeek - firstDayOfWeek + 7) % 7 || 7,
            trailingDays = days.slice(0, 6 * 7 - (leadingDays + daysInMonth));
        if (trailingDays.length > 7) {
          trailingDays = trailingDays.slice(0, trailingDays.length-7);
        }

        return {
          year: year,
          month: month,
          days: days.slice(0, daysInMonth),
          leadingDays: days.slice(- leadingDays - (31 - daysInLastMonth), daysInLastMonth),
          trailingDays: trailingDays
        };
      }

      scope.addMonth = function(increment){
        scope.month = scope.month + increment;
        if(scope.month < 0){
          scope.month = 11;
          scope.year--;
        }
        if(scope.month > 11){
          scope.month = 0;
          scope.year++;
        }
      }
    }
  }
}])

String.prototype.paddingLeft = function (paddingValue) {
   return String(paddingValue + this).slice(-paddingValue.length);
};
