// FlipCompas - Deal Calculator

// Zet een bedrag om naar een getal.
// Werkt met bijvoorbeeld:
// 175000
// 175.000
// 175.000,50
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


// Hoofdberekening
function bereken() {

    // Gegevens uit de invoervelden
    const minWinst = leesBedrag("minWinst");
    const aankoop = leesBedrag("aankoop");
    const verbouw = leesBedrag("verbouw");
    const verkoop = leesBedrag("verkoop");
    const overdracht = leesBedrag("overdracht");

    // Onderdelen van de pagina
    const resultaat = document.getElementById("resultaat");
    const investeringElement = document.getElementById("investering");
    const winstElement = document.getElementById("winstKaart");
    const scoreElement = document.getElementById("flipscore");
    const knop = document.querySelector("button");

    // Controle
    if (
        !Number.isFinite(minWinst) ||
        !Number.isFinite(aankoop) ||
        !Number.isFinite(verbouw) ||
        !Number.isFinite(verkoop) ||
        !Number.isFinite(overdracht) ||
        minWinst < 0 ||
        aankoop <= 0 ||
        verbouw < 0 ||
        verkoop <= 0 ||
        overdracht < 0
    ) {

        resultaat.style.background = "#fff5e6";
        resultaat.style.border = "2px solid #f4a261";
        resultaat.style.color = "#c97a00";

        resultaat.innerHTML =
            "⚠️ <strong>Vul alle bedragen correct in.</strong>";

        investeringElement.innerHTML = "€ 0";
        winstElement.innerHTML = "€ 0";
        scoreElement.innerHTML = "0 / 100";

        knop.style.background = "#f4a261";

        return;
    }


    // =========================
    // BEREKENINGEN
    // =========================

    // Overdrachtsbelasting
    const overdrachtsbelasting =
        aankoop * (overdracht / 100);

    // Totale investering
    const investering =
        aankoop +
        verbouw +
        overdrachtsbelasting;

    // Verwachte winst
    const winst =
        verkoop -
        investering;


    // =========================
    // DASHBOARD
    // =========================

    investeringElement.innerHTML =
        "€ " + investering.toLocaleString("nl-NL");

    winstElement.innerHTML =
        "€ " + winst.toLocaleString("nl-NL");


    // =========================
    // FLIPSCORE
    // =========================

    let score = 0;


    // =========================
    // RODE ZONE
    // VERLIES
    // =========================

    if (winst < 0) {

        score = 20;

        knop.style.background = "#d62828";

        resultaat.style.background = "#ffe9e9";
        resultaat.style.border = "2px solid #d62828";
        resultaat.style.color = "#d62828";

        winstElement.style.color = "#d62828";
        scoreElement.style.color = "#d62828";

        resultaat.innerHTML =
            "🚨 <strong>LET OP!</strong><br><br>" +
            "Geschat verlies:<br>" +
            "<strong>€ " +
            winst.toLocaleString("nl-NL") +
            "</strong><br><br>" +
            "Deze investering lijkt op basis van de ingevulde cijfers verliesgevend.";
    }


    // =========================
    // ORANJE ZONE
    // LAGE WINSTMARGE
    // =========================

    else if (winst < minWinst) {

        score = 65;

        knop.style.background = "#f4a261";

        resultaat.style.background = "#fff5e6";
        resultaat.style.border = "2px solid #f4a261";
        resultaat.style.color = "#c97a00";

        winstElement.style.color = "#c97a00";
        scoreElement.style.color = "#c97a00";

        resultaat.innerHTML =
            "⚠️ <strong>LAGE WINSTMARGE</strong><br><br>" +
            "Geschatte winst:<br>" +
            "<strong>€ " +
            winst.toLocaleString("nl-NL") +
            "</strong><br><br>" +
            "Je minimale winstdoel van € " +
            minWinst.toLocaleString("nl-NL") +
            " is nog niet behaald.";
    }


    // =========================
    // GROENE ZONE
    // GOEDE DEAL
    // =========================

    else {

        score = 90;

        knop.style.background = "#1b8d43";

        resultaat.style.background = "#e8f9ee";
        resultaat.style.border = "2px solid #1b8d43";
        resultaat.style.color = "#1b8d43";

        winstElement.style.color = "#1b8d43";
        scoreElement.style.color = "#1b8d43";

        resultaat.innerHTML =
            "✅ <strong>GOEDE DEAL</strong><br><br>" +
            "Geschatte winst:<br>" +
            "<strong>€ " +
            winst.toLocaleString("nl-NL") +
            "</strong><br><br>" +
            "Je minimale winstdoel van € " +
            minWinst.toLocaleString("nl-NL") +
            " is behaald.";
    }


    // Score tonen
    scoreElement.innerHTML =
        score + " / 100";
}