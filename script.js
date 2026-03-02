/* ==========================================================================
   MOTEUR DE LANDING PAGE IMMOBILIÈRE - VERSION UNIVERSELLE
   ========================================================================== */

// --- 1. GESTION YOUTUBE ---
var player;
function onYouTubeIframeAPIReady() {
    var container = document.getElementById('youtube-injector');
    if (!container || !HouseData.youtubeID) return;
    container.innerHTML = '<div id="yt-player-target"></div>';
    player = new YT.Player('yt-player-target', {
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

// --- 2. REMPLISSAGE AUTOMATIQUE ---
document.addEventListener("DOMContentLoaded", function() {
    function setTxt(id, txt) { const el = document.getElementById(id); if(el) el.innerText = txt; }
    function setHtml(id, html) { const el = document.getElementById(id); if(el) el.innerHTML = html; }

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

    // Gestion de l'appel
    const btnCall = document.getElementById('data-agent-tel');
    if(btnCall) btnCall.href = "tel:" + HouseData.agentPhone.replace(/\./g, '');

    // Description (Paragraphes auto)
    const descContainer = document.getElementById('data-description');
    if(descContainer && HouseData.description) {
        descContainer.innerHTML = '';
        HouseData.description.forEach(txt => {
            const p = document.createElement('p'); p.innerText = txt; descContainer.appendChild(p);
        });
    }

    // Bloc Légal Complet
    const legalContainer = document.getElementById('full-legal-text');
    if(legalContainer) {
        const priceFmt = new Intl.NumberFormat('fr-FR').format(HouseData.price);
        const netVendeur = Math.round(HouseData.price / (1 + (HouseData.feesPercent/100)));
        const netVendeurFmt = new Intl.NumberFormat('fr-FR').format(netVendeur);
        
        legalContainer.innerHTML = `
            <p style="margin-bottom:15px;">Pour visiter et vous accompagner dans votre projet, contactez <strong>Sylvain MATIGNON</strong>, au <strong>${HouseData.agentPhone}</strong> ou, par courriel à <a href="mailto:${HouseData.agentEmail}" style="color:#EA1D54; text-decoration:none;">${HouseData.agentEmail}</a>.</p>
            <p style="margin-bottom:15px;">Selon l'article L.561.5 du Code Monétaire et Financier, pour l'organisation de la visite, la présentation d'une pièce d'identité vous sera demandée.</p>
            <p style="margin-bottom:15px; font-size:0.8rem; opacity:0.8;">Cette présente annonce a été rédigée sous la responsabilité éditoriale de Sylvain MATIGNON agissant sous le statut d'agent commercial immatriculé au 422 231 928 R.S.A.C. Evreux auprès de SAS PROPRIETES PRIVEES, au capital de 44 920 euros, ZAC LE CHÊNE FERRÉ - 44 ALLÉE DES CINQ CONTINENTS 44120 VERTOU ; SIRET 487 624 777 00040, RCS Nantes. Carte Professionnelle Transactions sur immeubles et fonds de commerce (T) et Gestion immobilière (G) n°CPI 4401 2016 000 010 388 délivrée par la CCI Nantes - Saint Nazaire. Compte séquestre n°30932508467 BPA SAINT-SEBASTIEN-SUR-LOIRE (44230). Garantie GALIAN - 89 rue de la Boétie, 75008 Paris - n°28137 J pour 2 000 000 euros pour T et 120 000 euros pour G. Assurance responsabilité civile professionnelle par GALIAN n° de police 28137.J.</p>
            <p style="padding-top:15px; border-top:1px solid #eee;"><strong>Mandat réf : ${HouseData.mandatRef}</strong> - Le professionnel garantit et sécurise votre projet immobilier. (${HouseData.feesPercent}% honoraires TTC à la charge de l'acquéreur.) Prix hors honoraires : ${netVendeurFmt} €.</p>
        `;
    }

    // Caractéristiques
    const featContainer = document.getElementById('data-features-list');
    if(featContainer) {
        featContainer.innerHTML = '';
        HouseData.features.forEach(f => {
            const div = document.createElement('div'); div.className = 'feature-item';
            div.innerHTML = `<span>• ${f.text}</span>`; featContainer.appendChild(div);
        });
    }

    // Chapitres Vidéo
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
});
