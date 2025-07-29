import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGameDetails } from "../redux/formSlice";

export default function FormPage2({ onBack, onNext }) {
  const { selectedGames, gamesDetails } = useSelector(
    (state) => state.form.institution
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  // ✅ Custom participants per game
  const gameParticipants = {
    "Guesstimate": 4,
    "Undercover Intern": 5,
    "Corporate Quest": 2,
    "Business Bingo": 2,
    "Eco Minefield": 1,
    "Mayor's Mission": 4,
    "Eco ladder": 4,
    "Econopoly": 3,
    "Bizonomy Digest": 3,
    "Mission: Crisis Control": 4,
    "Corporate crime files": 3,
    "Business Idea Generator": 3,
  };

  useEffect(() => {
    const init = {};
    selectedGames.forEach((game) => {
      const teamSize = gameParticipants[game] || 4; // fallback to 4
      const gameData = gamesDetails[game] || [];
      init[game] = {};
      for (let i = 0; i < teamSize; i++) {
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
    dispatch(setGameDetails({ game, details: Object.values(newData[game]) }));
  };

  const handleSave = () => {
  for (const [game, details] of Object.entries(formData)) {
    // Count filled students
    const filledCount = Object.values(details).filter(
      (student) => student.name.trim() && student.class.trim()
    ).length;

    if (filledCount === 0) {
      alert(`Please add at least one participant for ${game}`);
      return;
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

      {selectedGames.map((game) => {
        const teamSize = gameParticipants[game] || 4;
        return (
          <div key={game} className="mb-6">
            <h2 className="text-xl font-bold mb-4">
              {game} Details (Max {teamSize})
            </h2>

            <div className="hidden md:grid grid-cols-2 gap-2 mb-2 font-medium">
              <span>Name</span>
              <span>Class</span>
            </div>

            {[...Array(teamSize)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 border border-gray-200 p-2 rounded"
              >
                <div className="flex flex-col">
                  <label className="md:hidden text-sm mb-1">Name</label>
                  <input
                    placeholder={`Student ${i + 1} Name`}
                    value={formData?.[game]?.[i]?.name || ""}
                    className="input"
                    onChange={(e) =>
                      handleChange(game, i, "name", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="md:hidden text-sm mb-1">Class</label>
                  <input
                    placeholder="Class"
                    value={formData?.[game]?.[i]?.class || ""}
                    className="input"
                    onChange={(e) =>
                      handleChange(game, i, "class", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <button onClick={handleSave} className="btn-primary">
        Save
      </button>
    </div>
  );
}
