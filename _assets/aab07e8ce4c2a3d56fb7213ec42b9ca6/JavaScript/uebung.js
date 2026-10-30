// Übung: Das Handy stellt den Ablauf bei Doctolib und medflex nach. Jeder Fall hat seinen eigenen Weg.
// Jeder Bildschirm besteht aus echten Elementen: Markierungen sitzen dadurch immer richtig,
// und ein Haken oder eine Auswahl erscheint erst, wenn man getippt hat. Eingaben sind fest vorgegeben,
// niemand tippt echte Daten ein, und nichts verlässt die Seite.
(function () {
  var en = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
  function L(de, eng) { return en ? eng : de; }

  var DOCTOLIB = 'https://www.doctolib.de/gemeinschaftspraxis/ochtrup/gemeinschaftspraxis-gesenhues-partner';
  var MEDFLEX = 'https://arzt.medflex.de/kontakt/allgemeinmedizin/ochtrup/gemeinschaftspraxis-gesenhues-partner/qxwqeg';
  var MEDFLEX_LOGIN = 'https://app.medflex.de/patient';
  var PRAXIS = 'Gemeinschaftspraxis Gesenhues & Partner';

  // ---------- Doctolib: Bildschirme ----------
  function d(kopf, teile, schritte) { return { thema: 'doctolib', kopf: kopf, teile: teile, schritte: schritte }; }
  var buchen = 'Buchen Sie einen Termin';
  var dCookies = d('Doctolib', [
    ['h', 'Informationen zum Einsatz von Cookies'],
    ['p', 'Doctolib verwendet Cookies und ähnliche Technologien.'],
    ['knopf', 'erlauben', 'ERLAUBEN'],
    ['knopf', 'ablehnen', 'ABLEHNEN']
  ], [['ablehnen', L('Cookie-Hinweis schließen', 'Close the cookie notice'), L('Tippen Sie auf <strong>„ABLEHNEN“</strong>. Buchen können Sie trotzdem.', 'Tap <strong>“ABLEHNEN”</strong> (decline). You can still book.')]]);
  var dProfil = d('Doctolib', [
    ['h', PRAXIS], ['p', 'Gemeinschaftspraxis · Ochtrup und Gronau-Epe'],
    ['knopf', 'buchen', 'TERMIN BUCHEN']
  ], [['buchen', L('Buchung starten', 'Start booking'), L('Tippen Sie auf den blauen Knopf <strong>„TERMIN BUCHEN“</strong>.', 'Tap the blue button <strong>“TERMIN BUCHEN”</strong> (book an appointment).')]]);
  var dFach = d(buchen, [
    ['h', 'Fachgebiet wählen'],
    ['zeile', 'hausarzt', 'Hausarzt / Allgemeinmediziner'],
    ['zeile', 'mfa', 'Medizinischer Fachangestellter (MFA)']
  ], [['hausarzt', L('Fachgebiet wählen', 'Choose the specialty'), L('Tippen Sie auf <strong>„Hausarzt / Allgemeinmediziner“</strong>.', 'Tap <strong>“Hausarzt / Allgemeinmediziner”</strong> (GP).')]]);
  function dFrage(neu) {
    return d(buchen, [
      ['h', 'Haben Sie eine:n Ärzt:in oder Therapeut:in dieses Fachgebiets in dieser Einrichtung bereits besucht?'],
      ['p', 'Die Frage bezieht sich auf die Person, die den Termin wahrnimmt.'],
      ['zeile', 'ja', 'Ja'], ['zeile', 'nein', 'Nein']
    ], [neu
      ? ['nein', L('Frage zum ersten Besuch', 'First visit question'), L('Sie waren noch nicht bei uns. Tippen Sie auf <strong>„Nein“</strong>.', 'You have not been to us before. Tap <strong>“Nein”</strong> (no).')]
      : ['ja', L('Frage zum ersten Besuch', 'First visit question'), L('Sie waren schon bei uns. Tippen Sie auf <strong>„Ja“</strong>.', 'You have been to us before. Tap <strong>“Ja”</strong> (yes).')]]);
  }
  var dStandort = d(buchen, [
    ['h', 'Wählen Sie einen Standort für die Sprechstunde'],
    ['zeile', 'egal', 'Ich habe keine Präferenz', 'Alle Verfügbarkeiten anzeigen'],
    ['zeile', 'ochtrup', PRAXIS, 'Marktpl. 1, 48607 Ochtrup'],
    ['zeile', 'epe', 'Gronau-Epe', 'Markusstraße 10, 48599 Gronau (Westfalen)']
  ], [['ochtrup', L('Standort wählen', 'Choose the location'), L('Wählen Sie, wo Sie hinmöchten. In dieser Übung ist das <strong>Ochtrup</strong>.', 'Choose where you want to go. In this exercise, that is <strong>Ochtrup</strong>.')]]);
  function dVersicherung(privat) {
    return d(buchen, [
      ['h', 'Wählen Sie Ihre Versicherung'],
      ['zeile', 'g', 'Gesetzlich versichert'], ['zeile', 'p', 'Privat versichert']
    ], [privat
      ? ['p', L('Versicherung wählen', 'Choose your insurance'), L('Tippen Sie auf <strong>„Privat versichert“</strong>.', 'Tap <strong>“Privat versichert”</strong> (private insurance).')]
      : ['g', L('Versicherung wählen', 'Choose your insurance'), L('In dieser Übung tippen Sie auf <strong>„Gesetzlich versichert“</strong>. Privat Versicherte wählen die Zeile darunter.', 'In this exercise, tap <strong>“Gesetzlich versichert”</strong> (statutory). Privately insured patients choose the line below.')]]);
  }
  var dKategorie = d(buchen, [
    ['h', 'Wählen Sie eine Kategorie für Ihren Termin'],
    ['zeile', 'termin', 'Terminsprechstunde'], ['zeile', 'chiro', 'Chirotherapie'], ['zeile', 'akut', 'Akut- und Infektsprechstunde'], ['zeile', 'sport', 'Sportmedizin']
  ], [['termin', L('Kategorie wählen', 'Choose a category'), L('Für einen geplanten Termin tippen Sie auf <strong>„Terminsprechstunde“</strong>. Wenn Sie krank sind, wählen Sie die Akut- und Infektsprechstunde.', 'For a planned appointment, tap <strong>“Terminsprechstunde”</strong>. If you are ill, choose the acute and infection clinic.')]]);
  var dArt = d(buchen, [
    ['h', 'Wählen Sie die Terminart'],
    ['zeile', 'befund', 'Befundbesprechung Facharzt'], ['zeile', 'sprech', 'Sprechstunde']
  ], [['sprech', L('Terminart wählen', 'Choose the appointment type'), L('Tippen Sie auf <strong>„Sprechstunde“</strong>.', 'Tap <strong>“Sprechstunde”</strong> (consultation).')]]);
  var dArzt = d(buchen, [
    ['h', 'Wählen Sie eine/n Ärzt:in oder Therapeut:in'],
    ['zeile', 'egal', 'Ich habe keine Präferenz', 'Alle Verfügbarkeiten anzeigen'],
    ['zeile', 'a1', 'Herr Dr. med. Sebastian Gesenhues', 'Hausarzt / Allgemeinmediziner'],
    ['zeile', 'a2', 'Frau Dr. med. Anne Gesenhues', 'Hausarzt / Allgemeinmediziner']
  ], [['egal', L('Ärztin oder Arzt wählen', 'Choose a doctor'), L('Ist es Ihnen egal, tippen Sie auf <strong>„Ich habe keine Präferenz“</strong>. Sonst tippen Sie auf einen Namen.', 'If you do not mind, tap <strong>“Ich habe keine Präferenz”</strong> (no preference). Otherwise tap a name.')]]);
  var dZeit = d(buchen, [
    ['h', 'Wählen Sie einen Termin'],
    ['tag', 'Beispiel: Montag'], ['zeiten', [['z1', '08:10'], ['z2', '09:30'], ['z3', '10:50']]],
    ['tag', 'Beispiel: Dienstag'], ['zeiten', [['z4', '08:30'], ['z5', '11:20'], ['z6', '12:10']]]
  ], [['z2', L('Uhrzeit wählen', 'Choose a time'), L('Tippen Sie auf eine Uhrzeit, die Ihnen passt. In dieser Übung ist das <strong>09:30</strong>.', 'Tap a time that suits you. In this exercise, that is <strong>09:30</strong>.')]]);
  function dKonto(mit) {
    return d('Identifizierung', [
      ['h', 'Registrieren Sie sich oder loggen Sie sich ein'],
      ['p', 'Neu auf Doctolib?'], ['knopf', 'neu', 'REGISTRIEREN'],
      ['p', 'Ich habe bereits ein Doctolib-Konto'], ['knopf', 'alt', 'EINLOGGEN', 'gelb']
    ], [mit
      ? ['alt', L('Einloggen', 'Log in'), L('Sie haben ein Konto. Tippen Sie auf den gelben Knopf <strong>„EINLOGGEN“</strong>.', 'You have an account. Tap the yellow button <strong>“EINLOGGEN”</strong> (log in).')]
      : ['neu', L('Konto anlegen', 'Create an account'), L('Sie brauchen ein Konto. Es kostet nichts. Tippen Sie auf <strong>„REGISTRIEREN“</strong>.', 'You need an account. It is free. Tap <strong>“REGISTRIEREN”</strong> (register).')]]);
  }
  var dEinloggen = d('Einloggen', [
    ['h', 'Geben Sie Ihre E-Mail oder Telefonnummer ein'],
    ['feld', 'mail', 'E-Mail-Adresse oder Telefonnummer', 'erika@beispiel.de'],
    ['knopf', 'weiter', 'Weiter']
  ], [['mail', L('E-Mail eintragen', 'Enter your email'), L('Tippen Sie in das Feld. Hier in der Übung füllt es sich von selbst.', 'Tap the field. In this exercise it fills in by itself.')],
    ['weiter', L('Weiter', 'Next'), L('Tippen Sie auf <strong>„Weiter“</strong>.', 'Tap <strong>“Weiter”</strong> (next).')]]);
  var dPasswort = d('Einloggen', [
    ['h', 'Geben Sie Ihr Passwort ein'],
    ['feld', 'pw', 'Passwort', '••••••••••'],
    ['knopf', 'weiter', 'Weiter']
  ], [['pw', L('Passwort eintragen', 'Enter your password'), L('Tippen Sie in das Feld. Das ist das Passwort, das Sie bei Doctolib gewählt haben.', 'Tap the field. This is the password you chose at Doctolib.')],
    ['weiter', L('Weiter', 'Next'), L('Tippen Sie auf <strong>„Weiter“</strong>.', 'Tap <strong>“Weiter”</strong> (next).')]]);
  var dRegistrieren = d('Registrieren', [
    ['h', 'Registrieren Sie sich bei Doctolib'],
    ['feld', 'mail', 'E-Mail-Adresse oder Telefonnummer', 'erika@beispiel.de'],
    ['knopf', 'weiter', 'Weiter']
  ], [['mail', L('E-Mail oder Handynummer', 'Email or mobile number'), L('Tippen Sie in das Feld. Hier in der Übung füllt es sich von selbst.', 'Tap the field. In this exercise it fills in by itself.')],
    ['weiter', L('Weiter', 'Next'), L('Tippen Sie auf <strong>„Weiter“</strong>.', 'Tap <strong>“Weiter”</strong> (next).')]]);
  var dDaten = d('Registrieren', [
    ['h', 'Ihre Angaben'],
    ['feld', 'code', 'Bestätigungscode', '123456'],
    ['feld', 'pw', 'Passwort wählen', '••••••••••'],
    ['feld', 'name', 'Vor- und Nachname', 'Erika Muster'],
    ['feld', 'geb', 'Geburtsdatum', '01.02.1955'],
    ['knopf', 'weiter', 'Konto erstellen']
  ], [['code', L('Code eintragen', 'Enter the code'), L('Doctolib schickt Ihnen einen Code. Tippen Sie in das Feld.', 'Doctolib sends you a code. Tap the field.')],
    ['pw', L('Passwort wählen', 'Choose a password'), L('Überlegen Sie sich ein Passwort und notieren Sie es an einem sicheren Ort.', 'Think of a password and keep a note of it somewhere safe.')],
    ['name', L('Name', 'Name'), L('Tragen Sie Ihren Namen ein.', 'Enter your name.')],
    ['geb', L('Geburtsdatum', 'Date of birth'), L('Tragen Sie Ihr Geburtsdatum ein.', 'Enter your date of birth.')],
    ['weiter', L('Konto fertig', 'Account done'), L('Tippen Sie auf den Knopf. Das Konto ist damit angelegt.', 'Tap the button. Your account is now set up.')]]);
  var dBestaetigen = d(buchen, [
    ['h', 'Prüfen Sie Ihren Termin'],
    ['liste', ['Sprechstunde', 'Montag, 09:30 Uhr', 'Marktplatz 1, Ochtrup', 'Für: Erika Muster']],
    ['knopf', 'ok', 'TERMIN BESTÄTIGEN']
  ], [['ok', L('Termin bestätigen', 'Confirm the appointment'), L('Stimmt alles? Tippen Sie auf <strong>„TERMIN BESTÄTIGEN“</strong>. Danach bekommen Sie eine Bestätigung.', 'Is everything correct? Tap <strong>“TERMIN BESTÄTIGEN”</strong> (confirm). You then receive a confirmation.')]]);

  // ---------- medflex: Bildschirme ----------
  function m(kopf, teile, schritte) { return { thema: 'medflex', kopf: kopf, teile: teile, schritte: schritte }; }
  var mKopf = 'medflex';
  var wahlListe = [['termin', 'Termin anfragen / ändern'], ['rezept', 'Folgerezept anfragen'], ['frage', 'Frage stellen'], ['befund', 'Befund anfragen / besprechen'], ['ueberw', 'Überweisung anfragen'], ['verbinden', 'Über medflex verbinden']];
  function mHelfen(wert, name) {
    return m(mKopf, [['h', 'Wie können wir Ihnen helfen?']].concat(wahlListe.map(function (w) { return ['wahl', w[0], w[1], 'hilfe']; })).concat([['knopf', 'weiter', 'Weiter', 'aus']]), [
      [wert, L('Anliegen wählen', 'Choose your request'), L('Tippen Sie auf <strong>„' + name + '“</strong>. Für eine Überweisung nehmen Sie „Überweisung anfragen“.', 'Tap <strong>“' + name + '”</strong>. For a referral, choose “Überweisung anfragen”.')],
      ['weiter', L('Weiter', 'Next'), L('Sehen Sie? Der Punkt ist gesetzt, und <strong>„Weiter“</strong> wurde blau. Tippen Sie darauf.', 'See? The dot is set and <strong>“Weiter”</strong> (next) has turned blue. Tap it.')]
    ]);
  }
  var mEmpfaenger = m(mKopf, [
    ['h', 'Wer soll Ihre Anfrage erhalten?'],
    ['wahl', 'ochtrup', 'Praxis Ochtrup', 'ort'], ['wahl', 'epe', 'Praxis Epe', 'ort'],
    ['knopf', 'weiter', 'Weiter', 'aus']
  ], [['ochtrup', L('Praxis wählen', 'Choose the practice'), L('Wählen Sie die Praxis, in der Sie Patient sind. In dieser Übung ist das <strong>Praxis Ochtrup</strong>.', 'Choose the practice where you are a patient. In this exercise, that is <strong>Praxis Ochtrup</strong>.')],
    ['weiter', L('Weiter', 'Next'), L('Tippen Sie auf <strong>„Weiter“</strong>.', 'Tap <strong>“Weiter”</strong> (next).')]]);
  var mPatient = m(mKopf, [
    ['h', 'Bitte bestätigen Sie, dass Sie bereits Patient bei uns sind.'],
    ['p', 'Diese Anfrage können Sie nur als Bestandspatient stellen.'],
    ['haken', 'ja', 'Ja, ich bin bereits Patient'],
    ['knopf', 'ok', 'Bestätigen', 'aus']
  ], [['ja', L('Haken setzen', 'Tick the box'), L('Tippen Sie auf das Kästchen bei <strong>„Ja, ich bin bereits Patient“</strong>.', 'Tap the box next to <strong>“Ja, ich bin bereits Patient”</strong> (yes, I am already a patient).')],
    ['ok', L('Bestätigen', 'Confirm'), L('Der Haken ist da, und der Knopf wurde blau. Tippen Sie auf <strong>„Bestätigen“</strong>.', 'The tick is there and the button has turned blue. Tap <strong>“Bestätigen”</strong> (confirm).')]]);
  var mMedikament = m(mKopf, [
    ['h', 'Welches Medikament brauchen Sie?'],
    ['feld', 'med', 'Medikament und Stärke', 'Ramipril 5 mg'],
    ['feld', 'pack', 'Packungsgröße', 'N3'],
    ['knopf', 'weiter', 'Weiter']
  ], [['med', L('Medikament eintragen', 'Enter the medication'), L('Tippen Sie in das Feld. Den Namen finden Sie auf der Packung.', 'Tap the field. The name is on the packet.')],
    ['pack', L('Packungsgröße', 'Pack size'), L('Tippen Sie in das Feld. Auch das steht auf der Packung.', 'Tap the field. This is on the packet too.')],
    ['weiter', L('Weiter', 'Next'), L('Tippen Sie auf <strong>„Weiter“</strong>.', 'Tap <strong>“Weiter”</strong> (next).')]]);
  var mKontakt = m(mKopf, [
    ['h', 'Wie erreichen wir Sie?'],
    ['feld', 'name', 'Vor- und Nachname', 'Erika Muster'],
    ['feld', 'geb', 'Geburtsdatum', '01.02.1955'],
    ['feld', 'tel', 'Handynummer', '0170 1234567'],
    ['knopf', 'weiter', 'Weiter']
  ], [['name', L('Name', 'Name'), L('Tragen Sie Ihren Namen ein.', 'Enter your name.')],
    ['geb', L('Geburtsdatum', 'Date of birth'), L('Tragen Sie Ihr Geburtsdatum ein.', 'Enter your date of birth.')],
    ['tel', L('Handynummer', 'Mobile number'), L('An diese Nummer geht unsere Antwort.', 'Our reply goes to this number.')],
    ['weiter', L('Weiter', 'Next'), L('Tippen Sie auf <strong>„Weiter“</strong>.', 'Tap <strong>“Weiter”</strong> (next).')]]);
  function mAbsenden(liste) {
    return m(mKopf, [['h', 'Bitte prüfen Sie Ihre Anfrage'], ['liste', liste], ['knopf', 'ok', 'Anfrage absenden']], [
      ['ok', L('Anfrage abschicken', 'Send the request'), L('Stimmt alles? Tippen Sie auf <strong>„Anfrage absenden“</strong>.', 'Is everything correct? Tap <strong>“Anfrage absenden”</strong> (send request).')]
    ]);
  }
  var mStart = m(mKopf, [
    ['nutzer', 'login'],
    ['h', PRAXIS], ['p', 'Allgemeinmedizin · Ochtrup / Epe'],
    ['p', 'Liebe Patient:innen, mit medflex bieten wir Ihnen einen direkten und sicheren Kontakt zu uns.']
  ], [['login', L('Einloggen', 'Log in'), L('Oben steht <strong>„Bereits medflex-Nutzer?“</strong>. Tippen Sie daneben auf <strong>„Einloggen“</strong>.', 'At the top it says <strong>“Bereits medflex-Nutzer?”</strong> (already a user). Tap <strong>“Einloggen”</strong> (log in) next to it.')]]);
  var mLogin = m('medflex', [
    ['h', 'Willkommen bei medflex!'], ['p', 'Melden Sie sich mit Ihren Zugangsdaten an'],
    ['feld', 'mail', 'E-Mail-Adresse', 'erika@beispiel.de'],
    ['feld', 'pw', 'Passwort', '••••••••••'],
    ['knopf', 'ok', 'Als Patient einloggen']
  ], [['mail', L('E-Mail eintragen', 'Enter your email'), L('Tippen Sie in das Feld. Hier in der Übung füllt es sich von selbst.', 'Tap the field. In this exercise it fills in by itself.')],
    ['pw', L('Passwort eintragen', 'Enter your password'), L('Tippen Sie in das Feld. Vergessen? Dafür gibt es „Neues Passwort festlegen“.', 'Tap the field. Forgotten it? Use “Neues Passwort festlegen” (set a new password).')],
    ['ok', L('Einloggen', 'Log in'), L('Tippen Sie auf <strong>„Als Patient einloggen“</strong>.', 'Tap <strong>“Als Patient einloggen”</strong> (log in as a patient).')]]);
  var mKontakte = m('medflex', [
    ['h', 'Ihre Kontakte'], ['zeile', 'praxis', PRAXIS, 'Allgemeinmedizin']
  ], [['praxis', L('Praxis wählen', 'Choose the practice'), L('Tippen Sie auf unsere Praxis. Der gemeinsame Chat öffnet sich.', 'Tap our practice. Your shared chat opens.')]]);
  var mChat = m(PRAXIS, [
    ['p', 'Ihr Chat mit der Praxis'], ['knopf', 'anfrage', 'Anfrage stellen']
  ], [['anfrage', L('Anfrage stellen', 'Make a request'), L('Tippen Sie unten im Chat auf <strong>„Anfrage stellen“</strong>.', 'Tap <strong>“Anfrage stellen”</strong> (make a request) at the bottom of the chat.')]]);
  var mWeg = m(mKopf, [
    ['h', 'Wie möchten Sie das Rezept erhalten?'],
    ['wahl', 'abholen', 'In der Praxis abholen', 'weg'], ['wahl', 'flex', 'Über medflex', 'weg'],
    ['knopf', 'weiter', 'Weiter', 'aus']
  ], [['flex', L('Weg wählen', 'Choose how'), L('Wählen Sie, was Ihnen lieber ist. In dieser Übung ist das <strong>„Über medflex“</strong>.', 'Choose what suits you. In this exercise, that is <strong>“Über medflex”</strong>.')],
    ['weiter', L('Weiter', 'Next'), L('Tippen Sie auf <strong>„Weiter“</strong>.', 'Tap <strong>“Weiter”</strong> (next).')]]);
  var mAngaben = m(mKopf, [
    ['h', 'Ihre Angaben'],
    ['feld', 'name', 'Vor- und Nachname', 'Erika Muster'],
    ['feld', 'mail', 'E-Mail-Adresse', 'erika@beispiel.de'],
    ['feld', 'pw', 'Passwort wählen', '••••••••••'],
    ['knopf', 'ok', 'Registrieren']
  ], [['name', L('Name', 'Name'), L('Tragen Sie Ihren Namen ein.', 'Enter your name.')],
    ['mail', L('E-Mail-Adresse', 'Email address'), L('An diese Adresse schickt medflex die Bestätigung.', 'medflex sends the confirmation to this address.')],
    ['pw', L('Passwort wählen', 'Choose a password'), L('Überlegen Sie sich ein Passwort und notieren Sie es an einem sicheren Ort.', 'Think of a password and keep a note of it somewhere safe.')],
    ['ok', L('Registrieren', 'Register'), L('Tippen Sie auf <strong>„Registrieren“</strong>.', 'Tap <strong>“Registrieren”</strong> (register).')]]);
  var mMail = m(L('Ihr E-Mail-Postfach', 'Your inbox'), [
    ['h', 'medflex: Bitte bestätigen Sie Ihre E-Mail-Adresse'],
    ['p', 'Tippen Sie auf den Link, um Ihr Konto zu bestätigen.'],
    ['knopf', 'ok', 'E-Mail-Adresse bestätigen']
  ], [['ok', L('E-Mail bestätigen', 'Confirm your email'), L('Sie bekommen eine E-Mail von medflex. Tippen Sie darin auf den Link. Keine E-Mail da? Schauen Sie im Spam-Ordner nach.', 'You receive an email from medflex. Tap the link in it. No email? Check your spam folder.')]]);

  var rezeptListe = ['Folgerezept', 'Ramipril 5 mg, N3', 'Praxis Ochtrup'];
  var WEGE = {
    'rezept:patient-ohne': { ziel: MEDFLEX, bilder: [mHelfen('rezept', 'Folgerezept anfragen'), mEmpfaenger, mPatient, mMedikament, mKontakt, mAbsenden(rezeptListe.concat('Erika Muster, 0170 1234567'))], fertig: 'Ihre Anfrage ist bei der Praxis eingegangen.' },
    'rezept:patient-mit': { ziel: MEDFLEX_LOGIN, bilder: [mStart, mLogin, mKontakte, mChat, mHelfen('rezept', 'Folgerezept anfragen'), mMedikament, mWeg, mAbsenden(rezeptListe)], fertig: 'Ihre Anfrage ist bei der Praxis eingegangen.' },
    'rezept:patient-anlegen': { ziel: MEDFLEX, bilder: [mHelfen('verbinden', 'Über medflex verbinden'), mEmpfaenger, mAngaben, mMail], fertig: 'Sie sind jetzt mit der Praxis verbunden.' },
    'termin:patient-mit': { ziel: DOCTOLIB, bilder: [dCookies, dProfil, dFach, dFrage(false), dStandort, dVersicherung(false), dKategorie, dArt, dArzt, dZeit, dKonto(true), dEinloggen, dPasswort, dBestaetigen], fertig: 'Ihr Termin ist bestätigt.' },
    'termin:patient-ohne': { ziel: DOCTOLIB, bilder: [dCookies, dProfil, dFach, dFrage(false), dStandort, dVersicherung(false), dKategorie, dArt, dArzt, dZeit, dKonto(false), dRegistrieren, dDaten, dBestaetigen], fertig: 'Ihr Termin ist bestätigt.' },
    'termin:neu-privat-mit': { ziel: DOCTOLIB, bilder: [dCookies, dProfil, dFach, dFrage(true), dStandort, dVersicherung(true), dKategorie, dArt, dArzt, dZeit, dKonto(true), dEinloggen, dPasswort, dBestaetigen], fertig: 'Ihr Termin ist bestätigt.' },
    'termin:neu-privat-ohne': { ziel: DOCTOLIB, bilder: [dCookies, dProfil, dFach, dFrage(true), dStandort, dVersicherung(true), dKategorie, dArt, dArzt, dZeit, dKonto(false), dRegistrieren, dDaten, dBestaetigen], fertig: 'Ihr Termin ist bestätigt.' }
  };

  // ---------- Bildschirm zusammensetzen ----------
  function el(name, klasse, text) {
    var e = document.createElement(name);
    if (klasse) e.className = klasse;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function knopf(klasse, id, text) {
    var k = el('button', klasse, text);
    k.type = 'button';
    k.dataset.id = id;
    return k;
  }
  function teilBauen(t) {
    switch (t[0]) {
      case 'h': return el('h4', '', t[1]);
      case 'p': return el('p', '', t[1]);
      case 'tag': return el('div', 'us-tag', t[1]);
      case 'knopf':
        var k = knopf('us-knopf' + (t[3] === 'gelb' ? ' us-knopf--gelb' : ''), t[1], t[2]);
        if (t[3] === 'aus') k.disabled = true;
        return k;
      case 'zeile':
        var z = knopf('us-zeile', t[1], '');
        var inhalt = el('span', '', t[2]);
        if (t[3]) inhalt.appendChild(el('small', '', t[3]));
        z.appendChild(inhalt);
        return z;
      case 'wahl':
        var w = knopf('us-wahl', t[1], t[2]);
        w.dataset.gruppe = t[3];
        return w;
      case 'haken': return knopf('us-haken', t[1], t[2]);
      case 'feld':
        var box = el('div');
        box.appendChild(el('span', 'us-marke', t[2]));
        var f = knopf('us-feld leer', t[1], ' ');
        f.dataset.wert = t[3];
        f.setAttribute('aria-label', t[2]);
        box.appendChild(f);
        return box;
      case 'zeiten':
        var raster = el('div', 'us-zeiten');
        t[1].forEach(function (z) { raster.appendChild(knopf('us-zeit', z[0], z[1])); });
        return raster;
      case 'liste':
        var ul = el('ul', 'us-liste');
        t[1].forEach(function (z) { ul.appendChild(el('li', '', z)); });
        return ul;
    }
  }

  function starten(feld, art, fall, T) {
    var weg = WEGE[art + ':' + fall];
    var anweisung = feld.querySelector('.uebung-anweisung');
    var bildschirm = feld.querySelector('.uebung-bildschirm');
    var fortschritt = feld.querySelector('.uebung-fortschritt');
    var knoepfe = feld.querySelector('.uebung-knoepfe');
    var gesamt = weg.bilder.reduce(function (n, b) { return n + b.schritte.length; }, 0);
    var nr, bildNr, schrittNr, fertigGezaehlt, flaeche, ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function band() { return el('div', 'us-band', L('Demo-Übung: Nichts wird abgeschickt', 'Practice demo: nothing is sent')); }
    function schirm(bild) {
      bildschirm.innerHTML = '';
      bildschirm.className = 'uebung-bildschirm us-' + bild.thema;
      bildschirm.appendChild(band());
      flaeche = el('div', 'us-flaeche');
      if (bild.thema === 'medflex' && bild.teile[0][0] === 'nutzer') {
        var leiste = el('div', 'us-kopf');
        leiste.appendChild(el('span', '', 'Bereits medflex-Nutzer?'));
        leiste.appendChild(knopf('us-link', bild.teile[0][1], 'Einloggen'));
        flaeche.appendChild(leiste);
      } else {
        flaeche.appendChild(el('div', 'us-kopf', bild.kopf));
      }
      var inhalt = el('div', 'us-inhalt');
      bild.teile.forEach(function (t) { if (t[0] !== 'nutzer') inhalt.appendChild(teilBauen(t)); });
      flaeche.appendChild(inhalt);
      bildschirm.appendChild(flaeche);
      schrittNr = 0;
      markieren();
    }
    function markieren() {
      var bild = weg.bilder[bildNr];
      var s = bild.schritte[schrittNr];
      bildschirm.querySelectorAll('.ziel').forEach(function (z) { z.classList.remove('ziel'); });
      var ziel = bildschirm.querySelector('[data-id="' + s[0] + '"]');
      ziel.classList.add('ziel');
      flaeche.scrollTop = Math.max(0, ziel.offsetTop - flaeche.offsetTop - flaeche.clientHeight / 2 + ziel.offsetHeight / 2);
      fortschritt.style.width = (fertigGezaehlt / gesamt * 100) + '%';
      anweisung.className = 'uebung-anweisung';
      anweisung.innerHTML = '<span class="uebung-schritt"></span><h3></h3><p></p>';
      anweisung.querySelector('.uebung-schritt').textContent = T.schritt + ' ' + (fertigGezaehlt + 1) + ' ' + T.von + ' ' + gesamt;
      anweisung.querySelector('h3').textContent = s[1];
      anweisung.querySelector('p').innerHTML = s[2];
    }
    function weiter() {
      fertigGezaehlt++;
      schrittNr++;
      if (schrittNr < weg.bilder[bildNr].schritte.length) { markieren(); return; }
      bildNr++;
      if (bildNr < weg.bilder.length) { schirm(weg.bilder[bildNr]); return; }
      ende();
    }
    function ausloesen(ziel) {
      ziel.classList.remove('ziel');
      anweisung.classList.remove('fast');
      anweisung.classList.add('richtig');
      if (ziel.classList.contains('us-wahl')) {
        bildschirm.querySelectorAll('[data-gruppe="' + ziel.dataset.gruppe + '"]').forEach(function (w) { w.classList.remove('an'); });
        ziel.classList.add('an');
        freigeben();
        setTimeout(weiter, 350);
      } else if (ziel.classList.contains('us-haken')) {
        ziel.classList.add('an');
        ziel.setAttribute('aria-pressed', 'true');
        freigeben();
        setTimeout(weiter, 350);
      } else if (ziel.classList.contains('us-feld')) {
        tippen(ziel, ziel.dataset.wert, 0);
      } else {
        setTimeout(weiter, 280);
      }
    }
    function freigeben() {
      var aus = bildschirm.querySelector('.us-knopf[disabled]');
      if (aus) aus.disabled = false;
    }
    function tippen(ziel, wert, n) {
      ziel.classList.remove('leer');
      ziel.textContent = wert.slice(0, n) || ' ';
      if (n < wert.length && !ruhig) { setTimeout(function () { tippen(ziel, wert, n + 1); }, 32); return; }
      ziel.textContent = wert;
      setTimeout(weiter, 300);
    }
    function ende() {
      fortschritt.style.width = '100%';
      bildschirm.querySelectorAll('.ziel').forEach(function (z) { z.classList.remove('ziel'); });
      flaeche.innerHTML = '';
      var gut = el('div', 'us-gut');
      gut.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M7.500 12.500l3 3 6-6.500"/></svg>';
      gut.appendChild(el('h4', '', weg.fertig));
      flaeche.appendChild(gut);
      anweisung.className = 'uebung-anweisung richtig';
      anweisung.innerHTML = '<h3></h3><p></p>';
      anweisung.querySelector('h3').textContent = T.geschafft;
      anweisung.querySelector('p').textContent = T.geschafftText;
      knoepfe.innerHTML = '';
      var nochmal = el('button', 'knopf', T.neu);
      nochmal.type = 'button';
      nochmal.addEventListener('click', anfang);
      knoepfe.appendChild(nochmal);
      var echt = el('a', 'knopf', T.echt);
      echt.href = weg.ziel;
      echt.target = '_blank';
      echt.rel = 'noopener';
      knoepfe.appendChild(echt);
    }
    function anfang() {
      bildNr = 0;
      fertigGezaehlt = 0;
      knoepfe.innerHTML = '';
      schirm(weg.bilder[0]);
    }
    bildschirm.addEventListener('click', function (e) {
      if (bildNr >= weg.bilder.length) return;
      var ziel = e.target.closest('.ziel');
      if (ziel) { ausloesen(ziel); return; }
      if (!bildschirm.querySelector('.ziel')) return;
      anweisung.classList.remove('richtig');
      anweisung.classList.add('fast');
      var absatz = anweisung.querySelector('p');
      if (absatz.dataset.fast !== '1') {
        absatz.dataset.fast = '1';
        absatz.innerHTML = '<strong></strong><br />' + absatz.innerHTML;
        absatz.querySelector('strong').textContent = T.fast;
      }
    });
    anfang();
  }

  window.praxisUebung = {
    gibt: function (art, fall) { return !!WEGE[art + ':' + fall]; },
    starten: starten
  };
})();
