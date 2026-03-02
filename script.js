/* ==========================================================================
   MOTEUR DU SITE (VERSION AUTOMATISÉE)
   ========================================================================== */

// --- GESTION DU LECTEUR YOUTUBE ---
var player;
function onYouTubeIframeAPIReady() {
    var container = document.getElementById('youtube-injector');
    if (!container || !HouseData.youtubeID) return;
    
    container.innerHTML = '<div id="yt-player-target"></div>';
    player = new YT.Player('yt-player-target', {
        height: '100%',
        width: '100%',
        videoId: HouseData.youtubeID,
        playerVars: { 'autoplay': 0, 'rel': 0, 'modestbranding': 1 },
        events: { 'onReady': onPlayerReady }
    });
}
function onPlayerReady(event) {}
function jumpToTime(seconds, element) {
    if (player && typeof player.seekTo === 'function') {
        player.seekTo(seconds, true);
        player.playVideo(); 
    }
    document.querySelectorAll('.chapter-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
}

// --- CHARGEMENT DU DOM ---
document.addEventListener("DOMContentLoaded", function() {
    function setTxt(id, txt) { 
        const el = document.getElementById(id); 
        if(el) el.innerText = txt; 
    }
    
    // 1. TEXTES DE BASE
    document.title = HouseData.title + " - Visite Privée";
    setTxt('page-title', HouseData.title);
    setTxt('data-main-title', HouseData.title);
    setTxt('data-subtitle', HouseData.subtitle);
    setTxt('data-location', HouseData.location);
    setTxt('data-type-title', HouseData.type);
    setTxt('data-surface', HouseData.surface);
    setTxt('data-rooms', HouseData.rooms);
    setTxt('data-bedrooms', HouseData.bedrooms);
    setTxt('data-land', HouseData.land);
    setTxt('data-agent-city', HouseData.agentCity);
    setTxt('data-verdict', HouseData.verdict);

    // 2. VIDÉO HERO (FIX)
    const videoHero = document.getElementById('data-hero-video');
    if(videoHero && HouseData.heroVideoUrl) {
        videoHero.src = HouseData.heroVideoUrl;
        videoHero.load();
        videoHero.play().catch(e => console.log("Auto-play bloqué"));
    }

    // 3. PRIX ET CALCULS
    const formattedPrice = new Intl.NumberFormat('fr-FR').format(HouseData.price);
    setTxt('data-price', formattedPrice + " €");
    setTxt('legal-price', formattedPrice);
    setTxt('legal-fees', HouseData.feesPercent);
    setTxt('legal-mandat', HouseData.mandatRef);
    const netVendeur = Math.round(HouseData.price / (1 + (HouseData.feesPercent/100)));
    setTxt('legal-net-price', new Intl.NumberFormat('fr-FR').format(netVendeur));
    setTxt('data-energy-cost', "Montant estimé des dépenses annuelles : " + HouseData.energyCost);

    // 4. DESCRIPTION (MULTIPLE PARAGRAPHES)
    const descContainer = document.getElementById('data-description');
    if(descContainer && HouseData.description) {
        descContainer.innerHTML = '';
        HouseData.description.forEach(text => {
            const p = document.createElement('p');
            p.innerText = text;
            descContainer.appendChild(p);
        });
    }

    // 5. FEATURES & CHAPITRES (Même logique que précédemment)
    // ... (Code des boucles Features et Chapters)
    const featContainer = document.getElementById('data-features-list');
    if(featContainer) {
        featContainer.innerHTML = '';
        HouseData.features.forEach(f => {
            const div = document.createElement('div');
            div.className = 'feature-item';
            div.innerHTML = `<span>• ${f.text}</span>`;
            featContainer.appendChild(div);
        });
    }

    const chapContainer = document.getElementById('data-chapters');
    if(chapContainer) {
        chapContainer.innerHTML = '';
        HouseData.chapters.forEach((c, i) => {
            const div = document.createElement('div');
            div.className = (i===0) ? "chapter-card active" : "chapter-card";
            div.setAttribute('onclick', `jumpToTime(${c.time}, this)`);
            div.innerHTML = `<div class="card-content"><h3>${c.title}</h3><span>${c.subtitle}</span></div>`;
            chapContainer.appendChild(div);
        });
    }

    // 6. DPE GENERATOR
    // ... (Code des barres DPE)
});
