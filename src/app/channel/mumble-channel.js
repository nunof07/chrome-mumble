angular
	.module('app.channel')
	.directive('mumbleChannel', mumbleChannel);

mumbleChannel.$inject = ['RecursionHelper', 'logger'];
function mumbleChannel(RecursionHelper, logger) {
	var directive = {
        templateUrl: 'app/channel/mumble-channel.html',
		scope: {
			channel: '=',
			config: '=',
			showInfo: '='
		},
		compile: function (element) {
			return RecursionHelper.compile(element);
        }
	};

	return directive;
}
