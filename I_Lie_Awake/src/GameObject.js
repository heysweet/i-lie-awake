var BaseGameObject = require("sald:GameObject.js");

/* json : {
	sprite, width, height
} */
var GameObject = function(x, y, args){
	this.prototype = new BaseGameObject();

	BaseGameObject.call(this, x, y, args.width, args.height, args.anchor);

	var setWidth_ = this.setWidth;
	var setHeight_ = this.setHeight;

	var isHidden;

	this.zOffset = null;
	this.image = null;
	this.sprite = null;

	this.transform.xDelta = 136;
	this.transform.yDelta = 100;

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

	this.setHidden = function(bool){
		isHidden = bool;
	}

	this.isHidden = function(){
		return isHidden;
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

	this.finishPath = function(){
		return;
	}
}

// Prototypical Inheritance
GameObject.prototype = Object.create(BaseGameObject.prototype);

GameObject.prototype.constructor = GameObject;

var zSort = function(a, b){
	return a.getZ() - b.getZ();
}

GameObject.draw = function(){
	// Fairly efficient in a mostly sorted list, particularly when short
	// Optimize to be smarter about which objects moved
	var activeInstances = window.gamestate.activeGameObjects(zSort);

	for (var i = 0; i < activeInstances.length; i++){
		var obj = activeInstances[i];

		if (!obj.isHidden()){
			obj.draw();
		}
	}
}

GameObject.prototype.setImage = function(image){
	this.image = image;
}

GameObject.prototype.followPath = function(path, onFinish){
	var movement = window.gamestate.movement;

	this.path = path;

	if (onFinish === null || onFinish === undefined){
		this.onFinish = function(){return};
	} else {
		this.finishPath = onFinish;
	}

	movement.addMovingObject(this);
}

GameObject.prototype.goTo = function(point){
	var movement = window.gamestate.movement;

	this.path = [point];
	movement.addMovingObject(this);
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
		var sprite = this.sprite;

		sprite.draw('idle', this.transform.x, this.transform.y, 0, this.width, this.height, 0, 0);
	}
}

GameObject.prototype.setSprite = function(sprite){
	this.sprite = sprite;
}

module.exports = GameObject;