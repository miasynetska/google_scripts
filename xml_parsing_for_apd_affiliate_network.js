//XML parsing APD network
function ImportAPD(urlAPD) {
 var urlAPD = "https://api.impactradius.com/Mediapartners/*/Ads";
 var fetchOptionsAPD = {
  "headers" : {
    //your headers here
    "Authorization" : "Basic *",
   "Cache-Control" : "no-cache",
   "Content-Type" : "application/xml"
  }
 };
 var xmlresults = UrlFetchApp.fetch(urlAPD, fetchOptionsAPD);
 writeToSheetAPD(XmlService.parse(xmlresults));
}

function writeToSheetAPD(doc)
{
  var links =  doc.getRootElement().getChild('Ads').getChildren('Ad');
  var sheet = SpreadsheetApp.getActiveSheet();

  //headers
  var firstlinkproperties = links[0].getChildren();
  for (var j = 0; j < firstlinkproperties.length; j++) {
       var range = sheet.getRange(1, j+1);
       range.setValue(firstlinkproperties[j].getName());
   }  
  
  //values
  for (var i = 0; i < links.length; i++) {
    var col = links[i].getChildren();
    for (var j = 0; j < col.length; j++) {
       var range = sheet.getRange(i+2, j+1);
       range.setValue(col[j].getText());
    }
  }
}