// ==========================================
// FLIPCOMPAS - BEREKENINGEN
// ==========================================


// ==========================================
// BEDRAGEN / GETALLEN UITLEZEN
// ==========================================

function leesBedrag(id) {

    const element = document.getElementById(id);

    if (!element) {
        return 0;
    }

    let waarde = element.value
        .toString()
        .trim();

    if (waarde === "") {
        return 0;
    }

    // Nederlandse komma ondersteunen
    waarde = waarde.replace(",", ".");

    const getal = Number(waarde);

    return Number.isFinite(getal) ? getal : 0;
}


// ==========================================
// EURO WEERGAVE
// ==========================================

function euro(bedrag) {

    return "€ " + Math.round(bedrag).toLocaleString("nl-NL");

}


// ==========================================
// HOOFDBEREKENING
// ==========================================

function bereken() {

    const aankoop = leesBedrag("aankoop");
    const overdracht = leesBedrag("overdracht");
    const notaris = leesBedrag("notaris");

    const verbouw = leesBedrag("verbouw");
    const onvoorzien = leesBedrag("onvoorzien");

    const verkoop = leesBedrag("verkoop");
    const makelaar = leesBedrag("makelaar");
    const verkoopOverig = leesBedrag("verkoopOverig");

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


    // ======================================
    // ELEMENTEN
    // ======================================

    const resultaat =
        document.getElementById("resultaat");

    const investeringElement =
        document.getElementById("investering");

    const werkelijkeLeningElement =
        document.getElementById("werkelijkeLening");

    const eigenGeldElement =
        document.getElementById("eigenGeld");

    const financieringsKostenElement =
        document.getElementById("financieringsKosten");

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
    // AANKOOPKOSTEN
    // ======================================

    const overdrachtsbelasting =
        aankoop * (overdracht / 100);


    // ======================================
    // ONVOORZIEN
    // ======================================

    const onvoorzienKosten =
        verbouw * (onvoorzien / 100);


    // ======================================
    // MAKELAAR
    // ======================================

    const makelaarsKosten =
        verkoop * (makelaar / 100);


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
    // WERKELIJKE LENING
    // ======================================

    const gewensteLening =
        totaleInvestering *
        (financieringsPercentage / 100);

    let werkelijkeLening =
        Math.min(
            gewensteLening,
            maximaleHypotheek
        );

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
    // DYNAMISCHE FINANCIERINGSTEKST
    // ======================================

    const financieringsInput =
        document.getElementById("financieringsPercentage");

    if (financieringsInput) {

        const uitleg =
            financieringsInput.parentElement
                .nextElementSibling;

        if (uitleg) {

            uitleg.innerHTML =
                "Bijvoorbeeld " +
                financieringsPercentage +
                "% betekent dat " +
                financieringsPercentage +
                "% van de totale investering wordt gefinancierd.";

        }

    }


    // ======================================
    // DASHBOARD
    // ======================================

    if (investeringElement) {

        investeringElement.innerHTML =
            euro(totaleInvestering);

    }

    if (werkelijkeLeningElement) {

        werkelijkeLeningElement.innerHTML =
            euro(werkelijkeLening);

    }

    if (eigenGeldElement) {

        eigenGeldElement.innerHTML =
            euro(eigenGeld);

    }

    if (financieringsKostenElement) {

        financieringsKostenElement.innerHTML =
            euro(financieringsKosten);

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

    if (winst <= 0) {

        score = 20;

    } else if (winst < minWinst) {

        score = 60;

    } else {

        score = 90;

    }

    if (rendement >= 30 && winst > 0) {
        score += 5;
    }

    if (rendement >= 40 && winst > 0) {
        score += 5;
    }

    if (score > 100) {
        score = 100;
    }

    if (scoreElement) {

        scoreElement.innerHTML =
            score + " / 100";

    }


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

    } else if (winst < minWinst) {

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

    } else {

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

    let kleur;

    if (winst < 0) {

        kleur = "#d62828";

    } else if (winst < minWinst) {

        kleur = "#c97a00";

    } else {

        kleur = "#1b8d43";

    }

    if (winstElement) {
        winstElement.style.color = kleur;
    }

    if (rendementElement) {
        rendementElement.style.color = kleur;
    }

    if (winstPerMaandElement) {
        winstPerMaandElement.style.color = kleur;
    }

    if (scoreElement) {
        scoreElement.style.color = kleur;
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

                // Direct opnieuw berekenen
                veld.addEventListener(
                    "input",
                    function () {
                        bereken();
                    }
                );


                // ==================================
                // HELE WAARDE SELECTEREN BIJ TIKKEN
                // ==================================

                veld.addEventListener(
                    "focus",
                    function () {

                        // Kleine vertraging zodat
                        // iPhone/Safari dit goed uitvoert
                        setTimeout(
                            function () {

                                veld.select();

                            },
                            50
                        );

                    }
                );

            }
        );


        // Meteen berekenen bij openen
        bereken();

    }
);