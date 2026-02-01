const YOUTUBE_VIDEO_ID = "e2gSjrCwafQ"; 

// Gestion de la vidéo d'intro (Github)
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

// Fonction pour sauter au chapitre (YouTube)
function jumpToTime(seconds, element) {
    var iframe = document.getElementById("myYoutubePlayer");
    // On relance la video au bon timecode
    var newSrc = "https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID + "?start=" + seconds + "&autoplay=1&enablejsapi=1&rel=0";
    iframe.src = newSrc;
    
    // Gestion visuelle des boutons "Actif"
    var cards = document.querySelectorAll('.chapter-card');
    cards.forEach(card => card.classList.remove('active'));
    element.classList.add('active');
}
