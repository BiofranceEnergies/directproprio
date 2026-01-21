// ===========================================
// CONFIGURATION
// ===========================================
// L'identifiant de ta vidéo YouTube (Visite Guidée)
const YOUTUBE_VIDEO_ID = "e2gSjrCwafQ"; 

// ===========================================
// 1. GESTION DU HEADER (VIDÉO D'AMBIANCE GITHUB)
// ===========================================
window.addEventListener('load', function() {
    // On cible la vidéo d'ambiance en haut de page
    let video = document.querySelector('.video-zone video');
    
    if(video) {
        video.muted = true; // Obligatoire pour l'autoplay sur les navigateurs modernes
        
        // On tente de lancer la lecture automatiquement
        let playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // La lecture a commencé avec succès
            })
            .catch(error => {
                // L'autoplay a été bloqué (souvent sur mobile en mode économie d'énergie)
                console.log("Lecture auto bloquée par le navigateur.");
            });
        }
    }
});

// ===========================================
// 2. GESTION DU PLAYER YOUTUBE (CHAPITRES)
// ===========================================
function jumpToTime(seconds, element) {
    // On récupère le cadre YouTube (iframe)
    var iframe = document.getElementById("myYoutubePlayer");
    
    // On construit la nouvelle URL pour lancer la vidéo au bon moment
    // - start=X : commence à X secondes
    // - autoplay=1 : lance la lecture tout de suite
    // - rel=0 : ne montre pas les vidéos des concurrents à la fin
    var newSrc = "https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID + "?start=" + seconds + "&autoplay=1&enablejsapi=1&rel=0";
    
    // On applique la nouvelle source
    iframe.src = newSrc;
    
    // --- Gestion visuelle des boutons (le cadre bleu) ---
    
    // 1. On enlève la classe 'active' de TOUS les boutons
    var cards = document.querySelectorAll('.chapter-card');
    cards.forEach(card => card.classList.remove('active'));
    
    // 2. On ajoute la classe 'active' sur le bouton cliqué
    element.classList.add('active');
}
