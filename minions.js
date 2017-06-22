function summonMinion(card,player,enemy){
	var minion=new Minion(card);
	createAnimation(minion);
	player.minions.push(minion);
	if(minion.bcry){minion.bcry(player,enemy)}
}


function castSpell(card,player,enemy){
	card.bcry(player,enemy);
}

var minion_bracket_img = new Image();
minion_bracket_img.src="minion_bracket.png";

var minion_dtreat_img = new Image();
minion_dtreat_img.src = "dtreat.png"

function displayMinion(minion,x,y){
	if(minion.can_play > 0 && y == 290){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle="rgba(0,255,0,0.8)";
		ctx.ellipse(x+54,y+42,35,45,0,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	minion.mx = x+54;
	minion.my = y+42;

	if(minion.anim_back > 0){
		ctx.beginPath();
		ctx.fillStyle="rgba(255,255,0,0.7)";
		ctx.ellipse(x+54,y+42,30+minion.anim_back,45+minion.anim_back,0,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}
	ctx.fillStyle="white";

	ctx.drawImage(minion.pic,x,y,96,100);
	ctx.drawImage(minion_bracket_img,x+12,y,82,85);
	ctx.font = "18px GameFont";
	ctx.textAlign = "center";
	ctx.fillText(minion.atk,x+34,y+71);
	ctx.strokeText(minion.atk,x+34,y+71);

	if(minion.hp < minion.defhp){
		ctx.fillStyle="red";
	}
	ctx.fillText(minion.hp,x+73,y+71);
	ctx.strokeText(minion.hp,x+73,y+71);
	if(minion.card.rarity && minion.card.rarity == "l"){
		ctx.drawImage(card_legendary_img,x+25,y-8,78,58);
	}

	if(minion.dtreat){
		ctx.drawImage(minion_dtreat_img,x+40,y+67,69*0.4,53*0.4);
	}

	ctx.fillStyle="white";
	if(minion == onMinion && attacking){
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle="red";
		ctx.lineWidth=4;
		ctx.moveTo(x+54,y+42);
		ctx.lineTo(mouseX,mouseY);
		ctx.stroke();
		ctx.restore();
	}
	if(mouseX > x+19 && mouseX < x+89 && mouseY > y-3 && mouseY < y+87 && !grabbed){
		displayCard(minion.card,minion.mx+20,minion.my-200,0,0.7);
	}
	if(mouseX > x+19 && mouseX < x+89 && mouseY > y-3 && mouseY < y+87 && !grabbed && !onMinion && minion.can_play && y==290) {
		onMinion = minion;
	}
}

function attackMinion(m1,m2,player,enemy){
	m1.hp -= m2.atk;
	m2.hp -= m1.atk;
	damageAnimation(m1,m2.atk);
	damageAnimation(m2,m1.atk);
	m1.can_play-=1;
}

function checkMinions(minions,y){
	var target = undefined;
	for(var i=0; i<minions.length;i++){
		var x = 453-(enemy.minions.length-1)*40+i*80;
		if(mouseX > x+19 && mouseX < x+89 && mouseY > y-3 && mouseY < y+87){
		target=minions[i];
		console.log(target);
		break;
		}
	}
	return target;
}

function Minion(card){
	this.mx = 0;
	this.my = 0;
	this.can_play = 0;
	this.card = card;
	this.atk = card.atk;
	this.hp = card.hp;
	this.defhp = card.hp;
	this.pic = new Image();
	this.pic.src=card.pic;
	this.bcry = card.bcry;
	this.dtreat = card.dtreat;
}

function createAnimation(minion){
	minion.anim_back = 30;
	minion.anim = setInterval(function(){
		if(minion.anim_back > 0) {minion.anim_back-=2}{
		if(minion.anim_back<=0){clearInterval(minion.anim);console.log("deleting summon interval");}
		}
	},1000/60);
}
function damageAnimation(minion,damage){
	var anim_time = 60;
	var mx = minion.mx;
	var my = minion.my;
	var anim_damage = setInterval(function(){
		if(anim_time > 0) {
			anim_time-=2;
			ctx.save();
			ctx.fillStyle="red";
			ctx.beginPath();
			ctx.arc(mx,my,50,0,Math.PI*2);
			ctx.fill();
			ctx.fillStyle = "white";
			ctx.fillText(-damage,mx,my);
			ctx.closePath();
			ctx.restore();
		}
		if(anim_time<=0){clearInterval(anim_damage);console.log("deleting damage interval")}
	},1000/60);	
}
