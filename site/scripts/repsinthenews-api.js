(function ($, RepsInTheNews, undefined) {
	RepsInTheNews.Api = function(repApiUrlWithKey,newsUrl) {
		var self = this;
		self.repApiUrlWithKey = repApiUrlWithKey;
		self.newsUrl = newsUrl;

		self.getRepsByAddress = function(searchAddress,callback) {
			var url = self.repApiUrlWithKey.replace("{action}","representatives/lookup");
			var request = $.ajax({
				type: "POST",
				async: true,
				contentType: "application/json; charset=utf-8",
				url: url,
				data: "{address:'"+searchAddress+"'}",
				dataType: "json"
			}).success(function(data, message) {
				var getRepsResult = self.parseGetRepsResult(data);
				if (callback && typeof(callback) === "function") {  
					callback(getRepsResult.isSuccess, getRepsResult.message, getRepsResult.data);  
				}  
			}).fail(function(jqXHR, textStatus) {
				if (callback && typeof(callback) === "function") {  
					callback(false, "Error performing the search.  Please try again.");  
				} 
			});
		};

		self.parseGetRepsResult = function(data) {
			switch (data.status) {
				case "success":
					return { 
						isSuccess: true, 
						message: "Found your address, here are your representatives.",
						data: { officials: data.officials, offices: data.offices}
					};
				case "addressUnparseable":
					return { isSuccess: false, message:"Couldn't find that address, make sure it's correct."};
				default:
					return { isSuccess: false, message: "Error performing the search.  Please try again."};
			}
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

