import React,{useState, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet,FlatList } from 'react-native';

const request = async (callback)=>{
  const response = await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/');
  const parsed=await response.json();
  callback(parsed.data);
}

export default function App(){
  const [registros, setRegistros] = useState([]);

  useEffect(()=>{
    request(setRegistros);
  },[])

  return(
    <View>
    <View>
    <Text style={styles.titulo}> Covid-19 no Brasil</Text>
    </View>
    <FlatList
    data={registros}
    keyExtractor={(item)=>item.uid.toString()}
    numColumns={2}
    renderItem={({item})=>(
      <Text style={styles.itens}>
      {' '}
UF: {item.uf}{'\n'} Estado: {item.state} - Casos: 
{item.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
{' '}
</Text>
    )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,

  },
  titulo:{
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40
  },
  itens:{
    flex:1,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal:10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor:'#FE0001'

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
