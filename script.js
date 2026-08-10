// ==========================================
// FLIPCOMPAS - BEREKENINGEN
// ==========================================


// ==========================================
// BEDRAG UITLEZEN
// ==========================================

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


// ==========================================
// EURO WEERGAVE
// ==========================================

function euro(bedrag) {

    return "€ " + Math.round(bedrag)
        .toLocaleString("nl-NL");

}


// ==========================================
// HOOFDBEREKENING
// ==========================================

function bereken() {


    // --------------------------------------
    // INPUTS
    // --------------------------------------

    const aankoop =
        leesBedrag("aankoop");

    const overdracht =
        leesBedrag("overdracht");

    const notaris =
        leesBedrag("notaris");

    const verbouw =
        leesBedrag("verbouw");

    const onvoorzien =
        leesBedrag("onvoorzien");

    const verkoop =
        leesBedrag("verkoop");

    const makelaar =
        leesBedrag("makelaar");

    const verkoopOverig =
        leesBedrag("verkoopOverig");

    const financieringsPercentage =
        leesBedrag("financieringsPercentage");

    const maximaleHypotheek =
        leesBedrag("hypotheek");

    const rente =
        leesBedrag("rente");

    const looptijd =
        leesBedrag("looptijd");

    const minWinst =
        leesBedrag("minWinst");


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
    // KOSTEN
    // ======================================

    const overdrachtsbelasting =
        aankoop * (overdracht / 100);


    const onvoorzienKosten =
        verbouw * (onvoorzien / 100);


    const makelaarsKosten =
        verkoop * (makelaar / 100);


    // ======================================
    // INVESTERING ZONDER FINANCIERING
    // ======================================

    const totaleInvestering =
        aankoop +
        overdrachtsbelasting +
        notaris +
        verbouw +
        onvoorzien;


    // ======================================
    // GEWENSTE LENING
    // ======================================

    let gewensteLening =
        totaleInvestering *
        (financieringsPercentage / 100);


    // ======================================
    // MAXIMALE LENING
    // ======================================

    let werkelijkeLening =
        Math.min(
            gewensteLening,
            maximaleHypotheek
        );


    // Negatieve waarden voorkomen
    if (werkelijkeLening < 0) {
        werkelijkeLening = 0;
    }


    // ======================================
    // FINANCIERINGSKOSTEN
    // ======================================

    const financieringsKosten =
        werkelijkeLening *
        (rente / 100) *
        (looptijd / 12);


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
        werkelijkeLening;


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
    // RENDEMENT OP EIGEN GELD
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
    // BEDRAGEN IN FORMULIER
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
    // FLIPSCORE
    // ======================================

    let score = 0;


    // --------------------------------------
    // 1. WINST
    // --------------------------------------

    if (winst <= 0) {

        score = 10;

    }

    else if (winst < minWinst) {

        score = 45;

    }

    else if (winst < minWinst * 1.5) {

        score = 65;

    }

    else if (winst < minWinst * 2) {

        score = 80;

    }

    else {

        score = 90;

    }


    // --------------------------------------
    // 2. RENDEMENT
    // --------------------------------------

    if (rendement >= 50) {

        score += 8;

    }

    else if (rendement >= 35) {

        score += 6;

    }

    else if (rendement >= 25) {

        score += 4;

    }

    else if (rendement >= 15) {

        score += 2;

    }


    // --------------------------------------
    // 3. FINANCIERINGSRISICO
    // --------------------------------------

    // Veel financiering betekent minder eigen geld,
    // maar ook meer risico.

    if (financieringsPercentage <= 30) {

        score += 2;

    }

    else if (financieringsPercentage <= 50) {

        score += 3;

    }

    else if (financieringsPercentage <= 70) {

        score += 2;

    }

    else if (financieringsPercentage <= 85) {

        score += 0;

    }

    else {

        score -= 5;

    }


    // --------------------------------------
    // 4. LENINGSPROBLEEM
    // --------------------------------------

    if (
        gewensteLening > maximaleHypotheek &&
        maximaleHypotheek > 0
    ) {

        score -= 10;

    }


    // --------------------------------------
    // SCORE BEGRENZEN
    // --------------------------------------

    score =
        Math.max(
            0,
            Math.min(100, Math.round(score))
        );


    if (scoreElement) {

        scoreElement.innerHTML =
            score + " / 100";

    }


    // ======================================
    // RESULTAAT
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
    // KLEUR DASHBOARD
    // ======================================

    let dashboardKleur;


    if (winst < 0) {

        dashboardKleur =
            "#d62828";

    }

    else if (winst < minWinst) {

        dashboardKleur =
            "#c97a00";

    }

    else {

        dashboardKleur =
            "#1b8d43";

    }


    winstElement.style.color =
        dashboardKleur;

    rendementElement.style.color =
        dashboardKleur;

    winstPerMaandElement.style.color =
        dashboardKleur;

    scoreElement.style.color =
        dashboardKleur;
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
                    "input",
                    function () {

                        bereken();

                    }
                );

            }
        );


        bereken();

    }
);