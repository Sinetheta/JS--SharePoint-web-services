(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver.com';
    $.SP.UserProfileService = $.SP.UserProfileService || {};

    $.SP.UserProfileService.GetCommonMemberships = function (accountName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetCommonMemberships xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + (accountName || '') + '</accountName>';
        soap += '       </GetCommonMemberships>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/userProfileService.asmx',
            data: soap,
            dataType: "xml"
        });
    }

    // Example use
    $.when($.SP.userProfileService.getCommonMemberships()).done(function (data, textStatus, jqXHR) {
        var memberships = $(data).find('MembershipData').map(function (membership) {
            var $membership = $(membership);

            return {
                Source: $membership.find('Source').text(),
                MemberGroup: {
                    SourceInternal: $membership.find('MemberGroup').find('SourceInternal').text(),
                    SourceReference: $membership.find('MemberGroup').find('SourceReference').text()
                },
                DisplayName: $membership.find('DisplayName').text(),
                Privacy: $membership.find('Privacy').text(),
                MailNickname: $membership.find('MailNickname').text(),
                Url: $membership.find('Url').text(),
                ID: parseInt($membership.find('ID').text(), 10),
                MemberGroupID: parseInt($membership.find('MemberGroupID').text(), 10)
            };
        });
        console.log(memberships);
    });
})(jQuery);