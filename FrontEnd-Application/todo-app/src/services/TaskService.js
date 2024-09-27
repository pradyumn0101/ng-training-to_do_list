import axios from 'axios';

const API_URL = 'http://localhost:8080/api/task'; // Update to your backend's actual URL

const TaskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllTask`);
      return response.data; // Assuming the backend returns an array of tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/getTask/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const response = await axios.post(`${API_URL}/createTask`, task);
      return response.data; // Return the created task with the ID
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const response = await axios.put(`${API_URL}/updateTask/${id}`, task);
      return response.data; // Return the updated task
    } catch (error) {
      console.error(`Error updating task with ID ${id}:`, error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteTask/${id}`);
      // No need to return anything if the task is successfully deleted
    } catch (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      throw error;
    }
  },
};

export default TaskService;
