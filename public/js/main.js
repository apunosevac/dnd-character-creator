document.getElementById('generate-btn').addEventListener('click', generateAbilities);
document.getElementById('roll-stats-btn').addEventListener('click', rollStats);
document.getElementById('next-skills-btn').addEventListener('click', showSkills);
document.getElementById('skills-list').addEventListener('change', updateSkillModifiers);

const raceAbilities = {
    human: "Humans get +1 to all ability scores.",
    elf: "Elves get +2 Dexterity.",
    dwarf: "Dwarves get +2 Constitution."
    // Add more races and their features here
};

const classAbilities = {
    fighter: "Fighters can use all armor and shields, and have proficiency with simple and martial weapons.",
    wizard: "Wizards can cast spells and use spellbooks.",
    rogue: "Rogues have proficiency in Dexterity and thieves' tools."
    // Add more classes and their features here
};

function generateAbilities() {
    const race = document.getElementById('race').value;
    const className = document.getElementById('class').value;

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
        const roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
        const modifier = Math.floor((roll - 10) / 2);
        stats[stat] = modifier;

        const listItem = document.createElement('li');
        listItem.textContent = `${stat}: ${roll} (Modifier: ${modifier >= 0 ? '+' : ''}${modifier})`;
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

