# REST-API

Inlämningsuppgift REST-API

### Repo: https://github.com/Cajolina/REST-API

### Beskrivning av projekt:

Det här är en mindre applikation för en digital kontaktbok. På backenden har API:et funktionalitet för CURD och har endpoints för GET, POST, PUT och DELETE. Där går det att testköra dessa endpoints i min .rest-fil.  
På klientsidan (frontend) så hämtas och renderas kontakter ut där du kan lägga till, uppdatera, ta bort kontakter och söka efter specifika kontaker, detta uppdateras i vår json-fil som är istället för en databas.

### Hur applikationen byggts & körs:

Har använt git och github, men även gjort issues för att planera upp projektet och dela upp olika moment för att bryta ner och kunna se tydligare vad som ska göras.
För att kunna köra denna applikation måste du:

1. npm install för att installera dependencies :
   express
   cors (för golive)
   uuid

2.nodemon index.js eller npm start - för att starta servern(terminalen)

3.Gå in i din webbläsare på localhost:3000

4. Gå in på test.rest i backenden för att testa endpointsen i filen.
   Lägg till Rest Client extension i VScode

### Jag har satsat på VG.

### Krav uppfyllda:

Krav uppfyllda för godkänt:

Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)
All data skall vara sparad i en JSON-fil
Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort
APIét ska svara med 404 om datan saknas.
Git & GitHub har använts
Projektmappen innehåller en README.md fil
Uppgiften lämnas in i tid!

Krav uppfyllda för Väl Godkänt:
Alla punkter för godkänt är uppfyllda
Ett klient-gränssnitt skall byggas för att anropa API:ets alla olika endpoints och presentera datan, redigeringsformulär skall fyllas i med befintlig information.
Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt
