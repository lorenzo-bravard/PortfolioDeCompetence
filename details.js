document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const project = data.find(p => p.id == projectId);
            if (project) {
                displayProjectDetails(project);
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
});


function displayProjectDetails(project) {
    document.getElementById('detailsTitle').textContent = project.title;
    document.getElementById('detailsDescription').textContent = project.description;
    var imgback = document.getElementById('detailsHero');

    imgback.style.backgroundImage = `url(${project.images[0]})`;
    const imagesRow = document.getElementById('imagesRow');
    project.images.forEach(imageUrl => {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.classList.add('details-image');
        imagesRow.appendChild(imgElement);
    });

    const acList = document.getElementById('acList');
    project.AC.forEach((ac, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('ac-item');

        // Create the AC description element
        const acText = document.createElement('span');
        acText.textContent = ac.description;

        // Create the validation icon element
        const icon = document.createElement('span');
        icon.classList.add('validate-icon');
        icon.textContent = '✔';

        // Create the blue rectangle element with the first 9 characters of AC text
        const acNumber = document.createElement('div');
        acNumber.classList.add('ac-number');
        const acNumberText = document.createElement('h3');
        acNumberText.textContent = ac.code; // Get the first 9 characters
        acNumber.appendChild(acNumberText);
        listItem.appendChild(acNumber);



        // Event listener to toggle justification display

        // Append elements to the list item
        listItem.appendChild(acText);
        listItem.appendChild(icon);

        // Append list item to the AC list
        acList.appendChild(listItem);
        listItem.addEventListener('click', () => {            
            showModal(ac);
        });
    });

    const tasksList = document.getElementById('tasksList');
    if (project.tache) {
        project.tache.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = task;
            tasksList.appendChild(listItem);
        });
    } else {
        tasksList.textContent = "Aucune tâche disponible.";
    }

    const autoEvalText = document.getElementById('autoEvalText');
    autoEvalText.textContent = project["auto-eval"] || "Aucune auto-évaluation disponible.";

    
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