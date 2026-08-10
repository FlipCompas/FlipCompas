// ==========================================
// FLIPCOMPAS - BEREKENINGEN
// ==========================================


// ==========================================
// NEDERLANDSE BEDRAGEN UITLEZEN
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
// BEDRAG NETJES WEERGEVEN
// ==========================================

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
    // BASIS CONTROLE
    // ======================================

    if (
        aankoop <= 0 ||
        verkoop <= 0 ||
        verbouw < 0 ||
        notaris < 0 ||
        hypotheek < 0 ||
        rente < 0 ||
        looptijd <= 0 ||
        minWinst < 0
    ) {

        resultaat.style.background = "#fff5e6";
        resultaat.style.border = "2px solid #f4a261";
        resultaat.style.color = "#c97a00";

        resultaat.innerHTML =
            "⚠️ <strong>Vul alle gegevens correct in.</strong>";

        return;
    }


    // ======================================
    // KOSTEN BEREKENEN
    // ======================================

    // Overdrachtsbelasting
    const overdrachtsbelasting =
        aankoop * (overdracht / 100);


    // Reserve onvoorziene kosten
    const onvoorzienKosten =
        verbouw * (onvoorzien / 100);


    // Makelaarskosten verkoop
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
        onvoorzienKosten;


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
    // RENDEMENT OP EIGEN GELD
    // ======================================

    let rendement = 0;

    if (eigenGeld > 0 && winst > 0) {

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


    // Maximaal 100%
    financieringsPercentage =
        Math.min(financieringsPercentage, 100);


    // ======================================
    // BEDRAGEN BIJ DE INPUTS
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

    investeringElement.innerHTML =
        euro(totaleInvestering);


    financieringsKostenElement.innerHTML =
        euro(financieringsKosten);


    eigenGeldElement.innerHTML =
        euro(eigenGeld);


    winstElement.innerHTML =
        euro(winst);


    rendementElement.innerHTML =
        rendement.toLocaleString(
            "nl-NL",
            {
                maximumFractionDigits: 1
            }
        ) + "%";


    winstPerMaandElement.innerHTML =
        euro(winstPerMaand);


    // ======================================
    // FLIPSCORE
    //
    // De score bestaat nu uit:
    //
    // 40 punten = winst
    // 30 punten = rendement
    // 20 punten = financiering
    // 10 punten = looptijd
    //
    // Hierdoor maakt 90% financiering
    // daadwerkelijk verschil met 10%.
    // ======================================

    let scoreWinst = 0;
    let scoreRendement = 0;
    let scoreFinanciering = 0;
    let scoreLooptijd = 0;


    // ======================================
    // 1. WINST - MAX 40 PUNTEN
    // ======================================

    if (winst <= 0) {

        scoreWinst = 0;

    }

    else {

        const winstVerhouding =
            winst / verkoop;

        scoreWinst =
            Math.min(
                winstVerhouding / 0.20 * 40,
                40
            );

    }


    // ======================================
    // 2. RENDEMENT - MAX 30 PUNTEN
    // ======================================

    if (rendement <= 0) {

        scoreRendement = 0;

    }

    else {

        scoreRendement =
            Math.min(
                rendement / 40 * 30,
                30
            );

    }


    // ======================================
    // 3. FINANCIERING - MAX 20 PUNTEN
    //
    // Meer financiering betekent minder
    // eigen geld nodig.
    //
    // Maar 100% financiering wordt niet
    // automatisch als perfect gezien.
    //
    // Ideale zone ligt ongeveer rond 70-80%.
    // ======================================

    if (financieringsPercentage <= 0) {

        scoreFinanciering = 5;

    }

    else if (financieringsPercentage <= 70) {

        scoreFinanciering =
            5 +
            (financieringsPercentage / 70) * 11;

    }

    else if (financieringsPercentage <= 80) {

        scoreFinanciering =
            16 +
            ((financieringsPercentage - 70) / 10) * 4;

    }

    else if (financieringsPercentage <= 90) {

        scoreFinanciering =
            20 -
            ((financieringsPercentage - 80) / 10) * 2;

    }

    else {

        scoreFinanciering = 16;

    }


    // ======================================
    // 4. LOOPTIJD - MAX 10 PUNTEN
    // ======================================

    if (looptijd <= 3) {

        scoreLooptijd = 10;

    }

    else if (looptijd <= 6) {

        scoreLooptijd = 8;

    }

    else if (looptijd <= 9) {

        scoreLooptijd = 6;

    }

    else if (looptijd <= 12) {

        scoreLooptijd = 4;

    }

    else {

        scoreLooptijd = 2;

    }


    // ======================================
    // TOTALE FLIPSCORE
    // ======================================

    let score =
        scoreWinst +
        scoreRendement +
        scoreFinanciering +
        scoreLooptijd;


    // Afronden
    score = Math.round(score);


    // Minimaal 0
    score = Math.max(score, 0);


    // Maximaal 100
    score = Math.min(score, 100);


    scoreElement.innerHTML =
        score + " / 100";


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
            "✅ <strong>STERKE FLIP</strong><br><br>" +
            "Geschatte netto projectwinst:<br>" +
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