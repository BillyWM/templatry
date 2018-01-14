//http://www.speech.cs.cmu.edu/cgi-bin/cmudict
//https://stackoverflow.com/questions/1288291/how-can-i-correctly-prefix-a-word-with-a-and-an

function number() {
    return {
        text: random("one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten")
    }
}

number.literal = true;

function ordinal(input) {
    let out = null;
    let mapping = {
        "one": "first",
        "two": "second",
        "three": "third",
        "five": "fifth",
        "eight": "eighth",
        "nine": "ninth"
    }
    
    if (input.text in mapping) {
        out = mapping[input.text];
    } else {
        out = `${input.text}th`;
    }

    return {
        text: out
    }
}

ordinal.lookbehind = true;
nth = ordinal;

function color() {
    return {
        text: random("red", "green", "blue")
    }
}

color.literal = true;

function animal() {
    return {
        text: random("fox", "sheep", "pig", "dog", "octopus"),
        gender: "N"
    }
}

animal.literal = true;

function person() {
    let genders = {"man": "M", "woman": "F", "person": "NB"};
    let selection = random("man", "woman", "person");
    return {
        text: selection,
        gender: genders[selection],
        plural: false
    }
}

person.literal = true;

function plant() {
    return {
        text: random("tree", "flower", "fern", "shrub"),
        gender: "N"
    }
}

plant.literal = true;

function livingThing() {
    let choice = random(animal, person, plant);

    return choice();
}

livingThing.literal = true;

function his(input) {
    let mapping = {
        "M": "his",
        "F": "her",
        "N": "its",
        "NB": "their"
    }

    return {
        text: mapping[input.gender],
        gender: input.gender
    }
}

his.lookbehind = true;
her = their = its = his;

function is(input) {

    return {
        text: "is",
        plural: false
    }
}

is.lookbehind = true;

function he(input) {
    let mapping = {
        "M": "he",
        "F": "she",
        "N": "it",
        "NB": "they"
    }

    return {
        text: mapping[input.gender],
        gender: input.gender
    }
}

she = he;
he.lookbehind = true;

function himself(input) {
    let mapping = {
        "M": "himself",
        "F": "herself",
        "N": "itself",
        "NB": "themselves"
    }

    return {
        text: mapping[input.gender],
        gender: input.gender
    }
}

herself = themselves = itself = himself;
himself.lookbehind = true;

function sentence(strings, ...keys) {
    let replacements = new Array();

    for (let i=0; i < keys.length; i++) {
        let k = keys[i];
        let prev = i > 0 ? replacements[i-1] : null;

        if (k.literal) {
            replacements.push(k());
        } else if (k.lookbehind) {
            replacements.push(k(prev));
        }
    }

    return strings.reduce( (acc, cur) => {
        let replaceObj = replacements.shift();
        let replaceStr = replaceObj ? replaceObj.text : "";
        return acc + cur + replaceStr
    }, "")
}

function random(...args) {
    let index = Math.floor(Math.random() * args.length);
    return args[index];
}

console.log(
    sentence`There are ${number} flowers in a vase. The ${ordinal} flower is ${color}.\n`,
    sentence`The quick ${color} ${animal} jumped over the lazy ${animal}.\n`,
    sentence`A ${person} on ${his} death bed watches ${his} life flash before ${his} eyes. ${he} can feel ${himself} slip away. ${he} ${is} full of regret.\n`
)
 