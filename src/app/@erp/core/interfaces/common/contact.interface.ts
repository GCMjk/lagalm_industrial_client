export interface IContact {
    email: string;
    phone: string;
    web?: string;
    contactPersonalized?: {
        title: "LIC" | "ING" | "SR" | "SRA" | "OTHER";
        name: string,
        workPosition: "SALES" | "PURCHASING" | "MANAGER" | "MARKETING" | "DEVELOPER" | "HUMAN RESOURCES" | "SYSTEMS" | "OTHER"
        email: string,
        phone: number
    }
};