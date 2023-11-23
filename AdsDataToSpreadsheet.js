function main() {
  var dates = generateReportDates();
  
  weekToDateData = getPerformanceDataForDateRange(dates.startOfWeek, dates.end)
  monthToDateData = getPerformanceDataForDateRange(dates.startOfMonth, dates.end)
  
  // The ID of the Google Sheets document
  var sheetId = '1KOHXY21IH7gX7CmbubUZ1_QV0fBb_EeEcQNl8gRDJQM';

  // The name of the sheet within the document
  var weekToDateSheetName = 'WTD Performance';
  var monthToDateSheetName = 'MTD Performance';

  // Call the function to write data to the respective sheets
  writeDataToSheet(weekToDateData, sheetId, weekToDateSheetName);
  writeDataToSheet(monthToDateData, sheetId, monthToDateSheetName);
}

function getPerformanceDataForDateRange(startDate, endDate) {
  var report = AdsApp.report(
  "SELECT CampaignName, Cost, Clicks, Impressions, Conversions " +
  "FROM CAMPAIGN_PERFORMANCE_REPORT " +
  "DURING " + startDate + "," + endDate
  );
  
  var rows = report.rows();
  var data = [];
  
  while (rows.hasNext()) {
    var row = rows.next();
    var campaignName = row['CampaignName'];
    var cost = row['Cost'];
    var clicks = row['Clicks'];
    var impressions = row['Impressions'];
    var conversions = row['Conversions']; 


    data.push([campaignName, cost, clicks, impressions, conversions]);
  }
  
  return data;
}

function generateReportDates() {
  // Get today's date
  var today = new Date();

  // Calculate yesterday's date
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Get start of Month
  var startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // Start of the week (Monday)
  var startOfWeek = new Date(yesterday);
  startOfWeek.setDate(yesterday.getDate() - (yesterday.getDay() === 0 ? 6 : yesterday.getDay() - 1));

  // Format dates to YYYY-MM-DD
  var format = function(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('');
  };

  return {
      startOfMonth: format(startOfMonth),
      startOfWeek: format(startOfWeek),
      end: format(yesterday)
  };
}

function writeDataToSheet(data, sheetId, sheetName) {
    // Open the spreadsheet by ID
    var spreadsheet = SpreadsheetApp.openById(sheetId);

    // Get the specific sheet by name, or create it if it doesn't exist
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
        // Create a new sheet with the given name
        sheet = spreadsheet.insertSheet(sheetName);
    }

    // Clear existing content in the sheet
    sheet.clearContents();

    // Set up the header row
    var headers = ['Campaign Name', 'Cost', 'Clicks', 'Impressions', 'Conversions'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Write the data to the sheet starting from the second row
    if (data.length > 0) {
        var range = sheet.getRange(2, 1, data.length, headers.length);
        range.setValues(data);
    }
}
