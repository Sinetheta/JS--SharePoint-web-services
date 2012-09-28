(function ($) {
    $.SP = $.SP || {};
    $.SP.Lists = $.SP.Lists || {};

    $.SP.Lists.GetAttachmentCollection = function (pathname, getAttachmentCollection) {
        /*
        getAttachmentCollection = {
            listName: string,
            listItemID: int
        }
        */

        var soap = '';
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';        
        soap += '      <GetAttachmentCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">';

        $.each(getAttachmentCollection, function (name, value) {
            soap += '       <' + name + '>' + value + '</' + name + '>';
        });

        soap += '       </GetAttachmentCollection>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: pathname + '/_vti_bin/Lists.asmx',
            data: soap,
            dataType: "xml"
        });
    }
    
    // Example use
    $.SP.Lists.GetAttachmentCollection(L_Menu_BaseUrl, {
        listName: 'Announcements',
        listItemID: 6
    }).done(function (data, textStatus, jqXHR) {
        var attachments = $(data).find('Attachment').map(function (listItem) {
            return $(this).text();
        });
        console.log(attachments)
    });
})(jQuery);