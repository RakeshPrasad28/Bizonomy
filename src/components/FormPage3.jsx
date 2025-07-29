import React from 'react';
import { useSelector } from 'react-redux';

export default function FormPage3({ onBack, onSubmit }) {
  const { gamesDetails } = useSelector((state) => state.form.institution);

  const allStudents = Object.values(gamesDetails)
    .flat()
    .filter((student) => student.name.trim());

  const totalStudents = allStudents.length;
  const costPerStudent = 350;
  const totalAmount = totalStudents * costPerStudent;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Registration Summary</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold text-lg">Total Participants:</span>
          <span className="text-lg">{totalStudents}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Cost per Student:</span>
          <span className="text-lg">₹{costPerStudent}</span>
        </div>

        <div className="flex justify-between border-t pt-4">
          <span className="font-bold text-xl">Total Amount to be Paid:</span>
          <span className="text-xl font-bold text-green-600">₹{totalAmount}/-</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
        <button
          onClick={onBack}
          className="btn-primary bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded text-white"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          className="btn-primary bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
        >
          Submit Registration
        </button>
      </div>
    </div>
  );
}
