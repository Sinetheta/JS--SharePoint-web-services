(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver';
    $.SP.SocialDataService = $.SP.SocialDataService || {};

    $.SP.SocialDataService.AddComment = function (options) {
      /* 
        getListItems = {
            url: string,
            comment: string,
            title: string,
            isHighPriority: bool
        }
        */
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetCommentsOnUrl xmlns="http://microsoft.com/webservices/SharePointPortalServer/SocialDataService">';
        
        $.each(options, function (name, value) {
            soap += '       <' + name + '>' + value + '</' + name + '>';
        });
        
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
    $.SP.SocialDataService.AddComment({
        url: 'https://twitter.com/',
        comment: 'I love tweets!',
        title: 'Twitter'
    })
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
