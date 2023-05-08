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
    const colors = ['red', 'orange', 'green', 'blue', 'white'];
    const index = colors.indexOf(currentColor);
    return colors[(index + 1) % colors.length];
}
function changeCellColor(cell) {
    const currentColor = cell.style.backgroundColor;
    switch (currentColor) {
        case 'rgba(255, 99, 97, 0.75)': // pastel red
            cell.style.backgroundColor = 'rgba(255, 170, 97, 0.75)'; // pastel orange
            break;
        case 'rgba(255, 170, 97, 0.75)': // pastel orange
            cell.style.backgroundColor = 'rgba(152, 251, 152, 0.75)'; // pastel green
            break;
        case 'rgba(152, 251, 152, 0.75)': // pastel green
            cell.style.backgroundColor = 'rgba(135, 206, 250, 0.75)'; // pastel blue
            break;
        case 'rgba(135, 206, 250, 0.75)': // pastel blue
            cell.style.backgroundColor = 'rgba(255, 255, 255, 0.75)'; // white
            break;
        case 'rgba(255, 255, 255, 0.75)': // white
        default:
            cell.style.backgroundColor = 'rgba(255, 99, 97, 0.75)'; // pastel red
    }
}

function createTable() {
    const labels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    const table = document.createElement('table');
    for (let i = 0; i <= 13; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j <= 13; j++) {
            const cell = document.createElement('td');
            if (i > 0 && j > 0) {
                const stronger = labels[Math.min(i, j) - 1];
                const weaker = labels[Math.max(i, j) - 1];
                cell.textContent = stronger + weaker + (i < j ? 's' : i > j ? 'o' : '');
            } else {
                cell.textContent = labels[i === 0 ? j - 1 : i - 1];
            }
            row.appendChild(cell);
            if (i !== 0 && j !== 0) {
                cell.addEventListener('click', () => changeCellColor(cell));
            }
        }
        table.appendChild(row);
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