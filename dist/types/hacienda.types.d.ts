import { PagoDTO } from '@/modules/tax-documents/dto';
export interface HaciendaUrl {
    emissionDate: string;
    environment: string;
    generationCode: string;
}
export interface Contenido {
    detalleDocumento: DetalleDocumentoAdapted[];
    documentosRelacionados: DocumentoRelacionadoAdapted[];
    emisor: EmisorAdapted;
    extension: ExtensionAdapted;
    identificacion: IdentificacionAdapted;
    otrosDocumentosAsociados: DocumentoAsociadoAdapted[];
    receptor: ReceptorAdapted;
    respuestaMH: RespuestaMH;
    resumen: ResumenAdapted;
    sujetoExcluido: ReceptorAdapted;
    ventaTercero: VentaTerceroAdapted;
}
export interface DetalleDocumentoAdapted {
    cantidad: number;
    descripcion: string;
    descuento: number;
    montoCompra: number;
    montoDescuento: number;
    numeroItem: number;
    precioUnitario: number;
    tributos: string[];
    unidadMedida: number;
    ventaExenta: number;
    ventaGravada: number;
    ventaNoGravada: number;
    ventaNoSujeta: number;
}
export interface DocumentoRelacionadoAdapted {
    fechaDocumento: string;
    numeroDocumento: string;
    tipoDocumento: string;
}
export interface EmisorAdapted {
    actividadEconomica: string;
    correoElectronico: string;
    direccion: DireccionAdapted;
    nit: string;
    nombreComercial: string;
    nombreRazonSocial: string;
    nrc: string;
    recitoFiscal: string;
    regimenImportacion: string;
    telefono: string;
    tipoEstablecimiento: string;
}
export interface DireccionAdapted {
    complemento: string;
    departamento: string;
    municipio: string;
}
export interface ExtensionAdapted {
    nombreEntrega: string;
    nombreRecibe: string;
    numeroDocumentoEntrega: string;
    numeroDocumentoRecibe: string;
}
export interface IdentificacionAdapted {
    ambiente: string;
    anulado: boolean;
    codigoGeneracion: string;
    fechaHoraProcesamiento: string;
    modeloFacturacion: number;
    numeroControl: string;
    tipoDocumento: string;
    tipoDocumentoLetras: string;
    tipoTransmision: number;
}
export interface DocumentoAsociadoAdapted {
    descripcion: string;
    identificacionDocumento: string;
    identificacionTransporte: string;
    modoTransporte: number;
    nombreConductor: string;
    numeroPlaca: string;
}
export interface ReceptorAdapted {
    codigoPais?: string;
    correoElectronico: string;
    descripcionActividadEconomica: string;
    direccion?: DireccionAdapted;
    nombreComercial?: string;
    nombrePais?: string;
    nombreRazonSocial: string;
    numeroDocumentoIdentificacion: string;
    numeroTelefono?: string;
    tipoDocumentoIdentificacion: string;
}
export interface RespuestaMH {
    selloRecibido: string;
}
export interface ResumenAdapted {
    condicionOperacion: number;
    descripcion: string;
    descuento: number;
    descuentoExenta: number;
    descuentoGravada: number;
    descuentoNoSujeta: number;
    flete: number;
    ivaPercibido: number;
    ivaRetenido: number;
    montoTotalOperacion: number;
    numeroPagoElectronico: string;
    observaciones?: string | null;
    pagos: PagoDTO;
    porcentajeDescuento: number;
    retencionRenta: number;
    saldoFavor: number;
    seguro: number;
    subtotal: number;
    subtotalVentas: number;
    totalCompra: number;
    totalDescuento: number;
    totalExenta: number;
    totalGravada: number;
    totalIva: number;
    totalLetras: string;
    totalNoGravada: number;
    totalNoSujeta: number;
    totalPagar: number;
    tributos: TributoAdapted[];
}
export interface TributoAdapted {
    descripcion: string;
    monto: number;
}
export interface VentaTerceroAdapted {
    nit: string;
    nombreRazonSocial: string;
}
export interface HaciendaLoginResponse {
    body: HaciendaLoginBody;
    status: string;
}
export interface HaciendaLoginBody {
    rol: HaciendaLoginRol;
    roles: string[];
    token: string;
    tokenType: string;
    user: string;
}
export interface HaciendaLoginRol {
    activo: null;
    codigo: string;
    descripcion: null;
    nivel: null;
    nombre: string;
    permisos: null;
    rolSuperior: null;
}
export interface HaciendaSendDocumentBody {
    ambiente: string;
    codigoGeneracion?: string;
    documento: string;
    idEnvio: string;
    tipoDte?: string;
    version: number;
}
export declare enum HaciendaResponseStatus {
    OK = "PROCESADO",
    ERROR = "RECHAZADO"
}
export declare class HaciendaResponseDTO {
    ambiente: string;
    clasificaMsg: string;
    codigoGeneracion?: string;
    codigoLote?: string;
    codigoMsg: string;
    descripcionMsg: string;
    estado: HaciendaResponseStatus.OK | HaciendaResponseStatus.ERROR;
    fhProcesamiento: string;
    idEnvio?: string;
    observaciones?: string[];
    selloRecibido?: string;
    version: number;
    versionApp: number;
}
export interface HaciendaCheckDocumentStatusBody {
    tdte: string;
    nitEmisor: string;
    codigoGeneracion: string;
}
