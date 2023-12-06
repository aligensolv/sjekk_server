var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

async function updateCar(carId) {
if($('#updateCarForm').valid()){
    const boardNumber = document.getElementById('boardNumber').value;
    const startDate = $('#reservationdatetime').find('input').val();
    const endDate = $('#toreservationdatetime').find('input').val();
    const registeration = document.getElementById('registeration').value;
    let places_dropdown = document.getElementById('places')
    let place = places_dropdown.value
    
    let rank_dropdown = document.getElementById('rank')
    let rank = rank_dropdown.value

    const formData = {
        plate_number: boardNumber,
        start_date: startDate,
        end_date: endDate,
        registeration_type: registeration,
        place: place,
        rank: rank,
    };

    let response = await fetch(`/api/cars/${carId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.status == 200) {
    // Car created successfully, show success message and navigate back after 3 seconds
    Toast.fire({
            icon: 'success',
            title: 'Car was updated successfully'
        })
    setTimeout(() => {
        window.location.href = '/cars'; // Redirect to the car list page
    }, 3000);
} else {
    Toast.fire({
            icon: 'error',
            title: (await response.json()).toString()
        })
}
} 
}