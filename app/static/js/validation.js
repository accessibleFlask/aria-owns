function onSubmit(event) {
    event.preventDefault();
    clearErrors();

    // Run some easy checks
    // Note that in a real form, these should be as rigorous as back-end checks,
    // and try to maintain parity as much as possible
    validateEmail();
    validateCheckbox();
    validateRadio();

    var errors = $('input[aria-invalid]');
    if(errors.length) {
        createErrorHeader();
        focusFirstError();
    }
    else {
        $('form').off('submit').submit();
    }
}

function clearErrors() {
    var errorInputs = $('[aria-invalid]');

    errorInputs.each(function(index) {
        $(this).removeAttr('aria-invalid');
        $(this).removeAttr('aria-describedby');
    });

    $('span.error-msg').remove();
    $('div.error-header').remove();
}

function createErrorHeader() {
    var inputs = $('form input[aria-invalid]');
    var form = inputs.parent().parent()[1];

    $(form).before('<div class="error-header" role="alert">Please correct the errors highlighted below.</div>');
}

function validateEmail() {
    var emailList = $('input[type="email"]');

    emailList.each(function(index) {
        var value = $(this).val();

        // check for:
        // - empty
        // - bad format
        // leave the rigorous checking to the back end
        if(value === '') {
            $(this).attr('aria-invalid', 'true');
            $(this).attr('aria-describedby', this.id + '-error');
            $(this).before(`<span class="error-msg" id="${this.id + '-error'}">Your email address needs to be 6 or more characters.</span>`);
        }
        else if(!value.match(/(?:\w+|[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+)@\w+\.\w+/)) {
            $(this).attr('aria-invalid', 'true');
            $(this).attr('aria-describedby', this.id + '-error');
            $(this).before(`<span class="error-msg" id="${this.id + '-error'}">This doesn't look like an email - it should look like <strong>local@domain.subdomain</strong> (e.g. me@mail.com)</span>`);
        }
        // no trailing else because this is where you make a library step in
        // friends don't let friends validate emails by hand
    });
}

function validateCheckbox() {
    // this is for validating single checkboxes - grouped checkboxes
    // should follow the radio button example

    var checkboxList = $('input[type="checkbox"]');

    checkboxList.each(function(index) {
        if(!$(this).is(':checked')) {
            $(this).attr('aria-invalid', 'true');
            $(this).attr('aria-describedby', this.id + '-error');
            $(this).parent().before(`<span class="error-msg" id="${this.id + '-error'}">You must check this box to continue</span>`);
        }
    });
}

function validateRadio() {
    // grab the group and assert that a child is checked
    var fieldsetList = $('fieldset');

    fieldsetList.each(function(index) {
        var inputs = $(this).children('input[type="radio"]');
        var didCheck = false;

        inputs.each(function(idx) {
            if($(this).is(':checked')) {
                didCheck = true;
            }
        });

        if(!didCheck) {
            $(this).children('input[type="radio"]').attr('aria-invalid', 'true');
            $(this).children('input[type="radio"]').attr('aria-describedby', this.id + '-error');
            $(this).before(`<span class="error-msg" id="${this.id + '-error'}">Please select an option to continue</span>`);
        }
    });
}

function focusFirstError() {
    $('[aria-invalid]')[0].focus();
}

$(function() {
    $('form').on('submit', onSubmit);
});
