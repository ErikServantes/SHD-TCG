function createCard(data) {
    const imagePath = `images/${data[3].trim()}.png`;
    const illustrationPath = `images/${data[10].trim()}.png`;
    const culture = data[12].trim(); // Assuming the culture is in the 13th column
    const logoPath = `images/${culture}logo.png`; // Path to the dynamic logo image

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
            <div class="logo-container">
                <img src="${logoPath}" alt="Logo" class="logo">
            </div>
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
