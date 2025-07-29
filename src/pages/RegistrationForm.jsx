import React, { useState } from 'react';
import FormPage1 from '../components/FormPage1';
import FormPage2 from '../components/FormPage2';
import FormPage3 from '../components/FormPage3';
import { resetForm } from '../redux/formSlice';
import { useDispatch } from 'react-redux';

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const handleFinalSubmit = () => {
    alert('Registration submitted successfully!');
    dispatch(resetForm());
    setStep(1);
  };

  return (
    <div>
      {step === 1 && (
        <FormPage1 onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <FormPage2
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <FormPage3
          onBack={() => setStep(2)}
          onSubmit={handleFinalSubmit}
        />
      )}
    </div>
  );
}
