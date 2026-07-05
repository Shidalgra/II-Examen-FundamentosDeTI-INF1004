//////////////////////////////////
//PreguntasDesarrollo.js
/////////////////////////////////
const preguntasDesarrolloCompletas = [
    `Analice cómo la combinación de firewalls, autenticación multifactor (MFA) y políticas de contraseñas contribuye a la defensa en profundidad de una red corporativa. Da ejemplos concretos de ataques que podrían ser mitigados por cada medida. ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Explique el proceso de configuración segura de un router, desde la asignación de IPs hasta la implementación de SSH y ACLs, justificando la importancia de cada paso para la seguridad de la red. ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Evalúe los riesgos y beneficios de utilizar gestores de contraseñas en entornos empresariales. ¿Cuáles son las mejores prácticas para su implementación y qué amenazas podrían surgir si no se gestionan adecuadamente? ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Compare los protocolos HTTP y HTTPS en términos de seguridad, explicando cómo el cifrado impacta la confidencialidad e integridad de la información transmitida. ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Describa un escenario realista de ataque de phishing dirigido a empleados de una empresa. Explica cómo la capacitación y las herramientas tecnológicas pueden reducir la probabilidad de éxito del ataque. ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Analice las diferencias entre una LAN y una WAN en cuanto a amenazas y medidas de seguridad recomendadas. Incluye ejemplos de dispositivos y configuraciones específicas para cada caso. ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Justifique la importancia de mantener actualizados los sistemas y dispositivos de red. ¿Qué vulnerabilidades pueden explotarse en sistemas desactualizados y cómo afectan a la organización? ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Explique el funcionamiento de un sistema de detección de intrusos (IDS) como Snort y cómo puede integrarse con otras herramientas de seguridad para una protección integral de la red. ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Propónga una política integral de uso seguro de dispositivos USB en una empresa, considerando controles técnicos y capacitación de usuarios. Explica cómo esta política previene incidentes de seguridad. ${DEVELOPMENT_QUESTIONS_VALUE}`,
    `Analice el impacto de la segmentación de red mediante VLANs en la seguridad y eficiencia operativa de una organización. Incluye ventajas, desventajas y recomendaciones de implementación. ${DEVELOPMENT_QUESTIONS_VALUE}`,
];

// Función para seleccionar preguntas únicas aleatorias 
function getRandomDevelopmentQuestions() {
    // Crear una copia del array original
    const $available = [...preguntasDesarrolloCompletas];
    const $selected = [];

    // Seleccionar preguntas según la variable DEVELOPMENT_QUESTIONS_COUNT aleatoriamente
    for (let i = 0; i < DEVELOPMENT_QUESTIONS_COUNT && $available.length > 0; i++) {
        const $randomIndex = Math.floor(Math.random() * $available.length);
        $selected.push($available[$randomIndex]);
        $available.splice($randomIndex, 1); // Remover la pregunta seleccionada
    }
    return $selected;
}

// Variables globales
let preguntasDesarrollo = [];
let indiceDesarrollo = 0;

// Función para inicializar la parte de desarrollo
function initDevelopmentPart() {
    loadQuestionTimes(); // Cargar tiempos guardados

    // Verificar si ya hay preguntas seleccionadas guardadas
    const $savedQuestions = localStorage.getItem("preguntasDesarrolloSeleccionadas");
    if ($savedQuestions) {
        preguntasDesarrollo = JSON.parse($savedQuestions);
    } else {
        preguntasDesarrollo = getRandomDevelopmentQuestions();
        localStorage.setItem("preguntasDesarrolloSeleccionadas", JSON.stringify(preguntasDesarrollo));
    }

    console.log('Preguntas de desarrollo seleccionadas:', preguntasDesarrollo.length, preguntasDesarrollo);

    const $savedEssayIndex = localStorage.getItem("currentEssayIndex");
    indiceDesarrollo = $savedEssayIndex !== null ? parseInt($savedEssayIndex, 10) : 0;
    mostrarPreguntaDesarrollo(indiceDesarrollo);

    $("#btnFinalizarDesarrollo").on("click", () => {
        Swal.fire({
            title: "Parte de desarrollo finalizada",
            text: "Has respondido todas las preguntas abiertas. Se generará el resumen.",
            icon: "success",
            confirmButtonText: "Continuar a descargar resumen",
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
            window.location.href = "resumen.html"; // Cambia esto si usas otra ruta
        });
    });
}

// Función para mostrar la pregunta actual
function mostrarPreguntaDesarrollo(index) {
    // Mostrar advertencia solo en la primera pregunta
    if (index === 0 && !localStorage.getItem("developmentWarningShown")) {
        Swal.fire({
            icon: 'warning',
            title: 'Importante',
            text: 'Una vez que avanza a la siguiente pregunta no podrá regresar a la anterior, deberá decidir con cuidado esta opción',
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
            didOpen: () => {
                scrollSwalArriba();
            }
        });
        localStorage.setItem("developmentWarningShown", "true");
    }

    // Guardar tiempo de pregunta anterior
    if (questionStartTime !== null && indiceDesarrollo !== index) {
        const $timeSpent = Date.now() - questionStartTime;
        if (!questionTimes.desarrollo) questionTimes.desarrollo = {};
        questionTimes.desarrollo[indiceDesarrollo] = $timeSpent;
        saveQuestionTimes();
    }

    // Iniciar tiempo para nueva pregunta
    questionStartTime = Date.now();
    const $contenedor = $("#essay-container");
    const pregunta = preguntasDesarrollo[index];

    indiceDesarrollo = index; // Actualiza el índice global
    localStorage.setItem("currentEssayIndex", indiceDesarrollo); // Guarda el índice actual

    // Destruir instancia previa de TinyMCE si existe
    if (tinymce.get(`respuesta-${index}`)) {
        tinymce.get(`respuesta-${index}`).destroy();
    }

    // Limpiar
    $contenedor.html(`
    <h2>Parte 2: Preguntas de desarrollo</h2>
    <div class="essay-question">
        <label for="respuesta-${index}"><strong>${index + 1}.</strong> ${pregunta}</label><br>
        <textarea id="respuesta-${index}" placeholder="Escribe tu respuesta aquí...">${obtenerRespuestaDesarrollo(index)}</textarea>
    </div>
    <div class="essay-navigation">
        <button id="btnSiguienteDesarrollo">Siguiente</button>
        <button id="btnFinalizarDesarrollo" style="display: none;">Finalizar Parte de Desarrollo</button>
    </div>
    `);

    // Inicializar TinyMCE
    const $isMobile = window.innerWidth <= 600;

    tinymce.init({
        selector: `#respuesta-${index}`,
        height: 450,
        skin: 'oxide',
        content_css: 'default',
        menubar: false,
        plugins: [
            'lists', 'link', 'wordcount', 'autosave', 'fullsceen', 'autoresize' , 'table'
        ],
        toolbar_mode: $isMobile ? 'sliding' : 'wrap',
        toolbar: $isMobile
            ? 'undo redo | bold italic | bullist numlist | fullscreen'
            : 'undo redo | bold italic underline | bullist numlist | alignleft aligncenter alignright | link table | fullscreen',
        toolbar_sticky: false,
        resize: false,
        statusbar: false,
        autosave_ask_before_unload: false,
        autosave_interval: '30s',
        autosave_prefix: `essay-${index}-`,
        placeholder: 'Desarrolla tu respuesta de manera clara y detallada...',
        content_style: `
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                font-size: 16px; 
                line-height: 1.6; 
                color: #1f2937;
                padding: 10px;
                max-width: none;
                background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
            }         
            p { margin: 0 0 12px; }
            
            h1, h2, h3 { 
                color: #004080; 
                margin-top: 20px; 
                margin-bottom: 12px;
                font-weight: 600;
            }            
            ul, ol { padding-left: 25px; }
            li { margin-bottom: 6px; }            
            strong { color: #004080; font-weight: 600; }
            em { color: #19A06E; }          
            blockquote {
                border-left: 4px solid #19A06E;
                background: rgba(25, 160, 110, 0.1);
                padding: 15px 20px;
                margin: 15px 0;
                border-radius: 0 8px 8px 0;
            }
        `,
        setup: function ($editor) {
            $editor.on('init', function () {
                const $container = $($editor.getContainer());
                $container.addClass('tinymce-container');
            });

            $editor.on('change keyup', function () {
                const $content = $editor.getContent();
                guardarRespuestaDesarrollo(index, $content);
            });

            $editor.on('focus', function () {
                const $container = $($editor.getContainer());
                $container.addClass('tinymce-focused');
            });

            $editor.on('blur', function () {
                const $container = $($editor.getContainer());
                $container.removeClass('tinymce-focused');
            });
        }
    });

    $("#btnSiguienteDesarrollo").on("click", function () {
        // Obtener contenido de TinyMCE
        const $editor = tinymce.get(`respuesta-${indiceDesarrollo}`);
        const $respuestaActual = $editor ? $editor.getContent({ format: 'text' }).trim() : '';

        // Verificar si la respuesta está vacía
        if (!$respuestaActual) {
            Swal.fire({
                icon: 'warning',
                title: 'Respuesta vacía',
                text: '¿Deseas continuar sin responder esta pregunta?',
                showCancelButton: true,
                confirmButtonText: 'Continuar',
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
                    // Usuario eligió continuar
                    continuarSiguientePregunta();
                }
                // Si cancela, no hace nada y se queda en la pregunta actual
            });
        } else {
            // Si hay respuesta, continuar normalmente
            continuarSiguientePregunta();
        }

        // Función para continuar a la siguiente pregunta
        function continuarSiguientePregunta() {
            // Guardar tiempo de pregunta actual
            if (questionStartTime !== null) {
                const $timeSpent = Date.now() - questionStartTime;
                if (!questionTimes.desarrollo) questionTimes.desarrollo = {};
                questionTimes.desarrollo[indiceDesarrollo] = $timeSpent;
                saveQuestionTimes();
            }

            // Guardar contenido de TinyMCE
            const $editor = tinymce.get(`respuesta-${indiceDesarrollo}`);
            const $contenido = $editor ? $editor.getContent() : '';
            guardarRespuestaDesarrollo(indiceDesarrollo, $contenido);

            // Destruir el editor actual antes de crear el siguiente
            if ($editor) {
                tinymce.remove(`#respuesta-${indiceDesarrollo}`);
            }

            if (indiceDesarrollo < preguntasDesarrollo.length - 1) {
                indiceDesarrollo++;
                localStorage.setItem("currentEssayIndex", indiceDesarrollo); // Guarda el nuevo índice
                mostrarPreguntaDesarrollo(indiceDesarrollo);
                cargarPanelLateralDesarrollo(); // Actualiza el panel lateral

                // Scroll hacia arriba inmediato para móviles
                window.scrollTo({ top: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                // Timeout adicional para asegurar en móviles
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                }, 100);
            }
        }
    });

    // Mostrar u ocultar el botón Finalizar
    if (indiceDesarrollo === preguntasDesarrollo.length - 1) {
        $("#btnSiguienteDesarrollo").hide();
        $("#btnFinalizarDesarrollo").show().on("click", finalizarDesarrollo);
    }

    // Guardar cambios automáticamente
    $("#respuesta-" + index).on("input", function () {
        guardarRespuestaDesarrollo(index, this.value);
    });
}

// Función para guardar la respuesta
function guardarRespuestaDesarrollo(index, texto) {
    const $examData = JSON.parse(localStorage.getItem("examData")) || {};
    $examData.respuestasDesarrollo = $examData.respuestasDesarrollo || {};
    $examData.respuestasDesarrollo[index] = texto;
    localStorage.setItem("examData", JSON.stringify($examData));
    cargarPanelLateralDesarrollo(); // Actualiza visualmente los botones
}

// Función para obtener la respuesta guardada
function obtenerRespuestaDesarrollo(index) {
    const $examData = JSON.parse(localStorage.getItem("examData")) || {};
    const $contenido = $examData.respuestasDesarrollo?.[index] || "";
    // Escapar el contenido HTML para evitar problemas en el textarea inicial
    return $contenido.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Actualizar visualmente los botones
function cargarPanelLateralDesarrollo() {
    const $panel = $("#essayProgressList");
    $panel.empty();
    preguntasDesarrollo.forEach((_, i) => {
        const $box = $("<div>")
            .addClass("progress-box")
            .text(i + 1)
            .css("cursor", "default");;

        // Colorea si ya respondió (verificar contenido sin HTML)
        const $examData = JSON.parse(localStorage.getItem("examData")) || {};
        const $contenido = $examData.respuestasDesarrollo?.[i] || "";
        const $tieneContenido = $contenido.replace(/<[^>]*>/g, '').trim().length > 0;

        if ($tieneContenido) {
            $box.addClass("answered");
        }

        // Si es la pregunta actual, resaltarla
        if (i === indiceDesarrollo) {
            $box.addClass("active-question");
        }

        $box.css("cursor", "default");
        $panel.append($box);
    });
}