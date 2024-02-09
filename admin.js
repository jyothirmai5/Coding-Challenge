fetch('http://localhost:3000/forms')
    .then(response => response.json())
    .then(data => {
        const usersContainer = document.getElementById('users-container');

        // Create a container for each user form
        data.forEach(user => {
            const userContainer = document.createElement('div');
            userContainer.className = 'user-container';

            // Create a box for the user details
            const userBox = document.createElement('div');
            userBox.className = 'user-box';

            // Create a list for key-value pairs
            const userList = document.createElement('ul');
            userList.className = 'user-list';

            // Add details as key-value pairs to the list
            Object.entries(user).forEach(([key, value]) => {
                const listItem = document.createElement('li');
                listItem.className = 'user-list-item';

                const keyElement = document.createElement('span');
                keyElement.className = 'key';
                keyElement.textContent = `${key}:`;

                const valueElement = document.createElement('span');
                valueElement.className = 'value';
                valueElement.textContent = `${value}`;

                listItem.appendChild(keyElement);
                listItem.appendChild(valueElement);
                userList.appendChild(listItem);
            });

            userBox.appendChild(userList);
            userContainer.appendChild(userBox);
            usersContainer.appendChild(userContainer);
        });
    })
    .catch(error => console.error('Error fetching user details:', error));