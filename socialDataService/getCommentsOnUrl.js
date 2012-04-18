(function($){ 
    $.SP = {};
    $.SP.server = 'https://yourserver';
    $.SP.socialdataservice= {};
    
    $.SP.socialdataservice.getCommentsOnUrl = function (url, maximumItemsToReturn, startIndex, excludeItemsTime) {
        var soap = '';
                
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetCommentsOnUrl xmlns="http://microsoft.com/webservices/SharePointPortalServer/SocialDataService">';
		soap += '           <url>' + url + '</url>';
		if( maximumItemsToReturn ){
		soap += '           <maximumItemsToReturn>' + maximumItemsToReturn + '</maximumItemsToReturn>';
		}
		if( startIndex ){
		soap += '           <startIndex>' + startIndex + '</startIndex>';
		}
		if( excludeItemsTime ){
		soap += '           <excludeItemsTime>' + excludeItemsTime + '</excludeItemsTime>';
		}
        soap += '       </GetCommentsOnUrl>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/socialdataservice.asmx',
            data: soap,
            dataType: "xml"
        });
    }

    // Example use
    $.when( $.SP.socialdataservice.getCommentsOnUrl('url') ).done(function(data, textStatus, jqXHR){
    	var comments = [];
    	$(data).find('SocialCommentDetail').each(function(i, comment){
    		var $comment = $(comment);
    		comments.push({
				Url: $comment.find('Url').text(),
				Owner: $comment.find('Owner').text(),
				LastModifiedTime: $comment.find('LastModifiedTime').text(),
				Title: $comment.find('Title').text(),
				Comment: $comment.find('Comment').text(),
				IsHighPriority: $comment.find('IsHighPriority').text() === 'true'? true: false
    		});
    	});
    	
    	console.log(comments);
    });
})(jQuery);