/*

card types:
	s - spell
	m - minion

class types:
	ne - neutral
	ma - mage
	ro - rogue
	pa - paladin
	pr - priest
	wa - warrior
	sh - shaman
	dr - druid
	hu - hunter
	wl - warlock

rarity types:
	c - common
	r - rare
	e - epic
	l - legendary

Battlecry - Deathrattle informations!!

function mybattlecry(me,enemy){
	
}


*/

var card_types = ["ne","wa","sh","ro","pa","hu","dr","wl","ma","pr"];
var rarity_types = ["c","r","e","l"];

function Card(c_type,cla,pic,name,desc,mana,atk,hp,bcry,dtreat,race,rarity){
	this.type = c_type;
	this.class = cla;
	this.pic="cards/"+pic;
	this.name = name;
	this.desc = desc;
	this.mana = mana;
	this.atk = atk;
	this.hp = hp;
	this.bcry = bcry;
	this.dtreat = dtreat;
	this.race = race;
	this.rarity = rarity;
}

function no(){
	return 0;
}

function randomMinion(minions){
	return minions[randInt(0,minions.length)];
}

function randInt(from,to){
	//inclusive - exclusive
	return from+Math.floor(Math.random()*(to-from));
}

var coin_card = new Card("s","ne","coin.png","Coin","Gain 1 Mana Crystal\nthis turn only.",0,0,0,function(){},no());
var ne_cards=[
//	new Card("m","ne","acidic_swamp_ooze.png","Acidic Swamp Ooze","Battlecry: Destroy your\nopponent's weapon.",2,3,2),
//	new Card("m","ne","millhouse_manastorm.png","Millhouse Manastorm","Battlecry: Enemy spells\ncost (0) next turn.",2,4,4,no(),no(),0,"l"),
	new Card("m","ne","barnes.png","Barnes","Battlecry: Summon a 1/1\n copy of a random minion\n in your deck.",4,3,4,function(player,enemy){
		if(player.deck.length==0 || player.minions.length>6){return 0}
		var index=randInt(0,player.deck.length);
		var card = newCard(player.deck[index]);
		card.atk = 1;
		card.hp = 1;
		var minion = new Minion(card);
		player.minions.push(minion);
	},no(),0,"l"),
	new Card("m","ne","bloodfen_raptor.png","Bloodfen Raptor","",2,3,2),
	new Card("m","ne","chillwind_yeti.png","Chillwind Yeti","",4,4,5,no(),no(),0,"c"),
	new Card("m","ne","leper_gnome.png","Leper Gnome","Deathrattle: Deal 2\ndamage to the\n enemy hero.",2,3,2,no(),function(player,enemy){enemy.health-=2;console.log("Dealt 2 damage");damageToHeroAnim(enemy,2)},0,"c"),
	new Card("m","ne","wisp.png","Wisp","",0,1,1,no(),no(),0,"c"),
	new Card("m","ne","dr_boom.png","Dr. Boom","Battlecry: Summon two\n 1/1 Boom Bots.\n WARNING: Bots may\nexplode.",7,7,7,function(player,enemy){
		for(var i=0;i<2;i++){
			summonMinion(new Card("m","ne","boom_bot.png","Boom Bot","Deathrattle: Deal 1-4\ndamage to a random\nenemy.",1,1,1,no(),function(){
				var toAtk = randInt(0,enemy.minions.length+1);
				var damage = randInt(1,5);
				if(toAtk>enemy.minions.length-1){
					enemy.health-=damage;
					damageToHeroAnim(enemy,damage);
				}
				else{
					enemy.minions[toAtk].hp -= damage;
					damageAnimation(enemy.minions[toAtk],damage);
				}
			},"Mech","c"),player,enemy);
		}},no(),0,"l"),
	//new Card("s","ne","bananas.png","Bananas","Give a friendly minion\n+1/+1.(+1 Attack/+1\n Health)",1,0,0,no(),no(),0,"c")
	new Card("m","ne","loot_hoarder.png","Loot Hoarder","Deathrattle: Draw a card",2,2,1,no(),function(player,enemy){drawCard(player);},"","c"),
	new Card("m","ne","gnomish_inventor.png","Gnomish Inventor","Battlecry: Draw a card",4,2,4,function(player,enemy){drawCard(player);},no(),"","c"),
	new Card("m","ne","antique_healbot.png","Antique Healbot","Battlecry: Restore 8 Health\nto your hero.",5,3,3,function(player,enemy){if(player.defhealth-player.health>=8){healToHeroAnim(player,8);player.health+=8}else{healToHeroAnim(player,player.defhealth-player.health);player.health=player.defhealth;}},no(),"Mech","c"),
	new Card("m","ne","arcane_golem.png","Arcane Golem","Battlecry: Give your\nopponent a Mana Crystal.",3,4,4,function(player,enemy){if(enemy.fmana<9){enemy.fmana++}},no(),"","r"),
	new Card("m","ne","backstreet_leper.png","Backstreet Leper","Deathrattle: Deal 2 damage\nto the enemy hero.",3,3,1,no(),function(player,enemy){enemy.health-=2},"","c"),
	new Card("m","ne","bluegill_warrior.png","Bluegill Warrior","Charge",2,2,1,function(player,enemy){this.can_play=1},no(),"Murloc","c"),
	new Card("m","ne","bomb_lobber.png","Bomb Lobber","Battlecry: Deal 4 damage\nto a random enemy\nminion.",5,3,3,function(player,enemy){
		if(enemy.minions.length==0){return 0}
		var index = randInt(0,enemy.minions.length);
		enemy.minions[index].hp -= 4;
		damageAnimation(enemy.minions[index],4);
	},no(),"","r")	
];

var wa_cards=[
	new Card("s","wa","execute.png","Execute","Destroy a damaged\nenemy minion.",2,0,0,no(),no(),0,"c")
];

var ma_cards=[
	new Card("s","ma","arcane_intellect.png","Arcane Intellect","Draw 2 cards.",3,0,0,function(){drawCard(player);drawCard(player);},no(),0,"c")
];