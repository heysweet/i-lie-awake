var BaseGameObject = require("sald:GameObject.js");

/* json : {
	sprite, width, height
} */
var GameObject = function(x, y, args){
	this.prototype = new BaseGameObject();

	BaseGameObject.call(this, x, y, args.width, args.height, args.anchor);

	var setWidth_ = this.setWidth;
	var setHeight_ = this.setHeight;

	this.zOffset = null;
	this.image = null;
	this.sprite = null;

	if (args.zOffset) this.zOffset = args.zOffset;
	if (args.image) this.image = args.image;
	if (args.sprite) this.sprite = args.sprite;
	if (args.collisionShape) this.setCollisionShape(args.collisionShape, false);

	var halfWidth;
	if (args.width){ 
		halfWidth = args.width  / 2; 
	} else { 
		halfWidth = null; 
	}

	var halfHeight;
	if (args.height){
		halfHeight = args.height / 2;
	} else {
		halfHeight = null;
	}

	this.setWidth = function(num){
		setWidth_(num);
		halfWidth = num / 2;
	}

	this.setHeight = function(num){
		setHeight_(num);
		halfHeight = num / 2;
	}

	this.halfWidth = function() {
		return halfWidth;
	}

	this.halfHeight = function() {
		return halfHeight;
	}
}

// Prototypical Inheritance
GameObject.prototype = Object.create(BaseGameObject.prototype);

GameObject.prototype.constructor = GameObject;

// /* json : {
// 	sprite, width, height
// } */
// var GameObject = function(x_, y_, json){

// 	var width = 0;
// 	var height = 0;

// 	this.transform = {
// 		x : x_,
// 		y : y_
// 	};

// 	var halfWidth  = width  / 2;
// 	var halfHeight = height / 2;

// 	this.getWidth = function() {
// 		return width;
// 	}

// 	this.getHeight = function() {
// 		return height;
// 	}

// 	this.setWidth = function(num){
// 		width = num;
// 		halfWidth = width / 2;
// 	}

// 	this.setHeight = function(num){
// 		height = num;
// 		halfHeight = height / 2;
// 	}

// 	this.halfWidth = function() {
// 		return halfWidth;
// 	}

// 	this.halfHeight = function() {
// 		return halfHeight;
// 	}

// 	this.getTopLeft = function(){
// 		var x_ = this.transform.x - halfWidth;
// 		var y_ = this.transform.y - halfHeight;

// 		return {
// 			x : x_,
// 			y : y_
// 		}
// 	}

// 	this.getBottomCenter = function(){
// 		var x_ = this.transform.x + halfWidth;
// 		var y_ = this.transform.y + halfHeight;

// 		return {
// 			x : x_,
// 			y : y_
// 		}
// 	}
// }

var zSort = function(a, b){
	return a.getZ() - b.getZ();
}

GameObject.draw = function(){
	// Fairly efficient in a mostly sorted list, particularly when short
	// Optimize to be smarter about which objects moved
	var activeInstances = window.gamestate.activeGameObjects(zSort);

	for (var i = 0; i < activeInstances.length; i++){
		activeInstances[i].draw();
	}
}

GameObject.prototype.setImage = function(image){
	this.image = image;
}


GameObject.prototype.getZ = function(){
	var anchor = this.getScaledAnchor();
	var result = this.transform.y + anchor.y;

	if (this.zOffset !== undefined){
		return result + this.zOffset;
	}


	return result;
}

GameObject.prototype.draw = function(){
	var camera = window.gamestate.camera;

	var ctx = sald.ctx;
	var cameraCorner = camera.topLeftCorner();

	if (this.image !== null){
		ctx.drawImage(this.image, this.transform.x - cameraCorner.x, this.transform.y - cameraCorner.y);
	} else {
		var sprite = this.getSprite();

		sprite.draw();
	}
}

GameObject.prototype.setSprite = function(sprite){
	this.sprite = sprite;
}

module.exports = GameObject;