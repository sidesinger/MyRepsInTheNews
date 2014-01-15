(function ($, ko, RepsInTheNews, undefined) {
	RepsInTheNews.Rep = function(api, data) {
		var self = this;
		self.api = api;
		var mapping = {
			'ignore': ["api", "self"]
		};
		ko.mapping.fromJS(data, mapping, self);
		self.isActive = ko.observable(false);
		self.news = ko.observable(new RepsInTheNews.News());
		self.getNewsMessage = ko.observable('');
		self.isGettingNews = ko.observable(false);
		self.getNews = function() {
			self.getNewsMessage('');
			if (self.news().feedUrl() === "") {
				self.isGettingNews(true);
				self.api.getNewsForRep(self.name(),self.division(),function(isSuccess,message,newsData){
					if (isSuccess === true) {
						//ko.mapping.fromJS(newsData, {}, self.news);
						self.news().setNews(newsData);
					} else {
						self.getNewsMessage(message);
					}
					self.isGettingNews(false);
				});
			}
		};
	};

	RepsInTheNews.News = function() {
		var self = this;
		self.feedUrl = ko.observable('');
		self.entries = ko.observableArray();

		self.setNews = function(data) {
			self.feedUrl = data.feedUrl;
			self.entries.removeAll();
			$.each(data.entries, function(entryIndex, entry) {
				self.entries.push(new RepsInTheNews.NewsArticle(entry));
			});
		};
	};

	RepsInTheNews.NewsArticle = function(data) {
		var self = this;
		self.link = ko.observable(data.link);
		self.title = ko.observable(data.title);
		self.publishedDate = ko.observable(data.publishedDate);
		self.contentSnippet = ko.observable(data.contentSnippet);
		self.content = ko.observable(data.contentSnippet);
	};

	RepsInTheNews.ViewModel = function(api) {
		var self = this;
		self.api = api;

		self.address = ko.observable('1800 Pennsylvania Ave NW, Washington, DC 20006');
		self.isSearching = ko.observable(false);
		self.getRepsMessage = ko.observable('');
		self.reps = ko.observableArray();
		self.getRepsByAddress = function() {
			self.reps.removeAll();
			self.getRepsMessage('');
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
			var mapping = {
				create: function(options) {
					return new RepsInTheNews.Rep(self.api, options.data);
				}
			};
			ko.mapping.fromJS(data, mapping, self.reps);
		};
		self.hasSelectedRep = ko.observable(false);
		self.selectedRep = ko.observable({});
		self.selectRep = function(rep) {
			if (self.selectedRep().isActive !== undefined) {
				self.selectedRep().isActive(false);
			}
			self.selectedRep(rep);
			rep.isActive(true);
			rep.getNews();
			self.hasSelectedRep(true);
		};

	}; 
}(jQuery, ko, window.RepsInTheNews = window.RepsInTheNews || {}));