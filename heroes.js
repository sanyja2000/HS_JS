function Hero(name,img,y){
	this.name = name;
	this.img = new Image();
	this.img.src = "heroes/"+img;
	this.y = y;
}

function drawPlayerHero(player){
	var y = player.hero.y;
	ctx.drawImage(player.hero.img,459,y,250*0.43,280*0.43);
	ctx.font= "20px GameFont";
	if(player.health < player.defhealth){
		ctx.fillStyle="red";
	}
	ctx.fillText(player.health,552,y+105);
	ctx.strokeText(player.health,552,y+105);
	ctx.fillStyle="white";
}


function damageToHeroAnim(enemy,damage){
	var anim_time = 30;
	var mx = 512;
	var my = enemy.hero.y+51;
	console.log(mx,my);
	var anim_damage = setInterval(function(){
		if(anim_time > 0) {
			anim_time-=2;
			ctx.save();
			ctx.fillStyle="red";
			ctx.beginPath();
			ctx.arc(mx,my,30,0,Math.PI*2);
			ctx.fill();
			ctx.fillStyle = "white";
			ctx.fillText(-damage,mx,my);
			ctx.closePath();
			ctx.restore();
		}
		if(anim_time<=0){clearInterval(anim_damage);console.log("deleting damage interval")}
	},1000/60);	
}

function healToHeroAnim(player,heal){
	var anim_time = 30;
	var mx = 512;
	var my = player.hero.y+51;
	console.log(mx,my);
	var anim_damage = setInterval(function(){
		if(anim_time > 0) {
			anim_time-=2;
			ctx.save();
			ctx.fillStyle="yellow";
			ctx.beginPath();
			ctx.arc(mx,my,30,0,Math.PI*2);
			ctx.fill();
			ctx.fillStyle = "white";
			ctx.fillText("+"+heal,mx,my);
			ctx.closePath();
			ctx.restore();
		}
		if(anim_time<=0){clearInterval(anim_damage);console.log("deleting heal interval")}
	},1000/60);	
}