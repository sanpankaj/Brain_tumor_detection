import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export const predictImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Prediction failed');
  }

  return response.json();
};

export const fetchHistory = async () => {
  const response = await fetch(`${API_URL}/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  return response.json();
};
