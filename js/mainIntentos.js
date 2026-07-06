//////////////////////////////////
//Main_Intentos.js
/////////////////////////////////
//VARIABLES GLOBALES
let intentoYaRestado = false; // Para evitar que se reste más de una vez
let devtoolsAbierto = false;
let devtoolsYaDetectado = false;
// VARIABLES PARA TRACKING DE TIEMPO
let questionStartTime = null;
let questionTimes = {};

// GESTIÓN DE INTENTOS
function obtenerIntentosRestantes() {
    const data = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY));
    return data?.intentosRestantes ?? MAX_ATTEMPTS;
}
// RESTAR INTENTO
function restarIntentoYGuardar() {
    if (intentoYaRestado) return;
    let data = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || { intentosRestantes: MAX_ATTEMPTS };
    data.intentosRestantes = Math.max(0, (data.intentosRestantes ?? MAX_ATTEMPTS) - 1);
    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(data));
    // Sincronizar con examData para el PDF
    let examData = JSON.parse(localStorage.getItem("examData")) || {};
    examData.intentosRestantes = data.intentosRestantes;
    localStorage.setItem("examData", JSON.stringify(examData));
    intentoYaRestado = true;
}
// VERIFICAR INTENTOS
function verificarIntentos() {
    const intentosRestantes = obtenerIntentosRestantes();
    if (intentosRestantes <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Examen bloqueado',
            text: 'Has agotado todos tus intentos.',
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
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem("practicaFinalizada", "true");
                mostrarPantallaFinalizada();
            }
        });
    }
}
// MOSTRAR INTENTOS RESTANTES
function mostrarIntentosRestantes() {
    const data = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || { intentosRestantes: MAX_ATTEMPTS };
    const restantes = data.intentosRestantes ?? MAX_ATTEMPTS;
    const $span = $("#intentos-restantes");
    if (!$span.length) return;
    $span.text(restantes);
    if (restantes === 2) {
        $span.css("color", "orange");
    } else if (restantes === 1) {
        $span.css("color", "red");
    } else if (restantes === 0) {
        $span.css("color", "gray");
    } else {
        $span.css("color", "green");
    }
}
// ACTUALIZAR ACCESO POR INTENTOS
function actualizarAccesoPorIntentos() {
    const restantes = obtenerIntentosRestantes();
    const $accessSection = $("#access-section");
    const $accessContent = $("#access-content");
    const $noAttemptsContent = $("#no-attempts-content");
    if (!$accessSection.length) return;
    if (restantes <= 0) {
        $accessSection.addClass("no-attempts");
        $accessContent.hide();
        $noAttemptsContent.show();
        $("#uniqueSelection").hide();
        $("#essay").hide();
    } else {
        $accessSection.removeClass("no-attempts");
        $accessContent.show();
        $noAttemptsContent.hide();
    }
}
// CONTROL DE ACCESO POR INTENTOS
function controlarAccesoPorIntentos() {
    const restantes = obtenerIntentosRestantes();
    const $inputCodigo = $("#accessInput");
    const $instrucciones = $("#toggleInstructionsBtn");
    const $btnIngresar = $inputCodigo.next();
    if (restantes <= 0) {
        $inputCodigo.prop("disabled", true);
        $btnIngresar.prop("disabled", true);
        $instrucciones.prop("disabled", true);
    } else {
        $inputCodigo.prop("disabled", false);
        $btnIngresar.prop("disabled", false);
        $instrucciones.prop("disabled", false);
    }
}
// CONTROL UNIFICADO DE SALIDA / TRAMPA
function manejarSalidaExamen(tipo, evento = null) {
    if (intentoYaRestado) return;
    restarIntentoYGuardar();
    mostrarIntentosRestantes();
    localStorage.setItem(EXAM_STATE_KEY, "perdido");
    if (tipo === "recarga" && evento) {
        const msg = "Si recarga o sale, perderá un intento.";
        evento.preventDefault();
        evento.returnValue = msg;
        return msg;
    }
    if (tipo === "cambioPestania") {
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Has salido del examen. Perdiste un intento.',
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
        }).then(() => location.reload());
    }
    if (tipo === "devtools") {
        Swal.fire({
            icon: 'error',
            title: 'Acción no permitida',
            text: 'Se detectó manipulación (DevTools). Has perdido un intento.',
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
        }).then(() => location.reload());
    }
}
$(window).on("beforeunload", function (e) {
    // Si está en pantalla finalizada Y ya descargó el PDF, no restar intento
    if (localStorage.getItem("pantallaFinalizadaActiva") === "true" && localStorage.getItem("pdfDescargado") === "true") {
        return;
    }
    // Marcar que se va a recargar para detectarlo después
    localStorage.setItem("paginaRecargada", "true");
    manejarSalidaExamen("recarga", e);
});
$(document).on("visibilitychange", function () {
    if (document.hidden) {
        manejarSalidaExamen("cambioPestania");
    }
});
// DETECCIÓN CONFIABLE DE DEVTOOLS
function detectarDevtoolsConTiempo() {
    const umbral = 100; // milisegundos
    const antes = new Date();
    Function('debugger')(); // Ejecuta sin mostrar nada
    const despues = new Date();
    const diferencia = despues - antes;
    if (diferencia > umbral && !devtoolsYaDetectado) {
        devtoolsYaDetectado = true;
        Swal.fire({
            icon: 'error',
            title: 'DevTools detectado',
            html: `
                <p>Has abierto las herramientas de desarrollo (DevTools).</p>
                <p><strong>Se perderá un intento</strong> por esta acción.</p>
            `,
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
        }).then(() => {
            manejarSalidaExamen("devtools"); // restar intento
            location.reload(); // recarga para bloquear el intento
        });
    }
}
// Llamar la detección cada 1.5 segundos
setInterval(detectarDevtoolsConTiempo, 1500);

// // MOSTRAR/OCULTAR INSTRUCCIONES
// const $btn = $("#toggleInstructionsBtn");
// const $instructions = $("#instruction");
// $instructions.hide();
// $btn.on("click", function () {
//     if ($instructions.is(":hidden")) {
//         $instructions.show();
//         $btn.text("Ocultar Instrucciones");
//     } else {
//         $instructions.hide();
//         $btn.text("Ver Instrucciones");
//     }
// });
// $(document).on("click", function (e) {
//     const isInside = $instructions.is(e.target) || $instructions.has(e.target).length || $btn.is(e.target);
//     if (!isInside && $instructions.is(":visible")) {
//         Swal.fire({
//             icon: 'info',
//             title: 'Instrucciones ocultas',
//             text: 'Se han ocultado automáticamente al interactuar fuera.',
//             confirmButtonText: 'Entendido',
//             allowOutsideClick: false,
//             allowEscapeKey: false,
//             customClass: {
//                 popup: 'swal-instrucciones',
//                 title: 'swal-instrucciones-title',
//                 confirmButton: 'swal-instrucciones-confirm',
//                 icon: 'swal-instrucciones-icon',
//                 htmlContainer: 'swal-instrucciones-text'
//             },
//             didOpen: () => {
//                 scrollSwalArriba();
//             }
//         });
//         $instructions.hide();
//         $btn.text("Ver Instrucciones");
//     }
// });
// // CHECKBOX DE CONSENTIMIENTO
// $(function () {
//     const $checkbox = $("#agreeCheck");
//     if (!$checkbox.length) return;
//     // --- Aquí agrego código para cargar el estado guardado ---
//     let estado = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || {};
//     if (estado.instruccionesAceptadas) {
//         $checkbox.prop("checked", true);
//         $checkbox.prop("disabled", true);
//         $instructions.hide();
//         $btn.text("Ver Instrucciones");
//     }
//     // Evento para guardar cuando el usuario acepte
//     $checkbox.on("change", function () {
//         if ($checkbox.prop("checked")) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Consentimiento registrado',
//                 text: 'Aceptaste las instrucciones. No se puede deshacer.',
//                 confirmButtonText: 'Aceptar',
//                 allowOutsideClick: false,
//                 allowEscapeKey: false,
//                 customClass: {
//                     popup: 'swal-instrucciones',
//                     title: 'swal-instrucciones-title',
//                     confirmButton: 'swal-instrucciones-confirm',
//                     icon: 'swal-instrucciones-icon',
//                     htmlContainer: 'swal-instrucciones-text'
//                 },
//                 didOpen: () => {
//                     scrollSwalArriba();
//                 }
//             }).then((result) => {
//                 if (result.isConfirmed || result.dismiss) {
//                     $checkbox.prop("disabled", true);
//                     $instructions.hide();
//                     $btn.text("Ver Instrucciones");
//                     // **Se añde esto para que se guarde en el localStorage**
//                     let estado = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || {};
//                     estado.instruccionesAceptadas = true;
//                     estado.fechaAceptacion = new Date().toISOString();
//                     localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(estado));
//                 } else {
//                     $checkbox.prop("checked", false);
//                 }
//             });
//         } else {
//             $checkbox.prop("checked", true);
//         }
//     });
// });
// BOTÓN SECRETO PARA ADMINISTRADOR
$(function () {
    const $adminBtn = $("#admin-clear");
    $adminBtn.hide();
    $(document).on("keydown", function (e) {
        if (e.ctrlKey && e.altKey && e.code === "KeyP") {
            const usedCount = parseInt(localStorage.getItem("clearButtonUses") || "0", 10);
            if (usedCount < MAX_CLEAR_USES) {
                $adminBtn.show();
            }
        }
    });
    $adminBtn.on("click", function () {
        const lastClearDateStr = localStorage.getItem("lastClearDate");
        const now = new Date();
        if (lastClearDateStr) {
            const lastClearDate = new Date(lastClearDateStr);
            const diffTime = now - lastClearDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            if (diffDays < 2) {
                Swal.fire({
                    icon: "info",
                    title: "Espera requerida",
                    text: "Este botón solo se puede usar cada 2 días.",
                    confirmButtonText: 'Aceptar',
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
                return;
            }
        }
        Swal.fire({
            title: "Confirmación",
            input: "password",
            inputLabel: "Ingrese su clave de administrador",
            inputPlaceholder: "Contraseña",
            showCancelButton: true,
            confirmButtonText: "Borrar todo",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                popup: 'swal-instrucciones',
                title: 'swal-instrucciones-title',
                input: 'swal-instrucciones-input',
                confirmButton: 'swal-instrucciones-confirm',
                cancelButton: 'swal-instrucciones-cancel',
            },
            didOpen: () => {
                scrollSwalArriba();
            },
            preConfirm: (password) => {
                if (password !== ADMIN_PASSWORD) {
                    Swal.showValidationMessage("❌ Contraseña incorrecta");
                }
                return password === ADMIN_PASSWORD;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                localStorage.setItem("lastClearDate", now.toISOString());
                let usedCount = parseInt(localStorage.getItem("clearButtonUses") || "0", 10);
                usedCount++;
                localStorage.setItem("clearButtonUses", usedCount.toString());
                localStorage.removeItem("pantallaFinalizadaActiva"); // Asegurar que se limpia
                localStorage.removeItem("pdfDescargado"); // Asegurar que se limpia
                $adminBtn.hide();
                Swal.fire({
                    icon: "success",
                    title: "Datos borrados",
                    text: "Todo el progreso del examen fue eliminado.",
                    confirmButtonText: 'Entendido',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    customClass: {
                        popup: 'swal-instrucciones',
                        title: 'swal-instrucciones-title',
                        confirmButton: 'swal-instrucciones-confirm',
                    },
                    didOpen: () => {
                        scrollSwalArriba();
                    }
                }).then(() => location.reload());
            }
        });
    });
});
// INICIALIZACIÓN
$(window).on("load", function () {
    // Detectar si el código cambió y mostrar instrucciones importantes
    if (localStorage.getItem("codigoCambiado") === "true") {
        localStorage.removeItem("codigoCambiado");
        mostrarInstruccionesImportantes();
    }
    // Detectar si hubo recarga y mostrar mensaje
    else if (localStorage.getItem("paginaRecargada") === "true") {
        localStorage.removeItem("paginaRecargada");
        $("#name-section").hide();
        Swal.fire({
            icon: 'warning',
            title: 'Página recargada',
            text: 'Has recargado la página. Perdiste un intento.',
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
    }
    verificarIntentos();
    mostrarIntentosRestantes();
    actualizarAccesoPorIntentos();
    controlarAccesoPorIntentos();
    // Sincronizar intentos con examData
    const intentosActuales = obtenerIntentosRestantes();
    let examData = JSON.parse(localStorage.getItem("examData")) || {};
    examData.intentosRestantes = intentosActuales;
    localStorage.setItem("examData", JSON.stringify(examData));
    // Agregar event listeners
    setupEventListeners();
});
// FUNCIÓN PARA SCROLL HACIA ARRIBA
function scrollToTop() {
    setTimeout(() => {
        // Múltiples métodos para máxima compatibilidad
        window.scrollTo({ top: 0 });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        // Para dispositivos móviles iOS/Android
        const scrollableElement = document.scrollingElement || document.documentElement;
        scrollableElement.scrollTop = 0;
        // Método adicional para móviles
        if (window.pageYOffset !== undefined) {
            try {
                window.scroll(0, 0);
            } catch (e) {
                // Fallback silencioso
            }
        }
    }, 150);
}
// CONFIGURACIÓN DE EVENT LISTENERS
function setupEventListeners() {
    // Botón ingresar
    $("#btnIngresar").on("click", validateAccess);
    // Botón reset admin
    $("#adminResetBtn").on("click", resetAccess);
    // Menú hamburguesa
    $("#nav-bar").on("click", showHideMenu);
    // Botón siguiente selección única
    $("#nextBtn").on("click", function () {
        nextQuestion();
        scrollToTop();
        window.scrollTo(top, 0); // Asegurar que se suba al inicio
    });
    // Botón siguiente desarrollo
    $("#nextBtnDesarrollo").on("click", function () {
        nextQuestion();
        scrollToTop();
        window.scrollTo(top, 0); // Asegurar que se suba al inicio
    });
    // Botones práctica
    $("#btnSiguientePractica1").on("click", function () {
        nextPracticeSection();
        scrollToTop();
        window.scrollTo(top, 0);
    });
    $("#btnSiguientePractica2").on("click", function () {
        nextPracticeSection();
        scrollToTop();
        window.scrollTo(top, 0);
    });
    $("#btnFinalizarPractica").on("click", function () {
        finalizarPractica();
        scrollToTop();
        window.scrollTo(top, 0);
    });
    // Función para generar la pausa y actualizar el texto del botón
    const esperarConContador = async (segundos, baseTexto, $boton) => {
        for (let i = segundos; i > 0; i--) {
            $boton.text(`${baseTexto} (${i}s)...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    };
    // Botón descargar final
    // --- LÓGICA PARA EL BOTÓN DE RESUMEN FINAL ---
    const $btnDescargarFinal = $("#btnDescargarFinal");
    if ($btnDescargarFinal.length) {
        $btnDescargarFinal.on("click", async function () {
            // 1. Bloqueo visual inicial (Igual que el PKA)
            $btnDescargarFinal.prop("disabled", true);
            $btnDescargarFinal.css("opacity", "0.6");
            $btnDescargarFinal.css("cursor", "not-allowed");
            $btnDescargarFinal.text("Iniciando generación...");
            try {
                // 3. Espera con contador (Usando tu función esperarConContador)
                // Le damos 5 segundos para que el proceso del PDF termine con calma
                await esperarConContador(5, "Preparando Resumen Teórico", $btnDescargarFinal);
                // 2. Ejecución de la descarga (Tu lógica original)
                localStorage.setItem("pdfDescargado", "true");
                $("#btnGenerarPDF").trigger("click");
                // 4. Estado final de éxito
                $btnDescargarFinal.text("¡Resumen del examen en linea descargado con su nombre!");
                $btnDescargarFinal.css("backgroundColor", "#28a745"); // El verde sólido
                $btnDescargarFinal.css("color", "white");
                // El truco clave: Opacidad al 100% para que el verde no se vea "lavado"
                $btnDescargarFinal.css("opacity", "0.8");
                $btnDescargarFinal.css("cursor", "not-allowed");
                // Aseguramos que quede deshabilitado permanentemente
                $btnDescargarFinal.prop("disabled", true);
            } catch (error) {
                console.error("Error en el proceso:", error);
                $btnDescargarFinal.text("Error en descarga");
                $btnDescargarFinal.prop("disabled", false);
                $btnDescargarFinal.css("opacity", "1");
            }
        });
    }
    const $btnDescargarPracticaPKA = $("#btnDescargarPracticaPKA");
    if ($btnDescargarPracticaPKA.length) {
        $btnDescargarPracticaPKA.on("click", async function () {
            // 1. Bloqueo visual inicial
            $btnDescargarPracticaPKA.prop("disabled", true);
            $btnDescargarPracticaPKA.css("opacity", "0.6");
            $btnDescargarPracticaPKA.css("cursor", "not-allowed");
            localStorage.setItem("PDF y PKA descargados", "true");
            const descargarArchivo = (ruta, nombre) => {
                const $link = $("<a>")
                    .attr("href", ruta)
                    .attr("download", nombre)
                    .appendTo("body");

                $link[0].click();
                $link.remove();
            };
            try {
                await esperarConContador(5, "Preparando PDF", $btnDescargarPracticaPKA);
                // --- PASO 1: Descargar PDF ---
                $btnDescargarPracticaPKA.text("Iniciando PDF...");
                descargarArchivo("documents/Examen_Practica_PacketTracer_INF1004_FundamentosTI.pdf", "Examen_Instrucciones_PacketTracer.pdf");
                // --- PASO 2: Espera con contador para el PKA ---
                // Usamos 5 segundos para asegurar que el navegador no bloquee
                await esperarConContador(5, "Preparando PKA", $btnDescargarPracticaPKA);
                // --- PASO 3: Descargar PKA ---
                $btnDescargarPracticaPKA.text("Iniciando PKA...");
                descargarArchivo("documents/Examen-Tercera-Parte-Fundamentos-TI.pka", "Examen_Laboratorio_PacketTracer.pka");
                // --- PASO 4: Cuenta atrás final para éxito ---
                await esperarConContador(3, "Finalizando", $btnDescargarPracticaPKA);
                // --- PASO 5: Resultado final ---
                $btnDescargarPracticaPKA.text("¡Los 2 archivos para práctica final descargados, revise descargas!  ");
                $btnDescargarPracticaPKA.css("backgroundColor", "#28a745");
                $btnDescargarPracticaPKA.css("color", "white");
                // El truco clave: Opacidad al 100% para que el verde no se vea "lavado"
                $btnDescargarPracticaPKA.css("opacity", "0.8");
                $btnDescargarPracticaPKA.css("cursor", "not-allowed");
                $btnDescargarPracticaPKA.prop("disabled", true);
            } catch (error) {
                console.error("Error en el proceso:", error);
                $btnDescargarPracticaPKA.text("Error en descarga");
                $btnDescargarPracticaPKA.prop("disabled", false);
                $btnDescargarPracticaPKA.css("opacity", "1");
            }
        });
    }
    // Botón generar PDF del menú
    $("#btnGenerarPDF").on("click", function () {
        localStorage.setItem("pdfDescargado", "true");
    });
}
// Función para mostrar instrucciones importantes
function mostrarInstruccionesImportantes() {
    Swal.fire({
        title: 'Instrucciones importantes',
        html: `
            <p>Este examen es individual y debe completarse sin ayuda.</p>
            <br>
            <ul style="text-align:left;">
                <li>Por favor lea las instrucciones generales detenidamente</li>
                <li>No recargue la página</li>
                <li>No cambie de pestaña o ventana</li>
                <li>Evite cerrar el navegador</li>
                <li>El código de acceso debe consultarlo al docente del curso, es para iniciar su examen</li>
            </ul>
            <br>
            <b>¿Está de acuerdo?</b>
    `,
        position: 'top',
        imageUrl: 'images/question.png',
        confirmButtonText: 'Sí estoy de acuerdo',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: 'swal-instrucciones',
            title: 'swal-instrucciones-title',
            confirmButton: 'swal-instrucciones-confirm',
            cancelButton: 'swal-instrucciones-cancel',
            icon: 'swal-instrucciones-icon',
            htmlContainer: 'swal-instrucciones-text',
            image: 'swal-instrucciones-image'
        },
        didOpen: () => {
            scrollSwalArriba();
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Usuario aceptó estas instrucciones");
        } else if (result.isDismissed) {
            // El usuario presionó cancelar o cerró el cuadro
            //window.location.href = "https://www.google.com";
        }
    });
}

//Para que no lo vuelva a pedir el código a menos que sea necesario
$(function () {
    const examData = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || {};
    const intentosRestantes = examData.intentosRestantes ?? MAX_ATTEMPTS;
    if (localStorage.getItem("parte2Finalizada") === "true") {
        $("#uniqueSelection").hide();
        $("#essay").hide();
        $("#practice").show();
        initPracticePart();
        // Recuperar la sección actual guardada
        const savedData = JSON.parse(localStorage.getItem("practiceData")) || {};
        const currentSection = savedData.currentSection || 1;
        showPracticeSection(currentSection);
        updatePracticeProgress();
    } else if (localStorage.getItem("parte1Finalizada") === "true") {
        $("#uniqueSelection").hide();
        $("#essay").show();
        $("#practice").hide();
        // Recupera el índice guardado o empieza en 0 si no existe
        const savedEssayIndex = localStorage.getItem("currentEssayIndex");
        indiceDesarrollo = savedEssayIndex !== null ? parseInt(savedEssayIndex, 10) : 0;
        mostrarPreguntaDesarrollo(indiceDesarrollo);
        cargarPanelLateralDesarrollo();
    } else {
        $("#uniqueSelection").show();
        $("#essay").hide();
        $("#practice").hide();
    }
    // Si no hay intentos, muestra solo el acceso bloqueado
    if (intentosRestantes <= 0) {
        $("#access-section").show();
        $("#uniqueSelection").hide();
        $("#essay").hide();
        $("#practice").hide();
        return;
    }
    // Verificar si está en pantalla finalizada
    if (localStorage.getItem("pantallaFinalizadaActiva") === "true") {
        $("#access-section").hide();
        $("#name-section").hide();
        $("#uniqueSelection").hide();
        $("#essay").hide();
        $("#practice").hide();
        $("#mostrarPantallaFinalizada").show();
        return;
    }
    // Si ya validó datos y aceptó instrucciones, muestra la parte correspondiente
    if (examData.nombre && examData.cedula && examData.instruccionesAceptadas) {
        $("#access-section").hide();
        $("#name-section").show();
        $("#nav-bar").show(); // Mostrar menú hamburguesa
        $("#begin-timer").show(); // Mostrar timer
        // Reiniciar el timer si es necesario
        if (localStorage.getItem("examStarted") === "true") {
            startTimer();
        }
        if (localStorage.getItem("parte2Finalizada") === "true") {
            $("#uniqueSelection").hide();
            $("#essay").hide();
            $("#practice").show();
            initPracticePart();
            // Recuperar la sección actual guardada
            const savedData = JSON.parse(localStorage.getItem("practiceData")) || {};
            const currentSection = savedData.currentSection || 1;
            showPracticeSection(currentSection);
            updatePracticeProgress();
        } else if (localStorage.getItem("parte1Finalizada") === "true") {
            $("#uniqueSelection").hide();
            $("#essay").show();
            $("#practice").hide();
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
        } else {
            $("#uniqueSelection").show();
            $("#essay").hide();
            $("#practice").hide();
            initUniqueSelection(); //Para que cargue
            renderProgressBar();
        }
    } else {
        // Si no ha validado datos, muestra el acceso
        $("#access-section").show();
        $("#name-section").hide();
        $("#uniqueSelection").hide();
        $("#essay").hide();
        $("#practice").hide();
    }
});