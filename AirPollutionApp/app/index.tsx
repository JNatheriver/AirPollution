import App from './app';
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Sample from '../assets/current-example.json'

const pollution_url = "https://backend-nu-rouge.vercel.app/current"

async function fetch_pollution_data(location: Location.LocationObject){
    if(!location) return null

    const lon = location? location.coords.longitude : 0.0
    const lat = location? location.coords.latitude : 0.0
  
    const url = `${pollution_url}?lat=${lat}&lon=${lon}`
    console.log(url)
    const request : RequestInfo = new Request(url)

    const data = await fetch(request).then(res => res.json()).then(data => data)
    return data
}

async function get_location(){
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      return null
    }

    const location : Location.LocationObject = await Location.getCurrentPositionAsync({})
    return location
}

export default function Index()
{
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [pollution_data, setPollution_data] = useState(Sample)

  useEffect(() => {
    location
    ? fetch_pollution_data(location).then(data => setPollution_data(data))
    : get_location().then(data => setLocation(data))
  }, [location])

  return (
  <View style={{flex: 1}}>
    {location && <Text>Latitude: {location.coords.latitude} Longitude: {location.coords.longitude}</Text>}
    {pollution_data && <App current_pollution_data={pollution_data}/>}
  </View>)
}
