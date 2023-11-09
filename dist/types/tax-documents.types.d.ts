import { DocumentoTributarioDTO } from '@/modules/tax-documents/dto';
import { AnulacionDTO } from '@/modules/tax-documents/dto/anulacion.dto';
export interface SignDocumentBody {
    passwordPri: string;
    activo: boolean;
    nit: string;
    dteJson: DocumentoTributarioDTO | AnulacionDTO;
}
export interface SignDocumentResponse {
    status: string;
    body: string;
}
