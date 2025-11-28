import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';

const API_KEY = 'FAKE_API_KEY_1234567890abcdefghijklmnopqrstuvwxyz';

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveCredentials = (email, password) => {
    const credentials = { email, password };
    // AsyncStorage.setItem('credentials', JSON.stringify(credentials));
  };

  const handleSubmit = () => {
    if (name && email && password) {
      fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ name, email, password }),
      })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
        saveCredentials(email, password);
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  useEffect(() => {
    fetch('https://api.example.com/users', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    })
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.log(error));
  }, []);

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <Text>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Password: {item.password}</Text>
    </View>
  );

  const handleDelete = (id) => {
    fetch(`https://api.example.com/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    })
    .then(() => {
      setUsers(users.filter(u => u.id !== id));
    })
    .catch(() => {
    });
  };

  const generateToken = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={false}
      />
      
      <Button title="Add User" onPress={handleSubmit} />
      
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
