export function renderCards(cards) {
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

export function createCard(data, scale = 1) {
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
