
(function ($, ko, RepsInTheNews, undefined) {
	var self = this;
	var repApiUrl = "https://www.googleapis.com/civicinfo/us_v1/{action}?key=AIzaSyAJcWDCHjcNKiTsZODx-OX9FvdGi8NISbA";
	var newsUrl = "https://news.google.com/news/feeds?q={repName}%20{repLocationName}&output=rss";
	var api = new RepsInTheNews.Api(repApiUrl,newsUrl);

	RepsInTheNews.init = function() {
		var viewModel = new RepsInTheNews.ViewModel(api);
		RepsInTheNews.koModel = ko.applyBindings(viewModel);
	};
}(jQuery, ko, window.RepsInTheNews = window.RepsInTheNews || {}));
