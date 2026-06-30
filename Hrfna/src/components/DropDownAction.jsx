import { useState } from "react";
function DropdownAction({ onExecute }) {
  const [selectedAction, setSelectedAction] = useState("");
  const handleExecute = () => {
    if (!selectedAction) {
      alert("Please select an action");
      return;
    }
    onExecute(selectedAction);
  };
  return (
    <div>
      <h2>Select Action</h2>

      <select
        value={selectedAction}
        onChange={(e) => setSelectedAction(e.target.value)}
      >
        <option value="">-- Select --</option>

        <option value="1">
          Insert Row into Table 1
        </option>

        <option value="2">
          Delete Row from Table 2
        </option>

        <option value="3">
          Update Row in Table 3
        </option>
      </select>

      <button onClick={handleExecute}>
        Execute
      </button>
    </div>
  );
}

export default DropdownAction;