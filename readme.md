jQuery SharePoint Web Services
===
SOAP calls for front-end work in SharePoint 2010. I'll add services and supporting info as time allows. Please feel free to contribute or contact me for updates. Nothing in here is sacred yet, API changes daily, that's part of the reason each call is self-sufficient.

Tips for using the Web Services
---

Each web service comes with a built in example which should be removed before adding the module to production code. The examples are meant to be a starting point for your implementation.

###Order matters

Always use SOAP parameters in the same order as the MSDN. I have found, for instance, that setting a *rowLimit* before a *query* will cause the *query* to be ignored.

###Some useful gloabls exposed by SharePoint:

* `L_Menu_BaseUrl` - [from Web BorG](http://webborg.blogspot.ca/2008/07/couple-of-useful-javascript-global.html) the base URL of the site / subsite. A quicker way to get the local absolute path and parsing it from the `location` properties for services like GetListItems

* `_spUserId` - the ID of the logged in user.

###Testing SOAP services

[Dev HTTP Client](https://chrome.google.com/webstore/detail/dev-http-client/aejoelaoggembcahagimdiliamlcdmfm) is an extension for Google Chrome which allows make custom http requests and works great for ironing out SOAP calls without having to create a webpage. Requests can be saved, imported and exported. If you import the following JSON and change *your server* and *listName* you'll have a working Lists.GetListItems call.

    {"nodes":{"GetListItems":{"requests":[{"id":"7297E3B6-E09C-4DBB-A222-35C49BB941AA", "name":"GetListItems", "request":{"protocol":"HTTPS", "method":{"name":"POST", "request-body":true}, "url":"yourServer/_vti_bin/Lists.asmx", "body-type":"Text", "content":"<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\"> <soap12:Body> <GetListItems xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\"> <listName>listName</listName> <queryOptions><QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions></queryOptions>  <query><Query><Where><Contains><FieldRef Name=\"Title\" /><Value Type=\"Note\">Bears</Value></Contains></Where></Query></query> <rowLimit><RowLimit>0</RowLimit></rowLimit></GetListItems> </soap12:Body></soap12:Envelope>", "headers":[{"name":"Content-Type", "value":"text/xml;charset='utf-8'", "enabled":true}], "headers-type":"Raw", "url-assist":false}, "modified":"Thu, 18 Oct 2012 13:48:35 -0700"}]}}, "version":1, "modified":"Thu, 18 Oct 2012 13:48:35 -0700"}

Request Headers
---

Some of SharePoint's SOAP requests require a "SOAPAction header", you can read more about them [here](http://www.oreillynet.com/xml/blog/2002/11/unraveling_the_mystery_of_soap.html). The [SOAP 1.1 specification](http://www.w3.org/TR/2000/NOTE-SOAP-20000508/) says this about the HTTP SOAPAction header;
> The SOAPAction HTTP request header field can be used to indicate the intent of the SOAP HTTP request. The value is a URI identifying the intent. SOAP places no restrictions on the format or specificity of the URI or that it is resolvable. An HTTP client MUST use this header field when issuing a SOAP HTTP Request.

This can be added to a jQuery ajax call by adding a request header before it is sent.

    beforeSend: function (xhr) {
        xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetList");
    }

A request header can also be added to Dev HTTP Client `SOAPAction: http://schemas.microsoft.com/sharepoint/soap/GetList`

Lists.asmx
---

###GetListItems

If you do not provide a viewName be aware that the default view will be used, which could result in a truncated result set. To make sure you get all matching results you can set a row limit manually `<rowLimit><RowLimit>1000</RowLimit></rowLimit>`.

* [GetListItems Method (MSDN)](http://msdn.microsoft.com/en-us/library/dd586530\(v=office.11\).aspx)