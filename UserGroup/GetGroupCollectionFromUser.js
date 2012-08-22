(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver';
    $.SP.UserGroup = $.SP.UserGroup || {};

    $.SP.UserGroup.GetGroupCollectionFromUser = function (userLoginName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">';
        soap += '           <userLoginName>' + (userLoginName || '') + '</userLoginName>';
        soap += '       </GetGroupCollectionFromUser>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';
  
        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/UserGroup.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetGroupCollectionFromUser");
            }
        });
    }
    // Example use
    $.SP.UserGroup.GetGroupCollectionFromUser('dommain\\username').done(function (data, textStatus, jqXHR) {
        console.log($.map($(data).find('Group'), function(val){
            var group = $(val);
            return {
                ID: parseInt(group.attr('ID'), 10),
                Name: group.attr('Name'),
                Description: group.attr('Description'),
                OwnerID: parseInt(group.attr('OwnerID'), 10),
                OwnerIsUser: (group.attr('OwnerIsUser') === 'True')
            }
        }))
    });
})(jQuery);