//////////////////////////////////
//Seguridad.js
/////////////////////////////////
//BLOQUEO DE FUNCIONES NO PERMITIDAS
let seguridadActiva = true;

// Función de bloqueo de combinaciones peligrosas
document.addEventListener("keydown", function (e) {
    if (!seguridadActiva) return;

    const key = (e.key || "").toLowerCase();
    const bloqueado =
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && key === "i") ||   // DevTools
        (e.ctrlKey && key === "u") ||                 // Ver código fuente
        (e.ctrlKey && key === "s") ||                 // Guardar página
        (e.ctrlKey && key === "p") ||                 // Imprimir 
        (e.ctrlKey && key === "v") ||                 // Pegar     
        (e.ctrlKey && key === "c");                   // Copiar
    if (bloqueado) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

// Bloquear clic derecho
document.addEventListener("contextmenu", function (e) {
    if (seguridadActiva) {
        e.preventDefault();
    }
});

// Detección de DevTools
let devToolsDetected = false;
function detectDevTools() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
        if (!devToolsDetected) {
            devToolsDetected = true;
            const examData = JSON.parse(localStorage.getItem("examData")) || {};
            examData.dtStatus = true;
            localStorage.setItem("examData", JSON.stringify(examData));
        }
    }
}

// Verificar DevTools cada 500ms
setInterval(detectDevTools, 500);
window.addEventListener('load', detectDevTools);
window.addEventListener('resize', detectDevTools);

// Detección de cambio de pestaña
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        const examData = JSON.parse(localStorage.getItem("examData")) || {};
        examData.tabSwitched = true;
        localStorage.setItem("examData", JSON.stringify(examData));
    }
});