import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',//endreco padrao em todas as transacoes 
})