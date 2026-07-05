//////////////////////////////////
//IniciarCuentaRegresiva.js
/////////////////////////////////
let timerInterval;
// Función para iniciar el temporizador
function startTimer() {
    if (localStorage.getItem("examStarted") !== "true") {
        return;
    }
    // Verifica si ya existe endTime guardado
    let endTime = localStorage.getItem("examEndTime");
    if (!endTime) {
        endTime = Date.now() + EXAM_DURATION_MINUTES * 60 * 1000;
        localStorage.setItem("examEndTime", endTime);
    } else {
        endTime = parseInt(endTime, 10);
    }
    timerInterval = setInterval(() => {
        const remaining = endTime - Date.now();
        if (remaining <= 0) {
            clearInterval(timerInterval);
            $("#timer").text("Tiempo terminado");
            localStorage.removeItem("examEndTime");
            finishExam();
        } else {
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            $("#timer").text(
                `Tiempo restante: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        }
    }, 1000);
}
// Función para finalizar el exámen
function finishExam() {
    localStorage.removeItem("examEndTime");
    localStorage.removeItem("examStarted");
    clearInterval(timerInterval);
    // Aquí continúa el proceso normal de cierre del exámen
    Swal.fire({
        icon: 'info',
        title: 'Examen finalizado',
        text: 'Tu temporizador ha terminado.',
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
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("practicaFinalizada", "true");
            mostrarPantallaFinalizada();
        }
    });
}