document.addEventListener('DOMContentLoaded', ()=>{
    const menuContainer = document.querySelector('.menu-container');
    const burgerButton = document.querySelector('#burger-button');

    burgerButton.addEventListener('click', ()=>{
        menuContainer.classList.toggle('open');

        if (menuContainer.classList.contains('open')) {
            burgerButton.textContent = '✖';
        }
        else {
            burgerButton.textContent = '☰';
        }
    });
});


const currentYear = new Date().getFullYear();
const copyrightYear = document.getElementById('copyrightYear');
copyrightYear.textContent = `©${currentYear} Ormoc Chamber of Commerce`

const lastModifiedDate = new Date(document.lastModified);
const lastModified = document.getElementById('lastModified');
lastModified.textContent = `Last Modification: ${lastModifiedDate.toLocaleDateString()}`;


const membershipLevelUrl = "./data/membership-level.json";

async function fetchMembershipData() {
    try {
        const response = await fetch(membershipLevelUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            renderMembershipCard(data.membershipLevels);
        } else {
            throw Error("wala")
        }
    } catch (error) {
        console.error(error);
    }
}

fetchMembershipData()

function renderMembershipCard(levels) {
    const membershipCardList = document.getElementById('membership-card-list');
    membershipCardList.innerHTML = '';

    // Add the <h2> heading outside the loop
    const heading = document.createElement('h2');
    heading.classList.add('membership-header')
    heading.textContent = 'Membership Levels';
    membershipCardList.appendChild(heading);
    
    levels.forEach(level => {
        const levelContainer = document.createElement('div');
        levelContainer.classList.add('level-item');
        
        levelContainer.innerHTML = `
            <h4>${level.name}</h4>
            <button class="open-modal-button">Learn More</button>
        `;
        membershipCardList.appendChild(levelContainer);

        const openModalButton = levelContainer.querySelector('.open-modal-button');

        openModalButton.addEventListener('click', () => displayModalDetails(level));   
    });
}



// modal
const levelDetails = document.getElementById('level-details');

function displayModalDetails(level) {
    levelDetails.innerHTML = '';
    levelDetails.innerHTML = `
        <div id="modal-container">
            <button id="close-modal" class="close-button">✖</button>
            <h2>${level.name}</h2>
            <p>${level.description}</p>
            <p><strong>Benefits</strong></p>
            <ul>
                ${level.benefits.map(benefit =>`<li>${benefit}</li>`).join('')}
            </ul>
        </div>
    `;
    levelDetails.showModal();

    const closeModal = document.getElementById('close-modal');

    closeModal.addEventListener("click", () => {
        levelDetails.close();
    }); 

    levelDetails.addEventListener('click', (event) => {
        if (event.target == levelDetails) {
            levelDetails.close();
        }
    });
}
