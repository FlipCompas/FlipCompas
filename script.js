// ==========================================
// FLIPCOMPAS - BEREKENINGEN
// ==========================================


// ==========================================
// HULPFUNCTIES
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

    return "€ " +
        Math.round(bedrag).toLocaleString("nl-NL");

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


    // Onvoorziene kosten
    const onvoorzienKosten =
        verbouw * (onvoorzien / 100);


    // Makelaarskosten
    const makelaarsKosten =
        verkoop * (makelaar / 100);


    // Rente
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
    // VERKOOPKOSTEN
    // ======================================

    const totaleVerkoopkosten =
        makelaarsKosten +
        verkoopOverig;


    // ======================================
    // TOTALE PROJECTKOSTEN
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
    // FINANCIERINGSPERCENTAGE
    // ======================================

    let financieringsPercentage = 0;

    if (totaleInvestering > 0) {

        financieringsPercentage =
            (hypotheek / totaleInvestering) * 100;

    }


    // ======================================
    // BEDRAGEN BIJ INPUTS
    // ======================================

    if (overdrachtBedragElement) {

        overdrachtBedragElement.innerHTML =
            "→ " + euro(overdrachtsbelasting);

    }

    if (onvoorzienBedragElement) {

        onvoorzienBedragElement.innerHTML =
            "→ " + euro(onvoorzienKosten);

    }

    if (makelaarBedragElement) {

        makelaarBedragElement.innerHTML =
            "→ " + euro(makelaarsKosten);

    }

    if (renteBedragElement) {

        renteBedragElement.innerHTML =
            "→ " + euro(financieringsKosten);

    }


    // ======================================
    // DASHBOARD
    // ======================================

    if (investeringElement) {

        investeringElement.innerHTML =
            euro(totaleInvestering);

    }

    if (financieringsKostenElement) {

        financieringsKostenElement.innerHTML =
            euro(financieringsKosten);

    }

    if (eigenGeldElement) {

        eigenGeldElement.innerHTML =
            euro(eigenGeld);

    }

    if (winstElement) {

        winstElement.innerHTML =
            euro(winst);

    }

    if (rendementElement) {

        rendementElement.innerHTML =
            rendement.toLocaleString(
                "nl-NL",
                {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                }
            ) + "%";

    }

    if (winstPerMaandElement) {

        winstPerMaandElement.innerHTML =
            euro(winstPerMaand);

    }


    // ======================================
    // NIEUWE FLIPSCORE
    // ======================================

    let winstScore = 0;
    let rendementScore = 0;
    let eigenGeldScore = 0;
    let financieringsScore = 0;
    let looptijdScore = 0;


    // --------------------------------------
    // 1. WINST - MAX 30 PUNTEN
    // --------------------------------------

    if (winst <= 0) {

        winstScore = 0;

    }

    else if (minWinst > 0) {

        winstScore =
            (winst / (minWinst * 2)) * 30;

    }

    else {

        winstScore = 30;

    }


    if (winstScore > 30) {
        winstScore = 30;
    }


    // --------------------------------------
    // 2. RENDEMENT - MAX 30 PUNTEN
    // --------------------------------------

    if (rendement <= 0) {

        rendementScore = 0;

    }

    else {

        rendementScore =
            (rendement / 30) * 30;

    }


    if (rendementScore > 30) {
        rendementScore = 30;
    }


    // --------------------------------------
    // 3. EIGEN GELD - MAX 20 PUNTEN
    // Minder eigen geld = hogere score
    // --------------------------------------

    if (eigenGeld <= 50000) {

        eigenGeldScore = 20;

    }

    else if (eigenGeld <= 75000) {

        eigenGeldScore = 15;

    }

    else if (eigenGeld <= 100000) {

        eigenGeldScore = 12;

    }

    else if (eigenGeld <= 150000) {

        eigenGeldScore = 8;

    }

    else if (eigenGeld <= 200000) {

        eigenGeldScore = 4;

    }

    else {

        eigenGeldScore = 0;

    }


    // --------------------------------------
    // 4. FINANCIERINGSRISICO - MAX 10
    // Meer financiering = meer risico
    // --------------------------------------

    if (financieringsPercentage <= 30) {

        financieringsScore = 10;

    }

    else if (financieringsPercentage <= 60) {

        financieringsScore = 8;

    }

    else if (financieringsPercentage <= 80) {

        financieringsScore = 6;

    }

    else if (financieringsPercentage <= 90) {

        financieringsScore = 4;

    }

    else {

        financieringsScore = 2;

    }


    // --------------------------------------
    // 5. LOOPTIJD - MAX 10 PUNTEN
    // Kortere looptijd = hogere score
    // --------------------------------------

    if (looptijd <= 3) {

        looptijdScore = 10;

    }

    else if (looptijd <= 6) {

        looptijdScore = 9;

    }

    else if (looptijd <= 9) {

        looptijdScore = 7;

    }

    else if (looptijd <= 12) {

        looptijdScore = 5;

    }

    else if (looptijd <= 18) {

        looptijdScore = 3;

    }

    else {

        looptijdScore = 1;

    }


    // --------------------------------------
    // TOTAALSCORE
    // --------------------------------------

    let score =
        winstScore +
        rendementScore +
        eigenGeldScore +
        financieringsScore +
        looptijdScore;


    score =
        Math.round(score);


    if (score < 0) {
        score = 0;
    }

    if (score > 100) {
        score = 100;
    }


    // ======================================
    // SCORE WEERGEVEN
    // ======================================

    if (scoreElement) {

        scoreElement.innerHTML =
            score + " / 100";

    }


    // ======================================
    // RESULTAATTEKST
    // ======================================

    if (winst < 0) {

        knop.style.background =
            "#d62828";

        resultaat.style.background =
            "#ffe9e9";

        resultaat.style.border =
            "2px solid #d62828";

        resultaat.style.color =
            "#d62828";

        resultaat.innerHTML =
            "🚨 <strong>GEEN GOEDE DEAL</strong><br><br>" +
            "Geschat netto verlies:<br>" +
            "<strong>" +
            euro(Math.abs(winst)) +
            "</strong><br><br>" +
            "Op basis van de ingevulde cijfers lijkt deze flip verliesgevend.";

    }


    else if (winst < minWinst) {

        knop.style.background =
            "#f4a261";

        resultaat.style.background =
            "#fff5e6";

        resultaat.style.border =
            "2px solid #f4a261";

        resultaat.style.color =
            "#c97a00";

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

        knop.style.background =
            "#1b8d43";

        resultaat.style.background =
            "#e8f9ee";

        resultaat.style.border =
            "2px solid #1b8d43";

        resultaat.style.color =
            "#1b8d43";

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
    // KLEUREN DASHBOARD
    // ======================================

    if (winst < 0) {

        winstElement.style.color =
            "#d62828";

        rendementElement.style.color =
            "#d62828";

        winstPerMaandElement.style.color =
            "#d62828";

        scoreElement.style.color =
            "#d62828";

    }

    else if (winst < minWinst) {

        winstElement.style.color =
            "#c97a00";

        rendementElement.style.color =
            "#c97a00";

        winstPerMaandElement.style.color =
            "#c97a00";

        scoreElement.style.color =
            "#c97a00";

    }

    else {

        winstElement.style.color =
            "#1b8d43";

        rendementElement.style.color =
            "#1b8d43";

        winstPerMaandElement.style.color =
            "#1b8d43";

        scoreElement.style.color =
            "#1b8d43";
    }

}


// ==========================================
// AUTOMATISCH HERBEREKENEN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const velden =
            document.querySelectorAll("input");

        velden.forEach(
            function (veld) {

                veld.addEventListener(
                    "change",
                    function () {

                        bereken();

                    }
                );

            }
        );

    }
);