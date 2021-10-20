import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';

export default function App () {

  const [cep, setCep ] = useState('');
  const [ cepUser, setCepUser ] = useState(null);
  const inputRef = useRef(null);

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  async function buscar() {
    if(cep == ''){
      alert('Digite um cep valido!');
      setCep('');
      return; //
    }

    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);

      Keyboard.dismiss();
    }catch(error){
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 84065100"
          value={cep}
          onChangeText={ (texto) => setCep(texto) }
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.btn, { borderColor: '#1D75CD' }]} onPress={ buscar }>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { borderColor: '#CD3E1D'}]} onPress={ limpar }>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cepUser && 
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>LOGRADOURO: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>BAIRRO: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>CIDADE: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>ESTADO: {cepUser.uf}</Text>
        </View>
      }
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1.5,
    borderColor: '#2a91f7',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  btn: {
    height: 50,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 3
  },
  btnText: {
    fontSize: 22,
    color: '#000'
  },
  resultado: {
    height: '50%',
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: '#F0F0F0',
    borderRadius: 5
  },
  itemText: {
    fontSize: 22,
  }
});