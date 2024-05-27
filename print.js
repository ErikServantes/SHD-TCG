// print.js

document.addEventListener('DOMContentLoaded', function() {
    function printDeck() {
        const deckContainer = document.getElementById('deck-container');
        const cardsInDeck = Array.from(deckContainer.querySelectorAll('.card'));
        if (cardsInDeck.length === 0) {
            alert('Nenhuma carta no baralho para imprimir.');
            return;
        }

        const printArea = document.createElement('div');
        printArea.id = 'print-area';
        document.body.appendChild(printArea);

        let page = document.createElement('div');
        page.className = 'print-page';
        printArea.appendChild(page);

        cardsInDeck.forEach(card => {
            const cardId = card.querySelector('.id').textContent.trim();
            const countElement = card.querySelector('.count');
            const count = countElement ? parseInt(countElement.textContent.replace('x', '')) : 1;

            for (let i = 0; i < count; i++) {
                const cardData = cardsData.find(c => c[10].trim() === cardId);
                if (cardData) {
                    const printCard = createPrintCard(cardData);
                    page.appendChild(printCard);

                    // Start a new page if the current one has 9 cards
                    if (page.childElementCount === 9) {
                        page = document.createElement('div');
                        page.className = 'print-page';
                        printArea.appendChild(page);
                    }
                }
            }
        });

        window.print();

        // Remove print area after printing
        document.body.removeChild(printArea);
    }

    function createPrintCard(data) {
        const imagePath = `images/${data[3].trim()}.png`;
        const illustrationPath = `images/${data[10].trim()}.png`;
        const logoPath = `images/${data[3].trim()}logo.png`; // Caminho do logotipo

        const card = document.createElement('div');
        card.className = 'print-card';
        card.style.backgroundImage = `url('${imagePath}')`;

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
            <div class="novo-container">
                <img src="${logoPath}" alt="Logo Novo">
            </div>
        `;

        return card;
    }

    document.getElementById('print-deck').addEventListener('click', printDeck);

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
});
