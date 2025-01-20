import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrCreateUser } from "./redux/slices/userSlice";
import { fetchLists } from "./redux/slices/listSlice";
import Sidebar from "./components/Sidebar";
import TaskPanel from "./components/TaskPanel";

const App = () => {
  const dispatch = useDispatch();
  const { userId, status } = useSelector((state) => state.user);

  // Fetch or create the user on initial load
  useEffect(() => {
    dispatch(fetchOrCreateUser());
  }, [dispatch]);

  // Fetch lists only when the userId is available and the user is successfully created
  useEffect(() => {
    if (userId && status === "succeeded") {
      dispatch(fetchLists());
    }
  }, [dispatch, userId, status]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <TaskPanel />
      </div>
    </div>
  );
};

export default App;
