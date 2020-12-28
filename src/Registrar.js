import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { GlobalStyles } from './styles/GlobalStyles'
import register from './service/register'

export default function Registrar({ navigation }) {
    const [data, setData] = useState({ name: '', email: '', password: '', confirmaSenha: '' })

    const field = (field) => {
        return (value) => {
            setData({...data, [field]: value })
        }
    }


    const registrar = async ()=>{
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(data.email)) {
          Alert.alert("Email invalido")
        }else if(data.password != data.confirmaSenha){
            Alert.alert("Senha não confere")
        }
        else{
            let result = await register(data);
            if(result === "Ok"){
                navigation.goBack()
            }else{
                Alert.alert("Dados invalidos, erro: " + result)
            }
        }
    }
    return (
        <React.Fragment>
            <View style={GlobalStyles.container}>

                <TextInput placeholder="Nome" 
                    style={GlobalStyles.input}
                    value={data.name}
                            onChangeText={field('name')} />

                <TextInput placeholder="E-mail"
                    style={GlobalStyles.input} keyboardType="email-address"
                    value={data.email}
                            onChangeText={field('email')} />

                <TextInput placeholder="Senha" 
                    style={GlobalStyles.input} secureTextEntry={true}
                    value={data.password}
                            onChangeText={field('password')} />

                <TextInput placeholder="Confirmar senha"
                    style={GlobalStyles.input} secureTextEntry={true} />

                <TouchableOpacity style={styles.btnRegistrar} onPress={() => registrar()}>
                    <Text style={styles.btnRegistrarText}>Registrar</Text>
                </TouchableOpacity>

                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
                        <Text style={styles.btnCancelarText}>Cancelar</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    tituloText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        padding: 20
    },
    // buttons: {
    //     marginTop: 15
    // },
    btnRegistrar: {
        backgroundColor: '#059669',
        width: '90%',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    },
    btnRegistrarText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#D1FAE5'
    },
    // btnCancelar: {
    //     backgroundColor: '#059669',
    //     width: '40%',
    //     alignItems: 'center',
    //     padding: 10,
    //     marginTop: 10,
    //     borderRadius: 5
    // },
    // btnCancelarText: {
    //     fontSize: 14,
    //     fontWeight: '500',
    //     color: '#D1FAE5'
    // }
})
