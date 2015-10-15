angular
	.module('app.user')
	.factory('User', User);

User.$inject = ['xmlService'];
function User(xmlService) {
	UserClass.fromJsonFormat = fromJsonFormat;
	UserClass.fromXmlFormat = fromXmlFormat;
	
	return UserClass;
	
	////////////////
	
	function UserClass(data) {
		this.id = data.id;
		this.name = data.name;
		this.comment = data.comment;
		this.isDeaf = data.isDeaf;
		this.isSelfDeaf = data.isSelfDeaf;
		this.isMute = data.isMute;
		this.isSelfMute = data.isSelfMute;
		this.isSuppressed = data.isSuppressed;
		this.isPrioritySpeaker = data.isPrioritySpeaker;
		this.onlineSeconds = data.onlineSeconds;
		this.idleSeconds = data.idleSeconds;
	}

	function fromJsonFormat(data) {
		return new UserClass({
			id: data.userid,
			name: data.name,
			comment: data.comment,
			isDeaf: data.deaf,
			isSelfDeaf: data.selfDeaf,
			isMute: data.mute,
			isSelfMute: data.selfMute,
			isSuppressed: data.suppress,
			isPrioritySpeaker: data.prioritySpeaker,
			onlineSeconds: data.onlinesecs,
			idleSeconds: data.idlesecs
		});
	}

	function fromXmlFormat(data) {
		return new UserClass({
			id: xmlService.stringToInt(data.userid),
			name: data.name,
			comment: data.comment,
			isDeaf: xmlService.stringToBool(data.deaf),
			isSelfDeaf: xmlService.stringToBool(data.selfDeaf),
			isMute: xmlService.stringToBool(data.mute),
			isSelfMute: xmlService.stringToBool(data.selfMute),
			isSuppressed: xmlService.stringToBool(data.suppress),
			isPrioritySpeaker: xmlService.stringToBool(data.prioritySpeaker),
			onlineSeconds: xmlService.stringToInt(data.onlinesecs),
			idleSeconds: xmlService.stringToInt(data.idlesecs)
		});
	}
}