var invalidFieldsCount = 0;
$(document).ready(function () {
    $('#ff-subject').parents('tr').hide();
    $('#ff-other').click(function () {
        if ($(this).is(':checked'))
            $('#ff-subject').parents('tr').show();
        else
            $('#ff-subject').parents('tr').hide();
    });
    $('.submit-sending').css('display', 'none');
    $('.submit-message').css('display', 'none');
    $('.email-address').focus(function () { if (invalidFieldsCount > 0) invalidFieldsCount--; }).blur(function () {
        if ($(this).val().length > 0 && $(this).val() != $(this).attr('title')) {
            if (validEmail($(this).val())) {
                $(this).removeClass('invalid').addClass('valid');
                if (invalidFieldsCount > 0) invalidFieldsCount--;
            }
            else {
                $(this).removeClass('valid').addClass('invalid');
                invalidFieldsCount++;
            }
        }
    });
    $('.telephone').focus(function () { if (invalidFieldsCount > 0) invalidFieldsCount--; }).blur(function () {
        if ($(this).val().length > 0 && $(this).val() != $(this).attr('title')) {
            if (validateTelephone($(this).val())) {
                $(this).removeClass('invalid').addClass('valid');
                if (invalidFieldsCount > 0) invalidFieldsCount--;
            }
            else {
                $(this).removeClass('valid').addClass('invalid');
                invalidFieldsCount++;
            }
        }
    });
    $('.required').focus(function () { if (invalidFieldsCount > 0) invalidFieldsCount--; }).blur(function () {
        if ($(this).val() != $(this).attr('title')) {
            $(this).parent().find('.required-label').remove();
            if ($(this).val().length > 0) {
                if (invalidFieldsCount > 0) invalidFieldsCount--;
            }
            else {
                $(this).addClass('invalid').after($('<span/>').addClass('required-label').html('*').css('color', 'red'));
                invalidFieldsCount++;
            }
        }
    });

    function validEmail(e) {
        var pattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(e).search(pattern) != -1;
    }
    function validateTelephone(e) {
        var pattern = /^\d/;
        return String(e).search(pattern) != -1;
    }
    function validateForm() {
        var invalidFields = 0;
        var formDiv = $('#' + $('#form-types').val());
        $('input[type="text"]', formDiv).each(function () {
            if ($(this).val() == $(this).attr('title'))
                invalidFields++;
        });
        return invalidFields == 0;
    }
    $('#form-types').change(function () {
        var selectedForm = $(this).val();
        $('.form').addClass('hidden');
        if (selectedForm != 'none') {
            invalidFieldsCount = 0;
            $('.submit-message').hide();
            $('.submit-sending').hide();
            $('#refresh-captcha').click();
            $('#captcha').val('');
            $('#' + selectedForm).find('textarea').each(function () {
                $(this).html('').val('');
            });
            $('#' + selectedForm).find('input[type="text"]').each(function () {
                $(this).val($(this).attr('title')).removeClass('invalid');
            });
            $('#' + selectedForm).find('input[type="checkbox"]').attr('checked', false);
            $('#' + selectedForm).find('select').each(function (index) {
                $(this).get(0).selectedIndex = 0;
            });
            $('#' + selectedForm).removeClass('hidden');
        }
    });

    $('.form input[type="text"]').focus(function () {
        if ($(this).val() == $(this).attr('title')) {
            $(this).val('');
        }
    }).blur(function () {
        if ($(this).val() == '')
            $(this).val($(this).attr('title'));
    }
	);
    $('form input[type="submit"]').click(function () {
        invalidFieldsCount = $('.invalid').length;
        if (invalidFieldsCount <= 0 && validateForm()) {
            var formId = $('#form-types').val();
            var messageObject = prepareEmail(formId);
            var formDiv = $('#' + formId);
            $('.submit-sending').css('display', '');
            $('.submit-message').css('display', 'none');
            var captcha = $('#captcha').val();
            $.ajax({
                type: 'POST',
                url: 'mail.php',
                dataType: 'json',
                data: {
                    email: messageObject.from,
                    from: messageObject.fullName,
                    subject: messageObject.subject,
                    message: messageObject.message,
                    cc: messageObject.cc,
                    code: captcha,
                    anonymous: messageObject.anonymous
                },
                success: function (msg) {
                    $('.submit-sending').css('display', 'none');
                    if (msg == 1)//success
                    {
                        $('.submit-message').css('display', '').html('Your message has been sent successfully.').addClass('success');
                    }
                    else
                        $('.submit-message').css('display', '').html('Unable to complete your request, please try later.').addClass('success');

                },
                error: function (err) {
                    $('.submit-sending').css('display', 'none');
                    $('.submit-message').css('display', '').html(err.responseText).addClass('fail');
                }
            });
        }
        else {
            if (invalidFieldsCount > 0)
                $('.invalid:first').focus();
            else
                $('input[type="text"]:first').focus();
        }
        return false;
    });

    function prepareEmail(formId) {
        var fullName = '';
        var from = '';
        var subject = '';
        var message = '';
        var cc = '';
        var anonymous = false;
        var formDiv = $('#' + formId);
        switch (formId) {
            case "question-form":
                fullName = $("#qf-full-name", formDiv).val();
                from = $("#qf-email-address", formDiv).val();
                subject = $("#qf-subject", formDiv).val();
                message = $("#qf-message", formDiv).val();
                message += '<br/>Full Name:' + fullName + "<br/>";
                message += 'Email Address: ' + from;
                if ($("#qf-cc", formDiv).is(':checked'))
                    cc = 'cc-me';
                else
                    cc = '';
                break;
            case "report-issue-form":
                fullName = $("#ri-full-name", formDiv).val();
                from = $("#ri-email-address", formDiv).val();
                subject = $("#ri-subject", formDiv).val();
                message = $("#ri-message", formDiv).val();
                message += '<br/>Full Name:' + fullName;
                message += '<br/>Email Address: ' + from;
                message += "<br/>Telephone:" + $("#ri-telephone").val();
                message += "<br/>Issue:" + $("#ri-issue").val();
                message += "<br/>Callback: " + $('#ri-callback').is(':checked') ? 'YES' : 'NO';
                if ($("#ri-cc", formDiv).is(':checked'))
                    cc = 'cc-me';
                else
                    cc = '';
                break;
            case "contact-form":
                fullName = $("#cf-full-name", formDiv).val();
                from = $("#cf-email-address", formDiv).val();
                subject = $("#cf-subject", formDiv).val();
                message = $("#cf-message", formDiv).val();
                message += '<br/>Full Name:' + fullName;
                message += '<br/>Email Address: ' + from;
                message += '<br/>Website: ' + $("#cf-website", formDiv).val();
                message += "<br/>Telephone:" + $("#cf-telephone", formDiv).val();
                message += "<br/>Callback:" + $("#cf-callback", formDiv).val();
                break;
            case "apply-for-job-form":
                fullName = $("#af-full-name", formDiv).val();
                from = $("#af-email-address", formDiv).val();
                subject = $("#af-subject", formDiv).val();
                message = $("#af-message", formDiv).val();
                message += '<br/>Full Name:' + fullName;
                message += '<br/>Email Address: ' + from;
                message += "<br/>Telephone:" + $("#af-telephone", formDiv).val();
                message += "<br/>Online Portfolio:" + $("#af-online-portfolio", formDiv).val();
                break;
            case "feedback-form":
                fullName = $("#ff-full-name", formDiv).val();
                from = $("#ff-email-address", formDiv).val();
                anonymous = $('#ff-keep-anonymous').is(':checked');
                subject = $("#ff-subject", formDiv).val();
                if ($('#ff-other').is(':checked'))
                    subject = $('#ff-options', formDiv).val();

                message = $("#ff-message", formDiv).val();
                message += '<br/>Full Name:' + fullName;
                message += '<br/>Email Address: ' + from;
                message += '<br/>Telephone: ' + $('#ff-telephone', formDiv).val();
                break;
            case "hireme-form":
                fullName = $("#hf-full-name", formDiv).val();
                from = $("#hf-email-address", formDiv).val();
                subject = $("#hf-subject", formDiv).val();
                message = $("#hf-objective-of-project", formDiv).val();
                message += '<br/>Full Name:' + fullName;
                message += '<br/>Email Address: ' + from;
                message += '<br/>Telephone: ' + $('#hf-telephone', formDiv).val();
                message += '<br/>Website: ' + $('#hf-website', formDiv).val();
                message += '<br/>Type of Business: ' + $('#hf-type-of-business', formDiv).val();
                message += '<br/>Service Required: ' + $('#hf-service-required', formDiv).val();
                message += '<br/>Budget: ' + $('#hf-budget', formDiv).val();
                message += '<br/>Current Status: ' + $('#hf-current-status', formDiv).val();
                break;
        }
        return { fullName: fullName,
            subject: subject,
            from: from,
            message: message,
            cc: cc,
            anonymous: anonymous
        };
    }

});