
(function ($, ko, RepsInTheNews, undefined) {
	var self = this;
	var repApiUrl = "";
	var repApiKey = "";
	var newsUrl = "https://news.google.com/news/feeds?q={repName}%20{repLocationName}&output=rss";
	var api = new RepsInTheNews.Api(repApiUrl,repApiKey,newsUrl);

	RepsInTheNews.init = function() {
		self.viewModel = new RepsInTheNews.ViewModel(api);
		ko.applyBindings(self.viewModel);
	};

	// do this or have the function in the view model?
	RepsInTheNews.getRepsByAddress = function(address) {
		api.getRepsByAddress(address,function(isSuccess,message,data){
			if (isSuccess === true) {
				self.viewModel.setReps(data);
			} else {
				self.viewModel.setGetRepsMessage(message);
			}
		});
	};

}(jQuery, ko, window.RepsInTheNews = window.RepsInTheNews || {}));
