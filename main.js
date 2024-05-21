import { fetchData } from './data.js';
import { populateFilters } from './filters.js';
import { renderCards, addPopupEvents } from './card.js';
import { filterAndSortCards, resetFilters } from './filters.js';

// Evento DOMContentLoaded para inicializar tudo
document.addEventListener('DOMContentLoaded', function() {
    let cardsData = [];

    fetchData('cards.csv')
        .then(data => {
            cardsData = data;
            populateFilters(cardsData);
            renderCards(cardsData);
        })
        .catch(error => {
            console.error('Error fetching or processing the CSV file:', error);
        });

    document.getElementById('sort-by').addEventListener('change', () => filterAndSortCards(cardsData));
    document.getElementById('sort-order').addEventListener('change', () => filterAndSortCards(cardsData));
    document.getElementById('reset-filters').addEventListener('click', () => resetFilters(cardsData));
    document.getElementById('toggle-filter').addEventListener('click', toggleSidebar);
});

function toggleSidebar() {
    const sidebar = document.getElementById('filter-sidebar');
    sidebar.classList.toggle('open');
}
