/* --- CALCULATEUR INTELLIGENT DIRECTPROPRIO --- */

// 1. LES VARIABLES
const STANDARD_RATE = 0.05; // 5% au-dessus de 150k
const HIGH_RATE = 0.07;     // 7% en dessous de 150k (Frais fixes/minimums)
const THRESHOLD = 150000;   // Le seuil de basculement

const MY_SERVICE_PRICE = 1990; // Ton forfait fixe

// 2. SÉLECTION DU DOM
const slider = document.getElementById('price-slider');
const priceDisplay = document.getElementById('property-price-display');
const savingsDisplay = document.getElementById('savings-display');
const legalText = document.getElementById('legal-text'); // Le texte d'explication

// 3. LA FONCTION MAGIQUE
function calculateSavings() {
    let propertyPrice = parseInt(slider.value);
    let agencyFees = 0;
    let currentRate = 0;

    // LOGIQUE CONDITIONNELLE (Le cœur du système)
    if (propertyPrice < THRESHOLD) {
        // Cas : Petit prix (< 150k) -> Taux fort (7%)
        currentRate = 7;
        agencyFees = propertyPrice * HIGH_RATE;
        
        // On change le texte d'explication en rouge ou gras pour avertir
        legalText.innerHTML = `*Calculé sur une commission agence de <strong>7%</strong> (fréquente sur les biens à moins de 150k€).`;
        legalText.style.color = "#d9534f"; // Un petit rouge pour attirer l'oeil
    } else {
        // Cas : Prix standard (>= 150k) -> Taux standard (5%)
        currentRate = 5;
        agencyFees = propertyPrice * STANDARD_RATE;

        // Texte standard
        legalText.innerHTML = `*Comparativement à une commission moyenne de <strong>5%</strong>, incluant les taxes applicables.`;
        legalText.style.color = "#999"; // Gris classique
    }

    // Calcul final de l'économie
    let savings = agencyFees - MY_SERVICE_PRICE;
    if (savings < 0) savings = 0;

    // Affichage
    priceDisplay.textContent = propertyPrice.toLocaleString('fr-FR');
    savingsDisplay.textContent = savings.toLocaleString('fr-FR');
}

// 4. ÉCOUTEUR
slider.addEventListener('input', calculateSavings);

// 5. LANCEMENT
calculateSavings();
