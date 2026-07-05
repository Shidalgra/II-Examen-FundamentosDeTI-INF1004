//////////////////////////////////
//PreguntasSeleccionUnica.js
/////////////////////////////////
let currentQuestion = 0;
let studentAnswers = [];

const uniqueQuestions = [
    {
        question: `¿Cuál es la principal diferencia entre un firewall de hardware y uno de software? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "El de hardware protege solo dispositivos móviles, el de software solo computadoras.",
            "El de hardware filtra el tráfico antes de llegar al dispositivo, el de software lo hace d,entro del SO.",
            "Ambos funcionan igual, pero el de software es más caro.",
            "El de hardware solo bloquea virus, el de software bloquea todo tipo de amenazas."

        ],
        correct: "El de hardware filtra el tráfico antes de llegar al dispositivo, el de software lo hace dentro del SO."
    },
    {
        question: `¿Cuál de las siguientes prácticas no son recomendables al usar un dispositivo USB? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Escanear el USB con un antivirus actualizado antes de abrir archivos.",
            "Solo usar USBs de marca reconocida.",
            "Conectar dispositivos USB desconocidos o de procedencia incierta.",
            "Compartir el USB con múltiples usuarios."

        ],
        correct: "Conectar dispositivos USB desconocidos o de procedencia incierta."
    },
    {
        question: `¿Qué característica distingue a la autenticación multifactor (MFA) de una autenticación tradicional? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Solo requiere una contraseña larga y compleja con letras, números y símbolos.",
            "Combina al menos dos métodos de verificación independientes.",
            "Solo utiliza preguntas de seguridad.",
            "Hace uso exclusivo de tokens físicos."

        ],
        correct: "Combina al menos dos métodos de verificación independientes."
    },
    {
        question: `¿Cuál es la principal función de una ACL (Access Control List) en un Router? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Restringir el tráfico según reglas definidas por el administrador.",
            "Actualizar el firmware automáticamente.",
            "Deshabilitar Telnet y habilitar SSH.",
            "Cifrar el tráfico de red."

        ],
        correct: "Restringir el tráfico según reglas definidas por el administrador."
    },
    {
        question: `¿Qué protocolo se utiliza para asignar direcciones IP dinámicamente en una red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "FTP.",
            "DHCP.",
            "HTTP.",
            "SMTP."

        ],
        correct: "DHCP"
    },
    {
        question: `¿Cuál de los siguientes ataques busca saturar los recursos de un sistema hasta dejarlo inoperante? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Phishing.",
            "DoS/DDoS.",
            "Spyware.",
            "Sniffing."

        ],
        correct: "DoS/DDos"
    },
    {
        question: `¿Qué elemento NO es recomendable incluir en una contraseña segura? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Letras mayúsculas y minúsculas.",
            "Caracteres especiales.",
            "Secuencias numéricas como “12345678”.",
            "Longitud superior a 12 caracteres."

        ],
        correct: "Secuencias numéricas como “12345678”."
    },
    {
        question: `¿Cuál es la principal ventaja de usar gestores de contraseñas? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Ayudan a crearlas y permiten guardarlas fácilmente.",
            "Generan y almacenan contraseñas complejas y únicas para cada servicio.",
            "Hacen que la autenticación en dos pasos no sea necesaria.",
            "Hacen innecesario el uso de firewalls."

        ],
        correct: "Generan y almacenan contraseñas complejas y únicas para cada servicio."
    },
    {
        question: `¿Qué función cumple el cifrado en la seguridad de red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Permitir el acceso remoto sin autenticación.",
            "Proteger la confidencialidad de los datos transmitidos.",
            "Incrementar la velocidad de la red.",
            "Eliminar virus automáticamente."

        ],
        correct: "Proteger la confidencialidad de los datos transmitidos."
    },
    {
        question: `¿Cuál de las siguientes opciones representa un ejemplo de amenaza de integridad en la red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Robo de credenciales por phishing.",
            "Modificación no autorizada de archivos durante la transmisión.",
            "Interrupción del servicio por DoS.",
            "Acceso físico no autorizado al servidor."

        ],
        correct: "Modificación no autorizada de archivos durante la transmisión."
    },
    {
        question: `¿Qué herramienta permite analizar el tráfico de red para detectar amenazas en tiempo real? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Lucidchart.",
            "Packet Tracer.",
            "ERDPlus.",
            "Wireshark."

        ],
        correct: "Wireshark"
    },
    {
        question: `¿Cuál es la mejor práctica al recibir un correo sospechoso que solicita tus credenciales? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Responder inmediatamente para aclarar dudas.",
            "Hacer clic en los enlaces para verificar su autenticidad.",
            "Ignorar el correo y reportarlo como phishing.",
            "Compartirlo con colegas para pedir opinión."

        ],
        correct: "Ignorar el correo y reportarlo como Phishing"
    },
    {
        question: `¿Qué capa del modelo TCP/IP se encarga de la entrega de paquetes entre dispositivos en diferentes redes? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Aplicación.",
            "Red (Internet).",
            "Enlace de datos.",
            "Física."

        ],
        correct: "Red (Internet)."
    },
    {
        question: `¿Cuál de los siguientes NO es un método de autenticación de doble factor? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Contraseña + SMS.",
            "Contraseña + token físico.",
            "Contraseña + pregunta de seguridad.",
            "Contraseña + app de autenticación."

        ],
        correct: "Contraseña + pregunta de seguridad."
    },
    {
        question: `¿Qué tipo de red conecta dispositivos dentro de un área geográfica limitada, como un edificio? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "WAN.",
            "LAN.",
            "MAN.",
            "PAN."

        ],
        correct: "LAN."
    },
    {
        question: `¿Cuál es la principal función de un switch en una red LAN? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Asignar direcciones IP públicas.",
            "Conectar dispositivos y gestionar el tráfico dentro de la red local.",
            "Proveer acceso inalámbrico.",
            "Cifrar todo el tráfico de red."

        ],
        correct: "Conectar dispositivos y gestionar el tráfico dentro de la red local."
    },
    {
        question: `¿Qué acción es fundamental para mantener la disponibilidad de los servicios en una red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Usar contraseñas simples.",
            "Compartir credenciales entre usuarios.",
            "Deshabilitar el firewall.",
            "Implementar redundancia y copias de seguridad."

        ],
        correct: "Implementar redundancia y copias de seguridad."
    },
    {
        question: `¿Cuál es el riesgo principal de no actualizar el software de red regularmente? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Exposición a vulnerabilidades conocidas.",
            "Disminución de la velocidad de la red.",
            "Pérdida de compatibilidad con dispositivos antiguos.",
            "Consumo excesivo de energía."

        ],
        correct: "Exposición a vulnerabilidades conocidas."
    },
    {
        question: `¿Qué protocolo se utiliza para transferir archivos de manera segura en una red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "HTTP.",
            "FTP.",
            "SMTP.",
            "SFTP."

        ],
        correct: "SFTP"
    },
    {
        question: `¿Cuál es el principal objetivo del principio de confidencialidad en seguridad de red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Garantizar que los datos estén siempre disponibles.",
            "Prevenir la modificación no autorizada de información.",
            "Impedir el acceso no autorizado a la información.",
            "Asegurar la integridad de los dispositivos."

        ],
        correct: "Impedir el acceso no autorizado a la información."
    },
    {
        question: `¿Qué medida es más efectiva para protegerse del phishing? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Usar siempre la misma contraseña.",
            "Verificar la URL y remitente antes de ingresar datos.",
            "Desactivar el firewall.",
            "Compartir información personal en redes sociales."

        ],
        correct: "Verificar la URL y remitente antes de ingresar datos."
    },
    {
        question: `¿Cuál es la función principal de un router en una red doméstica? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Conectar dispositivos a Internet y enviar información desde internet a los dispositivos personales.",
            "Proveer direcciones MAC y gestionar la configuración que envía el proveedor de servicio.",
            "Analizar el tráfico de red.",
            "Recibir, enviar y almacenar archivos compartidos."

        ],
        correct: "Conectar dispositivos a Internet y enviar información desde internet a los dispositivos personales."
    },
    {
        question: `¿Qué diferencia clave existe entre LAN y WAN? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "La LAN es inalámbrica y la WAN es cableada.",
            "La LAN cubre áreas pequeñas, la WAN cubre grandes distancias.",
            "La LAN usa solo switches, la WAN solo routers.",
            "La WAN no utiliza protocolos de comunicación."

        ],
        correct: "La LAN cubre áreas pequeñas, la WAN cubre grandes distancias."
    },
    {
        question: `¿Qué acción debe realizarse al configurar SSH en un router para máxima seguridad? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Usar contraseñas encriptadas y haciendo pool en DHCP.",
            "Habilitar Telnet y no generar claves RSA",
            "No compartiendo el usuario admin con todos los empleados.",
            "Generar claves RSA y deshabilitar Telnet.",

        ],
        correct: "Generar claves RSA y deshabilitar Telnet."
    },
    {
        question: `¿Cuál es el propósito de segmentar una red mediante VLANs? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Mejorar la velocidad de Internet.",
            "Separar el tráfico y aumentar la seguridad interna.",
            "Permitir el acceso sin autenticación.",
            "Eliminar la necesidad de firewalls.",

        ],
        correct: "Separar el tráfico y aumentar la seguridad interna."
    },
    {
        question: `¿Qué herramienta es ideal para realizar pruebas de penetración y evaluar la seguridad de una red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Bridges TCP/IP.",
            "Webflow.",
            "Post-Man.",
            "Kali Linux.",

        ],
        correct: "Kali Linux."
    },
    {
        question: `¿Cuál es la consecuencia de no cifrar las contraseñas en la configuración de un router? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Empeora la velocidad de acceso.",
            "Da problemas con acceso no autorizado y a la configuración.",
            "Reduce el consumo de energía.",
            "Aumenta la incompatibilidad con dispositivos antiguos.",

        ],
        correct: "Da problemas con acceso no autorizado y a la configuración."
    },
    {
        question: `¿Qué tipo de amenaza representa un software espía (spyware)? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Robo de información y monitoreo de actividades.",
            "Interrupción de servicio.",
            "Al lograr entrar da problemas de saturación de la red.",
            "Interrupción espiando y bloqueando los puertos de la PC.",

        ],
        correct: "Robo de información y monitoreo de actividades."
    },
    {
        question: `¿Cuál es el primer paso para mitigar un ataque de acceso no autorizado en un Router? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Guardar la contraseña en un block de notas.",
            "Deshabilitar Telnet y habilitar SSH.",
            "Reiniciar el router.",
            "Eliminar todas las contraseñas.",

        ],
        correct: "Deshabilitar Telnet y habilitar SSH."
    },
    {
        question: `¿Qué configuración en el navegador ayuda a proteger la privacidad del usuario? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Solo acceder desde Google.",
            "Desactivar la navegación segura",
            "Bloquear cookies de terceros y activar navegación segura",
            "Borrar el historial de navegación",

        ],
        correct: "Bloquear cookies de terceros y activar navegación segura"
    },
    {
        question: `¿Qué técnica ayuda a detectar intentos de intrusión en una red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Uso de hojas de cálculo",
            "Monitoreo con sistemas IDS como Snort",
            "Compartir contraseñas por correo",
            "Deshabilitar el firewall",

        ],
        correct: "Monitoreo con sistemas IDS como Snort"
    },
    {
        question: `¿Cuál es el riesgo de usar la misma contraseña en varias cuentas? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "No hay riesgo si la contraseña es compleja.",
            "Si una cuenta es comprometida, todas las demás quedan vulnerables.",
            "Mejora la seguridad por ser fácil de recordar.",
            "Permite acceso más rápido a los servicios.",

        ],
        correct: "Si una cuenta es comprometida, todas las demás quedan vulnerables."
    },
    {
        question: `¿Qué acción se recomienda antes de abrir archivos de un USB recibido de una fuente desconocida? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Escanear el USB con un antivirus actualizado.",
            "Abrir todos los archivos inmediatamente.",
            "Preguntar de quien es el USB.",
            "Abrir archivos y luego escanear el USB.",

        ],
        correct: "Escanear el USB con un antivirus actualizado."
    },
    {
        question: `¿Cuál es el propósito de un laboratorio de simulación con Packet Tracer en seguridad de red? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Practicar configuración y pruebas de seguridad en un entorno controlado.",
            "Crear la red que me da el servicio contratado.",
            "Descargar archivos de Internet sin restricciones.",
            "Eliminar la necesidad de firewalls.",

        ],
        correct: "Practicar configuración y pruebas de seguridad en un entorno controlado."
    },
    {
        question: `¿Qué medida de seguridad es esencial al administrar redes en una organización? ${UNIQUE_QUESTIONS_VALUE}`,
        options: [
            "Permitir acceso remoto sin restricciones",
            "Implementar políticas de contraseñas seguras y autenticación multifactor",
            "Compartir credenciales administrativas",
            "Desactivar actualizaciones automáticas.",

        ],
        correct: "Implementar políticas de contraseñas seguras y autenticación multifactor"
    },
];


// Función para cargar la pregunta actual
function loadQuestion(index) {
    // Mostrar advertencia solo en la primera pregunta
    if (index === 0 && !localStorage.getItem("selectionWarningShown")) {
        Swal.fire({
            icon: 'info',
            title: 'Parte 1: Selección Única',
            text: 'Seleccione la respuesta correcta haciendo clic en la opción de su preferencia. Una vez seleccionada, podrá avanzar a la siguiente pregunta. Recuerde que no podrá regresar a preguntas anteriores.',
            confirmButtonText: 'Comenzar',
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
        });
        localStorage.setItem("selectionWarningShown", "true");
    }

    // Guardar tiempo de pregunta anterior
    if (questionStartTime !== null && currentQuestion !== index) {
        const timeSpent = Date.now() - questionStartTime;
        if (!questionTimes.seleccionUnica) questionTimes.seleccionUnica = {};
        questionTimes.seleccionUnica[currentQuestion] = timeSpent;
        saveQuestionTimes();
    }

    // Iniciar tiempo para nueva pregunta
    questionStartTime = Date.now();

    const q = window.uniqueQuestions[index];
    const container = document.getElementById("question-content");

    container.innerHTML = `
        <p style="font-size: 1.1em; font-weight: bold; color: #004080; margin-bottom: 15px;">
            <strong>${index + 1}.</strong> ${q.question}
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${q.options.map(opt => `
                <label style="background: #f5f9ff; border: 1px solid #cce0f5; border-radius: 8px; padding: 8px 12px; cursor: pointer;">
                <input type="radio" name="q${index}" value="${opt}" 
                    onchange="saveAnswer(${index}, this.value)" 
                    ${studentAnswers[index] === opt ? "checked" : ""}
                    style="margin-right: 8px;">
                ${opt}
            </label>
            `).join('')}
        </div>
    `;

    const nextBtn = document.getElementById("nextBtn");

    // Habilitar o deshabilitar botón "Siguiente"
    if (studentAnswers[index]) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = 1;
        nextBtn.style.cursor = "pointer";
    } else {
        nextBtn.disabled = true;
        nextBtn.style.opacity = 0.6;
        nextBtn.style.cursor = "not-allowed";
    }

    // Actualizar barra de progreso
    updateProgress();
    nextBtn.innerText = (index === window.uniqueQuestions.length - 1) ? "Finalizar selección única" : "Siguiente";
}

// Guardar datos del estudiante
function guardarDatosEstudiante() {
    const nombre = document.getElementById("studentName").value.trim();
    const cedula = document.getElementById("studentID").value.trim();

    let data = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || {};
    data.nombreEstudiante = nombre;
    data.cedulaEstudiante = cedula;
    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(data));
}

function saveAnswer(index, value) {
    studentAnswers[index] = value;
    localStorage.setItem("studentAnswers", JSON.stringify(studentAnswers));
    localStorage.setItem("currentQuestionIndex", currentQuestion);
    updateProgress();

    // Guardar respuesta
    let examData = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || {};
    const q = window.uniqueQuestions[index];
    const normalize = (text) => text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/[.,]+$/g, "");

    const isCorrect = normalize(value) === normalize(q.correct);

    if (!examData.respuestasSeleccionUnica) {
        examData.respuestasSeleccionUnica = [];
    }
    examData.respuestasSeleccionUnica[index] = {
        pregunta: q.question,
        respuesta: value,
        correcta: q.correct,
        isCorrect
    };

    // Guardar tiempo de pregunta actual
    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(examData));
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = false;
    nextBtn.style.opacity = 1;
    nextBtn.style.cursor = "pointer";
}

// Función para avanzar a la siguiente pregunta
function nextQuestion() {
    // Guardar tiempo de pregunta actual
    if (questionStartTime !== null) {
        const timeSpent = Date.now() - questionStartTime;
        if (!questionTimes.seleccionUnica) questionTimes.seleccionUnica = {};
        questionTimes.seleccionUnica[currentQuestion] = timeSpent;
        saveQuestionTimes();
    }

    // Iniciar tiempo para nueva pregunta
    questionStartTime = Date.now();
    updateProgress();
    if (currentQuestion < window.uniqueQuestions.length - 1) {
        currentQuestion++;
        localStorage.setItem("currentQuestionIndex", currentQuestion);
        loadQuestion(currentQuestion);
    } else {
        // Mostrar resultados aquí o continuar al paso siguiente
        Swal.fire({
            title: "¡Parte #1 finalizada!",
            text: "Ahora continúa con la parte #2 de desarrollo.",
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
            // Mostrar mensaje de transición a desarrollo
            Swal.fire({
                icon: 'info',
                title: 'Parte 2: Desarrollo',
                text: 'Ahora responderá preguntas de desarrollo. Una vez que avance a la siguiente pregunta no podrá regresar a la anterior.',
                confirmButtonText: 'Entendido',
                allowOutsideClick: false,
                allowEscapeKey: false,
                customClass: {
                    popup: 'swal-instrucciones',
                    title: 'swal-instrucciones-title',
                    confirmButton: 'swal-instrucciones-confirm',
                    icon: 'swal-instrucciones-icon',
                    htmlContainer: 'swal-instrucciones-text'
                },

                // Forzar scroll arriba
                didOpen: () => {
                    scrollSwalArriba();
                }
            }).then(() => {
                localStorage.setItem("parte1Finalizada", "true");  // <-- guardamos la bandera
                document.getElementById("uniqueSelection").style.display = "none"; // Ocultar sección de selección única
                document.getElementById("essay").style.display = "block"; // Mostrar sección de desarrollo

                // Solo inicializar preguntas aleatorias si no existen
                const savedQuestions = localStorage.getItem("preguntasDesarrolloSeleccionadas");
                if (!savedQuestions) {
                    preguntasDesarrollo = getRandomDevelopmentQuestions();
                    localStorage.setItem("preguntasDesarrolloSeleccionadas", JSON.stringify(preguntasDesarrollo));
                } else {
                    preguntasDesarrollo = JSON.parse(savedQuestions);
                }
                const savedEssayIndex = localStorage.getItem("currentEssayIndex");
                indiceDesarrollo = savedEssayIndex !== null ? parseInt(savedEssayIndex, 10) : 0;
                mostrarPreguntaDesarrollo(indiceDesarrollo);
                cargarPanelLateralDesarrollo();
            });
        });
        console.log("Respuestas del estudiante:", studentAnswers);
    }
}

// Renderizar la barra de progreso
function renderProgressBar() {
    // Limpiar la barra de progreso
    const container = document.getElementById("progressList");
    const total = window.uniqueQuestions.length;
    document.getElementById("totalQuestions").textContent = total;
    container.innerHTML = "";

    // Renderizar los cuadros de progreso
    for (let i = 0; i < total; i++) {
        const box = document.createElement("div");
        box.classList.add("progress-box");
        box.textContent = i + 1;

        // Colorea si ya respondió
        box.style.background = studentAnswers[i] ? "rgba(248, 194, 26, 1)" : "#f1f1f1";

        // Si es la pregunta actual, resaltarla
        if (i === currentQuestion) {
            box.classList.add("active-question");
        }

        // Agregar atributos de estilo para el cursor
        box.style.cursor = "default";
        container.appendChild(box);
    }
}

// Actualizar la barra de progreso
function updateProgress() {
    renderProgressBar();
}

//Para hacer las preguntas aleatoras
function shuffleArray(inputArray) {
    return inputArray
        .map(q => ({
            ...q,
            options: q.options.sort(() => Math.random() - 0.5) // Opcional: también randomiza las opciones
        }))
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

// Inicialización (puedes llamarla al mostrar esta sección)
// Funciones para manejo de tiempos
function saveQuestionTimes() {
    localStorage.setItem("questionTimes", JSON.stringify(questionTimes));
}

// Cargar tiempos guardados
function loadQuestionTimes() {
    const saved = localStorage.getItem("questionTimes");
    if (saved) {
        questionTimes = JSON.parse(saved);
    }
}

// Inicialización preguntas de selección única
function initUniqueSelection() {
    loadQuestionTimes(); // Cargar tiempos guardados
    const saved = localStorage.getItem("uniqueQuestionsRandomizadas");

    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                window.uniqueQuestions = parsed.slice(0, UNIQUE_QUESTIONS_COUNT);
            } else {
                throw new Error("No es un array");
            }
        } catch (e) {
            const randomized = shuffleArray(uniqueQuestions).slice(0, UNIQUE_QUESTIONS_COUNT);
            window.uniqueQuestions = randomized;
            localStorage.setItem("uniqueQuestionsRandomizadas", JSON.stringify(randomized));
        }
    } else {
        const randomized = shuffleArray(uniqueQuestions).slice(0, UNIQUE_QUESTIONS_COUNT);
        window.uniqueQuestions = randomized;
        localStorage.setItem("uniqueQuestionsRandomizadas", JSON.stringify(randomized));
    }

    // Inicializar las respuestas del estudiante
    const savedAnswers = localStorage.getItem("studentAnswers");
    if (savedAnswers) {
        studentAnswers = JSON.parse(savedAnswers);
    } else {
        studentAnswers = [];
    }

    // Inicializar la pregunta actual
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    currentQuestion = savedIndex !== null ? parseInt(savedIndex, 10) : 0;

    loadQuestion(currentQuestion);
}

initUniqueSelection();