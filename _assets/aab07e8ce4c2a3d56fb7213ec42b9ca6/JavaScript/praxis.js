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

  // Schrift größer (für ältere Patientinnen und Patienten)
  var schriftKnopf = document.querySelector('.schrift-knopf');
  if (schriftKnopf) {
    schriftKnopf.setAttribute('aria-pressed', String(html.classList.contains('schrift-gross')));
    schriftKnopf.addEventListener('click', function () {
      var gross = html.classList.toggle('schrift-gross');
      schriftKnopf.setAttribute('aria-pressed', String(gross));
      try { localStorage.setItem('praxis-schrift', gross ? 'gross' : 'normal'); } catch (e) {}
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
    var themen = Object.keys(zaehler).sort(function (a, b) { return zaehler[b] - zaehler[a] || a.localeCompare(b, 'de'); });
    if (themen.length < 3) return;

    var leiste = document.createElement('div');
    leiste.className = 'team-filter';
    leiste.setAttribute('role', 'group');
    leiste.setAttribute('aria-label', 'Nach Schwerpunkt filtern');
    leiste.innerHTML = '<p class="team-filter-frage">Wer hilft mir bei …</p><div class="team-filter-liste"></div><p class="team-filter-ergebnis" aria-live="polite"></p>';
    var liste = leiste.querySelector('.team-filter-liste');
    var ergebnis = leiste.querySelector('.team-filter-ergebnis');
    ['Alle'].concat(themen).forEach(function (thema, i) {
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
        ergebnis.textContent = i === 0 ? '' : treffer + (treffer === 1 ? ' Person hilft' : ' Personen helfen') + ' bei ' + thema + '.';
      });
      if (i > 6) b.hidden = true;
      liste.appendChild(b);
    });
    if (themen.length > 6) {
      var mehr = document.createElement('button');
      mehr.type = 'button';
      mehr.className = 'team-filter-mehr';
      mehr.textContent = 'Weitere Themen';
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
        zurueck.textContent = 'Zurück';
        zurueck.addEventListener('click', function () { zeigen(i - 1); });
        leiste.appendChild(zurueck);
      }
      if (i < schritte.length - 1) {
        var weiter = document.createElement('button');
        weiter.type = 'button';
        weiter.className = 'knopf schritt-weiter';
        weiter.textContent = 'Weiter';
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
      flaeche.innerHTML = '<span class="ablage-titel">PDF hierher ziehen oder <u>auswählen</u></span><span class="ablage-datei"></span>';
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
