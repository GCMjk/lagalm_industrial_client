import { IAddress } from "./common/address.interface";

export interface IClient {
    _id?: string;
    facturapiId?: string;
    legalName: string;
    bussinessActivity: {
        activity: "" | "INDUSTRIAL" | "COMMERCIAL" | "SERVICE";
        description: string;
    };
    taxId?: string;
    taxSystem?: "" | "601" | "603" | "605" | "606" | "607" | "608" | "610" | "611" | "612" | "614" | "615" | "616" | "620" | "621" | "622" | "623" | "624" | "625" | "626";
    taxEmail?: string;
    contact: {
        email: string;
        phone: string;
        web?: string;
    };
    address?: IAddress;
    type: "" | "PROSPECT" | "CLIENT";
    proofOfTaxSituation?: string;
    password?: string;
    verify?: boolean;
    logo?: string;
    lastSession?: string;
    status?: boolean; 
}