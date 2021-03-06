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
					var reps = [];
					for(var nextDivisionProp in data.divisions) {
						var division = data.divisions[nextDivisionProp];
						if (division.officeIds !== undefined) {
							$.each(division.officeIds, function(officeIndex, officeId) {
								var office = data.offices[officeId];
								if (office.officialIds !== undefined) {
									$.each(office.officialIds, function(officalIndex, officialId) {
										var official = data.officials[officialId];
										official.office = office.name;
										official.division = division.name;
										reps.push(official);
									});
								}
							});
						}
					}
					return { 
						isSuccess: true, 
						message: "Found your address, here are your representatives.",
						data: reps
					};
				case "addressUnparseable":
					return { isSuccess: false, message:"Couldn't find that address, make sure it's correct."};
				default:
					return { isSuccess: false, message: "Error performing the search.  Please try again."};
			}
		};

		self.getNewsForRep = function(repName, repLocationName, callback) {
			var feedUrl = self.getNewsForRepUrl(repName,repLocationName);
			var feed = new google.feeds.Feed(feedUrl);
			feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
			feed.load(function(result){
				if (result.error) {
					if (callback && typeof(callback) === "function") {  
						callback(false, "Error performing getting the news.  Please try again.");  
					}
				} else {
					if (callback && typeof(callback) === "function") {  
						callback(true, "", result.feed);  
					}
				}
			});
		};

		self.getNewsForRepUrl = function(repName,repLocationName) {
			var encodedRepName = encodeURI(repName);
			var encodedLocationName = encodeURI(repLocationName|| "");
			var repNewsUrl = self.newsUrl.replace("{repName}",encodedRepName).replace("{repLocationName}",encodedLocationName);
			return repNewsUrl;
		};
	};
})(jQuery, window.RepsInTheNews = window.RepsInTheNews || {});

