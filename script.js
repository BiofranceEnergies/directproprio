/* --- CALCULATEUR INTELLIGENT DIRECTPROPRIO --- */

// 1. LES VARIABLES
const STANDARD_RATE = 0.05; 
const HIGH_RATE = 0.07;     
const THRESHOLD = 150000;   
const MY_SERVICE_PRICE = 1990; 

// 2. SÉLECTION DU DOM
const slider = document.getElementById('price-slider');
const manualInput = document.getElementById('manual-price'); // Nouveau champ
const savingsDisplay = document.getElementById('savings-display');
const legalText = document.getElementById('legal-text'); 

// 3. LA FONCTION DE CALCUL
function calculateSavings(price) {
    // On s'assure que c'est bien un nombre
    let propertyPrice = parseInt(price);
    
    // Sécurité : si le champ est vide, on met 0
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

    // Affichage résultat (avec espaces pour les milliers)
    savingsDisplay.textContent = savings.toLocaleString('fr-FR');
}

// 4. LES ÉCOUTEURS (Synchronisation Slider <-> Input)

// Quand on bouge le SLIDER
slider.addEventListener('input', function() {
    manualInput.value = slider.value; // Met à jour le champ texte
    calculateSavings(slider.value);   // Lance le calcul
});

// Quand on tape dans l'INPUT
manualInput.addEventListener('input', function() {
    // On met à jour le slider (même si visuellement ça change pas grand chose si on dépasse les bornes)
    slider.value = manualInput.value; 
    calculateSavings(manualInput.value); // Lance le calcul
});

// 5. LANCEMENT AU DÉMARRAGE
calculateSavings(slider.value);
