const YOUTUBE_VIDEO_ID = "e2gSjrCwafQ"; 

// ===========================================
// 1. GESTION DU HEADER (VIDÉO GITHUB)
// ===========================================
window.addEventListener('load', function() {
    let video = document.querySelector('.video-zone video');
    if(video) {
        video.muted = true;
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {}).catch(error => {
                console.log("Autoplay bloqué par le navigateur (normal sur mobile)");
            });
        }
    }
});

// ===========================================
// 2. GESTION DU PLAYER YOUTUBE (CHAPITRES & ANTI-PUB)
// ===========================================
function jumpToTime(seconds, element) {
    var iframe = document.getElementById("myYoutubePlayer");
    
    // ✅ CONSTRUCTION DE L'URL "PROPRE"
    // rel=0 : Suggère seulement tes vidéos (pas de pubs random)
    // modestbranding=1 : Réduit le logo YouTube
    // loop=1 + playlist : Empêche l'écran de fin de s'afficher (boucle)
    
    var newSrc = "https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID + 
                 "?start=" + seconds + 
                 "&autoplay=1" +
                 "&enablejsapi=1" + 
                 "&rel=0" + 
                 "&modestbranding=1" + 
                 "&showinfo=0" +
                 "&loop=1" + 
                 "&playlist=" + YOUTUBE_VIDEO_ID; // Obligatoire pour que le loop fonctionne
    
    iframe.src = newSrc;
    
    // Gestion visuelle des boutons "Actif"
    var cards = document.querySelectorAll('.chapter-card');
    cards.forEach(card => card.classList.remove('active'));
    element.classList.add('active');
}
