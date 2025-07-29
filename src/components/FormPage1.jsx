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
    <div className="p-4 max-w-xl mx-auto space-y-4">
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
