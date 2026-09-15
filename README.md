# Lerchenfelder · Büro

Interaktive, geschützte Büro-Vorschau für GitHub Pages.

Nach Eingabe des separat geteilten Passworts lässt sich das Modell drehen, vergrößern und aus vier Blickwinkeln ansehen. Screenshots werden direkt als PNG heruntergeladen.

Unter `#aufgaben` liegt eine gemeinsame Aufgabenliste für den Bezug des Büros, unter `#einkauf` die Einkaufsliste für Netzwerk und Technik mit Summe, unter `#kosten` die laufenden Kosten mit Summe brutto und netto und der Aufteilung auf die beiden Firmen. Alle, die das Passwort kennen, können alle drei bearbeiten; die Einträge liegen in einer kleinen Firebase-Datenbank, deren Adressen nur in der verschlüsselten Ansicht stehen.

## Veröffentlichung

GitHub Pages: Branch `main`, Ordner `/ (root)`. Die Website wird ohne Server und ohne Build auf GitHub betrieben. `.nojekyll` ist enthalten.

Seiteninhalt und 3D-Modell sind mit AES-256-GCM verschlüsselt. Der Schlüssel wird im Browser mit PBKDF2-SHA-256 und 600.000 Durchläufen aus dem eingegebenen Passwort abgeleitet. Das Passwort und die unverschlüsselten Originalmodelle sind nicht im Repository enthalten. Der Schlüssel wird weder übertragen noch dauerhaft gespeichert; nach erneutem Laden wird das Passwort wieder benötigt.

Dies ist ein Schutz im Browser, keine serverseitige Benutzerverwaltung. Wer das Passwort kennt, kann die Inhalte entschlüsseln. Die Seite benötigt HTTPS und einen aktuellen Browser mit WebGL 2 und Web Crypto.

## Quellen

Die Raum- und Tischmodelle wurden vom Eigentümer bereitgestellt. Pflanzen und Bodentextur stammen von [Poly Haven](https://polyhaven.com/license) (CC0): [Pachira aquatica 01](https://polyhaven.com/a/pachira_aquatica_01), [Potted plant 02](https://polyhaven.com/a/potted_plant_02) und [Wood floor](https://polyhaven.com/a/wood_floor). Weitere Einrichtung wurde für diese Szene modelliert. Der Betrachter nutzt Three.js 0.186.0, MIT-Lizenz; siehe `THREE-LICENSE.txt`.
