// PharmaXpresso Web App - MVP structure

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Search from './pages/Search';
import UploadPrescription from './pages/UploadPrescription';
//import ConnexionPharmacie from './pages/ConnexionPharmacie';
import PharmacyDetail from './pages/PharmacyDetail';
// import Checkout from './pages/Checkout';
// import Success from './pages/Success';
// import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<UploadPrescription />} />
        <Route path="/pharmacy/:id" element={<PharmacyDetail />} />
        <Route path="/order/:pharmacyId/:medId" element={<Order />} /> ✅
        {/* // <Route path="/checkout" element={<Checkout />} />
        // <Route path="/success" element={<Success />} />  */}
      </Routes>
    </Router>
  );
}

export default App;

// 📁 /components/NavBar.js
// Barre de navigation simple
// Bootstrap utilisé
// Contient les liens vers Accueil, Recherche, Ordonnance

// 📁 /pages/Home.js
// Présente l'idée : "UberEats de la santé" avec CTA vers recherche
// Affiche les points forts, valeurs et mission de l’app

// 📁 /pages/Search.js
// Affiche un champ de recherche avec autocomplétion
// Recherche simulée dans une liste locale de médicaments
// Affiche les pharmacies avec prix, distance, disponibilité

// 📁 /pages/UploadPrescription.js
// Formulaire pour uploader une image/pdf
// Intègre Cloudinary (clé API à insérer) pour l’upload + preview dynamique

// 📁 /pages/PharmacyDetail.js
// Affiche les détails d’une pharmacie sélectionnée : stock, produits, boutons "Commander"
// Calcule automatiquement les frais et majore selon les règles :
// +10% commission pharmacie, +5% soft, +15% livraison

// 📁 /pages/Checkout.js
// Simule paiement avec KKiapay/Fedapay (faux formulaire au départ)
// Intègre validation des champs et résumé de commande

// 📁 /pages/Success.js
// Message de succès avec récap de commande + lien retour accueil

// 💾 /data/pharmacies.js & /data/products.js (base de données simulée)
// Exporte des listes de pharmacies + stocks disponibles

// ✅ Étapes terminées :
// - Structure de navigation
// - Routage principal
// - Plan de composants/pages
// - Logique de calcul modèle économique intégrée

// Prochaine étape : générer chaque fichier avec contenu fonctionnel
// (Dis-moi si tu veux tout en une fois ou bloc par bloc avec style inclus)
