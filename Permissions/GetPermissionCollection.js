(function ($) {
    $.SP = $.SP || {};
    $.SP.Permissions = $.SP.Permissions || {};

    $.SP.Permissions.GetPermissionCollection = function (pathname, objectName, objectType) {

        var soap = '';      
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetPermissionCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">';
        soap += '       <objectName>' + objectName + '</objectName>';
        soap += '       <objectType>' + (objectType || 'List') + '</objectType>';
        soap += '       </GetPermissionCollection>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: pathname + '/_vti_bin/Permissions.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetPermissionCollection");
            }
        });
    }

    // Example use
    $.SP.Permissions.GetPermissionCollection(L_Menu_BaseUrl, 'exampleList').done(function (data) {
        var permissions = $(data).find('Permission').map(function (i, permission) {
            var item = {};
            
            $.each(permission.attributes, function (i, attrib) {
                item[attrib.name] = attrib.value;
            });
            return item;
        });
        console.log(permissions);
    });
})(jQuery);