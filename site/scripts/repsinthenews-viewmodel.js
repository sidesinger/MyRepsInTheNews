(function ($, ko, RepsInTheNews, undefined) {
	RepsInTheNews.ViewModel = function(api) {
		var self = this;
		self.api = api;
		self.rawResults = ko.observable(''); // todo: remove: debug

		self.address = ko.observable('');
		self.isSearching = ko.observable(false);
		self.getRepsMessage = ko.observable('');
		self.getRepsByAddress = function() {
			self.isSearching(true);
			api.getRepsByAddress(self.address(),function(isSuccess,message,data){
				if (isSuccess === true) {
					self.processResult(data);
				} else {
					self.getRepsMessage(message);
				}
				self.isSearching(false);
			});
		};
		self.processSearchResult = function(data) {
			
			self.rawResults(data); // debug
			self.reps(new RepsInTheNews.Reps(data));
		};
		
		RepsInTheNews.Reps = function(data) {
			// rep data structure
		};
		self.reps = ko.observable(new RepsInTheNews.Reps());

	};
}(jQuery, ko, window.RepsInTheNews = window.RepsInTheNews || {}));