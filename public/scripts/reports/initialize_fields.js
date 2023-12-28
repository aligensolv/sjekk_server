// start date date picker
$('#startdatetime').datetimepicker({
    useCurrent: false,
    format: 'yyyy-MM-DD HH:mm'
})

$('#startdatetime').on('change.datetimepicker', (event) => {
    console.log(event.date._d);
})

// start date date picker
$('#enddatetime').datetimepicker({
    useCurrent: false,
    format: 'yyyy-MM-DD HH:mm',
})

$('#enddatetime').on('change.datetimepicker', (event) => {
    console.log(event.date._d);
})

$('#places').select2()
