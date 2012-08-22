(function ($) {
    $.SP = $.SP || {};
    $.SP.server = 'https://yourserver.com';
    $.SP.People = $.SP.People || {};

    $.SP.People.SearchPrincipals = function (SearchPrincipals) {
        /*
        SearchPrincipals: {
            searchText: string,
            maxResults: int,
            principalType: None or User or DistributionList or SecurityGroup or SharePointGroup or All
        }
        */
        var soap = '';

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">';

        $.each(SearchPrincipals, function (name, value) {
            soap += '       <' + name + '>' + value + '</' + name + '>';
        });

        soap += '       </SearchPrincipals>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: $.SP.server + '/_vti_bin/People.asmx',
            data: soap,
            dataType: "xml"
        });
    }

    // Example use
    $.SP.People.SearchPrincipals({
        searchText: 'Johnson',
        maxResults: 5,
        principalType: 'User'
    }).done(function (data, textStatus, jqXHR) {
        var principles = $.map($(data).find('PrincipalInfo'), function (principle) {
            var record = {};
            
            $(principle).children().each(function (i, prop) {
                record[prop.nodeName] = $(prop).text()
            });
            return record;
        });
        console.log(principles)
    });
})(jQuery);