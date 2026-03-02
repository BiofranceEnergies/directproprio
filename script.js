/* ==========================================================================
   MOTEUR DE LANDING PAGE - VERSION FUSIONNÉE DÉFINITIVE
   ========================================================================== */

var player;
function onYouTubeIframeAPIReady() {
    var container = document.getElementById('youtube-injector');
    if (!container || !HouseData.youtubeID) return;
    container.innerHTML = '<div id="yt-player-target"></div>';
    player = new YT.Player('yt-player-target', {
        host: 'https://www.youtube-nocookie.com',
        height: '100%', width: '100%', videoId: HouseData.youtubeID,
        playerVars: { 'autoplay': 0, 'rel': 0, 'modestbranding': 1, 'loop': 1, 'playlist': HouseData.youtubeID },
        events: { 'onReady': function(e) {} }
    });
}

function jumpToTime(seconds, element) {
    if (player && typeof player.seekTo === 'function') { player.seekTo(seconds, true); player.playVideo(); }
    document.querySelectorAll('.chapter-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
}

function acceptCookies() {
    localStorage.setItem('cioo_cookies_accepted', 'true');
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    function setTxt(id, txt) { const el = document.getElementById(id); if(el) el.innerText = txt; }

    // Remplissage textes
    document.title = HouseData.title + " - Visite Privée";
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

    // Vidéo Hero
    const videoHero = document.getElementById('data-hero-video');
    if(videoHero && HouseData.heroVideoUrl) {
        videoHero.src = HouseData.heroVideoUrl;
        videoHero.load();
        videoHero.play().catch(e => console.log("Lecture auto bloquée"));
    }

    // Gestion des prix
    const formattedPrice = new Intl.NumberFormat('fr-FR').format(HouseData.price);
    setTxt('data-price', formattedPrice + " €");

    const elPriceM2 = document.getElementById('data-price-m2');
    if(elPriceM2 && HouseData.price && HouseData.surface) {
        const m2Value = Math.round(HouseData.price / HouseData.surface);
        const m2Formatted = new Intl.NumberFormat('fr-FR').format(m2Value);
        elPriceM2.innerText = `(${m2Formatted} €/m²)`;
    }

    // Bloc Légal Immo
    const legalContainer = document.getElementById('full-legal-text');
    if(legalContainer) {
        let textHon = HouseData.feesSide === "vendeur" ? `Honoraires à la charge du vendeur.` : `(${HouseData.feesPercent}% honoraires TTC à la charge de l'acquéreur.) Prix hors honoraires : ${new Intl.NumberFormat('fr-FR').format(Math.round(HouseData.price / (1 + (HouseData.feesPercent/100))))} €.`;
        legalContainer.innerHTML = `<p style="margin-bottom:15px;">Contactez <strong>Sylvain MATIGNON</strong> au <strong>${HouseData.agentPhone}</strong>.</p><p style="font-size:0.8rem; opacity:0.8; text-align:justify;">Cette présente annonce a été rédigée sous la responsabilité éditoriale de Sylvain MATIGNON immatriculé au 422 231 928 R.S.A.C. Evreux. Garantie GALIAN n°28137.J.</p><p style="padding-top:15px; border-top:1px solid #eee;"><strong>Mandat réf : ${HouseData.mandatRef}</strong> - ${textHon}</p>`;
    }

    // DPE & GES
    const letters = ['A','B','C','D','E','F','G'];
    function generateLadder(targetId, activeLetter, val, unit, prefixClass) {
        const container = document.getElementById(targetId);
        if(!container) return;
        container.innerHTML = '';
        letters.forEach((l) => {
            const row = document.createElement('div');
            row.className = l === activeLetter ? "dpe-row active-row" : "dpe-row";
            row.innerHTML = `<div class="dpe-bar ${prefixClass}-${l.toLowerCase()} w-${letters.indexOf(l)+1}">${l}</div>` + (l === activeLetter ? `<div class="dpe-value">${val} <span>${unit}</span></div>` : '');
            container.appendChild(row);
        });
    }
    generateLadder('dpe-ladder-conso', HouseData.dpeLetter, HouseData.dpeValue, 'kWh/m²', 'class');
    generateLadder('dpe-ladder-ges', HouseData.gesLetter, HouseData.gesValue, 'kg CO₂/m²', 'ges');

    // Chapitres (Correction Largeur)
    const chapContainer = document.getElementById('data-chapters');
    if(chapContainer) {
        chapContainer.innerHTML = '';
        HouseData.chapters.forEach((c, i) => {
            const div = document.createElement('div');
            div.className = (i===0) ? "chapter-card active" : "chapter-card";
            div.style.minWidth = "230px"; // On évite le wrap du texte
            div.setAttribute('onclick', `jumpToTime(${c.time}, this)`);
            div.innerHTML = `<div class="card-content"><h3>${c.title}</h3><span>${c.subtitle}</span></div>`;
            chapContainer.appendChild(div);
        });
    }

    // Modale & Cookies
    const modal = document.getElementById("legal-modal");
    const btn = document.getElementById("open-legal");
    if(btn && modal) {
        btn.onclick = function() {
            document.getElementById("modal-text-content").innerHTML = `<h2 style="color:#EA1D54;">Mentions Légales</h2><p>Éditeur : cioo.io / Sylvain Matignon. Hébergement : GitHub Pages.</p>`;
            modal.style.display = "block";
        }
        document.querySelector(".close-modal").onclick = function() { modal.style.display = "none"; }
    }
    if(!localStorage.getItem('cioo_cookies_accepted')) {
        document.getElementById('cookie-banner').style.display = 'flex';
    }
});
