$('#updateUserForm').validate({
    rules: {
      name: {
        required: true,
      },
      accountId: {
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
      accountId: {
        required: "skriv inn brukerpnid",
      },
      password: {
        required: "skriv passord"
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