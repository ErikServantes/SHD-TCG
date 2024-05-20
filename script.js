document.addEventListener('DOMContentLoaded', function() {
    let cardsData = [];

    fetch('cards.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1);
            cardsData = rows.map(row => row.split(',').map(column => column.trim()));
            populateFilters(cardsData);
            renderCards(cardsData);
        })
        .catch(error => {
            console.error('Error fetching or processing the CSV file:', error);
        });

    function populateFilters(cards) {
        const culturas = [...new Set(cards.map(card => card[3]))];
        const tipos = [...new Set(cards.map(card => card[7]))];
        
        const culturaFilters = document.getElementById('cultura-filters');
        culturas.forEach(cultura => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = cultura;
            checkbox.id = `cultura-${cultura}`;
            checkbox.addEventListener('change', () => filterAndSortCards());

            const label = document.createElement('label');
            label.htmlFor = `cultura-${cultura}`;
            label.textContent = cultura;

            culturaFilters.appendChild(checkbox);
            culturaFilters.appendChild(label);
            culturaFilters.appendChild(document.createElement('br'));
        });

        const tipoFilters = document.getElementById('tipo-filters');
        tipos.forEach(tipo => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = tipo;
            checkbox.id = `tipo-${tipo}`;
            checkbox.addEventListener('change', () => filterAndSortCards());

            const label = document.createElement('label');
            label.htmlFor = `tipo-${tipo}`;
            label.textContent = tipo;

            tipoFilters.appendChild(checkbox);
            tipoFilters.appendChild(label);
            tipoFilters.appendChild(document.createElement('br'));
        });

        document.getElementById('sort-by').addEventListener('change', () => filterAndSortCards());
        document.getElementById('sort-order').addEventListener('change', () => filterAndSortCards());
        document.getElementById('reset-filters').addEventListener('click', () => resetFilters());
    }

    function renderCards(cards) {
        const container = document.getElementById('card-list');
        container.innerHTML = '';
        const cardCount = {};

        cards.forEach(columns => {
            if (columns.length === 12) {
                const card = createCard(columns);
                card.addEventListener('dblclick', () => addToDeck(columns, cardCount));
                container.appendChild(card);
            }
        });
    }

document.addEventListener('DOMContentLoaded', function() {
    let cardsData = [];

    // Fetch and process the CSV file
    fetch('cards.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1);
            cardsData = rows.map(row => row.split(',').map(column => column.trim()));
            populateFilters(cardsData);
            renderCards(cardsData);
        })
        .catch(error => {
            console.error('Error fetching or processing the CSV file:', error);
        });

    // Toggle deck sidebar
    document.getElementById('toggle-deck').addEventListener('click', function() {
        const sidebar = document.getElementById('deck-sidebar');
        sidebar.classList.toggle('open');
    });

    // Save deck
    document.getElementById('save-deck').addEventListener('click', function() {
        const deckCards = document.getElementById('deck-container').querySelectorAll('.card');
        const deckData = Array.from(deckCards).map(card => card.getAttribute('data-card-id'));

        const deckName = prompt('Digite o nome do baralho:');
        if (deckName) {
            const deck = [deckName, ...deckData];
            localStorage.setItem(deckName, JSON.stringify(deck));
            alert('Baralho salvo com sucesso!');
        }
    });

    // Open deck
    document.getElementById('open-deck').addEventListener('click', function() {
        const deckName = prompt('Digite o nome do baralho para abrir:');
        if (deckName) {
            const deck = JSON.parse(localStorage.getItem(deckName));
            if (deck) {
                const [name, ...cardIds] = deck;
                const deckContainer = document.getElementById('deck-container');
                deckContainer.innerHTML = '';
                cardIds.forEach(cardId => {
                    const cardData = cardsData.find(card => card[10].trim() === cardId);
                    if (cardData) {
                        const card = createCard(cardData, 1); // Escala original para o baralho
                        card.setAttribute('data-card-id', cardId);
                        deckContainer.appendChild(card);
                    }
                });
                alert('Baralho aberto com sucesso!');
            } else {
                alert('Baralho não encontrado.');
            }
        }
    });

    // ... (rest of the existing code)
});

    
    function filterAndSortCards() {
        const selectedCulturas = Array.from(document.querySelectorAll('#cultura-filters input:checked')).map(input => input.value);
        const selectedTipos = Array.from(document.querySelectorAll('#tipo-filters input:checked')).map(input => input.value);
        const sortBy = document.getElementById('sort-by').value;
        const sortOrder = document.getElementById('sort-order').value;

        let filteredCards = cardsData.filter(card => 
            (selectedCulturas.length === 0 || selectedCulturas.includes(card[3])) &&
            (selectedTipos.length === 0 || selectedTipos.includes(card[7]))
        );

        filteredCards.sort((a, b) => {
            const fieldIndex = sortBy === 'id' ? 10 : (sortBy === 'tipo' ? 7 : 3);
            if (a[fieldIndex] < b[fieldIndex]) {
                return sortOrder === 'asc' ? -1 : 1;
            } else if (a[fieldIndex] > b[fieldIndex]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        renderCards(filteredCards);
    }

    function resetFilters() {
        document.querySelectorAll('#filter-container input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.getElementById('sort-by').value = 'id';
        document.getElementById('sort-order').value = 'asc';
        renderCards(cardsData);
    }

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
        <div class="novo-container">
            <img src="${logoPath}" alt="Logo Novo">
        </div>
        <div class="count" style="display: none;">x1</div>
    `;

    // Adiciona os eventos de mouse
    addPopupEvents(card, data);

    return card;
    }

    function addToDeck(data, cardCount) {
        const deckContainer = document.getElementById('deck-container');
        const cardId = data[10].trim();

        let cardElement = deckContainer.querySelector(`[data-card-id="${cardId}"]`);

        if (!cardCount[cardId]) {
            cardCount[cardId] = 0;
        }

        if (cardCount[cardId] < 4) {
            cardCount[cardId]++;
            if (!cardElement) {
                const card = createCard(data, 1); // Escala original para o baralho
                card.setAttribute('data-card-id', cardId);
                card.addEventListener('dblclick', () => removeFromDeck(card, cardId, cardCount));
                deckContainer.appendChild(card);
                cardElement = card;
            }
            const countElement = cardElement.querySelector('.count');
            countElement.style.display = 'flex';
            countElement.textContent = `x${cardCount[cardId]}`;

            // Garantir que a carta adicionada recentemente fique visível
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('Você só pode adicionar no máximo 4 cópias de cada carta.');
        }
    }

    function removeFromDeck(card, cardId, cardCount) {
        if (cardCount[cardId] > 1) {
            cardCount[cardId]--;
            const countElement = card.querySelector('.count');
            countElement.textContent = `x${cardCount[cardId]}`;
            if (cardCount[cardId] === 1) {
                countElement.style.display = 'none';
            }
        } else {
            card.remove();
            delete cardCount[cardId];
        }
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

    document.getElementById('toggle-filter').addEventListener('click', function() {
        const sidebar = document.getElementById('filter-sidebar');
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        } else {
            sidebar.classList.add('open');
        }
    });

    function addPopupEvents(card, data) {
        let timer;
        let popup;

        const showPopup = () => {
            if (!popup) {
                popup = createCard(data, 2);
                popup.classList.add('popup-card');
                document.body.appendChild(popup);
                positionPopup(popup);
            }
        };

        const hidePopup = () => {
            if (popup) {
                popup.remove();
                popup = null;
            }
        };

        const positionPopup = (popup) => {
            const popupRect = popup.getBoundingClientRect();
            const top = (window.innerHeight - popupRect.height) / 2;
            const left = (window.innerWidth - popupRect.width) / 2;

            popup.style.top = `${top}px`;
            popup.style.left = `${left}px`;
        };

        card.addEventListener('mousedown', (event) => {
            if (event.button === 0) {  // Verifica se é o botão esquerdo do mouse
                timer = setTimeout(showPopup, 500);
            }
        });

        card.addEventListener('mouseup', () => {
            clearTimeout(timer);
            hidePopup();
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(timer);
            hidePopup();
        });
    }
});
