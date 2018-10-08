### Prosjekt 3 i IT2810

### Avhengigheter

- Expo
- react-native-maps
- jest
- react-native-checkboxes


### Før første bruk

For at kartet skal fungere korrekt på Android-telefonener, skru på Lokasjonstjenester og sett dem til "høy nøyaktighet" under Instillinger -> Tilkoblinger -> Posisjon. Applikasjonen vil spørre alle enheter om tillatelse til å bruke plasseringstjenester, men for Android 6 er det nødvendig å aktivere `LocationServices`i tillegg. Det er lagt inn en sjekk for dette i kildekoden, og applikasjonen skal i utgangspunktet også legge til denne tilgangen på egen hånd, men dette har vist seg ikke alltid å fungere. 

### Funksjonalitet

Applikasjonen er ment å være en Personal Information Manager for studenter. Alle funksjonene i applikasjonen er utformet som et spill, i håp om at dette formatet øker motivasjonen til å konsentrere seg om studiene. Følgende funksjonalitet er implementert;

- Pomodoro : En spesialstoppeklokke basert på Pomodoroprinsippet, for hver pomodorosykel får man poeng (exp)

- TodoList : En huskeliste som lar deg lage, slette og huke av gjøremål i form av checkboxes. For hvert fullførte gjøremål blir man tildelt poeng (exp) 

- Focus Map : Et kart som viser deg din nåværende posisjon og gir deg poeng (exp) når du befinner deg på skolen (Gløshuagen).

- Achievements : En oversiktsside som viser hvor mange poeng du har i form av "experience points". X antall points øker brukerens nåværende nivå (level). 

Applikasjonen er ment å være en beta-versjon på noe som kunne vært et fullstendig produkt. Kravene til prosjektet tilfredsstilles ved at brukerene kan legge til nye todo-oppgaver og gjennomføre pomodorosykler. Focus Map-funksjonaliteten møter kravet om å utvikle noe utover vanlig React Native-problematikk. 

### Teknologi

Applikasjonen er utviklet med Expo og React Native (Se "Avhengigheter" for fullstendig liste). Alt av data som lagres på enheten lagres via AsyncStorage, som var et prosjektkrav. 

### Utviklingsmetode

Vi har utviklet applikasjonen ved hjelp av issue-tracking på Github. Siden prosjektet hadde kort varighet var det nødvendig med hyppige møter, og vi har hatt totalt Y programmeringsøkter i fellesskap. I tillegg til dette har vi kontinuerlig holdt kontakten via gruppens kommunikasjonskanal. Alle commits har blitt knyttet til Issues, og vi har på den måten utviklet en hierarkisk struktur over hele utviklingsløpet. Arbeidsfordelingen har vært jevn, da vi primært har hatt ansvaret for hver vår kjernefunkjsonalitet. 

### Testing

Prosjektet har blitt enhetstestet ved hjelp av testrammeverket Jest. For å kjøre testbatteriet, åpne en terminal i prosjektets rotmappe og kjør `npm test`. 
