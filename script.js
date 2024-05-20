document.addEventListener('DOMContentLoaded', function() {
    fetch('cards.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1);
            const container = document.getElementById('card-list');
            const cardCount = {};

            rows.forEach(row => {
                if (row.trim() !== '') {
                    const columns = row.split(',');
                    if (columns.length === 12) {
                        const card = createCard(columns);
                        card.addEventListener('dblclick', () => addToDeck(columns, cardCount));
                        card.addEventListener('click', () => showCardPreview(columns));
                        container.appendChild(card);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or processing the CSV file:', error);
        });
});

function createCard(data, scale = 1) {
    const imagePath = `images/${data[3].trim()}.png`;
    const illustrationPath = `images/${data[10].trim()}.png`;
    const logoPath = `images/${data[3].trim()}logo.png`; // Caminho do logotipo

    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url('${imagePath}')`;
    card.style.transform = `scale(${scale})`;

    const rarityColor = getColorByRarity(data[11].trim());

    card.innerHTML = `
        <div class="custo-container">
            <div class="custo">${data[0].trim()}</div>
        </div>
        <div class="titulo-subtitulo-container">
            <div class="titulo">${data[1].trim()}</div>
            <div class="subtitulo">${data[2].trim()}</div>
        </div>
        <div class="ilustracao" style="background-image: url('${illustrationPath}');"></div>
        <div class="atributos">
            <div class="atributo" style="background-color: rgba(217, 203, 128, 0.9);">
                ${data[4].trim()} <span class="simbolo">&#9876;</span>
            </div>
            <div class="atributo" style="background-color: rgba(217, 203, 128, 0.9);">
                ${data[5].trim()} <span class="simbolo">&#9829;</span>
            </div>
            <div class="atributo" style="background-color: rgba(217, 203, 128, 0.9);">
                ${data[6].trim()} <span class="simbolo">&#x3df;</span>
            </div>
        </div>
        <div class="tipo">${data[7].trim()}</div>
        <div class="texto-lore-container">
            <div class="texto">${data[8].trim()}</div>
            <div class="lore">${data[9].trim()}</div>
        </div>
        <div class="id-container" style="background-color: ${rarityColor};">
            <div class="id">${data[10].trim()}</div>
        </div>
        <div class="logo-container">
            <img src="${logoPath}" alt="Logo">
        </div>
    `;

    return card;
}

function addToDeck(data, cardCount) {
    const deckContainer = document.getElementById('deck-container');
    const cardId = data[10].trim();

    if (!cardCount[cardId]) {
        cardCount[cardId] = 0;
    }

    if (cardCount[cardId] < 4) {
        cardCount[cardId]++;
        const card = createCard(data, 1); // Escala original para o baralho
        card.style.position = 'relative';
        card.addEventListener('dblclick', () => removeFromDeck(card, cardId, cardCount));
        deckContainer.appendChild(card);
    } else {
        alert('Você só pode adicionar no máximo 4 cópias de cada carta.');
    }
}

function removeFromDeck(card, cardId, cardCount) {
    card.remove();
    cardCount[cardId]--;
}

function showCardPreview(data) {
    const previewContainer = document.getElementById('card-preview');
    previewContainer.innerHTML = '';
    const card = createCard(data); // Sem escala
    card.style.width = 'auto'; // Mantém a largura original
    card.style.height = 'auto'; // Mantém a altura original
    card.style.maxWidth = '100%'; // Não ultrapassa a largura do container
    card.style.maxHeight = '100%'; // Não ultrapassa a altura do container
    previewContainer.appendChild(card);
    previewContainer.classList.remove('hidden');
}

function getColorByRarity(rarity) {
    switch(rarity) {
        case 'R':
            return 'gold';
        case 'I':
            return 'silver';
        case 'C':
            return 'white';
        default:
            return 'black';
    }
}
