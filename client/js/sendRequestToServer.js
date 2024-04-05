const endpointURL = 'http://localhost:3001/chat';

let outputElement, submitButton, inputElement, historyElement, butonElement;

window.onload = init;

function init() {
    outputElement = document.querySelector('#output');
    submitButton = document.querySelector('#submit');
    submitButton.onclick = getMessage;

    inputElement = document.querySelector('input');
    historyElement = document.querySelector('.history');
    butonElement = document.querySelector('button');
    butonElement.onclick = clearInput;
}

function clearInput() {
    inputElement.value = '';
}

async function getMessage() {
    let prompt = inputElement.value;
    // on met le prompt en minuscules
    prompt = prompt.toLowerCase();
    console.log(prompt.startsWith("/image"));

    // TODO : si le prompt commence par "/image" alors
    switch (prompt) {
        case prompt.startsWith("/clear"):
            console.log('clear');
            return;
        case prompt.startsWith("/history"):
            console.log('history');
            return;
        case prompt.startsWith("/image"):
            getImageFromDallE(prompt);  // on appelle getImageFromDallE(prompt (sans le "/image" et l'espace))
            return;
        default:
            getResponseFromServer(prompt);  // sinon on appelle getResponseFromServer(prompt) pour obtenir une réponse de gpt3.5
    }
}

// Fonction pour obtenir une réponse image de l'API DallE
async function getImageFromDallE(prompt) {
    console.log(prompt.slice(7)); // on affiche le prompt sans le "/image" et l'espace
}

async function getResponseFromServer(prompt) {
    try {
        // On envoie le contenu du prompt dans un FormData (eq. formulaires multipart)
        const promptData = new FormData();
        promptData.append('prompt', prompt);

        // Envoi de la requête POST par fetch, avec le FormData dans la propriété body
        // côté serveur on récupèrera dans req.body.prompt la valeur du prompt,
        // avec nodeJS on utilisera le module multer pour récupérer les donénes 
        // multer gère les données multipart/form-data
        const response = await fetch(endpointURL, {
            method: 'POST',
            body: promptData
        });

        const data = await response.json();

        console.log(data);
        const chatGptReponseTxt = data.choices[0].message.content;
        // On cree un element p pour la réponse
        const pElementChat = document.createElement('p');
        pElementChat.textContent = chatGptReponseTxt;
        // On ajoute la réponse dans le div output
        outputElement.append(pElementChat);

        // Ajout dans l'historique sur la gauche
        if (data.choices[0].message.content) {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.onclick = () => {
                inputElement.value = pElement.textContent;
            };
            historyElement.append(pElement);
        }
    } catch (error) {
        console.log(error);
    }
}

