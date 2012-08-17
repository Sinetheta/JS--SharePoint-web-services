(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver';
    $.SP.UserGroup = $.SP.UserGroup || {};

    $.SP.UserGroup.GetUserCollectionFromGroup = function (groupName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetUserCollectionFromGroup xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">';
        soap += '           <groupName>' + (groupName|| '') + '</groupName>';
        soap += '       </GetUserCollectionFromGroup>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/UserGroup.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetUserCollectionFromGroup");
            }
        });
    }
    // Example use
    $.when($.SP.UserGroup.GetUserCollectionFromGroup('group name')).done(function (data, textStatus, jqXHR) {
        console.log($.map($(data).find('User'), function(val){
            var user = $(val);
            return {
                ID: parseInt(user.attr('ID'), 10),
                Sid: user.attr('Sid'),
                Name: user.attr('Name'),
                LoginName: user.attr('LoginName'),
                Email: user.attr('Email'),
                Notes: user.attr('Notes'),
                IsSiteAdmin: (user.attr('IsSiteAdmin') === 'True'),
                IsDomainGroup: (user.attr('IsDomainGroup') === 'True'),
                Flags: parseInt(user.attr('Flags'), 10)
            }
        }))
    });
})(jQuery);