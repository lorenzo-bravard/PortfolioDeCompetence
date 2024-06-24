let jsonData = [];

// Fetch the JSON data from the file
fetch('projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        jsonData = data;
        console.log('JSON data loaded:', jsonData);
        displayPopularSeries();
    })
    .catch(error => console.error('Error fetching JSON:', error));




// Fetch the JSON data from the file
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
    })
    .catch(error => console.error('Error fetching JSON:', error));

    function displayPopularSeries() {
        console.log('Displaying popular series');
        const popularSeriesRow = document.getElementById('popularSeriesRow');
        if (!popularSeriesRow) {
            console.error('popularSeriesRow element not found');
            return;
        }
    
        jsonData.forEach(project => {
            const card = document.createElement('div');
            
            card.classList.add('card');
            card.style.backgroundImage = `url(${project.images[0]})`;
            card.innerHTML = `
                <div class="card-title">${project.title}</div>  
            `;
            card.addEventListener('click', () => {
                window.location.href = `details.html?id=${project.id}`;
            });
            popularSeriesRow.appendChild(card);
        });
    }   
    
function showAC() {
    const acList = document.getElementById('acList');
    acList.innerHTML = ''; // Clear previous list

    jsonData.forEach(project => {
        project.AC.forEach(ac => {
            const li = document.createElement('li');

            const acNumber = document.createElement('div');
            acNumber.classList.add('ac-number');
            const acNumberText = document.createElement('h3');
            acNumberText.textContent = ac.code; // Get the first 9 characters
            acNumber.appendChild(acNumberText);

            li.innerHTML = `${ac.description} <span class="validate-icon">✔️</span>`;
            li.insertBefore(acNumber, li.firstChild);
            acList.appendChild(li);
            li.addEventListener('click', () => {            
                showModal(ac);
            });
        });
    });

    document.getElementById('acModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('acModal').style.display = 'none';
}

function showModal(ac, index) {
    const modal = document.getElementById('justificationModal');
    const modalText = document.getElementById('justificationText');
    const divNumAc = document.getElementById('divNumAc');
    divNumAc.innerHTML = ''; // Clear previous AC items

    // Create the blue rectangle element with the first 9 characters of AC text
    const acNumber = document.createElement('div');
    acNumber.classList.add('ac-number');
    const acNumberText = document.createElement('h3');
    acNumberText.textContent = ac.code; // Get the first 9 characters
    acNumber.appendChild(acNumberText);
    divNumAc.appendChild(acNumber);

    modalText.textContent = ac.justification;
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = "none";
        modalText.textContent = ""; // Clear the content when modal is closed
        }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == modal) {
            
            modal.style.display = "none";
            modalText.textContent = ""; // Clear the content when modal is closed
        }
    }
}