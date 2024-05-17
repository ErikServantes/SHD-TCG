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
                    const card = createCard(columns);
                    container.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or processing the CSV file:', error);
        });
});

function createCard(data) {
    const imagePath = `images/${data[3].trim()}.png`;
    const illustrationPath = `images/${data[10].trim()}.png`; // Caminho da imagem de ilustração com base no ID

    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url('${imagePath}')`;

    card.innerHTML = `
        <div class="custo-container">
            <div class="custo">${data[0].trim()}</div>
        </div>
        <div class="titulo">${data[1].trim()}</div>
        <div class="subtitulo">${data[2].trim()}</div>
        <div class="ilustracao" style="background-image: url('${illustrationPath}');"></div>
        <div class="atributos">
            <div class="atributo" style="background-color: rgba(0, 0, 255, 0.25);">
                &#9876; ${data[4].trim()}
            </div>
            <div class="atributo" style="background-color: rgba(255, 0, 0, 0.25);">
                &#9829; ${data[5].trim()}
            </div>
            <div class="atributo" style="background-color: rgba(255, 255, 0, 0.25);">
                &#9971; ${data[6].trim()}
            </div>
        </div>
        <div class="tipo">${data[7].trim()}</div>
        <div class="texto">${data[8].trim()}</div>
        <div class="lore">${data[9].trim()}</div>
        <div class="id-container">
            <div class="id" style="color: ${getColorByRarity(data[11].trim())}">${data[10].trim()}</div>
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
            return 'black';
        default:
            return 'black';
    }
}
