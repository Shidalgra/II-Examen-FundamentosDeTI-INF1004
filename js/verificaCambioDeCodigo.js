//////////////////////////////////
// VerificaCambioDeCodigo.js
//////////////////////////////////

(function () {
    const examData = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY));

    if (examData?.accessCode && examData.accessCode !== ACCESS_CODE) {
        localStorage.removeItem(EXAM_STORAGE_KEY);
        localStorage.removeItem(EXAM_STATE_KEY);
        localStorage.removeItem("examStarted");
        localStorage.removeItem("examEndTime");
        localStorage.removeItem("uniqueQuestionsRandomizadas");
        localStorage.removeItem("studentAnswers");
        localStorage.removeItem("currentQuestionIndex");
        localStorage.removeItem("parte1Finalizada");
        localStorage.removeItem("parte2Finalizada");
        localStorage.removeItem("currentEssayIndex");
        localStorage.removeItem("aceptoInstruccionesExamen");
        localStorage.removeItem("practiceData");
        localStorage.removeItem("questionTimes");
        localStorage.removeItem("paginaRecargada");
        localStorage.removeItem("pantallaFinalizadaActiva");
        localStorage.removeItem("pdfDescargado");
        localStorage.removeItem("preguntasDesarrolloSeleccionadas");

        // Marcar que el código cambió
        localStorage.setItem("codigoCambiado", "true");
    }

    // Si el código cambió, inicia objeto vacío
    const newExamData =
        (examData?.accessCode !== ACCESS_CODE)
            ? {}
            : (examData || {});

    newExamData.accessCode = ACCESS_CODE;

    // Elimina datos que no deben conservarse cuando cambia el código
    if (examData?.accessCode !== ACCESS_CODE) {
        delete newExamData.instruccionesAceptadas;
        delete newExamData.fechaAceptacion;
        delete newExamData.respuestasDesarrollo;
        delete newExamData.respuestasSeleccionUnica;
        delete newExamData.respuestasPractica;
    }

    localStorage.setItem(
        EXAM_STORAGE_KEY,
        JSON.stringify(newExamData)
    );
})();