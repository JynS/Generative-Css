/*jshint esversion: 6 */
(function(global, $) {

    // ----------------------------------------------------------------------------
    // global varables
    // ----------------------------------------------------------------------------

    var num_rds = 0;

    // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------
    // Gradients object
    // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------

    var Gradients = function() {
        return new Gradients.init();
    };

    Gradients.prototype = {

        // ----------------------------------------------------------------------------
        // Building gradient functions
        // ----------------------------------------------------------------------------

        rColor: function(min, max) {
            /*
            generate random color
            */

            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var a = Math.random();

            return `rgba(${r}, ${g}, ${b}, ${a})`;
        },

        rDeg: function() {
            /*
            generate random degree
            */

            var dg = (Math.random() * 361) + "deg";
            return dg;
        },

        rPos: function(limit) {
            /*
            generate random position
            */

            var pos = Math.floor(Math.random() * limit) + 10;

            return pos + "px";
        },

        rExtent: function() {
            /*
            decide which extent to use for radial gradients
            */

            var exs = "closest-corner closest-side farthest-corner farthest-side".split(" ");

            var i = Math.floor(Math.random() * 4);

            return exs[i];
        },

        rPercent: function(min, max) {
            /*
            generate random percentage
            */

            var pc = (Math.random() * (max - min) + min) + "%";
            return pc;
        },

        gLD: function() {
            /*
            generate random linear gradient
            */

            // generate direction
            var angle = this.rDeg();

            // decide how many colors will be used
            var numc = Math.floor(Math.random() * 10) + 2;
            var colors = [];
            // generate colors
            for (var i = 0; i < numc; i++) {
                colors.push(this.rColor());
            }

            // generate percentage
            // var pc = this.rPercent();
            var pc = "100%";

            // build linear-gradient string
            var string = "linear-gradient(" + angle;
            for (var c in colors) {
                string += ", " + colors[c];
            }
            string += " " + pc + ")";

            this.currentLinGrad = string;

            return string;
        },

        gRD: function() {
            /*
            generate random radial gradient
            */

            var extent = this.rExtent();

            var posx = this.rPos(window.screen.width);
            var posy = this.rPos(window.screen.height);

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
                var c = this.rColor();
                var pc = this.rPercent.apply(this, ranges[i]);
                string += `, ${c} ${pc}`;
            }
            string += ")";

            this.currentRadGrads.push(string);

            return string;
        },

        buildBGS: function(rgrads, lgrad) {
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
                    bgs += this.gRD() + ",";
                }
            }

            // get linear gradient
            bgs += lgrad || this.gLD();

            return bgs;
        },

        // ----------------------------------------------------------------------------
        // Saving gradients functions
        // ----------------------------------------------------------------------------

        /*
        // build a color square
        // addi it to the list

        saveGrad: function(ul) {
            var img = document.createElement("img");

        },

        buildSwatch: function(ul) {

            var self = this;
            var lgrad = self.currentLinGrad;

            // buld swatch
            var li = document.createElement("li");
            var sw = document.createElement("div");

            var layers = [];

            // add classes / set gradient
            $(sw).addClass("swatch");
            self.setBackground(sw, lgrad);
            $(sw).css("z-index", 10);

            self.currentRadGrads.forEach((v, i) => {
                layers.push(v);

                var div = document.createElement("div");
                $(div).addClass("swatch-layer");
                self.setBackground(div, v);
                $(div).css("z-index", (11 + i));
                $(sw).append(div);
            });

            $(li).click(function() {
                num_rds = layers.length;
                self.genBG(layers, lgrad);
            });



            $(li).append(sw);
            $(ul).append(li);
        },
        */

        setBackground: function(canvas, bg) {
            /*
            Apply css background to the whatever element is passed in
            */

            $(canvas).css("background", bg);
        },

        printInfo: function() {
            /*
            Print current gradients to console
            */

            var string = "";
            for (var r of this.currentRadGrads) {
                string += r + ",\n";
            }
            string += this.currentLinGrad + "\n";
            console.log(string);
        },

        genBG: function(rgrads, lgrad) {
            /*
            generate css background
            */

            this.currentRadGrads = [];
            this.setBackground("#canvas", this.buildBGS(rgrads, lgrad));
            this.printInfo();
        }
    };

    Gradients.init = function() {
        this.currentLinGrad = "";
        this.currentRadGrads = [];
    };

    Gradients.init.prototype = Gradients.prototype;

    global.Gradients = Gradients;

})(window, jQuery);



$(document).ready(function() {
    // TODO: allow user to return to previous gradient
    // TODO: find some way to download these images somehow

    // init Gradients object
    var g = Gradients();
    var wrapper = document.getElementById("wrapper");


    // Check if this is the first visit to the site
    if (!localStorage.getItem("visited")) {

        // display welcome page
        $("#welcome").css("display", "block");

        // generate new background if spacebar is pressed, or screen is touched
        // and remove welcome page
        keyboardJS.bind("space", function() {
            $("#welcome").css("display", "none");
            g.genBG();
        });

        $("#start").click(function() {
            $("#welcome").css("display", "none");

            wrapper.addEventListener("touchend", function() {
                g.genBG();
            });
        });


        // add 'visited' key to local storage
        localStorage.setItem("visited", true);
    }
    else {

        // generate new background if spacebar is pressed, or screen is touched
        keyboardJS.bind("space", function() {
            g.genBG();
        });

        wrapper.addEventListener("touchend", function() {
            g.genBG();
        });
    }

    g.genBG();


});
