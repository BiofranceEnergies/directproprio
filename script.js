/* --- CALCULATEUR INTELLIGENT DIRECTPROPRIO --- */

// 1. LES VARIABLES
const STANDARD_RATE = 0.05; 
const HIGH_RATE = 0.07;     
const THRESHOLD = 150000;   
const MY_SERVICE_PRICE = 1990; 

// 2. SÉLECTION DU DOM
const slider = document.getElementById('price-slider');
const manualInput = document.getElementById('manual-price');
const savingsDisplay = document.getElementById('savings-display');
const legalText = document.getElementById('legal-text'); 

// --- FONCTIONS UTILITAIRES ---
function formatMoney(amount) {
    // Ajoute les espaces (ex: 10000 -> "10 000")
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function cleanNumber(str) {
    // Enlève tout ce qui n'est pas un chiffre
    return parseInt(str.replace(/\D/g, ''), 10) || 0;
}

// --- LA FONCTION DE CALCUL ---
function calculateSavings(price) {
    let propertyPrice = parseInt(price);
    if (isNaN(propertyPrice)) propertyPrice = 0;

    let agencyFees = 0;

    // LOGIQUE
    if (propertyPrice < THRESHOLD) {
        agencyFees = propertyPrice * HIGH_RATE;
        legalText.innerHTML = `*Calculé sur une commission agence de <strong>7%</strong> (fréquente sur les biens à moins de 150k€).`;
        legalText.style.color = "#d9534f"; 
    } else {
        agencyFees = propertyPrice * STANDARD_RATE;
        legalText.innerHTML = `*Comparativement à une commission moyenne de <strong>5%</strong>, incluant les taxes applicables.`;
        legalText.style.color = "#999"; 
    }

    // Calcul final
    let savings = agencyFees - MY_SERVICE_PRICE;
    savings = Math.round(savings); // On arrondit pour éviter les virgules
    if (savings < 0) savings = 0;

    // Affichage résultat
    savingsDisplay.textContent = formatMoney(savings);
}

// --- LES ÉCOUTEURS (NOUVELLE LOGIQUE) ---

// 1. LE SLIDER (Quand on le bouge)
slider.addEventListener('input', function() {
    // Met à jour le champ texte avec espaces
    manualInput.value = formatMoney(this.value);
    calculateSavings(this.value);
});

// 2. LE CHAMP TEXTE (Quand on tape dedans)
manualInput.addEventListener('input', function() {
    // On laisse l'utilisateur taper librement, on récupère juste le chiffre brut pour le calcul
    let rawVal = this.value.replace(/\D/g, ''); 
    
    // Si c'est vide, on calcule sur 0 mais on laisse le champ vide
    if (rawVal === "") {
        calculateSavings(0);
        return;
    }

    // Sinon on lance le calcul
    let intVal = parseInt(rawVal, 10);
    calculateSavings(intVal);
    
    // On ne touche PAS à this.value ici pour ne pas bloquer l'effacement
});

// 3. QUAND ON CLIQUE DEDANS (FOCUS)
manualInput.addEventListener('focus', function() {
    // On enlève les espaces pour faciliter la modification
    let rawVal = this.value.replace(/\D/g, '');
    if (rawVal === "0") rawVal = ""; // Si c'est 0, on vide pour taper direct
    this.value = rawVal;
});

// 4. QUAND ON CLIQUE AILLEURS (BLUR)
manualInput.addEventListener('blur', function() {
    // C'est fini, on remet les jolis espaces et on met à jour le slider
    let rawVal = this.value.replace(/\D/g, '');
    let intVal = parseInt(rawVal, 10) || 0;
    
    this.value = formatMoney(intVal); // Remet les espaces
    slider.value = intVal; // Synchronise le slider
    calculateSavings(intVal); // Recalcule une dernière fois
});

// INITIALISATION
manualInput.value = formatMoney(slider.value);
calculateSavings(slider.value);
