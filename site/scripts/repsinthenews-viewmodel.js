(function ($, ko, RepsInTheNews, undefined) {
	RepsInTheNews.Rep = function(api, data) {
		var self = this;
		self.api = api;
		var mapping = {
			'ignore': ["api", "self"]
		};
		ko.mapping.fromJS(data, mapping, self);

		self.news = ko.observable('');
		self.isGettingNews = ko.observable(false);
		self.getNews = function() {
			self.isFetchingNews(true);
			self.api.getNewsForRep(self.name,self.division,function(isSuccess,message,data){
				//todo
			});
		};
	};

	RepsInTheNews.ViewModel = function(api) {
		var self = this;
		self.api = api;
		self.rawResults = ko.observable(''); // todo: remove: debug

		self.address = ko.observable('1800 Pennsylvania Ave NW, Washington, DC 20006');
		self.isSearching = ko.observable(false);
		self.getRepsMessage = ko.observable('');
		self.reps = ko.observableArray();
		self.getRepsByAddress = function() {
			self.isSearching(true);
			self.api.getRepsByAddress(self.address(),function(isSuccess,message,data){
				if (isSuccess === true) {
					self.processSearchResult(data);
				} else {
					self.getRepsMessage(message);
				}
				self.isSearching(false);
			});
		};
		self.processSearchResult = function(data) {
			self.rawResults(data);
			var mapping = {
				create: function(options) {
					return new RepsInTheNews.Rep(self.api, options.data);
				}
			};
			ko.mapping.fromJS(data, mapping, self.reps);
		};
	}; 
}(jQuery, ko, window.RepsInTheNews = window.RepsInTheNews || {}));