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



// CALENDAR
function generateCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Clear the calendar

    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = date.getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[month];

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    let currentDay = 1;
    for (let i = 0; i < 6; i++) { // Assuming max 6 rows for a month
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDay) {
                cell.textContent = '';
            } else if (currentDay <= daysInMonth) {
                cell.textContent = currentDay;
                currentDay++;
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    calendar.appendChild(table);

    const title = document.createElement('h3');
    title.textContent = `${monthName} ${year}`;
    calendar.insertBefore(title, table);
}

// Generate the calendar for the current month and year
const now = new Date();
generateCalendar(now.getFullYear(), now.getMonth());

// Modal
document.addEventListener('DOMContentLoaded', function() {
    const dialog = document.getElementById('visitModal');
    const visitMessage = document.getElementById('visitMessage');
    const closeButton = document.querySelector('.close-button');

    // Function to show the dialog
    function showDialog(message) {
        visitMessage.textContent = message;
        dialog.showModal();
    }

    // Function to close the dialog
    closeButton.onclick = function() {
        dialog.close();
    }

    // Function to handle the visit logic
    function handleVisit() {
        const now = new Date();
        const lastVisit = localStorage.getItem('lastVisit');

        if (!lastVisit) {
            // First visit
            showDialog("Welcome! Let us know if you have any questions.");
        } else {
            const lastVisitDate = new Date(lastVisit);
            const timeDifference = now - lastVisitDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference === 0) {
                showDialog("Back so soon! Awesome!");
            } else {
                const message = daysDifference === 1 ? "You last visited 1 day ago." : `You last visited ${daysDifference} days ago.`;
                showDialog(message);
            }
        }

        // Store the current visit date
        localStorage.setItem('lastVisit', now);
    }

    // Handle the visit logic on page load
    handleVisit();
});

