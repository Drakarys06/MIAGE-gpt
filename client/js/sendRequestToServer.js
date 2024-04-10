const endpointURL = 'http://localhost:3001';
let outputElement, submitButton, inputElement, historyElement, buttonElement;
window.onload = init;

function init() {
    outputElement = document.querySelector('#output'); //
    submitButton = document.querySelector('#submit');
    submitButton.onclick = getMessage;

    inputElement = document.querySelector('input');
    historyElement = document.querySelector('.history');
    buttonElement = document.querySelector('button');
    buttonElement.onclick = clearInput;
}

function clearInput() {
    inputElement.value = '';
}

async function getMessage() {
    let prompt = inputElement.value.toLowerCase();
    let requestURL;

    if (prompt.startsWith("/clear")) {
        console.log('clear');
        return;
    } else if (prompt.startsWith("/history")) {
        console.log('history');
        return;
    } else if (prompt.startsWith("/image")) {
        requestURL = endpointURL.concat('/image');
        prompt = prompt.replace('/image', '');
        await getImageFromDallE(prompt, requestURL);
        return;
    } else if (prompt.startsWith("/voice")) {
        requestURL = endpointURL.concat('/voice');
        prompt = prompt.replace('/voice', '');
        await getVoice(prompt, requestURL);

    } else {
        requestURL = endpointURL.concat('/chat');
        await getResponseFromServer(prompt, requestURL);
    }
}

async function sendServerRequest(prompt, requestURL) {
    const promptData = new FormData();
    promptData.append('prompt', prompt);

    const response = await fetch(requestURL, {
        method: 'POST',
        body: promptData
    });

    const data = await response.json();

    console.log(data);
}

async function getImageFromDallE(prompt, requestURL) {
    try {
        await sendServerRequest(prompt, requestURL);
        const imageSrc = data.choices[0].message.content; // Assurez-vous que c'est l'URL de l'image

        // Créez un élément img pour l'image
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc; // Définissez l'attribut src avec l'URL de l'image
        imgElement.alt = 'Image from Dall-E'; // Ajoutez un texte alternatif pour l'image

        // Ajoutez l'image dans le div output
        outputElement.append(imgElement);

        // Ajoutez dans l'historique sur la gauche
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

async function getVoice(prompt, requestURL) {
    try {
        await sendServerRequest(prompt, requestURL);
    } catch (error) {
        console.log(error);
    }
}

async function getResponseFromServer(prompt, requestURL) {
    try {
        await sendServerRequest(prompt, requestURL);

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


