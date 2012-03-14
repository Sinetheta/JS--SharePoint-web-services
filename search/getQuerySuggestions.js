String.prototype.escapeHTML = function () {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var server = 'https://yourServer'
var GetQuerySuggestions = function (querytext, scope) {
        var soap = '',
            queryXML = '';
        scope = scope ? "SCOPE:\"" + scope + "\"" : "";

        queryXML += "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
        queryXML += "<QueryPacket xmlns=\"urn:Microsoft.Search.Query\" Revision=\"1\">";
        queryXML += "   <Query domain=\"QDomain\">";
        queryXML += "       <Context>";
        queryXML += "           <QueryText language=\"en-US\" type=\"STRING\">" + scope + querytext + "</QueryText>";
        queryXML += "       </Context>";
        queryXML += "       <Range>";
        queryXML += "           <StartAt>1</StartAt>";
        queryXML += "           <Count>10</Count>";
        queryXML += "       </Range>";
        queryXML += "       <PreQuerySuggestions>true</PreQuerySuggestions>";
        queryXML += "       <HighlightQuerySuggestions>false</HighlightQuerySuggestions>";
        queryXML += "   </Query>";
        queryXML += "</QueryPacket>";

        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetQuerySuggestions xmlns="http://microsoft.com/webservices/OfficeServer/QueryService">';
        soap += '           <queryXml>' + queryXML.escapeHTML() + '</queryXml>';
        soap += '       </GetQuerySuggestions>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: server + '/_vti_bin/search.asmx',
            data: soap,
            dataType: "xml"
        });
    }
    // Example use
    $.when(GetQuerySuggestions('staff')).done(function (data, textStatus, jqXHR) {
        $(data).find('GetQuerySuggestionsResult string').each(function (i, result) {
            console.log($(result).text());
        });
    });