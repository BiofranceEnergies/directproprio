// script.js

// On force la vidéo à démarrer
window.addEventListener('load', function() {
    let video = document.querySelector('video');
    video.muted = true; // On s'assure qu'elle est muette
    video.play();
});
