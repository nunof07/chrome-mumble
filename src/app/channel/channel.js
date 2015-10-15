angular
	.module('app.channel')
	.factory('Channel', Channel);

Channel.$inject = ['logger', 'transformer', 'xmlService', 'User'];
function Channel(logger, transformer, xmlService, User) {
	ChannelClass.fromJsonFormat = fromJsonFormat;
	ChannelClass.fromXmlFormat = fromXmlFormat;
	
	return ChannelClass;
	
	////////////////
	
	function ChannelClass(data) {
		this.id = data.id;
		this.name = data.name;
		this.descriptionHtml = data.descriptionHtml;
		this.connectUrl = data.connectUrl;
		this.users = data.users;
		this.channels = data.channels;
		this.isTemporary = data.isTemporary;
		this.userCount = countUsers(this);
		this.isEmpty = (this.userCount === 0);
	}
	
	function countUsers(channel) {
		var count = channel.users.length;
		
		for (var i = 0; i < channel.channels.length; i++) {
			count += channel.channels[i].userCount;
		}
		
		return count;
	}
	
	function fromJsonFormat(data) {
		return new ChannelClass({
			id: data.id,
			name: data.name,
			descriptionHtml: data.description,
			isTemporary: data.temporary,
			/* jshint camelcase: false */
			connectUrl: data.x_connecturl,
			channels: transformer.transform(data.channels || [], fromJsonFormat),
			users: transformer.transform(data.users || [], User.fromJsonFormat)
		});
	}

	function fromXmlFormat(data) {
		return new ChannelClass({
			id: xmlService.stringToInt(data.id),
			name: data.name,
			descriptionHtml: data.description,
			isTemporary: xmlService.stringToBool(data.temporary),
			/* jshint camelcase: false */
			connectUrl: data.x_connecturl,
			channels: transformer.transform(data.channel || [], fromXmlFormat),
			users: transformer.transform(data.user || [], User.fromXmlFormat)
		});
	}
}