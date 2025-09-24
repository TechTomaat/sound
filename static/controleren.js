const woorden = [
    { latijn: "amicus", nederlands: "vriend" },
    { latijn: "aqua", nederlands: "water" },
    { latijn: "terra", nederlands: "aarde" }
];

let huidigWoord;
let gebruikteWoorden = [];
let score = 0; // Score variabele
const totaalWoorden = woorden.length; // Totale aantal woorden

function nieuwWoord() {
    if (gebruikteWoorden.length === totaalWoorden) {
        document.getElementById('latijn-woord').innerText = "De oefening is klaar";
        document.getElementById('antwoord').style.display = "none";
        
        // Bereken percentage als geheel getal
        const percentage = Math.floor((score / totaalWoorden) * 100);
        
        document.getElementById('feedback').innerText = `Eindscore: ${score} van ${totaalWoorden} (${percentage}%)`;
        document.getElementById('volgendeButton').style.display = "none";
        document.querySelector('button[onclick="controleerAntwoord()"]').style.display = "none";
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
    document.getElementById('antwoord').disabled = false; // Invoerveld inschakelen
    document.getElementById('feedback').innerText = "";
    document.getElementById('volgendeButton').style.display = "none";
}

function controleerAntwoord() {
    const antwoord = document.getElementById('antwoord').value.trim().toLowerCase();
    if (antwoord === huidigWoord.nederlands.toLowerCase()) {
        document.getElementById('feedback').innerText = "Goed";
        score++; // Verhoog de score bij een goed antwoord
    } else {
        document.getElementById('feedback').innerText = `Fout, het juiste antwoord is: ${huidigWoord.nederlands}.`;
        document.getElementById('antwoord').disabled = true; // Invoerveld uitschakelen bij een fout antwoord
    }
    document.getElementById('volgendeButton').style.display = "inline-block";
}

nieuwWoord();

// Enter-toets activeert controleren of volgende vraag
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