document.addEventListener('DOMContentLoaded', function() {
    // Fetch para obter o arquivo CSV
    fetch('cards.csv')
        .then(response => {
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            // Divide o CSV em linhas e ignora o cabeçalho
            const rows = data.split('\n').slice(1);
            const container = document.getElementById('card-container');
            rows.forEach(row => {
                // Processa apenas linhas não vazias
                if (row.trim() !== '') {
                    const columns = row.split(',');
                    // Verifica se a linha tem 12 colunas
                    if (columns.length === 12) {
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

// Função para criar uma carta a partir dos dados
function createCard(data) {
    const imagePath = `images/${data[3].trim()}.png`; // Caminho da imagem da carta
    const illustrationPath = `images/${data[10].trim()}.png`; // Caminho da ilustração
    const card = document.createElement('div'); // Cria um elemento div para a carta
    card.className = 'card'; // Adiciona a classe 'card' ao elemento
    card.style.backgroundImage = `url('${imagePath}')`; // Define a imagem de fundo da carta

    const rarityColor = getColorByRarity(data[11].trim()); // Obtém a cor da raridade

    // Define o conteúdo HTML da carta
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
    `;

    return card; // Retorna o elemento da carta
}

// Função para obter a cor baseada na raridade
function getColorByRarity(rarity) {
    switch(rarity) {
        case 'R':
            return 'gold'; // Raridade R -> cor dourada
        case 'I':
            return 'silver'; // Raridade I -> cor prateada
        case 'C':
            return 'white'; // Raridade C -> cor branca
        default:
            return 'black'; // Default -> cor preta
    }
}
