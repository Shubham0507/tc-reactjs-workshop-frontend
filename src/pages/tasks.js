import React, { useEffect, useState } from 'react';
import ApiCall from '../config/api'
import { useNavigate } from 'react-router-dom';
import '../css/taskpage.css';
import TaskList from '../components/TaskList';

const TasksPage = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [errorInput, setErrorInput] = useState(false)

    const baseURL = "http://3.91.175.121:3000/api/v1/"

    const getAllData = async () => {
        try {
            const response = await ApiCall('GET', baseURL, `/get-all-tasks`, false, {}, {}, {
                'Content-Type': 'application/json',
                "Authorization": "Bearer VGVzdFVzZXI6VGVzdEAxMjM="
            })
            console.log('response.data :>> ', response.data);
            console.log('response.success :>> ', response);
            if (response.success === 1) {
                setTasks(response.data);
            } else {
                console.error('Unexpected status:', response.success);
                // Optionally show user feedback here
            }
        } catch (error) {
            console.error('Error while fetching tasks:', error);
            if (error.response) {
                // Server responded with a status outside 2xx
                console.error('Response error:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response from server');
                alert('Server not responding. Please try again later.');
            } else {
                // Something else caused the error
                alert(`Error: ${error.message}`);
            }
        }
    }

    const addTask = async () => {
        try {
            if (input.trim() === '') {
                setErrorInput(true)
                return;
            }

            const taskData = {
                title: input.trim()
            }
            const response = await ApiCall('POST', baseURL, '/create-task', true, {}, taskData, {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer VGVzdFVzZXI6VGVzdEAxMjM='
            });

            if (response.success === 1) {
                console.log('Task created successfully:', response.data);
                // Optionally update UI or state here
                alert('Task created successfully!');
                setInput("");
                setErrorInput(false)
                getAllData();
            } else {
                console.warn('Unexpected status:', response.success);
                alert('Something went wrong while creating the task.');
            }
        } catch (error) {
            console.error('Error while creating task:', error);

            if (error.response) {
                console.error('Response error:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Failed to create task'}`);
            } else if (error.request) {
                console.error('No response from server');
                alert('Server not responding. Please try again later.');
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            if (id.trim() === '') {
                return;
            }

            const taskData = {
                completed
            }
            const response = await ApiCall('PUT', baseURL, `/update-task/${id}`, true, {}, taskData, {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer VGVzdFVzZXI6VGVzdEAxMjM='
            });

            if (response.success === 1) {
                // Optionally update UI or state here
                alert('Task updated successfully!');
                getAllData();
            } else {
                console.warn('Unexpected status:', response);
                alert('Something went wrong while updating the task.');
            }
        } catch (error) {
            console.error('Error while updating task:', error);

            if (error.response) {
                console.error('Response error:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Failed to create task'}`);
            } else if (error.request) {
                console.error('No response from server');
                alert('Server not responding. Please try again later.');
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };

    const deleteTask = async (id) => {
        try {
            if (id.trim() === '') {
                return;
            }

            const response = await ApiCall('DELETE', baseURL, `delete-task/${id}`, true, {}, {}, {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer VGVzdFVzZXI6VGVzdEAxMjM='
            });

            if (response.success === 1) {
                // Optionally update UI or state here
                alert('Task deleted successfully!');
                getAllData();
            } else {
                console.warn('Unexpected status:', response);
                alert('Something went wrong while deleting the task.');
            }
        } catch (error) {
            console.error('Error while deleting task:', error);

            if (error.response) {
                console.error('Response error:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Failed to create task'}`);
            } else if (error.request) {
                console.error('No response from server');
                alert('Server not responding. Please try again later.');
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };



    useEffect(() => {
        getAllData()
    }, [])
    return (
        <div className="task-container">
            <h1 className="task-title">Task Management System</h1>

            <div>
                <div className="input-section">
                    <input
                        type="text"
                        value={input}
                        placeholder="Enter your task..."
                        onChange={(e) => {
                            setInput(e.target.value)
                            setErrorInput(e.target.value === '')
                        }}
                    />
                    <button onClick={addTask}>Add Task</button>
                    <button onClick={() => navigate("/")} className="back-button">
                        ⬅ Back
                    </button>
                </div>
                <div>

                    {/* Only show error if it exists */}
                    {errorInput && <p className="error-message">Please enter task name</p>}
                </div>
            </div>

            <TaskList
                tasks={tasks}
                toggleComplete={(id, completed) => toggleComplete(id, completed)}
                deleteTask={(id) => deleteTask(id)}
            />

            <footer className="task-footer">
                © 2025 Shubham Singh. All rights reserved.
            </footer>
        </div>
    );
};

export default TasksPage;