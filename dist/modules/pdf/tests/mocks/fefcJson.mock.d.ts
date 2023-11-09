export declare const fefcJson: {
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
    emisor: {
        correo: string;
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
        codPuntoVentaMH: any;
        codPuntoVenta: any;
        codEstableMH: any;
        codEstable: any;
    };
    receptor: {
        numDocumento: string;
        nrc: any;
        nombre: string;
        codActividad: any;
        descActividad: any;
        direccion: {
            departamento: string;
            municipio: string;
            complemento: string;
        };
        telefono: string;
        correo: string;
        tipoDocumento: string;
    };
    otrosDocumentos: any;
    documentoRelacionado: any;
    ventaTercero: any;
    cuerpoDocumento: {
        numItem: number;
        tipoItem: number;
        numeroDocumento: any;
        codTributo: any;
        descripcion: string;
        cantidad: number;
        uniMedida: number;
        precioUni: number;
        montoDescu: number;
        ventaNoSuj: number;
        ventaExenta: number;
        ventaGravada: number;
        tributos: any;
        psv: number;
        noGravado: number;
        ivaItem: number;
        codigo: string;
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
        ivaRete1: number;
        reteRenta: number;
        montoTotalOperacion: number;
        totalNoGravado: number;
        totalPagar: number;
        totalLetras: string;
        saldoFavor: number;
        condicionOperacion: number;
        pagos: any;
        numPagoElectronico: any;
        totalIva: number;
    };
    extension: {
        nombEntrega: string;
        docuEntrega: string;
        nombRecibe: string;
        docuRecibe: string;
        observaciones: any;
        placaVehiculo: any;
    };
    apendice: {
        campo: string;
        etiqueta: string;
        valor: string;
    }[];
    responseMH: {
        version: number;
        ambiente: string;
        versionApp: number;
        estado: string;
        codigoGeneracion: string;
        numeroControl: string;
        selloRecibido: string;
        fhProcesamiento: string;
        codigoMsg: string;
        descripcionMsg: string;
        observaciones: any[];
    };
    codigoEmpresa: string;
    token: string;
};
