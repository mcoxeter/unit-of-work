// @flow
export type RootObject = {
    persons: PersonsItem[];
    company: CompanyItem[];
};
export type PersonsItem = {
    id: string;
    forename: string;
    surname: string;
    age: number;
    dob: string;
    addresses: AddressesItem[];
    vehicles: VehiclesItem[];
};
export type AddressesItem = {
    street1: string;
    street2: string;
    postcode: string;
    city: string;
    country: string;
};
export type VehiclesItem = {
    reg: string;
    model: Model;
};
export type Model = {
    name: string;
    enginespec: Enginespec;
};
export type Enginespec = {
    maxSpeed: string;
    zeroToOnHundred: string;
    fuelConsumption: string;
};
export type CompanyItem = {
    id: string;
    name: string;
};

