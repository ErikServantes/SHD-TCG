import { renderCards } from './card.js';

export function populateFilters(cards) {
    const culturas = [...new Set(cards.map(card => card[3]).filter(cultura => cultura))];
    const tipos = [...new Set(cards.map(card => card[7]).filter(tipo => tipo))];

    const culturaFilters = document.getElementById('cultura-filters');
    culturas.forEach(cultura => {
        if (cultura) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = cultura;
            checkbox.id = `cultura-${cultura}`;
            checkbox.addEventListener('change', () => filterAndSortCards(cards));

            const label = document.createElement('label');
            label.htmlFor = `cultura-${cultura}`;
            label.textContent = cultura;

            culturaFilters.appendChild(checkbox);
            culturaFilters.appendChild(label);
            culturaFilters.appendChild(document.createElement('br'));
        }
    });

    const tipoFilters = document.getElementById('tipo-filters');
    tipos.forEach(tipo => {
        if (tipo) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = tipo;
            checkbox.id = `tipo-${tipo}`;
            checkbox.addEventListener('change', () => filterAndSortCards(cards));

            const label = document.createElement('label');
            label.htmlFor = `tipo-${tipo}`;
            label.textContent = tipo;

            tipoFilters.appendChild(checkbox);
            tipoFilters.appendChild(label);
            tipoFilters.appendChild(document.createElement('br'));
        }
    });
}

export function filterAndSortCards(cards) {
    const selectedCulturas = Array.from(document.querySelectorAll('#cultura-filters input:checked')).map(input => input.value);
    const selectedTipos = Array.from(document.querySelectorAll('#tipo-filters input:checked')).map(input => input.value);
    const sortBy = document.getElementById('sort-by').value;
    const sortOrder = document.getElementById('sort-order').value;

    let filteredCards = cards.filter(card => 
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

export function resetFilters(cards) {
    document.querySelectorAll('#filter-container input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('sort-by').value = 'id';
    document.getElementById('sort-order').value = 'asc';
    renderCards(cards);
}
