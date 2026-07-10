# 🍓 Fruits Salad Mix 🍊

## 🗂️ Indice

- [Descrizione](#-descrizione)
- [Screenshot Applicazione](#-screenshot-applicazione)
- [Funzionlità dell'applicazione](#-funzionalità-dellapplicazione)
- [Tecnologie e librerie utilizzate](#-tecnologie-e-librerie-utilizzate)
- [Prerequisiti](#-prerequisiti)
- [Installazione e Configurazione](#-installazione-e-configurazione)
- [Struttura Del Progetto](#-struttura-del-progetto)
- [Contatti](#-contatti)

---

## 📜 Descrizione

**Fruits Salad Mix** nasce dalll'idea di creare un calcolatore per la propria macedonia, dove, tramite i valori nutrizionali di ogni frutti, possiamo capire quanto la nsotra macedonia possa portare benefici o no al nostro corpo.
La Dashboard è stata sviluppata con Angular in modalità SPA (Single Page Application).

L'applicazione permette agli utenti di:
- Visualizzare la lista di frutti disponibili;
- Visualizzare i valori nutrizionali di ogni frutto;
- Aggiungere il frutto desiderato alla macedonia;
- Visualizzare il contenuto della macedonia con il totale di valori nutrizionali;
- Cancellare il frutto non desiderato dalla macedonia con conseguente aggiornamento dei valori nutrizionali;
- Aggiungere un nuovo frutto alla lista tramite dialog apposito con conseguente approvazione da parte degli amministratori del backend;
- Filtrare la lista frutti tramite Select dedicati nella sidenav laterale (Famiglia, Ordine e Genere);
- Ricercare il frutto tramite la barra di ricerca;
- Apertura e chiusura sidenav laterale in modalità Mobile

---

## 📷 Screenshot Applicazione

### Schermata Principale
![Schermata principale](./public/screenshot/dashboard.png)

### Card frutta con valori nutrizionali
![Card frutta con valori nutrizionali](./public/screenshot/card-frutta.png)

### Elenco filtri select
![Elenco filtri select](./public/screenshot/filtri-select.png)

### Dialog Aggiungi Nuovo Frutto
![Dialog Aggiungi Nuovo Frutto](./public/screenshot/dialog-nuovo-frutto.png)

### Macedonia completa di frutti e total valori nutrizionali
![Macedonia completa di frutti e total valori nutrizionali](./public/screenshot/macedonia-con-frutti.png)

### Modalità Mobile Responsive
![Modalità Mobile Responsive](./public/screenshot/mod-mobile-dashboard.png)

---

## 🛠️ Funzionalità dell'applicazione

### 1. Dashboard Principale

- **Lista Frutta**: La lista frutta viene caricata direttamente all'apertura dell'applicativo;
- **Frutta Card**: La Card singola di ogni frutto viene riempita da tutti i dati che arrivano dal backend come nome, ID, famiglia, genere e ordine. Troviamo anche una sezione dedicata ai valori nutrizionali che si apre e chiude con un bottone apposito. Con il bottone Aggiungi invece l'utente può aggiungere il seguente frutto alla macedonia;
- **Macedonia**: All'apertura dell'applicaizone la sezione macedonia viene presentata semi-trasparente per poi colorarsi all'ingresso del 1o frutto. Ogni frutto inserito crea una chips che visualizza il nome e un'icona X per eliminare il frutto dalla macedonia. In automatico si crea una sezione valori nutrizionali con il totale di tutti i frutti presenti in essa;
- **Barra di Ricerca**: La barra di input posta in alto aiuta l'utente per la ricerca del frutto desiderato, di conseguenza la lista frutti verrà filtrata e aggiornata;
- **Filtri Select**: Nella sidenav Laterale si trovano i filtri select per famiglia, genere e ordine. Gli elenchi vengono creati dinamicamente dai dati presi dai frutti in arrivo dal backend senza ripetizioni;
- **Tasto Reset Filtri**: Il tasto reset riporta tutti i valori dei filtri al proprio stato iniziale;
- **Tasto + Nuovo Frutto**: Il tasto + Nuovo Frutto apre un dialog apposito dove compilare una serie di dati richiesti per l'inserimento di un nuovo frutto nella lista. Il frutto non verrà immediatamente visualizzato visto che deve essere prima approvato dagli amministratori dell'API pubblica FruityVice;

### 2. Dialog Aggiungi Frutto
- Il dialog si compone di un form, dove inserire tutti i dati richiesti dal backend, e del bottone Submit per l'invio dei dati e la richiesta di aggiunta del frutto.

---

## ♻️ Tecnologie e librerie Utilizzate

### 1. Framework e Linguaggi

| Tecnologia | Versione | Descrizione |
|------------|-----------|------------|
| **Angular** | 21.2.2 | Framework principale per lo sviluppo frontend |
| **TypeScript** | 5.9.3 | Linguaggio di programmazione con tipizzazione |
| **HTML 5** | - | Markup per la struttura delle pagine|
| **Tailwind** | 4.1.12 | Framework per lo stile |

### 2. Librerie UI e Component

| Libreria | Versione | Utilizzo nell'App |
|------------|-----------|------------|
| **@angular/material** | 21.2.14 | Componenti UI Material Design (cards, bottoni, dialog, ecc.) |
| **@angular/cdk** | 21.2.14 | Component Development Kit | 
| **@ngxpert/hot-toast** | 6.3.0 | Libreria di toast notification per Angular | 

### 3. Forms

| **@angular/forms** | 21.2.0 | Gestione dei form reattivi e validazione degli stessi|

### 4. HTTP e State Management

| Libreria | Versione | Utilizzo nell'App |
|------------|-----------|------------|
| **@angular/common/http** | 21.2.0 | HttpClient per le chiamate API |
| **@ngrx/signals** | 21.1.1 | SignalStore per una gestione dello stato moderna basata sui signals|
| **RxJS** | 7.8.0 | Programmazione reattiva per la gestione asincrona

### 5. Testing

| Libreria | Versione | Utilizzo nell'App |
|------------|-----------|------------|
| **Vitest** | 4.1.10 | Test runner e framework con sintassi compatibile Jest, usato per scrivere ed eseguire tutti i test dell'applicazione |

### 6. Build e Development

| Libreria | Versione | Utilizzo nell'App |
|------------|-----------|------------|
| **@angular/cli** | 21.2.0 | CLI per lo sviluppo |
| **@angular/build** | 21.2.2 | Sistema di Build |

---

## 🧩 Installazione e Configurazione

### 1. Clonare il Repository

```bash
# Clona il repository
git clone <url-del-repository>

# Entra nella Directory del progetto
cd progetto-new-fruits-salad
```
### 2. Istallare le dipendenze

```bash
# Installa tutte le dipendenze npm
npm install
```

Questo comando installerà tutte le librerie elencate in `package.json` nella cartella `node_modules/`.

**Tempo stimato**: 2-5 minuti (dipende dalla velocità della connessione)

### 3. Avviare l'Applicazione

```bash
# Avvia il server di sviluppo
ng serve
```

L'applicazione sarà disponibile su: **http://localhost:4200/**

Il server si riavvierà automaticamente quando modifichi i file sorgente (Hot Reload).

### 6. Testing

L'applicazione utilizza **Vitest** sia come linguaggio di scrittura dei test (sintassi `describe`, `it`, `expect`) sia come test runner.

```bash
# Esegue tutti i test una volta
npm run test

# Esegue in watch mode (ri-esegue al cambio file)
npm run test:watch

# Oppure
ng test
ng test --include #url singolo file da testare

# Test secco senza watch mode
ng test --watch=false
```

### Copertura attuale

- **11 file di test**
- **26 test totali**
- Componenti, servizi, store
- Tutte le funzionalità principali sono testate

Vitest è compatibile con Jest, ma molto più veloce grazie all'integrazione con Vite.

![Screenshot Testing](./public/screenshot/testing.png)

---

## 📂 Struttura Progetto

```
├── .angular
├── public
│   ├── screenshot
│   │   ├── card-frutta.png
│   │   ├── dashboard.png
│   │   ├── dialog-nuovo-frutto.png
│   │   ├── filtri-select.png
│   │   ├── macedonia-con-frutti.png
│   │   ├── mod-mobile-dashboard.png
│   │   └── testing.png
│   ├── favicon.ico
│   ├── gruppo-di-frutta.png
│   ├── icons8-carboidrati-96.png
│   ├── icons8-carne-96.png
│   ├── icons8-cibo-per-suini-96.png
│   ├── icons8-energia-calorica-96.png
│   └── icons8-zucchero-96.png
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── models
│   │   │   │   └── frutto.ts
│   │   │   ├── services
│   │   │   │   ├── api-fruits-service
│   │   │   │   └── breakpoint
│   │   │   │       ├── breakpoint-screen.spec.ts
│   │   │   └── store
│   │   │       └── fruitsStore.ts
│   │   ├── features
│   │   │   ├── sidenav-content
│   │   │   │   ├── components
│   │   │   │      ├── frutta-card
│   │   │   │      ├── header
│   │   │   │      │   ├── components
│   │   │   │      │         └── aggiungi-frutto-dialog
│   │   │   │      ├── lista-frutti
│   │   │   │      └── macedonia-card
│   │   │   └── sidenav-lat
│   │   ├── app.config.ts
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.spec.ts
│   │   └── app.ts
│   ├── index.html
│   ├── main.ts
│   ├── material-theme.scss
│   └── styles.css
├── .editorconfig
├── .gitignore
├── .postcssrc.json
├── .prettierrc
├── README.md
├── angular.json
├── package-lock.json
├── package.json
├── proxy.conf.json
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```
---

## 📩 Contatti

Christian Giaccardi - 📧 [chrigiaccardi@gmail.com](mailto:chrigiaccardi@gmail.com) <br>
GitHub - [chrigiaccardi](https://github.com/chrigiaccardi) <br>
LinkedIn - [LinkedIn](https://it.linkedin.com/in/christian-giaccardi-753085180?trk=public_profile_browsemap_profile-result-card_result-card_full-click)