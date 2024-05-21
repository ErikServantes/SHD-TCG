import { createCard } from './card.js';

export function addToDeck(data, cardCount) {
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
        if (cardCount[cardId] > 1) {
            countElement.style.display = 'flex';
            countElement.textContent = `x${cardCount[cardId]}`;
        } else {
            countElement.style.display = 'none';
        }

        // Garantir que a carta adicionada recentemente fique visível
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        alert('Você só pode adicionar no máximo 4 cópias de cada carta.');
    }
}

export function removeFromDeck(card, cardId, cardCount) {
    if (cardCount[cardId] > 1) {
        cardCount[cardId]--;
        const countElement = card.querySelector('.count');
        if (cardCount[cardId] > 1) {
            countElement.textContent = `x${cardCount[cardId]}`;
        } else {
            countElement.style.display = 'none';
        }
    } else {
        card.remove();
        delete cardCount[cardId];
    }
}
