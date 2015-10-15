angular
	.module('app')
	.service('refreshService', refreshService);

refreshService.$inject = ['$q', 'logger', 'dataService', 'storage', 'badgeService', 'Config', 'Message'];
function refreshService($q, logger, dataService, storage, badgeService, Config, Message) {
	this.refreshData = refreshDataFn;
	
	////////////////
	
	function refreshDataFn() {
		return storage.sync.get('config').then(onConfig);
		
		function onConfig(result) {
			var config = result || new Config();
			
			if (!config.server.cvp) {
				return onEmptyConfig();
			} else {
				return dataService.getData(config.server.cvp)
								  .then(onSuccess)
								  .catch(onError);
			}
		}
		
		function setBadgeText(data) {
			var text = '?';
			
			if (data && data.rootChannel) {
				text = '' + data.rootChannel.userCount;
			}	
			badgeService.setText(text);
		}
		
		function store(data, message) {
			return storage.local.set('data', data)
				.then(function () {
					setBadgeText(data);
					
					return storage.local.set('message', message);
				})
				.then(function () {
					return {
						data: data,
						message: message
					};
				});
		}
		
		function onEmptyConfig() {
			var message = new Message({
				isVisible: true,
				type: Message.Type.Warning,
				text: 'Please go to settings to configure the Channel Viewer Protocol location.'
			});
			
			return store(null, message);
		}
		
		function onSuccess(data) {
			var message;
			
			if (data.rootChannel.userCount > 0 || data.rootChannel.channels.length > 0) {
				message = new Message({
					isVisible: false,
					type: Message.Type.Success,
					text: 'Success.'
				});
			} else {
				message = new Message({
					isVisible: true,
					type: Message.Type.Info,
					text: 'No users or channels found!'
				});
			}
			
			return store(data, message);
		}
		
		function onError(data) {
			logger.error('getData failed', data);
			
			var message = new Message({
				isVisible: true,
				type: Message.Type.Error,
				text: 'Failed to retrieve data from server.'
			});
				
			if (data.statusText) {
				message.text += ' (' + data.statusText + ')';
			}
			
			return store(null, message);
		}
	}
}