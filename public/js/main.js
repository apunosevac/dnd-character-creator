document.getElementById('generate-btn').addEventListener('click', generateAbilities);
document.getElementById('generate-btn').addEventListener('click', updateInfoBox);
document.getElementById('roll-stats-btn').addEventListener('click', rollStats);
document.getElementById('next-skills-btn').addEventListener('click', showSkills);
document.getElementById('skills-list').addEventListener('change', updateSkillModifiers);

const raceAbilities = {
    Dragonborn: {
        abilityScoreIncrease: "Your Strength score increases by 2, and your Charisma score increases by 1.",
        age: "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
        alignment: "Dragonborn tend to be strongly aligned with either law or chaos, often reflecting the alignment of their draconic ancestry.",
        size: "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
        speed: "Your base walking speed is 30 feet.",
        draconicAncestry: "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type.",
        breathWeapon: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. The damage increases as you gain levels.",
        damageResistance: "You have resistance to the damage type associated with your draconic ancestry.",
        languages: "You can speak, read, and write Common and Draconic."
    },
    Dwarf: {
        abilityScoreIncrease: "Your Constitution score increases by 2.",
        age: "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years.",
        alignment: "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society.",
        size: "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.",
        speed: "Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.",
        darkvision: "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
        dwarvenResilience: "You have advantage on saving throws against poison, and you have resistance against poison damage.",
        dwarvenCombatTraining: "You have proficiency with the battleaxe, handaxe, throwing hammer, and warhammer.",
        toolProficiency: "You gain proficiency with the artisan’s tools of your choice: smith’s tools, brewer’s supplies, or mason’s tools.",
        stonecunning: "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check.",
        languages: "You can speak, read, and write Common and Dwarvish."
    },
    Elf: {
        abilityScoreIncrease: "Your Dexterity score increases by 2.",
        age: "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood around the age of 100 and can live to be 750 years old.",
        alignment: "Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos.",
        size: "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
        speed: "Your base walking speed is 30 feet.",
        darkvision: "Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
        keenSenses: "You have proficiency in the Perception skill.",
        feyAncestry: "You have advantage on saving throws against being charmed, and magic can’t put you to sleep.",
        trance: "Elves don’t need to sleep. Instead, they meditate deeply, remaining semi-conscious, for 4 hours a day. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.",
        languages: "You can speak, read, and write Common and Elvish."
    },
    Gnome: {
        abilityScoreIncrease: "Your Intelligence score increases by 2.",
        age: "Gnomes mature at the same rate humans do, and most are expected to settle down into adult life by around age 40. They can live 350 to almost 500 years.",
        alignment: "Gnomes are most often good. Those who tend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who tend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers.",
        size: "Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.",
        speed: "Your base walking speed is 25 feet.",
        darkvision: "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
        gnomeCunning: "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
        languages: "You can speak, read, and write Common and Gnomish."
    },
    HalfElf: {
        abilityScoreIncrease: "Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.",
        age: "Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, often exceeding 180 years.",
        alignment: "Half-elves share the chaotic bent of their elven heritage, but they value their freedom and individuality.",
        size: "Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.",
        speed: "Your base walking speed is 30 feet.",
        darkvision: "Thanks to your elven blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
        feyAncestry: "You have advantage on saving throws against being charmed, and magic can’t put you to sleep.",
        skillVersatility: "You gain proficiency in two skills of your choice.",
        languages: "You can speak, read, and write Common, Elvish, and one extra language of your choice."
    },
    Halfling: {
        abilityScoreIncrease: "Your Dexterity score increases by 2.",
        age: "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.",
        alignment: "Most halflings are lawful good, with a strong sense of community and a desire for peace.",
        size: "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.",
        speed: "Your base walking speed is 25 feet.",
        lucky: "When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
        brave: "You have advantage on saving throws against being frightened.",
        halflingNimbleness: "You can move through the space of any creature that is of a size larger than yours.",
        languages: "You can speak, read, and write Common and Halfling."
    },
    HalfOrc: {
        abilityScoreIncrease: "Your Strength score increases by 2, and your Constitution score increases by 1.",
        age: "Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.",
        alignment: "Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good.",
        size: "Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall. Your size is Medium.",
        speed: "Your base walking speed is 30 feet.",
        darkvision: "Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
        menacing: "You gain proficiency in the Intimidation skill.",
        relentlessEndurance: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can’t use this feature again until you finish a long rest.",
        savageAttacks: "When you score a critical hit with a melee weapon attack, you can roll one of the weapon’s damage dice one additional time and add it to the extra damage of the critical hit.",
        languages: "You can speak, read, and write Common and Orc."
    },
    Human: {
        abilityScoreIncrease: "Your ability scores each increase by 1.",
        age: "Humans reach adulthood in their late teens and live less than a century.",
        alignment: "Humans tend toward no particular alignment. The best and the worst are found among them.",
        size: "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Your size is Medium.",
        speed: "Your base walking speed is 30 feet.",
        languages: "You can speak, read, and write Common and one extra language of your choice."
    },
    Tiefling: {
        abilityScoreIncrease: "Your Charisma score increases by 2, and your Intelligence score increases by 1.",
        age: "Tieflings mature at the same rate as humans but live a few years longer.",
        alignment: "Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.",
        size: "Tieflings are about the same size and build as humans. Your size is Medium.",
        speed: "Your base walking speed is 30 feet.",
        darkvision: "Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
        hellishResistance: "You have resistance to fire damage.",
        infernalLegacy: "You know the *thaumaturgy* cantrip. When you reach 3rd level, you can cast *hellish rebuke* as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the *darkness* spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.",
        languages: "You can speak, read, and write Common and Infernal."
    }
};

const classAbilities = {
    Artificer: {
        hitDie: "1d8 per Artificer level",
        primaryAbility: "Intelligence",
        savingThrows: ["Constitution", "Intelligence"],
        proficiencies: {
            armor: ["Light armor", "Medium armor", "Shields"],
            weapons: ["Simple weapons"],
            tools: ["Thieves' tools", "Tinker's tools", "One type of artisan's tools"],
            savingThrows: ["Constitution", "Intelligence"],
            skills: "Choose two from Arcana, History, Investigation, Medicine, Nature, Perception, and Sleight of Hand"
        },
        spellcasting: "You have a spellbook, and you prepare a list of Artificer spells, choosing from the Artificer spell list.",
        infusions: "You can infuse items to gain magical abilities, a number of which are determined by your level."
    },
    Barbarian: {
        hitDie: "1d12 per Barbarian level",
        primaryAbility: "Strength",
        savingThrows: ["Strength", "Constitution"],
        proficiencies: {
            armor: ["Light armor", "Medium armor", "Shields"],
            weapons: ["Simple weapons", "Martial weapons"],
            tools: [],
            savingThrows: ["Strength", "Constitution"],
            skills: "Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival"
        },
        rage: "You can enter a rage as a bonus action, granting advantage on Strength checks and saving throws, a bonus to damage with melee weapons, and resistance to bludgeoning, piercing, and slashing damage.",
        unarmoredDefense: "When not wearing armor, your AC equals 10 + your Dexterity modifier + your Constitution modifier."
    },
    Bard: {
        hitDie: "1d8 per Bard level",
        primaryAbility: "Charisma",
        savingThrows: ["Dexterity", "Charisma"],
        proficiencies: {
            armor: ["Light armor"],
            weapons: ["Simple weapons", "Hand crossbows", "Longswords", "Rapiers", "Shortswords"],
            tools: ["Three musical instruments of your choice"],
            savingThrows: ["Dexterity", "Charisma"],
            skills: "Choose any three skills"
        },
        spellcasting: "You know a number of spells equal to your Bard level + your Charisma modifier, and you have a limited number of spell slots for casting those spells.",
        bardicInspiration: "You can inspire others through stirring words or music. As a bonus action, a creature within 60 feet of you that can hear you gains one Bardic Inspiration die, a d6, to add to one ability check, attack roll, or saving throw within the next 10 minutes."
    },
    Cleric: {
        hitDie: "1d8 per Cleric level",
        primaryAbility: "Wisdom",
        savingThrows: ["Wisdom", "Charisma"],
        proficiencies: {
            armor: ["Light armor", "Medium armor", "Shields"],
            weapons: ["Simple weapons"],
            tools: [],
            savingThrows: ["Wisdom", "Charisma"],
            skills: "Choose two from History, Insight, Medicine, Persuasion, and Religion"
        },
        spellcasting: "As a Cleric, you have access to the Cleric spell list, and you prepare a list of spells each day based on your Wisdom modifier and Cleric level.",
        divineDomain: "Choose one domain related to your deity, such as Life, Light, or War. This domain grants you additional spells and abilities."
    },
    Druid: {
        hitDie: "1d8 per Druid level",
        primaryAbility: "Wisdom",
        savingThrows: ["Intelligence", "Wisdom"],
        proficiencies: {
            armor: ["Light armor", "Medium armor", "Shields (Druids will not wear armor or use shields made of metal)"],
            weapons: ["Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars", "Sickles", "Slings", "Spears"],
            tools: ["Herbalism kit"],
            savingThrows: ["Intelligence", "Wisdom"],
            skills: "Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival"
        },
        spellcasting: "You know Druid spells and prepare them based on your Wisdom modifier and Druid level.",
        wildShape: "Starting at 2nd level, you can use your action to magically assume the shape of a beast that you have seen before, with limitations based on your Druid level."
    },
    Fighter: {
        hitDie: "1d10 per Fighter level",
        primaryAbility: ["Strength", "Dexterity"],
        savingThrows: ["Strength", "Constitution"],
        proficiencies: {
            armor: ["All armor", "Shields"],
            weapons: ["Simple weapons", "Martial weapons"],
            tools: [],
            savingThrows: ["Strength", "Constitution"],
            skills: "Choose two skills from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival"
        },
        fightingStyle: "At 1st level, you adopt a particular style of fighting as your specialty, such as Archery, Defense, Dueling, Great Weapon Fighting, Protection, or Two-Weapon Fighting.",
        secondWind: "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your Fighter level."
    },
    Monk: {
        hitDie: "1d8 per Monk level",
        primaryAbility: ["Dexterity", "Wisdom"],
        savingThrows: ["Strength", "Dexterity"],
        proficiencies: {
            armor: [],
            weapons: ["Simple weapons", "Shortswords"],
            tools: ["Choose one type of artisan's tools or one musical instrument"],
            savingThrows: ["Strength", "Dexterity"],
            skills: "Choose two from Acrobatics, Athletics, History, Insight, Religion, and Stealth"
        },
        martialArts: "You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.",
        ki: "Starting at 2nd level, your training allows you to harness the mystic energy of ki. You have a number of ki points equal to your Monk level."
    },
    Paladin: {
        hitDie: "1d10 per Paladin level",
        primaryAbility: ["Strength", "Charisma"],
        savingThrows: ["Wisdom", "Charisma"],
        proficiencies: {
            armor: ["All armor", "Shields"],
            weapons: ["Simple weapons", "Martial weapons"],
            tools: [],
            savingThrows: ["Wisdom", "Charisma"],
            skills: "Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion"
        },
        divineSense: "The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears.",
        layOnHands: "Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest."
    },
    Ranger: {
        hitDie: "1d10 per Ranger level",
        primaryAbility: ["Dexterity", "Wisdom"],
        savingThrows: ["Strength", "Dexterity"],
        proficiencies: {
            armor: ["Light armor", "Medium armor", "Shields"],
            weapons: ["Simple weapons", "Martial weapons"],
            tools: [],
            savingThrows: ["Strength", "Dexterity"],
            skills: "Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival"
        },
        favoredEnemy: "Beginning at 1st level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy commonly encountered in the wilds.",
        naturalExplorer: "You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions."
    },
    Rogue: {
        hitDie: "1d8 per Rogue level",
        primaryAbility: "Dexterity",
        savingThrows: ["Dexterity", "Intelligence"],
        proficiencies: {
            armor: ["Light armor"],
            weapons: ["Simple weapons", "Hand crossbows", "Longswords", "Rapiers", "Shortswords"],
            tools: ["Thieves' tools"],
            savingThrows: ["Dexterity", "Intelligence"],
            skills: "Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth"
        },
        sneakAttack: "Beginning at 1st level, you know how to strike subtly and exploit a foe’s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll.",
        cunningAction: "Starting at 2nd level, your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat."
    },
    Sorcerer: {
        hitDie: "1d6 per Sorcerer level",
        primaryAbility: "Charisma",
        savingThrows: ["Constitution", "Charisma"],
        proficiencies: {
            armor: [],
            weapons: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light crossbows"],
            tools: [],
            savingThrows: ["Constitution", "Charisma"],
            skills: "Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion"
        },
        spellcasting: "You know a number of spells based on your Sorcerer level and Charisma modifier. You have a limited number of spell slots for casting those spells.",
        sorcerousOrigin: "At 1st level, choose a Sorcerous Origin, which describes the source of your innate magical power, such as Draconic Bloodline or Wild Magic. This choice grants you features at 1st level and again at 6th, 14th, and 18th level.",
        metamagic: "Starting at 3rd level, you gain the ability to twist your spells to suit your needs. You gain two Metamagic options of your choice. You gain another one at 10th and 17th level."
    },
    Wizard: {
        hitDie: "1d6 per Wizard level",
        primaryAbility: "Intelligence",
        savingThrows: ["Intelligence", "Wisdom"],
        proficiencies: {
            armor: [],
            weapons: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light crossbows"],
            tools: [],
            savingThrows: ["Intelligence", "Wisdom"],
            skills: "Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion"
        },
        spellcasting: "You have a spellbook containing spells that show the first glimmerings of your true power. You prepare spells from the Wizard spell list based on your Intelligence modifier and Wizard level.",
        arcaneRecovery: "Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level equal to or less than half your Wizard level (rounded up), and none of the slots can be 6th level or higher.",
        arcaneTradition: "When you reach 2nd level, you choose an Arcane Tradition, shaping your practice of magic through one of eight schools, such as Evocation, Illusion, or Necromancy. This grants you features at 2nd level and additional benefits at 6th, 10th, and 14th levels."
    }
};    

function generateAbilities() {
    const race = document.getElementById('raceSelect').value;
    const className = document.getElementById('classSelect').value;

    const raceFeature = raceAbilities[race];
    const classFeature = classAbilities[className];

    const output = `
    Race: ${race.charAt(0).toUpperCase() + race.slice(1)}
    Feature: ${raceFeature}
    
    Class: ${className.charAt(0).toUpperCase() + className.slice(1)}
    Feature: ${classFeature}
    `;
    document.getElementById('output').value = output;
}

function rolld6(){
    return Math.floor(Math.random() * 6) + 1;
}

function rollStats() {
    const stats = {
        Strength: 0,
        Dexterity: 0,
        Constitution: 0,
        Intelligence: 0,
        Wisdom: 0,
        Charisma: 0
    };

    const statsList = document.getElementById('stats-list');
    statsList.innerHTML = '';

    for (let stat in stats) {
        const rollResults = [rolld6(), rolld6(), rolld6(), rolld6()]
        console.log(rollResults)
        rollResults.sort()
        rollResults.shift()
        console.log(rollResults)
        let sum = 0;
        for (let i = 0; i < rollResults.length; i++){
            sum += rollResults[i]
        }
        console.log(`Roll: ${sum}`);
        const modifier = Math.floor((sum - 10) / 2);
        console.log(`Modifier: ${modifier}`);
        stats[stat] = modifier;

        const listItem = document.createElement('li');
        listItem.textContent = `${stat}: ${sum} (Modifier: ${modifier >= 0 ? '+' : ''}${modifier})`;
        listItem.setAttribute('data-modifier', modifier);

        statsList.appendChild(listItem);
    }

    // Store the rolled modifiers in a global object
    window.abilityModifiers = stats;
    updateSkillModifiers();
}

function showSkills() {
    document.getElementById('skills').style.display = 'block';

    const skills = {
        Acrobatics: 'Dexterity',
        'Animal Handling': 'Wisdom',
        Arcana: 'Intelligence',
        Athletics: 'Strength',
        Deception: 'Charisma',
        History: 'Intelligence',
        Insight: 'Wisdom',
        Intimidation: 'Charisma',
        Investigation: 'Intelligence',
        Medicine: 'Wisdom',
        Nature: 'Intelligence',
        Perception: 'Wisdom',
        Performance: 'Charisma',
        Persuasion: 'Charisma',
        Religion: 'Intelligence',
        'Sleight of Hand': 'Dexterity',
        Stealth: 'Dexterity',
        Survival: 'Wisdom'
    };

    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';

    for (let skill in skills) {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = skill;
        checkbox.id = skill;

        const label = document.createElement('label');
        label.htmlFor = skill;
        label.textContent = `${skill} (${skills[skill]} Modifier)`;

        const modifier = document.createElement('input');
        modifier.type = 'number';
        modifier.name = `${skill}-modifier`;
        modifier.value = 0;
        modifier.setAttribute('data-ability', skills[skill]);

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(modifier);

        skillsList.appendChild(listItem);

        checkbox.addEventListener('change', updateSkillModifiers);
    }

    updateSkillModifiers();  // Update skill modifiers after displaying the skills
}

function updateSkillModifiers() {
    const proficiencyBonus = parseInt(document.getElementById('proficiency-bonus').value, 10);

    const checkboxes = document.querySelectorAll('#skills-list input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        const modifierField = checkbox.nextElementSibling.nextElementSibling;
        const ability = modifierField.getAttribute('data-ability');
        const abilityModifier = window.abilityModifiers[ability] || 0;
        const baseModifier = parseInt(modifierField.getAttribute('data-base-modifier'), 10) || 0;

        modifierField.setAttribute('data-base-modifier', abilityModifier);
        modifierField.value = abilityModifier;

        if (checkbox.checked) {
            modifierField.value = abilityModifier + proficiencyBonus;
        } else {
            modifierField.value = abilityModifier;
        }
    });
}

function formatRaceInfo(raceData) {
    return `
        Ability Score Increase: ${raceData.abilityScoreIncrease}\n
        Age: ${raceData.age}\n
        Alignment: ${raceData.alignment}\n
        Size: ${raceData.size}\n
        Speed: ${raceData.speed}\n
        ${raceData.darkvision ? `Darkvision: ${raceData.darkvision}\n` : ""}
        ${raceData.draconicAncestry ? `Draconic Ancestry: ${raceData.draconicAncestry}\n` : ""}
        ${raceData.breathWeapon ? `Breath Weapon: ${raceData.breathWeapon}\n` : ""}
        ${raceData.resistance ? `Damage Resistance: ${raceData.resistance}\n` : ""}
        Languages: ${raceData.languages}
    `;
}

function formatClassInfo(classData) {
    return `
        Hit Die: ${classData.hitDie}\n
        Primary Ability: ${Array.isArray(classData.primaryAbility) ? classData.primaryAbility.join(", ") : classData.primaryAbility}\n
        Saving Throws: ${classData.savingThrows.join(", ")}\n
        Proficiencies:\n
            Armor: ${classData.proficiencies.armor.join(", ")}\n
            Weapons: ${classData.proficiencies.weapons.join(", ")}\n
            Tools: ${classData.proficiencies.tools.length > 0 ? classData.proficiencies.tools.join(", ") : "None"}\n
            Skills: ${classData.proficiencies.skills}\n
        ${classData.spellcasting ? `Spellcasting: ${classData.spellcasting}\n` : ""}
        ${classData.rage ? `Rage: ${classData.rage}\n` : ""}
        ${classData.unarmoredDefense ? `Unarmored Defense: ${classData.unarmoredDefense}\n` : ""}
        ${classData.fightingStyle ? `Fighting Style: ${classData.fightingStyle}\n` : ""}
        ${classData.secondWind ? `Second Wind: ${classData.secondWind}\n` : ""}
        ${classData.martialArts ? `Martial Arts: ${classData.martialArts}\n` : ""}
        ${classData.ki ? `Ki: ${classData.ki}\n` : ""}
        ${classData.divineSense ? `Divine Sense: ${classData.divineSense}\n` : ""}
        ${classData.layOnHands ? `Lay on Hands: ${classData.layOnHands}\n` : ""}
        ${classData.favoredEnemy ? `Favored Enemy: ${classData.favoredEnemy}\n` : ""}
        ${classData.naturalExplorer ? `Natural Explorer: ${classData.naturalExplorer}\n` : ""}
        ${classData.sneakAttack ? `Sneak Attack: ${classData.sneakAttack}\n` : ""}
        ${classData.cunningAction ? `Cunning Action: ${classData.cunningAction}\n` : ""}
        ${classData.sorcerousOrigin ? `Sorcerous Origin: ${classData.sorcerousOrigin}\n` : ""}
        ${classData.metamagic ? `Metamagic: ${classData.metamagic}\n` : ""}
        ${classData.arcaneRecovery ? `Arcane Recovery: ${classData.arcaneRecovery}\n` : ""}
        ${classData.arcaneTradition ? `Arcane Tradition: ${classData.arcaneTradition}\n` : ""}
    `;
}

function updateInfoBox() {
    const selectedRace = raceSelect.value;
    const selectedClass = classSelect.value;

    let raceInfo = "";
    let classInfo = "";

    if (raceAbilities[selectedRace]) {
        const raceData = raceAbilities[selectedRace];
        raceInfo = formatRaceInfo(raceData);
    }

    if (classAbilities[selectedClass]) {
        const classData = classAbilities[selectedClass];
        classInfo = formatClassInfo(classData);
    }

    output.value = `${raceInfo}\n\n${classInfo}`.trim();
}