//////////////////////////////////
//GenerarPDF.js
/////////////////////////////////
// Función auxiliar para formatear tiempo
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
// Función para renderizar HTML con formato real en PDF
function renderHTMLToPDF(doc, htmlContent, startY, maxWidth = 170) {
    const $tempDiv = $("<div>").html(htmlContent);
    let currentY = startY;
    // Función auxiliar para procesar elementos HTML
    function processElement(element, currentStyle = {}) {
        $(element).contents().each(function () {
            const node = this;
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent.trim();
                if (text) {
                    doc.setFont(undefined, currentStyle.bold ? 'bold' : currentStyle.italic ? 'italic' : 'normal');
                    doc.setFontSize(currentStyle.fontSize || 12);
                    const lines = doc.splitTextToSize(text, maxWidth);
                    const dimensions = doc.getTextDimensions(lines);
                    doc.text(lines, 20, currentY);
                    currentY += dimensions.h;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                let newStyle = { ...currentStyle };
                // Manejar tablas
                if (tagName === 'table') {
                    const tableData = [];
                    let headers = [];
                    $(node).find('tr').each(function (rowIndex) {
                        const $row = $(this);
                        const cellTexts = $row.find('td, th').map(function () {
                            return $(this).text().trim();
                        }).get();
                        if (rowIndex === 0 && $row.find('th').length > 0) {
                            headers = cellTexts;
                        } else {
                            tableData.push(cellTexts);
                        }
                    });
                    doc.autoTable({
                        startY: currentY,
                        head: headers.length > 0 ? [headers] : undefined,
                        body: tableData,
                        margin: { left: 20, right: 20 },
                        styles: {
                            fontSize: 9,
                            cellPadding: 2,
                            overflow: 'linebreak',
                            valign: 'top'
                        },
                        headStyles: {
                            fillColor: [230, 230, 230],
                            textColor: [0, 0, 0]
                        }
                    });
                    currentY = doc.lastAutoTable.finalY + 5;
                    return true;
                }
                // Aplicar estilos según el tag
                switch (tagName) {
                    case 'strong':
                    case 'b':
                        newStyle.bold = true;
                        break;
                    case 'em':
                    case 'i':
                        newStyle.italic = true;
                        break;
                    case 'u':
                        // Para subrayado, usar texto normal pero agregar indicador
                        processElement(node, newStyle);
                        return true;
                    case 'h1':
                        newStyle.fontSize = 16;
                        newStyle.bold = true;
                        currentY += 5;
                        break;
                    case 'h2':
                        newStyle.fontSize = 14;
                        newStyle.bold = true;
                        currentY += 5;
                        break;
                    case 'h3':
                        newStyle.fontSize = 13;
                        newStyle.bold = true;
                        currentY += 3;
                        break;
                    case 'p':
                    case 'div': {
                        const text = $(node).text().trim();
                        if (text) {
                            doc.setFont(undefined, 'normal');
                            doc.setFontSize(currentStyle.fontSize || 12);
                            const lines = doc.splitTextToSize(text, maxWidth);
                            doc.text(lines, 20, currentY);
                            currentY += lines.length * 6;
                        }
                        currentY += 3;
                        return true;
                    }
                    case 'br':
                        currentY += 5;
                        return true;
                    case 'ul':
                    case 'ol':
                        currentY += 3;
                        break;
                    case 'li':
                        doc.setFont(undefined, 'normal');
                        doc.setFontSize(12);
                        doc.text('• ', 20, currentY);
                        const liContent = node.textContent.trim();
                        if (liContent) {
                            const lines = doc.splitTextToSize(liContent, maxWidth - 10);
                            const dimensions = doc.getTextDimensions(lines);
                            doc.text(lines, 30, currentY);
                            currentY += dimensions.h;
                        }
                        return true;
                }
                // Procesar el contenido de los nodos hijos
                processElement(node, newStyle);
                // Aumentar la posición vertical dependiendo del tag
                if (['p', 'h1', 'h2', 'h3', 'div', 'ul', 'ol'].includes(tagName)) {
                    currentY += 3;
                }
            }
        });
    }
    // Procesar el contenido HTML
    processElement($tempDiv);
    return currentY;
}
// para generar un espacio para la retroalimentación en el PDF, si se pasa de cierto límite de Y, se agrega una nueva página
function agregarEspacioRetroalimentacion(doc, y) {
    if (y > 235) {
        doc.addPage();
        y = 20;
    }
    doc.setFont(undefined, "bold");
    doc.setFontSize(10);
    doc.text("Retroalimentación:", 20, y);
    y += 8;
    doc.setDrawColor(180, 180, 180);
    for (let i = 0; i < 3; i++) {
        doc.line(20, y, 190, y);
        y += 9;
    }
    return y + 6;
}
$("#btnGenerarPDF").on("click", function () {
    const resumenNombre = $("#studentName").val().trim();
    // Inicializar jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;
    // Datos del exámen
    const examData = JSON.parse(localStorage.getItem("examData")) || {};
    console.log("Datos exámen para PDF:", examData);
    // Información del estudiante
    const nombre = examData.nombre || "No registrado";
    const cedula = examData.cedula || "No registrada";
    const respuestasSeleccion = Array.isArray(examData.respuestasSeleccionUnica)
        ? examData.respuestasSeleccionUnica
        : [];
    const respuestasDesarrollo = examData.respuestasDesarrollo || {};
    const respuestasPractica = examData.respuestasPractica || {};
    const dtStatus = examData.dtStatus || false;
    const tabSwitched = examData.tabSwitched || false;
    const intentosRestantes = examData.intentosRestantes || 0;
    //Título de PDF
    doc.setFontSize(16);
    doc.text("Resumen del Examen", 20, y);
    y += 10;
    //Instrucciones aceptadas
    doc.setFontSize(12);
    if (examData.instruccionesAceptadas) {
        doc.text("El estudiante aceptó las instrucciones del examen.", 20, y);
    } else {
        doc.text("El estudiante NO aceptó las instrucciones del examen.", 20, y);
    }
    y += 10;
    // Información del estudiante
    doc.setFontSize(12);
    doc.text(`Nombre del estudiante: ${nombre}`, 20, y);
    y += 10;
    doc.text(`Cédula: ${cedula}`, 20, y);
    y += 10;
    // Agregar fecha y hora actual del examen
    const fechaTexto = $("#dateDisplay").text() || "Fecha no disponible";
    doc.text(fechaTexto, 20, y);
    y += 10;
    // Agregar tiempo restante del examen
    const tiempoTexto = $("#timer").text() || "Tiempo no disponible";
    doc.text(tiempoTexto, 20, y);
    y += 10;
    // Estado de DevTools (discreto)
    doc.text(`DT: ${dtStatus ? 'true' : 'false'}`, 20, y);
    y += 10;
    // Cambio de pestaña
    doc.text(`Cambio pestaña: ${tabSwitched ? 'Sí' : 'No'}`, 20, y);
    y += 10;
    // Intentos restantes
    doc.text(`Intentos restantes: ${intentosRestantes}`, 20, y);
    y += 10;
    // Obtener tiempos guardados
    const tiemposGuardados = JSON.parse(localStorage.getItem("questionTimes")) || {};
    // Selección única
    const datosSeleccion = respuestasSeleccion.map((item, index) => {
        const tiempo = tiemposGuardados.seleccionUnica?.[index] ? formatTime(tiemposGuardados.seleccionUnica[index]) : "N/A";
        return [
            `${index + 1}. ${item.pregunta}`,
            item.respuesta,
            tiempo
        ];
    });
    // Incluir las preguntas
    if (datosSeleccion.length > 0) {
        doc.text("Respuestas de selección única:", 20, y);
        y += 5;
        doc.autoTable({
            startY: y,
            head: [["Pregunta", "Respuesta", "Tiempo"]],
            body: datosSeleccion,
        });
        y = doc.lastAutoTable.finalY + 10;
    }
    // Desarrollo - incluir las preguntas con formato HTML
    const preguntasDesarrolloSeleccionadas = JSON.parse(localStorage.getItem("preguntasDesarrolloSeleccionadas")) || [];
    if (Object.keys(respuestasDesarrollo).length > 0) {
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Respuestas de desarrollo:", 20, y);
        doc.setFont(undefined, "normal");
        y += 8;
        Object.entries(respuestasDesarrollo).forEach(([key, value], index) => {
            const tiempo = tiemposGuardados.desarrollo?.[index]
                ? formatTime(tiemposGuardados.desarrollo[index])
                : "N/A";
            const pregunta = preguntasDesarrolloSeleccionadas[index] || `Pregunta ${index + 1}`;
            if (y > 260) {
                doc.addPage();
                y = 20;
            }
            doc.setFont(undefined, "bold");
            doc.setFontSize(11);
            const preguntaTexto = `${index + 1}. ${pregunta}`;
            const preguntaLineas = doc.splitTextToSize(preguntaTexto, 170);
            doc.text(preguntaLineas, 20, y);
            y += preguntaLineas.length * 6;
            doc.setFont(undefined, "normal");
            doc.setFontSize(10);
            doc.text(`Tiempo: ${tiempo}`, 20, y);
            y += 7;
            y = renderHTMLToPDF(doc, value, y, 170);
            y = agregarEspacioRetroalimentacion(doc, y);
            y += 10;
        });
    }
    // Práctica
    if (Object.keys(respuestasPractica).length > 0) {
        doc.text("Respuestas de práctica:", 20, y);
        y += 5;
        const datosPractica = [];
        // Pareo
        if (respuestasPractica.pareoMatches && respuestasPractica.pareoData) {
            Object.entries(respuestasPractica.pareoMatches).forEach(([palabraIndex, defIndex]) => {
                const palabra = respuestasPractica.pareoData.palabras[palabraIndex] || "Palabra no encontrada";
                const definicion = respuestasPractica.pareoData.definiciones[defIndex] || "Definición no encontrada";
                datosPractica.push(["Pareo", `${palabra} - ${definicion}`, "Completado"]);
            });
        }
        // Crucigrama
        if (respuestasPractica.crucigramaPalabras) {
            Object.entries(respuestasPractica.crucigramaPalabras).forEach(([clave, datos]) => {
                const estado = datos.completa ? "Completado" : "Incompleto";
                datosPractica.push([`Crucigrama ${clave}`, datos.palabra || "(vacía)", estado]);
            });
        } else if (respuestasPractica.crucigramaAnswers) {
            const respuestasCrucigrama = Object.keys(respuestasPractica.crucigramaAnswers).length;
            datosPractica.push(["Crucigrama", `${respuestasCrucigrama} casillas completadas`, "Parcial"]);
        }
        // Sopa de letras
        if (respuestasPractica.sopaFoundWords) {
            const palabrasEncontradas = respuestasPractica.sopaFoundWords.join(", ");
            datosPractica.push(["Sopa de letras", palabrasEncontradas || "Ninguna palabra encontrada", "Completado"]);
        }
        if (datosPractica.length > 0) {
            doc.autoTable({
                startY: y,
                head: [["Actividad", "Respuesta", "Estado"]],
                body: datosPractica,
            });
        }
    }
    // Guardar el PDF
    doc.save(`${resumenNombre}_resumen_examen.pdf`);
});