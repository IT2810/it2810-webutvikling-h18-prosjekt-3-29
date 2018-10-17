#### Prosjekt 3 i IT2810

### Avhengigheter

- Expo
- jest
- react-native-maps
- react-native-checkboxes
- react-native-dialog
- react-native-progress
- native-base


### Før første bruk

For at kartet skal fungere korrekt på Android-telefonener, skru på Lokasjonstjenester og sett dem til "høy nøyaktighet" under Innstillinger -> Tilkoblinger -> Posisjon. Applikasjonen vil spørre alle enheter om tillatelse til å bruke plasseringstjenester, men for Android 6 er det nødvendig å aktivere `LocationServices`i tillegg. Det er lagt inn en sjekk for dette i kildekoden, og applikasjonen skal i utgangspunktet også legge til denne tilgangen på egen hånd, men dette har vist seg ikke alltid å fungere. 

### Funksjonalitet

Applikasjonen er ment å være en Personal Information Manager for studenter. Alle funksjonene i applikasjonen er utformet som et spill, i håp om at dette formatet øker motivasjonen til å konsentrere seg om studiene. Følgende funksjonalitet er implementert;

- Pomodoro : En spesialstoppeklokke basert på Pomodoroprinsippet. Denne funksjonaliteten er en form for intervall: du har 25 minutter hvor du skal for eksempel lese, og så 5 minutter pause. For hver pomodorosykel får man poeng (exp). 

- TodoList : En huskeliste som lar deg lage, slette og huke av gjøremål i form av checkboxes. For hvert fullførte gjøremål blir man tildelt poeng (exp) 

- Focus Map : Et kart som viser deg din nåværende posisjon og gir deg poeng (exp) når du befinner deg på campus Gløshaugen.

- Achievements : En oversiktsside som viser hvor mange poeng du har i form av "experience points". X antall points øker brukerens nåværende nivå (level). 


### Teknologi

Applikasjonen er utviklet med Expo og React Native (Se "Avhengigheter" for fullstendig liste). Alt av data som lagres på enheten lagres via AsyncStorage, som var et prosjektkrav. Når det gjelder eksempel som skal vise noe utover basic React Native UI-problematikk har vi valgt å implementere et kart i applikasjonen. Her får brukeren belønning (poeng/xp) om den er på samme sted over lengre tid. 

## Valg og løsninger (komponenter, tredjepartskomponenter og rammeverk)

Vi har underveis i utviklingen tatt flere valg rundt hvordan vi skal organisere prosjektet med tanke på hvilke komponenter vi ønsket å organisere koden i. Valgene våre ble tatt på grunnlag av at det skal være så oversiktlig og ryddig som mulig. 

Under er et diagram som viser oversikt over komponentene som tilhører Todo. 

<img width="252" alt="erreafres" src="https://user-images.githubusercontent.com/22234149/47081586-55c13a00-d20b-11e8-8e25-9c0363b271ba.PNG">

Vi har under utviklingen brukt flere tredjepartskomponenter og rammeverk. Dette har vi gjort først og fremst fordi det sparer mye arbeidstid i utviklingen, men også fordi vi opplever at koden ofte ser mer oversiktlig og tydelig ut.

- React-native-dialog: når man fjerner et element i todo, så får man opp en popup hvor man enten på bekrefte eller avkrefte at man vil fjerne elementet. Til denne popupen har vi brukt react-native-dialog, som gjør tilbyr ferdige komponenter for å kunne lage en slik popup. Vi valgte å bruke denne fordi den tilbyr og dekker all funksjonalitet som vi trenger.

- React-native-checkboxes: vi valgte denne tredjepartskomponenten fordi det gjorde det lettere å lage sjekkbokser med tilhørende tekst. 

- native-base: dette er et rammeverk som gjør stylingen enklere ved at det tilbyr komponenter og stylingattributter som er universell for både iOS og Andriod. Dette vil si at vi kunne bruke de samme komponentene og stylingen på elementer uten å være bekymret for om den ikke er kompitabel med alle krevde enheter. 

- React-native-maps: 

## Utviklingsmetode

Vi har utviklet applikasjonen ved hjelp av issue-tracking på Github. Siden prosjektet hadde kort varighet var det nødvendig med hyppige møter, og vi har hatt totalt Y programmeringsøkter i fellesskap. I tillegg til dette har vi kontinuerlig holdt kontakten via gruppens kommunikasjonskanal. Alle commits har blitt knyttet til Issues, og vi har på den måten utviklet en hierarkisk struktur over hele utviklingsløpet. Arbeidsfordelingen har vært jevn, da vi primært har hatt ansvaret for hver vår kjernefunksjonalitet. 

Vi har brukt issues på github for oversikt over arbeid og oppgaver, og vi har utarbeidet issues i fellesskap. Det vil si at alle hadde en felles forståelse av hva som inngikk i hvert issue. 

## Gruppas valg av teknologi

*her skal det være tutorial*

### Testing

Prosjektet har blitt enhetstestet ved hjelp av testrammeverket Jest. For å kjøre testbatteriet, åpne en terminal i prosjektets rotmappe og kjør `npm test`. 



