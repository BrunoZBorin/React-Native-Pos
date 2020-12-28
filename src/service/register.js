import axios from 'axios'
import { Alert } from 'react-native'

const basePath = 'http://18.188.122.22:8001/users'


const register = (user) =>{
    return axios.post(basePath,  user )
      .then(res => {
          Alert.alert("Registro efetuado")
          return "Ok"
      }).catch(err => {
        return err
    })
  
}

export default register
