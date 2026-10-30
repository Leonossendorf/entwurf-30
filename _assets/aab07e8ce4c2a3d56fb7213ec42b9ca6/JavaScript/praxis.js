(function () {
  var html = document.documentElement;

  // Designvorschlag umschalten (nur für die Demo)
  var knoepfe = document.querySelectorAll('[data-konzept-wahl]');
  function markieren() {
    knoepfe.forEach(function (k) {
      k.setAttribute('aria-pressed', String(k.dataset.konzeptWahl === html.dataset.konzept));
    });
  }
  knoepfe.forEach(function (k) {
    k.addEventListener('click', function () {
      html.dataset.konzept = k.dataset.konzeptWahl;
      markieren();
    });
  });
  markieren();

  // Menü auf dem Handy
  var menueKnopf = document.querySelector('.menue-knopf');
  if (menueKnopf) {
    menueKnopf.addEventListener('click', function () {
      var offen = menueKnopf.getAttribute('aria-expanded') === 'true';
      menueKnopf.setAttribute('aria-expanded', String(!offen));
      document.body.classList.toggle('menue-offen', !offen);
    });
  }

  // Imagefilm erst nach Klick von YouTube laden
  document.querySelectorAll('.film-spieler').forEach(function (spieler) {
    var start = spieler.querySelector('.film-start');
    if (!start) return;
    start.addEventListener('click', function () {
      var rahmen = document.createElement('iframe');
      rahmen.src = 'https://www.youtube-nocookie.com/embed/' + spieler.dataset.videoId + '?autoplay=1&rel=0';
      rahmen.title = 'Imagefilm der Gemeinschaftspraxis Gesenhues & Partner';
      rahmen.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      rahmen.allowFullscreen = true;
      spieler.innerHTML = '';
      spieler.appendChild(rahmen);
      spieler.classList.add('laeuft');
    });
  });

  // ---------- Sprache der Seite für Texte aus dem Skript ----------
  var englisch = (html.lang || '').toLowerCase().indexOf('en') === 0;
  var T = englisch ? {
    zurueck: 'Back', ablage: 'Drag your PDF here or <u>choose a file</u>', alle: 'All', filter: 'Filter by focus', frage: 'Who can help me with …', mehr: 'More topics', eine: ' person can help with ', mehrere: ' people can help with ',
    offen: 'Open now', bis: 'until', zu: 'Closed now', oeffnetHeute: 'opens today at', oeffnet: 'opens', um: 'at', morgen: 'tomorrow', uhr: '', praxisZu: 'Practice closed', wiederAb: 'back from',
    tage: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    schritt: 'Step', von: 'of', weiter: 'Next', neu: 'Practise again', fast: 'Nearly! Tap the highlighted area.', geschafft: 'Well done!', geschafftText: 'That is all there is to it. Nothing was sent.', echt: 'Now do it for real',
    medflexOffen: 'Online ordering is open right now, until Friday at 12 noon.',
    medflexZu: 'Online ordering is closed right now, it reopens on Monday at 7 am. Until then medflex shows a yellow notice instead of the box “Wie können wir Ihnen helfen?”. That is not an error.',
    faelle: {
      'rezept:patient-ohne': 'Order a prescription without an account', 'rezept:patient-mit': 'Order a prescription with your medflex account', 'rezept:patient-anlegen': 'Create a medflex account', 'rezept:neu': 'New to us: your way to a prescription',
      'termin:patient-ohne': 'Book as an existing patient, create a Doctolib account', 'termin:patient-mit': 'Book as an existing patient with your Doctolib account', 'termin:neu-gesetzlich': 'New to us with statutory insurance: first appointment by phone',
      'termin:neu-privat-ohne': 'New to us with private insurance, create a Doctolib account', 'termin:neu-privat-mit': 'New to us with private insurance and a Doctolib account'
    },
    keine: 'No check-ups are listed for this age.', praxis: 'With us at the practice', frauenarzt: 'At your gynaecologist', einladung: 'By invitation', bitteWaehlen: 'Please choose'
  } : {
    zurueck: 'Zurück', ablage: 'PDF hierher ziehen oder <u>auswählen</u>', alle: 'Alle', filter: 'Nach Schwerpunkt filtern', frage: 'Wer hilft mir bei …', mehr: 'Weitere Themen', eine: ' Person hilft bei ', mehrere: ' Personen helfen bei ',
    offen: 'Jetzt geöffnet', bis: 'bis', zu: 'Jetzt geschlossen', oeffnetHeute: 'öffnet heute um', oeffnet: 'öffnet', um: 'um', morgen: 'morgen', uhr: ' Uhr', praxisZu: 'Praxis geschlossen', wiederAb: 'wieder da ab',
    tage: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    schritt: 'Schritt', von: 'von', weiter: 'Weiter', neu: 'Noch einmal üben', fast: 'Fast! Tippen Sie auf das markierte Feld.', geschafft: 'Geschafft!', geschafftText: 'So einfach geht es. Es wurde nichts abgeschickt.', echt: 'Jetzt richtig machen',
    medflexOffen: 'Online-Bestellung ist gerade möglich, noch bis Freitag, 12 Uhr.',
    medflexZu: 'Online-Bestellung ist gerade geschlossen, wieder ab Montag, 7 Uhr. Bis dahin zeigt medflex einen gelben Hinweis statt des Kastens „Wie können wir Ihnen helfen?“. Das ist kein Fehler.',
    faelle: {
      'rezept:patient-ohne': 'Rezept bestellen ohne Konto', 'rezept:patient-mit': 'Rezept bestellen mit Ihrem medflex-Konto', 'rezept:patient-anlegen': 'medflex-Konto anlegen', 'rezept:neu': 'Neu bei uns: Ihr Weg zum Rezept',
      'termin:patient-ohne': 'Termin buchen als Patient, Doctolib-Konto anlegen', 'termin:patient-mit': 'Termin buchen als Patient mit Doctolib-Konto', 'termin:neu-gesetzlich': 'Neu bei uns und gesetzlich versichert: erster Termin per Telefon',
      'termin:neu-privat-ohne': 'Neu bei uns und privat versichert, Doctolib-Konto anlegen', 'termin:neu-privat-mit': 'Neu bei uns und privat versichert, mit Doctolib-Konto'
    },
    keine: 'Für dieses Alter ist hier nichts eingetragen.', praxis: 'Bei uns in der Praxis', frauenarzt: 'Bei Ihrer Frauenärztin oder Ihrem Frauenarzt', einladung: 'Per Einladung', bitteWaehlen: 'Bitte wählen'
  };
  function merken(name, wert) { try { localStorage.setItem(name, wert); } catch (e) {} }

  // ---------- Lesehilfen: Schrift, Kontrast, Vorlesen ----------
  var schriftKnoepfe = document.querySelectorAll('[data-schrift-stufe]');
  function schriftZeigen() {
    var stufe = html.dataset.schrift || '0';
    schriftKnoepfe.forEach(function (k) { k.setAttribute('aria-pressed', String(k.dataset.schriftStufe === stufe)); });
  }
  schriftKnoepfe.forEach(function (k) {
    k.addEventListener('click', function () {
      if (k.dataset.schriftStufe === '0') { delete html.dataset.schrift; } else { html.dataset.schrift = k.dataset.schriftStufe; }
      merken('praxis-schrift', k.dataset.schriftStufe);
      schriftZeigen();
    });
  });
  schriftZeigen();

  var kontrastKnopf = document.querySelector('.kontrast-knopf');
  if (kontrastKnopf) {
    kontrastKnopf.setAttribute('aria-pressed', String(html.classList.contains('kontrast')));
    kontrastKnopf.addEventListener('click', function () {
      var an = html.classList.toggle('kontrast');
      kontrastKnopf.setAttribute('aria-pressed', String(an));
      merken('praxis-kontrast', an ? '1' : '0');
    });
  }

  var vorlesenKnopf = document.querySelector('.vorlesen-knopf');
  if (vorlesenKnopf && 'speechSynthesis' in window) {
    vorlesenKnopf.hidden = false;
    var stoppen = function () {
      window.speechSynthesis.cancel();
      vorlesenKnopf.setAttribute('aria-pressed', 'false');
    };
    vorlesenKnopf.addEventListener('click', function () {
      if (vorlesenKnopf.getAttribute('aria-pressed') === 'true') { stoppen(); return; }
      var inhalt = document.querySelector('main');
      var kopf = document.querySelector('h1');
      var text = (kopf && !inhalt.contains(kopf) ? kopf.innerText + '. ' : '') + inhalt.innerText;
      var saetze = text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]*\s*/g) || [];
      vorlesenKnopf.setAttribute('aria-pressed', 'true');
      saetze.forEach(function (satz, i) {
        var stimme = new SpeechSynthesisUtterance(satz);
        stimme.lang = englisch ? 'en-GB' : 'de-DE';
        stimme.rate = .95;
        if (i === saetze.length - 1) stimme.onend = stoppen;
        window.speechSynthesis.speak(stimme);
      });
    });
    window.addEventListener('pagehide', function () { window.speechSynthesis.cancel(); });
  }

  // Lesehilfen: ein Knopf, alles Weitere im aufklappbaren Feld
  var hilfeKnopf = document.querySelector('.lesehilfe-knopf');
  if (hilfeKnopf) {
    var hilfeFeld = document.getElementById('lesehilfe-feld');
    var hilfeZeigen = function (an) {
      hilfeFeld.hidden = !an;
      hilfeKnopf.setAttribute('aria-expanded', String(an));
    };
    hilfeKnopf.addEventListener('click', function () { hilfeZeigen(hilfeFeld.hidden); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.lesehilfe')) hilfeZeigen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !hilfeFeld.hidden) { hilfeZeigen(false); hilfeKnopf.focus(); }
    });
  }

  jetztGeoeffnet();
  wegweiserEinrichten();
  medflexStatus();
  fallwahlEinrichten();
  vorsorgeEinrichten();
  einblenden();

  document.querySelectorAll('.checkliste li').forEach(function (punkt, i) {
    var text = punkt.textContent;
    punkt.textContent = '';
    var feld = document.createElement('label');
    var haken = document.createElement('input');
    haken.type = 'checkbox';
    feld.appendChild(haken);
    feld.appendChild(document.createTextNode(text));
    punkt.appendChild(feld);
  });
  document.querySelectorAll('.druck-knopf').forEach(function (k) { k.addEventListener('click', function () { window.print(); }); });

  // ---------- „Jetzt geöffnet“: rechnet aus den Öffnungszeiten, die das Team im CMS pflegt ----------
  function jetztGeoeffnet() {
    var feld = document.querySelector('.jetzt');
    if (!feld || !feld.dataset.zeiten) return;
    var text = feld.querySelector('.jetzt-text');
    var wochentage = ['sonntag', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag'];
    var plan = {};
    feld.dataset.zeiten.split(/\r?\n/).forEach(function (zeile) {
      var teile = zeile.split('|');
      var name = teile[0].trim().toLowerCase();
      var tag = wochentage.indexOf(name) > -1 ? wochentage.indexOf(name) : ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(name);
      if (tag < 0) return;
      plan[tag] = teile.slice(1).map(function (s) { return s.match(/(\d{1,2}):(\d{2})/g); }).filter(function (z) { return z && z.length === 2; }).map(function (z) {
        return [minuten(z[0]), minuten(z[1]), z[0], z[1]];
      });
    });
    function minuten(z) { var t = z.split(':'); return t[0] * 60 + +t[1]; }
    function feiertag(d) {
      var j = d.getFullYear();
      var a = j % 19, b = Math.floor(j / 100), c = j % 100, e = Math.floor(b / 4), f = b % 4, g = Math.floor((8 * b + 13) / 25);
      var h = (19 * a + b - e - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * f + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 19 * l) / 433);
      var monat = Math.floor((h + l - 7 * m + 90) / 25), tag = (h + l - 7 * m + 33 * monat + 19) % 32;
      var ostern = new Date(j, monat - 1, tag);
      var bewegt = [-2, 1, 39, 50, 60].map(function (n) { var x = new Date(ostern); x.setDate(x.getDate() + n); return (x.getMonth() + 1) + '-' + x.getDate(); });
      return ['1-1', '5-1', '10-3', '11-1', '12-25', '12-26'].concat(bewegt).indexOf((d.getMonth() + 1) + '-' + d.getDate()) > -1;
    }
    function zeitenAm(d) { return feiertag(d) ? [] : (plan[d.getDay()] || []); }
    var jetzt = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
    var stempel = Date.now() / 1000;
    var von = +feld.dataset.zuVon, bis = +feld.dataset.zuBis;
    if (von && von <= stempel && stempel < bis) {
      var wieder = new Date(bis * 1000).toLocaleDateString(englisch ? 'en-GB' : 'de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
      feld.classList.add('zu');
      text.textContent = T.praxisZu + ' · ' + T.wiederAb + ' ' + wieder;
      return;
    }
    var heute = zeitenAm(jetzt);
    var nun = jetzt.getHours() * 60 + jetzt.getMinutes();
    for (var i = 0; i < heute.length; i++) {
      if (nun >= heute[i][0] && nun < heute[i][1]) {
        feld.classList.add('offen');
        text.textContent = T.offen + ' · ' + T.bis + ' ' + heute[i][3] + T.uhr;
        return;
      }
      if (nun < heute[i][0]) {
        feld.classList.add('zu');
        text.textContent = T.zu + ' · ' + T.oeffnetHeute + ' ' + heute[i][2] + T.uhr;
        return;
      }
    }
    for (var n = 1; n < 10; n++) {
      var tag = new Date(jetzt);
      tag.setDate(tag.getDate() + n);
      var zeiten = zeitenAm(tag);
      if (zeiten.length) {
        feld.classList.add('zu');
        text.textContent = T.zu + ' · ' + T.oeffnet + ' ' + (n === 1 ? T.morgen : T.tage[tag.getDay()]) + ' ' + T.um + ' ' + zeiten[0][2] + T.uhr;
        return;
      }
    }
  }
  // Heutige Zeile in der Tabelle hervorheben
  document.querySelectorAll('.frame-layout-4 tr').forEach(function (zeile) {
    var heute = new Date().toLocaleDateString(englisch ? 'en-GB' : 'de-DE', { weekday: 'long' }).toLowerCase();
    if (zeile.textContent.toLowerCase().indexOf(heute) > -1) zeile.classList.add('heute');
  });

  // ---------- Wegweiser „Was brauchen Sie?“ ----------
  function wegweiserEinrichten() {
    var knoepfe = document.querySelectorAll('.wegweiser-knopf');
    knoepfe.forEach(function (knopf) {
      knopf.addEventListener('click', function () {
        var offen = knopf.getAttribute('aria-expanded') === 'true';
        knoepfe.forEach(function (k) {
          k.setAttribute('aria-expanded', 'false');
          k.parentNode.classList.remove('offen');
          k.nextElementSibling.hidden = true;
        });
        if (!offen) {
          knopf.setAttribute('aria-expanded', 'true');
          knopf.parentNode.classList.add('offen');
          knopf.nextElementSibling.hidden = false;
          knopf.parentNode.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    });
  }

  // ---------- medflex nimmt nur von Montag, 7 Uhr, bis Freitag, 12 Uhr Anfragen an ----------
  function medflexStatus() {
    var felder = document.querySelectorAll('.medflex-status');
    if (!felder.length) return;
    var jetzt = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
    var tag = jetzt.getDay(), minute = jetzt.getHours() * 60 + jetzt.getMinutes();
    var zu = tag === 0 || tag === 6 || (tag === 5 && minute >= 720) || (tag === 1 && minute < 420);
    felder.forEach(function (feld) {
      feld.hidden = false;
      feld.classList.toggle('zu', zu);
      feld.textContent = zu ? T.medflexZu : T.medflexOffen;
    });
  }

  // ---------- Anleitungen: Fragen führen zu genau den Schritten, die für diesen Fall gelten ----------
  function fallwahlEinrichten() {
    var wahl = document.querySelector('.fallwahl');
    if (!wahl) return;
    var art = wahl.dataset.art;
    var anleitung = document.querySelector('.anleitung');
    var teile = document.querySelectorAll('[data-fall]');
    var ergebnis = wahl.querySelector('.fall-ergebnis');
    var uebenKnopf = wahl.querySelector('.fall-ueben');
    var felder = { besuch: wahl.querySelector('[data-dim="besuch"]'), vers: wahl.querySelector('[data-dim="vers"]'), konto: wahl.querySelector('[data-dim="konto"]') };
    var stand = {};
    var dimension = { patient: 'besuch', neu: 'besuch', gesetzlich: 'vers', privat: 'vers', mit: 'konto', ohne: 'konto', anlegen: 'konto' };
    var ueben = false;
    anleitung.classList.add('mit-fallwahl');

    function fragen() {
      var neu = stand.besuch === 'neu';
      if (felder.vers) felder.vers.hidden = !neu;
      var konto = art === 'termin' ? stand.besuch === 'patient' || (neu && stand.vers === 'privat') : stand.besuch === 'patient';
      felder.konto.hidden = !konto;
      if (!neu) delete stand.vers;
      if (!konto) delete stand.konto;
      if (art === 'rezept' && neu) return 'neu';
      if (art === 'termin' && neu && stand.vers === 'gesetzlich') return 'neu-gesetzlich';
      if (!konto || !stand.konto) return '';
      return [stand.besuch, stand.vers, stand.konto].filter(Boolean).join('-');
    }
    function zeigen() {
      var fall = fragen();
      wahl.querySelectorAll('input').forEach(function (feld) {
        feld.checked = stand[feld.closest('[data-dim]').dataset.dim] === feld.value;
      });
      anleitung.classList.toggle('fall-offen', !!fall);
      ergebnis.hidden = !fall;
      teile.forEach(function (teil) {
        var marken = (teil.dataset.fall || '').split(',').filter(Boolean);
        var passt = !!fall && ['besuch', 'vers', 'konto'].every(function (dim) {
          var hier = marken.filter(function (m) { return dimension[m] === dim; });
          return !hier.length || !stand[dim] || hier.indexOf(stand[dim]) > -1;
        });
        teil.classList.toggle('fall-aus', !passt);
      });
      if (!fall) { uebungZeigen(''); return; }
      ergebnis.querySelector('strong').textContent = T.faelle[art + ':' + fall];
      var geht = window.praxisUebung && window.praxisUebung.gibt(art, fall);
      uebenKnopf.hidden = !geht;
      uebungZeigen(geht && ueben ? fall : '');
      if (window.history.replaceState) window.history.replaceState(null, '', '#' + fall);
    }
    function uebungZeigen(fall) {
      var platz = document.querySelector('.uebung-platz');
      platz.innerHTML = '';
      if (!fall) return;
      platz.appendChild(document.getElementById('uebung-vorlage').content.cloneNode(true));
      window.praxisUebung.starten(platz.querySelector('.uebung'), art, fall, T);
    }
    wahl.addEventListener('change', function (e) {
      stand[e.target.closest('[data-dim]').dataset.dim] = e.target.value;
      zeigen();
      if (!ergebnis.hidden) ergebnis.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
    uebenKnopf.addEventListener('click', function (e) {
      e.preventDefault();
      ueben = true;
      zeigen();
      document.getElementById('ueben').scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    function ausAdresse() {
      var teil = location.hash.slice(1);
      if (teil === 'ueben') {
        ueben = true;
        if (!ergebnis.hidden) {
          zeigen();
          if (document.getElementById('ueben')) document.getElementById('ueben').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        return;
      }
      teil.split('-').forEach(function (wert) { if (dimension[wert]) stand[dimension[wert]] = wert; });
      zeigen();
    }
    window.addEventListener('hashchange', ausAdresse);
    ausAdresse();
    if (location.hash === '#ueben') wahl.scrollIntoView({ block: 'start' });
  }

  // ---------- Vorsorge-Finder: Daten aus der Tabelle im CMS, nichts wird gespeichert ----------
  function vorsorgeEinrichten() {
    var daten = document.getElementById('vorsorge-daten');
    if (!daten) return;
    var regler = document.getElementById('vorsorge-alter');
    var wert = document.getElementById('vorsorge-wert');
    var ausgabe = document.querySelector('.vorsorge-ergebnis');
    var aktion = document.getElementById('vorsorge-aktion');
    var eintraege = daten.textContent.split(/\r?\n/).filter(Boolean).map(function (z) {
      var t = z.split('|');
      return { titel: t[0], von: +t[1], bis: +t[2], wer: t[3], takt: t[4], text: t[5], ort: t[6] };
    });
    function zeigen() {
      var alter = +regler.value;
      var wer = document.querySelector('input[name="vorsorge-wer"]:checked').value;
      wert.textContent = alter;
      var passend = eintraege.filter(function (e) { return alter >= e.von && alter <= e.bis && (e.wer === 'alle' || e.wer === wer); });
      ausgabe.innerHTML = '';
      if (!passend.length) { ausgabe.textContent = T.keine; return; }
      ['praxis', 'frauenarzt', 'einladung'].forEach(function (ort) {
        var gruppe = passend.filter(function (e) { return e.ort === ort; });
        if (!gruppe.length) return;
        var block = document.createElement('section');
        block.className = 'vorsorge-gruppe';
        var kopf = document.createElement('h2');
        kopf.textContent = T[ort];
        var liste = document.createElement('ul');
        liste.className = 'vorsorge-liste';
        gruppe.forEach(function (e) {
          var li = document.createElement('li');
          li.className = 'vorsorge-eintrag';
          li.innerHTML = '<strong></strong><span class="vorsorge-rhythmus"></span><span class="vorsorge-info"></span>';
          li.querySelector('strong').textContent = e.titel;
          li.querySelector('.vorsorge-rhythmus').textContent = e.takt;
          li.querySelector('.vorsorge-info').textContent = e.text;
          liste.appendChild(li);
        });
        block.appendChild(kopf);
        block.appendChild(liste);
        if (ort === 'praxis' && aktion) block.appendChild(aktion.content.cloneNode(true));
        ausgabe.appendChild(block);
      });
    }
    regler.addEventListener('input', zeigen);
    document.querySelectorAll('input[name="vorsorge-wer"]').forEach(function (r) { r.addEventListener('change', zeigen); });
    zeigen();
  }

  // ---------- Dezentes Einblenden beim Scrollen ----------
  function einblenden() {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var beob = new IntersectionObserver(function (treffer) {
      treffer.forEach(function (t) {
        if (t.isIntersecting) { t.target.classList.add('da'); beob.unobserve(t.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.feld-karte, .feld-kachel, .meldung, .schritt-karte, .band-karte, .wegweiser-eintrag, .hilfe-karte').forEach(function (el) {
      el.classList.add('einblenden');
      beob.observe(el);
    });
  }

  teamEinrichten();
  bewerbungEinrichten();

  // ---------- Praxisteam: Zahlen, Profil-Fenster und „Wer hilft mir bei …?“ ----------
  function teamEinrichten() {
    var personen = Array.prototype.slice.call(document.querySelectorAll('.person'));
    var dialog = document.querySelector('dialog.profil');
    if (!personen.length || !dialog) return;

    // Klick auf eine Karte öffnet das Profil mit großem Bild
    var raster = dialog.querySelector('.profil-raster');
    var zuletzt = null;
    personen.forEach(function (person) {
      var knopf = person.querySelector('.person-oeffnen');
      person.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        zuletzt = knopf;
        raster.innerHTML = '';
        raster.appendChild(person.querySelector('template.person-profil').content.cloneNode(true));
        dialog.showModal();
        dialog.querySelector('.profil-schliessen').focus();
      });
    });
    dialog.querySelector('.profil-schliessen').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (zuletzt) zuletzt.focus(); });

    // Anzahl Ärzte und PAs aus den Personen auf der Seite zählen
    var zweiterAbschnittZahl = document.querySelectorAll('.team-abschnitt')[1];
    var aerzte = personen.filter(function (p) { return !zweiterAbschnittZahl || (zweiterAbschnittZahl.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_PRECEDING); }).length;
    var feldAerzte = document.querySelector('[data-zaehler="aerzte"]');
    var feldPa = document.querySelector('[data-zaehler="pa"]');
    if (feldAerzte) feldAerzte.textContent = aerzte;
    if (feldPa) feldPa.textContent = personen.length - aerzte;

    // Schwerpunkte einsammeln (erste Liste jeder Person); die Themen kommen aus dem ersten Abschnitt (Ärzteteam)
    var zaehler = {};
    var zweiterAbschnitt = document.querySelectorAll('.team-abschnitt')[1];
    personen.forEach(function (person) {
      var liste = person.querySelector('.person-schwerpunkte > ul:first-child');
      person._schwerpunkte = liste ? Array.prototype.map.call(liste.querySelectorAll('li'), function (li) { return li.textContent.trim(); }) : [];
      var imErstenAbschnitt = !zweiterAbschnitt || (zweiterAbschnitt.compareDocumentPosition(person) & Node.DOCUMENT_POSITION_PRECEDING);
      if (imErstenAbschnitt) person._schwerpunkte.forEach(function (s) { zaehler[s] = (zaehler[s] || 0) + 1; });
    });
    var themen = Object.keys(zaehler).sort(function (a, b) { return zaehler[b] - zaehler[a] || a.localeCompare(b); });
    if (themen.length < 3) return;

    var leiste = document.createElement('div');
    leiste.className = 'team-filter';
    leiste.setAttribute('role', 'group');
    leiste.setAttribute('aria-label', T.filter);
    leiste.innerHTML = '<p class="team-filter-frage">' + T.frage + '</p><div class="team-filter-liste"></div><p class="team-filter-ergebnis" aria-live="polite"></p>';
    var liste = leiste.querySelector('.team-filter-liste');
    var ergebnis = leiste.querySelector('.team-filter-ergebnis');
    [T.alle].concat(themen).forEach(function (thema, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = thema;
      b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', function () {
        liste.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        var treffer = 0;
        personen.forEach(function (person) {
          var passt = i === 0 || person._schwerpunkte.indexOf(thema) !== -1;
          person.classList.toggle('ausgeblendet', !passt);
          if (passt) treffer++;
        });
        document.querySelectorAll('.team-abschnitt').forEach(function (abschnitt, n) {
          abschnitt.classList.toggle('ausgeblendet', i !== 0 && n > 0 && !folgtTreffer(abschnitt));
        });
        ergebnis.textContent = i === 0 ? '' : treffer + (treffer === 1 ? T.eine : T.mehrere) + thema + '.';
      });
      if (i > 6) b.hidden = true;
      liste.appendChild(b);
    });
    if (themen.length > 6) {
      var mehr = document.createElement('button');
      mehr.type = 'button';
      mehr.className = 'team-filter-mehr';
      mehr.textContent = T.mehr;
      mehr.addEventListener('click', function () {
        liste.querySelectorAll('button[hidden]').forEach(function (x) { x.hidden = false; });
        mehr.remove();
      });
      liste.appendChild(mehr);
    }
    var erster = document.querySelector('.team-abschnitt');
    erster.parentNode.insertBefore(leiste, erster.nextSibling);

    function folgtTreffer(abschnitt) {
      var el = abschnitt.nextElementSibling;
      while (el && !el.classList.contains('team-abschnitt')) {
        if (el.classList.contains('person') && !el.classList.contains('ausgeblendet')) return true;
        el = el.nextElementSibling;
      }
      return false;
    }
  }

  // ---------- Bewerbung: drei Schritte, Auswahlkarten, Datei-Feld ----------
  function bewerbungEinrichten() {
    var form = document.querySelector('.bewerbung form');
    if (!form) return;
    var schritte = Array.prototype.slice.call(form.querySelectorAll('fieldset.schritt'));
    if (schritte.length < 2) return;
    form.classList.add('schrittweise');

    // Fortschritt oben
    var kopf = document.createElement('ol');
    kopf.className = 'schritt-kopf';
    schritte.forEach(function (s, i) {
      var li = document.createElement('li');
      li.textContent = s.querySelector('legend') ? s.querySelector('legend').textContent : 'Schritt ' + (i + 1);
      kopf.appendChild(li);
    });
    form.insertBefore(kopf, form.firstElementChild);

    var absenden = form.querySelector('.actions');
    var aktuell = 0;

    schritte.forEach(function (s, i) {
      var leiste = document.createElement('div');
      leiste.className = 'schritt-leiste';
      if (i > 0) {
        var zurueck = document.createElement('button');
        zurueck.type = 'button';
        zurueck.className = 'schritt-zurueck';
        zurueck.textContent = T.zurueck;
        zurueck.addEventListener('click', function () { zeigen(i - 1); });
        leiste.appendChild(zurueck);
      }
      if (i < schritte.length - 1) {
        var weiter = document.createElement('button');
        weiter.type = 'button';
        weiter.className = 'knopf schritt-weiter';
        weiter.textContent = T.weiter;
        weiter.addEventListener('click', function () { if (pruefen(s)) zeigen(i + 1); });
        leiste.appendChild(weiter);
      }
      s.appendChild(leiste);
    });
    if (absenden) schritte[schritte.length - 1].querySelector('.schritt-leiste').appendChild(absenden);

    function pruefen(s) {
      var felder = s.querySelectorAll('input, textarea, select');
      for (var i = 0; i < felder.length; i++) {
        if (!felder[i].checkValidity()) { felder[i].reportValidity(); return false; }
      }
      return true;
    }
    function zeigen(n) {
      aktuell = n;
      schritte.forEach(function (s, i) { s.hidden = i !== n; });
      Array.prototype.forEach.call(kopf.children, function (li, i) {
        li.classList.toggle('erledigt', i < n);
        li.classList.toggle('aktiv', i === n);
        if (i === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      var erstesFeld = schritte[n].querySelector('input:not([type="hidden"]), textarea');
      if (erstesFeld && n > 0) erstesFeld.focus({ preventScroll: true });
    }

    // Auswahlkarten: nach der Wahl automatisch weiter
    form.querySelectorAll('input[type="radio"]').forEach(function (radio) {
      radio.closest('.form-check, div').classList.add('wahlkarte');
      radio.addEventListener('change', function () {
        setTimeout(function () { if (aktuell === 0) zeigen(1); }, 250);
      });
    });

    // Datei-Feld als Ablagefläche
    form.querySelectorAll('input[type="file"]').forEach(function (feld) {
      var flaeche = document.createElement('div');
      flaeche.className = 'ablage';
      flaeche.innerHTML = '<span class="ablage-titel">' + T.ablage + '</span><span class="ablage-datei"></span>';
      feld.parentNode.insertBefore(flaeche, feld);
      flaeche.appendChild(feld);
      var name = flaeche.querySelector('.ablage-datei');
      feld.addEventListener('change', function () {
        name.textContent = feld.files.length ? feld.files[0].name : '';
        flaeche.classList.toggle('gefuellt', feld.files.length > 0);
      });
      ['dragenter', 'dragover'].forEach(function (t) { flaeche.addEventListener(t, function () { flaeche.classList.add('ziehen'); }); });
      ['dragleave', 'drop'].forEach(function (t) { flaeche.addEventListener(t, function () { flaeche.classList.remove('ziehen'); }); });
    });

    // „Für diese Stelle bewerben“ in der Stellenanzeige wählt die Stelle vor
    document.querySelectorAll('.stelle-bewerben').forEach(function (link) {
      link.addEventListener('click', function () {
        var gesucht = (link.dataset.stelle || '').slice(0, 24).toLowerCase();
        form.querySelectorAll('input[type="radio"]').forEach(function (radio) {
          var text = radio.closest('label').textContent.trim().slice(0, 24).toLowerCase();
          if (gesucht && text === gesucht) { radio.checked = true; zeigen(1); }
        });
      });
    });

    // Bei Fehlern vom Server den ersten Schritt mit Fehler zeigen
    var mitFehler = schritte.findIndex(function (s) { return s.querySelector('.error, .has-error, [aria-invalid="true"]'); });
    zeigen(mitFehler > -1 ? mitFehler : 0);
  }
})();
