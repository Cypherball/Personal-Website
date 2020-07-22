var nav = new Vue({
    el: "#navbar-items",
    data: {
        idprefix: "nav-",
        navlist: {
            About: "#about",
            Education: "#education",
            Skills: "#skills",
            Certifications: "#certifications",
            Portfolio: "#portfolio",
            Projects: "#projects",
            Apps: "#apps",
            Contact: "#contact"
        }
    },
    methods: {
        navUpdate: function (id) {
            $(".nav-item").removeClass("active");
            let element = "#nav-" + id.charAt(0).toUpperCase() + id.substr(1);
            //console.log(element);
            $(element).addClass("active");
        },
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
        serverMessage: 'e'
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
            } else if (getWordCount(this.message)<1) {
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


$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger);
    //Hide Loading
    $('.load #loading').hide();
    $('.load').css({ 'min-height':'0'});
    $('.load').hide();
    //Display website
    $('header').css({ 'display': 'block', 'visibility': 'visible' });
    $('#content-start').css({ 'display': 'block', 'visibility': 'visible' });
    //Initialize Smooth Scrolling to section links
    initSmoothScroll();
    
    //Start page animations
    startAnims();
    
    $("#skill-items li").click((e) => {
        query = $(e.target).html();
        queryurl ='http://www.google.com/search?q=' + query;
        window.open(queryurl,'_blank');
    });
    
    //Register Intersection Observer to update active link
    //based on which section is most visible on viewport
    if (window.matchMedia('(min-width: 950px)').matches) {
        let observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting === true) {
                    //Only enable this feature for device width greater than 950px
                    if (window.matchMedia('(min-width: 950px)').matches) {
                        nav.navUpdate(entry.target.id)
                    } else {
                        $(".nav-item").addClass("active");
                    }
                }
            });
        }, { threshold: [0.5] });

        observer.observe(document.querySelector("#about"));
        observer.observe(document.querySelector("#education"));
        observer.observe(document.querySelector("#skills"));
        observer.observe(document.querySelector("#certifications"));
        observer.observe(document.querySelector("#projects"));
        observer.observe(document.querySelector("#portfolio"));
        observer.observe(document.querySelector("#contact"));
    }
});








function startAnims() {
    $scrub_val = 2;

    var intro_anim = gsap.timeline({
         default: { duration: 2 }
    });

    intro_anim.from("#intro-header .header-blue-lines", {
        y: "100%", ease: Power2.easeInOut, duration: 2
    }).from("#intro-header .header-purple-line", {
        x: "-100%", ease: Linear.easeInOut, duration: 1.5
    },"-=1").to("#intro-header .header-purple-line", {
        opacity: "100%", ease: Linear.easeInOut, duration: 1.5
    },"-=1.5").from("#intro-header .header-me", {
        x: "100%", ease: Power2.easeInOut, duration: 2
    },"-=1.0").to("#intro-header .header-triangle", {
        opacity: "100%", ease: Power2.easeInOut, duration: 1
    },"-=0.5").to("#intro-header .header-text h1", {
        opacity: "100%", ease: Power2.easeInOut, duration: 1.5
    },"-=0.5").to("#intro-header .header-text p", {
        opacity: "100%", ease: Power2.easeInOut, duration: 1.5
    },"-=1.0").to("#scroll-down-indicator", {
        opacity: "0.8", ease: Power2.easeInOut, duration: 1
    },"-=1.5");;
    
    //Media Size Variable Adjustments for Animations-------------------------------------------
    about_start = "center bottom";
    bg_start = "top bottom";
    about_delay = 0.5;
    if (window.matchMedia('(max-width: 768px)').matches) {
        console.log('mobile_view');
        about_start = "top center";
        about_delay = 0;
    }
    
    //About Section Animations-------------------------------------------
    //SVG Scroll
    gsap.to("#about .svg-bg", {
        scrollTrigger: {
            trigger: "#about",
            start: bg_start,
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#about .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:1.5,
        scrollTrigger: {
            trigger: "#about",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "2600px 2600px",
        ease: Power1.easeInOut
    });
    gsap.to("#about", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#about",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage: "linear-gradient(to bottom, #30cfd0 0%, #330867 60%)", ease:Sine.easeInOut
    });

    var about_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#about', start: about_start
        }, default: { duration: 0.2 }
    });
    about_anim.from('.anim-about-title', { opacity: 0, x: -200, duration: 0.5, delay: about_delay }).from('.anim-about-text', { opacity: 0, y: 200, stagger: 0.2 });
    
    //Education Section Animations-------------------------------------------
    gsap.to("#education .svg-bg", {
        scrollTrigger: {
            trigger: "#education",
            start: bg_start,
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#education .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#education",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "1400px 1400px", ease: Power1.easeInOut
    });
    gsap.to("#education", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#education",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage: "linear-gradient(to top, #d84494 0%, #330867 60%)", ease:Sine.easeInOut
    });
    var education_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#education', start: "top center"
        }, default: { duration: 0.2 }
    });
    education_anim.from('.anim-education-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-education-logo', { opacity: 0, y: 200, duration: 0.5 }).from('.anim-education-details', { opacity: 0, x: -100, stagger: 0.1 });


    //Skills Section Animations-------------------------------------------
    gsap.to("#skills .svg-bg", {
        
        scrollTrigger: {
            trigger: "#skills",
            start: bg_start,
            scrub: $scrub_val,
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 70%", ease: Linear.easeInOut
    });
    gsap.to("#skills .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#skills",
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "2200px 2200px", ease: Power1.easeInOut
    });
    gsap.to("#skills", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#skills",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage:"linear-gradient(to top, #3e0574 0%, #d84494 80%)", ease:Sine.easeInOut
    });

    var skills_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#skills', start: "top center"
        }, default: { duration: 0.2 }
    });
    skills_anim.from('.anim-skills-title', { opacity: 0, y: 200, duration: 0.5 }).from('.anim-skills-category', { opacity: 0, x: -200, duration: 0.5 , stagger: 0.5}).from('.anim-skills-skillList', { opacity: 0, x: 200, duration: 0.1 , stagger: 0.05},"-=2.5");
    


    //Certification Section Animations-------------------------------------------
    gsap.to("#certifications .svg-bg", {
        scrollTrigger: {
            trigger: "#certifications",
            start: bg_start,
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart reset reverse reset"
        }, backgroundPosition: "center 60%", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#certifications .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#certifications",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "2000px 2000px", ease: Power1.easeInOut
    });
    gsap.to("#certifications", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#certifications",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage:"linear-gradient(to top, #006064 0%, #3e0574 60%)", ease:Sine.easeInOut
    });

    var certification_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#certifications', start: "top center"
        }, default: { duration: 0.2 }
    });
    certification_anim.from('.anim-certification-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-certification-row', { opacity: 0, y: 200, duration: 0.5 , stagger: 0.5});


    //Portfolio Section Animations-------------------------------------------
    gsap.to("#portfolio", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#portfolio",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage:"linear-gradient(to top, #f2f2f2 0%, #006064 80%)", ease:Sine.easeInOut
    });
    

    //Projects Section Animations-------------------------------------------
    gsap.to("#projects .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:1.5,
        scrollTrigger: {
            trigger: "#projects",
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundSize: "3800px 3800px", ease: Power1.easeInOut
    });
    gsap.to("#projects .svg-bg", {
        scrollTrigger: {
            trigger: "#projects",
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "90% center", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#projects", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#projects",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage: "linear-gradient(to top, #29abe2 0%, #f2f2f2 60%)", ease: Sine.easeInOut
    });

    var projects_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#projects', start: "top center"
        }, default: { duration: 0.2 }
    });
    projects_anim.from('.anim-projects-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-projects-proj', { opacity: 0, y: 200, duration: 0.5, stagger: 0.5 });



    //Apps Section Animations-------------------------------------------
    /*gsap.to("#apps .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:1.5,
        scrollTrigger: {
            trigger: "#apps",
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundSize: "3800px 3800px", ease: Power1.easeInOut
    });*/
    gsap.to("#apps", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#apps",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage: "linear-gradient(to top, #9c27b0 0%, #29abe2 60%)", ease: Power2.easeInOut
    });


    //Contact Section Animations-------------------------------------------
    /*gsap.to("#contact .svg-bg", {
        scrollTrigger: {
            trigger: "#contact",
            start: bg_start,
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#contact .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:4,
        scrollTrigger: {
            trigger: "#contact",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "2800px 2800px", ease:Linear.easeInOut
    });*/
    gsap.to("#contact", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#contact",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage: "linear-gradient(to top, #4527a0 0%, #9c27b0 60%)", ease: Power2.easeInOut
    });
    var contact_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#contact', start: "top center"
        }, default: { duration: 0.2 }
    });
    contact_anim.from('.anim-contact-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-contact-animate', { opacity: 0, y: 200, duration: 0.5, stagger: 0.5 });

};

