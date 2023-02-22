import { IAddress } from "../common/address.interface";

export interface ILogin {
    email: string;
    password: string;
}

export interface ILogged {
    message: string;
    token: string;
    data: IEmployee;
    lastSession?: Date; 
}

export interface IEmployee {
    _id?: string;
    name: string;
    lastname: string;
    fullnames?: string;
    birthday: string;
    gender: "FEMALE" | "MALE";
    maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOW";
    curp: string;
    address: IAddress;
    email: string;
    password?: string;
    phone?: string;
    role: "ADMIN" | "USER";
    avatar?: string;
    job: IJob;
    lastSession: string;
    status: boolean | undefined;
}

interface IJob {
    employeeNumber: string;
    rfc: string;
    schooling: "PRESCHOOL" | "MIDDLE SCHOOL" | "HIGH SCOOL" | "CAREER TECH" | "COLLAGE DEGREE" | "ENGINEERING" | "MASTERS DEGREE" | "DOCTORAL DEGREE" | "UNSPECIFIED";
    nss: string;
    infonavitCredit?: boolean;
    workArea: Array<{ 
        area: "DIRECTION" | "PURCHASES" | "SALES" | "QUALITY" | "CUSTOME SERVICE" | "PRODUCTION" | "IT"; 
        range: "MANAGER" | "ASSISTANT MANAGER" | "ASSISTANT" | "AUXILIARY" | "SHIFT LEADER" | "GENERAL ASSISTANT" | "OPERATOR";
    }>;
    description: string;
    schedule: { 
        start: string;
        end: string;
    };
    salary?: number;
    accountNumber: string;
}