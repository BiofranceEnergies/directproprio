/* ==========================================================================
   MOTEUR DE LANDING PAGE - VERSION ABSOLUE (DESCRIPTION + ICONES + PRIX)
   ========================================================================== */

// --- 1. GESTION YOUTUBE ---
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

// --- 2. REMPLISSAGE AUTOMATIQUE ---
document.addEventListener("DOMContentLoaded", function() {
    function setTxt(id, txt) { const el = document.getElementById(id); if(el) el.innerText = txt; }

    // Textes de base
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
        videoHero.play().catch(e => console.log("Auto-play blocked"));
    }

    // --- GESTION DES PRIX ---
    const formattedPrice = new Intl.NumberFormat('fr-FR').format(HouseData.price);
    setTxt('data-price', formattedPrice + " €");

    const elPriceM2 = document.getElementById('data-price-m2');
    if(elPriceM2 && HouseData.price && HouseData.surface) {
        const m2Value = Math.round(HouseData.price / HouseData.surface);
        const m2Formatted = new Intl.NumberFormat('fr-FR').format(m2Value);
        elPriceM2.innerText = `(${m2Formatted} €/m²)`;
    }

    setTxt('data-energy-cost', "Montant estimé des dépenses annuelles : " + HouseData.energyCost);
    const btnCall = document.getElementById('data-agent-tel');
    if(btnCall) btnCall.href = "tel:" + HouseData.agentPhone.replace(/\./g, '');

    // --- DESCRIPTION (L'ART DE VIVRE) ---
    const descContainer = document.getElementById('data-description');
    if(descContainer && HouseData.description) {
        descContainer.innerHTML = ''; // On vide avant d'injecter
        HouseData.description.forEach(paragraphe => {
            const p = document.createElement('p'); 
            p.innerText = paragraphe; 
            p.style.marginBottom = "15px";
            descContainer.appendChild(p);
        });
    }

    // --- CARACTÉRISTIQUES TECHNIQUES (ICÔNES SVG) ---
    const featContainer = document.getElementById('data-features-list');
    if(featContainer && HouseData.features) {
        featContainer.innerHTML = '';
        HouseData.features.forEach(f => {
            let svgPath = "";
            if(f.icon === "rect") svgPath = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>';
            else if(f.icon === "bed") svgPath = '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>';
            else if(f.icon === "bath") svgPath = '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/>';
            else if(f.icon === "sun") svgPath = '<path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><circle cx="12" cy="12" r="4"/>';
            else if(f.icon === "pool") svgPath = '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>';
            else svgPath = '<circle cx="12" cy="12" r="10"/>';
            
            const div = document.createElement('div'); 
            div.className = 'feature-item';
            div.style.display = "flex";
            div.style.alignItems = "center";
            div.style.marginBottom = "10px";
            div.innerHTML = `<svg class="immo-icon" style="width:20px; color:#EA1D54; margin-right:10px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg><span>${f.text}</span>`;
            featContainer.appendChild(div);
        });
    }

    // --- BLOC LÉGAL COMPLET ---
    const legalContainer = document.getElementById('full-legal-text');
    if(legalContainer) {
        let textHon = HouseData.feesSide === "vendeur" ? `Honoraires à la charge du vendeur.` : `(${HouseData.feesPercent}% honoraires TTC à la charge de l'acquéreur.) Prix hors honoraires : ${new Intl.NumberFormat('fr-FR').format(Math.round(HouseData.price / (1 + (HouseData.feesPercent/100))))} €.`;
        legalContainer.innerHTML = `
            <p style="margin-bottom:15px;">Contactez <strong>Sylvain MATIGNON</strong> au <strong>${HouseData.agentPhone}</strong> ou à <a href="mailto:${HouseData.agentEmail}" style="color:#EA1D54; font-weight:bold;">${HouseData.agentEmail}</a>.</p>
            <p style="font-size:0.8rem; opacity:0.8; text-align:justify;">Cette présente annonce a été rédigée sous la responsabilité éditoriale de Sylvain MATIGNON agissant sous le statut d'agent commercial immatriculé au 422 231 928 R.S.A.C. Evreux auprès de SAS PROPRIETES PRIVEES. n°CPI 4401 2016 000 010 388 délivrée par la CCI Nantes. Garantie GALIAN-SMABTP - 89 rue de la Boétie, 75008 Paris.</p>
            <p style="padding-top:15px; border-top:1px solid #eee;"><strong>Mandat réf : ${HouseData.mandatRef}</strong> - ${textHon}</p>
        `;
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

    // Chapitres Vidéo
    const chapContainer = document.getElementById('data-chapters');
    if(chapContainer) {
        chapContainer.innerHTML = '';
        HouseData.chapters.forEach((c, i) => {
            const div = document.createElement('div');
            div.className = (i===0) ? "chapter-card active" : "chapter-card";
            div.style.minWidth = "230px";
            div.setAttribute('onclick', `jumpToTime(${c.time}, this)`);
            div.innerHTML = `<div class="card-content"><h3>${c.title}</h3><span>${c.subtitle}</span></div>`;
            chapContainer.appendChild(div);
        });
    }

    // Modale & Cookies
    const modal = document.getElementById("legal-modal");
    if(document.getElementById("open-legal") && modal) {
        document.getElementById("open-legal").onclick = function() {
            document.getElementById("modal-text-content").innerHTML = `<h2 style="color:#EA1D54; margin-bottom:20px;">Mentions Légales</h2><p>Éditeur : cioo.io / Sylvain Matignon. Hébergement : GitHub Pages. SIRET : 422 231 928 00025.</p>`;
            modal.style.display = "block";
        }
        document.querySelector(".close-modal").onclick = function() { modal.style.display = "none"; }
    }
    if(!localStorage.getItem('cioo_cookies_accepted')) {
        document.getElementById('cookie-banner').style.display = 'flex';
    }
});
