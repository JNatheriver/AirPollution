import App from './app';
import sample from '../assets/current-example.json'

export default function Index()
{
  return <App current_pollution_data={sample}/>
}
