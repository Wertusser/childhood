var angle;
var axiom = "A";

var rules = [{
    a: "A",
    b: "AB"
  },
  {
    a: "B",
    b: "DC"
  },
  {
    a: "C",
    b: "DB"
  },
  {
    a: "D",
    b: "AC"
  },
];

function generate(sentence, step) {
  if (step <= 0) {
    return sentence;
  }
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  return generate(sentence, step - 1);
};


var synth = new Tone.FMSynth().toMaster();
var a = generate('B', 5);
var notes = [];
for (var item of a) {
  notes.push(item + '3');
}
console.log(notes);
var pattern = new Tone.Pattern(function(time, note) {
  synth.triggerAttackRelease(note);
}, notes);

pattern.start(0);
Tone.Transport.start();
