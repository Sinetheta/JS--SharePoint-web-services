(function ($) {
    $.SP = $.SP || {};
    $.SP.UserGroup = $.SP.UserGroup || {};

    $.SP.UserGroup.GetRolesAndPermissionsForCurrentUser = function (accountName) {
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetRolesAndPermissionsForCurrentUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/" />';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';
        
        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: '/_vti_bin/UserGroup.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetRolesAndPermissionsForCurrentUser");
            }
        });
    }
    // Example use
    $.SP.UserGroup.GetRolesAndPermissionsForCurrentUser().done(function (data, textStatus, jqXHR) {
    	var perms = $(data);
    	var output = {};
    	output.permissionsValue = perms.find('Permissions').attr('Value');
    	output.roles = $.map(perms.find('Role'), function(val){
    		var role = $(val);
    		return {
    			ID: parseInt(role.attr('ID'), 10),
    			Name: role.attr('Name'),
    			Description: role.attr('Description'),
    			Hidden: (role.attr('Hidden') === 'True'),
    			Type: role.attr('Type'),
    			BasePermissions: parseInt(role.attr('BasePermissions'), 10)
    		};
    	});
    	console.log(output)
    });
})(jQuery);