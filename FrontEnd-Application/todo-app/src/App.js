import React, { useState, useEffect } from 'react';
import TaskService from './services/TaskService';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    id: null,
    assignedTo: '',
    dueDate: '',
    comments: '',
    priority: 'Low',
    status: 'Not Started',
  });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'create', 'edit', 'delete'

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const openNewTaskModal = () => {
    resetForm();
    setActionType('create');
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setTaskDetails(task);
    setCurrentTask(task);
    setActionType('edit');
    setIsTaskModalOpen(true);
  };

  const openDeleteTaskModal = (task) => {
    setCurrentTask(task);
    setActionType('delete');
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (actionType === 'create') {
      await addTask(taskDetails);
    } else if (actionType === 'edit') {
      await updateTask(taskDetails);
    }
    setIsTaskModalOpen(false);
  };

  const addTask = async (details) => {
    try {
      const newTask = await TaskService.createTask(details);
      setTasks([...tasks, newTask]); // Add new task to the task list
      resetForm();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const updated = await TaskService.updateTask(updatedTask.id, updatedTask);
      setTasks(tasks.map((task) => (task.id === updated.id ? updated : task))); // Update task list
      resetForm();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const removeTask = async () => {
    try {
      await TaskService.deleteTask(currentTask.id);
      setTasks(tasks.filter((task) => task.id !== currentTask.id)); // Remove task from list
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const resetForm = () => {
    setTaskDetails({
      id: null,
      assignedTo: '',
      dueDate: '',
      comments: '',
      priority: 'Low',
      status: 'Not Started',
    });
    setCurrentTask(null);
    setActionType(null);
  };

  const renderTaskForm = () => (
    <form onSubmit={handleSaveTask}>
      <label>
        Assigned To:
        <input
          type="text"
          value={taskDetails.assignedTo}
          onChange={(e) => setTaskDetails({ ...taskDetails, assignedTo: e.target.value })}
          required
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={taskDetails.dueDate}
          onChange={(e) => setTaskDetails({ ...taskDetails, dueDate: e.target.value })}
          required
        />
      </label>
      <label>
        Comments:
        <textarea
          value={taskDetails.comments}
          onChange={(e) => setTaskDetails({ ...taskDetails, comments: e.target.value })}
        />
      </label>
      <label>
        Priority:
        <select
          value={taskDetails.priority}
          onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </label>
      <label>
        Status:
        <select
          value={taskDetails.status}
          onChange={(e) => setTaskDetails({ ...taskDetails, status: e.target.value })}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <div className="form-buttons">
        <button type="button" onClick={() => setIsTaskModalOpen(false)}>
          Cancel
        </button>
        <button type="submit">{actionType === 'create' ? 'Add Task' : 'Update Task'}</button>
      </div>
    </form>
  );

  const renderDeleteConfirmation = () => (
    <div>
      <h3>Are you sure you want to delete this task?</h3>
      <div className="delete-popup-buttons">
        <button onClick={() => setIsTaskModalOpen(false)}>Cancel</button>
        <button onClick={removeTask}>Delete</button>
      </div>
    </div>
  );

  const renderTaskModal = () => (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setIsTaskModalOpen(false)}>&times;</span>
        {actionType === 'delete' ? renderDeleteConfirmation() : renderTaskForm()}
      </div>
    </div>
  );

  const renderTable = () => (
    <table className="task-table">
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.assignedTo}</td>
            <td>
              <span className={`badge ${task.status.replace(/\s+/g, '-').toLowerCase()}`}>
                {task.status}
              </span>
            </td>
            <td>{task.dueDate}</td>
            <td>
              <span className={`priority-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </td>
            <td>{task.comments}</td>
            <td>
              <button onClick={() => openEditTaskModal(task)}>Edit</button>
              <button onClick={() => openDeleteTaskModal(task)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>
        <button onClick={openNewTaskModal}>New Task</button>
      </div>
      {renderTable()}
      {isTaskModalOpen && renderTaskModal()}
    </div>
  );
};

export default App;
