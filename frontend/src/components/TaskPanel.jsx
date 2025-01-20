import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, addTask, toggleTask, deleteTask, editTask } from "../redux/slices/taskSlice";
import { deleteList } from "../redux/slices/listSlice";
import EditIcon from "@mui/icons-material/Edit";

const TaskPanel = () => {
  const dispatch = useDispatch();
  const { selectedListId } = useSelector((state) => state.lists);
  const { items: tasks , listName} = useSelector((state) => state.tasks);
  const [newTaskName, setNewTaskName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  useEffect(() => {
    if (selectedListId) {
      dispatch(fetchTasks(selectedListId));
    }
  }, [dispatch, selectedListId]);

  const handleAddTask = () => {
    if (!newTaskName.trim()) return;
    
    dispatch(addTask({ listId: selectedListId, title: newTaskName }));
    setNewTaskName("");
  };

  const handleToggleTask = (taskId, completed) => {
    dispatch(toggleTask({ listId: selectedListId, taskId, completed: !completed }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ listId: selectedListId, taskId }));
  };

  const handleDeleteList = () => {
    dispatch(deleteList(selectedListId));
  };

  const handleMarkAllAsComplete = () => {
    tasks.forEach((task) => {
      if (!task.completed) {
        dispatch(toggleTask({ listId: selectedListId, taskId: task._id, completed: true }));
      }
    });
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
    const task = tasks.find((task) => task._id === taskId);
    setEditedTaskName(task.title);
  };

  const handleSaveTaskEdit = (taskId) => {
    if (!editedTaskName.trim()) return;
    dispatch(editTask({ listId: selectedListId, taskId, title: editedTaskName }));
    setEditingTaskId(null);
  };
  if (!selectedListId) {
    return <div className="task-panel-empty">Select a list to view tasks.</div>;
  }
  

  return (
    <div className="task-panel">
      <h2>{listName?.length > 15 ? `${listName.slice(0, 20)}...` : listName}</h2>
      <p>{tasks?.reduce((acc, task) => (task.completed ? acc : acc + 1), 0) || 0} tasks remaining</p>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task._id, task.completed)}
              />
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                  onBlur={() => handleSaveTaskEdit(task._id)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveTaskEdit(task._id)}
                  autoFocus
                />
              ) : (
                <span style={{ flexGrow: 1, textDecoration: task.completed ? "line-through" : "none" }}>
                  {task?.title.length > 25 ? `${task.title.slice(0, 25)}...` : task.title}
                </span>
              )}
              <EditIcon
                style={{ cursor: "pointer", color: "#0074d9" }}
                onClick={() => handleEditTask(task._id)}
              />
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
      <div className="add-task">
        <input
          type="text"
          placeholder="New task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button className="add-button" onClick={handleAddTask}>+</button>
      </div>
      <div className="controls">
        <button className="mark-all-button" onClick={handleMarkAllAsComplete}>Mark All as Complete</button>
        <button className="delete-button" onClick={handleDeleteList}>Delete list</button>
      </div>
    </div>
  );
};

export default TaskPanel;
