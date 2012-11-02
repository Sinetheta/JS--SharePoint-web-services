(function ($) {
    $.SP = $.SP || {};
    $.SP.UserProfileService = $.SP.UserProfileService || {};

    $.SP.userProfileService.RemoveLink = function (AccountName, id) {
        var soap = '';
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <RemoveLink xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + (AccountName || '') + '</accountName>';
        soap += '           <id>' + id + '</id>';
        soap += '       </RemoveLink>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: '/_vti_bin/UserProfileService.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/RemoveLink");
            }
        });
    }
})(jQuery);