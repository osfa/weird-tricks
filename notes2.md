# clouds / layers / tilsets

- star map layer? star charts? horoscopes?
- game tilset tiles? srpitesheets?
- have it be night and day and diff values? for clouds on top of map?

clouds as markers vs layer, hmm

! - better with just svg overlays in cricles? not pins? or keep static size? how did i do it with readme?
! - add as map pins just? could jsut render inside one of those markers fi so? do that on index?

# content

- data lake pics (collages and reg?)

- styleized datestamps on cards? or at bottom in footer?

  - use correct dates for marker? for article?

- collapse model prediction image? and link..

- nft screens as well?

- number id or hash in node key?

# tiny func

- header tap needs to nav as well
- remember to do the shadow thing on the cards... just image cards?
- randomize action bar icons on cards as well...def just the cards as the base block

- video stuff is just youtube embeds?

- exif data for some of the miages just?

naming: weird card, weird text, weird icon, etc - need a weirdcard and weirdcomponent that can render ramdomly

- notification thing element?

(center and remove text cards)

- randomize animation type?

# menu layout

- mutate cols etc..refreshes itself?
- change height of menu and number of menus as awekll? slide toggle in?

# components

- audio player with tone, bronw noise and calming sounds, shifts between them?
  - siwtch tone on node swtich. or slowly ramp?

## dashboard

- icon blocks like this one? and just blocks with nonsen and one link?

## text / cards

- hmm card vs marker? diffs?

- just make lots of types of cards? and render with vid or pic? -> link. rest generated somehow.
- just use whatever is in the vuetify demo? and randomly add image and ulr. text just garbled? **\*\***
  WeirdText with type etc - just the toal collapse of meaning of symbols and value? ltters int he graph etc? func that retunrs random data return? \***\*\*\*\*\*** numbers, gpt sentence, icon? icon pattern? url. link button. link button needs to be consistent? searc hits just url or title? what is the readble thing? redaction and cenersoign covering text in colors?

- anything that is a number ranomdize?

- generative text blocks of poems? jargong? small animated techn cut up loops?

- make some strings be contitnous sentences in menu

- clickbait gpt2 def? or gpt3?
  - gpt3 eff manifesto?

# dump

multiple top headers sometimes?

youtube embed pop ins from bottom?

also index with patterns of the same objects? like circles and squares and just one in middle and grids? cards and components etc?

38.29694761047134 45.42145298326993
33.862490337877226 73.90984347581889

      var div = document.createElement("div");
      div.className = "cloudBase";
      var x = 256 - Math.random() * 512;
      var y = 256 - Math.random() * 512;
      var z = 256 - Math.random() * 512;
      var t =
        "translateX( " +
        x +
        "px ) translateY( " +
        y +
        "px ) translateZ( " +
        z +
        "px )";
      div.style.webkitTransform =
        div.style.MozTransform =
        div.style.oTransform =
        div.style.transform =
          t;
      document.body.appendChild(div);

      for (var j = 0; j < 5 + Math.round(Math.random() * 10); j++) {
        var cloud = document.createElement("img");
        cloud.style.opacity = 0;
        var r = Math.random();
        var src = "troll.png";
        for (var k = 0; k < computedWeights.length; k++) {
          if (r >= computedWeights[k].min && r <= computedWeights[k].max) {
            (function (img) {
              img.addEventListener("load", function () {
                img.style.opacity = 0.8;
              });
            })(cloud);
            src = computedWeights[k].src;
          }
        }
        if (computedWeights.length === 0) {
          cloud.style.opacity = 0.8;
        }
        cloud.setAttribute("src", src);
        cloud.className = "cloudLayer";

        var x = 256 - Math.random() * 512;
        var y = 256 - Math.random() * 512;
        var z = 100 - Math.random() * 200;
        var a = Math.random() * 360;
        var s = 0.25 + Math.random();
        x *= 0.2;
        y *= 0.2;
        cloud.data = {
          x: x,
          y: y,
          z: z,
          a: a,
          s: s,
          speed: 0.1 * Math.random(),
        };
        var t =
          "translateX( " +
          x +
          "px ) translateY( " +
          y +
          "px ) translateZ( " +
          z +
          "px ) rotateZ( " +
          a +
          "deg ) scale( " +
          s +
          " )";
        cloud.style.webkitTransform =
          cloud.style.MozTransform =
          cloud.style.oTransform =
          cloud.style.transform =
            t;

        div.appendChild(cloud);
        layers.push(cloud);
      }

      return div;
