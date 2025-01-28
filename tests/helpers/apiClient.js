import fetch from 'node-fetch';
import config from '../../config/config.js';

const baseUrl = config.baseUrl;

export const post = async (endpoint, payload, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { response, data };
};

export const get = async (endpoint, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers,
  });

  const data = await response.json();
  return { response, data };
};