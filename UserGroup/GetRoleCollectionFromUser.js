(function ($) {
    $.SP = $.SP || {};
    $.SP.UserGroup = $.SP.UserGroup || {};

    $.SP.UserGroup.GetRoleCollectionFromUser = function (userLoginName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetRoleCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">';
        soap += '           <userLoginName>' + (userLoginName || '') + '</userLoginName>';
        soap += '       </GetRoleCollectionFromUser>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';
  
        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: '/_vti_bin/UserGroup.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetRoleCollectionFromUser");
            }
        });
    }
    // Example use
    $.SP.UserGroup.GetRoleCollectionFromUser('userLoginName').done(function (data) {
        var roles = $(data).find('Role').map(function (i, role) {
            var item = {};

            $.each(role.attributes, function (i, attrib) {
                item[attrib.name] = attrib.value;
            });
            return item;
        });
        console.log(roles);
    });
})(jQuery);