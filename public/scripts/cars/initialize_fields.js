// places drop down
$('#places').select2()

// rank drop down
$('#rank').select2()

// start date date picker
$('#reservationdatetime').datetimepicker({
    useCurrent: false
})

$('#reservationdatetime').on('change.datetimepicker', (event) => {
    console.log(event.date._d);
})

// end date date picker
$('#toreservationdatetime').datetimepicker({
    useCurrent: false
})