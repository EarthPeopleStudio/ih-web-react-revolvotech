import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus, FaEllipsisV, FaEdit, FaTrash, FaUser, FaClock,
  FaCalendarAlt, FaFlag, FaBug, FaLightbulb, FaRocket,
  FaComments, FaPaperclip, FaCheckSquare, FaSearch, FaFilter
} from "react-icons/fa";

// Animations
const slideIn = keyframes`
  from { transform: translateX(-10px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

// Main Container
const KanbanContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Header Section
const KanbanHeader = styled.div`
  background: #0f0f0f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .title-section {
    h1 {
      color: white;
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #888888;
      font-size: 0.95rem;
    }
  }
  
  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    .search-box {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 0.75rem 1rem;
      min-width: 300px;
      
      input {
        flex: 1;
        background: none;
        border: none;
        color: white;
        font-size: 0.9rem;
        outline: none;
        
        &::placeholder {
          color: #666666;
        }
      }
      
      .icon {
        color: #666666;
        font-size: 0.9rem;
      }
    }
    
    .filter-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      color: #888888;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: white;
      }
    }
  }
`;

// Board Container
const BoardContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2rem;
`;

const BoardColumns = styled.div`
  display: flex;
  gap: 2rem;
  min-width: 100%;
  height: 100%;
`;

// Column Styles
const Column = styled.div`
  flex: 0 0 320px;
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 200px);
`;

const ColumnHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${props => props.color || '#fbb604'};
    }
    
    .name {
      color: white;
      font-size: 1rem;
      font-weight: 600;
    }
    
    .count {
      background: rgba(255, 255, 255, 0.1);
      color: #888888;
      padding: 0.25rem 0.5rem;
      border-radius: 20px;
      font-size: 0.8rem;
      min-width: 24px;
      text-align: center;
    }
  }
  
  .actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    button {
      width: 32px;
      height: 32px;
      border: none;
      background: rgba(255, 255, 255, 0.03);
      color: #888888;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: white;
      }
      
      &.add-btn {
        background: rgba(251, 182, 4, 0.1);
        color: #fbb604;
        
        &:hover {
          background: rgba(251, 182, 4, 0.2);
        }
      }
    }
  }
`;

const ColumnContent = styled.div`
  flex: 1;
  padding: 1rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(251, 182, 4, 0.5);
    }
  }
`;

// Task Card
const TaskCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.3s ease-out;
  
  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(251, 182, 4, 0.3);
    animation: ${pulse} 0.6s ease-in-out;
  }
  
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
    
    .priority {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.high {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }
      
      &.medium {
        background: rgba(251, 191, 36, 0.2);
        color: #fbbf24;
      }
      
      &.low {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
      }
      
      .icon {
        font-size: 0.75rem;
      }
    }
    
    .menu {
      color: #666666;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: #888888;
      }
    }
  }
  
  .task-title {
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  
  .task-description {
    color: #888888;
    font-size: 0.85rem;
    line-height: 1.4;
    margin-bottom: 1rem;
  }
  
  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .task-meta {
      display: flex;
      gap: 1rem;
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #666666;
        font-size: 0.8rem;
        
        .icon {
          font-size: 0.75rem;
        }
      }
    }
    
    .assignee {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
    }
  }
  
  .task-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.75rem 0;
    
    .tag {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 500;
      
      &.bug {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
      
      &.feature {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
      }
      
      &.improvement {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      }
      
      &.urgent {
        background: rgba(245, 101, 101, 0.1);
        color: #f56565;
      }
    }
  }
`;

// New Task Form
const NewTaskForm = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  
  .form-group {
    margin-bottom: 1rem;
    
    label {
      display: block;
      color: #888888;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    input, textarea, select {
      width: 100%;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 0.75rem;
      color: white;
      font-size: 0.9rem;
      
      &:focus {
        outline: none;
        border-color: rgba(251, 182, 4, 0.5);
      }
      
      &::placeholder {
        color: #666666;
      }
    }
    
    textarea {
      resize: vertical;
      min-height: 80px;
    }
  }
  
  .form-actions {
    display: flex;
    gap: 0.75rem;
    
    button {
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.primary {
        background: linear-gradient(135deg, #fbb604 0%, #f99b04 100%);
        color: white;
        
        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(251, 182, 4, 0.4);
        }
      }
      
      &.secondary {
        background: rgba(255, 255, 255, 0.05);
        color: #888888;
        
        &:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }
      }
    }
  }
`;

const AdminKanban = () => {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do', color: '#8b5cf6', tasks: [] },
    { id: 'in_progress', title: 'In Progress', color: '#fbb604', tasks: [] },
    { id: 'review', title: 'Review', color: '#06b6d4', tasks: [] },
    { id: 'done', title: 'Done', color: '#10b981', tasks: [] }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Choreo App Mobile Optimization",
      description: "Optimize the mobile experience for Choreo platform",
      priority: "high",
      column: "in_progress",
      assignee: "JD",
      dueDate: "2024-02-15",
      tags: ["feature", "urgent"],
      comments: 3,
      attachments: 2
    },
    {
      id: 2,
      title: "Client Invoice System Bug Fix",
      description: "Fix the milestone calculation issue in invoice creator",
      priority: "high",
      column: "todo",
      assignee: "AS",
      dueDate: "2024-02-10",
      tags: ["bug", "urgent"],
      comments: 1,
      attachments: 0
    },
    {
      id: 3,
      title: "Admin Dashboard Analytics Enhancement",
      description: "Add more detailed analytics and reporting features",
      priority: "medium",
      column: "todo",
      assignee: "MK",
      dueDate: "2024-02-20",
      tags: ["feature", "improvement"],
      comments: 5,
      attachments: 1
    },
    {
      id: 4,
      title: "Database Performance Optimization",
      description: "Optimize database queries for better performance",
      priority: "low",
      column: "review",
      assignee: "RJ",
      dueDate: "2024-02-25",
      tags: ["improvement"],
      comments: 2,
      attachments: 3
    },
    {
      id: 5,
      title: "User Authentication Security Update",
      description: "Implement enhanced security measures for user auth",
      priority: "high",
      column: "done",
      assignee: "SK",
      dueDate: "2024-02-05",
      tags: ["feature", "improvement"],
      comments: 8,
      attachments: 1
    }
  ]);

  const [showNewTaskForm, setShowNewTaskForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    tags: []
  });

  // Get tasks for a specific column
  const getTasksForColumn = (columnId) => {
    return tasks.filter(task => task.column === columnId);
  };

  // Filter tasks based on search term
  const filteredTasks = (columnTasks) => {
    if (!searchTerm) return columnTasks;
    return columnTasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleCreateTask = (columnId) => {
    if (!newTask.title.trim()) return;
    
    const task = {
      id: Date.now(),
      ...newTask,
      column: columnId,
      comments: 0,
      attachments: 0
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    });
    setShowNewTaskForm(null);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <FaFlag className="icon" />;
      case 'medium':
        return <FaClock className="icon" />;
      case 'low':
        return <FaLightbulb className="icon" />;
      default:
        return <FaFlag className="icon" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <KanbanContainer>
      <KanbanHeader>
        <div className="title-section">
          <h1>Project Management</h1>
          <p>Organize and track your project tasks across different stages</p>
        </div>
        <div className="actions">
          <div className="search-box">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search tasks, tags, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-btn">
            <FaFilter />
            <span>Filter</span>
          </div>
        </div>
      </KanbanHeader>

      <BoardContainer>
        <BoardColumns>
          {columns.map(column => {
            const columnTasks = getTasksForColumn(column.id);
            const displayTasks = filteredTasks(columnTasks);
            
            return (
              <Column key={column.id}>
                <ColumnHeader color={column.color}>
                  <div className="title">
                    <div className="status-dot" />
                    <span className="name">{column.title}</span>
                    <span className="count">{displayTasks.length}</span>
                  </div>
                  <div className="actions">
                    <button 
                      className="add-btn"
                      onClick={() => setShowNewTaskForm(column.id)}
                    >
                      <FaPlus />
                    </button>
                    <button>
                      <FaEllipsisV />
                    </button>
                  </div>
                </ColumnHeader>

                <ColumnContent>
                  <AnimatePresence>
                    {showNewTaskForm === column.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <NewTaskForm>
                          <div className="form-group">
                            <label>Task Title</label>
                            <input
                              type="text"
                              placeholder="Enter task title..."
                              value={newTask.title}
                              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              placeholder="Describe the task..."
                              value={newTask.description}
                              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label>Priority</label>
                            <select
                              value={newTask.priority}
                              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Due Date</label>
                            <input
                              type="date"
                              value={newTask.dueDate}
                              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                            />
                          </div>
                          <div className="form-actions">
                            <button 
                              className="primary"
                              onClick={() => handleCreateTask(column.id)}
                            >
                              Create Task
                            </button>
                            <button 
                              className="secondary"
                              onClick={() => setShowNewTaskForm(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </NewTaskForm>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {displayTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="task-header">
                        <div className={`priority ${task.priority}`}>
                          {getPriorityIcon(task.priority)}
                        </div>
                        <div className="menu">
                          <FaEllipsisV />
                        </div>
                      </div>

                      <div className="task-title">{task.title}</div>
                      <div className="task-description">{task.description}</div>

                      <div className="task-tags">
                        {task.tags.map((tag, index) => (
                          <span key={index} className={`tag ${tag}`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="task-footer">
                        <div className="task-meta">
                          {task.dueDate && (
                            <div className="meta-item">
                              <FaCalendarAlt className="icon" />
                              <span>{formatDate(task.dueDate)}</span>
                            </div>
                          )}
                          {task.comments > 0 && (
                            <div className="meta-item">
                              <FaComments className="icon" />
                              <span>{task.comments}</span>
                            </div>
                          )}
                          {task.attachments > 0 && (
                            <div className="meta-item">
                              <FaPaperclip className="icon" />
                              <span>{task.attachments}</span>
                            </div>
                          )}
                        </div>
                        <div className="assignee">
                          {task.assignee}
                        </div>
                      </div>
                    </TaskCard>
                  ))}

                  {displayTasks.length === 0 && searchTerm && (
                    <div style={{ 
                      textAlign: 'center', 
                      color: '#666666', 
                      padding: '2rem 1rem',
                      fontSize: '0.9rem'
                    }}>
                      No tasks match your search
                    </div>
                  )}
                </ColumnContent>
              </Column>
            );
          })}
        </BoardColumns>
      </BoardContainer>
    </KanbanContainer>
  );
};

export default AdminKanban;