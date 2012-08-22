(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver.com';
    $.SP.UserProfileService = $.SP.UserProfileService || {};

    $.SP.UserProfileService.GetUserColleagues = function (accountName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetUserColleagues xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + (accountName || '') + '</accountName>';
        soap += '       </GetUserColleagues>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/userProfileService.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/GetUserColleagues");
            }
        });
    }

    // Example use, nothing cool comes back
    $.SP.UserProfileService.GetUserColleagues().done(function (data, textStatus, jqXHR) {
        var contacts = $(data).find('ContactData').map(function (contact) {
            var $contact = $(contact);
            
            return {
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
        console.log(contacts);
    });
})(jQuery);