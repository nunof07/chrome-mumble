angular
	.module('app.config')
	.factory('Config', Config);

Config.$inject = [];
function Config() {
	return ConfigClass;
	
	////////////////
	
	function ConfigClass(data) {
		this.server = {
			cvp: value(data, 'server.cvp', ''),
			refreshInterval: value(data, 'server.refreshInterval', 5),
			showUserCount: value(data, 'server.showUserCount', false),
		};
		this.channel = {
			showRootInfo: value(data, 'channel.showRootInfo', true),
			showEmpty: value(data, 'channel.showEmpty', true),
			showUserCount: value(data, 'channel.showUserCount', false),
			orderBy: value(data, 'channel.orderBy')
		};
		this.user = {
			orderBy: value(data, 'user.orderBy')
		};
	}

	function value(object, path, defaultValue) {
		var result;

		if (object) {
			var index = 0;
			var members = path.split('.');
			var length = members.length;
			
			while (object != null && index < length) {
				object = object[members[index]];
				index += 1;
			}

			result = (index && index === length) ? object : undefined;
		}

		return result === undefined ? defaultValue : result;
    }
}