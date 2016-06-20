/*jshint esversion: 6 */
(function(global, $) {

    // ----------------------------------------------------------------------------
    // global varables
    // ----------------------------------------------------------------------------

    var active_rls = 0;

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

            var posx = this.rPos(1420);
            var posy = this.rPos(720);
            
            var string = `radial-gradient(circle ${extent} at ${posx} ${posy}`;

            var numrs = Math.floor(Math.random() * (7 - 3) + 3);

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

            var c1 = this.rColor();
            var c2 = this.rColor();
            var c3 = this.rColor();
            var c4 = this.rColor();

            // var string = `radial-gradient(circle ${extent} at ${posx} ${posy}, ${c1} 0%, ${c2} 50%, ${c3} 70%, ${c4} 95%)`;

            this.currentRadGrads.push(string);

            return string;
        },

        buildBGS: function(rgrads, lgrad) {
            /*
            build background string
            */

            var bgs = "";

            // get radial gradients
            if (rgrads) {
                for (let i = 0; i < active_rls; i++) {
                    bgs += rgrads[i] + ",";
                }
            }
            else {
                active_rls = Math.floor(Math.random() * 6) + 1;
                for (let i = 0; i < active_rls; i++) {
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
                active_rls = layers.length;
                self.genBG(layers, lgrad);
            });



            $(li).append(sw);
            $(ul).append(li);
        },
        */

        setBackground: function(canvas, grad) {
            $(canvas).css("background", grad);
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

        reset: function() {
            /*
            reset radial backgrounds
            */

            // clear out radial gradients
            this.currentRadGrads = [];
        },

        genBG: function(rgrads, lgrad) {
            /*
            generate background
            */

            this.reset();
            this.setBackground("#canvas", this.buildBGS(rgrads, lgrad));
            this.printInfo();
        }
    };

    Gradients.init = function() {

        var self = this;

        self.currentLinGrad = "";
        self.currentRadGrads = [];
    };

    Gradients.init.prototype = Gradients.prototype;

    global.Gradients = Gradients;

})(window, jQuery);



$(document).ready(function() {
    // TODO: allow user to return to previous gradient
    // TODO: find some way to download these images somehow
    // TODO: add touch screen functionality


    // init Gradients object
    var g = Gradients();

    if (!localStorage.getItem("visited")) {
        $("#tutorial").css("display", "block");

        keyboardJS.bind("space", function() {
            $("#tutorial").css("display", "none");
            g.genBG();
        });

        localStorage.setItem("visited", true);
    }
    else {
        keyboardJS.bind("space", function() {
            g.genBG();
        });
    }

    g.genBG();


});
