function main() {
  var dates = getWeekToDateRange();
  console.log(dates)
}

function getPerformanceDataForDateRange(startDate, endDate) {
  var report = AdsApp.report(
  "SELECT CampaignName, Cost, Clicks, Impressions, Conversions " +
  "FROM CAMPAIGN_PERFORMANCE_REPORT " +
  "DURING LAST_7_DAYS" + startDate + "," + endDate
  );
  
  var rows = report.rows();
  var data = [];
  
  while (rows.hasNext()) {
    var row = rows.next();
    var campaignName = row['CampaignName'];
    var impressions = row['Impressions'];
    var clicks = row['Clicks'];
    var cost = row['Cost'];

    data.push([campaignName, impressions, clicks, cost]);
  }
  
  return data;
}

function getWeekToDateRange() {
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

      return [year, month, day].join('-');
  };

  return {
      startOfMonth: format(startOfMonth),
      startOfWeek: format(startOfWeek),
      end: format(yesterday)
  };
}
  
