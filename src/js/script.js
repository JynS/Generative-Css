/*jshint esversion: 6 */
(function(global, $) {

    // ----------------------------------------------------------------------------
    // global varables
    // ----------------------------------------------------------------------------

    var active_rls = 0;

    // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------
    // Color swatch
    // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------

    function Swatch() {
        this.grad = "";
    }

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

        rShape: function() {
            /*
            decide between circle or ellipse
            */

            return Math.floor(Math.random() * 2) === 0 ? "circle" : "ellipse";
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

            var pc = (Math.random() * 101) + "%";
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

            // var shape = this.rShape();

            var extent = this.rExtent();

            var posx = this.rPos(1420);
            var posy = this.rPos(720);

            var c1 = this.rColor();
            var c2 = this.rColor();
            var c3 = this.rColor();

            var string = `radial-gradient(circle ${extent} at ${posx} ${posy}, ${c1} 0%, ${c2} 50%, ${c3} 95%)`;

            this.currentRadGrads.push(string);

            return string;
        },

        genRDs: function() {
            /*
            generate radial gradients and set the backgrounds
            */

            var self = this;

            // decide how many layer are going to be used
            active_rls = Math.floor(Math.random() * 6) + 1;

            for (let i = 0; i < active_rls; i++) {
                self.setBackground($(".radial")[i], self.gRD());
            }
        },

        setRDs: function(grads) {
            /*
            Assign radial gradients and set the backgrounds
            */

            for (let i = 0; i < active_rls; i++) {
                this.setBackground($(".radial")[i], grads[i]);
            }
        },

        // ----------------------------------------------------------------------------
        // Saving gradients functions
        // ----------------------------------------------------------------------------

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

        setBackground: function(canvas, grad) {
            $(canvas).css("background", grad);
        },

        printInfo: function() {
            /*
            Print current gradients to console
            */

            var string = this.currentLinGrad + "\n";
            for (var r of this.currentRadGrads) {
                string += r + "\n";
            }
            console.log(string);
        },

        reset: function() {
            /*
            reset radial backgrounds
            */

            // clear out radial gradients
            this.currentRadGrads = [];
            this.setBackground(".radial", "transparent");
        },

        genBG: function(rgrads, lrad) {
            /*
            generate background
            */

            this.reset();

            this.setBackground("#linear", lrad || this.gLD());
            rgrads ? this.setRDs(rgrads) : this.genRDs();
            this.printInfo();
        }
    };

    Gradients.init = function() {

        var self = this;

        self.currentLinGrad = "";
        self.currentRadGrads = [];
        // TODO: make a more streamlined way to record multiple gradients

        // TODO: load saved gradients from server
        self.savedGradients = new Set();

    };

    Gradients.init.prototype = Gradients.prototype;

    global.Gradients = Gradients;

})(window, jQuery);



$(document).ready(function() {
    // TODO: allow user to return to previous gradient

    // init Gradients object
    var g = Gradients();

    keyboardJS.bind("space", function() {
        g.genBG();
    });

    // keyboardJS.bind("shift", function() {
    //     $("#sidebar").toggleClass("open");
    // });

    keyboardJS.bind("s", function() {
        // g.saveGrad("#sidebar ul");
    });

    keyboardJS.bind("0", function() {
        $("#linear").toggleClass("hide");
    });

    keyboardJS.bind("1", function() {
        $("#radial1").toggleClass("hide");
    });

    keyboardJS.bind("2", function() {
        $("#radial2").toggleClass("hide");
    });

    keyboardJS.bind("3", function() {
        $("#radial3").toggleClass("hide");
    });

    keyboardJS.bind("4", function() {
        $("#radial4").toggleClass("hide");
    });

    keyboardJS.bind("5", function() {
        $("#radial5").toggleClass("hide");
    });

    keyboardJS.bind("6", function() {
        $("#radial6").toggleClass("hide");
    });

    keyboardJS.bind("7", function() {
        $("#radial7").toggleClass("hide");
    });

    keyboardJS.bind("8", function() {
        $("#radial8").toggleClass("hide");
    });

    g.genBG();

});
