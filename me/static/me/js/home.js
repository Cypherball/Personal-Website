var nav = new Vue({
    el: "#navbar-items",
    data: {
        idprefix: "nav-",
        //navlinks: ["#about","#education","#skills","#certifications","#portfolio","#projects","#contact"],
        navlist: {
            About: "#about",
            Education: "#education",
            Skills: "#skills",
            Certifications: "#certifications",
            Portfolio: "#portfolio",
            Projects: "#projects",
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

//gsap.registerPlugin(ScrollToPlugin);

$(document).ready(function () {
    /*$(".nav-link").get().forEach((btn, index) => {
        btn.addEventListener("click", () => {
            event.preventDefault();
            gsap.to(window, { duration: 1.5, scrollTo: { y: nav.navlinks[index] }} );
        });
    });*/
    
    //Register Intersection Observer to update active link
    //based on which section is most visible on viewport
    if (window.matchMedia('(min-width: 950px)').matches) {
        let observer = new IntersectionObserver(function (entries) {
            //let maxratio = 0;
            //let activeSection = "";
            entries.forEach(function (entry) {
                if (entry.isIntersecting === true) {
                    //Only enable this feature for device width greater than 950px
                    if (window.matchMedia('(min-width: 950px)').matches) {
                        nav.navUpdate(entry.target.id)
                    } else {
                        $(".nav-item").addClass("active");
                    }
                }
                /*if (entry.intersectionRatio > maxratio) {
                    maxratio = entry.intersectionRatio;
                    activeSection = entry.target.id;
                }*/
            });
            //nav.navUpdate(activeSection)
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
