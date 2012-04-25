(function($){ 
    $.SP = {};
    $.SP.server = 'https://your-server';
    $.SP.socialDataService = {};
    
    $.SP.socialDataService.addComment = function (url, comment, title, isHighPriority) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <AddComment xmlns="http://microsoft.com/webservices/SharePointPortalServer/SocialDataService">';
        soap += '           <url>' + url + '</url>';
        soap += '           <comment>' + comment + '</comment>';
        soap += '           <isHighPriority>' + (isHighPriority || 'false') + '</isHighPriority>';
        soap += '           <title>' + title + '</title>';
        soap += '       </AddComment>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';
        
        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/socialDataService.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://microsoft.com/webservices/SharePointPortalServer/SocialDataService/AddComment");
            }
        });
    }

    // Example use
    $.when($.SP.socialDataService.addComment('https://twitter.com/','I love tweets!','Twitter')).done(function (data, textStatus, jqXHR) {
        var $comment = $(data).find('AddCommentResponse')
        console.log({
            Url: $comment.find('Url').text(),
            Owner: $comment.find('Owner').text(),
            LastModifiedTime: $comment.find('LastModifiedTime').text(),
            Title: $comment.find('Title').text(),
            Comment: $comment.find('Comment').text(),
            IsHighPriority: $comment.find('IsHighPriority').text()
        });
    });
})(jQuery);