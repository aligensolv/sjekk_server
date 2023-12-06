$('#updateCarForm').validate({
    rules: {
      boardNumber: {
        required: true,
      },

      registeration: {
        required: true,
      }
    },
    messages: {
      boardNumber: {
        required: "skriv inn et tavlenummer",
      },

      registeration: {
        required: "Enter registration"
      }
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