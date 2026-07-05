//////////////////////////////////
// CuandoIngresen.js
/////////////////////////////////
// ===== CAMBIO =====
// Se reemplaza document.addEventListener('DOMContentLoaded', ...)
// por el atajo de jQuery $(function() { ... });
$(function () {
    // No mostrar el mensaje si el examen ya inició
    const examData = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || {};
    if (examData.nombre && examData.cedula && examData.instruccionesAceptadas) {
        return; // Salir sin mostrar el mensaje
    }
    Swal.fire({
        title: 'Instrucciones importantes',
        html: `
            <p>Este examen es individual y debe completarse sin ayuda.</p>
            <br>
            <ul style="text-align:left;">
                <li>Por favor lea las intrucciones generales rápidamente</li>
                <li>No recargue la página</li>
                <li>No cambie de pestaña o ventana</li>
                <li>Evite cerrar el navegador</li>
                <li>El código para empezar a realizar el exámen es: <strong>${ACCESS_CODE}</strong></li>
            </ul>
            <br>
            <b>¿Esta de acuerdo?</b>
    `,
        position: 'top',
        imageUrl: 'images/question.png',
        confirmButtonText: 'Sí estoy de acuerdo',
        cancelButtonText: 'No estoy de acuerdo',
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
            // window.location.href = "https://www.google.com";
            // window.close();
        }
    });
});