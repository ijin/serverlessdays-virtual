const registerForm = document.getElementById('registrationForm')

const showRegistration = () => {
    registerForm.classList = 'db'
}

const closeRegistration = () => {
    registerForm.classList = 'dn'
}

const registration = document.getElementById('registration');
const thankyou = document.getElementById('thankyou');

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const request = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }

    const response = await fetch(url, request);
    return response; // parses JSON response into native JavaScript objects
}

registration.onsubmit = async function (e) {
    // stop the regular form submission
    e.preventDefault();

    // collect the form data while iterating over the inputs
    const data = {};
    for (let i = 0, ii = registration.length; i < ii; ++i) {
        var input = registration[i];
        if (input.name) {
            if (input.type !== 'checkbox') {
                data[input.name] = input.value;
            } else {
                data[input.name] = input.checked;
            }
        }
    }

    data['path'] = window.location.pathname

    if (data['email'] == "") {
        alert("Please enter a valid email address");
    } else {
        try {

            const responseBody = {
                email: data.email,
                name: data.name
            }

            const response = await postData('/.netlify/functions/registerFunction', responseBody)
            
            if (response.ok) {
                registration.style.display = "none"
                thankyou.style.display = "block";
            } else {
                alert("Unable to complete registration")
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

