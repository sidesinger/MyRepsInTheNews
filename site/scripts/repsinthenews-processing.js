
(function ($, ko, RepsInTheNews, undefined) {
	var self = this;
	var repApiUrl = "https://www.googleapis.com/civicinfo/us_v1/{action}?key=AIzaSyAJcWDCHjcNKiTsZODx-OX9FvdGi8NISbA";
	var newsUrl = "https://news.google.com/news/feeds?q={repName}%20{repLocationName}&output=rss";
	var api = new RepsInTheNews.Api(repApiUrl,newsUrl);

	RepsInTheNews.init = function() {
		var viewModel = new RepsInTheNews.ViewModel(api);
		RepsInTheNews.koModel = ko.applyBindings(viewModel);
	};

	RepsInTheNews.scrollWindow = function(location) {
		$(window).scrollTop(location);
	};
	RepsInTheNews.scrollToElement = function(element) {
		$('html,body').animate({scrollTop: element.offset().top});
	};
}(jQuery, ko, window.RepsInTheNews = window.RepsInTheNews || {}));
