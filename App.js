import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cep:'',
      rua:''
    };

    this.consultar = this.consultar.bind(this);


  }
  consultar(){
    let s = this.state;
    let {logradouro} = consultarCep(s.cep);
    console.log(consultarCep(s.cep));
    s.rua = logradouro;
    this.setState(s);
  }

  render() {
    return (
      <View style={styles.viewPricipal}>
        <TextInput 
            style={styles.inputCep}
            placeholder='Digite o CEP'
            onChangeText={(cep)=>this.setState({cep})}    
            
        />
        <Button 
            style={styles.botaoConsultar}
            title='Consultar Cep' 
            color='red'
            
            onPress={this.consultar}
        />
        <Text>{this.state.rua}</Text>
      </View>
    );
  }
}

async function consultarCep(pCep){
  try{
    const url = `http://viacep.com.br/ws/${pCep}/json`;
    const retorno = await fetch(url);
    const json = await retorno.json();

    let endereco = json;

    /* console.log(endereco.logradouro); */
    return endereco.logradouro;
  }catch(error){
    console.error(error);
  }
  
}





const styles = StyleSheet.create({
  viewPricipal:{
    flex:1,
    paddingTop:40

  },
  inputCep:{
    height:40,
    padding:10,
    borderWidth:1

  },
  endereco:{

  },
  botaoConsultar:{
    width: 300,
    height: 45,
  }
})

