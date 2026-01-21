// ===========================================
// CONFIGURATION
// ===========================================
// ✅ L'ID YouTube correct
const YOUTUBE_VIDEO_ID = "e2gSjrCwafQ"; 

// ===========================================
// 1. GESTION DU HEADER (VIDÉO GITHUB)
// ===========================================
window.addEventListener('load', function() {
    let video = document.querySelector('.video-zone video');
    if(video) {
        video.muted = true; // Mode muet obligatoire pour lecture auto
        
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Lecture OK
            })
            .catch(error => {
                console.log("Lecture auto bloquée (mobile)");
            });
        }
    }
});

// ===========================================
// 2. GESTION DU PLAYER YOUTUBE (CHAPITRES)
// ===========================================
function jumpToTime(seconds, element) {
    var iframe = document.getElementById("myYoutubePlayer");
    
    // ✅ URL correcte avec l'ID et le temps de départ
    var newSrc = "https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID + "?start=" + seconds + "&autoplay=1&enablejsapi=1&rel=0";
    
    iframe.src = newSrc;
    
    // Gestion visuelle des boutons (Active / Pas active)
    var cards = document.querySelectorAll('.chapter-card');
    cards.forEach(card => card.classList.remove('active'));
    element.classList.add('active');
}
