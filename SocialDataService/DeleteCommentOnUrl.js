(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver';
    $.SP.SocialDataService = $.SP.SocialDataService || {};
      
    $.SP.SocialDataService.DeleteComment = function (options) {
    	/* 
        options = {
            url: string,
            lastModifiedTime: string
        }
        */
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <DeleteComment xmlns="http://microsoft.com/webservices/SharePointPortalServer/SocialDataService">';
        
        $.each(options, function (name, value) {
            soap += '       <' + name + '>' + value + '</' + name + '>';
        });
        
        soap += '       </DeleteComment>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';
        
        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/socialDataService.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://microsoft.com/webservices/SharePointPortalServer/SocialDataService/DeleteComment");
            }
        });
    }

    // Example use
    $.when($.SP.SocialDataService.DeleteComment({
    	url: 'https://twitter.com/',
    	lastModifiedTime: '2012-04-13T16:29:55.207'
    	}))
    .done(function (data, textStatus, jqXHR) {
        var comments = $(data).find('SocialCommentDetail').map(function (i, val) {
            var comment = $(val);

            return {
                Url: comment.find('Url').text(),
                Owner: comment.find('Owner').text(),
                LastModifiedTime: comment.find('LastModifiedTime').text(),
                Title: comment.find('Title').text(),
                Comment: comment.find('Comment').text(),
                IsHighPriority: comment.find('IsHighPriority').text() === 'true' ? true : false
            };
        });

        console.log(comments);
    });
})(jQuery);