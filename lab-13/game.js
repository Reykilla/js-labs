const player = {
    name: "Герой",
    health: 100,
    attackPower: 20,
    skillCooldown: 0,
    shieldUsed: false,
    potionUsed: false,
    parryCount: 0
};

const monster = {
    name: "Гоблін",
    health: 80,
    attackPower: 15,
    isEnraged: false,
    parryCount: 0
};

const wolf = {
    name: "Вовк",
    health: 35,
    attackPower: 5,
    isActive: false,
    hasJoined: false
};

const inventory = ["меч", "щит", "зілля здоров'я", "залізний шолом"];

function hasItem(itemName) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === itemName) {
            return true;
        }
    }
    return false;
}

function showStatus() {
    console.log(`Гравець: ${player.name}`);
    console.log(`Здоров'я: ${player.health} HP`);
    console.log();
    console.log(`Монстр: ${monster.name}`);
    console.log(`Здоров'я: ${monster.health} HP`);
    if (wolf.isActive && wolf.health > 0) {
        console.log(`Союзник монстра: ${wolf.name} (${wolf.health} HP)`);
    }
}

function attack() {
    let currentAttack = player.attackPower;
    let isSkillUsed = false;

    if (player.skillCooldown === 0) {
        currentAttack = player.attackPower * 1.5;
        player.skillCooldown = 7;
        isSkillUsed = true;
    }

    if (wolf.isActive && wolf.health > 0) {
        if (isSkillUsed) {
            console.log(`${player.name} застосовує навичку «Нищівний удар» проти ворога (${wolf.name}) на ${currentAttack} шкоди! Перезарядка: 7 раундів.`);
        } else {
            console.log(`${player.name} атакує ворога (${wolf.name})!`);
        }

        wolf.health -= currentAttack;
        if (wolf.health < 0) {
            wolf.health = 0;
        }
        console.log(`Здоров'я вовка: ${wolf.health} HP`);

        if (wolf.health === 0) {
            wolf.isActive = false;
            console.log(`${wolf.name} переможений!`);
        }
        return;
    }

    if (isSkillUsed) {
        console.log(`${player.name} застосовує навичку «Нищівний удар» проти монстра (${monster.name}) на ${currentAttack} шкоди! Перезарядка: 7 раундів.`);
    } else {
        console.log(`${player.name} атакує монстра (${monster.name})!`);
    }

    if (!isSkillUsed && Math.random() < 0.25 && monster.parryCount < 1) {
        monster.parryCount++;
        console.log(`${monster.name} виконує парирування удару! Блокування удару пройшло успішно.`);
        return;
    }

    monster.health -= currentAttack;
    if (monster.health < 0) {
        monster.health = 0;
    }
    console.log(`Здоров'я монстра: ${monster.health} HP`);

    if (!wolf.hasJoined && monster.health > 0 && monster.health < 80) {
        wolf.hasJoined = true;
        wolf.isActive = true;
        console.log(`На допомогу гобліну прибігає ${wolf.name} (${wolf.health} HP, атака ${wolf.attackPower})!`);
    }

    if (monster.health > 0 && monster.health <= 40 && !monster.isEnraged) {
        monster.isEnraged = true;
        monster.attackPower += 10;
        console.log(`${monster.name} впадає в лють! Його сила атаки зросла до ${monster.attackPower}!`);
    }
}

function applyEnemyHit(attackerName, baseAttack) {
    console.log(`${attackerName} атакує героя!`);

    if (Math.random() < 0.25 && player.parryCount < 2) {
        player.parryCount++;
        console.log(`${player.name} виконує парирування удару! Атаку заблоковано.`);
        return;
    }

    let damage = baseAttack;

    if (hasItem("щит") && !player.shieldUsed) {
        player.shieldUsed = true;
        damage -= 5;
        console.log("Герой використовує щит на початку бою та блокує 5 одиниць шкоди!");
    }

    if (hasItem("залізний шолом")) {
        damage -= 5;
        console.log("Залізний шолом поглинає 5 одиниць шкоди!");
    }

    if (damage < 0) {
        damage = 0;
    }

    player.health -= damage;
    if (player.health < 0) {
        player.health = 0;
    }
    console.log(`Здоров'я героя: ${player.health} HP`);

    if (hasItem("зілля здоров'я") && !player.potionUsed && player.health > 0 && player.health <= 80) {
        player.potionUsed = true;
        const healAmount = 15;
        player.health += healAmount;
        console.log(`Здоров'я знизилося! Герой випиває зілля здоров'я та відновлює ${healAmount} HP (тепер ${player.health} HP).`);
    }
}

function monsterAttack() {
    if (monster.health > 0) {
        applyEnemyHit(monster.name, monster.attackPower);
    }

    if (wolf.isActive && wolf.health > 0 && player.health > 0) {
        console.log();
        applyEnemyHit(wolf.name, wolf.attackPower);
    }
}

console.log("Гра «Битва з монстром»");
console.log();
showStatus();

let itemsList = "";
for (let i = 0; i < inventory.length; i++) {
    itemsList += inventory[i];
    if (i < inventory.length - 1) {
        itemsList += ", ";
    }
}
console.log();
console.log(`Інвентар гравця: ${itemsList}`);

let round = 1;

while (player.health > 0 && (monster.health > 0 || wolf.health > 0)) {
    console.log();
    console.log(`=== Раунд ${round} ===`);
    attack();

    if (monster.health <= 0 && wolf.health <= 0) {
        break;
    }

    console.log();
    monsterAttack();

    if (player.skillCooldown > 0) {
        player.skillCooldown--;
    }
    round++;
}

console.log();
if (player.health > 0 && monster.health <= 0 && wolf.health <= 0) {
    console.log("Перемога!");
    console.log(`${player.name} переміг монстра та його союзника!`);
} else {
    console.log("Поразка!");
    console.log("Вороги перемогли гравця!");
}
