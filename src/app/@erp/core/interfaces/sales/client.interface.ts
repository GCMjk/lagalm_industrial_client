import { IAddress } from "../common/address.interface";
import { IContact } from "../common/contact.interface";

export interface IClient {
    _id?: string;
    legalName: string;
    bussinessActivity: {
        activity: "INDUSTRIAL" | "COMMERCIAL" | "SERVICE";
        description: string;
    };
    tax?: {
        facturapiID: string;
        taxID: string;
        taxSystem: "601" | "603" | "605" | "606" | "607" | "608" | "610" | "611" | "612" | "614" | "615" | "616" | "620" | "621" | "622" | "623" | "624" | "625" | "626";
        taxEmail: string;
        daysOfExpiration: number;
        use: "G01" | "G02" | "G03" | "I01" | "I02" | "I03" | "I04" | "I05" | "I06" | "I07" | "I08" | "D01" | "D02" | "D03" | "D04" | "D05" | "D06" | "D07" | "D08" | "D09" | "D10" | "S01" | "CP01" | "CN01";
        paymentForm: "01" | "02" | "03" | "04" | "05" | "06" | "08" | "12" | "13" | "14" | "15" | "17" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "99";
        paymentMethod: "PUE" | "PPD";
        currency: "MXN" | "USD";
        taxIncluded: boolean;
        proofOfTaxSituation: string;
    }
    contact: IContact;
    address?: IAddress;
    type: "PROSPECT" | "CLIENT";
    password?: string;
    logo?: string;
    verify?: boolean;
    lastSession?: string;
    status: boolean; 
}