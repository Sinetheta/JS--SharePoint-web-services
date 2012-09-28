(function ($) {
    $.SP = $.SP || {};
    $.SP.Search = $.SP.Search || {};

    $.SP.Search.GetPortalSearchInfo = function () {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetPortalSearchInfo xmlns="http://microsoft.com/webservices/OfficeServer/QueryService" />';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: '/_vti_bin/Search.asmx',
            data: soap,
            dataType: "xml"
        });
    }

    // Example use
    $.SP.Search.GetPortalSearchInfo().done(function (data, textStatus, jqXHR) {
        var escapedScopes = $(data).find('GetPortalSearchInfoResult').text();
        var scopes = $(escapedScopes).find('Name');
        
        scopes = $.map(scopes, function (scope) {
            return $(scope).text();
        });
        console.log(scopes);
    });
})(jQuery);