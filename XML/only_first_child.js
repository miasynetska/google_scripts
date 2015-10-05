function ImportRL(url1) {
 var url1 = url1 || "http://couponfeed.linksynergy.com/coupon?token=*&network=*";
 var xmlresults = UrlFetchApp.fetch(url1);
 writeToSheet1(XmlService.parse(xmlresults));
}

function writeToSheet1(doc)
{
  var links =  doc.getRootElement().getChildren('link');
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  //get table headers from firs link data
  var headers = [];
  var firstlinkproperties = links[0].getChildren(); 
  for (var j = 0; j < firstlinkproperties.length; j++) {
       headers.push(firstlinkproperties[j].getName())
       var range = sheet.getRange(1, j+1);
       range.setValue(firstlinkproperties[j].getName());
   }  
  
  //values
  for (var i = 0; i < links.length; i++) {
    for (var j = 0; j < headers.length; j++) {
       var value = links[i].getChild(headers[j]).getText();
       if (headers[j] === 'categories' || headers[j] === 'promotiontypes')
       {
          value = links[i].getChild(headers[j]).getChildren()[0].getText();
       }
       var range = sheet.getRange(i+2, j+1);
       range.setValue(value);
    }
  }
}