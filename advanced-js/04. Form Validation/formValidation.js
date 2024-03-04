function validate() {
    $('#company').on('change', showHideCompany);

    $('#submit').on('click', function(ev) {
        ev.preventDefault();
		
        let isValid = true;
        let usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        let passwordRegex = /^\w{5,15}$/;
        let emailRegex = /@.*\./;
        let companyNumberRegex = /^[1-9]{1}[0-9]{3}$/;

        if (!usernameRegex.test($('#username').val())){
            $('#invaliduser').text('Invalid username');
            $('#username').css('border', '2px solid red');
            isValid = false;
        }else{
            $('#invaliduser').css('display', 'none');
            $('#username').css('border', '');
        }

        if(!emailRegex.test($('#email').val())){
            $('#invalidemail').text('Invalid email');
            $('#email').css('border', '2px solid red');
            isValid = false;
        }else{
            $('#invalidemail').css('display', 'none');
            $('#email').css('border', '');
        }

        if(!passwordRegex.test($('#password').val())){
            $('#invalidpass').text('Invalid password');
            $('#password').css('border', '2px solid red');
            isValid = false;
        }else{
            $('#invalidpass').css('display', 'none');
            $('#password').css('border', '');
        }

        if ($('#company').is(':checked') && !companyNumberRegex.test($('#companyNumber').val())) {
            $('#invalidnum').text('Invalid number');
            $('#companyNumber').css('border', '2px solid red');
            isValid = false;
        } else {
            $('#invalidnum').css('display', 'none');
            $('#companyNumber').css('border', '');
        }

        if (isValid){
            $('#valid').show();
        }else{
            $('#valid').hide();
        }

    });

    function showHideCompany() {
        if ($(this).is(':checked')) {
            $('#companyInfo').css('display', 'block');
        } else {
            $('#companyInfo').css('display', 'none')
        }
    }
}