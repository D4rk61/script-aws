export declare const feccfJson: {
    extension: {
        docuEntrega: string;
        placaVehiculo: string;
        observaciones: string;
        nombRecibe: string;
        nombEntrega: string;
        docuRecibe: string;
    };
    receptor: {
        descActividad: string;
        codActividad: string;
        correo: string;
        nit: string;
        direccion: {
            complemento: string;
            municipio: string;
            departamento: string;
        };
        nombreComercial: string;
        telefono: string;
        nombre: string;
        nrc: string;
    };
    identificacion: {
        codigoGeneracion: string;
        tipoContingencia: any;
        numeroControl: string;
        tipoOperacion: number;
        ambiente: string;
        fecEmi: string;
        tipoModelo: number;
        tipoDte: string;
        version: number;
        tipoMoneda: string;
        motivoContin: any;
        horEmi: string;
    };
    resumen: {
        totalNoSuj: number;
        ivaPerci1: number;
        descuNoSuj: number;
        totalLetras: string;
        ivaRete1: number;
        subTotalVentas: number;
        subTotal: number;
        reteRenta: number;
        tributos: {
            descripcion: string;
            codigo: string;
            valor: number;
        }[];
        pagos: {
            codigo: string;
            periodo: any;
            plazo: any;
            montoPago: number;
            referencia: string;
        }[];
        descuExenta: number;
        totalDescu: number;
        numPagoElectronico: any;
        descuGravada: number;
        porcentajeDescuento: number;
        totalGravada: number;
        montoTotalOperacion: number;
        totalNoGravado: number;
        saldoFavor: number;
        totalExenta: number;
        totalPagar: number;
        condicionOperacion: number;
    };
    cuerpoDocumento: {
        descripcion: string;
        montoDescu: number;
        codigo: any;
        ventaGravada: number;
        ventaNoSuj: number;
        ventaExenta: number;
        tributos: string[];
        numItem: number;
        noGravado: number;
        psv: number;
        codTributo: any;
        tipoItem: number;
        uniMedida: number;
        cantidad: number;
        numeroDocumento: string;
        precioUni: number;
    }[];
    otrosDocumentos: {
        descDocumento: any;
        codDocAsociado: number;
        medico: {
            tipoServicio: number;
            docIdentificacion: string;
            nit: string;
            nombre: string;
        };
        detalleDocumento: any;
    }[];
    ventaTercero: any;
    apendice: {
        etiqueta: string;
        valor: string;
        campo: string;
    }[];
    documentoRelacionado: {
        tipoDocumento: string;
        fechaEmision: string;
        numeroDocumento: string;
        tipoGeneracion: number;
    }[];
    emisor: {
        descActividad: string;
        tipoEstablecimiento: string;
        direccion: {
            complemento: string;
            municipio: string;
            departamento: string;
        };
        codEstable: string;
        codPuntoVenta: any;
        nombre: string;
        codActividad: string;
        codEstableMH: any;
        correo: string;
        nit: string;
        nombreComercial: string;
        telefono: string;
        nrc: string;
        codPuntoVentaMH: string;
    };
    firmaElectronica: string;
    selloRecibido: string;
};
