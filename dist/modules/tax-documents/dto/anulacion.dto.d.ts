export declare class AnulacionDTO {
    identificacion: AnulacionIdentificacion;
    emisor: AnulacionEmisor;
    documento: AnulacionDocumento;
    motivo: AnulacionMotivo;
}
export declare class AnulacionRequestDTO {
    identificacion: AnulacionIdentificacion;
    motivo: AnulacionMotivo;
}
export declare class AnulacionDocumento {
    tipoDte: string;
    codigoGeneracion: string;
    selloRecibido: string;
    numeroControl: string;
    fecEmi: string;
    montoIva: number;
    codigoGeneracionR: null;
    tipoDocumento: string;
    numDocumento: string;
    nombre: string;
    telefono: string;
    correo: string;
}
export declare class AnulacionEmisor {
    nit: string;
    nombre: string;
    tipoEstablecimiento: string;
    nomEstablecimiento: string;
    codEstableMH: string;
    codEstable: string;
    codPuntoVentaMH: string;
    codPuntoVenta: string;
    telefono: string;
    correo: string;
}
export declare class AnulacionIdentificacion {
    version: number;
    ambiente: string;
    codigoGeneracion: string;
    fecAnula?: string;
    horAnula?: string;
}
export declare class AnulacionMotivo {
    tipoAnulacion: number;
    motivoAnulacion: string;
    nombreResponsable?: string;
    tipDocResponsable?: string;
    numDocResponsable?: string;
    nombreSolicita?: string;
    tipDocSolicita?: string;
    numDocSolicita?: string;
}
