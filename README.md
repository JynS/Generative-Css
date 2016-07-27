# Generative CSS

Generative Css is a site that generates backgrounds using CSS3's `radial-gradient` and `linear-gradient` properties. Press the spacebar on desktop or tap the screen on mobile to generate a new background

## How it works
The way it works is that it builds the css for 1-11 radial gradients, and 1 linear gradient, and chains it all together to one rule for `background` and sets the background to that rule. An example of the output could look like this:

```
background {
    radial-gradient(circle closest-corner at 514px 621px, rgba(7, 76, 244, 0.5916223781342443) 0%, rgba(224, 64, 93, 0.5805466980727866) 10.344988656130807%, rgba(212, 102, 199, 0.6122771069997439) 38.49089221731708%, rgba(137, 80, 69, 0.809597854696835) 56.45118332485231%, rgba(207, 1, 41, 0.5112145123617081) 77.09642939360032%),
    radial-gradient(circle closest-corner at 84px 523px, rgba(102, 95, 223, 0.916229233288807) 0%, rgba(116, 153, 193, 0.9539998488577891) 11.018296541009441%, rgba(111, 9, 153, 0.8374466571452466) 39.06367959758097%, rgba(55, 204, 136, 0.8535466534647682) 56.40154396227963%, rgba(130, 209, 255, 0.06407012035535786) 80.7877362965396%),
    radial-gradient(circle closest-side at 900px 215px, rgba(88, 220, 75, 0.46858553090003874) 0%, rgba(2, 232, 243, 0.9761726310396438) 12.849034891050234%, rgba(188, 110, 48, 0.45437532713126183) 37.36278277766192%, rgba(181, 137, 69, 0.34965359493361203) 50.23006760133989%),
    linear-gradient(6.46657643463969deg, rgba(253, 116, 229, 0.25892781566074485), rgba(67, 21, 226, 0.63459558042267), rgba(228, 242, 58, 0.8231754637736107), rgba(46, 131, 194, 0.47338732018316665) 100%)
}
```

or even get as lengthy as this:

```
background {
    radial-gradient(circle farthest-corner at 379px 12px, rgba(234, 132, 191, 0.7960826055870699) 0%, rgba(104, 201, 105, 0.20344528993998856) 13.530998246230642%, rgba(245, 247, 134, 0.290329497410181) 39.18635175610875%, rgba(192, 99, 65, 0.51185757017638) 60.073832302952354%, rgba(234, 221, 67, 0.6180976605302089) 79.08845472998708%),
    radial-gradient(circle closest-side at 950px 172px, rgba(60, 25, 106, 0.8487788461783426) 0%, rgba(79, 50, 80, 0.8004777606899325) 16.107820527267997%, rgba(218, 173, 73, 0.048679074747203566) 31.143451794667982%, rgba(114, 141, 213, 0.07756801602607044) 57.48742719572712%, rgba(201, 200, 127, 0.03305542443076381) 80.55590273422153%, rgba(237, 27, 19, 0.7095313186153331) 95%),
    radial-gradient(circle farthest-side at 1071px 106px, rgba(232, 190, 214, 0.2683817840398427) 0%, rgba(173, 226, 210, 0.5629500834344723) 15.747744790240883%, rgba(89, 247, 188, 0.32464615141933184) 30.78439575858283%, rgba(144, 182, 75, 0.5583493535295135) 56.23179810780951%, rgba(230, 126, 253, 0.47435139324356657) 72.69282669549538%, rgba(221, 68, 211, 0.4326466514857473) 95%),
    radial-gradient(circle farthest-side at 970px 446px, rgba(136, 194, 140, 0.0510672357506895) 0%, rgba(46, 203, 215, 0.7206873468810963) 13.191716015031835%, rgba(244, 27, 165, 0.6687657932738404) 36.530727860880305%),
    radial-gradient(circle farthest-side at 636px 621px, rgba(76, 96, 56, 0.9557704445707025) 0%, rgba(196, 19, 19, 0.3792877635213633) 19.82898668767088%, rgba(229, 89, 233, 0.8736969165315314) 34.5759812997911%, rgba(123, 102, 95, 0.5264682810406314) 51.11888169505487%, rgba(119, 96, 152, 0.5267638801630891) 73.68977660098622%, rgba(125, 214, 5, 0.17133987157240027) 95%),
    radial-gradient(circle farthest-corner at 487px 435px, rgba(189, 34, 32, 0.7866485227525282) 0%, rgba(88, 154, 144, 0.7699937763212428) 20.602038113840635%, rgba(65, 207, 0, 0.09175042855371951) 32.085315548637546%, rgba(118, 47, 74, 0.1923235043824415) 58.97221026164912%),
    radial-gradient(circle closest-corner at 758px 266px, rgba(150, 122, 94, 0.9557116499687693) 0%, rgba(63, 5, 157, 0.14613789485608109) 18.651827881665724%, rgba(18, 138, 209, 0.499376893782841) 36.353047501102246%, rgba(21, 204, 170, 0.29823576552286024) 52.71537869546219%, rgba(134, 3, 230, 0.7162066755405098) 78.64968495433067%),
    radial-gradient(circle closest-side at 1035px 458px, rgba(149, 227, 31, 0.7797024064325145) 0%, rgba(175, 74, 2, 0.9550569184229042) 19.663206807495243%, rgba(18, 135, 49, 0.022031444814128887) 32.843297464128256%, rgba(150, 126, 9, 0.08743797598377101) 53.4171953002878%, rgba(206, 222, 221, 0.5736909195437966) 78.87790493676951%, rgba(250, 46, 113, 0.6082714106795244) 95%),
    radial-gradient(circle farthest-corner at 598px 250px, rgba(64, 169, 62, 0.7133524311310203) 0%, rgba(146, 166, 45, 0.33588184811826505) 20.777710552214586%, rgba(129, 156, 153, 0.471626348101562) 36.604150833470186%),
    radial-gradient(circle farthest-side at 697px 252px, rgba(130, 80, 157, 0.3413770590755584) 0%, rgba(210, 1, 136, 0.7754301623168612) 10.425040455393297%, rgba(169, 200, 23, 0.0034137603187485155) 37.141194977942995%, rgba(87, 52, 211, 0.026132250392756684) 50.38932429919774%, rgba(182, 172, 2, 0.9611061054174981) 74.53793142907077%, rgba(85, 187, 146, 0.12776819682540896) 95%),
    radial-gradient(circle farthest-corner at 348px 762px, rgba(252, 231, 184, 0.2091409284264919) 0%, rgba(183, 251, 137, 0.9190385027067316) 11.559485193275984%, rgba(247, 55, 210, 0.6544631762548662) 31.89710794058328%, rgba(143, 123, 109, 0.8196908478488879) 50.23735790158038%, rgba(250, 198, 124, 0.1886029956961044) 71.58226638509795%, rgba(143, 235, 50, 0.3270827045377622) 95%),
    radial-gradient(circle farthest-corner at 1362px 696px, rgba(95, 76, 229, 0.12808529421824655) 0%, rgba(34, 68, 157, 0.4743648794394293) 18.512066334602395%, rgba(72, 120, 28, 0.9840885085103384) 34.58479340758878%, rgba(173, 199, 134, 0.8829865119890048) 60.941311198227964%, rgba(99, 133, 121, 0.5795454126230406) 79.90323828415663%),
    linear-gradient(14.402537082524868deg, rgba(16, 97, 1, 0.9906791334728996), rgba(128, 158, 249, 0.29448745514372665), rgba(51, 186, 120, 0.690978603017868), rgba(167, 160, 39, 0.9285554882450646), rgba(116, 133, 217, 0.24179523767821698), rgba(124, 194, 76, 0.9745311917126439), rgba(236, 27, 119, 0.7093255168491563), rgba(102, 67, 54, 0.09011090683197054), rgba(115, 49, 128, 0.30621765392561573), rgba(215, 126, 112, 0.22593318908898685) 100%)
}
```
