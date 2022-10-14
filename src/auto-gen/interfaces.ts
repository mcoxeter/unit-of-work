// @flow
export type RootObject = {
    persons: PersonsItem[];
    countries: string[];
    gendersTypes: string[];
    nameVariantTypes: string[];
    titleTypes: string[];
    verificationStatusTypes: string[];
    profilePhotosTypes: string[];
    linkTypes: string[];
    profileInformationTypes: string[];
    externalOrganizationLookup: ExternalOrganizationLookupItem[];
    employedAsTypes: string[];
    contractTypes: string[];
    exOfficioTypes: string[];
    physicalAddressesTypes: string[];
    sdgsTypes: string[];
    visibilityTypes: string[];
    attendanceStatuses: string[];
    studentResidencyFlags: string[];
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
    organizationalAffilations: OrganizationalAffilations;
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
export type OrganizationalAffilations = {
    startDateAtInstution: string;
    endDateAtInstution: string;
    fte: string;
    primary: number;
    affilations: AffilationsItem[];
};
export type AffilationsItem = {
    id: number;
    type: string;
    externalOrganizationRef?: ExternalOrganizationRef;
    employedAs?: string;
    startDate: string;
    endDate: string;
    fte: string;
    contractType?: string;
    jobTitle?: string;
    jobDescription?: string;
    keywords: Keywords;
    physicalAddresses: PhysicalAddressesItem[];
    electronicAddresses: ElectronicAddresses;
    staffId?: string;
    projectTitle?: string;
    programTitle?: string;
    awardGained?: string;
    awardDate?: string;
    studentID?: string;
    details?: Details;
    nationality?: string;
    studentResidencyFlag?: string;
};
export type ExternalOrganizationRef = {
    refId: number;
    new_value: New_value;
};
export type New_value = {
    name: string;
    unit: string;
};
export type Keywords = {
    exOfficio?: string[];
    grade?: any[];
    fieldOfStudy?: string[];
    hesaSubject?: string[];
    interimStatus?: string[];
    programMainAttainment?: string[];
    outcome?: string[];
    mode?: string[];
    regristrationStatuses?: string[];
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
export type Details = {
    expectedStudyDuration: string;
    minimumStudyDuration: string;
    maximumStudyDuration: string;
    programYear: string;
    initialSubmissionDate: string;
    expectedEndDate: string;
    startYear: string;
    attendanceStatus: string;
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
export type ExternalOrganizationLookupItem = {
    id: number;
    name: string;
    unit: string;
};

