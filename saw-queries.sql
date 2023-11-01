/* Get daily facebook spend per account */
SELECT
  account,
  SUM(cost)
FROM
  `afd-reporting.spotawheel.facebook_data`
WHERE
  date="2023-10-31"
GROUP BY
  account
