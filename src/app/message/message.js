angular
	.module('app.message')
	.factory('Message', Message);

Message.$inject = [];
function Message() {
	MessageClass.Type = {
		Info: 'info',
		Success: 'success',
		Warning: 'warning',
		Error: 'error'	
	};
	
	return MessageClass;
	
	////////////////
	
	function MessageClass(data) {
		this.isVisible = (data && data.isVisible) || false;
		this.text = (data && data.text) || '';
		this.type = (data && data.type) || MessageClass.Type.Info;
	}
}