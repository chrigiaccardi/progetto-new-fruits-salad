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
![Schermata principale](link)

### Card frutta con valori nutrizionali
![Card frutta con valori nutrizionali]()

### Elenco filtri select
![Elenco filtri select]()

### Dialog Aggiungi Nuovo Frutto
![Dialog Aggiungi NUovo Frutto]()

### Macedonia completa di frutti e total valori nutrizionali
![Macedonia completa di frutti e total valori nutrizionali]()

### Modalità Mobile Responsive
![Modalità Mobile Responsive]()

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
- **Dialog Aggiungi Nuovo Frutto**: Il dialog si compone di un form dove inserire tutti i dati richiesti dal backend, e del bottone Submit per l'invio dei dati e la richiesta di aggiunta del frutto


