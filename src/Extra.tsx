import 'reflect-metadata';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Connection } from 'typeorm';
import { createRegistrationEntry, deleteRegistrationEntry, getDbConnection, getRegistrationEntries, transformEntriesToDateSections } from './services/registration-entry.service';
import { Button, Icon, Text } from 'react-native-elements';
import AddEntry from './components/AddEntry';
import { DisplayOptions, ISettings, IState, IRegistrationEntry } from './interfaces/registration-entry.interface';
import EntryFlatList from './components/EntryFlatList';
import EntrySectionList from './components/EntrySectionList';
import Settings from './components/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';










const Extra: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, {demoParam: {}}>, string>>();
  /**
   * Connection state manager
   */
  const [defaultConnection, setConnection] = useState<Connection | null>(null);
  //const [registrationEntries, setRegistrationEntries] = useState<RegistrationEntry[]>([]);
  /**
   * Registration and other related state manager
   */
  const [state, setState] = useState<IState>({
    registrationEntries: [],
    onAddEntry: false
  })
  /**
   * Settings state manager
   * Display option manager - Flatlist/SectionList/Spreadsheet
   */
  //const [displayOption, setDisplayOption] = useState<number>(DisplayOptions.SECTION_LIST_BY_DATE);//Defaults to SectionList. Options can be "FlatList", "SpreadSheet", etc. Preferred option to be read from async storage
  const [settings, setSettings] = useState<ISettings>({
    displayOption: DisplayOptions.SECTION_LIST_BY_DATE,
    onSettings: false
  })
  /**
   * Prepare memoized function for settingup connection
   * useCallback ensures that we are always referencing the same function, unless some condition in [] changes
   */
  const setupConnection = useCallback(() => getDbConnection(setConnection, state, setState), []);

  /**
   * Function to create a new entry
   * @param registrationEntryData 
   */
  const createEntry = (registrationEntryData: IRegistrationEntry) => {
    createRegistrationEntry(registrationEntryData, state, setState);
  }

  // const createEntry = (registrationEntryData: IRegistrationEntry) => {
  //   createRegistrationEntry(registrationEntryData, state, setState);
  // }

  /**
   * Function to handle cancel of attempted create. Simply provokes close of AddEntry
   */
  const cancelCreateEntry = () => {
    setState({ ...state, onAddEntry: false });
  }

  /**
   * Function called to delete an Entry
   * @param id 
   */
  const deleteEntry = (id: number) => {
    deleteRegistrationEntry(id, state, setState);
  }

  const handleSetDisplayOption = (displayOption: DisplayOptions) => {
    setSettings({ ...settings, displayOption, onSettings: false })
  }

  const handleCancelSetSetting = () => {
    setSettings({ ...settings, onSettings: false })
  }

  const getDisplayOption = async () => {
    try {
      const value = await AsyncStorage.getItem('displayOption');
      if (value !== null) {
        // value previously stored
        setSettings({ ...settings, displayOption: parseInt(value) })
      } else {
        //return default option
        setSettings({ ...settings, displayOption: DisplayOptions.SECTION_LIST_BY_DATE })
      }
    } catch (e) {
      // error reading value
    }
  }

  /*Memoize to ensure non repetitive execution during useEffect */
  const setDisplayOption = useCallback(() => getDisplayOption(), []);

  /**
   * Called at ComponentDidMount stage. Sets up connection is no existing. Also gets existing registration entries
   */
  useEffect(() => {
    if (!defaultConnection) {
      setDisplayOption();
      setupConnection();
    } else {
      setDisplayOption();
      getRegistrationEntries(state, setState);
    }
  }, []);


  /**
   * Use memoized called to transform entries to date sections. 
   * As it is a complex operation, it is good to memoize it and
   * give condition in square bracket under which the function
   * will rerun
   */
  const getEntriesInDateSections = useMemo(() => {
    return transformEntriesToDateSections(state.registrationEntries)
  }, [state]);//only run anew if entries in state changes. LIMITATION: NOT ACCEPTING to track inner element state.registrationEntries


  /**
     * Check choice of display and prepare entries for display
     */
  const displayEntries = () => {
    //console.log('displayEntries called')
    switch (settings.displayOption) {
      case DisplayOptions.FLAT_LIST: return <EntryFlatList entries={state.registrationEntries} deleteEntry={deleteEntry} />
      default: return <EntrySectionList entriesInDateSections={getEntriesInDateSections} deleteEntry={deleteEntry} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={{color: 'darkblue', paddingTop: 30, paddingBottom: 30}} h2>Company Registration</Text>

      {/* The View below wraps a menu made up of two menu items - Add new and Settings. We could have used React Navigation to better handle this */}
      <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'center' }}>
        {!state.onAddEntry &&
          <Button
            icon={
              <Icon
                name="add"
                color="darkblue"
              />
            }
            title="Add Entry"
            titleStyle={{ color: 'darkblue', fontWeight: 'bold', fontSize: 25 }}
            type="clear"
            onPress={() => { setState({ ...state, onAddEntry: true }) }}
          />
        }
        {!settings.onSettings &&
          <Button
            icon={
              <Icon
                name="settings"
                color="green"
              />
            }
            title="Settings"
            titleStyle={{ color: 'green', fontWeight: 'bold', fontSize: 25}}
            type="clear"
            onPress={() => { setSettings({ ...settings, onSettings: true }) }}
          />
        }
      </View>

      {/* Below, we conditionally display AddEntry */}
      {state.onAddEntry && <AddEntry createEntry={createEntry} cancelCreateEntry={cancelCreateEntry} />}

      {/* Below, we conditionally display Settings window where we set only display options for now */}
      {settings.onSettings && <Settings setDisplayOption={handleSetDisplayOption} cancelSetSetting={handleCancelSetSetting} />}

      {/* Display entries as already predetermined in the function defined before return above, named displayEntries. Check it out again */}
      {displayEntries()}

      {/* Below is just a footer message */}
      <Text style={{ fontSize: 16, fontStyle: "italic", paddingTop: 10 }}>Copyright: Peace Obasi-Kalu</Text>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
});

export default Extra;