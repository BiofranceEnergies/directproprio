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

// FONCTION UTILITAIRE : Ajoute les espaces (ex: 10000 -> "10 000")
function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// FONCTION UTILITAIRE : Enlève les espaces pour le calcul (ex: "10 000" -> 10000)
function cleanMoney(amountStr) {
    return parseInt(amountStr.toString().replace(/\s/g, '')) || 0;
}

// 3. LA FONCTION DE CALCUL
function calculateSavings(rawValue) {
    // On nettoie la valeur (on enlève les espaces s'il y en a) pour avoir un vrai nombre
    let propertyPrice = parseInt(rawValue);
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
    if (savings < 0) savings = 0;

    // Affichage résultat
    savingsDisplay.textContent = formatMoney(savings);
}

// 4. LES ÉCOUTEURS

// Quand on bouge le SLIDER
slider.addEventListener('input', function() {
    // On met à jour le champ texte avec les espaces
    manualInput.value = formatMoney(slider.value); 
    calculateSavings(slider.value);
});

// Quand on tape dans le CHAMP TEXTE
manualInput.addEventListener('input', function() {
    // 1. On récupère ce que l'utilisateur tape, mais on ne garde que les chiffres
    let rawNumbers = this.value.replace(/\D/g, ''); 
    
    // 2. Si c'est vide, on gère
    if (rawNumbers === "") rawNumbers = "0";

    // 3. On met à jour le slider avec le vrai nombre (sans espaces)
    slider.value = rawNumbers;

    // 4. On remet la valeur formatée dans le champ (avec espaces)
    this.value = formatMoney(rawNumbers);

    // 5. On lance le calcul
    calculateSavings(rawNumbers);
});

// 5. LANCEMENT AU DÉMARRAGE
// On initialise l'affichage correct
manualInput.value = formatMoney(slider.value);
calculateSavings(slider.value);
