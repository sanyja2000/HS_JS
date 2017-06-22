function AIMinion(me,player){
	var summoned = false;
	for(var i=0; i<me.hand.length;i++){
		if(me.hand[i].mana<=me.mana && me.minions.length<7){
			summonMinion(me.hand[i],me,player);
			me.mana-=me.hand[i].mana;
			summoned = true;
			me.hand.splice(i,1);
			break;
		}
	}
	if(summoned){
		AIMinion(me,player);
	}
}

function AIAttack(me,player){
	for(var i=me.minions.length-1; i>=0;i--){
		if(me.minions[i].can_play){
			var min_health = Infinity;
			var minToAtk = 0;
			for(var j=0; j<player.minions.length;j++){
				if(player.minions[j].hp<min_health && player.minions[j].hp > 0){
					min_health=player.minions[j].hp;
					minToAtk = player.minions[j]
				}
			}
			if(minToAtk){
				console.log(me.minions[i].card.name+"( "+me.minions[i].atk+" / "+me.minions[i].hp+" ) attacked "+minToAtk.card.name+"( "+minToAtk.atk+" / "+minToAtk.hp+" )");
				attackMinion(me.minions[i],minToAtk,player,enemy);
			}
			else{
				console.log(me.minions[i].card.name+"( "+me.minions[i].atk+" / "+me.minions[i].hp+" ) attacked Face ");
				attackFace(me.minions[i],player);
			}
		}
	}
}

function EnemyTurn(me,player){
	AIMinion(me,player);
	AIAttack(me,player);
	endTurn(me,player);
}