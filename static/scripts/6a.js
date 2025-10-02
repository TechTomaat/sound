const woorden = [
  { latijn: "Pyramus occisus est \n waar of niet waar?", nederlands: "waar" },
  { latijn: "Pyramus potuit invenire Thisbe \n waar of niet waar?", nederlands: "niet waar" },
  { latijn: "Vestigia leonis sunt \n waar of niet waar?", nederlands: "niet waar" },
  { latijn: "Pyramus doluit \n waar of niet waar?", nederlands: "waar" },
  { latijn: "Pyramus videt velamen Thisbes \n waar of niet waar?", nederlands: "waar" },
  { latijn: "Quid Pyramus vidit? \n\n Vul het missende woord in: Pyramus vidit ..... leae.", nederlands: "vestigia" },
  { latijn: "Qui Pyramus invenire non potuit? \n\n Vul het missende woord in: Pyramus Thisben ..... non potuit", nederlands: "invenire" },
  { latijn: "Qui sero venit? \n\n Vul het missende woord in: ..... sero venit.", nederlands: "Pyramus" },
  { latijn: "Quid culpa Pyrami est? \n\n Vul het missende woord in: Culpa Pyrami est ..... Thisbes", nederlands: "mors" },
  { latijn: "Quid Pyramus Thisben rogat, dum dolebat? \n\n Citeer tussen regel 3 en 7 één zin:", nederlands: "Quid accidit?" },
  { latijn: "Ubi Pyramus adiit? \n\n Vul het missende woord in: Pyramus ad ..... adiit.", nederlands: "arborem" },
  { latijn: "(Pyramus/Thisbe) Circumspicit. \n\n Kies de juiste optie tussen de haakjes:", nederlands: "Pyramus" },
  { latijn: "Pyramus (Thisbe/velamen) invenit. \n\n Kies de juiste optie tussen de haakjes:", nederlands: "Velamen" },
  { latijn: "(Parentibus/Pyramus et Thisbe) domos relinquerunt. \n\n Kies de juiste optie tussen de haakjes:", nederlands: "Pyramus et Thisbe" },
  { latijn: "Mors est culpa (Pyrami/Thisbes). \n\n Kies de juiste optie tussen de haakjes:",    nederlands: "Pyrami" },
];

let huidigWoord;
let gebruikteWoorden = [];
let score = 0; 
const totaalWoorden = woorden.length;

function nieuwWoord() {
    if (gebruikteWoorden.length === totaalWoorden) {
        document.getElementById('latijn-woord').innerText = "De oefening is klaar";
        document.getElementById('antwoord').style.display = "none";
        
        const percentage = Math.floor((score / totaalWoorden) * 100);
        
        document.getElementById('feedback').innerText = `Eindscore: ${score} van ${totaalWoorden} (${percentage}%)`;
        document.getElementById('volgendeButton').style.display = "none";
        document.querySelector('button[onclick="controleerAntwoord()"]').style.display = "none";

        // Maak de knoppen zichtbaar na de oefening
        document.getElementById('homeschermButton').style.display = "inline-block";
        document.getElementById('opdrachtOpnieuwButton').style.display = "inline-block";

        gebruikteWoorden = [];
        return;
    }

    let index;
    do {
        index = Math.floor(Math.random() * totaalWoorden);
    } while (gebruikteWoorden.includes(index));

    gebruikteWoorden.push(index);
    huidigWoord = woorden[index];

    document.getElementById('latijn-woord').innerText = huidigWoord.latijn;
    document.getElementById('antwoord').value = "";
    document.getElementById('antwoord').disabled = false; 
    document.getElementById('feedback').innerText = "";
    document.getElementById('volgendeButton').style.display = "none";

    // Verberg de knoppen voor het homescherm opnieuw en opdracht opnieuw
    document.getElementById('homeschermButton').style.display = "none";
    document.getElementById('opdrachtOpnieuwButton').style.display = "none";
}

function controleerAntwoord() {
    const antwoord = document.getElementById('antwoord').value.trim().toLowerCase();
    if (antwoord === huidigWoord.nederlands.toLowerCase()) {
        document.getElementById('feedback').innerText = "Goed";
        score++; 
    } else {
        document.getElementById('feedback').innerText = `Fout, het juiste antwoord is: ${huidigWoord.nederlands}.`;
        document.getElementById('antwoord').disabled = true; 
    }
    document.getElementById('volgendeButton').style.display = "inline-block";
}

function gaNaarHome() {
    window.location.href = '/redirect_home';
}

function opdrachtOpnieuw() {
    score = 0; // Reset de score
    gebruikteWoorden = []; // Reset de gebruikte woorden
    nieuwWoord(); // Laad een nieuw woord

    // Zorg ervoor dat de invoervelden en knoppen zichtbaar zijn
    document.getElementById('antwoord').style.display = "inline-block"; // Zorg ervoor dat het invoerveld zichtbaar is
    document.getElementById('antwoord').value = ""; // Maak het invoerveld leeg
    document.getElementById('feedback').innerText = ""; // Maak de feedback leeg

    // Maak de controleerknop zichtbaar
    document.querySelector('button[onclick="controleerAntwoord()"]').style.display = "inline-block"; 

    // Verberg de knoppen voor het homescherm en opnieuw starten
    document.getElementById('homeschermButton').style.display = "none";
    document.getElementById('opdrachtOpnieuwButton').style.display = "none";
}

document.addEventListener('DOMContentLoaded', nieuwWoord);

document.getElementById('antwoord').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (document.getElementById('volgendeButton').style.display === "inline-block") {
            nieuwWoord();
        } else {
            controleerAntwoord();
        }
    }
});