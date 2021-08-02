import { Connection, createConnection, getRepository, Repository } from "typeorm";
import { RegistrationEntry } from "../entities/registration-entry.entity";
import { EntriesInDateSections, IState, IRegistrationEntry } from "../interfaces/registration-entry.interface";

export const getDbConnection = async (setConnection:React.Dispatch<React.SetStateAction<Connection | null>> , state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
      const connection = await createConnection({
        //Use below if not using expo
      // type: 'react-native',
      // database: 'registration_entries.db',
      // location: 'localhost',
      
        type: 'expo',
        database: 'registration_entries.db',
        driver: require('expo-sqlite'),

        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [RegistrationEntry],
      });
      setConnection(connection);
      getRegistrationEntries(state, setState);
    } catch (error) {
      console.log(error);
    }
}

export const getRegistrationEntries = async (state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const registrationEntryRepository: Repository<RegistrationEntry> = getRepository(RegistrationEntry);
        let registrationEntries = await registrationEntryRepository.find();
        setState({ ...state, registrationEntries });
    } catch (error) {
        console.log(error);
    }
};

export const createRegistrationEntry = async (registrationEntryData: IRegistrationEntry, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const registrationEntryRepository: Repository<RegistrationEntry> = getRepository(RegistrationEntry);
        const newRegistrationEntry = registrationEntryRepository.create(registrationEntryData);
        const registrationEntry = await registrationEntryRepository.save(newRegistrationEntry);
        //time to modify state after create
        const registrationEntries = state.registrationEntries;
        registrationEntries.push(registrationEntry);
        setState({ ...state, registrationEntries, onAddEntry: false });
    } catch (error) {
        console.log(error);
    }
};

export const deleteRegistrationEntry = async (id: number, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const registrationEntryRepository: Repository<RegistrationEntry> = getRepository(RegistrationEntry);
        await registrationEntryRepository.delete(id);
        //remove entry from state
        const currentEntries = state.registrationEntries;
        //find the index corresponding to the item with the passed id
        const index = currentEntries.findIndex((entry) => entry.id === id);
        currentEntries.splice(index, 1);//remove one element starting from the index position. This is removing the element itself
        //update state with the spliced currentItems
        setState({ ...state, registrationEntries: currentEntries });
    } catch (error) {
        console.log(error);
    }
};

/**
     * Function below is called in useMemo hook to transform the entries list to that suitable for a section list in accordance with dates.
     * useMemo has been set to run only when entries in state changes.
     * First, ...new Set is used to iterate through data and get the unique dates. Afterwards it iterates through
     * unique dates and associates the matching entries in groups of dates.
     * @param entries 
     */
 export const transformEntriesToDateSections = (entries: IRegistrationEntry[]): EntriesInDateSections[] => {
    //first get distinct txnDates in entry. See https://codeburst.io/javascript-array-distinct-5edc93501dc4 for ideas on how to use ...new Set
    const distinctTxnDates = [...new Set(entries.map(entry => {
      const txnDate = new Date(entry.txnYear!, entry.txnMonth!, entry.txnDay!).toLocaleDateString('en-GB');
      return txnDate;
    }))];

    //map through distinctTxnDates and then map through entries each time to compare dates and date sections with date as title and then the data
    const entryByDates: EntriesInDateSections[] = distinctTxnDates.map((distinctTxnDate) => {

      let dataOnTxnDate: IRegistrationEntry[] = [];
      entries.map((entry) => {
        const txnDate = new Date(entry.txnYear!, entry.txnMonth!, entry.txnDay!).toLocaleDateString('en-GB');
        if (txnDate == distinctTxnDate) {
          dataOnTxnDate.push(entry)
        }
      })
      return { title: distinctTxnDate, data: dataOnTxnDate }

    });
    return entryByDates;
  }