/* ==========================================================================
   MOTEUR DE LANDING PAGE - VERSION FINALE INTEGRALE AVEC MODALE
   ========================================================================== */

// --- 1. GESTION YOUTUBE (MODE NO-COOKIE ACTIVÉ) ---
var player;
function onYouTubeIframeAPIReady() {
    var container = document.getElementById('youtube-injector');
    if (!container || !HouseData.youtubeID) return;
    container.innerHTML = '<div id="yt-player-target"></div>';
    
    player = new YT.Player('yt-player-target', {
        host: 'https://www.youtube-nocookie.com', // <--- FORCE LE MODE SANS COOKIE ICI
        height: '100%', 
        width: '100%', 
        videoId: HouseData.youtubeID,
        playerVars: { 
            'autoplay': 0, 
            'rel': 0, 
            'modestbranding': 1, 
            'loop': 1, 
            'playlist': HouseData.youtubeID 
        },
        events: { 'onReady': function(e) {} }
    });
}

function jumpToTime(seconds, element) {
    if (player && typeof player.seekTo === 'function') { player.seekTo(seconds, true); player.playVideo(); }
    document.querySelectorAll('.chapter-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
}

// --- FONCTION POUR LE BOUTON COOKIE (DOIT ÊTRE À L'EXTÉRIEUR) ---
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
        videoHero.play().catch(e => console.log("Lecture auto bloquée"));
    }

    // Prix et Contact
    const formattedPrice = new Intl.NumberFormat('fr-FR').format(HouseData.price);
    setTxt('data-price', formattedPrice + " €");
    setTxt('data-energy-cost', "Montant estimé des dépenses annuelles : " + HouseData.energyCost);
    const btnCall = document.getElementById('data-agent-tel');
    if(btnCall) btnCall.href = "tel:" + HouseData.agentPhone.replace(/\./g, '');

    // Description (Paragraphes)
    const descContainer = document.getElementById('data-description');
    if(descContainer && HouseData.description) {
        descContainer.innerHTML = '';
        HouseData.description.forEach(txt => {
            const p = document.createElement('p'); p.innerText = txt; descContainer.appendChild(p);
        });
    }

    // --- 3. BLOC LÉGAL IMMOBILIER ---
    const legalContainer = document.getElementById('full-legal-text');
    if(legalContainer) {
        let textHonoraires = "";
        if(HouseData.feesSide === "vendeur") {
            textHonoraires = `Honoraires à la charge du vendeur.`;
        } else {
            const netVendeur = Math.round(HouseData.price / (1 + (HouseData.feesPercent/100)));
            const netVendeurFmt = new Intl.NumberFormat('fr-FR').format(netVendeur);
            textHonoraires = `(${HouseData.feesPercent}% honoraires TTC à la charge de l'acquéreur.) Prix hors honoraires : ${netVendeurFmt} €.`;
        }

        legalContainer.innerHTML = `
            <p style="margin-bottom:15px;">Pour visiter et vous accompagner dans votre projet, contactez <strong>Sylvain MATIGNON</strong>, au <strong>${HouseData.agentPhone}</strong> ou, par courriel à <a href="mailto:${HouseData.agentEmail}" style="color:#EA1D54; text-decoration:none; font-weight:bold;">${HouseData.agentEmail}</a>.</p>
            <p style="margin-bottom:15px;">Selon l'article L.561.5 du Code Monétaire et Financier, pour l'organisation de la visite, la présentation d'une pièce d'identité vous sera demandée.</p>
            <p style="margin-bottom:15px; font-size:0.8rem; opacity:0.8; text-align:justify;">
                Cette présente annonce a été rédigée sous la responsabilité éditoriale de Sylvain MATIGNON agissant sous le statut d'agent commercial immatriculé au 422 231 928 R.S.A.C. Evreux auprès de SAS PROPRIETES PRIVEES, au capital de 44 920 euros, ZAC LE CHÊNE FERRÉ - 44 ALLÉE DES CINQ CONTINENTS 44120 VERTOU ; SIRET 487 624 777 00040, RCS Nantes. Carte Professionnelle Transactions sur immeubles et fonds de commerce (T) et Gestion immobilière (G) n°CPI 4401 2016 000 010 388 délivrée par la CCI Nantes - Saint Nazaire. Compte séquestre n°30932508467 BPA SAINT-SEBASTIEN-SUR-LOIRE (44230). Garantie GALIAN-SMABTP - 89 rue de la Boétie, 75008 Paris - n°28137 J pour 2 000 000 euros pour T et 120 000 euros pour G. Assurance responsabilité civile professionnelle par GALIAN-SMABTP n° de police 28137.J.
            </p>
            <p style="padding-top:15px; border-top:1px solid #eee; font-weight: 500;">
                <strong>Mandat réf : ${HouseData.mandatRef}</strong> - Le professionnel garantit et sécurise votre projet immobilier. ${textHonoraires}
            </p>
        `;
    }

    // --- 4. DPE / PICTOGRAMMES / CHAPITRES ---
    const letters = ['A','B','C','D','E','F','G'];
    function generateLadder(targetId, activeLetter, val, unit, prefixClass) {
        const container = document.getElementById(targetId);
        if(!container) return;
        container.innerHTML = '';
        letters.forEach((l) => {
            const index = letters.indexOf(l);
            const row = document.createElement('div');
            if (l === activeLetter) {
                row.className = "dpe-row active-row";
                row.innerHTML = `<div class="dpe-bar ${prefixClass}-${l.toLowerCase()} w-${index+1}">${l}</div><div class="dpe-value">${val} <span>${unit}</span></div>`;
            } else {
                row.className = "dpe-row";
                row.innerHTML = `<div class="dpe-bar ${prefixClass}-${l.toLowerCase()} w-${index+1}">${l}</div>`;
            }
            container.appendChild(row);
        });
    }
    generateLadder('dpe-ladder-conso', HouseData.dpeLetter, HouseData.dpeValue, 'kWh/m²', 'class');
    generateLadder('dpe-ladder-ges', HouseData.gesLetter, HouseData.gesValue, 'kg CO₂/m²', 'ges');

    const featContainer = document.getElementById('data-features-list');
    if(featContainer) {
        featContainer.innerHTML = '';
        HouseData.features.forEach(f => {
            let svgPath = "";
            if(f.icon === "rect") svgPath = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>';
            else if(f.icon === "bed") svgPath = '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>';
            else if(f.icon === "bath") svgPath = '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/>';
            else if(f.icon === "sun") svgPath = '<path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><circle cx="12" cy="12" r="4"/>';
            else if(f.icon === "pool") svgPath = '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>';
            else svgPath = '<circle cx="12" cy="12" r="10"/>';
            const div = document.createElement('div'); div.className = 'feature-item';
            div.innerHTML = `<svg class="immo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg><span>${f.text}</span>`;
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

    // --- 5. GESTION DE LA MODALE MENTIONS LÉGALES DU SITE ---
    const modal = document.getElementById("legal-modal");
    const btn = document.getElementById("open-legal");
    const span = document.querySelector(".close-modal");
    const modalText = document.getElementById("modal-text-content");

    if(btn && modal) {
        btn.onclick = function() {
            modalText.innerHTML = `
                <h2 style="margin-bottom:20px; color:#EA1D54; font-family:'Playfair Display', serif;">Mentions Légales du Site</h2>
                <div style="font-size:0.9rem; color:#444;">
                    <p style="margin-bottom:15px;"><strong>Éditeur du site :</strong><br>
                    cioo.io / Sylvain Matignon<br>
                    4 rue du Pont Saint Jean, 27530 Ézy-sur-Eure<br>
                    SIRET : 422 231 928 00025<br>
                    Email : contact.cioo.io@gmail.com</p>
                    <p style="margin-bottom:15px;"><strong>Hébergement :</strong><br>
                    GitHub Pages<br>
                    88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA</p>
                    <p style="font-style:italic; font-size:0.8rem; border-top:1px solid #eee; padding-top:10px;">
                        Ce site est une interface de présentation immobilière destinée à faciliter la mise en relation. 
                        Tous les contenus sont protégés par le droit d'auteur.
                    </p>
                </div>
            `;
            modal.style.display = "block";
        }
        span.onclick = function() { modal.style.display = "none"; }
        window.onclick = function(event) {
            if (event.target == modal) { modal.style.display = "none"; }
        }
    }

    // --- 6. LOGIQUE D'AFFICHAGE DU BANDEAU COOKIE ---
    if(!localStorage.getItem('cioo_cookies_accepted')) {
        const banner = document.getElementById('cookie-banner');
        if(banner) {
            banner.style.display = 'flex'; // Affiche le bandeau s'il n'est pas accepté
        }
    }
});
