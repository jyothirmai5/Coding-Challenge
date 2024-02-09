// Function to fetch countries and populate dropdown
function populateDropdown(dropdownId) {
    fetch('https://restcountries.com/v2/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Populate the dropdown with country names
            var dropdown = document.getElementById(dropdownId);
            data.forEach(country => {
                var option = document.createElement('option');
                option.value = country.alpha2Code;
                option.text = country.name;
                dropdown.add(option);
            });
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

// Populate the first dropdown
populateDropdown('citizenship');

// Populate the second dropdown
populateDropdown('residence');

function showContent(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.querySelectorAll('a').forEach(a => {
        a.classList.remove('active');
    });

    // Show the selected section
    let selectedSectionElement = document.getElementById(sectionId);
    let selectedTabElement = document.getElementById(sectionId + 'Tab');
    selectedSectionElement.style.display = 'block';
    selectedTabElement.classList.add('active');
    selectedSectionElement.classList.add('active');
    if (sectionId === 'admin') {
        document.getElementById('heading').innerHTML = `List of Contact Forms received`
    } else {
        document.getElementById('heading').innerHTML = `Send a Contact Form`
    }
}

// Handle initial content display based on the hash in the URL
function showContentFromHash() {
    var hash = window.location.hash.slice(1);
    showContent(hash || 'user');
}

// Listen for hash changes and update content accordingly
window.addEventListener('hashchange', showContentFromHash);

// Initial content display
showContentFromHash();

// Function to add a new user via a POST request
function addUser() {
    const userForm = document.getElementById('contact-form');

    const newUser = {
        first_name: userForm.firstName.value,
        last_name: userForm.lastName.value,
        email: userForm.email.value,
        citizenship_country: userForm.citizenship.value,
        residence_country: userForm.residence.value,
        question: userForm.question.value,
    };

    fetch('http://localhost:3000/add-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetchUserDetails(); // Refresh the user details after adding a new user
        })
        .catch(error => console.error('Error adding user:', error));
}