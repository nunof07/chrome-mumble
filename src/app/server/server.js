angular
	.module('app.server')
	.factory('Server', Server);

Server.$inject = ['xmlService', 'Channel'];
function Server(xmlService, Channel) {
	ServerClass.fromJsonFormat = fromJsonFormat;
	ServerClass.fromXmlFormat = fromXmlFormat;
	
	return ServerClass;
	
	////////////////
	
	function ServerClass(data) {
		this.id = data.id;
		this.name = data.name;
		this.connectUrl = data.connectUrl;
		this.uptimeSeconds = data.uptimeSeconds;
		this.rootChannel = data.rootChannel;
	}

	function fromJsonFormat(data) {
		return new ServerClass({
			id: data.id,
			name: data.name,
			/* jshint camelcase: false */
			connectUrl: data.x_connecturl,
			uptimeSeconds: data.x_uptime,
			rootChannel: Channel.fromJsonFormat(data.root || {})
		});
	}

	function fromXmlFormat(data) {
		if (data.server) {
			var channel = {};
			
			if (angular.isArray(data.server.channel) && data.server.channel.length > 0) {
				channel = data.server.channel[0];
			}
			
			return new ServerClass({
				id: xmlService.stringToInt(data.server.id),
				name: data.server.name,
				/* jshint camelcase: false */
				connectUrl: data.server.x_connecturl,
				uptimeSeconds: xmlService.stringToInt(data.server.x_uptime),
				rootChannel: Channel.fromXmlFormat(channel)
			});
		} else {
			return new ServerClass({
				id: -1,
				uptimeSeconds: -1,
				rootChannel: {}
			});
		}
	}
}
