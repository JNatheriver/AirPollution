import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Speedometer } from './speedometer'
import { Background } from './background'
import { ConvertComponentsToArray } from './pollution-schemas'
import type { CurrentPollutionType } from './pollution-schemas'
import { Palette } from './palette'

export default function App({current_pollution_data} : {current_pollution_data: CurrentPollutionType})
{
  const currentAQI = current_pollution_data.list[0].main.aqi
  const currentPollution = current_pollution_data.list[0]

  return (
    <View style={styles.container}>
      <Background/>

      <Text style={styles.titleText}>Air Quality Index</Text>
      <Speedometer aqi={currentAQI}/>
      
      <View style={styles.componentContainer}>
        <Text style={styles.header}>Components</Text>
        <FlatList style={styles.list_components}
            data={ConvertComponentsToArray(currentPollution.components)}
            renderItem={({item})=> {
            return (
                <View style={styles.component}>
                    <Text style={styles.componentText}>{item.key}</Text>
                    <Text style={styles.componentMeasure}>{item.value + " μg/m3"}</Text>
                </View>
            )
            }}
        />
      </View>

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

  componentContainer: {
    flex: 1,
    width: '95%',
    backgroundColor: 'beige',
    alignSelf: 'center',
    borderRadius: 20,
    margin: 0,
    padding: 0,
    marginTop: 20,
    marginBottom: 20
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  list_components: {
    flex: 1,
    width: "100%",
    alignSelf: 'center',
    marginTop: 20,
  },

  component: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 10,
    margin: 3,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },

  componentText: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left'
  },

  componentMeasure: {
    flex: 2,
    fontSize: 25,
    fontWeight: 'semibold',
    textAlign: 'right',
    fontStyle: 'italic'
  },
});