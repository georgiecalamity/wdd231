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

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        const memberList = document.getElementById('members-list');

        data.forEach(member => {
            const memberCard = document.createElement('div')
            memberCard.classList.add('member-card');

            memberCard.innerHTML = `
            <h3 class="member-name">${member.name}</h3>
            <hr class="separator">
            <div class="card-flex">
            <div class="member-image">
                <img src=${member.image} alt=${member.name}>
            </div>
            <div class="member-info">
                <p class="member-website"><span>Website:</span> ${member.website}</p>
                <p class="member-phone"><span>Phone:</span> ${member.phone}</p>
                <p class="member-email"><span>Email:</span> ${member.info}</p>
            </div>
            </div>
            `;
            memberList.appendChild(memberCard);
        });
    }
    catch(error) {
        console.error('error fetching member data', error);
    }
}

fetchMembers()

const gridButton = document.querySelector('.grid-button');
const listButton = document.querySelector('.list-button');
const memberList = document.getElementById('members-list');
const separator = document.querySelector('.separator');

gridButton.addEventListener('click', ()=>{
    memberList.classList.remove('list-view');
    memberList.classList.add('grid-view');
    
})

listButton.addEventListener('click', ()=>{
    memberList.classList.remove('grid-view');
    memberList.classList.add('list-view');
})



