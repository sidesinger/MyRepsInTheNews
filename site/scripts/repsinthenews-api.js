(function ($, RepsInTheNews, undefined) {
	RepsInTheNews.Api = function(repApiUrl,repApiKey,newsUrl) {
		var self = this;
		self.repApiKey = repApiKey;
		self.repApiUrl = repApiUrl;
		self.newsUrl = newsUrl;

		self.getRepsByAddress = function(address,callback) {
			var request = $.post({
				url: self.repApiUrl,
				data: { key: self.repApiKey, address: address }
			});
			request.success = function(data, message) {
				if (callback && typeof(callback) === "function") {  
					callback(true,message,data);  
				}  
			};
			request.failure = function(jqXHR, textStatus) {
				if (callback && typeof(callback) === "function") {  
					callback(true,message,data);  
				} 
			};
		};

		self.getNewsForRep = function(repName,repLocationName,callback) {
			var encodedRepName = encodeURI(repName);
			var encodedLocationName = encodeURI(repLocationName|| "");
			var repNewsUrl = self.newsUrl.replace("{repName}",encodedRepName).replace("{repLocationName}",encodedLocationName);
			var request = $.get({
				url: repNewsUrl,
				dataType: "xml"
			});
			request.success = function(data, message) {
				if (callback && typeof(callback) === "function") {  
					callback(true,message);  
				}
			};
			request.failure = function(jqXHR, textStatus) {
				if (callback && typeof(callback) === "function") {  
					callback(true,message);  
				}
			};
		};
	};
})(jQuery, window.RepsInTheNews = window.RepsInTheNews || {});

