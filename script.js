function createCard(data) {
    const imagePath = `images/${data[3].trim()}.png`;
    const illustrationPath = `images/${data[10].trim()}.png`; // Caminho da imagem de ilustração com base no ID

    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url('${imagePath}')`;

    card.innerHTML = `
        <div class="custo">${data[0].trim()}</div>
        <div class="titulo">${data[1].trim()}</div>
        <div class="subtitulo">${data[2].trim()}</div>
        <div class="ilustracao" style="background-image: url('${illustrationPath}');"></div>
        <div class="atributos">
            ${data[4].trim()}<br>
            ${data[5].trim()}<br>
            ${data[6].trim()}
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
