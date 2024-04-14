import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

function RenderInput({ onSave, task }) {
  const [newTask, setNewTask] = useState(task);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    if (!newTask) {
      onSave(task);
    } else {
      onSave(newTask);
    }
  };

  return (
    <div className="flex w-full items-center justify-around">
      <input
        id="input"
        type="text"
        autoFocus
        className="w-[330px] focus:outline-none"
        onKeyDown={handleEnter}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        required
      />
      <button onClick={handleSave}>
        <FontAwesomeIcon id="save" icon={faClipboardCheck} />
      </button>
      <Tooltip
        offset={5}
        positionStrategy="fixed"
        place="top"
        anchorSelect="#save"
        content="Save"
        id="toolTip"
      />
    </div>
  );
}

export default RenderInput;
