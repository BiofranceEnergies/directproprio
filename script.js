/* --- CALCULATEUR D'ÉCONOMIES DIRECTPROPRIO --- */

// 1. LES VARIABLES
// On part sur 5% de frais d'agence (Moyenne marché)
const AGENCY_RATE = 0.05; 

// Ton prix de service (Prix fictif pour le calcul, tu pourras le changer)
const MY_SERVICE_PRICE = 1990; 

// 2. SÉLECTION DES ÉLÉMENTS HTML
const slider = document.getElementById('price-slider');
const priceDisplay = document.getElementById('property-price-display');
const savingsDisplay = document.getElementById('savings-display');

// 3. LA FONCTION DE CALCUL
function calculateSavings() {
    // Récupère la valeur du curseur
    let propertyPrice = parseInt(slider.value);

    // Calcul : (Prix x 5%) - Ton Prix
    let agencyFees = propertyPrice * AGENCY_RATE;
    let savings = agencyFees - MY_SERVICE_PRICE;

    // Pas de résultat négatif
    if (savings < 0) savings = 0;

    // Mise à jour de l'affichage avec espaces (ex: 15 000)
    priceDisplay.textContent = propertyPrice.toLocaleString('fr-FR');
    savingsDisplay.textContent = savings.toLocaleString('fr-FR');
}

// 4. ÉCOUTEUR (Quand on bouge le curseur)
slider.addEventListener('input', calculateSavings);

// 5. INITIALISATION (Au démarrage)
calculateSavings();
