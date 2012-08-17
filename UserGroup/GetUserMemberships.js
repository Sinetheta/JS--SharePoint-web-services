(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://theloop.gov.bc.ca';
    $.SP.UserProfileService = $.SP.UserProfileService || {};

    $.SP.UserProfileService.GetUserMemberships = function (accountName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetUserMemberships xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + (accountName || '') + '</accountName>';
        soap += '       </GetUserMemberships>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/UserProfileService.asmx',
            data: soap,
            dataType: "xml"
        });
    }
    // Example use
    $.when($.SP.UserProfileService.GetUserMemberships()).done(function (data, textStatus, jqXHR) {
        console.log($.map($(data).find('MembershipData'), function(val){
            var group = $(val);
            return {
                Source: group.find('Source').text(),
                MemberGroup: {
                    SourceInternal: group.find('SourceInternal').text(),
                    SourceReference: group.find('SourceReference').text()
                },
                Group: group.find('Group').text(),
                DisplayName: group.find('DisplayName').text(),
                Privacy: group.find('Privacy').text(),
                MailNickname: group.find('MailNickname').text(),
                Url: group.find('Url').text(),
                ID: parseInt(group.find('ID').text(), 10),
                MemberGroupID: parseInt(group.find('MemberGroupID').text(), 10)
          }
        }))
    });
})(jQuery);