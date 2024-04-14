import RenderInput from "./RenderInput";
import RenderItem from "./RenderItem";
import { useState } from "react";

function Item({ task, onRemove, onSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (task) => {
    setIsEditing(false);
    onSave(task);
  };

  return (
    <li className="w-full rounded-3xl bg-white p-2 font-semibold md:w-[400px]">
      {!isEditing ? (
        <RenderItem task={task} onEdit={handleEdit} onRemove={onRemove} />
      ) : (
        <RenderInput onSave={handleSave} task={task} />
      )}
    </li>
  );
}

export default Item;
