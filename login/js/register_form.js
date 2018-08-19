var submit = $('#submit').attr('disabled','disabled');
function checkPass() {
    var pass1 = document.getElementById('password');
    var pass2 = document.getElementById('confirm_password');
    var message = document.getElementById('error-nwl');
    var goodColor = "#66cc66";
    var badColor = "#ff6666";

    if(pass1.value.length > 5) {
        pass1.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        submit.attr('disabled','disabled');
        message.innerHTML = "character number ok!"
    } else {
        pass1.style.backgroundColor = badColor;
        message.style.color = badColor;
        submit.attr('disabled','disabled');
        message.innerHTML = "<br>You have to enter at least 6 digit!"
        return;
    }

    if(pass1.value == pass2.value) {
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "<br>Ready to go!"
        submit.removeAttr('disabled');
    } else {
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        submit.attr('disabled','disabled');
        message.innerHTML = "<br>These passwords don't match!"
    }
}
function check_form() {
    checkPass(); return false;
}

$('#password').on('keyup', check_form);
$('#confirm_password').on('keyup', check_form);
