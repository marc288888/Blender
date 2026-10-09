/* ------------------------------------------------------------------------
   Blending Builder — content, matched to the KG3 PHONICS book.

   Two parts, the same as the book:

     Part 1  LETTERS   a–z plus ch, sh, th (and wh)
             Each story starts with the book's tongue-twister
             ("angry ants at an airport", "buzzing bees borrowing books" …)
             and uses the vocabulary words from that letter's page.

     Part 2  BLENDING SOUNDS   ag, am, an, ap, at, ar, ed/eg, en, et, er,
             in, og, op, ot, ub/up, ug — in the book's order.
             Stories are built from the book's own sentences
             ("a rag in the bag", "a cat on a mat", "a tot in the cot" …).
             In the Make game the word is built as start + ending,
             e.g. b + ag, just like "Complete the words" in the book.

   Each entry has:
     letter   the grapheme (shown big on the menu)
     emoji    the keyword picture shown on the tile
     keyword  the keyword word
     story    a short story for the TEACHER to read aloud. Target words are
              written in *asterisks* and the app highlights them on screen.
              scenes = the pictures for each page (one list per line).
     pics     pictures for the Find game
     words    words built in the Make game, split into parts (one tile each)

   Blending entries also have:
     kind: "blend"
     label   what is shown on the tile ("ed eg")
     match   the letter groups the Find game looks for

   A picture "emoji" can also be a plain word such as "rag" — that is just
   the name of a drawing in art.js, for things that have no emoji.
   ------------------------------------------------------------------------ */

const ALPHABET = {

  /* ======================================================= PART 1: LETTERS */

  a: {
    letter: "a", emoji: "🍎", keyword: "apple",
    story: {
      title: "Angry Ants at an Airport",
      lines: [
        "*Angry* *ants* *at* *an* *airport* today\nwant to jump on a jet and fly far away.",
        "They pack a red *apple* inside a big *bag*,\nwith a *hat* and a *map* and a little red flag.",
        "*An* *alligator* comes with a grin on his face,\n\"I'm hungry!\" he says as he walks round the place.",
        "He sees the red *apple*, so shiny and sweet,\nhe picks it up quickly. \"Now that's what I'll eat!\"",
        "The *ants* get so *angry*, they stamp and they shout,\n\"That *apple* is ours! Put it down! Get it out!\"",
        "The *alligator* stops and he hangs down his head,\n\"I'm sorry, dear *ants*, I was hungry,\" he said.",
        "He holds out the *apple* in both of his *hands*,\n\"Let's share it,\" he says. And the *ants* say, \"That's grand!\"",
        "They munch and they crunch, then they jump on the jet,\nthe *ants* *and* the *alligator* — best friends yet!"
      ],
      scenes: [
        ["🐜", "✈️", "🐜"],
        ["🐜", "🎒", "🍎"],
        ["🐊", "✈️"],
        ["🐊", "🍎"],
        ["😠", "🐜", "🐜"],
        ["🐊", "😔"],
        ["🐊", "🍎", "🐜"],
        ["🐜", "🍎", "✈️"]
      ]
    },
    pics: [{ e: "🍎", w: "apple" }, { e: "🐜", w: "ant" }, { e: "🐊", w: "alligator" },
           { e: "🎒", w: "bag" }, { e: "🖐️", w: "hands" }],
    words: [
      { word: "bag", emoji: "🎒", parts: ["b", "a", "g"] },
      { word: "ant", emoji: "🐜", parts: ["a", "n", "t"] },
      { word: "cat", emoji: "🐱", parts: ["c", "a", "t"] },
      { word: "hand", emoji: "🖐️", parts: ["h", "a", "n", "d"] }
    ]
  },

  b: {
    letter: "b", emoji: "⚽", keyword: "ball",
    story: {
      title: "Buzzing Bees Borrowing Books",
      lines: [
        "*Buzzing* *bees* *borrow* *books* every day,\nthey fly to the library — *buzz*, *buzz*, away!",
        "They put all the *books* in a *big* pink *bag*,\nso heavy the *bees* start to wobble and sag.",
        "*Ben* and his *brother* come out to play,\n\"Hello, little *bees*! Can we read today?\"",
        "The *bees* give a *book* that is *big* and *bright*,\nthe *boys* read and read from the morning till night.",
        "Then out comes a *ball* and they *bounce* it around,\n*bounce* on the grass and *bounce* on the ground.",
        "A *bee* lands on top of the *ball* for a ride,\n*Ben* kicks it too hard and it flies to the side.",
        "*Boing*! goes the *ball* and it lands in the *bin*,\n\"Oh no!\" says his *brother*. \"It fell right in!\"",
        "The *bees* *buzz* down and they lift it out — hooray!\n\"Thank you, *busy* *bees*!\" say the *boys*. \"What a day!\""
      ],
      scenes: [
        ["🐝", "📚", "🐝"],
        ["🐝", "🎒", "📚"],
        ["👦", "🧒", "🐝"],
        ["👦", "📖", "🧒"],
        ["👦", "⚽"],
        ["⚽", "🐝"],
        ["⚽", "🗑️"],
        ["🐝", "🗑️", "👦"]
      ]
    },
    pics: [{ e: "⚽", w: "ball" }, { e: "📚", w: "book" }, { e: "🧒", w: "brother" },
           { e: "🗑️", w: "bin" }, { e: "🎒", w: "bag" }],
    words: [
      { word: "bag", emoji: "🎒", parts: ["b", "a", "g"] },
      { word: "bin", emoji: "🗑️", parts: ["b", "i", "n"] },
      { word: "bed", emoji: "🛏️", parts: ["b", "e", "d"] },
      { word: "bus", emoji: "🚌", parts: ["b", "u", "s"] }
    ]
  },

  c: {
    letter: "c", emoji: "🐱", keyword: "cat",
    story: {
      title: "A Crazy Cat Clawing Carpets",
      lines: [
        "A *crazy* *cat* lives in a *cosy* house,\nshe *can* run as fast as a little mouse.",
        "Her name is *Coco*, and what does she do?\nShe *claws* the *carpet*! She *claws* it right through!",
        "*Tick*-*tock* goes the *clock* on the wall,\n*Coco* keeps *clawing* — she won't stop at all!",
        "The sky is all *cloudy* — big clouds, white and round,\nMum puts the *clothes* on the bed, safe and sound.",
        "*Coco* jumps up on the *clothes* with a leap,\nshe rolls and she rolls in a *cosy* warm heap.",
        "*Colin* *comes* home in his little red *car*,\nhe *calls* for his *Coco*: \"*Come*, wherever you are!\"",
        "He looks and he looks — and what *can* he see?\nA tail in the *clothes*! \"Ha! *Coco*, I see!\"",
        "\"*Come* here, you *crazy* *cat*!\" *Colin* says with a smile,\nand gives her a *cuddle* that lasts a long while."
      ],
      scenes: [
        ["🐱", "🏠"],
        ["🐱", "mat"],
        ["🕐", "🐱"],
        ["☁️", "👕", "👩"],
        ["🐱", "👕"],
        ["🚗", "👦"],
        ["👕", "🐱", "👦"],
        ["👦", "🤗", "🐱"]
      ]
    },
    pics: [{ e: "🐱", w: "cat" }, { e: "🚗", w: "car" }, { e: "🕐", w: "clock" },
           { e: "👕", w: "clothes" }, { e: "☁️", w: "cloudy" }],
    words: [
      { word: "cat", emoji: "🐱", parts: ["c", "a", "t"] },
      { word: "cap", emoji: "🧢", parts: ["c", "a", "p"] },
      { word: "cup", emoji: "☕", parts: ["c", "u", "p"] },
      { word: "can", emoji: "🥫", parts: ["c", "a", "n"] }
    ]
  },

  d: {
    letter: "d", emoji: "🐶", keyword: "dog",
    story: {
      title: "Dozing Dinosaur Dreaming",
      lines: [
        "A *dinosaur* *dozes* under a tree,\nas sleepy and tired as a *dino* can be.",
        "His eyes are both shut and he's starting to snore,\nhe's *dreaming* and *dreaming* — what *dreams* are in store?",
        "He *dreams* of a *dog* in a pretty blue *dress*,\nshe twirls and she spins — what a *dancing* success!",
        "The *dog* *dances* left and the *dog* *dances* right,\nshe *dances* all *day* and she *dances* all night.",
        "Then he *dreams* of the sea, with the waves rolling round,\nwhere a *dolphin* is jumping and splashing around.",
        "The *dolphin* *dives* *down* to the bottom so *deep*,\nand finds a big *diamond* that sparkles in sleep.",
        "She gives it away to the *dog* in the *dress*,\n\"A *diamond* for you!\" — Oh, what a *dream*, yes!",
        "*Ding-dong*! goes a bell and he opens his eyes,\nthe *dinosaur* wakes with a *dreamy* surprise!"
      ],
      scenes: [
        ["🦕", "🌳"],
        ["🦕", "💤"],
        ["🐶", "👗"],
        ["🐶", "👗", "🎉"],
        ["🐬", "🌊"],
        ["🐬", "💎", "🌊"],
        ["🐬", "💎", "🐶"],
        ["🦕", "😲"]
      ]
    },
    pics: [{ e: "🐶", w: "dog" }, { e: "🐬", w: "dolphin" }, { e: "💎", w: "diamond" },
           { e: "👗", w: "dress" }, { e: "🦕", w: "dinosaur" }],
    words: [
      { word: "dog", emoji: "🐶", parts: ["d", "o", "g"] },
      { word: "dad", emoji: "👨", parts: ["d", "a", "d"] },
      { word: "dig", emoji: "⛏️", parts: ["d", "i", "g"] },
      { word: "duck", emoji: "🦆", parts: ["d", "u", "ck"] }
    ]
  },

  e: {
    letter: "e", emoji: "🐘", keyword: "elephant",
    story: {
      title: "Excited Elephants Eating Eggs",
      lines: [
        "Two *elephants* sit by the big *empty* *shed*,\nso *excited* for breakfast, they jump out of bed.",
        "They have ten big *eggs* in a basket so round,\n*excited* *elephants* eat *eggs* on the ground!",
        "*Ella* the *elephant* gets a surprise,\nan *envelope* comes — she can't believe her eyes!",
        "She opens it up and what does she see?\n*Ten* coloured *pencils*! \"Are these all for me?\"",
        "She takes out the *red* one and draws on the floor,\nan *egg*, then an *egg*, then an *egg*, then *more*!",
        "*Eddie* the *elephant* draws a fat *hen*,\nshe clucks and she lays an *egg*, *then* lays *ten*!",
        "Now *eggs* are on *every* path, *every* street,\nso many *eggs* for the *elephants* to eat!",
        "\"*Excellent*!\" shout *Ella* and *Eddie* with glee,\nthey cook up the *eggs* and they eat them for tea."
      ],
      scenes: [
        ["🐘", "🐘"],
        ["🐘", "🥚", "🐘"],
        ["🐘", "✉️"],
        ["✉️", "🔟", "✏️"],
        ["🐘", "✏️", "🥚"],
        ["🐘", "✏️", "🐔"],
        ["🐔", "🥚"],
        ["🐘", "🍳", "🐘"]
      ]
    },
    pics: [{ e: "🐘", w: "elephant" }, { e: "🥚", w: "egg" }, { e: "✉️", w: "envelope" },
           { e: "✏️", w: "pencil" }, { e: "🔟", w: "ten" }],
    words: [
      { word: "bed", emoji: "🛏️", parts: ["b", "e", "d"] },
      { word: "pen", emoji: "🖊️", parts: ["p", "e", "n"] },
      { word: "ten", emoji: "🔟", parts: ["t", "e", "n"] },
      { word: "leg", emoji: "🦵", parts: ["l", "e", "g"] }
    ]
  },

  f: {
    letter: "f", emoji: "🐟", keyword: "fish",
    story: {
      title: "Four Frogs Fishing",
      lines: [
        "*Four* little *frogs* sit down by the pond,\nwith *fishing* rods, ready, with lines that are long.",
        "They wait and they wait, but no *fish* come to play,\nthe *frogs* *feel* so sad — will they catch one today?",
        "Then *five* *fat* *fish* come swimming along,\nthey splash and they swish and they sing a *fish* song.",
        "The *first* *frog* jumps, but the *fish* are too *fast*,\nthey *flip* and they *flap* and they swim right past.",
        "A tall giraffe comes with her neck to the sky,\n\"What are you doing, *frogs*? Tell me why!\"",
        "\"We're *fishing*,\" they croak, \"but we can't *find* a *fish*,\nto catch just one *fish* is our very best wish!\"",
        "The giraffe looks around with her neck up so high,\nand *finds* an orange *fox* who is just passing by.",
        "No *fish* for the *frogs*, but they don't *feel* so blue,\nthey have *fun* with their *friends*, the *fox* and giraffe too!"
      ],
      scenes: [
        ["🐸", "🎣", "🐸"],
        ["🐸", "😔"],
        ["🐟", "5️⃣", "🌊"],
        ["🐸", "🐟", "💨"],
        ["🦒", "🐸"],
        ["🐸", "🎣"],
        ["🦒", "🦊"],
        ["🐸", "😄", "🦊"]
      ]
    },
    pics: [{ e: "🐟", w: "fish" }, { e: "4️⃣", w: "four" }, { e: "5️⃣", w: "five" },
           { e: "🐸", w: "frog" }, { e: "🦊", w: "fox" }],
    words: [
      { word: "fox", emoji: "🦊", parts: ["f", "o", "x"] },
      { word: "fan", emoji: "fan", parts: ["f", "a", "n"] },
      { word: "fin", emoji: "🦈", parts: ["f", "i", "n"] },
      { word: "fun", emoji: "🎉", parts: ["f", "u", "n"] }
    ]
  },

  g: {
    letter: "g", emoji: "🐐", keyword: "goat",
    story: {
      title: "Goats Go Golfing",
      lines: [
        "Two *goats* *go* *golfing* out on the *green*,\nthe *greenest* *green* *grass* that you've ever seen.",
        "The first *goat* swings and the ball flies so high,\nit lands in the hole! \"*Good* shot!\" the *goats* cry.",
        "Then out of the trees comes a *gorilla* so *grey*,\nhe beats on his chest — \"Can I come out to play?\"",
        "The *gorilla* *grabs* the *golf* ball in his hand,\nand runs off with it, away over the sand!",
        "\"*Give* it back! *Give* it back!\" the *goats* shout and say,\n\"That ball is for *golf* — it's our ball today!\"",
        "The *gorilla* looks sad and he sits on the *ground*,\n\"I just want to play — but there's no one around.\"",
        "A *girl* comes along and she smiles a big smile,\n\"Come play with us all, stay a little while!\"",
        "So *goats* and *gorilla* all play in the sun,\nthey *giggle* and *giggle* — *golf* is *great* fun!"
      ],
      scenes: [
        ["🐐", "⛳", "🐐"],
        ["🐐", "⛳"],
        ["🦍", "🌾"],
        ["🦍", "💨"],
        ["🐐", "🦍"],
        ["🦍", "😔"],
        ["👧", "🦍"],
        ["🐐", "🦍", "😄"]
      ]
    },
    pics: [{ e: "🐐", w: "goat" }, { e: "🦍", w: "gorilla" }, { e: "🧴", w: "glue" },
           { e: "🌾", w: "grass" }, { e: "👧", w: "girl" }],
    words: [
      { word: "gum", emoji: "🍬", parts: ["g", "u", "m"] },
      { word: "gas", emoji: "⛽", parts: ["g", "a", "s"] },
      { word: "bag", emoji: "🎒", parts: ["b", "a", "g"] },
      { word: "big", emoji: "🐘", parts: ["b", "i", "g"] }
    ]
  },

  h: {
    letter: "h", emoji: "🎩", keyword: "hat",
    story: {
      title: "Hairy Hands Holding Hats",
      lines: [
        "Look at these *hands*, all *hairy* and big,\n*holding* some *hats* — a *hat* for a pig?",
        "Whose *hairy* *hands* are *holding* them tight?\nIt's *Harry*! *Hello*! He waves left and right.",
        "\"*Hello*, *hello*!\" *Harry* calls out to me,\n\"Would you like a *hat*? You can *have* one for free!\"",
        "The sun is so *hot* that it's burning my *head*,\nmy face is all *hot* and my cheeks are all red.",
        "*Harry* *hands* me a *hat* that is big, black and round,\nit's so big that it almost falls down to the ground!",
        "I put the big *hat* on top of my *hair*,\n*ha*, *ha*! It's too big — it goes everywhere!",
        "We walk up the *hill* to *Harry's* *house*,\nas quiet and *happy* as a little *house* mouse.",
        "His *hen* is at *home* and she *hides* in a *hat*,\n\"*Hooray*!\" shouts *Harry*. \"Now what about that!\""
      ],
      scenes: [
        ["🖐️", "🎩", "🖐️"],
        ["👦", "🖐️"],
        ["👦", "👋", "🎩"],
        ["☀️", "🥵"],
        ["👦", "🎩"],
        ["💇", "🎩", "😂"],
        ["⛰️", "🏠", "👦"],
        ["🐔", "🎩", "🏠"]
      ]
    },
    pics: [{ e: "🎩", w: "hat" }, { e: "💇", w: "hair" }, { e: "👋", w: "hello" },
           { e: "🥵", w: "hot" }, { e: "🏠", w: "house" }],
    words: [
      { word: "hat", emoji: "🎩", parts: ["h", "a", "t"] },
      { word: "hen", emoji: "🐔", parts: ["h", "e", "n"] },
      { word: "hot", emoji: "🥵", parts: ["h", "o", "t"] },
      { word: "hug", emoji: "🤗", parts: ["h", "u", "g"] }
    ]
  },

  i: {
    letter: "i", emoji: "🧊", keyword: "igloo",
    story: {
      title: "Insects Inside Igloos",
      lines: [
        "When the snow is so cold and the wind starts to blow,\nthe *insects* live *inside* an *igloo* of snow.",
        "The *igloo* is white, but the *insects* *think*,\n\"Our *igloo* would look much better in *pink*!\"",
        "They look all around *in* the cold and the snow,\nand find some *pink* *ink* in a bottle — let's go!",
        "They paint and they paint with the *pink* *ink* all day,\n*pink* walls and a *pink* door — hip *hip* hooray!",
        "Then beep! beep! A yellow *taxi* drives near,\n\"Who wants a ride? Hop *in*! I'm right here!\"",
        "The *insects* climb *in* — one, two, three, four,\nthey *sit* *in* the *taxi* and shut the *taxi* door.",
        "The *taxi* drives off to the beach by the sea,\nwhere the *insects* *sit* *in* the sun happily.",
        "\"*It* *is* so hot!\" say the *insects* — they *grin*,\n\"Back to our *igloo*! Let's all hurry *in*!\""
      ],
      scenes: [
        ["🧊", "🪰", "🐛"],
        ["🧊", "pink"],
        ["🖋️", "🪰"],
        ["🪰", "🖋️", "🧊"],
        ["🚕", "🧊"],
        ["🚕", "🪰", "🐛"],
        ["🚕", "☀️"],
        ["🪰", "😄", "🐛"]
      ]
    },
    pics: [{ e: "🧊", w: "igloo" }, { e: "🪰", w: "insect" }, { e: "🖋️", w: "ink" },
           { e: "pink", w: "pink" }, { e: "🚕", w: "taxi" }],
    words: [
      { word: "pig", emoji: "🐷", parts: ["p", "i", "g"] },
      { word: "six", emoji: "6️⃣", parts: ["s", "i", "x"] },
      { word: "ink", emoji: "🖋️", parts: ["i", "n", "k"] },
      { word: "pin", emoji: "📌", parts: ["p", "i", "n"] }
    ]
  },

  j: {
    letter: "j", emoji: "🪼", keyword: "jellyfish",
    story: {
      title: "Jolly Jelly Beans Jumping",
      lines: [
        "*Jolly* *jelly* beans *jump* up and down,\nthey *jump* all around in the middle of town.",
        "*Jack* and *Jill* see them *jumping* about,\n\"Let's *jump* too!\" they both *joyfully* shout.",
        "They *jump* and they *jump* till they're tired and hot,\nthey *jump* and they *jump* — oh, they *jump* a lot!",
        "*Jill* drinks some *juice* from a little box,\n*Jack* drinks from a *jug* as he sits on the rocks.",
        "The wind starts to blow and it's cold by the sea,\n*Jill* puts on her *jacket* — as warm as can be.",
        "*Jack* eats a *jelly* that's wobbly and round,\nit wibbles and wobbles and *jiggles* around!",
        "They look in the sea and what do they see?\nA *jellyfish* swimming — as blue as can be!",
        "The *jellyfish* *jumps* with a splash and a spin —\nwhat a *jolly* day! Let's *jump* again — *jump* in!"
      ],
      scenes: [
        ["🫘", "🫘", "🫘"],
        ["👦", "👧"],
        ["👦", "👧", "🥵"],
        ["👧", "🧃", "🏺"],
        ["👧", "🧥"],
        ["👦", "🍮"],
        ["🪼", "🌊"],
        ["🪼", "👦", "👧"]
      ]
    },
    pics: [{ e: "🧥", w: "jacket" }, { e: "🍮", w: "jelly" }, { e: "🪼", w: "jellyfish" },
           { e: "🧃", w: "juice" }, { e: "🫙", w: "jar" }],
    words: [
      { word: "jet", emoji: "✈️", parts: ["j", "e", "t"] },
      { word: "jam", emoji: "🍓", parts: ["j", "a", "m"] },
      { word: "jog", emoji: "🏃", parts: ["j", "o", "g"] },
      { word: "jug", emoji: "🏺", parts: ["j", "u", "g"] }
    ]
  },

  k: {
    letter: "k", emoji: "🦘", keyword: "kangaroo",
    story: {
      title: "Koalas Kissing Kittens",
      lines: [
        "Two *koalas* live in a tall green tree,\nthey love little *kittens* as much as can be.",
        "The *koalas* are *kissing* the *kittens* — *kiss*, *kiss*!\nThe *kittens* all purr — oh, what lovely bliss!",
        "A *kangaroo* hops by with a ball in her paw,\nshe hops and she hops — she *keeps* hopping some more.",
        "The *kangaroo* *kicks* and the ball flies so high,\n*kick*! goes the ball, way up into the sky.",
        "It lands by the *king* with his crown made of gold,\nhe smiles a big smile — he's *kind*, so we're told.",
        "The *king* reads a book to the *koalas* in bed,\nthe *koalas* sit close to his *kind* old head.",
        "The *kittens* climb up on the *king's* comfy lap,\nthey curl up so small for a nice little nap.",
        "The *kittens* are sleeping, so cosy and warm,\nthe *koalas* *kiss* them — *kiss*, *kiss* — safe from harm."
      ],
      scenes: [
        ["🐨", "🌳", "🐨"],
        ["🐨", "🐈", "🐨"],
        ["🦘", "⚽"],
        ["🦘", "⚽", "💨"],
        ["🤴", "⚽"],
        ["🤴", "📚", "🐨"],
        ["🤴", "🐈"],
        ["🐈", "🐨", "💤"]
      ]
    },
    pics: [{ e: "🦘", w: "kangaroo" }, { e: "🤴", w: "king" }, { e: "🐨", w: "koala" },
           { e: "🐈", w: "kitten" }, { e: "🪁", w: "kite" }],
    words: [
      { word: "kid", emoji: "🧒", parts: ["k", "i", "d"] },
      { word: "kit", emoji: "🧰", parts: ["k", "i", "t"] },
      { word: "kick", emoji: "🦶", parts: ["k", "i", "ck"] },
      { word: "sock", emoji: "🧦", parts: ["s", "o", "ck"] }
    ]
  },

  l: {
    letter: "l", emoji: "🦁", keyword: "lion",
    story: {
      title: "Lions Love Lazy Lambs",
      lines: [
        "Here is a *lion* with a *long* golden mane,\n*lions* *love* *lazy* *lambs* — and that's very plain!",
        "The *lambs* are so *lazy*, they *lie* down all day,\nthey never get up and they never *like* play.",
        "They *lie* by a *lamp* where a *lemon* sits too,\nit's yellow and bright, and it's *little* and new.",
        "The *lion* comes over. \"*Let* me have a go!\"\nHe *looks* at the *lemon* and *licks* it — just so.",
        "But oh, it is sour! It's sour as can be!\nThe *lion* pulls faces — what a *look* to see!",
        "The *lazy* *lambs* *laugh* — ha ha, hee hee!\nThey *laugh* at the *lion* as *loud* as can be.",
        "A *leaf* floats down and *lands* on his nose,\nthe *lion* *laughs* too, from his head to his toes!",
        "Now *lion* and *lambs* are friends — what a *lot*,\nthey *love* to *laugh* together, *like* it or not!"
      ],
      scenes: [
        ["🦁", "❤️", "🐑"],
        ["🐑", "🐑", "💤"],
        ["🐑", "🪔", "🍋"],
        ["🦁", "🍋"],
        ["🦁", "🍋", "😠"],
        ["🐑", "😂", "🐑"],
        ["🍃", "🦁", "😂"],
        ["🦁", "❤️", "🐑"]
      ]
    },
    pics: [{ e: "🦁", w: "lion" }, { e: "🍋", w: "lemon" }, { e: "🪔", w: "lamp" },
           { e: "❤️", w: "love" }, { e: "🍃", w: "leaf" }],
    words: [
      { word: "leg", emoji: "🦵", parts: ["l", "e", "g"] },
      { word: "lip", emoji: "👄", parts: ["l", "i", "p"] },
      { word: "log", emoji: "🪵", parts: ["l", "o", "g"] },
      { word: "lid", emoji: "🥫", parts: ["l", "i", "d"] }
    ]
  },

  m: {
    letter: "m", emoji: "🐒", keyword: "monkey",
    story: {
      title: "Monkeys Making Movies",
      lines: [
        "*Monkeys* are *making* a *movie* today,\n*Max* has the camera — \"Lights, action, play!\"",
        "*Mother* *monkey* plays *music* — la, la, la!\nThe *monkeys* all dance and they clap — ha, ha!",
        "It's *Monday* *morning* — it's time for some *milk*,\na glass that is white and as smooth as silk.",
        "Then *monkeys* eat *mangoes*, so juicy and sweet,\n*mmm*, *mmm*, *mmm*! What a yummy treat!",
        "*Max* walks along with the camera in hand,\nhe doesn't see *mud* on the soft wet land.",
        "Splat! *Max* falls in! He's all *muddy* and brown,\nwhat a *mess*! What a *mess*! He's the *muddiest* in town!",
        "*Mother* *monkey* scrubs him with water and soap,\nscrub, scrub, scrub — he's clean now, we hope!",
        "The *movie* is finished, they watch it at night,\nthe *monkeys* all cheer — it's a *magical* sight!"
      ],
      scenes: [
        ["🐒", "🎥", "🐵"],
        ["🐵", "🎵"],
        ["📅", "🥛"],
        ["🐵", "🥭"],
        ["🐵", "🎥", "🟤"],
        ["🐵", "🟤"],
        ["🐵", "💦"],
        ["🐒", "🎥", "😄"]
      ]
    },
    pics: [{ e: "🐒", w: "monkey" }, { e: "🎵", w: "music" }, { e: "👩", w: "mother" },
           { e: "🥛", w: "milk" }, { e: "📅", w: "Monday" }],
    words: [
      { word: "map", emoji: "🗺️", parts: ["m", "a", "p"] },
      { word: "man", emoji: "👨", parts: ["m", "a", "n"] },
      { word: "mop", emoji: "🧹", parts: ["m", "o", "p"] },
      { word: "mug", emoji: "mug", parts: ["m", "u", "g"] }
    ]
  },

  n: {
    letter: "n", emoji: "9️⃣", keyword: "nine",
    story: {
      title: "Number Nine Napping",
      lines: [
        "Here is *Number* *Nine*, as round as can be,\nhe's the sleepiest *number* that you'll ever see.",
        "*Number* *Nine* is *napping* — he snores and he sighs,\nZzzz, zzzz, zzzz, with two tired eyes.",
        "*Nick* tiptoes in and he whispers, \"Hey, *Nine*!\nWake up, wake up! It's playtime — it's fine!\"",
        "\"*No*, *no*, *no*!\" says *Nine* with a frown,\n\"I *need* a *nap*! Please don't wake me now!\"",
        "The sun peeks in through the window so bright,\nit shines on *Nine's* *nose* with its warm yellow light.",
        "*Nine* rubs his *nose* and he opens one eye,\n\"Oh *now* I'm awake!\" he says with a sigh.",
        "*Nick* holds up a *can* — \"Are you hungry, my friend?\nThis tuna is yummy, right down to the end!\"",
        "*Nine* eats it all up and says, \"*Nice*! Thank you, *Nick*!\"\nThen he goes back to *napping* — *now* that was quick!"
      ],
      scenes: [
        ["9️⃣"],
        ["9️⃣", "💤"],
        ["👦", "9️⃣"],
        ["9️⃣", "🚫"],
        ["☀️", "9️⃣", "👃"],
        ["9️⃣", "👃"],
        ["👦", "🥫"],
        ["9️⃣", "🥫", "💤"]
      ]
    },
    pics: [{ e: "9️⃣", w: "nine" }, { e: "👃", w: "nose" }, { e: "🚫", w: "no" },
           { e: "🪹", w: "nest" }, { e: "🥜", w: "nut" }],
    words: [
      { word: "net", emoji: "🥅", parts: ["n", "e", "t"] },
      { word: "nap", emoji: "😴", parts: ["n", "a", "p"] },
      { word: "nut", emoji: "🥜", parts: ["n", "u", "t"] },
      { word: "can", emoji: "🥫", parts: ["c", "a", "n"] }
    ]
  },

  o: {
    letter: "o", emoji: "🐙", keyword: "octopus",
    story: {
      title: "One Operating Otter",
      lines: [
        "*One* little *otter* is a doctor in town,\nwith a stethoscope on — the best doctor around!",
        "An *octopus* comes and he holds up an arm,\n\"*Oh*, it hurts! *Oh*, it hurts! Please keep me from harm!\"",
        "\"Lie down *on* the bed,\" the *otter* says, \"please.\n I'm *operating* now, so just lie at your ease.\"",
        "\"Switch the light *on*, so that I can see!\"\nClick! goes the light — now it's bright as can be.",
        "The *otter* works hard and it's terribly *hot*,\nhe wipes his wet face — he is working a *lot*!",
        "\"All done!\" says the *otter*. \"Now switch it *off*, please.\"\nClick! goes the light, and the *octopus* sees.",
        "They share a big *orange* — *one* slice for each,\nas round as the sun and as sweet as a peach.",
        "The *octopus* waves all his arms in the air,\n\"*Oh*, thank you, Doctor *Otter*, for your care!\""
      ],
      scenes: [
        ["🦦", "🩺"],
        ["🐙", "🤕"],
        ["🦦", "🐙", "🛏️"],
        ["💡"],
        ["🦦", "🥵"],
        ["🔌"],
        ["🦦", "🍊", "🐙"],
        ["🐙", "😄", "🦦"]
      ]
    },
    pics: [{ e: "🐙", w: "octopus" }, { e: "🍊", w: "orange" }, { e: "🦦", w: "otter" },
           { e: "💡", w: "on" }, { e: "🔌", w: "off" }],
    words: [
      { word: "dog", emoji: "🐶", parts: ["d", "o", "g"] },
      { word: "pot", emoji: "🍲", parts: ["p", "o", "t"] },
      { word: "box", emoji: "📦", parts: ["b", "o", "x"] },
      { word: "hot", emoji: "🥵", parts: ["h", "o", "t"] }
    ]
  },

  p: {
    letter: "p", emoji: "🐷", keyword: "pig",
    story: {
      title: "Playful Parrots Party",
      lines: [
        "The *playful* *parrots* are having a *party*,\nthey *put* on their hats and they sing loud and hearty.",
        "A *pink* little *pig* comes along to the door,\nshe brings her own *pillow* to sit on the floor.",
        "\"*Please*, can I come in?\" asks the *pig* with a grin,\n\"Yes, yes!\" squawk the *parrots*. \"Come in, come in!\"",
        "Then *Police* Officer *Pete* comes along with a smile,\nwith a big red balloon — he will stay for a while.",
        "But *pop*! goes the balloon with a very loud bang,\nthe *parrots* jump up and the *pig* says, \"Ka-*pang*!\"",
        "They *play* lots of games and they dance round and round,\nthe *pig* and the *parrots* all *prance* on the ground.",
        "They eat *pizza* and *pears* and *popcorn* and *pie*,\nthey eat and they eat till the moon's in the sky.",
        "The *pig* is so sleepy, she *puts* down her head,\non her *pillow* — *perfect*! — the *party's* *put* to bed."
      ],
      scenes: [
        ["🦜", "🎉", "🦜"],
        ["🐷", "pillow"],
        ["🐷", "🦜"],
        ["👮", "🎈"],
        ["🎈", "💥"],
        ["🦜", "🐷", "🎉"],
        ["🍐", "🐷"],
        ["🐷", "pillow", "💤"]
      ]
    },
    pics: [{ e: "🐷", w: "pig" }, { e: "pillow", w: "pillow" }, { e: "👮", w: "police" },
           { e: "🦜", w: "parrot" }, { e: "🖊️", w: "pen" }],
    words: [
      { word: "pig", emoji: "🐷", parts: ["p", "i", "g"] },
      { word: "pan", emoji: "🍳", parts: ["p", "a", "n"] },
      { word: "pen", emoji: "🖊️", parts: ["p", "e", "n"] },
      { word: "pot", emoji: "🍲", parts: ["p", "o", "t"] }
    ]
  },

  q: {
    letter: "qu", emoji: "👸", keyword: "queen",
    story: {
      title: "Quail Questioning Queens",
      lines: [
        "A *quaint* little *quail* and two *queens* in a hall,\none *quail* who is small and two *queens* who are tall.",
        "The *quail* asks a *question*: \"Oh, where can it be?\nWhere is my *quilt*? Has anyone seen it for me?\"",
        "The *queens* are both reading. \"Shh! Shh! Be *quiet*!\nWe're reading our books — just sit down and try it!\"",
        "The *quail* is so *quiet*, but sad as can be,\nshe wants her warm *quilt* for her bed, you see.",
        "She asks once again, very *quietly* — please?\n\"Where is my *quilt*, dear *queens*, if you please?\"",
        "The *queens* put their books down and look *quickly* around,\nunder the bed and all over the ground.",
        "They find the warm *quilt* on the *queen's* royal bed,\n\"Here it is, little *quail*!\" the kind *queens* said.",
        "\"*Quick*, *quail*, go to sleep!\" — and she's snug as can be,\nas *quiet* as *quiet*, as *quiet* — you'll see!"
      ],
      scenes: [
        ["quail", "👸", "👸"],
        ["quail", "❓"],
        ["👸", "🤫"],
        ["quail", "😔"],
        ["quail", "❓"],
        ["👸", "🛏️"],
        ["👸", "quilt"],
        ["quail", "quilt", "💤"]
      ]
    },
    pics: [{ e: "👸", w: "queen" }, { e: "quail", w: "quail" }, { e: "❓", w: "question" },
           { e: "quilt", w: "quilt" }, { e: "🤫", w: "quietly" }],
    words: [
      { word: "quiz", emoji: "❓", parts: ["qu", "i", "z"] },
      { word: "quit", emoji: "🛑", parts: ["qu", "i", "t"] },
      { word: "quack", emoji: "🦆", parts: ["qu", "a", "ck"] }
    ]
  },

  r: {
    letter: "r", emoji: "🐇", keyword: "rabbit",
    story: {
      title: "Rabbits Racing Rhinos",
      lines: [
        "Two *rabbits* say, \"Let's have a *race* with a *rhino*!\"\nThe *rhino* says, \"Yes! I'm the fastest I know!\"",
        "\"*Ready*, steady, go!\" and away they all *run*,\n*running* and *racing* — oh, isn't this fun?",
        "The *rabbits* are fast and they hop through the grass,\nthe *rhino* is *really* slow — they *race* *right* past!",
        "The *rhino* gets *angry*, he stamps on the ground,\n\"Wait for me! Wait for me!\" he *roars* all around.",
        "Then *rolling* along comes a *robot* of tin,\n\"Can I *race* too? I *really* want to win!\"",
        "Whoosh! goes the *robot* — it flies like a *rocket*,\nso fast that the *rabbits* can't even stop it!",
        "But the *robot* runs out of power — oh dear!\nThe *rabbit* wins a *ring* — a *ring* — let's give a big cheer!",
        "The *rhino* is happy, not *angry* at all,\nthey *rest* in the *rain* — *rabbits*, *rhino* and all."
      ],
      scenes: [
        ["🐇", "🦏", "🐇"],
        ["🐇", "💨", "🦏"],
        ["🐇", "🦏"],
        ["🦏", "😠"],
        ["🤖", "🐇"],
        ["🚀", "🤖"],
        ["🐇", "💍"],
        ["🦏", "🐇", "🌧️"]
      ]
    },
    pics: [{ e: "💍", w: "ring" }, { e: "🤖", w: "robot" }, { e: "🖍️", w: "red" },
           { e: "🚀", w: "rocket" }, { e: "🐇", w: "rabbit" }],
    words: [
      { word: "rat", emoji: "🐀", parts: ["r", "a", "t"] },
      { word: "red", emoji: "🖍️", parts: ["r", "e", "d"] },
      { word: "run", emoji: "🏃", parts: ["r", "u", "n"] },
      { word: "rug", emoji: "rug", parts: ["r", "u", "g"] }
    ]
  },

  s: {
    letter: "s", emoji: "🐌", keyword: "snail",
    story: {
      title: "Silly Snails Singing Songs",
      lines: [
        "*Silly* *snails* *sing* *songs* all day long,\n*slowly*, *slowly*, they *sing* their *song*.",
        "The *sun* comes up and it's warm and bright,\n*seven* *snails* *sing* with all their might.",
        "They *sing* very loud — La la la la LA!\nYou can hear them *sing* from near and far.",
        "A *snake* *slides* by on the *sand* — *sss*, *sss*,\n\"*Stop*! You're *so* loud! What a *noisy* mess!\"",
        "\"*Sorry*!\" *say* the *snails*, and they hang down their heads,\nthey feel *sad* and *small* in their little *shell* beds.",
        "So they *sing* very *softly*, *so* *sweet* and *so* low,\nthe *snake* *smiles* a *smile* — \"Now that's lovely, you know!\"",
        "The *snake* *sings* along with a *hiss* and a *sway*,\nwhat a *silly* old *snake* — *singing* all day!",
        "*Soon* the *sun* *sets* and goes down to bed,\nthe *snails* go to *sleep* — *shh*, *sleepy* head!"
      ],
      scenes: [
        ["🐌", "🎵", "🐌"],
        ["☀️", "🐌", "7️⃣"],
        ["🐌", "🔊"],
        ["🐍", "🐌"],
        ["😔", "🐌"],
        ["🐌", "🐍", "🙂"],
        ["🐍", "🎵"],
        ["🌇", "🐌", "💤"]
      ]
    },
    pics: [{ e: "☀️", w: "sun" }, { e: "🐍", w: "snake" }, { e: "🧦", w: "socks" },
           { e: "7️⃣", w: "seven" }, { e: "🐌", w: "snail" }],
    words: [
      { word: "sun", emoji: "☀️", parts: ["s", "u", "n"] },
      { word: "sit", emoji: "🪑", parts: ["s", "i", "t"] },
      { word: "sad", emoji: "😢", parts: ["s", "a", "d"] },
      { word: "sock", emoji: "🧦", parts: ["s", "o", "ck"] }
    ]
  },

  t: {
    letter: "t", emoji: "🐢", keyword: "turtle",
    story: {
      title: "Two Turtles Talking",
      lines: [
        "*Two* *turtles* are *talking* beside a big *tree*,\n*talking* and *talking* — oh, what can it be?",
        "\"Let's *take* a *trip*!\" says *Tom* with a grin,\n\"Let's ride on a *train*! Come on, jump in!\"",
        "*Toot*-*toot*! goes the *train* as it rolls down the *track*,\nthe *turtles* wave *to* us — they'll soon be back.",
        "They see a *tall* *tree* and a *tiny* house *too*,\na *tent* and a *tower* and a *town* that is new.",
        "The *turtles* are *tired*, they yawn and they sigh,\nthey *take* a short nap as the *train* rattles by.",
        "*Tick*-*tock* goes the clock — it's *time* to wake up!\n*Ten* o'clock! *Ten* o'clock! *Time* for a cup!",
        "They eat red *tomatoes* and drink lots of *tea*,\n\"How *tasty*!\" say *two* *turtles*. \"Just right for me!\"",
        "*Two* happy *turtles* go home on the *train*,\n*talking* and *talking* — they'll *travel* again!"
      ],
      scenes: [
        ["🐢", "💬", "🐢"],
        ["🐢", "🚂"],
        ["🚂", "💨"],
        ["🌳", "🏠"],
        ["🐢", "😴"],
        ["⏰", "🐢"],
        ["🐢", "🍅", "🐢"],
        ["🐢", "💬", "🐢"]
      ]
    },
    pics: [{ e: "🐢", w: "turtle" }, { e: "🚂", w: "train" }, { e: "2️⃣", w: "two" },
           { e: "😴", w: "tired" }, { e: "🌳", w: "tree" }],
    words: [
      { word: "top", emoji: "🔝", parts: ["t", "o", "p"] },
      { word: "tap", emoji: "🚰", parts: ["t", "a", "p"] },
      { word: "ten", emoji: "🔟", parts: ["t", "e", "n"] },
      { word: "tub", emoji: "tub", parts: ["t", "u", "b"] }
    ]
  },

  u: {
    letter: "u", emoji: "☂️", keyword: "umbrella",
    story: {
      title: "Unicorns Under Umbrellas",
      lines: [
        "Two unicorns stand in the rain, side by side,\n*under* *umbrellas* — they're keeping dry inside.",
        "*Uncle* *Umar* walks *up*, *up* the hill,\nwith a big purple *umbrella*, *up*hill still.",
        "A *duck* waddles over — \"Oh, *under* there, please?\nMay I come *under*? I'm wet to my knees!\"",
        "\"Of course!\" says his *uncle*, and *under* she *runs*,\nas *snug* as a *bug* — oh, *under*'s such *fun*!",
        "\"*Up*, *up*!\" says *Uncle*. The rain goes away,\nthe clouds roll on by — it's a *sunny* day!",
        "The *sun* comes out and it's warm on the land,\n*Uncle* is hot — he can hardly stand!",
        "But oh, what is this? His *underwear's* wet!\n\"*Ugh*!\" *Uncle* says. \"What a mess to get!\"",
        "He hangs *up* his *underwear* *up* in the *sun*,\nand everyone laughs — *up*, *up*! What *fun*!"
      ],
      scenes: [
        ["🦄", "☂️", "🦄"],
        ["🧔", "☂️", "⛰️"],
        ["🦆", "☂️"],
        ["🧔", "🦆"],
        ["🧔", "⬆️"],
        ["☀️", "🧔"],
        ["🩲", "💧"],
        ["🩲", "☀️", "🧔"]
      ]
    },
    pics: [{ e: "☂️", w: "umbrella" }, { e: "🧔", w: "uncle" }, { e: "⬆️", w: "up" },
           { e: "🩲", w: "underwear" }, { e: "🚌", w: "bus" }],
    words: [
      { word: "sun", emoji: "☀️", parts: ["s", "u", "n"] },
      { word: "bug", emoji: "🪲", parts: ["b", "u", "g"] },
      { word: "cup", emoji: "☕", parts: ["c", "u", "p"] },
      { word: "bus", emoji: "🚌", parts: ["b", "u", "s"] }
    ]
  },

  v: {
    letter: "v", emoji: "🚐", keyword: "van",
    story: {
      title: "Volcanos Vomiting Vegetables",
      lines: [
        "Look at the *volcano*! It rumbles and shakes,\nit grumbles and rumbles — the whole ground quakes!",
        "BANG! goes the *volcano* — oh, what can it be?\nIt's *vomiting* *vegetables*! Carrots — wheee!",
        "*Vicky* sees it and runs to her *van*,\n\"I'll get those *vegetables* as fast as I can!\"",
        "*Vroom*, *vroom*! goes the *van* down the hill,\n*Vicky* drives *very* fast — what a *very* big thrill!",
        "She picks up the *vegetables* one by one,\ncarrots and broccoli — oh, this is fun!",
        "She puts them all into a tall flower *vase*,\nwith a *very* big smile on her *very* happy face.",
        "Then *Vicky* takes out her *violin* to play,\nshe plays a sweet tune at the end of the day.",
        "The *volcano* is quiet, it's sleepy and still,\n*very* good, *volcano* — now sleep on the hill!"
      ],
      scenes: [
        ["🌋"],
        ["🌋", "🥕", "🥦"],
        ["👩", "🚐"],
        ["🚐", "💨"],
        ["👩", "🥕", "🥦"],
        ["vase", "🥕"],
        ["👩", "🎻"],
        ["🌋", "😄"]
      ]
    },
    pics: [{ e: "🚐", w: "van" }, { e: "vase", w: "vase" }, { e: "🎻", w: "violin" },
           { e: "🥦", w: "vegetables" }, { e: "🌋", w: "volcano" }],
    words: [
      { word: "van", emoji: "🚐", parts: ["v", "a", "n"] },
      { word: "vet", emoji: "🩺", parts: ["v", "e", "t"] },
      { word: "vat", emoji: "🛢️", parts: ["v", "a", "t"] }
    ]
  },

  w: {
    letter: "w", emoji: "⌚", keyword: "watch",
    story: {
      title: "Wet Whales Waving",
      lines: [
        "Two *wet* *whales* are *waving* out in the sea,\n*waving* their tails at you and at me.",
        "The *weather* is *windy*, the *waves* are so high,\nthey splash and they crash *way* up to the sky.",
        "*Will* stands on the beach and he *waves* back — hello!\n\"*Wave*, *whales*, *wave*! Before you go!\"",
        "Then splash! goes a *wave* — *whoosh*, over his head,\nnow *Will* is all *wet* from his toes to his head!",
        "*Will* looks at his *watch* — it's dripping and *wet*,\nthe *wettest* *watch* that you ever have met!",
        "He runs home and puts all his *wet* clothes *away*,\nin the *wardrobe* to dry for another day.",
        "Then *Will* has some *watermelon*, juicy and red,\n\"*Wow*! *What* a treat!\" happy *Will* said.",
        "At night by the *window*, *Will* looks at the sea,\nthe *whales* *wave* goodnight — goodnight, *whales*, from me!"
      ],
      scenes: [
        ["🐳", "👋", "🐳"],
        ["⛅", "🌊"],
        ["👦", "👋", "🐳"],
        ["🌊", "👦", "💦"],
        ["👦", "⌚"],
        ["wardrobe", "👕"],
        ["👦", "🍉"],
        ["🌙", "🐳", "🌊"]
      ]
    },
    pics: [{ e: "⌚", w: "watch" }, { e: "🍉", w: "watermelon" }, { e: "⛅", w: "weather" },
           { e: "wardrobe", w: "wardrobe" }, { e: "🕸️", w: "web" }],
    words: [
      { word: "wet", emoji: "💧", parts: ["w", "e", "t"] },
      { word: "win", emoji: "🏆", parts: ["w", "i", "n"] },
      { word: "wig", emoji: "💇", parts: ["w", "i", "g"] },
      { word: "web", emoji: "🕸️", parts: ["w", "e", "b"] }
    ]
  },

  x: {
    letter: "x", emoji: "📦", keyword: "box",
    findPrompt: "Find the pictures with x in them",
    story: {
      title: "X-rayed Xs",
      lines: [
        "The doctor holds up an *x-ray* to see,\n\"Let's look at this picture — what can it be?\"",
        "It isn't a bone, it isn't a toe,\nit's a big letter *X*! — Oh, now we know!",
        "In comes *Max* the *fox* with a big brown *box*,\nhe carries it in — knock, knock, knock on the *box*!",
        "\"What's in the *box*, *Max*?\" the doctor asks him,\n*Max* gives a smile and a very big grin.",
        "He opens the *box* and what does he see?\n*Six* yellow *taxis*! One, two, three...",
        "But one little *taxi* won't go — oh no!\nIt's broken, it's broken, it just won't go!",
        "*Max* the *fox* gets his tools from his *box*,\nhe *fixes* the *taxi* with taps and knocks.",
        "Beep! Beep! Now all *six* *taxis* can go,\n*Max* the *fox* is happy — *fixed*! Bravo!"
      ],
      scenes: [
        ["🩺", "🩻"],
        ["🩻", "❌"],
        ["🦊", "📦"],
        ["🦊", "📦", "❓"],
        ["📦", "6️⃣", "🚕"],
        ["🚕", "😔"],
        ["🦊", "🔧", "🚕"],
        ["🚕", "6️⃣", "🦊"]
      ]
    },
    pics: [{ e: "📦", w: "box" }, { e: "🦊", w: "fox" }, { e: "6️⃣", w: "six" },
           { e: "16", w: "sixteen" }, { e: "🚕", w: "taxi" }],
    words: [
      { word: "fox", emoji: "🦊", parts: ["f", "o", "x"] },
      { word: "box", emoji: "📦", parts: ["b", "o", "x"] },
      { word: "six", emoji: "6️⃣", parts: ["s", "i", "x"] },
      { word: "fix", emoji: "🔧", parts: ["f", "i", "x"] }
    ]
  },

  y: {
    letter: "y", emoji: "🪀", keyword: "yo-yo",
    story: {
      title: "Yaks Yelling Yes",
      lines: [
        "Some *yaks* on a hill are *yelling* out loud,\n\"*Yes*! *Yes*! *Yes*!\" — what a noisy crowd!",
        "Why are they *yelling*? Oh, now we see —\n*Yusuf* has a *yo-yo* as *yellow* as can be!",
        "Up goes the *yo-yo* and down it comes too,\nthe *yaks* love to watch it — and so would you!",
        "\"Can we play too?\" ask the *yaks* in a row,\n\"*Yes*!\" says *Yusuf*. \"Here, have a go!\"",
        "Then it's lunchtime — the *yaks* eat *yoghurt* — *yum*!\n*Yummy* *yoghurt* fills up each *yak* tum!",
        "Grandma comes up with some *yellow* *yarn*,\nso soft and so fluffy — it keeps you warm!",
        "She knits and she knits — click, click, click, click,\na *yellow* hat for each *yak* — so quick!",
        "The *yaks* *yell* \"*Yes*! *Yippee*! Hooray!\"\nWhat a *yummy*, *yellow*, *yes*-*yes* day!"
      ],
      scenes: [
        ["🐂", "✅", "🐂"],
        ["👦", "🪀"],
        ["🪀", "🐂"],
        ["🐂", "👦"],
        ["🐂", "🥣"],
        ["👵", "🧶"],
        ["👵", "🧶", "🐂"],
        ["🐂", "🎉", "🐂"]
      ]
    },
    pics: [{ e: "🪀", w: "yo-yo" }, { e: "yellow", w: "yellow" }, { e: "🥣", w: "yoghurt" },
           { e: "✅", w: "yes" }, { e: "🧶", w: "yarn" }],
    words: [
      { word: "yes", emoji: "✅", parts: ["y", "e", "s"] },
      { word: "yak", emoji: "🐂", parts: ["y", "a", "k"] },
      { word: "yum", emoji: "😋", parts: ["y", "u", "m"] }
    ]
  },

  z: {
    letter: "z", emoji: "🦓", keyword: "zebra",
    story: {
      title: "Zombie Zebras",
      lines: [
        "At the *zoo* live some *zebras*, black and white,\nthey're *zombie* *zebras* — but they don't bite!",
        "They aren't scary, they're funny and sweet,\nthey dance and they wiggle their *zombie* feet.",
        "They walk in a *zigzag*, *zig*, *zag*, *zig*,\na *zigzag* walk and a *zigzag* jig!",
        "One *zebra* has a coat with a *zipper* so long,\nhe *zips* it and sings a *zippy* *zip* song.",
        "*Zip*! goes the *zipper* — up to his chin,\nnow he's cosy and warm and snug within.",
        "A bee *zooms* by with a *buzz* and a *zing*,\n\"Catch me if you can!\" — and she flaps her wing!",
        "The *zebras* *zoom* after the bee, *zoom*, *zoom*,\nthey *zoom* round the *zoo* — there's hardly room!",
        "At night the *zebras* lie down in a heap,\n*zzzzz* goes the *zoo* — the *zebras* are asleep."
      ],
      scenes: [
        ["🧟", "🦓", "🏞️"],
        ["🦓", "😂"],
        ["🦓", "〽️"],
        ["🦓", "zipper"],
        ["🦓", "zipper"],
        ["🐝", "🦓"],
        ["🦓", "💨", "🐝"],
        ["🦓", "💤"]
      ]
    },
    pics: [{ e: "🦓", w: "zebra" }, { e: "🏞️", w: "zoo" }, { e: "zipper", w: "zipper" },
           { e: "〽️", w: "zigzag" }, { e: "🧟", w: "zombie" }],
    words: [
      { word: "zip", emoji: "zipper", parts: ["z", "i", "p"] },
      { word: "zap", emoji: "⚡", parts: ["z", "a", "p"] },
      { word: "buzz", emoji: "🐝", parts: ["b", "u", "zz"] }
    ]
  },

  ch: {
    letter: "ch", emoji: "⛪", keyword: "church",
    findPrompt: "Find the pictures with ch in them",
    story: {
      title: "Children Eating Lunch",
      lines: [
        "It's *lunchtime* at school, the bell goes — ding!\nThe *children* are hungry — they *chatter* and sing.",
        "*Charlie* has *cheese* and a bag full of *chips*,\n*chomp*, *chomp*, *chomp*! — he licks his lips.",
        "*Chloe* has *chicken* and *cherries* so red,\n\"*Cherries* are yummy!\" *Chloe* said.",
        "They *chat* and they *chat* on a little brown *chair*,\n*chatting* and *munching* without a care.",
        "After their *lunch*, they walk down the street,\nto the old village *church* on their little feet.",
        "A dog on a *chain* is *chasing* his tail,\nround and round — like a dog in a gale!",
        "\"Woof!\" says the dog, and the *children* all *chuckle*,\nthey laugh so much that their knees start to buckle!",
        "*Charlie* gives *cheese* to the dog — *munch*, *munch*!\n\"*Cheers*!\" say the *children*. \"Now that's a good *lunch*!\""
      ],
      scenes: [
        ["👫", "🍱"],
        ["👦", "🧀", "🍟"],
        ["👧", "🍒"],
        ["👫", "🪑"],
        ["⛪", "👫"],
        ["🐶", "⛓️"],
        ["🐶", "😂", "👫"],
        ["👦", "🧀", "🐶"]
      ]
    },
    pics: [{ e: "👫", w: "children" }, { e: "⛪", w: "church" }, { e: "⛓️", w: "chain" },
           { e: "🍱", w: "lunch" }, { e: "🧀", w: "cheese" }],
    words: [
      { word: "chip", emoji: "🍟", parts: ["ch", "i", "p"] },
      { word: "chin", emoji: "😀", parts: ["ch", "i", "n"] },
      { word: "chop", emoji: "🪓", parts: ["ch", "o", "p"] },
      { word: "lunch", emoji: "🍱", parts: ["l", "u", "n", "ch"] }
    ]
  },

  sh: {
    letter: "sh", emoji: "👟", keyword: "shoes",
    findPrompt: "Find the pictures with sh in them",
    story: {
      title: "A Fish in My Shoe",
      lines: [
        "I go to put on my *shoes* — and *splash*!\nSomething is in there! It moves in a *flash*!",
        "I look inside and what do I see?\nA *fish* in my *shoe*, looking up at me!",
        "\"*Shoo*, *fish*, *shoo*!\" I *shout* with a *shake*,\nI *shake* my *shoe* — *shake*, *shake*, *shake*!",
        "The *fish* jumps out with a flip and a twirl,\nit lands on my *shoulder* — oh, what a whirl!",
        "\"*Shhh*,\" says the *fish*. \"Please don't *shout*,\nI was only playing — I'll soon get out!\"",
        "It hides by my *sharpener*, as still as can be,\n\"*Shh*! I'm hiding — you *shall* not find me!\"",
        "I fill up a *dish* with water so cool,\n*splish*! *splash*! — now the *fish* has a pool!",
        "Now the *fish* is happy and *shiny* and new,\nand I *wash* out my wet, *fishy* *shoe*!"
      ],
      scenes: [
        ["👦", "👟"],
        ["👟", "🐟"],
        ["👦", "👟"],
        ["shoulders", "🐟"],
        ["🐟", "🤫"],
        ["sharpener", "✏️", "🐟"],
        ["🐟", "💦"],
        ["🐟", "😄", "👟"]
      ]
    },
    pics: [{ e: "👟", w: "shoes" }, { e: "shoulders", w: "shoulders" },
           { e: "sharpener", w: "sharpener" }, { e: "🐟", w: "fish" }, { e: "🚢", w: "ship" }],
    words: [
      { word: "ship", emoji: "🚢", parts: ["sh", "i", "p"] },
      { word: "shop", emoji: "🏪", parts: ["sh", "o", "p"] },
      { word: "fish", emoji: "🐟", parts: ["f", "i", "sh"] },
      { word: "shed", emoji: "🛖", parts: ["sh", "e", "d"] }
    ]
  },

  th: {
    letter: "th", emoji: "🦷", keyword: "teeth",
    findPrompt: "Find the pictures with th in them",
    story: {
      title: "I Have Three Teeth",
      lines: [
        "*This* is *Theo*, he's happy, you see,\nhe has *three* little *teeth* — one, two, *three*!",
        "He brushes his *teeth* every morning and night,\nbrush, brush, brush — till they're shiny and white.",
        "Clean *teeth* are good for your *health*, it is true,\nso brush, brush, brush — and you'll be healthy too!",
        "*Theo* eats veggies and fruit every day,\nhe has lots of *strength* — he can lift it — hooray!",
        "But *the* *weather* is rainy, it's grey and it's wet,\n*Theo* looks out — it's the rainiest yet!",
        "\"*That's* OK!\" *Theo* says. \"I like *the* rain!\nI'll go out and play in *the* puddles again!\"",
        "He jumps in *the* puddles — splish, splash, hooray!\n*Thumbs* up from *Theo* — it's a *thrilling* day!",
        "At home *Theo* sits in a warm, bubbly *bath*,\n\"*Thank* you, Mum!\" — and he gives a big laugh!"
      ],
      scenes: [
        ["👦", "3️⃣", "🦷"],
        ["👦", "🪥"],
        ["🦷", "💓"],
        ["🏋️"],
        ["🌧️", "🪟"],
        ["👦", "☂️"],
        ["👦", "💦", "👍"],
        ["🛁", "👦"]
      ]
    },
    pics: [{ e: "3️⃣", w: "three" }, { e: "🦷", w: "teeth" }, { e: "💓", w: "health" },
           { e: "🏋️", w: "strength" }, { e: "👍", w: "thumb" }],
    words: [
      { word: "bath", emoji: "🛁", parts: ["b", "a", "th"] },
      { word: "this", emoji: "👉", parts: ["th", "i", "s"] },
      { word: "path", emoji: "🛤️", parts: ["p", "a", "th"] },
      { word: "thin", emoji: "📏", parts: ["th", "i", "n"] }
    ]
  },

  /* wh is not in the KG3 book — kept from the earlier version as an extra. */
  wh: {
    letter: "wh", emoji: "🐳", keyword: "whale",
    findPrompt: "Find the pictures that start with wh",
    story: {
      title: "The Whale Who Whistled",
      lines: [
        "A big blue *whale* in the deep blue sea,\nswims *where* the water is as deep as can be.",
        "*Whoosh*! goes the water right out of his back,\nup to the sky — then it splashes right back!",
        "The *whale* can *whistle* — *whee*, *whee*, *whee*!\nThe happiest *whistle* in all of the sea.",
        "A little fish swims up and asks him, \"*Why*?\n*Why* do you *whistle* so loud and so high?\"",
        "\"*When* I am happy, I *whistle* all day,\nI *whistle* and *whistle* — it's my way to play!\"",
        "\"*What* makes you happy?\" the little fish said,\nswimming around the big *whale's* head.",
        "\"My friends make me happy,\" the *whale* replied,\n\"Friends like you swimming right by my side!\"",
        "Now the little fish *whistles* — *whee*, *whee*, *whee*!\nTwo happy *whistlers* *whistling* in the sea!"
      ],
      scenes: [
        ["🐳", "🌊"],
        ["🐳", "💦"],
        ["🐳", "🎶"],
        ["🐟", "❓"],
        ["🐳", "😄"],
        ["🐟", "❓"],
        ["🐳", "🐟", "❤️"],
        ["🐟", "🎶", "🐳"]
      ]
    },
    pics: [{ e: "🐳", w: "whale" }, { e: "☸️", w: "wheel" }, { e: "😗", w: "whistle" }],
    words: [
      { word: "when", emoji: "⏰", parts: ["wh", "e", "n"] },
      { word: "whip", emoji: "🥄", parts: ["wh", "i", "p"] },
      { word: "whiz", emoji: "💨", parts: ["wh", "i", "z"] }
    ]
  },

  /* ================================================ PART 2: BLENDING SOUNDS */

  ag: {
    kind: "blend", letter: "ag", label: "ag", match: ["ag"],
    emoji: "🎒", keyword: "bag",
    story: {
      title: "A Rag in the Bag",
      lines: [
        "Here is Sam with a *bag* and a *tag*,\nand here is her dog, Pip — his tail goes *wag*!",
        "*Wag*, *wag*, *wag* goes Pip's happy tail,\nhe *wags* in the sun and he *wags* in the gale.",
        "Pip finds a *rag*, an old dirty *rag*,\nhe sniffs it and sniffs it — and his tail starts to *wag*.",
        "Then into the *bag* goes the dirty old *rag*!\nA *rag* in the *bag*! Oh, what a *drag*!",
        "Sam looks in her *bag* and she starts to *brag*:\n\"Look what I found — it's a *rag* in my *bag*!\"",
        "She pulls out the *rag* and poor Pip looks sad,\nhis tail doesn't *wag* — oh, that's really bad.",
        "Then Sam has an idea and she makes a *flag*,\na bright red *flag* from the dirty old *rag*!",
        "Pip holds the *flag* and his tail starts to *wag*,\n*wag*, *wag*, *wag* — a dog with a *flag*!"
      ],
      scenes: [
        ["👧", "🎒", "🏷️"],
        ["🐕", "👧"],
        ["🐕", "rag"],
        ["🐕", "rag", "🎒"],
        ["👧", "🎒", "rag"],
        ["👧", "rag", "🐕"],
        ["👧", "🚩"],
        ["🐕", "🚩"]
      ]
    },
    pics: [{ e: "🎒", w: "bag" }, { e: "🏷️", w: "tag" }, { e: "🐕", w: "wag" },
           { e: "rag", w: "rag" }, { e: "🚩", w: "flag" }],
    words: [
      { word: "bag", emoji: "🎒", parts: ["b", "ag"] },
      { word: "tag", emoji: "🏷️", parts: ["t", "ag"] },
      { word: "wag", emoji: "🐕", parts: ["w", "ag"] },
      { word: "rag", emoji: "rag", parts: ["r", "ag"] }
    ]
  },

  am: {
    kind: "blend", letter: "am", label: "am", match: ["am"],
    emoji: "🍓", keyword: "jam",
    story: {
      title: "Jam on the Ham",
      lines: [
        "This is *Sam*, and *Sam* likes *jam*,\nand *Sam* likes *ham* — yes, that is *Sam*!",
        "For lunch he has *jam* and a big slice of *ham*,\n\"Yum, yum!\" says *Sam*. \"What a lucky boy I *am*!\"",
        "But oops! The *jam* falls down — *wham*, *bam*!\nNow there is *jam*, sticky *jam*, on the *ham*!",
        "*Sam* takes his *ham* for a walk to the *dam*,\nwith *jam* on the *ham* — what a funny *Sam*!",
        "Look! On the *dam* there's a big woolly *ram*,\na *ram* on the *dam*! — \"Hello!\" says *Sam*.",
        "The *ram* is so hungry, he looks at the *ham*,\n\"Please may I have some?\" says the hungry *ram*.",
        "\"Of course!\" says kind *Sam*. \"Have *jam* on your *ham*!\"\nAnd he gives the whole lunch to the hungry *ram*.",
        "The *ram* eats it up — *jam* on *ham*, yum!\nNow there's a happy *ram* on the *dam* with *Sam*!"
      ],
      scenes: [
        ["👦", "🍓"],
        ["👦", "🍓", "🍖"],
        ["🍖", "🍓"],
        ["👦", "🍖", "dam"],
        ["🐏", "dam"],
        ["🐏", "🍖"],
        ["👦", "🍖", "🐏"],
        ["🐏", "😄", "dam"]
      ]
    },
    pics: [{ e: "🍓", w: "jam" }, { e: "🍖", w: "ham" }, { e: "🐏", w: "ram" },
           { e: "dam", w: "dam" }],
    words: [
      { word: "jam", emoji: "🍓", parts: ["j", "am"] },
      { word: "ham", emoji: "🍖", parts: ["h", "am"] },
      { word: "ram", emoji: "🐏", parts: ["r", "am"] },
      { word: "dam", emoji: "dam", parts: ["d", "am"] }
    ]
  },

  an: {
    kind: "blend", letter: "an", label: "an", match: ["an"],
    emoji: "🚐", keyword: "van",
    story: {
      title: "A Man in a Van",
      lines: [
        "Here is a *man* — his name is *Dan*,\n*Dan* the *man* has a big white *van*.",
        "*Dan* the *man* is in his *van*,\na *man* in a *van* — catch him if you *can*!",
        "Inside the *van* there's a *can* and a *fan*,\na tin *can* and a *fan* for *Dan* the *man*.",
        "It's hot, so hot — as hot as a *pan*!\nSo *Dan* turns on his little *fan*.",
        "He puts the *can* on top of the *fan*,\na *can* on a *fan* — that's the *plan*!",
        "Now *Dan* is hungry, he gets out a *pan*,\n\"I'll cook up some lunch, as fast as I *can*!\"",
        "He opens the *can* and he cooks in the *pan*,\nsizzle, sizzle — yum! Says *Dan* the *man*.",
        "\"I *can* cook!\" says *Dan* — what a happy *man*!\nAnd off he drives in his big white *van*."
      ],
      scenes: [
        ["👨", "🚐"],
        ["👨", "🚐"],
        ["🚐", "🥫", "fan"],
        ["fan", "☀️"],
        ["fan", "🥫"],
        ["👨", "🍳"],
        ["🥫", "🍳"],
        ["👨", "🚐", "💨"]
      ]
    },
    pics: [{ e: "👨", w: "man" }, { e: "🚐", w: "van" }, { e: "🥫", w: "can" },
           { e: "fan", w: "fan" }, { e: "🍳", w: "pan" }],
    words: [
      { word: "man", emoji: "👨", parts: ["m", "an"] },
      { word: "van", emoji: "🚐", parts: ["v", "an"] },
      { word: "can", emoji: "🥫", parts: ["c", "an"] },
      { word: "fan", emoji: "fan", parts: ["f", "an"] },
      { word: "pan", emoji: "🍳", parts: ["p", "an"] }
    ]
  },

  ap: {
    kind: "blend", letter: "ap", label: "ap", match: ["ap"],
    emoji: "🧢", keyword: "cap",
    story: {
      title: "A Cap on a Tap",
      lines: [
        "I sit on a chair with a *map* on my *lap*,\na *map* on my *lap* — and I *clap*, *clap*, *clap*!",
        "The *map* shows the way to the park and the sea,\nI follow the *map* — come along with me!",
        "But where is my *cap*? I can't find my *cap*!\nIt's not on my head and it's not on my *lap*!",
        "I look in the kitchen and — there, by the *tap*!\nMy *cap* is on the *tap*! A *cap* on a *tap*!",
        "I put on my *cap* and my cat wants a *nap*,\nshe jumps up and curls up asleep on my *lap*.",
        "*Tap*, *tap* goes her tail as she sleeps in my *lap*,\nshe dreams little dreams in her little cat *nap*.",
        "She wakes with a yawn and a stretch and a *snap*,\nwe go to the park with my *cap* and my *map*!",
        "We find the park! Hooray! *Clap*, *clap*, *clap*!\nThank you, thank you, my good little *map*!"
      ],
      scenes: [
        ["lap", "🗺️"],
        ["🗺️", "🏞️"],
        ["👦", "❓"],
        ["🚰", "🧢"],
        ["🧢", "🐱"],
        ["🐱", "lap", "💤"],
        ["🐱", "🗺️", "🏞️"],
        ["👦", "🏞️", "🎉"]
      ]
    },
    pics: [{ e: "🧢", w: "cap" }, { e: "🚰", w: "tap" }, { e: "🗺️", w: "map" },
           { e: "lap", w: "lap" }],
    words: [
      { word: "cap", emoji: "🧢", parts: ["c", "ap"] },
      { word: "tap", emoji: "🚰", parts: ["t", "ap"] },
      { word: "map", emoji: "🗺️", parts: ["m", "ap"] },
      { word: "lap", emoji: "lap", parts: ["l", "ap"] }
    ]
  },

  at: {
    kind: "blend", letter: "at", label: "at", match: ["at"],
    emoji: "🐱", keyword: "cat",
    story: {
      title: "A Cat on a Mat",
      lines: [
        "Here is a *cat* — a big, *fat* *cat*,\nshe sits on a *mat* — just like *that*!",
        "A *fat* *cat* sits on a *mat*,\nshe likes to sit there and *chat*, *chat*, *chat*.",
        "Here is a *rat* in a big black *hat*,\na *rat* in a *hat* — imagine *that*!",
        "The *cat* sees the *rat* in the big black *hat*,\n\"I want *that* *rat*!\" says the *fat* *cat*.",
        "*Pat*, *pat*, *pat* go the feet of the *cat*,\nshe creeps and she creeps, then she jumps — *splat*!",
        "*Splat*! She falls off the edge of the *mat*,\nshe lands on her back — oh, silly *cat*!",
        "A *bat* flies by and he laughs at the *cat*,\n\"Ha, ha!\" says the *bat*. \"Oh, look at *that*!\"",
        "The *rat* stays in the big black *hat*,\n\"*That* was fun!\" says the *rat*. — And *that* is *that*!"
      ],
      scenes: [
        ["🐱"],
        ["🐱", "mat"],
        ["🐀", "🎩"],
        ["🐱", "🐀"],
        ["🐱", "👣"],
        ["🐱", "💥", "mat"],
        ["🦇", "🐱"],
        ["🐀", "🎩", "😄"]
      ]
    },
    pics: [{ e: "🐱", w: "cat" }, { e: "mat", w: "mat" }, { e: "🐀", w: "rat" },
           { e: "🎩", w: "hat" }, { e: "🦇", w: "bat" }],
    words: [
      { word: "cat", emoji: "🐱", parts: ["c", "at"] },
      { word: "mat", emoji: "mat", parts: ["m", "at"] },
      { word: "rat", emoji: "🐀", parts: ["r", "at"] },
      { word: "hat", emoji: "🎩", parts: ["h", "at"] },
      { word: "bat", emoji: "🦇", parts: ["b", "at"] }
    ]
  },

  ar: {
    kind: "blend", letter: "ar", label: "ar", match: ["ar"],
    emoji: "🚗", keyword: "car",
    story: {
      title: "A Star in a Car",
      lines: [
        "Look up in the sky — there's a little *star*,\nshining and twinkling so bright and so *far*.",
        "The *star* floats down and gets in a *car*,\na *star* in a *car*! — Beep, beep! Off they *are*!",
        "It's the month of *March*, and the *car* goes *far*,\n*far*, *far* away drives the little *star*.",
        "The *star* sees a *farm* and a *park* and a *barn*,\nand sheep in the field with their soft woolly *yarn*.",
        "In the *park* there is *art* — oh, what *art* to see!\nThe *star* looks and looks — \"Can I paint? Let me!\"",
        "The *star* gets a brush and it paints a red *car*,\nwhat *smart* *art* from a little *star*!",
        "It puts the paint back in a little glass *jar*,\nand waves to the *park* — \"Goodbye!\" says the *star*.",
        "Night comes, and it's *dark* — the *star* goes up *far*,\nand twinkles goodnight — goodnight, little *star*!"
      ],
      scenes: [
        ["⭐", "🌙"],
        ["⭐", "🚗"],
        ["🗓️", "🚗"],
        ["🚗", "🏞️"],
        ["🎨", "⭐", "🌳"],
        ["⭐", "🎨", "🚗"],
        ["⭐", "🫙"],
        ["⭐", "🌙"]
      ]
    },
    pics: [{ e: "🚗", w: "car" }, { e: "⭐", w: "star" }, { e: "🎨", w: "art" },
           { e: "🗓️", w: "March" }, { e: "🫙", w: "jar" }],
    words: [
      { word: "car", emoji: "🚗", parts: ["c", "ar"] },
      { word: "jar", emoji: "🫙", parts: ["j", "ar"] },
      { word: "star", emoji: "⭐", parts: ["s", "t", "ar"] },
      { word: "art", emoji: "🎨", parts: ["ar", "t"] }
    ]
  },

  edeg: {
    kind: "blend", letter: "ed", label: "ed eg", match: ["ed", "eg"],
    emoji: "🛏️", keyword: "bed",
    story: {
      title: "A Leg on the Bed",
      lines: [
        "This is *Ted*, and *Ted* is in *bed*,\nwith a pillow beneath his sleepy head.",
        "But look! His *leg* is out of the *bed*,\na *leg* on the *bed*! — \"Get up!\" Mum said.",
        "His socks are *red*, so bright and *red*,\n*red* socks on the *leg* on the *bed*!",
        "Mum is outside with a *peg* and a *keg*,\nshe hangs up the washing — a sock and a *leg*!",
        "She puts the *peg* on top of the *keg*,\na *peg* on a *keg*! Now stand on one *leg*!",
        "The dog sits up and he starts to *beg*,\nhe wants a treat — he wants an *egg*!",
        "He *begs* and he *begs* by the side of the *bed*,\n\"Woof! Woof! Get up, *Ted*!\" the dog said.",
        "So *Ted* gets up and out of his *bed*,\nhe gives the dog an *egg* — \"Good dog!\" said *Ted*."
      ],
      scenes: [
        ["👦", "🛏️"],
        ["🦵", "🛏️"],
        ["🧦", "🛏️"],
        ["👩", "peg", "🛢️"],
        ["peg", "🛢️"],
        ["🐶"],
        ["🐶", "👦"],
        ["👦", "🥚", "🐶"]
      ]
    },
    pics: [{ e: "🛏️", w: "bed" }, { e: "🖍️", w: "red" }, { e: "🦵", w: "leg" },
           { e: "🛢️", w: "keg" }, { e: "peg", w: "peg" }],
    words: [
      { word: "bed", emoji: "🛏️", parts: ["b", "ed"] },
      { word: "red", emoji: "🖍️", parts: ["r", "ed"] },
      { word: "leg", emoji: "🦵", parts: ["l", "eg"] },
      { word: "keg", emoji: "🛢️", parts: ["k", "eg"] },
      { word: "peg", emoji: "peg", parts: ["p", "eg"] }
    ]
  },

  en: {
    kind: "blend", letter: "en", label: "en", match: ["en"],
    emoji: "🐔", keyword: "hen",
    story: {
      title: "A Hen in a Pen",
      lines: [
        "Here is a *hen* — she lives in a *pen*,\na *hen* in a *pen*, and her name is *Jen*.",
        "*Jen* the *hen* likes her little *pen*,\nshe clucks and she pecks again and again.",
        "Along the road come *ten* tall *men*,\none, two, three ... nine, *ten* — yes, *ten*!",
        "\"Look at that *hen*!\" say the *ten* tall *men*,\n\"What a lovely *hen*! What a lovely *pen*!\"",
        "*Then* the *men* walk into a *den*,\n*ten* *men* in a *den* — oh, *when*, oh *when*...",
        "... *when* will they come out of the dark old *den*?\n\"*When*? Oh *when*?\" clucks *Jen* the *hen*.",
        "She waits and she waits in her little *pen*,\nshe sits down to rest — and *then*, and *then*...",
        "Out come the *men*! And look at *Jen* —\nshe has laid some eggs: one, two... *ten*!"
      ],
      scenes: [
        ["🐔", "pen"],
        ["🐔", "pen"],
        ["👬", "🔟"],
        ["👬", "🐔"],
        ["👬", "den"],
        ["den", "❓"],
        ["🐔", "💤"],
        ["👬", "🐔", "🥚"]
      ]
    },
    pics: [{ e: "🐔", w: "hen" }, { e: "pen", w: "pen" }, { e: "👬", w: "men" },
           { e: "den", w: "den" }, { e: "🔟", w: "ten" }],
    words: [
      { word: "hen", emoji: "🐔", parts: ["h", "en"] },
      { word: "pen", emoji: "pen", parts: ["p", "en"] },
      { word: "men", emoji: "👬", parts: ["m", "en"] },
      { word: "den", emoji: "den", parts: ["d", "en"] },
      { word: "ten", emoji: "🔟", parts: ["t", "en"] }
    ]
  },

  et: {
    kind: "blend", letter: "et", label: "et", match: ["et"],
    emoji: "✈️", keyword: "jet",
    story: {
      title: "A Pet in the Jet",
      lines: [
        "This is *Bet* and her little *pet*,\nthe happiest dog that you ever *met*.",
        "*Bet* and her *pet* go to look at a *jet*,\nthe biggest *jet* that they've seen *yet*!",
        "Oh no! Her *pet* runs into the *jet*!\nA *pet* in the *jet*! — \"Come back!\" calls *Bet*.",
        "Up goes the *jet*, up into the sky,\nup, up, up — so fast and so high!",
        "Then splash! The *jet* lands down in the sea,\n\"Oh where is my *pet*? Where can he be?\"",
        "Her *pet* is swimming — he's *wet*, so *wet*!\nThe *wettest*, *wettest* *pet* — *wet* *pet* *yet*!",
        "*Bet* *gets* her *net* — \"*Get* in, my *pet*!\"\nShe catches him safe in her big fishing *net*.",
        "She takes her *wet* *pet* to visit the *vet*,\nnow he's dry and he's happy — the best *pet* *yet*!"
      ],
      scenes: [
        ["👧", "🐾"],
        ["👧", "✈️"],
        ["✈️", "🐾"],
        ["✈️", "⬆️"],
        ["✈️", "🌊"],
        ["🐾", "💦"],
        ["👧", "🥅", "🐾"],
        ["🐾", "🩺", "😄"]
      ]
    },
    pics: [{ e: "🐾", w: "pet" }, { e: "✈️", w: "jet" }, { e: "🥅", w: "net" },
           { e: "💧", w: "wet" }, { e: "🩺", w: "vet" }],
    words: [
      { word: "pet", emoji: "🐾", parts: ["p", "et"] },
      { word: "jet", emoji: "✈️", parts: ["j", "et"] },
      { word: "net", emoji: "🥅", parts: ["n", "et"] },
      { word: "wet", emoji: "💧", parts: ["w", "et"] },
      { word: "vet", emoji: "🩺", parts: ["v", "et"] }
    ]
  },

  er: {
    kind: "blend", letter: "er", label: "er", match: ["er"],
    findPrompt: "Find the pictures with er at the end",
    emoji: "🧑‍🏫", keyword: "teacher",
    story: {
      title: "A Teacher with a Ruler",
      lines: [
        "This is my *teacher*, Miss *Fern* is her name,\nshe's kind and she's funny — she plays every game.",
        "My *teacher* has a *ruler* that's long and that's straight,\nshe draws lines with her *ruler* — and her lines are great!",
        "She points with her *ruler* at the board on the wall,\n\"Look *here*, my children! Now read it, all!\"",
        "Knock, knock! In comes a girl and *her* *father* too,\nshe's shy and she's little — she's brand new!",
        "*Her* name is *Amber*, she's quiet and small,\nshe holds onto *her* bag by the classroom wall.",
        "*Amber* has a *letter* for my *teacher* to see,\nshe gives it to Miss *Fern*: \"This is for you, from me!\"",
        "My *teacher* reads the *letter* and smiles a big smile,\n\"Welcome, dear *Amber*! Come sit for a while!\"",
        "\"Thank you, dear *teacher*!\" says *her* *father* with cheer,\nand *Amber* is happy — she's glad to be *here*!"
      ],
      scenes: [
        ["🧑‍🏫"],
        ["🧑‍🏫", "📏"],
        ["🧑‍🏫", "📏", "👉"],
        ["👨‍👧"],
        ["👧", "🙂"],
        ["👧", "✉️", "🧑‍🏫"],
        ["🧑‍🏫", "✉️", "🙂"],
        ["👨‍👧", "🧑‍🏫"]
      ]
    },
    pics: [{ e: "🧑‍🏫", w: "teacher" }, { e: "📏", w: "ruler" }, { e: "👨‍👧", w: "father" },
           { e: "✉️", w: "letter" }],
    words: [
      { word: "her", emoji: "👧", parts: ["h", "er"] },
      { word: "ruler", emoji: "📏", parts: ["r", "u", "l", "er"] },
      { word: "teacher", emoji: "🧑‍🏫", parts: ["t", "ea", "ch", "er"] },
      { word: "father", emoji: "👨‍👧", parts: ["f", "a", "th", "er"] }
    ]
  },

  in: {
    kind: "blend", letter: "in", label: "in", match: ["in"],
    emoji: "🗑️", keyword: "bin",
    story: {
      title: "A Pin on a Tin",
      lines: [
        "This is *Jin* — he has a *tin*,\na shiny blue *tin* with a *pin* stuck *in*.",
        "A *pin* on a *tin* — it's little and *thin*,\n\"What's *in* the *tin*?\" asks *Jin* with a *grin*.",
        "He opens the *tin* — but there's nothing *in*!\nIt's empty! It's empty! — \"Oh no!\" says *Jin*.",
        "*Jin* goes for a swim in the sea, and then...\nhe sees a big *fin*! \"Oh no! Not again!\"",
        "A *fin*! A *fin*! It's a shark — oh, *spin*!\n\"Run, *Jin*, run!\" — and he runs *in* a *spin*!",
        "He puts the old *tin* *in* the rubbish *bin*,\na *tin* *in* a *bin* — let's put it right *in*!",
        "Then the little *pin* goes *in* the *bin* too,\nthe *bin* is so tidy — *Jin* knows what to do!",
        "For tidying up, *Jin* gets a cup — a *win*!\n\"Hooray!\" says *Jin* with a great big *grin*!"
      ],
      scenes: [
        ["👦", "tin"],
        ["tin", "📌"],
        ["👦", "tin"],
        ["👦", "🦈", "🌊"],
        ["🦈", "🏃"],
        ["tin", "🗑️"],
        ["📌", "🗑️"],
        ["👦", "🏆", "🎉"]
      ]
    },
    pics: [{ e: "tin", w: "tin" }, { e: "🗑️", w: "bin" }, { e: "📌", w: "pin" },
           { e: "🦈", w: "fin" }, { e: "🏆", w: "win" }],
    words: [
      { word: "tin", emoji: "tin", parts: ["t", "in"] },
      { word: "bin", emoji: "🗑️", parts: ["b", "in"] },
      { word: "pin", emoji: "📌", parts: ["p", "in"] },
      { word: "fin", emoji: "🦈", parts: ["f", "in"] },
      { word: "win", emoji: "🏆", parts: ["w", "in"] }
    ]
  },

  og: {
    kind: "blend", letter: "og", label: "og", match: ["og"],
    emoji: "🐶", keyword: "dog",
    story: {
      title: "A Dog on the Log",
      lines: [
        "Here is a *dog* who likes to *jog*,\na happy, *jogging*, bouncing *dog*.",
        "He *jogs* in the morning, *jog*, *jog*, *jog*,\nthe fastest *jogger* — that little *dog*!",
        "But oh no! Today there's a cloud of *fog*,\nthick, grey *fog* — and he can't see, poor *dog*!",
        "He jumps up on top of a big brown *log*,\na *dog* on a *log* in the thick grey *fog*.",
        "Then the *log* starts to roll — roll, roll, *jog*!\nIt rolls down the hill and into the *bog*!",
        "Splash! A *log* in the *bog* with a muddy *dog*,\nhe's muddy and brown — a *soggy*, *froggy* *dog*!",
        "Hop! Up comes a little green *frog*,\n\"Hello!\" says the *frog* to the muddy *dog*.",
        "The sun comes out and away goes the *fog*,\nnow home *jog* the *frog* and the happy *dog*!"
      ],
      scenes: [
        ["🐶"],
        ["🐶", "🏃"],
        ["🌫️", "🐶"],
        ["🐶", "🪵"],
        ["🪵", "🟤"],
        ["🪵", "🟤", "🐶"],
        ["🐸", "🪵"],
        ["🐶", "🐸", "☀️"]
      ]
    },
    pics: [{ e: "🐶", w: "dog" }, { e: "🪵", w: "log" }, { e: "🌫️", w: "fog" },
           { e: "🏃", w: "jog" }, { e: "🐸", w: "frog" }],
    words: [
      { word: "dog", emoji: "🐶", parts: ["d", "og"] },
      { word: "log", emoji: "🪵", parts: ["l", "og"] },
      { word: "fog", emoji: "🌫️", parts: ["f", "og"] },
      { word: "jog", emoji: "🏃", parts: ["j", "og"] },
      { word: "frog", emoji: "🐸", parts: ["f", "r", "og"] }
    ]
  },

  op: {
    kind: "blend", letter: "op", label: "op", match: ["op"],
    emoji: "🧹", keyword: "mop",
    story: {
      title: "A Cop Can Hop",
      lines: [
        "Here is a *cop* with a bucket and *mop*,\na *cop* with a *mop* — *mop*, *mop*, *mop*!",
        "He *mops* the floor and he *mops* the *shop*,\nhe *mops* and he *mops* and he just can't *stop*!",
        "Then look! The *cop* starts to *hop*, *hop*, *hop*,\na *cop* can *hop*! — he goes flip and *flop*!",
        "A rabbit comes by and she *hops* — *hop*, *hop*!\n\"Let's *hop* together!\" says the *cop*. \"Don't *stop*!\"",
        "They *hop* up the hill to the very *top*,\nthe *top* of the hill — *plop*, *plop*, *plop*!",
        "At the *top* there's a toy — a spinning *top*,\nit spins round and round and it won't *stop*!",
        "It spins down the hill and it lands on the *mop*,\na *top* on the *mop*! — Oh, what a *flop*!",
        "\"*Stop*!\" says the *cop* — then he laughs with a *pop*,\n\"I *hop*, you *hop* — let's all *hop* to the *shop*!\""
      ],
      scenes: [
        ["👮", "🧹"],
        ["👮", "🧹"],
        ["👮", "⬆️"],
        ["🐇", "👮"],
        ["👮", "🐇", "⛰️"],
        ["🔝", "⛰️"],
        ["🔝", "🧹"],
        ["👮", "🛑", "😂"]
      ]
    },
    pics: [{ e: "🧹", w: "mop" }, { e: "👮", w: "cop" }, { e: "🔝", w: "top" },
           { e: "🐇", w: "hop" }, { e: "🏪", w: "shop" }],
    words: [
      { word: "mop", emoji: "🧹", parts: ["m", "op"] },
      { word: "cop", emoji: "👮", parts: ["c", "op"] },
      { word: "top", emoji: "🔝", parts: ["t", "op"] },
      { word: "hop", emoji: "🐇", parts: ["h", "op"] }
    ]
  },

  ot: {
    kind: "blend", letter: "ot", label: "ot", match: ["ot"],
    emoji: "🍲", keyword: "pot",
    story: {
      title: "A Tot in the Cot",
      lines: [
        "Here is a *tot* in a little *cot*,\na *tot* in a *cot* — he likes it a *lot*!",
        "The *tot* is sleepy, his eyes are shut tight,\nhe sleeps in his *cot* all through the night.",
        "Mum is cooking in a big *hot* *pot*,\nsoup in a *pot* that is very, very *hot*!",
        "\"A *hot* *pot*! Do *not* touch!\" — that's the rule,\n*hot*, *hot*, *hot* — wait for it to cool.",
        "Then in comes a rat — a sneaky rat,\nhe jumps in the *pot* — now what about that?",
        "A rat in a *pot*! Mum is *not* happy, *not*!\nShe shakes her spoon at the rat in the *pot*.",
        "The *tot* wakes up — he sits up in his *cot*,\nand he laughs, and he laughs, and he laughs a *lot*!",
        "\"*Not* in the *pot*, rat!\" — and the rat runs away,\nthe *tot* laughs a *lot* — what a *hot*, funny day!"
      ],
      scenes: [
        ["👶", "cot"],
        ["👶", "cot", "💤"],
        ["👩", "🍲", "🔥"],
        ["🍲", "🔥", "🚫"],
        ["🐀", "🍲"],
        ["👩", "😠", "🐀"],
        ["👶", "😂"],
        ["🐀", "💨", "👶"]
      ]
    },
    pics: [{ e: "🍲", w: "pot" }, { e: "🥵", w: "hot" }, { e: "cot", w: "cot" },
           { e: "👶", w: "tot" }],
    words: [
      { word: "pot", emoji: "🍲", parts: ["p", "ot"] },
      { word: "hot", emoji: "🥵", parts: ["h", "ot"] },
      { word: "cot", emoji: "cot", parts: ["c", "ot"] },
      { word: "tot", emoji: "👶", parts: ["t", "ot"] }
    ]
  },

  ubup: {
    kind: "blend", letter: "ub", label: "ub up", match: ["ub", "up"],
    emoji: "☕", keyword: "cup",
    story: {
      title: "A Cub in a Tub",
      lines: [
        "Here is a *cub* — a little bear *cub*,\nsplashing about in a big wooden *tub*.",
        "A *cub* in a *tub* — *rub*-a-dub-dub!\n*Rub*, *rub*, *rub* — he gives a good *scrub*.",
        "The *cub* is all clean in his big wooden *tub*,\nhe sings as he splashes — *rub*-a-dub-*dub*!",
        "Then along comes a *pup* with a little white *cup*,\na *pup* with a *cup* — he's all filled *up*!",
        "The *pup* takes a sip and he drinks it all *up*,\nslurp, slurp, slurp — goes the little *pup*.",
        "Then splash! In the *tub* jumps the little *pup*,\nnow there's a *cub* and a *pup* in the *tub*!",
        "\"*Up*, *up*!\" says Mum. \"Out of the *tub*!\nIt's time for a towel and a *rub*-a-dub-*dub*!\"",
        "The *cub* and the *pup* are as clean as can be,\n*rub*, *rub* with the towel — then off to bed, see!"
      ],
      scenes: [
        ["🐻", "tub"],
        ["🐻", "rub"],
        ["🐻", "tub", "💦"],
        ["pup", "☕"],
        ["pup", "☕"],
        ["pup", "tub", "💦"],
        ["👩", "⬆️", "tub"],
        ["🐻", "pup", "😄"]
      ]
    },
    pics: [{ e: "🐻", w: "cub" }, { e: "tub", w: "tub" }, { e: "rub", w: "rub" },
           { e: "☕", w: "cup" }, { e: "pup", w: "pup" }],
    words: [
      { word: "cub", emoji: "🐻", parts: ["c", "ub"] },
      { word: "tub", emoji: "tub", parts: ["t", "ub"] },
      { word: "rub", emoji: "rub", parts: ["r", "ub"] },
      { word: "cup", emoji: "☕", parts: ["c", "up"] },
      { word: "pup", emoji: "pup", parts: ["p", "up"] }
    ]
  },

  ug: {
    kind: "blend", letter: "ug", label: "ug", match: ["ug"],
    emoji: "🪲", keyword: "bug",
    story: {
      title: "A Bug in the Jug",
      lines: [
        "Here is a *bug* — a little green *bug*,\nhe's sitting inside a big brown *jug*.",
        "A *bug* in the *jug*! He wants to get out,\nhe climbs and he slips and he wiggles about.",
        "Here is a *mug* on a soft purple *rug*,\na *mug* on a *rug* — it's a nice warm *mug*.",
        "The *mug* has some milk that is warm and *snug*,\nthe cat wants a sip from the *mug* on the *rug*!",
        "The *bug* climbs out with a *tug*, *tug*, *tug*,\nhe climbs out of the *jug* — that clever *bug*!",
        "Then plop! He falls right into the *mug*,\noh no! It's a *bug* in the *mug* on the *rug*!",
        "I lift him out, the little green *bug*,\nand he gives me a great big, wiggly *hug*!",
        "Now the *bug* falls asleep on the soft purple *rug*,\nas *snug* as a *bug* — as a *bug* in a *rug*!"
      ],
      scenes: [
        ["🪲", "🏺"],
        ["🪲", "🏺", "⬆️"],
        ["mug", "rug"],
        ["mug", "rug", "🥛"],
        ["🪲", "🏺"],
        ["🪲", "mug"],
        ["🪲", "🤗"],
        ["🪲", "rug", "💤"]
      ]
    },
    pics: [{ e: "🪲", w: "bug" }, { e: "🏺", w: "jug" }, { e: "mug", w: "mug" },
           { e: "rug", w: "rug" }, { e: "🤗", w: "hug" }],
    words: [
      { word: "bug", emoji: "🪲", parts: ["b", "ug"] },
      { word: "jug", emoji: "🏺", parts: ["j", "ug"] },
      { word: "mug", emoji: "mug", parts: ["m", "ug"] },
      { word: "rug", emoji: "rug", parts: ["r", "ug"] },
      { word: "hug", emoji: "🤗", parts: ["h", "ug"] }
    ]
  }
};

/* Order on the home screen, the same as the book. */
const LETTER_ORDER = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "ch", "sh", "th", "wh"
];

const BLEND_ORDER = [
  "ag", "am", "an", "ap", "at", "ar", "edeg", "en",
  "et", "er", "in", "og", "op", "ot", "ubup", "ug"
];

const ALPHABET_ORDER = [...LETTER_ORDER, ...BLEND_ORDER];

/* Flat pool of every picture, used to pull distractors for the Find game. */
const ALL_PICS = ALPHABET_ORDER.flatMap(key =>
  ALPHABET[key].pics.map(p => ({ ...p, from: key }))
);

/* Pools used to build the letter wheels in the Make game. */
const VOWELS = new Set(["a", "e", "i", "o", "u"]);

/* The word endings taught in Part 2, used as spare tiles in the Make game. */
const RIME_POOL = [...new Set(BLEND_ORDER.flatMap(k => ALPHABET[k].match))];

/* Does this word have the unit's sound in it? Used so the Find game never
   offers a "wrong" picture that is really right (e.g. "bag" in the b game). */
function hasUnitSound(word, key) {
  const entry = ALPHABET[key];
  const w = word.toLowerCase();
  if (entry.match) return entry.match.some(m => w.includes(m));
  const g = entry.letter;
  if (VOWELS.has(g) || g === "x" || g.length > 1 && g !== "qu") return w.includes(g);
  return w.startsWith(g);
}
