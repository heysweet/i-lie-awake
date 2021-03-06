var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");
var achievement = require("Achievement.js");

// Dad Morning

morningTexts = [
	new Phrase("Dad", null, 7000),
];

dialogueWithDad = new Dialogue(morningTexts);
dialogueWithDad.onEnd = defaults.goToStreet;

// Walk to School

walkToSchool = [
	new Phrase("Dad", null, 7000),
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;

// Walk from School

walkFromSchool = [
	new Phrase("Dad", null, 7000),
];

dialogueFromSchool = new Dialogue(walkFromSchool);
dialogueFromSchool.onEnd = defaults.goToHome;


// Walk to home

var walkToHome = [
	new Phrase("Dad", null, 800),
];

var dialogueToHome = new Dialogue(walkToHome);
dialogueToHome.onEnd = defaults.goToHome;


module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool,
	toHome : dialogueToHome
};