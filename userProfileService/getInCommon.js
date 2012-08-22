(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver.com';
    $.SP.UserProfileService = $.SP.UserProfileService || {};

    $.SP.UserProfileService.GetInCommon = function (accountName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetInCommon xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + (accountName || '') + '</accountName>';
        soap += '       </GetInCommon>';
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
    $.SP.UserProfileService.GetInCommon().done(function (data, textStatus, jqXHR) {
        var common = {
            manager: null,
            contacts: [],
            memberships: []
        };
        
        $(data).find('Manager').each(function (i, contact) {
            var $contact = $(contact);

            common.manager = {
                AccountName: $contact.find('AccountName').text(),
                Privacy: $contact.find('Privacy').text(),
                Name: $contact.find('Name').text(),
                IsInWorkGroup: $contact.find('IsInWorkGroup').text() === 'true' ? true : false,
                Group: $contact.find('Group').text(),
                Email: $contact.find('Email').text(),
                Title: $contact.find('Title').text(),
                Url: $contact.find('Url').text(),
                UserProfileID: $contact.find('UserProfileID').text(),
                ID: parseInt($contact.find('ID').text(), 10)
            };
        });
        $(data).find('Colleagues').find('ContactData').each(function (i, contact) {
            var $contact = $(contact);

            common.contacts.push({
                AccountName: $contact.find('AccountName').text(),
                Privacy: $contact.find('Privacy').text(),
                Name: $contact.find('Name').text(),
                IsInWorkGroup: $contact.find('IsInWorkGroup').text() === 'true' ? true : false,
                Group: $contact.find('Group').text(),
                Email: $contact.find('Email').text(),
                Title: $contact.find('Title').text(),
                Url: $contact.find('Url').text(),
                UserProfileID: $contact.find('UserProfileID').text(),
                ID: parseInt($contact.find('ID').text(), 10)
            });
        });
        $(data).find('Memberships').find('MembershipData').each(function (i, membership) {
            var $membership = $(membership);

            common.memberships.push({
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
            });
        });
        console.log(common);
    });
})(jQuery);