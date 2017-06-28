function newCard(card){
	var new_card =JSON.parse(JSON.stringify(card));
	new_card.bcry = card.bcry;
	new_card.dtreat = card.dtreat;
	return new_card;
}

function displayMana(player,enemy){
	ctx.fillStyle = "white";
	ctx.font = "12px GameFont";
	ctx.textAlign = "center";
	ctx.strokeText(player.mana+"/"+player.fmana,664,553);
	ctx.fillText(player.mana+"/"+player.fmana,664,553);
	ctx.strokeText(enemy.mana+"/"+enemy.fmana,646,50);
	ctx.fillText(enemy.mana+"/"+enemy.fmana,646,50);
	for(var i = 0; i < player.mana; i++){
		ctx.drawImage(manaImg,690+i*17,541,17,17);
	}
	for(var i = 0; i < player.fmana-player.mana; i++){
		ctx.drawImage(bmanaImg,690+player.mana*17+i*17,541,17,17);
	}
}


var setup_card_types=["card_minion_neutral","card_spell_neutral","card_minion_warrior","card_spell_warrior","card_minion_shaman","card_spell_shaman","card_minion_rogue","card_spell_rogue","card_minion_paladin","card_spell_paladin","card_minion_hunter","card_spell_hunter","card_minion_druid","card_spell_druid","card_minion_warlock","card_spell_warlock","card_minion_mage","card_spell_mage","card_minion_priest","card_spell_priest"];
var card_type_imgs = [];
var setup_rarity_gems = ["gem_common","gem_rare","gem_epic","gem_legendary"];
var rarity_gem_imgs = [];

for(var i=0; i<setup_card_types.length;i++){
	var c_type = new Image();
	c_type.src="card_types/"+setup_card_types[i]+".png";
	card_type_imgs.push(c_type);
}
for(var i=0; i<setup_rarity_gems.length;i++){
	var c_gem = new Image();
	c_gem.src="card_types/"+setup_rarity_gems[i]+".png";
	rarity_gem_imgs.push(c_gem);
}
var card_rarity_img = new Image();
card_rarity_img.src = "minion_gem_brackets.png";

var card_swirl_img = new Image();
card_swirl_img.src = "card_swirl.png"

var card_race_img = new Image();
card_race_img.src="card_race.png";

var card_legendary_img = new Image();
card_legendary_img.src="card_legendary.png";

var card_back_img = new Image();
card_back_img.src="card_types/card_back.png";

function displayCard(card,x,y,rot,scl,avMana){
	if(!scl) {scl=1}
	ctx.save();
	ctx.translate(x+150*scl,y+203*scl);
	ctx.rotate(rot);
	ctx.translate(-x-150*scl,-y-203*scl);
	var card_type_img = card_type_imgs[card_types.indexOf(card.class)*2+(card.type=="s")];
	

	if(avMana >= card.mana){
		ctx.fillStyle="lime";
		ctx.fillRect(x+12*scl,y+12*scl,281*scl,383*scl);
	}
	var card_pic=new Image();
	card_pic.src=card.pic;
	ctx.drawImage(card_pic,x-5*scl,y,290*scl,300*scl);
	ctx.drawImage(card_type_img,x,y,300*scl,407*scl);

	ctx.textAlign = "center";
	ctx.fillStyle = "white";
	ctx.strokeStyle = "black";

	ctx.font = 60*scl+"px GameFont";
	ctx.lineWidth = 2*scl;
	ctx.fillText(card.mana,x+45*scl,y+60*scl);
	ctx.strokeText(card.mana,x+45*scl,y+60*scl);
	
	if(card.type == "m"){
	
	ctx.fillText(card.atk,x+50*scl,y+382*scl);
	ctx.strokeText(card.atk,x+50*scl,y+382*scl);

	ctx.fillText(card.hp,x+263*scl,y+382*scl);
	ctx.strokeText(card.hp,x+263*scl,y+382*scl);

	if(card.race){
		ctx.lineWidth = 1*scl*0.7;
		ctx.drawImage(card_race_img,x+82*scl,y+345*scl,156*scl,36*scl);
		ctx.font = 22*scl+"px GameFont";
		ctx.fillText(card.race,x+160*scl,y+373*scl);
		ctx.font = 22*scl+"px GameFont";
		ctx.strokeText(card.race,x+160*scl,y+373*scl);
	}
	if(card.rarity){
		ctx.drawImage(rarity_gem_imgs[rarity_types.indexOf(card.rarity)],x+145*scl,y+235*scl,24*scl,27*scl);
		ctx.drawImage(card_rarity_img,x+138*scl,y+232*scl,48*scl,16*scl);
		ctx.drawImage(card_swirl_img,x+85*scl,y+262*scl,137*scl,108*scl);
		if(card.rarity == "l"){
			ctx.drawImage(card_legendary_img,x+73*scl,y-23*scl,234*scl,174*scl)
		}
	}	

	}


	var texts = card.desc.split("\n");
	ctx.font = 18*scl+"px sans-serif";
	ctx.fillStyle = "black";
	for(var ii = 0; ii < texts.length; ii++){
		ctx.fillText(texts[ii],x+155*scl,y+300*scl+ii*20*scl);
	}
	//ctx.fillRect(x+50,y+260,210,110);
	ctx.font = 22*scl+"px GameFont";
	ctx.fillStyle = "white";
	ctx.lineWidth = 1*scl*0.7;
	ctx.translate(x+150*scl,y+220*scl);
	ctx.rotate(-Math.PI/36);
	ctx.fillText(card.name,0,0);
	ctx.strokeText(card.name,0,0);
	ctx.restore();

}