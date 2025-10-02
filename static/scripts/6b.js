const woorden = [
  { latijn: "Corpus Pyrami movebat \n waar of niet waar?", nederlands: "niet waar" },
  { latijn: "Thisbe ad Pyramum iit \n waar of niet waar?", nederlands: "waar" },
  { latijn: "Pyramus vocavit Thisben \n waar of niet waar?", nederlands: "niet waar" },
  { latijn: "Pyramus et Thisbe vivunt \n waar of niet waar?", nederlands: "niet waar" },
  { latijn: "Thisbe expectavit leam \n waar of niet waar?", nederlands: "niet waar" },
  { latijn: "Quod accidit, cum Thisbe pyramum exspectavit?? \n\n Vul het missende woord in: Subito ..... vidit et appropinquavit.", nederlands: "corpus" },
  { latijn: "Quid Thisbe appropinquavit? \n\n Vul het missende woord in: Thisbe appropinquavit corpus .....", nederlands: "Pyrami" },
  { latijn: "Quod Thisbe intravit, cum lea venit?? \n\n Vul het missende woord in: Thisbe intravit, cum lea venit. Ideo in ..... fugi.", nederlands: "antrum" },
  { latijn: "Quid Pyramo clamavit? \n\n Vul het missende woord in: ..... Pyramo clamavit ", nederlands: "Thisbe" },
  { latijn: "(Pyramus/Thisbe) Circumspicit. \n\n Kies de juiste optie tussen de haakjes:", nederlands: "Thisbe" },
  { latijn: "Thisbe appropinquavit leae/Pyramo. \n\n Kies de juiste optie tussen de haakjes:", nederlands: "Pyramo" },
  { latijn: "Thisbe est (cara Pyramo/soror Pyrami). \n\n Kies de juiste optie tussen de haakjes:", nederlands: "cara Pyramo" },
  { latijn: "Thisbe rogavit (Parentes/Pyramus). \n\n Kies de juiste optie tussen de haakjes:", nederlands: "Parentes" }
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