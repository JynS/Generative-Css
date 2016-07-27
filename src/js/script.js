/*jshint esversion: 6 */
(function(global, $) {

    // ----------------------------------------------------------------------------
    // global varables
    // ----------------------------------------------------------------------------

    // number of radial gradients
    var num_rds = 0;

    var currentLinGrad = "";
    var currentRadGrads = [];

    var wrapper = document.getElementById("wrapper");


    // ----------------------------------------------------------------------------
    // Building gradient functions
    // ----------------------------------------------------------------------------

    function rColor(min, max) {
        /*
        generate random color
        */

        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var a = Math.random();

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    function rDeg() {
        /*
        generate random degree
        */

        var dg = (Math.random() * 361) + "deg";
        return dg;
    }

    function rPos(limit) {
        /*
        generate random position
        */

        var pos = Math.floor(Math.random() * limit) + 10;

        return pos + "px";
    }

    function rExtent() {
        /*
        decide which extent to use for radial gradients
        */

        var exs = "closest-corner closest-side farthest-corner farthest-side".split(" ");

        var i = Math.floor(Math.random() * 4);

        return exs[i];
    }

    function rPercent(min, max) {
        /*
        generate random percentage
        */

        var pc = (Math.random() * (max - min) + min) + "%";
        return pc;
    }

    function gLD() {
        /*
        generate random linear gradient
        */

        // generate direction
        var angle = rDeg();

        // decide how many colors will be used
        var numc = Math.floor(Math.random() * 10) + 2;
        var colors = [];
        // generate colors
        for (var i = 0; i < numc; i++) {
            colors.push(rColor());
        }

        // generate percentage
        // var pc = this.rPercent();
        var pc = "100%";

        // build linear-gradient string
        var string = "linear-gradient(" + angle;
        colors.forEach(v => {
            string += ", " + v;
        });
        string += " " + pc + ")";

        currentLinGrad = string;

        return string;
    }

    function gRD() {
        /*
        generate random radial gradient
        */

        var extent = rExtent();

        var posx = rPos(window.innerWidth);
        var posy = rPos(window.innerHeight);

        var string = `radial-gradient(circle ${extent} at ${posx} ${posy}`;

        // decide how many rings the circle will have
        var numrs = Math.floor(Math.random() * (7 - 3) + 3);

        // allowable ranges of percentages depending on which ring is chosen
        var ranges = [
            [0, 0],
            [10, 21],
            [30, 41],
            [50, 61],
            [70, 81],
            [95, 95]
        ];

        for (let i = 0; i < numrs; i++) {
            var c = rColor();
            var pc = rPercent.apply(this, ranges[i]);
            string += `, ${c} ${pc}`;
        }
        string += ")";

        currentRadGrads.push(string);

        return string;
    }

    function buildBGS(rgrads, lgrad) {
        /*
        build background string
        */

        var bgs = "";

        // if the radial gradients are passed in
        if (rgrads) {
            for (let i = 0; i < num_rds; i++) {
                bgs += rgrads[i] + ",";
            }
        }
        else {
            // generate them
            num_rds = Math.floor(Math.random() * 12) + 1;
            for (let i = 0; i < num_rds; i++) {
                bgs += gRD() + ",";
            }
        }

        // get linear gradient
        bgs += lgrad || gLD();

        return bgs;
    }

    function setBackground(canvas, bg) {
        /*
        Apply css background to the whatever element is passed in
        */

        $(canvas).css("background", bg);
    }

    function printInfo() {
        /*
        Print current gradients to console
        */

        var string = "";
        for (var r of currentRadGrads) {
            string += r + ",\n";
        }
        string += currentLinGrad + "\n";
        console.log(string);
    }

    function genBG(rgrads, lgrad) {
        /*
        generate css background
        */

        currentRadGrads = [];
        setBackground("#canvas", buildBGS(rgrads, lgrad));
        printInfo();
    }

    function runWelcome() {
        /*
        Displays the welcome page
        */

        $("#welcome").css("display", "block");

        // generate new background if spacebar is pressed, or screen is touched
        // and remove welcome page
        keyboardJS.bind("space", function() {
            $("#welcome").css("display", "none");
            genBG();
        });
        $("#start").click(function() {
            $("#welcome").css("display", "none");

            wrapper.addEventListener("touchend", function() {
                genBG();
            });
        });

    }

    function runCookiesBlocked() {
        /*
        Displays the welcome page along with the cookie disclaimer
        */

        runWelcome();
        $("#cookie_disclaimer").css("display", "block");

    }

    function runDefault() {
        /*
        Used for users who have visited the site before and accept cookies
        */

        // generate new background if spacebar is pressed, or screen is touched
        keyboardJS.bind("space", function() {
            genBG();
        });
        wrapper.addEventListener("touchend", function() {
            genBG();
        });
    }

    // Check if the user allows cookies (which covers localstorage);
    if (Modernizr.localstorage) {
        // supported

        // Check if this is the first visit to the site
        if (!localStorage.getItem("visited")) {
            runWelcome();
            // add 'visited' key to local storage
            localStorage.setItem("visited", true);
        }
        else {
            runDefault();
        }

    }
    else {
        // not-supported

        runCookiesBlocked();
    }

    genBG();

    // attach hover listener to #footer
    $("#footer").hover(function() {
        $("#footer").css("color", "#337ab7");
        $("#footer a").css("color", "#337ab7");
    }, function() {
        $("#footer").css("color", "transparent");
        $("#footer a").css("color", "transparent");
    });


})(window, jQuery);
