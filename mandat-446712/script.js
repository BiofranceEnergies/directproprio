/* ==========================================================================
   MOTEUR DE LANDING PAGE - VERSION MANDAT 7890 (CORRIGÉ)
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

    // Gestion des prix
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

    // Description
    const descContainer = document.getElementById('data-description');
    if(descContainer && HouseData.description) {
        descContainer.innerHTML = '';
        HouseData.description.forEach(txt => {
            const p = document.createElement('p'); 
            p.innerHTML = txt;
            p.style.marginBottom = "15px";
            descContainer.appendChild(p);
        });
    }

 // --- 3. BLOC LÉGAL IMMOBILIER (ALIGNEMENT GAUCHE PRO) ---
    const legalContainer = document.getElementById('full-legal-text');
    if(legalContainer) {
        // Formater le téléphone avec des espaces : 06 48 89 34 80
        const phoneDisplay = HouseData.agentPhone.replace(/\./g, ' ');
        
        let textHonoraires = "";
        if(HouseData.feesSide === "vendeur") {
            textHonoraires = `Honoraires à la charge du vendeur.`;
        } else {
            const netVendeur = Math.round(HouseData.price / (1 + (HouseData.feesPercent/100)));
            const netVendeurFmt = new Intl.NumberFormat('fr-FR').format(netVendeur);
            textHonoraires = `(${HouseData.feesPercent}% honoraires TTC à la charge de l'acquéreur.) Prix hors honoraires : ${netVendeurFmt} €.`;
        }

        legalContainer.innerHTML = `
            <div style="text-align: left;">
                <p style="margin-bottom:15px;">Pour visiter et vous accompagner dans votre projet, contactez <strong>Sylvain MATIGNON</strong>, au <strong>${phoneDisplay}</strong> ou, par courriel à <a href="mailto:${HouseData.agentEmail}" style="color:#EA1D54; text-decoration:none; font-weight:bold;">${HouseData.agentEmail}</a>.</p>
                
                <p style="margin-bottom:15px;">Selon l'article L.561.5 du Code Monétaire et Financier, pour l'organisation de la visite, la présentation d'une pièce d'identité vous sera demandée.</p>
                
                <p style="margin-bottom:15px; font-size:0.85rem; opacity:0.8; line-height: 1.6; text-align: justify;">
                    Cette présente annonce a été rédigée sous la responsabilité éditoriale de <strong>Sylvain MATIGNON</strong> agissant sous le statut d'agent commercial immatriculé au <strong>RSAC 422 231 928 EVREUX</strong> auprès de SAS PROPRIETES PRIVEES, au capital de 44 920€, ZAC LE CHÊNE FERRÉ - 44 ALLÉE DES CINQ CONTINENTS 44120 VERTOU; SIRET 487 624 777 00040, RCS Nantes. Carte Professionnelle Transactions sur immeubles et fonds de commerce (T) et Gestion immobilière (G) n°CPI 4401 2016 000 010 388 délivrée par la CCI Nantes - Saint Nazaire. Compte séquestre n°30932508467 BPA SAINT-SEBASTIEN-SUR-LOIRE (44230). Garantie GALIAN-SMABTP - 89 rue de la Boétie, 75008 Paris - n°28137 J pour 2 000 000€ pour T et 120 000€ pour G. Assurance responsabilité civile professionnelle par GALIAN-SMABTP n° de police 28137.J.
                </p>
                
                <p style="padding-top:15px; border-top:1px solid #eee; font-weight: 500;">
                    <strong>Mandat réf : ${HouseData.mandatRef}</strong> - Le professionnel garantit et sécurise votre projet immobilier. <strong>${textHonoraires}</strong>
                </p>
            </div>
        `;
    }
    // --- 4. DPE & GES ---
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

    // --- 6. CHAPITRES ---
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

    // --- 7. MODALE & COOKIES ---
    const modal = document.getElementById("legal-modal");
    if(document.getElementById("open-legal") && modal) {
        document.getElementById("open-legal").onclick = function() {
            document.getElementById("modal-text-content").innerHTML = `<h2 style="color:#EA1D54; margin-bottom:20px;">Mentions Légales</h2><p>Éditeur : cioo.io / Sylvain Matignon. Hébergement : GitHub Pages. SIRET : 422 231 928 00025.</p>`;
            modal.style.display = "block";
        }
        document.querySelector(".close-modal").onclick = function() { modal.style.display = "none"; }
    }
    if(!localStorage.getItem('cioo_cookies_accepted')) {
        const banner = document.getElementById('cookie-banner');
        if(banner) banner.style.display = 'flex';
    }
});
