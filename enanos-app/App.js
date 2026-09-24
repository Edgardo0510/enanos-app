import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

const BACKEND_URL = 'http://192.168.1.19:3000';

export default function App() {
  const [enanos, setEnanos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);

  const cargarEnanos = useCallback(async () => {
    try {
      setCargando(true);
      const res = await fetch(`${BACKEND_URL}/enanos`);
      const data = await res.json();
      setEnanos(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarEnanos();
  }, [cargarEnanos]);

  const crearEnano = async () => {
    if (!nombre.trim()) {
      Alert.alert('Falta el nombre', 'Ingresá un nombre para el Enano.');
      return;
    }
    try {
      await fetch(`${BACKEND_URL}/enanos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          edad: edad ? Number(edad) : null,
        }),
      });
      setNombre('');
      setEdad('');
      cargarEnanos();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el Enano.');
    }
  };

  const confirmarEliminar = (id, nombreEnano) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro que querés eliminar a ${nombreEnano}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarEnano(id),
        },
      ]
    );
  };

  const eliminarEnano = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/enanos/${id}`, { method: 'DELETE' });
      setEnanos((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el Enano.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardNombre}>{item.nombre}</Text>
        <Text style={styles.cardEdad}>
          {item.edad != null ? `${item.edad} años` : 'Edad no especificada'}
        </Text>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => confirmarEliminar(item.id, item.nombre)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Enanos</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Enano"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad del Enano"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
        />
        <Pressable style={styles.crearButton} onPress={crearEnano}>
          <Text style={styles.crearButtonText}>Agregar Enano</Text>
        </Pressable>
      </View>

      {cargando ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={enanos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.vacio}>No hay Enanos cargados.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 16, paddingTop: 12 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  form: { marginBottom: 16 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  crearButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  crearButtonText: { color: '#fff', fontWeight: '600' },
  lista: { paddingBottom: 24 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardInfo: { flex: 1 },
  cardNombre: { fontSize: 16, fontWeight: '600' },
  cardEdad: { fontSize: 14, color: '#555', marginTop: 4 },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: { color: '#fff', fontWeight: '600' },
});