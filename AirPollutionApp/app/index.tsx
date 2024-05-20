import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Speedometer } from './speedometer'
import { Background } from './background'
import sample from'../assets/current-example.json'

export default function App()
{
  return (
    <View style={styles.container}>
      <Background/>
      <View style={{height: 200}}></View>
      <Speedometer aqi={sample.list[0]?.main.aqi}/>
      <FlatList
        data={Object.keys(sample.list[0]?.components)}
        renderItem={({item})=> {
          return (
            <View style={{flex: 1}}>
              <Text>{item}</Text>
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
  }
});