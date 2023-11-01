/* Get daily facebook spend per account (facebook_data table) */
SELECT
  account,
  SUM(cost)
FROM
  `facebook_data`
WHERE
  date="2023-10-31"
GROUP BY
  account

/* Get daily facebook spend per account from the performance_report table */
SELECT
  country,
  SUM(cost)
FROM
  `performance_report`
WHERE
  date="2023-10-31" AND
  source_medium="facebook / cpc"
GROUP BY
  country

