var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });
    
    
        if (response.status === 200) {
            Toast.fire({
                icon: 'success',
                title: 'Brukeren ble slettet'
            })
            setTimeout(() =>{
                location.reload();
            },3000)
        } else {
            Toast.fire({
                icon: 'error',
                title: (await response.json()).toString(),
            })
        }
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: error.message,
        })
    }
}