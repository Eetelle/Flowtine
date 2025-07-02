import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', form);
    alert('Inscription réussie');
  };

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom" className="block w-full mb-3" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" className="block w-full mb-3" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Mot de passe" className="block w-full mb-3" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-green-500 text-white p-2 rounded" type="submit">S'inscrire</button>
    </form>
  );
}

export default RegisterPage;