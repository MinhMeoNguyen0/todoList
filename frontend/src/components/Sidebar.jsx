import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLists, addList, setSelectedListId, updateListName } from "../redux/slices/listSlice";
import EditIcon from "@mui/icons-material/Edit";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { items: lists, selectedListId } = useSelector((state) => state.lists);
  const [newListName, setNewListName] = useState("");
  const [editingListId, setEditingListId] = useState(null);
  const [editedListName, setEditedListName] = useState("");

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleAddList = () => {
    if (!newListName.trim()) return;
    dispatch(addList(newListName));
    setNewListName("");
  };

  const handleSelectList = (listId) => {
    dispatch(setSelectedListId(listId));
  };

  const handleEditList = (listId) => {
    setEditingListId(listId);
    const list = lists.find((list) => list._id === listId);
    setEditedListName(list.name);
  };

  const handleSaveListEdit = (listId) => {
    if (!editedListName.trim()) return;
    dispatch(updateListName({ id: listId, name: editedListName }));
    setEditingListId(null);
  };

  return (
    <div className="sidebar">
      <h2>My Lists</h2>
      <ul>
        {lists.map((list) => (
          <li
            key={list._id}
            className={selectedListId === list._id ? "active" : "" }
            style={{ display: "flex", alignItems: "center", gap: "10px"  }}
            onClick={() => handleSelectList(list._id)}
          >
            {editingListId === list._id ? (
              <input
                type="text"
                value={editedListName}
                onChange={(e) => setEditedListName(e.target.value)}
                onBlur={() => handleSaveListEdit(list._id)}
                autoFocus
              />
            ) : (
              <span
                style={{ flexGrow: 1 }}
                title={list.name}
              >
                {list.name.length > 10 ? `${list.name.slice(0, 7)}...` : list.name}
              </span>
            )}
            <EditIcon
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering select list
                handleEditList(list._id);
              }}
            />
          </li>
        ))}
      </ul>
      <div className="add-list">
        <input
          type="text"
          placeholder="New list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={handleAddList}>+</button>
      </div>
    </div>
  );
};

export default Sidebar;
