//////////////////////////////////
//ValidarAcceso.js
/////////////////////////////////
function validateAccess() {
    const inputCode = document.getElementById("accessInput").value.trim();
    const checkbox = document.getElementById("agreeCheck");

    if (!checkbox.checked || !checkbox.disabled) {
        Swal.fire({
            icon: 'warning',
            title: 'Debe aceptar las instrucciones',
            text: 'Por favor lea y acepte las instrucciones antes de comenzar el exámen.',
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
        return; // Detiene la ejecución
    }

    if (inputCode === ACCESS_CODE) {
        Swal.fire({
            title: '¡Recuerde!',
            html: `                
                <ul style="text-align:left;">
                    <li>Le doy mis mejores deseos en la evaluación.</li>
                    <li>No recargue la página.</li>
                    <li>No cambie de pestaña o ventana.</li>
                    <li>Evite cerrar el navegador.</li>
                    <br>
                    <li><Strong>Si no cumple con esto el exámen podría anularse</Strong></li>
                </ul>
                <br>
                <ul style="text-align:left;">
                    <li><b>¡"Porque Jehová da la sabiduría, y de su boca viene el conocimiento y la inteligencia."</b></li>
                </ul>
                <ul style="text-align:right;">
                    <li><b>¡Proverbios 2:6!</b></li>
                </ul>
                `,
            position: 'top',
            imageUrl: 'images/BestWishes.png',
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
                // Ocultar sección de acceso
                document.getElementById("access-section").style.display = "none";

                // Marcar que el exámen empezó
                localStorage.setItem("examStarted", "true");

                // Mostrar elementos del exámen
                startTimer();
                // document.getElementById("nav-bar").style.display = "block";
                document.getElementById("begin-timer").style.display = "block";
                document.getElementById("name-section").style.display = "block";

                // Mostrar mensaje de bienvenida al exámen
                setTimeout(() => {
                    Swal.fire({
                        icon: 'info',
                        title: 'Bienvenido al Exámen',
                        text: 'Complete sus datos personales y luego podrá comenzar con la Parte 1: Selección Única.',
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
                }, 500);
            } else if (result.isDismissed) {
                // El usuario presionó cancelar o cerró el cuadro
                window.location.href = "https://www.google.com";
            }
        });
    } else {
        document.getElementById("accessError").style.display = "block";
    }
}

function resetAccess() {
    console.log("Reset access function called");
}