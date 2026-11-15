# Casa Dali · Site de location de vacances à Nerja (Espagne)

Application web moderne développée sous **Angular 22** pour la location de vacances de la **Casa Dali** (El Capistrano Village, Nerja, Andalousie).

---

## 🌟 Points Forts & Fonctionnalités

- **Design Méditerranéen Sobre & Chaleureux** : palette aux tons terracotta, sable chaud, ocre et vert olive, typographie soignée (Playfair Display + Plus Jakarta Sans).
- **Expérience Utilisateur & Animations Motion (WAAPI)** : micro-interactions haptiques au clic (`appMotionPress`), animations fluides d'apparition au scroll à 60fps (`appMotionScroll`), et effets de survol (`appMotionHover`).
- **Simulateur de Tarif Interactif** : estimation en temps réel du coût de séjour (durée, nombre de personnes, suppléments, caution remboursable) avec génération automatique d'un email de réservation prérempli.
- **Galerie Photos & Lightbox CDK** : visionneuse plein écran gérant les raccourcis clavier (flèches, Echap) et filtres par catégorie.
- **Guide Local de Nerja & Capistrano** : fiches illustrées des 10 incontournables (Balcon de l'Europe, Grottes de Nerja, criques sauvages...).
- **Téléchargement du Guide des Restaurants** : accès direct au PDF des meilleures adresses locales.
- **Météo en direct de Nerja** : widget météo temps réel basé sur les coordonnées de Nerja.
- **Internationalisation (i18n)** : support complet Français (`fr`), Espagnol (`es`) et Anglais (`en`) via **Transloco** avec sélecteur de langue dynamique.

---

## 🏗️ Architecture Découplée (Prête pour PocketBase)

Le code est structuré selon les principes du Domain-Driven Design pour permettre de brancher facilement un backend **PocketBase** sans modifier les composants ni la logique de présentation :

```
src/app/
├── core/
│   ├── models/
│   │   ├── dtos/          # DTOs (contrats de données brutes / PocketBase RecordModel)
│   │   └── entities/      # Entités Domaine pures avec méthodes de calcul métier
│   ├── mappers/           # Mappers DTO <-> Entity
│   ├── repositories/      # Interfaces de Repository & Tokens d'injection
│   │   └── json/          # Implémentations JSON actuelles (via httpResource / rxResource)
│   ├── services/          # Façades & Services (ApartmentService, BookingSimulator...)
│   └── transloco/         # Chargeur et configuration Transloco
├── shared/
│   ├── motion/            # Directives WAAPI Motion (press, scroll, hover)
│   ├── view-models/       # ViewModels typés pour chaque bloc de page
│   └── components/
│       ├── dynamic-renderer/ # Moteur de rendu dynamique via ng-template / ngTemplateOutlet
│       ├── navbar/
│       ├── footer/
│       ├── lightbox/
│       ├── weather-widget/
│       └── icon/
└── features/              # Blocs de fonctionnalités (Hero, Apartment, Gallery, Pricing...)
```

### 🔌 Comment brancher PocketBase plus tard ?

1. Installez le SDK PocketBase :
   ```bash
   npm install pocketbase
   ```
2. Créez un nouveau repository (ex: `PocketBaseApartmentRepository`) implémentant `ApartmentRepository` :
   ```typescript
   @Injectable({ providedIn: 'root' })
   export class PocketBaseApartmentRepository implements ApartmentRepository {
     private pb = new PocketBase('https://votre-pocketbase-url.com');

     getApartment(): Observable<Apartment> {
       return from(this.pb.collection('apartments').getOne('...')).pipe(
         map(record => ApartmentMapper.toEntity(record as any))
       );
     }
   }
   ```
3. Dans `src/app/app.config.ts`, remplacez simplement le provider :
   ```typescript
   { provide: APARTMENT_REPOSITORY, useClass: PocketBaseApartmentRepository }
   ```
4. C'est tout ! Les View Models, les `ng-template` et l'interface utilisateur continuent de fonctionner sans aucune modification.

---

## 🚀 Commandes Utiles

### Démarrer le serveur de développement
```bash
npm start
# Le site est accessible sur http://localhost:4200/
```

### Lancer les tests unitaires (Vitest)
```bash
npm test -- --watch=false
```

### Compiler pour la production
```bash
npm run build
```

---

## 📦 Déploiement sur GitHub Pages

Le projet inclut un workflow GitHub Actions automatisé dans `.github/workflows/deploy.yml`.
Dès qu'un commit est poussé sur la branche `main`, le site est automatiquement compilé et déployé sur GitHub Pages.
