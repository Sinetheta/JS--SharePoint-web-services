jQuery SharePoint Web Services - Ajax calls for front-end work in SharePoint 2010
================================

Not much to say, just piling up some SP web service calls for now. I'll add services and supporting info as time allows. Please feel free to contribute or contact me for updates.

Request Headers
---

Some of SharePoint's SOAP requests require a "SOAPAction header", you can read more about them [here](http://www.oreillynet.com/xml/blog/2002/11/unraveling_the_mystery_of_soap.html). The [SOAP 1.1 specification](http://www.w3.org/TR/2000/NOTE-SOAP-20000508/) says this about the HTTP SOAPAction header;
> The SOAPAction HTTP request header field can be used to indicate the intent of the SOAP HTTP request. The value is a URI identifying the intent. SOAP places no restrictions on the format or specificity of the URI or that it is resolvable. An HTTP client MUST use this header field when issuing a SOAP HTTP Request.

This can be added to a jQuery ajax call by adding setting a request header before it is sent.

    beforeSend: function (xhr) {
        xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetList");
    }

Tips for using the Web Services
---

Some useful gloabls exposed by SharePoint:

* `L_Menu_BaseUrl` - [from Web BorG](http://webborg.blogspot.ca/2008/07/couple-of-useful-javascript-global.html) the base URL of the site / subsite. A quicker way to get the local absolute path and parsing it from the `location` properties for services like GetListItems

* `_spUserId` - the ID of the logged in user.