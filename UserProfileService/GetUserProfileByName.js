(function ($) {
    $.SP = $.SP || {};
    $.SP.UserProfileService = $.SP.UserProfileService || {};

    $.SP.UserProfileService.GetUserProfileByName = function (accountName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetUserProfileByName xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <AccountName>' + (accountName || '') + '</AccountName>';
        soap += '       </GetUserProfileByName>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: '/_vti_bin/UserProfileService.asmx',
            data: soap,
            dataType: "xml"
        });
    }
    // Example use
    $.SP.UserProfileService.GetUserProfileByName().done(function (data, textStatus, jqXHR) {
        var user = {};
        $(data).find('PropertyData').each(function (i, val) {
            var property = $(val);
            var $values = property.find('ValueData');
            var values;

            if ($values.length > 1) {
                values = [];
                $.each($values, function (j, data) {
                    values.push($(data).find('Value').text());
                });
            } else {
                values = property.find('Value').text()
            }

            user[property.find('Name').text()] = values;
        });
        console.log(user);
    });
})(jQuery);