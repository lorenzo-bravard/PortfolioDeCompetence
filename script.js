document.addEventListener('mousemove', function(e) {
    var cursor = document.querySelector('.custom-cursor');
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';

    var element = document.elementFromPoint(e.clientX, e.clientY);
    if (element) {
        var bgColor = window.getComputedStyle(element).backgroundColor;
        var inverseColor = invertColor(bgColor);
        cursor.style.backgroundColor = inverseColor;
    }
});

function invertColor(rgb) {
    if (!rgb.startsWith('rgb')) {
        return 'white'; // Default fallback color
    }

    var colors = rgb.match(/\d+/g);
    var r = 255 - colors[0];
    var g = 255 - colors[1];
    var b = 255 - colors[2];
    return `rgb(${r},${g},${b})`;
}

var circles = document.querySelectorAll('.circle');
var detailScreen = document.getElementById('detailScreen');
var detailContent = document.getElementById('detailContent');
var detailText = document.getElementById('detailText');
var closeButton = document.getElementById('closeButton');

document.addEventListener('DOMContentLoaded', function() {
    const detailScreen = document.getElementById('detailScreen');
    const projectImages = document.getElementById('projectImages');
    const projectTitle = document.getElementById('projectTitle');
    const projectDescription = document.getElementById('projectDescription');
    const projectAC = document.getElementById('projectAC');
    const projectSituation = document.getElementById('projectSituation');
    const projectTache = document.getElementById('projectTache');
    const projectAction = document.getElementById('projectAction');
    const projectResultat = document.getElementById('projectResultat');
    const projectAutoEval = document.getElementById('projectAutoEval');
    const closeButton = document.getElementById('closeButton');

    // Charger les données JSON
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const projectsData = data;

            // Ajouter un événement clic à chaque cercle
            const circles = document.querySelectorAll('.circle');
            circles.forEach(circle => {
                circle.addEventListener('click', function() {
                    const projectId = circle.getAttribute('data-project-id');
                    const project = projectsData.find(proj => proj.id == projectId);

                    if (project) {
                        // Afficher les informations du projet dans la div d'information
                        projectImages.innerHTML = ''; // Effacer les images précédentes
                        project.images.forEach(imageSrc => {
                            const img = document.createElement('img');
                            img.src = imageSrc;
                            img.alt = project.title;
                            img.classList.add('info-image');
                            projectImages.appendChild(img);
                        });

                        projectTitle.textContent = project.title;
                        projectDescription.textContent = project.description;
                        projectAC.textContent = project['A.C'];
                        projectSituation.textContent = project.Situation;
                        projectTache.textContent = project.tache;
                        projectAction.textContent = project.action;
                        projectResultat.textContent = project.resultat;
                        projectAutoEval.textContent = project['auto-eval'];

                        detailScreen.style.transform = 'translateY(0)';
                    }
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement des données JSON :', error));

closeButton.addEventListener('click', function() {
    detailScreen.style.transform = 'translateY(-100%)';
});
})