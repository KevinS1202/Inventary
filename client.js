async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            alert('Archivo subido con éxito.');
            fileInput.value = ''; // Limpiar el input después de subir el archivo
            displayFileList();
        } catch (error) {
            console.error('Error al subir el archivo:', error);
        }
    } else {
        alert('Selecciona un archivo antes de subirlo.');
    }
}

async function displayFileList() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Limpiar la lista antes de volver a cargar

    try {
        const response = await fetch('/files');
        const files = await response.json();

        files.forEach((file) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="/download/${file}">${file}</a>`;
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener la lista de archivos:', error);
    }
}

displayFileList();
