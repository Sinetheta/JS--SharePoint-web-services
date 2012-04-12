(function($){ 
    $.SP = {};
    $.SP.server = 'yourserver.com';
    $.SP.userProfileService = {};
    
    $.SP.userProfileService.modifyUserPropertyByAccountName = function (PropertyData, accountName) {
        var soap = '';
        
        accountName = accountName || ''; //Blank accountName modifies current user
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <ModifyUserPropertyByAccountName xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + accountName + '</accountName>';
        soap += '           <newData>';
        if( !$.isArray(PropertyData) ){
                PropertyData = [PropertyData];
            }
        $.each(PropertyData,function(i, prop){
            if( !$.isArray(prop.ValueData) ){
                prop.ValueData = [prop.ValueData];
            }
            soap += '           <PropertyData>';
            soap += '           <IsPrivacyChanged>' + (prop.IsPrivacyChanged || 'false') + '</IsPrivacyChanged>';
            soap += '           <IsValueChanged>' + (prop.IsValueChanged || 'true') + '</IsValueChanged>';
            soap += '           <Name>' + prop.Name + '</Name>';
            soap += '           <Privacy>' + (prop.Privacy || 'NotSet') + '</Privacy>';
            soap += '           <Values>';
        
            $.each(prop.ValueData,function(j, val){
                    soap += '       <ValueData><Value xsi:type="xsd:string">' + val +'</Value></ValueData>';        
            });
        
            soap += '           </Values>';
            soap += '           </PropertyData>';
        });
        
        soap += '           </newData>';
        soap += '       </ModifyUserPropertyByAccountName>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';
        console.log(soap )


        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/UserProfileService.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/ModifyUserPropertyByAccountName");
            }
        });
    }
    
    // Example use, nothing cool comes back
    $.SP.userProfileService.modifyUserPropertyByAccountName({Name:'SPS-StatusNotes',ValueData:'newester status'});
    
})(jQuery);