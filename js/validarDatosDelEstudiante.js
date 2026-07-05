//////////////////////////////////
//ValidarDatosDelEstudiante.js
/////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("studentName");
    const idInput = document.getElementById("studentID");
    const validarBtn = document.getElementById("validarDatosBtn");

    if (!nameInput || !idInput || !validarBtn) return;

    const examData = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || {};
    document.getElementById("uniqueSelection").style.display = "none"; // Oculta al cargar

    if (examData.nombre && examData.cedula) {
        nameInput.value = examData.nombre;
        idInput.value = examData.cedula;
        nameInput.disabled = true;
        idInput.disabled = true;
        validarBtn.disabled = true;
        validarBtn.style.display = "none";
        document.getElementById("uniqueSelection").style.display = "block"; // Mostrar si ya estaba guardado

        //Para mostrar u ocultar la parte de desarrollo
        checkIfDevelopmentShouldShow();

        return;
    }

    // Evento para el botón Validar
    validarBtn.addEventListener("click", function () {
        const nombre = nameInput.value.trim();
        const cedula = idInput.value.trim();

        if (!validarNombre(nombre)) {
            Swal.fire({
                icon: "error",
                title: "Nombre inválido",
                text: "El nombre debe tener exactamente 3 palabras, cada una con mínimo 4 letras y máximo 18 letras.",
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
            });
            return;
        }

        if (!/^\d{9,}$/.test(cedula)) {
            Swal.fire({
                icon: "error",
                title: "Cédula inválida",
                text: "La cédula debe tener al menos 9 dígitos y máximo 12.",
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
            });
            return;
        }

        // Guardar en EXAM_STORAGE_KEY
        const estado = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY)) || {};
        estado.nombre = nombre;
        estado.cedula = cedula;
        localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(estado));

        nameInput.disabled = true;
        idInput.disabled = true;
        validarBtn.disabled = true;
        validarBtn.style.display = "none";
        checkIfDevelopmentShouldShow();

        Swal.fire({
            icon: "success",
            title: "Datos validados",
            text: "Nombre y cédula han sido guardados correctamente. Ahora puede comenzar con la Parte 1: Selección Única.",
            confirmButtonText: "Comenzar Parte 1",
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
            // Ocultar sección de datos del estudiante
            document.getElementById("name-section").style.display = "none";
            document.getElementById("uniqueSelection").style.display = "block";
            // Asegurar que se inicialice la selección única y se muestre el mensaje
            initUniqueSelection();
            renderProgressBar();
            // Forzar que aparezca el mensaje de la primera pregunta
            localStorage.removeItem("selectionWarningShown");
            loadQuestion(0);
        });
    });

    // Función para validar el nombre
    function validarNombre(nombre) {
        const partes = nombre.split(/\s+/).filter(Boolean);
        if (partes.length !== 3) return false;
        return partes.every(p => p.length >= 4 && p.length <= 18);
    }

    // Definición de la función que controla el mostrar desarrollo
    function checkIfDevelopmentShouldShow() {
        if (localStorage.getItem("parte1Finalizada") === "true") {
            document.getElementById("essay").style.display = "block";
            initDevelopmentPart(); // O la función que uses para iniciar desarrollo
        } else {
            document.getElementById("essay").style.display = "none";
        }
    }

});

// Mostrar los datos guardados en consola (desde EXAM_STORAGE_KEY)
const datos = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY));
console.log(datos?.nombre);
console.log(datos?.cedula);