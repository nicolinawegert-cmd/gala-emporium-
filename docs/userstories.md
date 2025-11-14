# User Stories – Gala Emporium

Detta dokument beskriver krav och funktioner i Gala Emporiums webbplats, strukturerat som user stories med tydliga Done-kriterier.

---

# Besökare

## **S1. Som besökare vill jag kunna se kommande evenemang samlat på förstasidan, så att jag kan planera vad jag ska gå på.**
### **Done-kriterier**
- Evenemangen hämtas från JSON-servern.
- Visas i en sorterad lista (datumordning).
- Datum, titel och klubb framgår tydligt.
- Visar endast framtida evenemang.
- Fungerar på både mobil och desktop.

---

## **S2. Som besökare vill jag kunna gå in och läsa om varje klubb, så att jag kan förstå vad som skulle kunna tilltala mig.**
### **Done-kriterier**
- Varje klubb har en egen sida.
- Klubbsidan hämtar data från API (namn, beskrivning).
- Innehåller minst en informativ beskrivning.
- Innehåller minst några visuella element (bild, färgtema etc).
- All text är läsbar och följer WCAG-kontrast.

---

## **S3. Som besökare vill jag kunna klicka på ett evenemang och se detaljer (bild, beskrivning, datum, klubb).**
### **Done-kriterier**
- Varje eventkort innehåller titel, datum och och bild för vissa klubbar.
- Mer info visas via `details`/`summary` eller motsvarande.
- Bilder har relevanta alt-texter.
- Innehållet hämtas dynamiskt från API.

---

## **S4. Som besökare vill jag kunna för­boka biljetter via ett formulär, så att jag får en bekräftelse.**
### **Done-kriterier**
- Bokningsformulär finns och är validerat (klient-side).
- Användaren får ett bokningsnummer.
- Bokningen sparas i `localStorage`.
- En bekräftelseruta visas direkt på sidan.

---

## **S5. Som besökare vill jag kunna avboka min bokning genom att ange mitt bokningsnummer, så att jag kan ändra mig.**
### **Done-kriterier**
- Sidan innehåller ett avbokningsformulär.
- Användaren skriver in sitt bokningsnummer.
- Bokningen tas bort från `localStorage`.
- Tydligt felmeddelande visas om bokningen inte finns.
- Lyckad avbokning ger en tydlig bekräftelse.

---

## **S6. Som besökare vill jag att bokningssidan automatiskt ska fylla i rätt klubb och rätt event, så att bokningen går snabbare och jag slipper välja två gånger.**
### **Done-kriterier**
- Klick på "Book Event" på en klubbsida:
  - sparar klubb-ID och event-ID i `localStorage`.
- Bokningssidan:
  - läser värdena från `localStorage`,
  - väljer rätt klubb automatiskt,
  - fyller eventlistan för den klubben,
  - markerar rätt event automatiskt.
- Prefill fungerar på **alla klubbars sidor**.

---

## **S7. Som besökare vill jag kunna boka ett evenemang direkt från klubbens sida, så att jag slipper hitta det manuellt på bokningssidan.**
### **Done-kriterier**
- Varje eventkort på alla klubbsidor har en "Book Event"-knapp.
- Knappen fungerar oavsett klubb (Jazz, Pulse, Giggle, Rally).
- Knappen leder till `#booking`.
- Prefill enligt S6 fungerar.

---

## **S8. Som besökare vill jag att webbplatsen fungerar bra på mobil.**
### **Done-kriterier**
- Layouten är responsiv med media queries.
- Navigationen fungerar på mobil.
- Eventkort reflowar till en kolumn på små skärmar.
- Inga horisontella scrollbars förekommer.
- Touch-element (knappar, länkar) har tillräcklig klickyta.

---

# Klubb-arrangör

## **S1. Som klubb-arrangör vill jag kunna presentera min klubb i en särskild stil som skiljer ut den från mängden.**
### **Done-kriterier**
- Varje klubb har unika färger, typografi och layout.
- Eget CSS-tema via body-klass (`.the-pulse-room`, `.jazz-corner` etc).
- Responsiv och användarvänlig design per klubb.
- Grafisk stil tydligt anpassad efter klubbens identitet.

---

## **S2. Som klubb-arrangör vill jag kunna skapa evenemang för min klubb, så att besökare lättare kan hitta vad som intresserar dem.**
### **Done-kriterier**
- Adminsidan innehåller ett formulär för att skapa event.
- Event sparas i JSON-servern via POST.
- Evenemang visas direkt på rätt klubbsida.
- Formuläret valideras innan POST skickas.

---

## **S3. Som klubb-arrangör vill jag kunna låta besökare förboka till min klubb, så att de kan få ett bokningsnummer som de kan använda vid entré.**
### **Done-kriterier**
- Bokningssystemet är tillgängligt från alla klubbsidor.
- Bokningsnummer genereras slumpmässigt.
- Bokningar sparas korrekt i `localStorage`.
- Användaren får en tydlig bekräftelse.

---

## **S4. Som klubb-arrangör vill jag kunna redigera och ta bort evenemang.**
### **Done-kriterier**
- Funktionaliteten är antingen:
  - Implementerad (PUT & DELETE till JSON-servern), **eller**
  - Dokumenterad som framtida backlogpunkt.
- Om funktion finns:
  - Event kan uppdateras via adminpanelen.
  - Event kan tas bort.
  - UI uppdateras utan omladdning.

---

