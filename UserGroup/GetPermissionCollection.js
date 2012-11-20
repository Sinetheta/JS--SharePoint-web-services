(function ($) {
    $.SP = $.SP || {};
    $.SP.Usergroup = $.SP.Usergroup || {};

    $.SP.Usergroup.GetGroupCollectionFromRole = function (pathname, roleName) {

        var soap = '';      
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '        <GetGroupCollectionFromRole xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">';
        soap += '           <roleName>' + roleName + '</roleName>';
        soap += '   </GetGroupCollectionFromRole>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: pathname + '/_vti_bin/Usergroup.asmx',
            data: soap,
            dataType: "xml"
        });
    }

    // Example use
    $.SP.Usergroup.GetGroupCollectionFromRole(L_Menu_BaseUrl, 'Read').done(function (data) {
        var groups = $(data).find('Group').map(function (i, group) {
            var item = {};

            $.each(group.attributes, function (i, attrib) {
                item[attrib.name] = attrib.value;
            });
            return item;
        });
        console.log(groups);
    });
})(jQuery);