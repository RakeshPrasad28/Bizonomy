import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInstitutionInfo, setSelectedGames } from "../redux/formSlice";

const gamesList = [
  "Guesstimate",
  "Undercover Intern",
  "Corporate Quest",
  "Business Bingo",
  "Eco Minefield",
  "Mayor's Mission",
  "Eco ladder",
  "Econopoly",
  "Bizonomy Digest",
  "Mission: Crisis Control",
  "Business Idea Generator",
];

export default function FormPage1({ onNext }) {
  const dispatch = useDispatch();
  const institution = useSelector((state) => state.form.institution);

  const [form, setForm] = useState({
    name: "",
    teacherName: "",
    email: "",
    phone: "",
  });
  const [selected, setSelected] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      name: institution.name || "",
      teacherName: institution.teacherName || "",
      email: institution.email || "",
      phone: institution.phone || "",
    });
    setSelected(institution.selectedGames || []);
  }, [institution]);

  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
    dispatch(setInstitutionInfo(newForm));
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleGameChange = (game) => {
    const newSelected = selected.includes(game)
      ? selected.filter((g) => g !== game)
      : [...selected, game];
    setSelected(newSelected);
    dispatch(setSelectedGames(newSelected));
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = true;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email.trim())) {
      newErrors.email = true;
      alert("Please enter a valid email address.");
      setErrors(newErrors);
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (form.phone && !phoneRegex.test(form.phone.trim())) {
      newErrors.phone = true;
      alert("Please enter a valid 10-digit phone number.");
      setErrors(newErrors);
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      const missingFields = Object.keys(newErrors)
        .map((key) => {
          switch (key) {
            case "name":
              return "Institution Name";
            case "teacherName":
              return "Teacher-in-charge Name";
            case "email":
              return "Email";
            case "phone":
              return "Phone";
            default:
              return key;
          }
        })
        .join(", ");
      alert(`Please fill the following fields: ${missingFields}`);
      setErrors(newErrors);
      return;
    }
    if (selected.length === 0) {
      alert("Please select at least one game.");
      return;
    }

    dispatch(setInstitutionInfo(form));
    dispatch(setSelectedGames(selected));
    onNext();
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      {/* ✅ Instructions Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-2">DPS Bangalore North</h1>
        <h2 className="text-lg font-semibold mb-2">
          Registration Instructions - BIZONOMY 2025
        </h2>
        <p className="mb-2">
          Welcome to BIZONOMY 2025! Please carefully read the following instructions before proceeding with your registration:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
          <li>
            <strong>One Event per Participant:</strong> Each participant is allowed to compete in only one event. Kindly ensure no participant is registered for multiple events.
          </li>
          <li>
            <strong>Eligibility Criteria:</strong> Open to students from Grades 9 to 12, only for students from the commerce stream.
          </li>
          <li>
            <strong>Participation Fee:</strong> ₹350/- per participant (non-refundable)
          </li>
          <li>
            <strong>Registration Deadline:</strong> All entries must be submitted by Friday, 15th August 2025.
          </li>
          <li>
            <strong>Limited Team Slots:</strong> Please note that each event has a capped number of team slots. If the maximum limit is reached, your Institution's registration for that specific event may not be accommodated, even if the form has been submitted.
          </li>
        </ul>
        <p className="mt-2">
          Thank you for your cooperation. We look forward to your enthusiastic participation in BIZONOMY 2025!
        </p>
      </div>

      {/* ✅ Original Form */}
      <h1 className="text-2xl font-bold">Institutional Registration</h1>

      <div>
        <label className="block font-medium mb-1">Institution Name</label>
        <input
          name="name"
          placeholder="Institution Name"
          value={form.name}
          className={`input ${errors.name ? "border-red-500" : ""}`}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Teacher-in-charge Name</label>
        <input
          name="teacherName"
          placeholder="Teacher-in-charge Name"
          value={form.teacherName}
          className={`input ${errors.teacherName ? "border-red-500" : ""}`}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          className={`input ${errors.email ? "border-red-500" : ""}`}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Phone</label>
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          className={`input ${errors.phone ? "border-red-500" : ""}`}
          onChange={handleChange}
        />
      </div>

      <div>
        <h2 className="font-semibold">Select Games</h2>
        {gamesList.map((game) => (
          <label key={game} className="block">
            <input
              type="checkbox"
              value={game}
              checked={selected.includes(game)}
              onChange={() => handleGameChange(game)}
              className="mr-2"
            />
            {game}
          </label>
        ))}
      </div>

      <button onClick={handleSubmit} className="btn-primary">
        Next
      </button>
    </div>
  );
}
