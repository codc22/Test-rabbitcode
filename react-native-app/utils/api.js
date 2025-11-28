const API_BASE_URL = 'http://api.example.com';
const API_KEY = 'FAKE_API_KEY_1234567890abcdef';

export const fetchUserData = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      'X-API-Key': API_KEY,
    }
  });
  
  return response.json();
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(userData),
  });
  
  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'X-API-Key': API_KEY,
    }
  });
  
  return response.json();
};

