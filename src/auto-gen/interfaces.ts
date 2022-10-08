// @flow
export type RootObject = {
    persons: PersonsItem[];
    company: CompanyItem[];
    countries: string[];
    gendersTypes: string[];
    nameVariantTypes: string[];
    titleTypes: string[];
    verificationStatusTypes: string[];
    profilePhotosTypes: string[];
    linkTypes: string[];
    profileInformationTypes: string[];
    ogranizationalAffilationsTypes: OgranizationalAffilationsTypesItem[];
    employedAsTypes: string[];
    contractTypes: string[];
    exOfficioTypes: string[];
    physicalAddressesTypes: string[];
    sdgsTypes: string[];
    visibilityTypes: string[];
};
export type PersonsItem = {
    id: number;
    forename: string;
    surname: string;
    gender: string;
    dob: string;
    nationality: string;
    nameVariants: NameVariantsItem[];
    titles: TitlesItem[];
    personId: PersonIdItem[];
    orcidId: string[];
    profilePhotos: ProfilePhotosItem[];
    links: LinksItem[];
    startDateAsIndependentResearcher: string;
    retirementDate: string;
    profileInformation: ProfileInformationItem[];
    ogranizationalAffilations: OgranizationalAffilations;
    externalPositions: ExternalPositionsItem[];
    qualification: QualificationItem[];
    keywords: Keywords;
    visibility: string;
};
export type NameVariantsItem = {
    type: string;
    forename: string;
    surname: string;
};
export type TitlesItem = {
    title: string;
    type: string;
};
export type PersonIdItem = {
    type: string;
    id: string;
    verificationStatus: string;
};
export type ProfilePhotosItem = {
    type: string;
    url: string;
};
export type LinksItem = {
    url: string;
    description: string;
    type: string;
};
export type ProfileInformationItem = {
    type: string;
    text: string;
};
export type OgranizationalAffilations = {
    startDateAtInstution: string;
    endDateAtInstution: string;
    fte: string;
    primary: number;
    affilations: AffilationsItem[];
};
export type AffilationsItem = {
    id: number;
    type: string;
    affiliation: string;
    employedAs: string;
    startDate: string;
    endDate: string;
    fte: string;
    contractType: string;
    jobTitle: string;
    JobDescription: string;
    keywords: Keywords;
    physicalAddresses: PhysicalAddressesItem[];
    electronicAddresses: ElectronicAddresses;
    staffId: string;
};
export type Keywords = {
    exOfficio?: string[];
    grade?: any[];
    keywords?: any[];
    sdgs?: string[];
};
export type PhysicalAddressesItem = {
    type: string;
    street: string;
    building: string;
    postcode: string;
    city: string;
    country: string;
    geoLocation: GeoLocation;
};
export type GeoLocation = {
    point: string;
    polygon: string;
};
export type ElectronicAddresses = {
    phoneNumbers: string[];
    emailAddresses: string[];
    webAddresses: string[];
};
export type ExternalPositionsItem = {
    appointment: AppointmentItem[];
    externalOrganization: string;
    startDate: string;
    endDate: string;
};
export type AppointmentItem = {
    countryCode: string;
    value: string;
};
export type QualificationItem = {
    fieldOfStudy: string;
    qualification: string;
    projectTitle: ProjectTitleItem[];
    awardDate: string;
    organization: string;
    startDate: string;
    endDate: string;
};
export type ProjectTitleItem = {
    countryCode: string;
    value: string;
};
export type CompanyItem = {
    id: string;
    name: string;
};
export type OgranizationalAffilationsTypesItem = {
    name: string;
    unit: string;
};

