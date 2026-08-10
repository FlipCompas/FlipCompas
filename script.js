// ==========================================
// FLIPCOMPAS - BEREKENINGEN
// ==========================================


// Nederlandse bedragen uitlezen
function leesBedrag(id) {

    const element = document.getElementById(id);

    if (!element) {
        return 0;
    }

    let waarde = element.value
        .toString()
        .trim();

    waarde = waarde
        .replace(/€/g, "")
        .replace(/\s/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    const getal = Number(waarde);

    return Number.isFinite(getal) ? getal : 0;
}


// Bedrag netjes weergeven
function euro(bedrag) {

    return "€ " + Math.round(bedrag).toLocaleString("nl-NL");

}


// ==========================================
// HOOFDBEREKENING
// ==========================================

function bereken() {

    // --------------------------------------
    // INPUTS
    // --------------------------------------

    const aankoop = leesBedrag("aankoop");
    const overdracht = leesBedrag("overdracht");
    const notaris = leesBedrag("notaris");

    const verbouw = leesBedrag("verbouw");
    const onvoorzien = leesBedrag("onvoorzien");

    const verkoop = leesBedrag("verkoop");
    const makelaar = leesBedrag("makelaar");
    const verkoopOverig = leesBedrag("verkoopOverig");

    const hypotheek = leesBedrag("hypotheek");
    const rente = leesBedrag("rente");
    const looptijd = leesBedrag("looptijd");

    const minWinst = leesBedrag("minWinst");


    // --------------------------------------
    // ELEMENTEN
    // --------------------------------------

    const resultaat = document.getElementById("resultaat");

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

    const overdrachtBedragElement =
        document.getElementById("overdrachtBedrag");

    const onvoorzienBedragElement =
        document.getElementById("onvoorzienBedrag");

    const makelaarBedragElement =
        document.getElementById("makelaarBedrag");

    const renteBedragElement =
        document.getElementById("renteBedrag");

    const knop =
        document.querySelector("button");


    // ======================================
    // BEDRAGEN UITREKENEN
    // ======================================

    // Overdrachtsbelasting
    const overdrachtsbelasting =
        aankoop * (overdracht / 100);


    // Onvoorzien tijdens verbouwing
    const onvoorzienKosten =
        verbouw * (onvoorzien / 100);


    // Makelaarskosten bij verkoop
    const makelaarsKosten =
        verkoop * (makelaar / 100);


    // Financieringskosten
    // Rente wordt berekend over de lening
    // gedurende de volledige looptijd.
    const financieringsKosten =
        hypotheek *
        (rente / 100) *
        (looptijd / 12);


    // ======================================
    // TOTALE INVESTERING
    // ======================================

    const totaleInvestering =
        aankoop +
        overdrachtsbelasting +
        notaris +
        verbouw +
        onvoorzien;


    // ======================================
    // TOTALE VERKOOPKOSTEN
    // ======================================

    const totaleVerkoopkosten =
        makelaarsKosten +
        verkoopOverig;


    // ======================================
    // TOTAAL GELD DAT HET PROJECT KOST
    // ======================================

    const totaleProjectKosten =
        totaleInvestering +
        financieringsKosten +
        totaleVerkoopkosten;


    // ======================================
    // EIGEN GELD
    // ======================================

    let eigenGeld =
        totaleInvestering +
        financieringsKosten -
        hypotheek;


    // Eigen geld kan nooit negatief zijn
    if (eigenGeld < 0) {
        eigenGeld = 0;
    }


    // ======================================
    // NETTO PROJECTWINST
    // ======================================

    const winst =
        verkoop -
        totaleProjectKosten;


    // ======================================
    // RENDEMENT EIGEN GELD
    // ======================================

    let rendement = 0;

    if (eigenGeld > 0) {

        rendement =
            (winst / eigenGeld) * 100;

    }


    // ======================================
    // WINST PER MAAND
    // ======================================

    let winstPerMaand = 0;

    if (looptijd > 0) {

        winstPerMaand =
            winst / looptijd;

    }


    // ======================================
    // BEDRAGEN IN HET FORMULIER
    // ======================================

    overdrachtBedragElement.innerHTML =
        "→ " + euro(overdrachtsbelasting);

    onvoorzienBedragElement.innerHTML =
        "→ " + euro(onvoorzienKosten);

    makelaarBedragElement.innerHTML =
        "→ " + euro(makelaarsKosten);

    renteBedragElement.innerHTML =
        "→ " + euro(financieringsKosten);


    // ======================================
    // DASHBOARD
    // ======================================

    investeringElement.innerHTML =
        euro(totaleInvestering);

    financieringsKostenElement.innerHTML =
        euro(financieringsKosten);

    eigenGeldElement.innerHTML =
        euro(eigenGeld);

    winstElement.innerHTML =
        euro(winst);

    rendementElement.innerHTML =
        Math.round(rendement) + "%";

    winstPerMaandElement.innerHTML =
        euro(winstPerMaand);


    // ======================================
    // FLIPSCORE
    // ======================================

    let score = 0;


    if (winst <= 0) {

        score = 20;

    }

    else if (winst < minWinst) {

        score = 60;

    }

    else {

        score = 90;

    }


    // Extra punten voor goed rendement
    if (rendement >= 30 && winst > 0) {

        score += 5;

    }


    // Score maximaal 100
    if (score > 100) {

        score = 100;

    }


    scoreElement.innerHTML =
        score + " / 100";


    // ======================================
    // RESULTAAT
    // ======================================

    if (winst < 0) {

        knop.style.background = "#d62828";

        resultaat.style.background = "#ffe9e9";
        resultaat.style.border =
            "2px solid #d62828";
        resultaat.style.color = "#d62828";

        resultaat.innerHTML =
            "🚨 <strong>GEEN GOEDE DEAL</strong><br><br>" +
            "Geschat netto verlies:<br>" +
            "<strong>" +
            euro(Math.abs(winst)) +
            "</strong><br><br>" +
            "Op basis van de ingevulde cijfers lijkt deze flip verliesgevend.";

    }


    else if (winst < minWinst) {

        knop.style.background = "#f4a261";

        resultaat.style.background = "#fff5e6";
        resultaat.style.border =
            "2px solid #f4a261";
        resultaat.style.color = "#c97a00";

        resultaat.innerHTML =
            "⚠️ <strong>LAGE WINSTMARGE</strong><br><br>" +
            "Geschatte netto winst:<br>" +
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
        resultaat.style.border =
            "2px solid #1b8d43";
        resultaat.style.color = "#1b8d43";

        resultaat.innerHTML =
            "✅ <strong>GOEDE DEAL</strong><br><br>" +
            "Geschatte netto winst:<br>" +
            "<strong>" +
            euro(winst) +
            "</strong><br><br>" +
            "Je minimale winstdoel van " +
            euro(minWinst) +
            " is behaald.";
    }


    // ======================================
    // KLEUR DASHBOARD
    // ======================================

    if (winst < 0) {

        winstElement.style.color = "#d62828";
        rendementElement.style.color = "#d62828";
        winstPerMaandElement.style.color = "#d62828";
        scoreElement.style.color = "#d62828";

    }

    else if (winst < minWinst) {

        winstElement.style.color = "#c97a00";
        rendementElement.style.color = "#c97a00";
        winstPerMaandElement.style.color = "#c97a00";
        scoreElement.style.color = "#c97a00";

    }

    else {

        winstElement.style.color = "#1b8d43";
        rendementElement.style.color = "#1b8d43";
        winstPerMaandElement.style.color = "#1b8d43";
        scoreElement.style.color = "#1b8d43";

    }

}


// ==========================================
// AUTOMATISCH HERBEREKENEN
// ==========================================

// Zodra je een bedrag verandert en daarna
// ergens anders klikt, wordt de berekening
// automatisch bijgewerkt.

document.addEventListener("DOMContentLoaded", function () {

    const velden = document.querySelectorAll("input");

    velden.forEach(function (veld) {

        veld.addEventListener("change", function () {

            bereken();

        });

    });

});