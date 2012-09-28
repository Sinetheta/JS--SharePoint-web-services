(function ($) {
    $.SP = $.SP || {};
    $.SP.Lists = $.SP.Lists || {};

    $.SP.Lists.GetListItems = function (pathname, GetListItems) {
        /*
        getListItems = {
            listName: string,
            viewName: string,
            query: string,
            viewFields: string,
            rowLimit: string,
            queryOptions: string,
            webID: string
        }
        */

        var soap = '';
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">';

        $.each(GetListItems, function (name, value) {
            soap += '       <' + name + '>' + value + '</' + name + '>';
        });

        soap += '       </GetListItems>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: pathname + '/_vti_bin/Lists.asmx',
            data: soap,
            dataType: "xml",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetListItems");
            }
        });
    }

    // Example use
    $.SP.Lists.GetListItems(L_Menu_BaseUrl, {
        listName: 'Pages'
    }).done(function (data, textStatus, jqXHR) {
        var listItems = $(data).find('row').map(function (i, listItem) {
            var item = {};

            $.each(listItem.attributes, function (i, attrib) {
                item[attrib.name] = attrib.value;
            });
            return item;
        });
        console.log(listItems);
    });
})(jQuery);