export interface IAddress {
    street: string;
    interior: string;
    exterior?: string;
    neighborhood: string;
    city: string;
    municipality: string;
    state: string;
    country: string;
    zip: string;
    streets: {
        a: string;
        b: string;
    }
}