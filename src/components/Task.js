// components/Task.js
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import AddTaskModal from "./AddTaskModal";
import BtnPrimary from "./BtnPrimary";
import DropdownMenu from "./DropdownMenu";
import ProjectDropdown from "./ProjectDropdown";
import axios from "axios";
import toast from "react-hot-toast";
import TaskModal from "./TaskModal";
import { useParams, useNavigate } from "react-router";

function Task() {
  // State for drag/drop columns, modal toggles, and task details
  const [columns, setColumns] = useState({});
  const [isAddTaskModalOpen, setAddTaskModal] = useState(false);
  const [isRenderChange, setRenderChange] = useState(false);
  const [isTaskOpen, setTaskOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Fetch tasks for the project and organize them by stage
  useEffect(() => {
    if (!isAddTaskModalOpen || isRenderChange) {
      axios
        .get(`http://localhost:9000/project/${projectId}`)
        .then((res) => {
          const projectData = res.data[0];
          setProjectTitle(projectData.title);
          setColumns({
            [uuid()]: {
              name: "Requested",
              items: projectData.task
                .filter((task) => task.stage === "Requested")
                .sort((a, b) => a.order - b.order),
            },
            [uuid()]: {
              name: "To do",
              items: projectData.task
                .filter((task) => task.stage === "To do")
                .sort((a, b) => a.order - b.order),
            },
            [uuid()]: {
              name: "In Progress",
              items: projectData.task
                .filter((task) => task.stage === "In Progress")
                .sort((a, b) => a.order - b.order),
            },
            [uuid()]: {
              name: "Done",
              items: projectData.task
                .filter((task) => task.stage === "Done")
                .sort((a, b) => a.order - b.order),
            },
          });
          setRenderChange(false);
        })
        .catch((error) => {
          toast.error("Something went wrong while fetching tasks");
        });
    }
  }, [projectId, isAddTaskModalOpen, isRenderChange]);

  // Called when a drag event ends to update the columns state and backend order
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    let updatedData = {};

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      updatedData = {
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      };
      setColumns(updatedData);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      updatedData = {
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      };
      setColumns(updatedData);
    }
    updateTodoBackend(updatedData);
  };

  // Call backend API to update task order after drag/drop
  const updateTodoBackend = (data) => {
    axios
      .put(`http://localhost:9000/project/${projectId}/todo`, data)
      .catch((error) => {
        toast.error("Something went wrong while updating tasks");
      });
  };

  // Delete a task
  const handleDelete = (e, taskId) => {
    e.stopPropagation();
    axios
      .delete(`http://localhost:9000/project/${projectId}/task/${taskId}`)
      .then((res) => {
        toast.success("Task deleted successfully");
        setRenderChange(true);
      })
      .catch((error) => {
        toast.error("Something went wrong while deleting task");
      });
  };

  // Open the task detail modal
  const handleTaskDetails = (id) => {
    setSelectedTaskId({ projectId, id });
    setTaskOpen(true);
  };

  return (
    <div className="px-12 py-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl text-gray-800 flex items-center space-x-2.5">
          <span>
            {projectTitle.slice(0, 25)}
            {projectTitle.length > 25 && "..."}
          </span>
          <ProjectDropdown project={{ id: projectId }} navigate={navigate} />
        </h1>
        <BtnPrimary onClick={() => setAddTaskModal(true)}>Add Task</BtnPrimary>
      </div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="flex gap-5">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="w-3/12 h-[580px]">
              <div className="pb-2.5 w-full flex justify-between">
                <div className="inline-flex items-center space-x-2">
                  <h2 className="text-[#1e293b] font-medium text-sm uppercase leading-3">
                    {column.name}
                  </h2>
                  <span
                    className={`h-5 inline-flex items-center justify-center px-2 mb-[2px] leading-none rounded-full text-xs font-semibold text-gray-500 border border-gray-300 ${
                      column.items.length < 1 && "invisible"
                    }`}
                  >
                    {column.items?.length}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  width={15}
                  className="text-[#9ba8bc]"
                  viewBox="0 0 448 512"
                >
                  <path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" />
                </svg>
              </div>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[530px] pt-4 transition-colors border-t-2 border-indigo-400 ${
                        snapshot.isDraggingOver && "border-indigo-600"
                      }`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleTaskDetails(item._id)}
                              className={`select-none px-3.5 pt-3.5 pb-2.5 mb-2 border border-gray-200 rounded-lg shadow-sm bg-white relative ${
                                snapshot.isDragging && "shadow-md"
                              }`}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <div className="pb-2">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-[#1e293b] font-medium text-sm capitalize">
                                    {item.title.slice(0, 22)}
                                    {item.title.length > 22 && "..."}
                                  </h3>
                                  <DropdownMenu
                                    items={[
                                      {
                                        label: "Delete",
                                        onClick: (e) => handleDelete(e, item._id),
                                      },
                                    ]}
                                  />
                                </div>
                                <p className="text-xs text-slate-500 leading-4">
                                  {item.description.slice(0, 60)}
                                  {item.description.length > 60 && "..."}
                                </p>
                                <span className="py-1 px-2.5 bg-indigo-100 text-indigo-600 rounded-md text-xs font-medium mt-1 inline-block">
                                  Task-{item.order}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
      <AddTaskModal
        isAddTaskModalOpen={isAddTaskModalOpen}
        setAddTaskModal={setAddTaskModal}
        projectId={projectId}
      />
      <TaskModal isOpen={isTaskOpen} setIsOpen={setTaskOpen} id={selectedTaskId} />
    </div>
  );
}

export default Task;
