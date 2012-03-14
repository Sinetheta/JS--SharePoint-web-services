var server = 'https://yourServer'
var getUserLinks = function (accountName) {
        var soap = '';
        accountName = accountName || ''; //Blank accountName returns results for current user
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetUserLinks xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + accountName + '</accountName>';
        soap += '       </GetUserLinks>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: server + '/_vti_bin/UserProfileService.asmx',
            data: soap,
            dataType: "xml"
        });
    }
    // Example use
    $.when(getUserLinks()).done(function (data, textStatus, jqXHR) {
        $(data).find('QuickLinkData').each(function (i, link) {
            var $link = $(link);
            console.log({
                id: $link.find('ID').text(),
                name: $link.find('Name').text(),
                group: $link.find('Group').text(),
                privacy: $link.find('Privacy').text(),
                url: $link.find('Url').text(),
            })
        });
    });