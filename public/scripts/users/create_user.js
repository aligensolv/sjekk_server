var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


function createUser() {
if($('#createUserForm').valid()){
  let name = document.querySelector('#name')
  let identifier = document.querySelector('#identifier')
  let password = document.querySelector('#password')

fetch('/api/users/register', {
    method: 'POST',
    body: JSON.stringify({
        name: name.value,
        user_identifier: identifier.value,
        password: password.value
    }),
    headers:{
        'Content-Type':'application/json; charset=utf-8'
    }
})
    .then(async response => {
        if (response.status == 200) {
            await Toast.fire({
                icon: 'success',
                title: 'Brukeren ble opprettet',
            })
            setTimeout(() =>{
                window.location.href = '/users';
            },3000)
        } else {
            Toast.fire({
                icon: 'error',
                title: (await response.json()).toString(),
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