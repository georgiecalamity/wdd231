const currentUrl = window.location.href;
const everything = currentUrl.split('?');
let formData = everything[1].split('&');


function show(cup) {
    console.log(cup)
    formData.forEach(element => {
        if (element.startsWith(cup)) {
            result=element.split('=')[1].replace("%40", "@")
        }
    });
    return(result)
}

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
    <p>Full Name: ${show('fname')} ${show('lname')}</p>
    <p>Organization Title: ${show('organization-title')}</p>
    <p>Email: ${show('email')}</p>
    <p>Phone Number ${show('phone-number')}</p>
    <p>Organization Name: ${show('organization-name')}</p>
    <p>Membeship Level: ${show('membership-level')}</p>
    <p>Description: ${show('description')}</p> 
`;