angular
	.module('app.core')
	.filter('timespan', timespan);

timespan.$inject = [];
function timespan() {
	return timespanFn;
	
	function timespanFn(input) {
		if (angular.isNumber(input)) {
			var minuteSecs = 60;
			var hourSecs = 60 * minuteSecs;
			var daySecs = 24 * hourSecs;
			var weekSecs = 7 * daySecs;
			var secs = parseInt(input, 10);
			var output = '';
			
			var weeks = Math.floor(secs / weekSecs);
			secs = secs % weekSecs;
			
			var days = Math.floor(secs / daySecs);
			secs = secs % daySecs;
			
			var hours = Math.floor(secs / hourSecs);
			secs = secs % hourSecs;
			
			var minutes = Math.floor(secs / minuteSecs);
			
			var seconds = secs % minuteSecs;
			
			if (weeks) {
				output += weeks + 'w ';
			}
			
			if (days) {
				output += days + 'd ';
			}
			
			if (hours) {
				output += hours + 'h ';
			}
			
			if (minutes || hours) {
				output += minutes + 'm ';
			}
			output += seconds + 's';
			
			return output;
		} else {
			return input;
		}
	}
}