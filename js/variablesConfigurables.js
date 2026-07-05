//////////////////////////////////
// VariablesConfigurables.js
//////////////////////////////////
// Nombre del examen
const EXAM_NAME = "Examen final de Fundamentos de TI - INF1004";
$("#title").text(EXAM_NAME);
// Configuración general
const EXAM_DURATION_MINUTES = 165; // Cambiar a 180 u otro valor si se desea
// Claves de LocalStorage
const EXAM_STORAGE_KEY = "examData";
const EXAM_STATE_KEY = "examState";
// Seguridad
const ADMIN_PASSWORD = "Shoudymella1986*"; // Ctrl + Alt + P
const MAX_CLEAR_USES = 1;
const CLEAR_INTERVAL_DAYS = 1;
// Configuración del examen
//intentos
const MAX_ATTEMPTS = 1000;
// cantidad de preguntas de marque con x y cuanto valen
const UNIQUE_QUESTIONS_COUNT = 16; //20                   16 + 8 + 7 + 7 + 32 = 70    +   30 de la práctica Packet tracer
const UNIQUE_QUESTIONS_VALUE = "1 PTS";
// cantidad de preguntas de desarrollo y cuanto valen
const DEVELOPMENT_QUESTIONS_COUNT = 4;
const DEVELOPMENT_QUESTIONS_VALUE = "2 PTS";
// Prácticas
const PRACTICE_QUESTIONS_PAREO = 7;
// crucigrama 32 pustos de crucigrama
const PRACTICE_QUESTIONS_SOUP = 7;

// Código de acceso
const ACCESS_CODE = "Shoudy";

// para cada vez que llame un SweetAlert con scrollTop, se asegura de que el scroll esté arriba
function scrollSwalArriba() {
    const $popup = $(".swal-instrucciones");
    if ($popup.length) {
        $popup.scrollTop(0);
    }
}