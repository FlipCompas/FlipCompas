// =========================
// FLIPCOMPAS - BEREKENING
// =========================


// Nederlandse bedragen en percentages uitlezen
function leesBedrag(id) {

    const element = document.getElementById(id);

    if (!element) {
        return NaN;
    }

    let waarde = element.value.trim();

    waarde = waarde
        .replace(/€/g, "")
        .replace(/\s/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    return Number(waarde);
}


// Bedrag netjes weergeven
function euro(bedrag) {

    return "€ " + bedrag.toLocaleString("nl-NL", {
        maximumFractionDigits: 0
    });
}


// =========================
// HOOFDBEREKENING
// =========================

function bereken() {

    // -------------------------
    // INPUTS
    // -------------------------

    const minWinst = leesBedrag("minWinst");

    const aankoop = leesBedrag("aankoop");
    const overdracht = leesBedrag("overdracht");
    const notaris = leesBedrag("notaris");

    const verbouw = leesBedrag("verbouw");
    const onvoorzien = leesBedrag("onvoorzien");

    const verkoop = leesBedrag("verkoop");
    const makelaar = leesBedrag("makelaar");
    const verkoopOverig = leesBedrag("verkoopOverig");

    const financiering = leesBedrag("financiering");
    const rente = leesBedrag("rente");
    const looptijd = leesBedrag("looptijd");


    // -------------------------
    // PAGINA-ELEMENTEN
    // -------------------------

    const resultaat =
        document.getElementById("resultaat");

    const investeringElement =
        document.getElementById("investering");

    const financieringsKostenElement =
        document.getElementById("financieringsKosten");

    const eigenGeldElement =
        document.getElementById("eigenGeld");

    const winstElement =
        document.getElementById("winstKaart");

    const rendementElement =
        document.getElementById("rendement");

    const winstPerMaandElement =
        document.getElementById("winstPerMaand");

    const scoreElement =
        document.getElementById("flipscore");

    const knop =
        document.querySelector("button");


    // =========================
    // CONTROLE
    // =========================

    if (

        !Number.isFinite(minWinst) ||
        !Number.isFinite(aankoop) ||
        !Number.isFinite(overdracht) ||
        !Number.isFinite(notaris) ||
        !Number.isFinite(verbouw) ||
        !Number.isFinite(onvoorzien) ||
        !Number.isFinite(verkoop) ||
        !Number.isFinite(makelaar) ||
        !Number.isFinite(verkoopOverig) ||
        !Number.isFinite(financiering) ||
        !Number.isFinite(rente) ||
        !Number.isFinite(looptijd) ||

        minWinst < 0 ||
        aankoop <= 0 ||
        overdracht < 0 ||
        notaris < 0 ||
        verbouw < 0 ||
        onvoorzien < 0 ||
        verkoop <= 0 ||
        makelaar < 0 ||
        verkoopOverig < 0 ||
        financiering < 0 ||
        financiering > 100 ||
        rente < 0 ||
        looptijd <= 0

    ) {

        resultaat.style.background = "#fff5e6";
        resultaat.style.border = "2px solid #f4a261";
        resultaat.style.color = "#c97a00";

        resultaat.innerHTML =
            "⚠️ <strong>Vul alle gegevens correct in.</strong>";

        investeringElement.innerHTML = "€ 0";
        financieringsKostenElement.innerHTML = "€ 0";
        eigenGeldElement.innerHTML = "€ 0";
        winstElement.innerHTML = "€ 0";
        rendementElement.innerHTML = "0%";
        winstPerMaandElement.innerHTML = "€ 0";
        scoreElement.innerHTML = "0 / 100";

        knop.style.background = "#f4a261";

        return;
    }


    // =========================
    // AANKOOPKOSTEN
    // =========================

    const overdrachtsbelasting =
        aankoop * (overdracht / 100);

    const aankoopTotaal =
        aankoop +
        overdrachtsbelasting +
        notaris;


    // =========================
    // VERBOUWKOSTEN
    // =========================

    const onvoorzieneKosten =
        verbouw * (onvoorzien / 100);

    const verbouwingTotaal =
        verbouw +
        onvoorzieneKosten;


    // =========================
    // VERKOOPKOSTEN
    // =========================

    const makelaarskosten =
        verkoop * (makelaar / 100);

    const verkoopKosten =
        makelaarskosten +
        verkoopOverig;


    // =========================
    // TOTALE PROJECTKOSTEN
    // =========================

    const investering =
        aankoopTotaal +
        verbouwingTotaal;


    // =========================
    // FINANCIERING
    // =========================

    // Bedrag dat wordt gefinancierd
    const geleendBedrag =
        aankoop * (financiering / 100);


    // Eenvoudige rente-inschatting
    const financieringsKosten =
        geleendBedrag *
        (rente / 100) *
        (looptijd / 12);


    // Eigen geld dat nodig is
    const eigenGeld =
        investering +
        financieringsKosten -
        geleendBedrag;


    // =========================
    // NETTO PROJECTWINST
    // =========================

    const winst =
        verkoop -
        investering -
        financieringsKosten -
        verkoopKosten;


    // =========================
    // RENDEMENT
    // =========================

    let rendement = 0;

    if (eigenGeld > 0) {

        rendement =
            (winst / eigenGeld) * 100;
    }


    // =========================
    // WINST PER MAAND
    // =========================

    const winstPerMaand =
        winst / looptijd;


    // =========================
    // DASHBOARD BIJWERKEN
    // =========================

    investeringElement.innerHTML =
        euro(investering);

    financieringsKostenElement.innerHTML =
        euro(financieringsKosten);

    eigenGeldElement.innerHTML =
        euro(eigenGeld);

    winstElement.innerHTML =
        euro(winst);

    rendementElement.innerHTML =
        rendement.toLocaleString("nl-NL", {
            maximumFractionDigits: 1
        }) + "%";

    winstPerMaandElement.innerHTML =
        euro(winstPerMaand);


    // =========================
    // FLIPSCORE
    // =========================

    let score = 0;


    // Verlies
    if (winst < 0) {

        score = 20;

    }

    // Onder minimale winst
    else if (winst < minWinst) {

        score = 60;

    }

    // Goede winst
    else {

        score = 80;

    }


    // Extra punten voor rendement
    if (rendement >= 20) {

        score += 5;

    }

    if (rendement >= 40) {

        score += 5;

    }


    // Maximum 100
    score = Math.min(score, 100);


    // =========================
    // RESULTAAT KLEUR
    // =========================

    if (winst < 0) {

        knop.style.background = "#d62828";

        resultaat.style.background = "#ffe9e9";
        resultaat.style.border = "2px solid #d62828";
        resultaat.style.color = "#d62828";

        winstElement.style.color = "#d62828";
        rendementElement.style.color = "#d62828";
        scoreElement.style.color = "#d62828";

        resultaat.innerHTML =
            "🚨 <strong>NIET DOEN</strong><br><br>" +
            "Geschat verlies:<br>" +
            "<strong>" +
            euro(winst) +
            "</strong><br><br>" +
            "Op basis van de ingevulde gegevens lijkt deze flip verliesgevend.";
    }


    else if (winst < minWinst) {

        knop.style.background = "#f4a261";

        resultaat.style.background = "#fff5e6";
        resultaat.style.border = "2px solid #f4a261";
        resultaat.style.color = "#c97a00";

        winstElement.style.color = "#c97a00";
        rendementElement.style.color = "#c97a00";
        scoreElement.style.color = "#c97a00";

        resultaat.innerHTML =
            "⚠️ <strong>ONDERHANDELEN</strong><br><br>" +
            "Geschatte projectwinst:<br>" +
            "<strong>" +
            euro(winst) +
            "</strong><br><br>" +
            "Je minimale winstdoel van " +
            euro(minWinst) +
            " is nog niet behaald.";
    }


    else {

        knop.style.background = "#1b8d43";

        resultaat.style.background = "#e8f9ee";
        resultaat.style.border = "2px solid #1b8d43";
        resultaat.style.color = "#1b8d43";

        winstElement.style.color = "#1b8d43";
        rendementElement.style.color = "#1b8d43";
        scoreElement.style.color = "#1b8d43";

        resultaat.innerHTML =
            "✅ <strong>STERKE FLIP</strong><br><br>" +
            "Geschatte projectwinst:<br>" +
            "<strong>" +
            euro(winst) +
            "</strong><br><br>" +
            "Je minimale winstdoel van " +
            euro(minWinst) +
            " is behaald.";
    }


    // Score tonen
    scoreElement.innerHTML =
        score + " / 100";
}