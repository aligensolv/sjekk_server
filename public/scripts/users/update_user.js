var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


function updateUser(user_id) {
    if ($('#updateUserForm').valid()) {
        const name = document.getElementById("name");
        const accountId = document.getElementById("accountId");
        const password = document.getElementById("password");

        fetch(`/api/users/${user_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name.value,
                user_identifier: accountId.value,
                password: password.value,
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Brukeren ble oppdatert'
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: (await response.json()).toString()
                    })
                }
            })
            .catch(error => {
                Toast.fire({
                    icon: 'error',
                    title: error.message
                })
            });
    }
}