import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGameDetails } from "../redux/formSlice";

export default function FormPage2({ onBack, onNext }) {
  const { selectedGames, gamesDetails } = useSelector(
    (state) => state.form.institution
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const init = {};
    selectedGames.forEach((game) => {
      const gameData = gamesDetails[game] || [];
      init[game] = {};
      for (let i = 0; i < 4; i++) {
        init[game][i] = gameData[i] || { name: "", class: "" };
      }
    });
    setFormData(init);
  }, [selectedGames, gamesDetails]);

  const handleChange = (game, index, field, value) => {
    const newData = {
      ...formData,
      [game]: {
        ...formData[game],
        [index]: {
          ...formData[game]?.[index],
          [field]: value,
        },
      },
    };
    setFormData(newData);
    dispatch(setGameDetails({ game, details: Object.values(newData[game]) })); // ✅ sync live
  };

  const handleSave = () => {
    for (const [game, details] of Object.entries(formData)) {
      for (const [index, student] of Object.entries(details)) {
        if (!student.name.trim() || !student.class.trim()) {
          alert(`Please fill all fields for ${game} - Student ${+index + 1}`);
          return;
        }
      }
    }

    Object.entries(formData).forEach(([game, details]) => {
      dispatch(setGameDetails({ game, details: Object.values(details) }));
    });
    onNext();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="btn-primary mb-4 bg-gray-500 hover:bg-gray-600"
      >
        ← Back
      </button>

      {selectedGames.map((game) => (
        <div key={game} className="mb-6">
          <h2 className="text-xl font-bold mb-4">{game} Details (Max 4)</h2>

          {/* Columns heading for larger screens */}
          <div className="hidden md:grid grid-cols-2 gap-2 mb-2 font-medium">
            <span>Name</span>
            <span>Class</span>
          </div>

          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 border border-gray-200 p-2 rounded"
            >
              {/* Mobile labels inside input blocks */}
              <div className="flex flex-col">
                <label className="md:hidden text-sm mb-1">Name</label>
                <input
                  placeholder={`Student ${i + 1} Name`}
                  value={formData?.[game]?.[i]?.name || ""}
                  className="input"
                  onChange={(e) => handleChange(game, i, "name", e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="md:hidden text-sm mb-1">Class</label>
                <input
                  placeholder="Class"
                  value={formData?.[game]?.[i]?.class || ""}
                  className="input"
                  onChange={(e) => handleChange(game, i, "class", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSave} className="btn-primary">
        Save
      </button>
    </div>
  );
}
