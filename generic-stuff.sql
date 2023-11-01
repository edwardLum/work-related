SELECT
    ep.key,
    ep.value.string_value,
    ep.value.int_value,
    ep.value.double_value,
    ep.value.float_value
FROM
    `example.table`,
    UNNEST(event_params) AS ep
