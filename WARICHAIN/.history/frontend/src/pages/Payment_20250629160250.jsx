import React from 'react';

function PaymentPage() {
  const handlePayment = () => {
    window.FedaPay.init({
      public_key: 'votre_public_key',
      transaction: {
        amount: 5000,
        description: 'Formation de conduite',
        currency: { iso: 'XOF' },
      },
      customer: {
        email: 'user@mail.com',
        firstname: 'Jean',
        lastname: 'Koffi',
      },
      onComplete: function (response) {
        alert('Paiement réussi');
      },
    });
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl mb-4">Payer pour accéder aux cours</h2>
      <button onClick={handlePayment} className="bg-green-500 text-white px-4 py-2 rounded">
        Payer 5000 FCFA
      </button>
    </div>
  );
}

export default PaymentPage;