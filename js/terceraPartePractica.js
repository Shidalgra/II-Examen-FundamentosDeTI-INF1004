//////////////////////////////////
//TerceraParte.js
/////////////////////////////////
// Variables globales para la tercera parte
let currentPracticeSection = 1;
let pareoMatches = {};
let crucigramaAnswers = {};
let sopaFoundWords = [];
let currentCrucigramaWord = null; // Para mantener la dirección de escritura

// Datos para el pareo - Términos del examen
const pareoDataComplete = {
    items: [
        { palabra: "Gabinete", definicion: "pieza encargada de proteger las partes que componen a la CPU" },
        { palabra: "CPU", definicion: "Unidad central de procesamiento, es el componente principal de cualquier dispositivo informático" },
        { palabra: "SO", definicion: "Software fundamental que actúa como intermediario entre el hardware de una PC y los programas que se ejecutan en ella" },
        { palabra: "MOTHERBOARD", definicion: "Circuito integrado principal del sistema informático" },
        { palabra: "MAINFRAME", definicion: "Para grandes bases de datos y sistemas bancarios (ej. IBM Z Series)" },
        { palabra: "LAPTOP", definicion: "Computadora compacta y movil" },
        { palabra: "TABLET", definicion: "Pantalla táctil, sin teclado físico (iPad, Galaxy Tab)." },
        { palabra: "RAM", definicion: "Memoria volátil de acceso aleatorio" },
        { palabra: "SSD", definicion: "Disco de estado sólido basado en memoria flash" },
        { palabra: "GPU", definicion: "Unidad de procesamiento gráfico para imágenes" },
        { palabra: "ROM", definicion: "Memoria no volátil con instrucciones de arranque" },
        { palabra: "CACHE", definicion: "Memoria que acelera el acceso a datos recurrentes" },
        { palabra: "VRAM", definicion: "Memoria de video en tarjetas gráficas" },
        { palabra: "HDD", definicion: "Disco duro mecánico tradicional" },
        { palabra: "BIOS", definicion: "Sistema básico de entrada y salida" },
        { palabra: "USB", definicion: "Puerto universal en serie para dispositivos" },
        { palabra: "WIFI", definicion: "Tecnología de red inalámbrica" },
        { palabra: "FIREWALL", definicion: "Sistema de protección contra amenazas de red" },
        { palabra: "BACKUP", definicion: "Copia de seguridad de datos importantes" },
        { palabra: "DRIVER", definicion: "Software que controla dispositivos de hardware" }
    ]
};

window.pareoDataComplete = pareoDataComplete;

// Función para seleccionar elementos aleatorios del pareo
function getRandomPareoData() {
    const shuffled = [...pareoDataComplete.items].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, PRACTICE_QUESTIONS_PAREO); // Seleccionar 8 elementos

    // Mezclar definiciones
    return {
        palabras: selected.map(item => item.palabra),
        definiciones: selected.map(item => item.definicion).sort(() => Math.random() - 0.5) // Mezclar definiciones
    };
}

let pareoData = getRandomPareoData();
























// Datos para el crucigrama - Diseño 15x15 cuadros con intersecciones reales
const crucigramaData = {
    words: [
        //Horizontales
        { word: "HDD", clue: "Disco duro mecánico tradicional", row: 0, col: 6, direction: "horizontal" },
        { word: "DATOS", clue: "Información procesada por una computadora", row: 1, col: 0, direction: "horizontal" },
        { word: "BACKUP", clue: "Copia de seguridad de datos importantes", row: 1, col: 9, direction: "horizontal" },
        { word: "RAM", clue: "Memoria volátil de acceso aleatorio", row: 4, col: 9, direction: "horizontal" },
        { word: "HARDWARE", clue: "Componentes físicos de una computadora", row: 6, col: 3, direction: "horizontal" },
        { word: "KERNEL", clue: "Núcleo del sistema operativo", row: 8, col: 0, direction: "horizontal" },
        { word: "DRIVER", clue: "Software que controla dispositivos de hardware", row: 8, col: 9, direction: "horizontal" },
        { word: "ROM", clue: "Memoria NO volátil con instrucciones de arranque", row: 10, col: 0, direction: "horizontal" },
        { word: "GPU", clue: "Unidad de Procesamiento Gráfico para imágenes", row: 10, col: 4, direction: "horizontal" },
        { word: "WIFI", clue: "Tecnología de red inalámbrica", row: 11, col: 7, direction: "horizontal" },
        { word: "SISTEMA", clue: "Conjunto organizado de elementos que funcionan juntos", row: 12, col: 0, direction: "horizontal" },
        { word: "SSD", clue: "Disco de estado sólido basado en memoria flash", row: 12, col: 11, direction: "horizontal" },

        //Verticales
        { word: "CACHE", clue: "Memoria que acelera el acceso a datos recurrentes", row: 0, col: 1, direction: "vertical" },
        { word: "MEMORIA", clue: "Es la que tiene capacidad para almacenar, retener y hacer disponible información", row: 7, col: 1, direction: "vertical" },
        { word: "SOFTWARE", clue: "Programas y conjuntos de instrucciones que permiten a las computadoras realizar tareas específicas (lo intangible de una PC)", row: 1, col: 4, direction: "vertical" },
        { word: "FIREWALL", clue: "Sistema de protección contra amenazas de red", row: 2, col: 7, direction: "vertical" },
        { word: "VIRUS", clue: "Software malicioso que se adjunta a archivos", row: 10, col: 8, direction: "vertical" },
        { word: "RED", clue: "Conexión entre múltiples dispositivos", row: 6, col: 9, direction: "vertical" },
        { word: "MALWARE", clue: "Software malicioso que daña sistemas", row: 0, col: 10, direction: "vertical" },
        { word: "BIOS", clue: "Sistema básico de entrada y salida", row: 7, col: 11, direction: "vertical" },
        { word: "USB", clue: "Puerto universal en serie para dispositivos externos", row: 3, col: 13, direction: "vertical" },
        { word: "SERVIDOR", clue: "Computadora que proporciona servicios a otras", row: 7, col: 13, direction: "vertical" },
        { word: "CPU", clue: "Unidad Central de Procesamiento que ejecuta instrucciones", row: 0, col: 14, direction: "vertical" },
    ],
    gridSize: 15
};
























// Palabras para la sopa de letras - Términos del examen con definiciones
const sopaWordsComplete = [
    { word: "CPU", definition: "Unidad central de procesamiento que ejecuta instrucciones" },
    { word: "RAM", definition: "Memoria volátil de acceso aleatorio" },
    { word: "SSD", definition: "Disco de estado sólido basado en memoria flash" },
    { word: "GPU", definition: "Unidad de procesamiento gráfico para imágenes" },
    { word: "USB", definition: "Puerto universal en serie para dispositivos" },
    { word: "ROM", definition: "Memoria NO volátil con instrucciones de arranque" },
    { word: "HDD", definition: "Disco duro mecánico tradicional" },
    { word: "WIFI", definition: "Tecnología de red inalámbrica" },
    { word: "BIOS", definition: "Sistema básico de entrada y salida" },
    { word: "CACHE", definition: "Memoria que acelera el acceso a datos recurrentes" },
    { word: "VIRUS", definition: "Software malicioso que se adjunta a archivos" },
    { word: "BACKUP", definition: "Copia de seguridad de datos importantes" },
    { word: "DRIVER", definition: "Software que controla dispositivos de hardware" },
    { word: "KERNEL", definition: "Núcleo del sistema operativo" },
    { word: "FIREWALL", definition: "Sistema de protección contra amenazas de red" },
    { word: "MALWARE", definition: "Software malicioso que daña sistemas" },
    { word: "HARDWARE", definition: "Componentes físicos de una computadora" },
    { word: "SOFTWARE", definition: "Programas y conjuntos de instrucciones que permiten a las computadoras realizar tareas específicas (lo intangible de una PC)" },
    { word: "MEMORIA", definition: "Es la que tiene capacidad para almacenar, retener y hacer disponible información" },
    { word: "SISTEMA", definition: "Conjunto organizado de elementos que funcionan juntos" },
    { word: "DATOS", definition: "Información procesada por una computadora" },
    { word: "RED", definition: "Conexión entre múltiples dispositivos" },
    { word: "SERVIDOR", definition: "Computadora que proporciona servicios a otras" },
    { word: "CLIENTE", definition: "Dispositivo que solicita servicios a un servidor" }
];

// Función para generar sopa de letras aleatoria
function generateSopaLetras() {
    const gridSize = 16;
    const selectedItems = [...sopaWordsComplete].sort(() => Math.random() - 0.5).slice(0, PRACTICE_QUESTIONS_SOUP);
    const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
    const placedWords = [];

    // Colocar palabras aleatoriamente
    selectedItems.forEach(item => {
        const word = item.word;
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 50) {
            const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);

            if (canPlaceWord(grid, word, row, col, direction, gridSize)) {
                placeWord(grid, word, row, col, direction);
                placedWords.push({ word, row, col, direction, definition: item.definition });
                placed = true;
            }
            attempts++;
        }
    });

    // Llenar espacios vacíos con letras aleatorias
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }

    return {
        grid,
        words: placedWords.map(p => p.word),
        wordPositions: placedWords,
        definitions: placedWords
    };
}

// Función para verificar si se puede colocar una palabra en la grilla
function canPlaceWord(grid, word, row, col, direction, gridSize) {
    if (direction === 'horizontal') {
        if (col + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) {
                return false;
            }
        }
    } else {
        if (row + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) {
                return false;
            }
        }
    }
    return true;
}

// Función para colocar una palabra en la grilla
function placeWord(grid, word, row, col, direction) {
    if (direction === 'horizontal') {
        for (let i = 0; i < word.length; i++) {
            grid[row][col + i] = word[i];
        }
    } else {
        for (let i = 0; i < word.length; i++) {
            grid[row + i][col] = word[i];
        }
    }
}


// Función para inicializar la tercera parte
let sopaData = generateSopaLetras();
function initPracticePart() {
    // Regenerar datos aleatorios si no existen
    const savedData = JSON.parse(localStorage.getItem("practiceData")) || {};

    if (!savedData.pareoGenerated) {
        pareoData = getRandomPareoData();
        savedData.pareoData = pareoData;
        savedData.pareoGenerated = true;
    } else {
        pareoData = savedData.pareoData;
    }

    if (!savedData.sopaGenerated) {
        sopaData = generateSopaLetras();
        savedData.sopaData = sopaData;
        savedData.sopaGenerated = true;
    } else {
        sopaData = savedData.sopaData;
    }

    pareoMatches = savedData.pareoMatches || {};
    crucigramaAnswers = savedData.crucigramaAnswers || {};
    sopaFoundWords = savedData.sopaFoundWords || [];
    currentPracticeSection = savedData.currentSection || 1;

    // Guardar datos actualizados
    localStorage.setItem("practiceData", JSON.stringify(savedData));
}

// Función para mostrar la sección de práctica actual
function showPracticeSection(section) {
    // Ocultar todas las secciones
    document.querySelectorAll('.practice-section').forEach(s => s.style.display = 'none');

    currentPracticeSection = section;

    switch (section) {
        case 1:
            document.getElementById('pareo-section').style.display = 'block';
            initPareo();
            break;
        case 2:
            document.getElementById('crucigrama-section').style.display = 'block';
            initCrucigrama();
            break;
        case 3:
            document.getElementById('sopa-section').style.display = 'block';
            initSopaLetras();
            break;
    }

    updatePracticeProgress();
    savePracticeData();
}

// Función para actualizar el progreso visual
function updatePracticeProgress() {
    document.querySelectorAll('.practice-box').forEach((box, index) => {
        box.classList.remove('active', 'completed');

        if (index + 1 === currentPracticeSection) {
            box.classList.add('active');
        } else if (index + 1 < currentPracticeSection) {
            box.classList.add('completed');
        }
    });
}

// --------------------------------------------------------------------------------------------------------------------------------------------------

// Inicializar pareo
function initPareo() {
    document.getElementById("name-section").style.display = "none";
    const container = document.getElementById('pareo-container');
    container.innerHTML = `
        <div class="pareo-column">
            <h4>Palabras</h4>
            ${pareoData.palabras.map((palabra, index) =>
        `<div class="pareo-item" data-type="palabra" data-index="${index}" onclick="selectPareoItem(this)">${palabra}</div>`
    ).join('')}
        </div>
        <div class="pareo-column">
            <h4>Definiciones</h4>
            ${pareoData.definiciones.map((def, index) =>
        `<div class="pareo-item" data-type="definicion" data-index="${index}" onclick="selectPareoItem(this)">${def}</div>`
    ).join('')}
        </div>
    `;

    // Restaurar matches guardados con colores
    Object.entries(pareoMatches).forEach(([palabraIndex, defIndex], matchIndex) => {
        const palabraEl = container.querySelector(`[data-type="palabra"][data-index="${palabraIndex}"]`);
        const defEl = container.querySelector(`[data-type="definicion"][data-index="${defIndex}"]`);
        if (palabraEl && defEl) {
            const colorClass = `color-${(matchIndex % 8) + 1}`;
            palabraEl.classList.add('matched', colorClass);
            defEl.classList.add('matched', colorClass);
        }
    });
    scrollToTop();
    window.scrollTo(top, 0);
}

let selectedPareoItem = null;

// Función para manejar el clic en un elemento de pareo
function selectPareoItem(element) {
    // Si el elemento ya está emparejado, permitir deshacerlo
    if (element.classList.contains('matched')) {
        const elementIndex = element.dataset.index;
        const elementType = element.dataset.type;

        // Encontrar y deshacer el emparejamiento
        if (elementType === 'palabra') {
            const defIndex = pareoMatches[elementIndex];
            if (defIndex !== undefined) {
                const defElement = document.querySelector(`[data-type="definicion"][data-index="${defIndex}"]`);
                if (defElement) {
                    // Remover todas las clases de color y matched
                    defElement.classList.remove('matched');
                    for (let i = 1; i <= 8; i++) {
                        defElement.classList.remove(`color-${i}`);
                    }
                }
                delete pareoMatches[elementIndex];
            }
        } else {
            // Buscar la palabra que está emparejada con esta definición
            const palabraIndex = Object.keys(pareoMatches).find(key => pareoMatches[key] == elementIndex);
            if (palabraIndex !== undefined) {
                const palabraElement = document.querySelector(`[data-type="palabra"][data-index="${palabraIndex}"]`);
                if (palabraElement) {
                    // Remover todas las clases de color y matched
                    palabraElement.classList.remove('matched');
                    for (let i = 1; i <= 8; i++) {
                        palabraElement.classList.remove(`color-${i}`);
                    }
                }
                delete pareoMatches[palabraIndex];
            }
        }

        // Remover todas las clases de color y matched del elemento actual
        element.classList.remove('matched');
        for (let i = 1; i <= 8; i++) {
            element.classList.remove(`color-${i}`);
        }
        savePracticeData();
        return;
    }

    if (selectedPareoItem) {
        selectedPareoItem.classList.remove('selected');

        if (selectedPareoItem.dataset.type !== element.dataset.type) {
            // Hacer match
            const palabraIndex = selectedPareoItem.dataset.type === 'palabra' ?
                selectedPareoItem.dataset.index : element.dataset.index;
            const defIndex = selectedPareoItem.dataset.type === 'definicion' ?
                selectedPareoItem.dataset.index : element.dataset.index;

            // Determinar el color para esta nueva pareja
            const matchCount = Object.keys(pareoMatches).length;
            const colorClass = `color-${(matchCount % 8) + 1}`;

            pareoMatches[palabraIndex] = defIndex;
            selectedPareoItem.classList.add('matched', colorClass);
            element.classList.add('matched', colorClass);
            savePracticeData();
        }
        selectedPareoItem = null;
    } else {
        selectedPareoItem = element;
        element.classList.add('selected');
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------

// Inicializar crucigrama
function initCrucigrama() {
    document.getElementById("name-section").style.display = "none";
    const container = document.getElementById('crucigrama-container');
    const gridSize = crucigramaData.gridSize;

    // Crear grid vacío
    const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(false));

    // Marcar celdas que deben ser blancas
    crucigramaData.words.forEach(wordData => {
        for (let i = 0; i < wordData.word.length; i++) {
            if (wordData.direction === 'horizontal') {
                grid[wordData.row][wordData.col + i] = true;
            } else {
                grid[wordData.row + i][wordData.col] = true;
            }
        }
    });

    // Generar HTML del grid
    let gridHTML = '';
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            if (grid[row][col]) {
                // Verificar si es el inicio de una palabra
                const wordNumber = getWordNumber(row, col);
                const numberLabel = wordNumber ? `<span class="word-number">${wordNumber}</span>` : '';

                gridHTML += `<div class="crucigrama-cell white">
                    ${numberLabel}
                    <input type="text" maxlength="1" id="${cellId}" onchange="saveCrucigramaAnswer('${cellId}', this.value)" oninput="handleCrucigramaInput(this, ${row}, ${col})" onkeydown="handleCrucigramaKeydown(event, ${row}, ${col})" onfocus="setCrucigramaWord(${row}, ${col})">
                </div>`;
            } else {
                gridHTML += `<div class="crucigrama-cell black"></div>`;
            }
        }
    }

    // Generar pistas
    const cluesHTML = `
        <div class="crucigrama-clues">
            <div class="clues-column">
                <h4>Horizontales</h4>
                ${crucigramaData.words.filter(w => w.direction === 'horizontal')
            .map((w, i) => `<p><strong>${i + 1}.</strong> ${w.clue}</p>`).join('')}
            </div>
            <div class="clues-column">
                <h4>Verticales</h4>
                ${crucigramaData.words.filter(w => w.direction === 'vertical')
            .map((w, i) => `<p><strong>${i + 1}.</strong> ${w.clue}</p>`).join('')}
            </div>
        </div>
    `;

    container.innerHTML = `<div class="crucigrama-grid">${gridHTML}</div>` + cluesHTML;

    // Restaurar respuestas guardadas
    Object.entries(crucigramaAnswers).forEach(([cellId, value]) => {
        const input = document.getElementById(cellId);
        if (input) input.value = value;
    });

    // Capturar palabras completas al cargar
    scrollToTop();
    window.scrollTo(top, 0);
    capturarPalabrasCompletas();
}

// Funcion para obtener el número de palabra en el crucigrama
function getWordNumber(row, col) {
    // Separar palabras horizontales y verticales
    const horizontales = crucigramaData.words.filter(w => w.direction === 'horizontal');
    const verticales = crucigramaData.words.filter(w => w.direction === 'vertical');

    // Buscar en horizontales (numeración 1, 2, 3)
    for (let i = 0; i < horizontales.length; i++) {
        if (horizontales[i].row === row && horizontales[i].col === col) {
            return i + 1;
        }
    }

    // Buscar en verticales (numeración 1, 2, 3)
    for (let i = 0; i < verticales.length; i++) {
        if (verticales[i].row === row && verticales[i].col === col) {
            return i + 1;
        }
    }

    return null;
}


// Funcion para guardar la respuesta del crucigrama
function saveCrucigramaAnswer(cellId, value) {
    crucigramaAnswers[cellId] = value.toUpperCase();
    // Capturar palabras completas
    capturarPalabrasCompletas();
    savePracticeData();
}

// Función para capturar palabras completas
function capturarPalabrasCompletas() {
    const palabrasCompletas = {};

    crucigramaData.words.forEach((wordData, index) => {
        let palabra = '';
        for (let i = 0; i < wordData.word.length; i++) {
            let cellId;
            if (wordData.direction === 'horizontal') {
                cellId = `cell-${wordData.row}-${wordData.col + i}`;
            } else {
                cellId = `cell-${wordData.row + i}-${wordData.col}`;
            }
            palabra += crucigramaAnswers[cellId] || '';
        }

        const tipo = wordData.direction === 'horizontal' ? 'H' : 'V';
        const numero = crucigramaData.words.filter(w => w.direction === wordData.direction).indexOf(wordData) + 1;
        palabrasCompletas[`${tipo}${numero}`] = {
            palabra: palabra,
            correcta: wordData.word,
            completa: palabra.length === wordData.word.length && palabra !== '',
            pista: wordData.clue
        };
    });

    // Guardar las palabras completas en practiceData
    const practiceData = JSON.parse(localStorage.getItem("practiceData")) || {};
    practiceData.crucigramaPalabras = palabrasCompletas;
    localStorage.setItem("practiceData", JSON.stringify(practiceData));

    // También guardar en examData
    let examData = JSON.parse(localStorage.getItem("examData")) || {};
    if (!examData.respuestasPractica) examData.respuestasPractica = {};
    examData.respuestasPractica.crucigramaPalabras = palabrasCompletas;
    localStorage.setItem("examData", JSON.stringify(examData));
}

// Función para manejar entrada de texto (solo una letra)
function handleCrucigramaInput(input, row, col) {
    let value = input.value;

    // Solo permitir letras, eliminar espacios y caracteres especiales
    value = value.replace(/[^A-Za-z]/g, '');

    // Solo tomar la primera letra si hay más de una
    if (value.length > 1) {
        value = value.charAt(0);
    }

    // Convertir a mayúscula
    value = value.toUpperCase();

    // Actualizar el input
    input.value = value;

    // Guardar la respuesta
    saveCrucigramaAnswer(input.id, value);

    // Si se escribió una letra, avanzar automáticamente
    if (value) {
        setTimeout(() => {
            moveToNextCell(row, col, value);
        }, 10);
    }
}

// Función para establecer la palabra actual cuando se hace foco
function setCrucigramaWord(row, col) {
    // Si no hay palabra actual, establecer la primera que encuentre
    if (!currentCrucigramaWord) {
        currentCrucigramaWord = findWordAtPosition(row, col);
    }
    // Si la posición actual no pertenece a la palabra actual, cambiar
    else if (!isPositionInWord(row, col, currentCrucigramaWord)) {
        currentCrucigramaWord = findWordAtPosition(row, col);
    }
}

// Función para manejar navegación con teclado en el crucigrama
function handleCrucigramaKeydown(event, row, col) {
    const key = event.key;

    // Bloquear espacios y caracteres especiales
    if (key === ' ' || key.match(/[^a-zA-Z\b\t\r\n]/)) {
        event.preventDefault();
        return;
    }

    // Si es una letra, el manejo se hace en handleCrucigramaInput
    if (key.match(/[a-zA-Z]/)) {
        return;
    }

    // Navegación con flechas
    let newRow = row;
    let newCol = col;

    switch (key) {
        case 'ArrowUp':
            newRow = row - 1;
            break;
        case 'ArrowDown':
            newRow = row + 1;
            break;
        case 'ArrowLeft':
            newCol = col - 1;
            break;
        case 'ArrowRight':
            newCol = col + 1;
            break;
        case 'Backspace':
            // Si la celda actual está vacía, ir a la anterior
            if (!event.target.value) {
                moveToPreviousCell(row, col);
            }
            return;
        default:
            return;
    }

    // Buscar la siguiente celda válida
    const nextCell = document.getElementById(`cell-${newRow}-${newCol}`);
    if (nextCell && nextCell.tagName === 'INPUT') {
        event.preventDefault();
        nextCell.focus();
    }
}

// Función para moverse a la siguiente celda automáticamente
function moveToNextCell(row, col, value) {
    if (!value || !currentCrucigramaWord) return;

    let nextRow = row;
    let nextCol = col;

    if (currentCrucigramaWord.direction === 'horizontal') {
        nextCol = col + 1;
    } else {
        nextRow = row + 1;
    }

    // Verificar si la siguiente celda está dentro de la palabra actual
    if (isPositionInWord(nextRow, nextCol, currentCrucigramaWord)) {
        const nextCell = document.getElementById(`cell-${nextRow}-${nextCol}`);
        if (nextCell && nextCell.tagName === 'INPUT') {
            nextCell.focus();
        }
    } else {
        // Si llegamos al final de la palabra, limpiar la palabra actual
        currentCrucigramaWord = null;
    }
}

// Función para moverse a la celda anterior
function moveToPreviousCell(row, col) {
    if (!currentCrucigramaWord) return;

    let prevRow = row;
    let prevCol = col;

    if (currentCrucigramaWord.direction === 'horizontal') {
        prevCol = col - 1;
    } else {
        prevRow = row - 1;
    }

    if (isPositionInWord(prevRow, prevCol, currentCrucigramaWord)) {
        const prevCell = document.getElementById(`cell-${prevRow}-${prevCol}`);
        if (prevCell && prevCell.tagName === 'INPUT') {
            prevCell.focus();
            prevCell.value = '';
            saveCrucigramaAnswer(`cell-${prevRow}-${prevCol}`, '');
        }
    }
}

// Función para encontrar la palabra en una posición (prioriza la palabra actual si existe)
function findWordAtPosition(row, col) {
    const wordsAtPosition = crucigramaData.words.filter(word => isPositionInWord(row, col, word));

    // Si hay múltiples palabras en esta posición (intersección)
    if (wordsAtPosition.length > 1) {
        // Si ya tenemos una palabra actual y está en esta posición, mantenerla
        if (currentCrucigramaWord && wordsAtPosition.includes(currentCrucigramaWord)) {
            return currentCrucigramaWord;
        }
        // Si no, devolver la primera
        return wordsAtPosition[0];
    }

    return wordsAtPosition[0] || null;
}

// Funcion para verificar si una posicion esta dentro de una palabra
function isPositionInWord(row, col, word) {
    if (word.direction === 'horizontal') {
        return row === word.row && col >= word.col && col < word.col + word.word.length;
    } else {
        return col === word.col && row >= word.row && row < word.row + word.word.length;
    }
}

// Función para inicializar la sopa de letras
function initSopaLetras() {
    document.getElementById("name-section").style.display = "none";
    const container = document.getElementById('sopa-container');
    const gridSize = sopaData.grid.length;
    let grid = '';

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `sopa-${row}-${col}`;
            grid += `<div class="sopa-cell" id="${cellId}" onclick="selectSopaCell(${row}, ${col})">${sopaData.grid[row][col]}</div>`;
        }
    }

    container.innerHTML = grid;

    // Restaurar palabras encontradas en el grid
    restoreFoundWordsInGrid();

    // Mostrar definiciones en lugar de palabras
    const listaPalabras = document.getElementById('lista-palabras');
    listaPalabras.innerHTML = sopaData.definitions.map(item => {
        const guiones = '_'.repeat(item.word.length);
        const encontrada = sopaFoundWords.includes(item.word);
        return `<div class="palabra-item ${encontrada ? 'encontrada' : ''}">
            <div class="definition">${item.definition}:</div>
            <div class="word-spaces">${encontrada ? item.word : guiones}</div>
        </div>`;
    }).join('');
    scrollToTop();
    window.scrollTo(top, 0);
}

// Funcion para seleccionar una celda de la sopa
let sopaSelection = [];
function selectSopaCell(row, col) {
    const cellId = `sopa-${row}-${col}`;
    const cell = document.getElementById(cellId);

    if (sopaSelection.length === 0) {
        sopaSelection.push({ row, col });
        cell.classList.add('selected');
    } else if (sopaSelection.length === 1) {
        sopaSelection.push({ row, col });
        checkSopaWord();
    }
}

// Funcion para comprobar si la palabra seleccionada es correcta
function checkSopaWord() {
    const [start, end] = sopaSelection;
    let word = '';
    let wordReverse = '';

    // Construir la palabra seleccionada
    if (start.row === end.row) {
        // Horizontal
        const minCol = Math.min(start.col, end.col);
        const maxCol = Math.max(start.col, end.col);
        for (let col = minCol; col <= maxCol; col++) {
            word += sopaData.grid[start.row][col];
        }
        wordReverse = word.split('').reverse().join('');
    } else if (start.col === end.col) {
        // Vertical
        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);
        for (let row = minRow; row <= maxRow; row++) {
            word += sopaData.grid[row][start.col];
        }
        wordReverse = word.split('').reverse().join('');
    } else {
        // Diagonal
        const rowDiff = end.row - start.row;
        const colDiff = end.col - start.col;
        const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
        const rowStep = rowDiff / steps;
        const colStep = colDiff / steps;

        for (let i = 0; i <= steps; i++) {
            const row = start.row + Math.round(i * rowStep);
            const col = start.col + Math.round(i * colStep);
            word += sopaData.grid[row][col];
        }
        wordReverse = word.split('').reverse().join('');
    }

    // Verificar si la palabra (o su reverso) está en la lista
    const foundWord = sopaData.words.find(w => w === word || w === wordReverse);
    if (foundWord && !sopaFoundWords.includes(foundWord)) {
        sopaFoundWords.push(foundWord);
        markSopaWordFound();
        updateSopaWordsList();
        savePracticeData();

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Palabra encontrada!',
            text: `Has encontrado: ${foundWord}`,
            timer: 2000,
            showConfirmButton: false,
            customClass: {
                popup: 'swal-instrucciones',
                title: 'swal-instrucciones-title',
                icon: 'swal-instrucciones-icon',
                htmlContainer: 'swal-instrucciones-text'
            }
        });
    }

    // Limpiar selección
    document.querySelectorAll('.sopa-cell.selected').forEach(cell => {
        if (!cell.classList.contains('found')) {
            cell.classList.remove('selected');
        }
    });
    sopaSelection = [];
}


// Funcion para marcar la palabra encontrada
function markSopaWordFound() {
    const [start, end] = sopaSelection;

    if (start.row === end.row) {
        const minCol = Math.min(start.col, end.col);
        const maxCol = Math.max(start.col, end.col);
        for (let col = minCol; col <= maxCol; col++) {
            document.getElementById(`sopa-${start.row}-${col}`).classList.add('found');
        }
    } else if (start.col === end.col) {
        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);
        for (let row = minRow; row <= maxRow; row++) {
            document.getElementById(`sopa-${row}-${start.col}`).classList.add('found');
        }
    }
}

// Funcion para actualizar la lista de palabras
function updateSopaWordsList() {
    const listaPalabras = document.getElementById('lista-palabras');
    listaPalabras.innerHTML = sopaData.definitions.map(item => {
        const guiones = '_'.repeat(item.word.length);
        const encontrada = sopaFoundWords.includes(item.word);
        return `<div class="palabra-item ${encontrada ? 'encontrada' : ''}">
            <div class="definition">${item.definition}:</div>
            <div class="word-spaces">${encontrada ? item.word : guiones}</div>
        </div>`;
    }).join('');
}

// Función para restaurar palabras encontradas en el grid
function restoreFoundWordsInGrid() {
    sopaFoundWords.forEach(foundWord => {
        const wordPosition = sopaData.wordPositions.find(pos => pos.word === foundWord);
        if (wordPosition) {
            const { row, col, direction, word } = wordPosition;

            for (let i = 0; i < word.length; i++) {
                let cellRow = row;
                let cellCol = col;

                if (direction === 'horizontal') {
                    cellCol = col + i;
                } else {
                    cellRow = row + i;
                }

                const cell = document.getElementById(`sopa-${cellRow}-${cellCol}`);
                if (cell) {
                    cell.classList.add('found');
                }
            }
        }
    });
}

// Función para avanzar a la siguiente sección
function nextPracticeSection() {
    if (currentPracticeSection < 3) {
        Swal.fire({
            title: '¿Continuar a la siguiente actividad?',
            text: 'Estás a punto de pasar a la siguiente actividad práctica.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                popup: 'swal-instrucciones',
                title: 'swal-instrucciones-title',
                confirmButton: 'swal-instrucciones-confirm',
                cancelButton: 'swal-instrucciones-cancel',
                icon: 'swal-instrucciones-icon',
                htmlContainer: 'swal-instrucciones-text'
            },
            didOpen: () => {
                scrollSwalArriba();
            }
        }).then((result) => {
            if (result.isConfirmed) {
                showPracticeSection(currentPracticeSection + 1);
            }
        });
    } else {
        finalizarPractica();
    }
}

// Función para mostrar la pantalla finalizada
function mostrarPantallaFinalizada() {
    scrollToTop();
    window.scrollTo(top, 0);
    localStorage.setItem("pantallaFinalizadaActiva", "true");
    document.getElementById('practice').style.display = 'none';
    document.getElementById('mostrarPantallaFinalizada').style.display = 'block';
}

// Función para finalizar la práctica
function finalizarPractica() {
    Swal.fire({
        title: '¿Deseas finalizar la práctica?',
        text: 'Ya has completado todas las actividades prácticas. Ahora puedes descargar tu examen completo si das a continuar.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'No continuar',
        customClass: {
            popup: 'swal-instrucciones',
            title: 'swal-instrucciones-title',
            confirmButton: 'swal-instrucciones-confirm',
            cancelButton: 'swal-instrucciones-cancel',
            icon: 'swal-instrucciones-icon',
            htmlContainer: 'swal-instrucciones-text'
        },
        didOpen: () => {
            scrollSwalArriba();
        }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("practicaFinalizada", "true");
            mostrarPantallaFinalizada();
        }
    });
}

// Función para guardar datos de práctica
function savePracticeData() {
    // Obtener datos existentes para preservar crucigramaPalabras
    const existingData = JSON.parse(localStorage.getItem("practiceData")) || {};

    const practiceData = {
        currentSection: currentPracticeSection,
        pareoMatches,
        crucigramaAnswers,
        crucigramaPalabras: existingData.crucigramaPalabras || {},
        sopaFoundWords,
        pareoData,
        sopaData,
        pareoGenerated: true,
        sopaGenerated: true
    };
    localStorage.setItem("practiceData", JSON.stringify(practiceData));

    // También guardar en examData para el PDF
    let examData = JSON.parse(localStorage.getItem("examData")) || {};
    examData.respuestasPractica = practiceData;
    localStorage.setItem("examData", JSON.stringify(examData));
}

// --------------------------------------------------------------------------------------------------------------------------------------------------


// Función para finalizar desarrollo y pasar a práctica
function finalizarDesarrollo() {
    Swal.fire({
        title: "Parte de desarrollo finalizada",
        text: "Ahora continúa con la parte 3: Práctica.",
        icon: "success",
        confirmButtonText: "Entendido",
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: 'swal-instrucciones',
            title: 'swal-instrucciones-title',
            confirmButton: 'swal-instrucciones-confirm',
            icon: 'swal-instrucciones-icon',
            htmlContainer: 'swal-instrucciones-text'
        },
        didOpen: () => {
            scrollSwalArriba();
        }
    }).then(() => {
        localStorage.setItem("parte2Finalizada", "true");
        document.getElementById("essay").style.display = "none";
        document.getElementById("practice").style.display = "block";
        initPracticePart();
        showPracticeSection(1);
        updatePracticeProgress();
    });
}