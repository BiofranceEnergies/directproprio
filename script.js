// script.js

// On force la vidéo à démarrer
window.addEventListener('load', function() {
    let video = document.querySelector('video');
    video.muted = true; // On s'assure qu'elle est muette
    video.play();
});
/* --- SCRIPT LECTEUR VIDÉO INTERACTIF --- */

function changeVideo(roomId, cardElement) {
    // 1. Récupérer le lecteur vidéo principal
    const mainVideo = document.getElementById('mainVideo');
    
    // 2. Récupérer l'URL de la nouvelle vidéo (stockée dans la balise <data>)
    // cardElement est la div sur laquelle on a cliqué
    const newSource = cardElement.querySelector('data').value;
    
    // 3. Changer la source et lancer la vidéo
    mainVideo.src = newSource;
    mainVideo.play(); // Lance la lecture automatiquement
    
    // 4. Gérer l'apparence "Active" (surbrillance)
    // On enlève la classe 'active' de toutes les cartes
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.classList.remove('active');
    });
    // On l'ajoute uniquement sur celle cliquée
    cardElement.classList.add('active');
}
