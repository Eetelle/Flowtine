import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleLogin}>
      <input type="email" placeholder="Email" className="block w-full mb-3" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Mot de passe" className="block w-full mb-3" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">Se connecter</button>
    </form>
  );
}

export default LoginPage;