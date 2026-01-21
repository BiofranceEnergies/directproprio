// ===========================================
// CONFIGURATION
// ===========================================
// ✅ CORRECTION : Juste l'ID (pas le lien entier https://...)
const YOUTUBE_VIDEO_ID = "e2gSjrCwafQ"; 

// ===========================================
// 1. GESTION DU HEADER (VIDEO GITHUB)
// ===========================================
window.addEventListener('load', function() {
    let video = document.querySelector('.video-zone video');
    if(video) {
        video.muted = true; // On force le mode muet pour être sûr
        // On tente de lancer la vidéo
        let playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Lecture auto réussie
            })
            .catch(error => {
                console.log("Lecture auto bloquée par le navigateur (normal sur mobile)");
            });
        }
    }
});

// ===========================================
// 2. GESTION DU PLAYER YOUTUBE (CHAPITRES)
// ===========================================
function jumpToTime(seconds, element) {
    var iframe = document.getElementById("myYoutubePlayer");
    
    // ✅ CORRECTION : On utilise la variable définie en haut proprement
    var newSrc = "https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID + "?start=" + seconds + "&autoplay=1&enablejsapi=1&rel=0";
    
    iframe.src = newSrc;
    
    // Gestion visuelle des boutons (Active / Pas active)
    var cards = document.querySelectorAll('.chapter-card');
    cards.forEach(card => card.classList.remove('active')); // On éteint tout
    element.classList.add('active'); // On allume celui cliqué
}
