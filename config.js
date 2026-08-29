/* =====================================================================
   Trophée — version multi-familles
   ---------------------------------------------------------------------
   Projet Firebase : trophee-familles (dédié à cette application)
   Base : Cloud Firestore, emplacement eur3 (Europe)

   Une famille par branche : familles/{identifiant}. Le cloisonnement est
   appliqué par les règles Firestore, pas par cette page.

   Ces clés ne sont pas des secrets : elles identifient le projet. La
   protection vient des règles publiées dans Firebase.
   ===================================================================== */

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyA8EHb1GpyHaw0zHY5LJgqe7RbTKwc2a3Q",
  authDomain: "trophee-familles.firebaseapp.com",
  projectId: "trophee-familles",
  storageBucket: "trophee-familles.firebasestorage.app",
  messagingSenderId: "536022225856",
  appId: "1:536022225856:web:cc53ec848ac3f01db5ae25",

  /* Mode multi-familles : inscription libre, une branche par famille. */
  multi: true,

  /* La collection qui contient les branches. À laisser tel quel. */
  collection: "familles"
};
