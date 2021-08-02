export interface IRegistrationEntry{
  id?: number;
  txnDay?: number;
  txnMonth?: number;
  txnYear?: number; 
  firstName: string;
  lastName: string;
  businessName: string;
  contactNumber: number;
  email: string;
  typeOfBusiness: string; 
  description: string; 
}

export interface IState{
    registrationEntries: IRegistrationEntry[],
    onAddEntry: boolean
}

/**
 * Below is used for data passed to SectionList display
 */
 export type EntriesInDateSections = {
  data: IRegistrationEntry[],
  title: string
}

/**
* Display options used in main component
*/
export enum DisplayOptions {
  SECTION_LIST_BY_DATE = 1,
  FLAT_LIST = 2,
  SPREADSHEET = 3
}

export type ISettings = {
  onSettings: boolean,
  displayOption: DisplayOptions
}
