/**
 * @license angular-circular-timepicker  version: 0.1.0
 * Copyright 2016 sidaudhi.com, Inc. http://www.sidaudhi.com
 * License: MIT
 *
 * @author        Siddharth Audhinarayanan
 * @since        2016-Jan-31
 */
 String.prototype.paddingLeft = function (paddingValue) {
    return String(paddingValue + this).slice(-paddingValue.length);
 };

var app = angular.module('angular.circular.datetimepicker',[]);
app.directive('circulartimepicker',[function(){
  return {
    restrict: 'E',
    replace: true,
    scope:{
      model: '=',
      format: '='
    },
    template: '<div class="datetimepicker">'
            +   '<div class="datetimepicker-modal" ng-click="setState(false)" ng-if="state && config.modal"  style="background-color:{{config.backgroundColor}}"></div>'
            +   '<div ng-click="setState(false)" class="datetimepicker-close" style="color:{{config.color}}" ng-if="state && config.modal">&#10006;</div>'
            +   '<input type="hidden" ng-model="model" />'
            +   '<button class="datetimepicker-toggle" ng-click="state=!state">&#128197;</button>'
            +   '<div class="datetimepicker-display">{{display}}</div>'
            +   '<div ng-if="state" class="datetimepicker-content" ng-class="{\'datetimepicker-absolute\':config.modal}">'
            +     '<div class="datetimepicker-tabs">'
            +       '<div class="datetimepicker-tab datetimepicker-tab-date" ng-class="{\'active\':tab==\'date\'}" ng-click="setTab(\'date\')"><span>Date</span></div>'
            +       '<div class="datetimepicker-tab datetimepicker-tab-time" ng-class="{\'active\':tab==\'time\'}" ng-click="setTab(\'time\')"><span>Time</span></div>'
            +     '</div>'
            +     '<div class="datetimepicker-preview" ng-if="tab==\'date\'">{{datePreview}}</div>'
            +     '<div class="datetimepicker-preview" ng-if="tab==\'time\'">{{timePreview}}</div>'
            +     '<div class="datetimepicker-section datetimepicker-date-section" ng-if="tab==\'date\'">'
            +       '<div class="datetimepicker-month">'
            +         '<div class="datetimepicker-action left" ng-click="addMonth(-1)"><</div>'
            +         '<div class="datetimepicker-action right" ng-click="addMonth(1)">></div>'
            +         '<div class="datetimepicker-current-month">{{displayMonth}} {{year}}</div>'
            +       '</div>'
            +       '<div class="datetimepicker-year">'
            +         '<div class="datetimepicker-action left" ng-click="addYear(-1)"><</div>'
            +         '<div class="datetimepicker-action right" ng-click="addYear(1)">></div>'
            +         '<div class="datetimepicker-current-year">{{displayYear}}</div>'
            +       '</div>'
            +       '<div class="datetimepicker-calendar">'
            +         '<div class="datetimepicker-day" ng-repeat="day in dayNames">{{day | limitTo: 1}}</div>'
            +         '<div class="datetimepicker-day datetimepicker-leading-day" ng-repeat="d in days.leadingDays">{{d}}</div>'
            +         '<div class="datetimepicker-day datetimepicker-active-day" ng-class="{\'selected\':day==d}" ng-click="setDay(d)" ng-repeat="d in days.days">{{d}}</div>'
            +         '<div class="datetimepicker-day datetimepicker-trailing-day" ng-repeat="d in days.trailingDays">{{d}}</div>'
            +       '</div>'
            +     '</div>'
            +     '<div class="datetimepicker-section datetimepicker-date-time" ng-if="tab==\'time\'">'
            +       '<div class="time-circle-outer">'
            +         '<div class="time-meridian time-left" ng-click="setMeridian(\'AM\')" ng-class="{\'selected\':meridian==\'AM\'}">AM</div>'
            +         '<div class="time-meridian time-right" ng-click="setMeridian(\'PM\')" ng-class="{\'selected\':meridian==\'PM\'}">PM</div>'
            +         '<div class="time-circle-center"></div>'
            +         '<div class="time-circle-hand time-circle-hand-large deg-{{minute/5}}" ></div>'
            +         '<div class="time time-{{$index+1}}" ng-class="{\'selected\':minute==time}" ng-click="setMinutes(time)" ng-repeat="time in [5,10,15,20,25,30,35,40,45,50,55,0]">{{time}}</div>'
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
      scope.setTab = function(tab){
        scope.tab = tab;
      }
      scope.displayFormat = scope.format && scope.format.momentFormat ? scope.format.momentFormat : scope.format && scope.format.military ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD hh:mm A';
      scope.config = {
        modal: true,
        color:'rgba(255,255,255,0.75)',
        backgroundColor: 'rgba(0,0,0,0.75)'
      };
      scope.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      scope.dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      scope.$watch('model',function(value){
        var m;
        if(value)
          m = moment(value);
        else
          m = moment();
        m = m.minute(5*Math.ceil(m.minute()/5));
        scope.display = m.format(scope.displayFormat);
        scope.days = scope.getDaysInMonth(m.year(),m.month());
        scope.minute = m.minute();
        scope.meridian = m.format('A');
        scope.hour  = scope.meridian == 'PM' ? m.hour() - 12: m.hour();
        if(scope.hour==0) scope.hour = 12;
        scope.datePreview = m.format('YYYY-MM-DD');
        scope.timePreview = m.format('hh:mm A');
        scope.displayMonth = scope.months[m.month()];
        scope.displayYear = m.format('YYYY');
        scope.day = m.date();
      })

      scope.setDay = function(date){
        scope.model = moment(scope.model).date(date).toDate();
      }

      scope.setState = function(state){
        scope.state = false;
      }

      scope.setHour = function(hour){
        if(scope.meridian == 'PM' && hour < 12)
          hour = hour + 12;
        if(scope.meridian == 'AM' && hour == 12)
          hour = hour - 12;
        scope.model = moment(scope.model).hour(hour).toDate();
      }

      scope.setMeridian = function(meridian){
        var m = moment(scope.model);

        if(meridian == 'AM'){
          if(m.hours()>=12){
            m = m.add(-12,'hours');
            scope.model = m.toDate();
          }
        }else{
          if(m.hours()<12){
            m = m.add(12,'hours');
            scope.model = m.toDate();
          }
        }
      }

      scope.setMinutes = function(minutes){
        scope.model = moment(scope.model).minute(minutes).toDate();
      }

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
        scope.model = moment(scope.model).add(increment,'months').toDate();
      }

      scope.addYear = function(increment){
        scope.model = moment(scope.model).add(increment,'years').toDate();
      }
    }
  }
}]);
