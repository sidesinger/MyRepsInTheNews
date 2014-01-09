(function ($, ko, RepsInTheNews, undefined) {
	RepsInTheNews.ViewModel = function(api) {
		var self = this;
		self.api = api;

		self.address = ko.observable('');
		
		self.getRepsByAddress = function() {
			api.getRepsByAddress(self.address(),function(isSuccess,message,data){
				if (isSuccess === true) {
					self.reps(new Reps(data));
				} else {
					self.GetRepsMessage(message);
				}
			});
		};

		self.Reps = function(data) {
			// rep data structure
		};
	};
}(jQuery, ko, window.RepsInTheNews = window.RepsInTheNews || {}));