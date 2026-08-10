// ==========================================
// FLIPCOMPAS - COMPLETE BEREKENING
// ==========================================


// ==========================================
// HULPFUNCTIES
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

    const financieringsPercentage =
        leesBedrag("financieringPercentage");

    const maximaleHypotheek =
        leesBedrag("hypotheek");

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
    // BASISCONTROLE
    // ======================================

    if (
        aankoop <= 0 ||
        verbouw < 0 ||
        verkoop <= 0 ||
        financieringsPercentage < 0 ||
        financieringsPercentage > 100 ||
        maximaleHypotheek < 0 ||
        rente < 0 ||
        looptijd <= 0
    ) {

        resultaat.innerHTML =
            "⚠️ <strong>Vul de gegevens correct in.</strong>";

        return;
    }


    // ======================================
    // AANKOOPKOSTEN
    // ======================================

    const overdrachtsbelasting =
        aankoop * (overdracht / 100);


    // ======================================
    // ONVOORZIENE KOSTEN
    // ======================================

    const onvoorzienKosten =
        verbouw * (onvoorzien / 100);


    // ======================================
    // TOTALE INVESTERING
    // ======================================

    const totaleInvestering =
        aankoop +
        overdrachtsbelasting +
        notaris +
        verbouw +
        onvoorzienKosten;


    // ======================================
    // VERKOOPKOSTEN
    // ======================================

    const makelaarsKosten =
        verkoop * (makelaar / 100);

    const totaleVerkoopkosten =
        makelaarsKosten +
        verkoopOverig;


    // ======================================
    // GEWENSTE FINANCIERING
    // ======================================

    let gewensteLening =
        totaleInvestering *
        (financieringsPercentage / 100);


    // De werkelijke lening mag nooit hoger
    // zijn dan de maximale hypotheek/lening.

    let werkelijkeLening =
        Math.min(
            gewensteLening,
            maximaleHypotheek
        );


    // Een lening kan nooit negatief zijn.

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
    // FLIPSCORE
    // ======================================
    //
    // De score kijkt nu naar:
    //
    // 1. Winst
    // 2. Rendement op eigen geld
    // 3. Risico van financiering
    //
    // Daardoor is 10% financiering niet
    // simpelweg het omgekeerde van 90%.
    // Meer financiering betekent:
    // - minder eigen geld nodig
    // - hogere rente
    // - hoger financieel risico
    //
    // ======================================

    let score = 0;


    // --------------------------------------
    // 1. WINST: maximaal 50 punten
    // --------------------------------------

    if (winst > 0) {

        const winstFactor =
            Math.min(
                winst / Math.max(minWinst, 1),
                2
            );

        score += winstFactor * 25;

    }


    // --------------------------------------
    // 2. RENDEMENT: maximaal 30 punten
    // --------------------------------------

    if (rendement > 0) {

        const rendementFactor =
            Math.min(
                rendement / 30,
                1
            );

        score += rendementFactor * 30;

    }


    // --------------------------------------
    // 3. FINANCIERINGSRISICO: maximaal 20
    // --------------------------------------

    const risicoScore =
        20 -
        (financieringsPercentage * 0.20);

    score += Math.max(risicoScore, 0);


    // --------------------------------------
    // NEGATIEVE WINST
    // --------------------------------------

    if (winst <= 0) {

        score = 20;

    }


    // --------------------------------------
    // AFRONDEN
    // --------------------------------------

    score =
        Math.round(
            Math.max(
                0,
                Math.min(score, 100)
            )
        );


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

        // Eerste berekening
        bereken();

    }
);