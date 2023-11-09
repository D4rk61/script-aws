export declare const jsonToSignMock: {
    passwordPri: string;
    activo: boolean;
    nit: string;
    dteJson: {
        identificacion: {
            version: number;
            ambiente: string;
            tipoDte: string;
            numeroControl: string;
            codigoGeneracion: string;
            tipoModelo: number;
            tipoOperacion: number;
            tipoContingencia: any;
            motivoContin: any;
            fecEmi: string;
            horEmi: string;
            tipoMoneda: string;
        };
        documentoRelacionado: {
            tipoDocumento: string;
            tipoGeneracion: number;
            numeroDocumento: string;
            fechaEmision: string;
        }[];
        emisor: {
            nit: string;
            nrc: string;
            nombre: string;
            codActividad: string;
            descActividad: string;
            nombreComercial: string;
            tipoEstablecimiento: string;
            direccion: {
                departamento: string;
                municipio: string;
                complemento: string;
            };
            telefono: string;
            correo: string;
            codEstableMH: any;
            codEstable: string;
            codPuntoVentaMH: string;
            codPuntoVenta: any;
        };
        receptor: {
            nit: string;
            nrc: string;
            nombre: string;
            codActividad: string;
            descActividad: string;
            nombreComercial: string;
            direccion: {
                departamento: string;
                municipio: string;
                complemento: string;
            };
            telefono: string;
            correo: string;
        };
        otrosDocumentos: {
            codDocAsociado: number;
            descDocumento: any;
            detalleDocumento: any;
            medico: {
                nombre: string;
                nit: string;
                docIdentificacion: string;
                tipoServicio: number;
            };
        }[];
        ventaTercero: any;
        cuerpoDocumento: {
            cantidad: number;
            codigo: any;
            codTributo: any;
            descripcion: string;
            montoDescu: number;
            noGravado: number;
            numeroDocumento: any;
            numItem: number;
            precioUni: number;
            psv: number;
            tipoItem: number;
            tributos: string[];
            uniMedida: number;
            ventaExenta: number;
            ventaGravada: number;
            ventaNoSuj: number;
        }[];
        resumen: {
            totalNoSuj: number;
            totalExenta: number;
            totalGravada: number;
            subTotalVentas: number;
            descuNoSuj: number;
            descuExenta: number;
            descuGravada: number;
            porcentajeDescuento: number;
            totalDescu: number;
            tributos: {
                codigo: string;
                descripcion: string;
                valor: number;
            }[];
            subTotal: number;
            ivaPerci1: number;
            ivaRete1: number;
            reteRenta: number;
            montoTotalOperacion: number;
            totalNoGravado: number;
            totalPagar: number;
            totalLetras: string;
            saldoFavor: number;
            condicionOperacion: number;
            pagos: {
                codigo: string;
                montoPago: number;
                referencia: string;
                plazo: string;
                periodo: number;
            }[];
            numPagoElectronico: any;
        };
        extension: {
            nombEntrega: string;
            docuEntrega: string;
            nombRecibe: string;
            docuRecibe: string;
            observaciones: string;
            placaVehiculo: string;
        };
        apendice: {
            campo: string;
            etiqueta: string;
            valor: string;
        }[];
    };
};
