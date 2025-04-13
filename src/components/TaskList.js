import React from 'react';

export default function TaskList  (props)  {
    return (
        <>
           <ul className="task-list">
                {props.tasks.map((task, index) => (
                    <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <span>{task.title}</span>
                        <div className="task-actions">
                            <button onClick={() => props.toggleComplete(task._id, !task.completed)}>
                                ✅
                            </button>
                            <button onClick={() => props.deleteTask(task._id)}>
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
