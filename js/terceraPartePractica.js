//////////////////////////////////
//TerceraParte.js
/////////////////////////////////
// Variables globales para la tercera parte
let currentPracticeSection = 1;
let pareoMatches = {};
let crucigramaAnswers = {};
let currentCrucigramaWord = null; // Para mantener la dirección de escritura
let currentCrucigramaDirection = null; // Dirección activa seleccionada
let sopaFoundWords = [];
let isSopaSelecting = false;
let sopaDragPath = []; // array de {row, col}

// Datos para el pareo - Términos del examen
const pareoDataComplete = {
    items: [
        { palabra: "WIRESHARK", definicion: "Herramienta para analizar el tráfico de red y detectar amenazas." },
        { palabra: "FTP", definicion: "Protocolo de RED utilizado para la transferencia de archivos." },
        { palabra: "UTP", definicion: "Cable es una clase de cable que no se encuentra blindado." },
        { palabra: "SFTP", definicion: "Cable laminado apantallado individual. Se le ha añadido una malla metálica LSZH(Low Smoke Zero Halogen) alrededor para aumentar el aislamiento de este cable." },
        { palabra: "PPP", definicion: "Permite transmitir datos de manera segura en conexiones punto a punto, como en módems." },
        { palabra: "HDLC", definicion: "Protocolo usado en redes WAN para asegurar la integridad de los datos transmitidos." },
        { palabra: "MALLA", definicion: "Es una topología donde los dispositivos se conectan entre sí de forma descentralizada" },
        { palabra: "ANILLO", definicion: "Topología que une los dispositivos (nodos) en un bucle cerrado, donde cada equipo se conecta exactamente a otros dos." },
        { palabra: "HTTPS", definicion: "Es la versión segura de HTTP" },
        { palabra: "MAC ADDRESS", definicion: "Identificador físico único de 12 caracteres (ej. 00:1A:2B:3C:4D:5E) asignado por el fabricante a cada tarjeta de red." },
        { palabra: "MASCARA", definicion: "Combinación de 32 bits que divide una dirección IP en dos partes: el identificador de red y el identificador de host." },
        { palabra: "PROTOCOL", definicion: "Conjunto de reglas y normas que permiten a los dispositivos comunicarse e intercambiar datos dentro de un sistema informático." },
        { palabra: "ROUTING", definicion: "Es el proceso mediante el cual los dispositivos de red, como los routers, determinan la mejor ruta para enviar paquetes de datos desde un origen hasta su destino final. Utiliza tablas de enrutamiento y protocolos para conectar diferentes redes entre sí de manera eficiente." },
        { palabra: "IPV4", definicion: "Protocolo de Internet con direcciones de 32 bits en formato decimal." },
        { palabra: "IOT", definicion: "Internet de las cosas; dispositivos interconectados cotidianos." },
        { palabra: "CIFRADO", definicion: "Protege datos transmitidos mediante protocolos seguros como TLS y VPN." },
        { palabra: "IPV6", definicion: "Protocolo de Internet con direcciones de 128 bits en formato hexadecimal." },
        { palabra: "PING", definicion: "Herramienta para probar la conectividad entre dispositivos." },
        { palabra: "WIFI", definicion: "Tecnología de red inalámbrica" },
        { palabra: "FIREWALL", definicion: "Sistema de protección contra amenazas de red" },
        { palabra: "2FA", definicion: "Autenticación de doble factor; capa extra de seguridad (ej. Google Authenticator)." },
        { palabra: "BUS", definicion: "Topología donde un solo cable conecta todos los dispositivos." },
        { palabra: "SUBRED", definicion: "División de una red IP para optimizar su direccionamiento." },
        { palabra: "FIBRA ÓPTICA", definicion: "Medio de transmisión que utiliza luz para transferir datos a alta velocidad." },
        { palabra: "ICMP", definicion: "Protocolo para diagnóstico y control de errores en redes (usado por ping)." },
        { palabra: "P2P", definicion: "Conexión punto a punto; directa entre dos dispositivos sin intermediarios." },
        { palabra: "TOKEN", definicion: "Dispositivo o código dinámico usado para autenticación." },
        { palabra: "INTERNET", definicion: "Red global de computadoras interconectadas mediante protocolos estándar." },
        { palabra: "HTTPS", definicion: "Versión segura del protocolo HTTP, cifrada." }
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
        { word: "RED", clue: "Conjunto de dispositivos interconectados para compartir recursos y comunicarse.", row: 0, col: 1, direction: "horizontal" },
        { word: "LATENCIA", clue: "Tiempo de retardo en la comunicación entre dispositivos.", row: 0, col: 7, direction: "horizontal" },
        { word: "SSH", clue: "Protocolo seguro para administración remota de dispositivos.", row: 2, col: 13, direction: "horizontal" },
        { word: "NAT", clue: "Traducción de direcciones de red; permite que múltiples dispositivos internos usen una sola IP pública.", row: 3, col: 8, direction: "horizontal" },
        { word: "RANSOMWARE", clue: "Tipo de malware que secuestra datos y pide un rescate económico.", row: 5, col: 0, direction: "horizontal" },
        { word: "SSID", clue: "Identificador de red utilizado en configuraciones inalámbricas.", row: 5, col: 11, direction: "horizontal" },
        { word: "DATOS", clue: "Información procesada por una computadora y que pueden ser transmitidos a través de una red.", row: 7, col: 0, direction: "horizontal" },
        { word: "DNS", clue: "Protocolo que traduce nombres de dominio a direcciones IP.", row: 9, col: 0, direction: "horizontal" },
        { word: "VLAN", clue: "Segmentación lógica de una red LAN", row: 9, col: 4, direction: "horizontal" },
        { word: "LAN", clue: "Red de área local que conecta dispositivos en un área geográfica limitada (edificio/campus).", row: 9, col: 11, direction: "horizontal" },
        { word: "ROUTER", clue: "Dispositivo que encamina el tráfico entre diferentes redes.", row: 11, col: 4, direction: "horizontal" },
        { word: "HTTP", clue: "Protocolo de transferencia de hipertexto utilizado para la navegación web.", row: 12, col: 0, direction: "horizontal" },
        { word: "TOPOLOGIA", clue: "Forma en que se diseñan o conectan los dispositivos en una red.", row: 13, col: 4, direction: "horizontal" },
        { word: "AP", clue: "Punto de acceso inalámbrico que extiende la señal Wi-Fi.", row: 14, col: 14, direction: "horizontal" },
        { word: "MODEM", clue: "Dispositivo que convierte señales digitales en señales analógicas y viceversa.", row: 15, col: 6, direction: "horizontal" },
        { word: "VPN", clue: "Red privada virtual que permite la comunicación segura a través de una red pública.", row: 15, col: 12, direction: "horizontal" },

        //Verticales
        { word: "SEGURIDAD", clue: "Estrategias y técnicas para proteger la infraestructura de redes y datos.", row: 1, col: 0, direction: "vertical" },
        { word: "DHCP", clue: "Protocolo que asigna direcciones IP automáticamente a los dispositivos.", row: 11, col: 0, direction: "vertical" },
        { word: "ETHERNET", clue: "Tecnología de red cableada común que utiliza cables con conectores RJ45.", row: 0, col: 2, direction: "vertical" },
        { word: "SWITCH", clue: "Dispositivo intermedio que conecta dispositivos dentro de una misma red local.", row: 9, col: 2, direction: "vertical" },
        { word: "CROSSOVER", clue: "Tipo de cable Ethernet utilizado para conectar directamente dos dispositivos iguales (como dos switches).", row: 3, col: 4, direction: "vertical" },
        { word: "TCP", clue: "Protocolo de control de transmisión que garantiza la entrega confiable de datos. (#13, pero, para abajo porque no aparece el número 6 vertical)", row: 13, col: 4, direction: "vertical" },
        { word: "GATEWAY", clue: "Puerta de enlace; nodo que sirve como punto de entrada para pasar de una red a otra.", row: 1, col: 6, direction: "vertical" },
        { word: "UTP", clue: "Cable de par trenzado no blindado.", row: 11, col: 6, direction: "vertical" },
        { word: "SNORT", clue: "Sistema de detección de intrusos (IDS) para redes.", row: 2, col: 8, direction: "vertical" },
        { word: "IDS", clue: "Sistema de detección de intrusos que monitorea tráfico sospechoso.", row: 7, col: 9, direction: "vertical" },
        { word: "ESTRELLA", clue: "Topología con un switch o hub central que conecta los dispositivos.", row: 4, col: 11, direction: "vertical" },
        { word: "IP", clue: "Protocolo de Internet que identifica dispositivos en la red.", row: 13, col: 11, direction: "vertical" },
        { word: "IPS", clue: "Sistema de prevención de intrusos que no solo detecta, sino que bloquea ataques.", row: 0, col: 13, direction: "vertical" },
        { word: "IPCONFIG", clue: "Comando en Windows para verificar la configuración IP.", row: 5, col: 13, direction: "vertical" },
        { word: "MAN", clue: "Red de área metropolitana que conecta redes locales en una ciudad.", row: 13, col: 14, direction: "vertical" },
        { word: "WAN", clue: "Red de área amplia que conecta redes locales.", row: 8, col: 15, direction: "vertical" }
    ],
    gridSize: 16
};

// 22 Palabras para la sopa de letras - Términos del examen con definiciones
const sopaWordsComplete = [
    { word: "PHISHING", definition: "Intento de engaño por correo, SMS o sitios falsos para robar información." },
    { word: "MALWARE", definition: "Software malicioso diseñado para dañar o comprometer sistemas." },
    { word: "ANTIVIRUS", definition: "Herramienta de seguridad que protege contra amenazas conocidas." },
    { word: "CROSSOVER", definition: "Tipo de cable Ethernet utilizado para conectar directamente dos dispositivos iguales (como dos switches)." },
    { word: "LATENCIA", definition: "Tiempo de retardo en la comunicación entre dispositivos." },
    { word: "WIFI", definition: "Tecnología de red inalámbrica" },
    { word: "FIREWALL", definition: "Sistema de protección contra amenazas de red" },
    { word: "DATOS", definition: "Información procesada por una computadora y que pueden ser transmitidos a través de una red." },
    { word: "KERNEL", definition: "Núcleo del sistema operativo" },
    { word: "MALWARE", definition: "Software malicioso que daña sistemas" },
    { word: "RED", definition: "Conexión entre múltiples dispositivos" },
    { word: "SERVIDOR", definition: "Computadora que proporciona servicios a otras" },
    { word: "CLIENTE", definition: "Dispositivo que solicita servicios a un servidor" },
    { word: "BACKUP", definition: "Copia de seguridad de datos importantes" },
    { word: "TOKEN", definition: "Dispositivo o código dinámico usado para autenticación." },
    { word: "INTEGRIDAD", definition: "Garantiza que los datos no sean modificados o corrompidos durante su transmisión o almacenamiento." },
    { word: "DISPONIBILIDAD", definition: "Asegura que la información y los servicios estén accesibles para los usuarios autorizados en todo momento." },
    { word: "CONFIDENCIALIDAD", definition: "Protección de la información contra accesos no autorizados mediante técnicas como cifrado y autenticación." },
    { word: "COAXIAL", definition: "(Registered Jack 45) conector estándar de 8 pines utilizado en los extremos de los cables de red Ethernet." },
    { word: "VIRUS", definition: "Software malicioso que se adjunta a archivos" }
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
                    <input type="text" 
                    maxlength="1" 
                    id="${cellId}" 
                    onchange="saveCrucigramaAnswer('${cellId}', this.value)" 
                    oninput="handleCrucigramaInput(this, ${row}, ${col})" 
                    onclick="setCrucigramaWord(${row}, ${col})" 
                    onkeydown="handleCrucigramaKeydown(event, ${row}, ${col})"
                    onfocus="setCrucigramaWord(${row}, ${col})">
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
            .map((w, i) => `<p id="clue-H${i + 1}" class="crucigrama-clue"><strong>${i + 1}.</strong> ${w.clue}</p>`).join('')}
            </div>
            <div class="clues-column">
                <h4>Verticales</h4>
                ${crucigramaData.words.filter(w => w.direction === 'vertical')
            .map((w, i) => `<p id="clue-V${i + 1}" class="crucigrama-clue"><strong>${i + 1}.</strong> ${w.clue}</p>`).join('')}
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

    updateCrucigramaClueCompletion(palabrasCompletas);
}

function updateCrucigramaClueCompletion(palabrasCompletas) {
    Object.entries(palabrasCompletas).forEach(([clave, datos]) => {
        const clueEl = document.getElementById(`clue-${clave}`);
        if (!clueEl) return;
        clueEl.classList.toggle('clue-complete', datos.completa);
    });
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

    // Seleccionar la palabra/dirección activa antes de avanzar
    setCrucigramaWord(row, col);

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
    const wordsAtPosition = crucigramaData.words.filter(word => isPositionInWord(row, col, word));
    if (wordsAtPosition.length === 0) return;

    if (currentCrucigramaWord && isPositionInWord(row, col, currentCrucigramaWord)) {
        const alternate = wordsAtPosition.find(word => word.direction !== currentCrucigramaWord.direction);
        if (alternate) {
            currentCrucigramaWord = alternate;
            currentCrucigramaDirection = alternate.direction;
            return;
        }
    }

    const preferred = currentCrucigramaDirection
        ? wordsAtPosition.find(word => word.direction === currentCrucigramaDirection)
        : null;

    currentCrucigramaWord = preferred || wordsAtPosition[0];
    currentCrucigramaDirection = currentCrucigramaWord.direction;
}

// Función para manejar navegación con teclado en el crucigrama
function handleCrucigramaKeydown(event, row, col) {
    const key = event.key;

    if (key === ' ' || key.match(/[^a-zA-Z\b\t\r\n]/)) {
        event.preventDefault();
        return;
    }

    if (/^[a-zA-Z]$/.test(key)) {
        event.preventDefault();
        setCrucigramaWord(row, col);
        if (!currentCrucigramaWord) return;

        const cellId = `cell-${row}-${col}`;
        const value = key.toUpperCase();
        event.target.value = value;
        saveCrucigramaAnswer(cellId, value);
        moveToNextCell(row, col, value);
        return;
    }

    let newRow = row;
    let newCol = col;

    if (!currentCrucigramaWord || !isPositionInWord(row, col, currentCrucigramaWord)) {
        setCrucigramaWord(row, col);
    }

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
            event.preventDefault();
            const cellId = `cell-${row}-${col}`;
            const currentValue = event.target.value;

            if (currentValue) {
                event.target.value = '';
                saveCrucigramaAnswer(cellId, '');
                return;
            }

            if (!currentCrucigramaWord) {
                setCrucigramaWord(row, col);
            }
            if (!currentCrucigramaWord) return;

            let prevRow = row;
            let prevCol = col;
            if (currentCrucigramaWord.direction === 'horizontal') {
                prevCol = col - 1;
            } else {
                prevRow = row - 1;
            }

            const prevCell = document.getElementById(`cell-${prevRow}-${prevCol}`);
            if (prevCell && prevCell.tagName === 'INPUT') {
                prevCell.focus();
                prevCell.select();
                prevCell.value = '';
                saveCrucigramaAnswer(`cell-${prevRow}-${prevCol}`, '');
            }
            return;
        default:
            return;
    }

    const nextCell = document.getElementById(`cell-${newRow}-${newCol}`);
    if (nextCell && nextCell.tagName === 'INPUT') {
        event.preventDefault();
        nextCell.focus();
        nextCell.select();
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

    if (isPositionInWord(nextRow, nextCol, currentCrucigramaWord)) {
        const nextCell = document.getElementById(`cell-${nextRow}-${nextCol}`);
        if (nextCell && nextCell.tagName === 'INPUT') {
            nextCell.focus();
            nextCell.select();
        }
    } else {
        currentCrucigramaWord = null;
    }
}

// Función para moverse a la celda anterior
function moveToPreviousCell(row, col) {
    if (!currentCrucigramaWord || !isPositionInWord(row, col, currentCrucigramaWord)) {
        currentCrucigramaWord = findWordAtPosition(row, col);
        if (!currentCrucigramaWord) return;
    }

    let prevRow = row;
    let prevCol = col;

    if (currentCrucigramaWord.direction === 'horizontal') {
        prevCol = col - 1;
    } else {
        prevRow = row - 1;
    }

    const prevCell = document.getElementById(`cell-${prevRow}-${prevCol}`);
    if (prevCell && prevCell.tagName === 'INPUT') {
        prevCell.focus();
        prevCell.select();
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

    // ----------------------------------------------------------------------------------

    // Attach pointer handlers for drag selection (works for mouse & touch)
    document.querySelectorAll('.sopa-cell').forEach(cell => {
        const idParts = cell.id.split('-'); // id formato: sopa-row-col
        const row = parseInt(idParts[1], 10);
        const col = parseInt(idParts[2], 10);

        cell.addEventListener('pointerdown', (e) => {
            // Start selection path; DO NOT preventDefault so clicks still fire
            isSopaSelecting = true;
            sopaDragPath = [{ row, col }];
            cell.classList.add('selected');
            // Do not call setPointerCapture or preventDefault here to preserve native click/tap
        });

        cell.addEventListener('pointerenter', (e) => {
            if (!isSopaSelecting) return;
            const last = sopaDragPath[sopaDragPath.length - 1];
            if (last.row === row && last.col === col) return;
            sopaDragPath.push({ row, col });
            // highlight incremental during drag
            if (!cell.classList.contains('found')) cell.classList.add('selected');
        });

        cell.addEventListener('pointerup', (e) => {
            if (!isSopaSelecting) return;
            isSopaSelecting = false;
            // Only treat as a drag selection if more than one cell was traversed
            if (sopaDragPath.length > 1) {
                const start = sopaDragPath[0];
                const end = sopaDragPath[sopaDragPath.length - 1];
                sopaSelection = [start, end];
                checkSopaWord();
                // clear temporary selected highlights (found ones remain)
                document.querySelectorAll('.sopa-cell.selected').forEach(c => {
                    if (!c.classList.contains('found')) c.classList.remove('selected');
                });
            }
            sopaDragPath = [];
        });
    });

    // Global pointerup in case pointer is released outside a cell
    document.addEventListener('pointerup', () => {
        if (!isSopaSelecting) return;
        isSopaSelecting = false;
        if (sopaDragPath.length > 1) {
            const start = sopaDragPath[0];
            const end = sopaDragPath[sopaDragPath.length - 1];
            sopaSelection = [start, end];
            checkSopaWord();
            document.querySelectorAll('.sopa-cell.selected').forEach(c => {
                if (!c.classList.contains('found')) c.classList.remove('selected');
            });
        }
        sopaDragPath = [];
    });

    // Global pointerup in case pointer is released outside a cell
    document.addEventListener('pointerup', () => {
        if (!isSopaSelecting) return;
        isSopaSelecting = false;
        if (sopaDragPath.length) {
            const start = sopaDragPath[0];
            const end = sopaDragPath[sopaDragPath.length - 1];
            sopaSelection = [start, end];
            checkSopaWord();
            document.querySelectorAll('.sopa-cell.selected').forEach(c => {
                if (!c.classList.contains('found')) c.classList.remove('selected');
            });
        }
        sopaDragPath = [];
    });



    // ----------------------------------------------------------------------------------













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
    // const [start, end] = sopaSelection;
    // Obtener start/end desde sopaSelection (si la selección viene como path tomamos primer/último)
    let start = sopaSelection[0];
    let end = sopaSelection[sopaSelection.length - 1];
    if (!start || !end) return;

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
    $('#practice').hide();
    $('#mostrarPantallaFinalizada').show();
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