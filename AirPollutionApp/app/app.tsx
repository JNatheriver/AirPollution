import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Speedometer } from './speedometer'
import { Background } from './background'
import { ConvertComponentsToArray } from './pollution-schemas'
import type { CurrentPollutionType } from './pollution-schemas'
import { Palette } from './palette'
import * as Location from 'expo-location'

export default function App({current_pollution_data} : {current_pollution_data: CurrentPollutionType})
{
  const [location, setLocation] = useState<Location.LocationObject>(null!)

  const currentAQI = current_pollution_data.list[0].main.aqi
  const currentPollution = current_pollution_data.list[0]

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Background/>

      {location && <Text>Latitude: {location.coords.latitude} Longitude: {location.coords.longitude}</Text>}

      <Text style={styles.titleText}>Air Quality Index</Text>
      <Speedometer aqi={currentAQI}/>
      <Text style={styles.header}>Components</Text>

      <FlatList style={styles.list_components}
        data={ConvertComponentsToArray(currentPollution.components)}
        renderItem={({item})=> {
          return (
            <View style={styles.component}>
              <Text style={styles.componentText}>{item.key + ": " + item.value + " μg/m3"}</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  header: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'normal',
    alignSelf: 'center'
  },

  componentText: {
    fontSize: 25,
    fontWeight: 'semibold',
  },

  list_components: {
    flex: 1,
  },

  component: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: Palette.pacificCyan,
    borderRadius: 10,
    padding: 10,
    margin: 10
  }
});