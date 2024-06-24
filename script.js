// document.addEventListener('mousemove', function(e) {
//     var cursor = document.querySelector('.custom-cursor');
//     cursor.style.left = e.pageX + 'px';
//     cursor.style.top = e.pageY + 'px';

//     var element = document.elementFromPoint(e.clientX, e.clientY);
//     if (element) {
//         var bgColor = window.getComputedStyle(element).backgroundColor;
//         var inverseColor = invertColor(bgColor);
//         cursor.style.backgroundColor = inverseColor;
//     }
// });

// function invertColor(rgb) {
//     if (!rgb.startsWith('rgb')) {
//         return 'white'; // Default fallback color
//     }

//     var colors = rgb.match(/\d+/g);
//     var r = 255 - colors[0];
//     var g = 255 - colors[1];
//     var b = 255 - colors[2];
//     return `rgb(${r},${g},${b})`;
// }

// document.addEventListener('DOMContentLoaded', function() {
//     const detailScreen = document.getElementById('detailScreen');
//     const projectImages = document.getElementById('projectImages');
//     const projectTitle = document.getElementById('projectTitle');
//     const projectDescription = document.getElementById('projectDescription');
//     const projectAC = document.getElementById('projectAC');
//     const projectSituation = document.getElementById('projectSituation');
//     const projectTache = document.getElementById('projectTache');
//     const projectAction = document.getElementById('projectAction');
//     const projectResultat = document.getElementById('projectResultat');
//     const projectAutoEval = document.getElementById('projectAutoEval');
//     const closeButton = document.getElementById('closeButton');

//     // Charger les données JSON
//     fetch('projects.json')
//         .then(response => response.json())
//         .then(data => {
//             const projectsData = data;

//             // Ajouter un événement clic à chaque cercle
//             const circles = document.querySelectorAll('.circle');
//             circles.forEach(circle => {
//                 circle.addEventListener('click', function() {
//                     const projectId = circle.getAttribute('data-project-id');
//                     const project = projectsData.find(proj => proj.id == projectId);

//                     if (project) {
//                         // Afficher les informations du projet dans la div d'information
//                         projectImages.innerHTML = ''; // Effacer les images précédentes
//                         project.images.forEach(imageSrc => {
//                             const img = document.createElement('img');
//                             img.src = imageSrc;
//                             img.alt = project.title;
//                             projectImages.appendChild(img);
//                         });

//                         projectTitle.textContent = project.title;
//                         projectDescription.textContent = project.description;
//                         projectAC.textContent = project['A.C'];
//                         projectSituation.textContent = project.Situation;
//                         projectTache.textContent = project.tache;
//                         projectAction.textContent = project.action;
//                         projectResultat.textContent = project.resultat;
//                         projectAutoEval.textContent = project['auto-eval'];

//                         detailScreen.style.transform = 'translateY(0)';

//                     }
//                 });
//             });
//         })
//         .catch(error => console.error('Erreur lors du chargement des données JSON :', error));

//     closeButton.addEventListener('click', function() {
//         detailScreen.style.transform = 'translateY(-100%)';
//     });
// });    

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
            const img = document.createElement('img');
            const content = document.createElement('div');
        
            card.classList.add('card');
            content.classList.add('card-content');
            img.classList.add('card-img');
        
            img.src = project.images[0];
            img.alt = project.title;
        
            content.innerHTML = `
                <div class="card-title">${project.title}</div>
            `;
        
            card.appendChild(img);
            card.appendChild(content);
        
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