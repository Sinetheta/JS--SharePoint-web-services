(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver.com';
    $.SP.Lists = $.SP.Lists || {};

    $.SP.Lists.GetList = function (pathname, listName) {

        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
        soap += '           <listName>' + listName + '</listName>';
        soap += '       </GetList>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + pathname + '/_vti_bin/Lists.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetList");
            }
        });
    }

    // Example use
    $.when($.SP.Lists.GetList(L_Menu_BaseUrl, 'exampleList')).done(function (data, textStatus, jqXHR) {
        //you're on your own...
        console.log(jqXHR);
    });
})(jQuery);