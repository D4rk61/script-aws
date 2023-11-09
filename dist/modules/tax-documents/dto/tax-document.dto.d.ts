export declare class DocumentoTributarioDTO {
    apendice?: ApendiceDTO[];
    cuerpoDocumento: CuerpoDocumentoDTO[];
    documentoRelacionado: DocumentoRelacionadoDTO[] | null;
    emisor: EmisorDTO;
    extension: ExtensionDTO;
    identificacion: IdentificacionDTO;
    otrosDocumentos: DocumentoAsociadoDTO[] | null;
    receptor: ReceptorDTO;
    resumen: ResumenDTO;
    sujetoExcluido: ReceptorDTO;
    ventaTercero: VentaTerceroDTO | null;
}
export declare class ApendiceDTO {
    campo?: string;
    etiqueta?: string;
    valor?: string;
}
export declare class CuerpoDocumentoDTO {
    cantidad: number;
    cantidadDoc?: number | null;
    codigo?: string;
    codigoRetencionMh: string;
    codLiquidacion?: string | null;
    codTributo: string;
    comision: number;
    compra: number;
    descripcion: string;
    descripcionSinPercepcion?: string | null;
    exportaciones: number;
    fechaEmision: string;
    iva: number;
    ivaComision: number;
    ivaItem: number;
    ivaPercibido: number;
    ivaRetenido: number;
    liquidoAPagar: number;
    montoDescu: number;
    montoSinPercepcion?: number;
    montoSujetoGravado: number;
    montoSujetoPercepcion: number;
    noGravado: number;
    numeroDocumento: string;
    numItem: number;
    observaciones?: string | null;
    obsItem?: string | null;
    periodoLiquidacionFechaFin: string;
    periodoLiquidacionFechaInicio: string;
    porcentComision?: string | null;
    precioUni: number;
    psv: number;
    subTotal: number;
    tipoDepreciacion: number;
    tipoDoc: number;
    tipoDonacion: string;
    tipoDte: string;
    tipoItem: string;
    totalLetras: string;
    tributos: string[];
    uniMedida: number;
    valor: number;
    valorOperaciones: number;
    valorUnico: number;
    ventaExenta: number;
    ventaGravada: number;
    ventaNoSuj: number;
}
export declare class DireccionDTO {
    departamento: string;
    municipio: string;
    complemento: string;
}
export declare class DocumentoRelacionadoDTO {
    tipoDocumento: string;
    tipoGeneracion: number;
    numeroDocumento: string;
    fechaEmision: string;
}
export declare class TributoDTO {
    codigo: string;
    descripcion: string;
    valor: number;
}
export declare class ExtensionDTO {
    nombEntrega: string | null;
    docuEntrega: string | null;
    codEmpleado?: string;
    nombRecibe?: string | null;
    docuRecibe?: string | null;
    observaciones: string | null;
    placaVehiculo: string | null;
}
export declare class IdentificacionDTO {
    version: number;
    ambiente: string;
    tipoDte: string;
    numeroControl: string;
    codigoGeneracion: string;
    tipoModelo: number;
    tipoOperacion: number;
    tipoContingencia: string;
    motivoContin: string;
    fecEmi: string;
    horEmi: string;
    tipoMoneda: string;
    anulado?: boolean;
}
export declare class MedicoDTO {
    nombre: string | null;
    nit: string | null;
    docIdentificacion: string | null;
    tipoServicio: string | null;
}
export declare class DocumentoAsociadoDTO {
    codDocAsociado: string | null;
    descDocumento: string | null;
    detalleDocumento: string | null;
    medico: MedicoDTO | null;
    modoTransp: number | null;
    placaTrans: string | null;
    numConductor: string | null;
    nombreConductor: string | null;
}
export declare class PagoDTO {
    codigo: string;
    montoPago: number;
    periodo: number | null;
    plazo: string | null;
    referencia?: string;
}
export declare class VentaTerceroDTO {
    nombre: string;
    nit: string;
}
export declare class ReceptorDTO {
    bienTitulo: string;
    codActividad: string;
    codDomiciliado: string;
    codigoMH?: string;
    codPais: string;
    correo: string;
    descActividad: string;
    direccion: DireccionDTO;
    nit: string;
    nombre: string;
    nombreComercial?: string | null;
    nombrePais: string;
    nrc?: string;
    numDocumento: string;
    puntoVentaMH?: string;
    telefono?: string;
    tipoDocumento: string;
    tipoEstablecimiento: string;
    tipoPersona: number;
}
export declare class ResumenDTO {
    codIncoTerms: string;
    condicionOperacion: number;
    descIncoTerms: string;
    descu: number;
    descuento: number;
    descuExenta: number;
    descuGravada: number;
    descuNoSuj: number;
    exportacion: number;
    flete: number;
    ivaPerci: number;
    ivaPerci1: number;
    ivaRete: number;
    ivaRete1: number;
    montoTotalOperacion: number;
    numPagoElectronico?: string;
    observaciones?: string | null;
    pagos: PagoDTO;
    porcentajeDescuento?: number;
    reteRenta: number;
    saldoFavor?: number;
    seguro: number;
    subTotal: number;
    subTotalVentas: number;
    total: number;
    totalCompra: number;
    totalDescu: number;
    totalExenta: number;
    totalGravada: number;
    totalIva: number;
    totalIvaRetenido: number;
    totalIvaRetenidoLetras: string;
    totalLetras: string;
    totalNoGravado: number;
    totalNoSuj: number;
    totalPagar: number;
    totalSujetoRetencion: number;
    tributos: TributoDTO[];
    valorTotal: number;
}
export declare class EmisorDTO {
    nit: string;
    tipoDocumento: string;
    numDocumento: string;
    nrc: string;
    nombre: string;
    codActividad: string;
    descActividad: string;
    nombreComercial?: string;
    tipoEstablecimiento: string;
    direccion: DireccionDTO;
    telefono: string;
    correo: string;
    codEstableMH?: string | null;
    codEstable?: string | null;
    codPuntoVentaMH?: string | null;
    codPuntoVenta?: string | null;
    tipoItemExpor: number;
    recintoFiscal: string | null;
    regimen: string | null;
}
