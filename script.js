async function copyTableToClipboard() {
    const tableContainer = document.getElementById('table-container');
    const canvas = await html2canvas(tableContainer);
    const dataUrl = canvas.toDataURL();

    try {
        const blob = await (await fetch(dataUrl)).blob();
        const clipboardItem = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([clipboardItem]);
        alert('Table copied to clipboard');
    } catch (error) {
        console.error(error);
        alert('Failed to copy table to clipboard');
    }
}

async function showImageInNewWindow() {
    const tableContainer = document.getElementById('table-container');
    const canvas = await html2canvas(tableContainer);
    const dataUrl = canvas.toDataURL();

    const newWindow = window.open();
    const img = newWindow.document.createElement('img');
    img.src = dataUrl;
    newWindow.document.body.appendChild(img);
}

async function showModal() {
    const tableContainer = document.getElementById('table-container');
    const canvas = await html2canvas(tableContainer);
    const dataUrl = canvas.toDataURL();

    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = dataUrl;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}


function getNextColor(currentColor) {
    const colors = ['red', 'orange', 'green', 'blue'];
    const index = colors.indexOf(currentColor);
    return colors[(index + 1) % colors.length];
}

function changeColor(event) {
    event.target.style.backgroundColor = getNextColor(event.target.style.backgroundColor);
}

function createTable() {
    const table = document.createElement('table');
    const labels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

    // Create header row
    const headerRow = document.createElement('tr');
    const emptyHeader = document.createElement('th');
    headerRow.appendChild(emptyHeader);

    for (const label of labels) {
        const th = document.createElement('th');
        th.textContent = label;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Create rows with labels and cells
    for (const rowLabel of labels) {
        const tr = document.createElement('tr');
        const labelCell = document.createElement('th');
        labelCell.textContent = rowLabel;
        tr.appendChild(labelCell);

        for (let j = 0; j < 13; j++) {
            const td = document.createElement('td');
            td.addEventListener('click', changeColor);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}
document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(createTable());

    const copyButton = document.getElementById('copy-button');
    copyButton.addEventListener('click', copyTableToClipboard);

    const showImageButton = document.getElementById('show-image-button');
    showImageButton.addEventListener('click', showModal);

    const closeModalButton = document.getElementById('close-modal');
    closeModalButton.addEventListener('click', closeModal);
});