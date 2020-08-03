var nav = new Vue({
    el: "#navbar-items",
    data: {
        idprefix: "nav-",
        //navlinks: ["#about","#education","#skills","#certifications","#portfolio","#projects","#contact"],
        navlist: {
            About: "/#about",
            Education: "/#education",
            Skills: "/#skills",
            Certifications: "/#certifications",
            Portfolio: "/portfolio",
            Projects: "/#projects",
            Apps: "/apps/",
            Contact: "/#contact"
        }
    },
    methods: {
        navItemClick: function (event) {
            $(".navbar-collapse").collapse("hide");
        }
    }
});

var contactForm = new Vue({
    el: '#contact-form',
    data: {
        errors: [null,null,null],
        clientName: '',
        clientEmail: '',
        message: '',
        serverMessage: ''
    },
    methods: {
        checkForm: function (e) {
            this.errors = ['', '', ''];
   
            this.clientName = this.clientName.trim();
            this.clientEmail = this.clientEmail.trim();
            this.message = this.message.trim();
      
            if (this.clientName.length == 0) {
                this.errors[0] = ("Name required");
                $('#inputName').addClass('is-invalid');
            }

            if (this.clientEmail.length == 0) {
                this.errors[1] = ('Email required');
                $('#inputEmail').addClass('is-invalid');
            } else if (!this.validEmail(this.clientEmail)) {
                this.errors[1] = ('Please enter a valid email :)');
                $('#inputEmail').addClass('is-invalid');
            }

            if (this.message.length == 0) {
                this.errors[2] = ("Message required");
                $('#inputMessage').addClass('is-invalid');
            } else if (getWordCount(this.message)<10) {
                this.errors[2] = ("Message is too short. Must be greater than 10 words...");
                $('#inputMessage').addClass('is-invalid');
            } else if (getWordCount(this.message)>2500) {
                this.errors[2] = ("Message is too long. Must be less than 2500 words...");
                $('#inputMessage').addClass('is-invalid');
            }

            function getWordCount(s){
                s = s.replace(/(^\s*)|(\s*$)/gi,"");
                s = s.replace(/[ ]{2,}/gi," ");
                s = s.replace(/\n /,"\n");
                return s.split(' ').length;
            }

            if (this.errors[0].length == 0 && this.errors[1].length == 0 && this.errors[2].length == 0) {
                $('#contact-form-submit span').text('');
                $('#contact-form-submit span').addClass('fa fa-spinner fa-pulse fa-fw');
                e.preventDefault();
                $('#contact-form :input').removeClass('is-invalid');
                $('#contact-form').addClass('was-validated');
                $('#contact-form :input').prop('readonly', true);
                $('#contact-form-submit').attr('disabled', true);
                $('#contact-form-submit').removeClass('hvr-float');
                
                this.submitForm();
                return true;
            }
      
            e.preventDefault();

        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        submitForm: async function () {
            function getCookie(name) {
                let cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
                    for (let i = 0; i < cookies.length; i++) {
                        const cookie = cookies[i].trim();
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
              
            const csrftoken = getCookie('csrftoken');

            function csrfSafeMethod (method) {
                // these HTTP methods do not require CSRF protection
                return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
            } 
            
            $.ajaxSetup({
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });

            $.ajax({
                type: 'POST',
                url: '/ajax/submitContact/',
                data: {
                    'data': JSON.stringify({
                        'clientName': contactForm.clientName,
                        'clientEmail': contactForm.clientEmail,
                        'message': contactForm.message
                    })
                },
                dataType: 'json',
                success: function (data) {
                    if (data.response == 'success') {
                        contactForm.serverMessage = 'Thank you for contacting me! I will get back with you shortly...';
                        $('#contact-form-submit span').removeClass('fa fa-spinner fa-pulse fa-fw');
                        $('#contact-form-submit span').addClass('fas fa-check');
                        $('#contact-form-serverMessage').removeClass('alert-danger');
                        $('#contact-form-serverMessage').addClass('alert-success');
                    }
                    else {
                        contactForm.serverMessage = 'Oops! There was a server error while sending your message.... Try Again';
                        $('#contact-form-serverMessage').removeClass('alert-success');
                        $('#contact-form-serverMessage').addClass('alert-danger');
                        $('#contact-form').removeClass('was-validated');
                        $('#contact-form :input').prop('readonly', false);
                        $('#contact-form-submit').attr('disabled', false);
                        $('#contact-form-submit').addClass('hvr-float');
                        $('#contact-form-submit span').removeClass('fa fa-spinner fa-pulse fa-fw');
                        $('#contact-form-submit span').removeClass('fas fa-check');
                        $('#contact-form-submit span').text('SEND');
                    }
                    $('#contact-form-serverMessage').css({ 'display': 'block', 'visibility': 'visible' });
                }
            });
        },
        
    }
});


$(function(){
    $("#nav-Portfolio").addClass("active");
    //initSmoothScroll();
    startAnims();
});