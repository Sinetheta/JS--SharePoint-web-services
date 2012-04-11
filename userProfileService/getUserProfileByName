(function($){ 
    $.SP = {};
    $.SP.server = 'https://theloop.gov.bc.ca';
    $.SP.userProfileService = {};
    
    $.SP.userProfileService.GetUserProfileByName = function (accountName) {
        var soap = '';
        
        accountName = accountName || ''; //Blank accountName returns results for current user
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetUserProfileByName xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + accountName + '</accountName>';
        soap += '       </GetUserProfileByName>';
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
    $.when($.SP.userProfileService.GetUserProfileByName()).done(function (data, textStatus, jqXHR) {
        var user = {};
        $(data).find('PropertyData').each(function (i, property) {
            var $property = $(property);
            var $values = $property.find('ValueData');
            var values;
            
            if( $values.length > 1){
                values = [];
                $.each($values, function(j, data){
                    values.push( $(data).find('Value').text() );
                });
            }else{
                values = $property.find('Value').text()
            }
            
            user[ $property.find('Name').text() ] = values;
        });
        console.log(user);
    });
})(jQuery);