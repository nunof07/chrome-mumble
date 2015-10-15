angular
	.module('app.channel')
	.filter('emptyChannels', emptyChannels);

emptyChannels.$inject = [];
function emptyChannels() {
	return emptyChannelsFn;

	function emptyChannelsFn(input, showEmpty) {
		var filtered = [],
			channels = input || [];
		
		for (var i = 0; i < channels.length; i++) {
			if (showEmpty || !channels[i].isEmpty) {
				filtered.push(channels[i]);
			}
		}

        return filtered;
	}
}