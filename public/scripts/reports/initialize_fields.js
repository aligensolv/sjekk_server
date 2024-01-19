// start date date picker
$('#startdatetime').datetimepicker({
    useCurrent: false,
    format: 'yyyy-MM-DD HH:mm'
})

$('#startdatetime').on('change.datetimepicker', (event) => {
})

// start date date picker
$('#enddatetime').datetimepicker({
    useCurrent: false,
    format: 'yyyy-MM-DD HH:mm',
})

$('#enddatetime').on('change.datetimepicker', (event) => {
})

$('#places').select2()
