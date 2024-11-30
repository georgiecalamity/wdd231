const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.getElementById('cards');

async function getProphetData() {
    const response = await fetch('https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json')
    const data = await response.json();
    // console.table(data.prophets); 
    displayProphets(data.prophets)
}

function displayProphets(prophets) {
    const container = document.getElementById('cards');


    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        card.classList.add('prophet-card');

        const name = document.createElement('h2');
        name.textContent = `${prophet.name} ${prophet.lastname}`;

        const birthdate = document.createElement('p');
        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;

        const birthplace = document.createElement('p');
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        const image = document.createElement('img');
        image.classList.add('prophet-image');
        image.src = prophet.imageurl;
        image.alt = `Portrait of Prophet ${prophet.name} ${prophet.lastname}`;
        image.setAttribute('loading', 'lazy');
        image.setAttribute('height', '300');
      
        card.appendChild(name);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(image);

        container.appendChild(card);
    });

};


getProphetData();



