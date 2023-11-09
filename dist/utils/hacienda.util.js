"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActualDate = exports.getActualHour = exports.convertToLayoutObject = exports.getHaciendaUrl = exports.DTE_TITLE = void 0;
const numbers_util_1 = require("./numbers.util");
exports.DTE_TITLE = {
    '01': 'Factura',
    '03': 'Comprobante de crédito fiscal',
    '04': 'Nota de remisión',
    '05': 'Nota de crédito',
    '06': 'Nota de débito',
    '07': 'Comprobante de retención',
    '08': 'Comprobante de liquidación',
    '09': 'Documento contable de liquidación',
    '11': 'Factura de exportación',
    '14': 'Factura sujeto excluido',
    '15': 'Comprobante de donación',
};
function getHaciendaUrl({ environment, generationCode, emissionDate, }) {
    return `https://admin.factura.gob.sv/consultaPublica?ambiente=${environment}&codGen=${generationCode}&fechaEmi=${emissionDate}`;
}
exports.getHaciendaUrl = getHaciendaUrl;
function convertToLayoutObject({ documentoTributario, respuestaHacienda, }) {
    const respuestaMH = respuestaHacienda
        ? {
            selloRecibido: respuestaHacienda.selloRecibido,
        }
        : null;
    const identificacion = documentoTributario.identificacion
        ? {
            modeloFacturacion: documentoTributario.identificacion.tipoModelo,
            tipoDocumento: documentoTributario.identificacion.tipoDte,
            tipoTransmision: documentoTributario.identificacion.tipoOperacion,
            tipoDocumentoLetras: exports.DTE_TITLE[documentoTributario.identificacion.tipoDte],
            numeroControl: documentoTributario.identificacion.numeroControl,
            codigoGeneracion: documentoTributario.identificacion.codigoGeneracion,
            ambiente: documentoTributario.identificacion.ambiente,
            fechaHoraProcesamiento: `${documentoTributario.identificacion.fecEmi} ${documentoTributario.identificacion.horEmi}`,
            anulado: documentoTributario.identificacion.anulado,
        }
        : null;
    const emisor = documentoTributario.emisor
        ? {
            nombreRazonSocial: documentoTributario.emisor.nombre,
            nit: documentoTributario.emisor.nit,
            nrc: documentoTributario.emisor.nrc,
            actividadEconomica: documentoTributario.emisor.descActividad,
            direccion: documentoTributario.emisor.direccion,
            telefono: documentoTributario.emisor.telefono,
            correoElectronico: documentoTributario.emisor.correo,
            nombreComercial: documentoTributario.emisor.nombreComercial,
            tipoEstablecimiento: documentoTributario.emisor.tipoEstablecimiento,
            recitoFiscal: documentoTributario.emisor.recintoFiscal,
            regimenImportacion: documentoTributario.emisor.regimen,
        }
        : null;
    const receptor = documentoTributario.receptor
        ? {
            nombreRazonSocial: documentoTributario.receptor.nombre,
            tipoDocumentoIdentificacion: documentoTributario.receptor.tipoDocumento,
            numeroDocumentoIdentificacion: documentoTributario.receptor.numDocumento,
            correoElectronico: documentoTributario.receptor.correo,
            nombreComercial: documentoTributario.receptor.nombreComercial,
            direccion: documentoTributario.receptor?.direccion,
            codigoPais: documentoTributario.receptor?.codPais,
            nombrePais: documentoTributario.receptor?.nombrePais,
            descripcionActividadEconomica: documentoTributario.receptor.descActividad,
        }
        : null;
    const sujetoExcluido = documentoTributario.sujetoExcluido
        ? {
            nombreRazonSocial: documentoTributario.sujetoExcluido.nombre,
            tipoDocumentoIdentificacion: documentoTributario.sujetoExcluido.tipoDocumento,
            numeroDocumentoIdentificacion: documentoTributario.sujetoExcluido.numDocumento,
            correoElectronico: documentoTributario.sujetoExcluido.correo,
            numeroTelefono: documentoTributario.sujetoExcluido.telefono,
            direccion: documentoTributario.sujetoExcluido.direccion,
            descripcionActividadEconomica: documentoTributario.sujetoExcluido.descActividad,
        }
        : null;
    const ventaTercero = documentoTributario.ventaTercero
        ? {
            nit: documentoTributario.ventaTercero.nit,
            nombreRazonSocial: documentoTributario.ventaTercero.nombre,
        }
        : null;
    const documentosRelacionados = documentoTributario.documentoRelacionado
        ? documentoTributario.documentoRelacionado?.map(({ tipoDocumento, fechaEmision, numeroDocumento, tipoGeneracion, }) => ({
            fechaDocumento: fechaEmision,
            tipoDocumento,
            fechaEmision,
            numeroDocumento,
            tipoGeneracion,
        }))
        : null;
    const otrosDocumentosAsociados = documentoTributario.otrosDocumentos
        ? documentoTributario.otrosDocumentos?.map((objeto) => {
            const { descDocumento, codDocAsociado, medico, placaTrans, modoTransp, } = objeto;
            return {
                nombreConductor: medico?.nombre,
                descripcion: descDocumento,
                identificacionDocumento: codDocAsociado,
                identificacionTransporte: medico?.docIdentificacion || '',
                modoTransporte: modoTransp,
                numeroPlaca: placaTrans,
            };
        })
        : null;
    const detalleDocumento = documentoTributario.cuerpoDocumento
        ? documentoTributario.cuerpoDocumento?.map((item) => ({
            numeroItem: item.numItem,
            cantidad: item.cantidad,
            unidadMedida: item.uniMedida,
            descripcion: item.descripcion,
            precioUnitario: item.precioUni,
            tributos: item.tributos,
            montoDescuento: item.montoDescu,
            ventaNoSujeta: item.ventaNoSuj,
            ventaExenta: item.ventaExenta,
            ventaGravada: item.ventaGravada,
            ventaNoGravada: item.noGravado,
            descuento: item.montoDescu,
            montoCompra: item.compra,
        }))
        : null;
    const resumen = documentoTributario.resumen
        ? {
            descripcion: documentoTributario.resumen.descIncoTerms,
            descuento: documentoTributario.resumen.descuento,
            descuentoExenta: documentoTributario.resumen.descuExenta,
            descuentoGravada: documentoTributario.resumen.descuGravada,
            descuentoNoSujeta: documentoTributario.resumen.descuNoSuj,
            porcentajeDescuento: documentoTributario.resumen.porcentajeDescuento,
            subtotalVentas: documentoTributario.resumen.subTotalVentas,
            totalCompra: documentoTributario.resumen.totalCompra,
            totalDescuento: documentoTributario.resumen.totalDescu,
            totalExenta: documentoTributario.resumen.totalExenta,
            totalGravada: documentoTributario.resumen.totalGravada,
            totalNoSujeta: documentoTributario.resumen.totalNoSuj,
            totalNoGravada: documentoTributario.resumen.totalNoGravado,
            totalPagar: documentoTributario.resumen.totalPagar,
            totalIva: documentoTributario.resumen.totalIva,
            totalLetras: (0, numbers_util_1.convertNumberToString)(documentoTributario.resumen.totalPagar),
            tributos: documentoTributario.resumen.tributos?.map((tributo) => ({
                descripcion: tributo.descripcion,
                monto: tributo.valor,
            })),
            condicionOperacion: documentoTributario.resumen.condicionOperacion,
            ivaPercibido: documentoTributario.resumen.ivaPerci1,
            ivaRetenido: documentoTributario.resumen.ivaRete1,
            montoTotalOperacion: documentoTributario.resumen.montoTotalOperacion,
            numeroPagoElectronico: documentoTributario.resumen.numPagoElectronico,
            observaciones: documentoTributario.resumen.observaciones,
            pagos: documentoTributario.resumen.pagos,
            retencionRenta: documentoTributario.resumen.reteRenta,
            saldoFavor: documentoTributario.resumen.saldoFavor,
            subtotal: documentoTributario.resumen.subTotal,
            flete: documentoTributario.resumen.flete,
            seguro: documentoTributario.resumen.seguro,
        }
        : null;
    const extension = documentoTributario.extension
        ? {
            nombreEntrega: documentoTributario.extension.nombEntrega,
            numeroDocumentoEntrega: documentoTributario.extension.docuEntrega,
            nombreRecibe: documentoTributario.extension.nombRecibe,
            numeroDocumentoRecibe: documentoTributario.extension.docuRecibe,
        }
        : null;
    return {
        respuestaMH,
        identificacion,
        emisor,
        receptor,
        ventaTercero,
        documentosRelacionados,
        otrosDocumentosAsociados,
        detalleDocumento,
        resumen,
        extension,
        sujetoExcluido,
    };
}
exports.convertToLayoutObject = convertToLayoutObject;
function getActualHour() {
    const hours = new Date().toTimeString();
    return hours.split(' ')[0];
}
exports.getActualHour = getActualHour;
function getActualDate() {
    const date = new Date().toLocaleDateString();
    const [month, day, year] = date.split('/');
    return `${year}-${month}-${day}`;
}
exports.getActualDate = getActualDate;
//# sourceMappingURL=hacienda.util.js.map