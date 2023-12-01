$('#createUserForm').validate({
    rules: {
      name: {
        required: true,
      },
      identifier: {
        required: true,
      },
      password  : {
        required: true
      },
    },
    messages: {
      name: {
        required: "Skriv inn brukernavn",
      },
      identifier: {
        required: "please enter identifier",
      },
      password: {
        required: "Skriv passord"
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
});