// Zet Nederlandse bedragen om naar echte getallen.
// Zowel 175000 als 175.000 wordt 175000.
function leesBedrag(id) {
    let waarde = document.getElementById(id).value.trim();

    // Verwijder eurotekens, spaties en punten (duizendtallen)
    waarde = waarde
        .replace(/€/g, "")
        .replace(/\s/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    return Number(waarde);
}

function bereken() {

    const minWinst = leesBedrag("minWinst");
    const aankoop = leesBedrag("aankoop");
    const verbouw = leesBedrag("verbouw");
    const verkoop = leesBedrag("verkoop");
const overdracht = leesBedrag("overdracht");
    const resultaat = document.getElementById("resultaat");
    const investeringElement = document.getElementById("investering");
    const winstElement = document.getElementById("winstKaart");
    const scoreElement = document.getElementById("flipscore");
    const knop = document.querySelector("button");

    // Controleer of de bedragen correct zijn ingevuld
    if (
        !Number.isFinite(aankoop) ||
        !Number.isFinite(verbouw) ||
        !Number.isFinite(verkoop) ||
        !Number.isFinite(minWinst) ||
        aankoop <= 0 ||
        verbouw < 0 ||
        verkoop <= 0 ||
        minWinst <= 0
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

    // Berekeningen
    const investering = aankoop + verbouw;
    const winst = verkoop - investering;

    // Dashboard bijwerken
    investeringElement.innerHTML =
        "€ " + investering.toLocaleString("nl-NL");

    winstElement.innerHTML =
        "€ " + winst.toLocaleString("nl-NL");

    let score = 0;

    // =========================
    // RODE ZONE - VERLIES
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
    // ORANJE ZONE - LAGE MARGE
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
    // GROENE ZONE - GOEDE DEAL
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

    scoreElement.innerHTML =
        score + " / 100";
}
