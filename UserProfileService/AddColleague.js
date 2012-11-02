(function ($) {
    $.SP = $.SP || {};
    $.SP.UserProfileService = $.SP.UserProfileService || {};

    $.SP.userProfileService.AddColleague = function (colleague) {
        /*
        colleague = {
            accountName: string,
            colleagueAccountName: string,
            group: string,
            privacy: Private or Manager or Organization or Contacts or Public,
            isInWorkGroup: bool
        };        
        */
        
        var soap = '';      
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <AddColleague xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        
        $.each(colleague, function(name, value){
            soap += '           <' + name + '>' + value + '</' + name + '>';
        });
        
        soap += '       </AddColleague>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: '/_vti_bin/userProfileService.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/AddColleague");
            }
        });
    }
})(jQuery);