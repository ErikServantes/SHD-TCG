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
            const container = document.getElementById('card-container');
            rows.forEach(row => {
                if (row.trim() !== '') {
                    const columns = row.split(',');
                    if (columns.length === 12) { // Verifica se a linha tem o número correto de colunas
                        const card = createCard(columns);
                        container.appendChild(card);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or processing the CSV file:', error);
        });
});

function createCard(data) {
    const imagePath = `images/${data[3].trim()}.png`;
    const illustrationPath = `images/${data[10].trim()}.png`;
    const logoPath = `images/${data[3].trim()}logo.png`;

    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url('${imagePath}')`;

    const rarityColor = getColorByRarity(data[11].trim());

    card.innerHTML = `
        <div class="custo-container">
            <div class="custo">${data[0].trim()}</div>
        </div>
        <div class="titulo-subtitulo-container">
            <div>
                <div class="titulo">${data[1].trim()}</div>
                <div class="subtitulo">${data[2].trim()}</div>
            </div>
            <img src="${logoPath}" class="logo">
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
    `;

    return card;
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
