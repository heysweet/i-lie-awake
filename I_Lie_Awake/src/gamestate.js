var GameState = function(){
	var currentDialogue = null;
	var currentRoom = null;

	this.currentDialogue = function(){
		return currentDialogue;
	}

	this.setCurrentDialogue = function(dialogue){
		currentDialogue = dialogue;
	}

	this.currentRoom = function(){
		return currentRoom;
	}

	this.setCurrentRoom = function(room){
		currentRoom = room;
	}
}

var gamestate = new GameState();

window.gamestate = gamestate;