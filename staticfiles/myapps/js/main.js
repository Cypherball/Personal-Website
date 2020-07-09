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
            Portfolio: "/portfolio/",
            Projects: "/#projects",
            Apps: "/apps",
            Contact: "/#contact"
        }
    },
    methods: {
        navItemClick: function (event) {
            $(".navbar-collapse").collapse("hide");
        }
    }
});

$(function(){
    $("#nav-Apps").addClass("active");
});