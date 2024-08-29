import React, { useState } from "react";
import Modal from "react-modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Test from "./Test";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import 'remixicon/fonts/remixicon.css';


const formFields = [
  { id: "userName", label: "User Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "number", label: "Phone Number", type: "tel" },
  { id: "dropdown", label: "Dropdown", type: "select" },
  { id: "radio", label: "Radio Button", type: "radio" },
  { id: "checkbox", label: "Checkbox", type: "checkbox" },
  { id: "textarea", label: "Text Area", type: "textarea" },
  { id: "cta", label: "CTA Button", type: "button" },
];

Modal.setAppElement("#root");

function App() {
  const [form, setForm] = useState([]);
  const [preview, setPreview] = useState(false);
  const [editField, setEditField] = useState(null);
  const [formValues, setFormValues] = useState({
    label: "",
    placeholder: "",
    type: "",
    options: [],
  });
  const [newOption, setNewOption] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedForm = Array.from(form);
    const [removed] = reorderedForm.splice(result.source.index, 1);
    reorderedForm.splice(result.destination.index, 0, removed);
    setForm(reorderedForm);
  };

  const addField = (field) => {
    if (editField) {
      const updatedForm = form.map((f) =>
        f.id === editField.id
          ? {
              ...f,
              ...formValues,
              placeholder:
                field.type === "checkbox" ||
                field.type === "radio" ||
                field.type === "select" ||
                field.type === "button"
                  ? undefined
                  : formValues.placeholder,
            }
          : f
      );
      setForm(updatedForm);
      setEditField(null);
    } else {
      setForm([
        ...form,
        {
          ...field,
          id: `${field.id}-${Date.now()}`,
          placeholder:
            field.type === "checkbox" ||
            field.type === "radio" ||
            field.type === "select" ||
            field.type === "button"
              ? undefined
              : formValues.placeholder,
          options: formValues.options || [],
        },
      ]);
    }
    setFormValues({ label: "", placeholder: "", type: "", options: [] });
  };

  const handleEditField = (field) => {
    setEditField(field);
    setFormValues({
      label: field.label,
      placeholder: field.placeholder || "",
      type: field.type,
      options: field.options || [],
    });
  };

  const deleteField = (id) => {
    setForm(form.filter((field) => field.id !== id));
  };

  const getFieldCode = () => {
    return form
      .map((field) => {
        switch (field.type) {
          case "text":
          case "email":
          case "tel":
            return `<input type="${field.type}" placeholder="${field.placeholder}" class="border rounded-[.25rem] p-2 mb-4 w-full" />`;
          case "textarea":
            return `<textarea placeholder="${field.placeholder}" class="border rounded-[.25rem] p-2 mb-4 w-full"></textarea>`;
          case "select":
            return `
              <select class="border rounded-[.25rem] p-2 mb-4 w-full">
                ${field.options
                  .map(
                    (option) => `<option value="${option}">${option}</option>`
                  )
                  .join("\n")}
              </select>`;
          case "radio":
            return `<input type="radio" name="${field.id}" class="mr-2" /> ${field.label}`;
          case "checkbox":
            return `<input type="checkbox" class="mr-2" /> ${field.label}`;
          case "button":
            return `<button class="bg-blue-500 text-white p-2 rounded-[.25rem]">${field.label}</button>`;
          default:
            return "";
        }
      })
      .join("\n");
  };

  return (
    <>
      <div className="p-8 bg-[#F0F0F5] min-h-screen font-jost">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 card-title">
          React Form Builder
        </h1>
        <div className="flex space-x-4">
          <div className=" bg-white p-4 rounded-[.25rem] shadow-lg">
            <h3 className="font-bold text-xl mb-4 text-blue-600 card-title">
              Input Fields
            </h3>
            {formFields.map((field, index) => (
              <div
                key={index}
                className="p-2 mb-2 w-[250px] text-sm text-slate-700 dark:text-slate-400 cursor-pointer hover:text-slate-100 bg-slate-300 hover:bg-[#6c8effdf] rounded-[.25rem] text-center"
                onClick={() => addField(field)}
              >
                {field.label}
              </div>
            ))}
          </div>

          <div className="w-1/2 bg-white p-4 rounded-[.25rem] shadow-lg">
            <h3 className="font-bold text-xl mb-4 text-blue-600 card-title">
              Form Builder
            </h3>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="form-builder">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-4 border-2 border-dashed border-blue-300 rounded-[.25rem] min-h-[300px] bg-gray-50"
                  >
                    {form.length === 0 && (
                      <p className="text-gray-400 text-center">
                        Drag and drop fields here
                      </p>
                    )}
                    {form.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 mb-2 border border-blue-200 bg-slate-100 rounded-[.25rem] flex justify-between items-center text-sm text-slate-700 dark:text-slate-400 cursor-pointer"
                          >
                            <span>{field.label}</span>
                            <div >
                              <button
                                className="text-slate-800 hover:text-yellow-600 mr-2 text-[1rem]"
                                onClick={() => handleEditField(field)}
                              >
                               <i class="ri-edit-line"></i>
                              </button>
                              <button
                                className="text-slate-600 hover:text-red-600 text-[1rem]"
                                onClick={() => deleteField(field.id)}
                              >
                              <i class="ri-delete-bin-2-fill"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="w-1/4">
            <button
              className="mb-4 p-2 bg-[#3e60d5] opacity-[1] text-white font-jost rounded-[.25rem] w-full "
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Back to Edit" : "Preview"}
            </button>
            {preview && (
              <div className="p-4 bg-white rounded-[.25rem] shadow-lg flex flex-col">
                <h3 className="font-bold text-lg mb-2   card-title">
                  Preview
                </h3>
                <div className="flex-1 overflow-auto text-sm text-slate-700 dark:text-slate-400 cursor-pointer">
                  {form.map((field, index) => (
                    <div key={index} className="mb-4 ">
                      {field.type !== "radio" &&
                        field.type !== "checkbox" &&
                        field.type !== "button" && (
                          <label className="block mb-2  text-sm text-slate-500 dark:text-slate-400 cursor-pointer">
                            {field.label}
                          </label>
                        )}
                      {field.type === "textarea" ? (
                        <textarea
                          placeholder={field.placeholder}
                          className="w-full p-2 border rounded-[.25rem]"
                        ></textarea>
                      ) : field.type === "select" ? (
                        <select className="w-full p-2 border rounded-[.25rem]">
                          {field.options.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "radio" ||
                        field.type === "checkbox" ? (
                        <label className="flex items-center">
                          <input type={field.type} className="mr-2" />
                          {field.label}
                        </label>
                      ) : field.type === "button" ? (
                        <button className="p-2 bg-green-500 text-white rounded-[.25rem]">
                          {field.label}
                        </button>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full p-2 border rounded-[.25rem]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* edit model  */}
        <Modal
          isOpen={!!editField}
          onRequestClose={() => setEditField(null)}
          contentLabel="Edit Field"
          className="w-full max-w-lg mx-auto   rounded-[.25rem] shadow-lg flex items-center justify-center "
          overlayClassName="fixed inset-0  bg-[#58575739] flex items-center justify-center  " // Gray overlay for the background
        >
          <div className="bg-[#fafafa] p-6 rounded-[.25rem] shadow-lg w-full">
            <div className="flex justify-between">
              <h2 className=" font-bold mb-4  card-title font-jost">
                Edit Field
              </h2>
              <button
                onClick={() => setEditField(null)}
                className=" mt-[-30px]"
              >
              <i class="ri-close-large-line text-[&#xF4C8] "></i>
              </button>
            </div>
            <label className="block mb-3  text-sm text-slate-700 dark:text-slate-400 cursor-pointer">
              Label:
              <input
                type="text"
                value={formValues.label}
                onChange={(e) =>
                  setFormValues({ ...formValues, label: e.target.value })
                }
                className="w-full p-1 text-xs border rounded-[.25rem]  text-slate-500 dark:text-slate-400 cursor-pointer"
              />
            </label>
            {(formValues.type === "text" ||
              formValues.type === "email" ||
              formValues.type === "tel" ||
              formValues.type === "textarea") && (
              <label className="block mb-3  text-sm text-slate-700 dark:text-slate-400 cursor-pointer">
                Placeholder:
                <input
                  type="text"
                  value={formValues.placeholder}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      placeholder: e.target.value,
                    })
                  }
                  className="w-full p-1 border rounded-[.25rem] text-sm text-slate-500 dark:text-slate-400 cursor-pointer"
                />
              </label>
            )}
            {formValues.type === "select" && (
              <>
                <label className="block mb-3  text-sm text-slate-700 dark:text-slate-400 cursor-pointer">
                  Options:
                  <div className="flex mb-2 gap-2">
                    <input
                      type="text"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      className="w-[75%] p-1 border rounded-[.25rem] text-sm text-slate-500 dark:text-slate-400 cursor-pointer"
                    />
                    <button
                      onClick={() => {
                        if (newOption.trim()) {
                          setFormValues({
                            ...formValues,
                            options: [...formValues.options, newOption],
                          });
                          setNewOption("");
                        }
                      }}
                      className="  bg-[#8B5CF6] opacity-[1] font-jost rounded-[.25rem]  w-[25%] text-sm text-white dark:text-slate-400 cursor-pointer"
                    >
                     <span className="text-xs font-jost" > Add Option</span>
                    </button>
                  </div>
                  <ul>
                    {formValues.options.map((option, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b py-1"
                      >
                        {option}
                        <button
                          onClick={() =>
                            setFormValues({
                              ...formValues,
                              options: formValues.options.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </label>
              </>
            )}
          <div className="flex justify-around gap-10 mt-5">
          <button
              onClick={() => {
                addField(editField);
                setEditField(null);
              }}
          className="w-[30%] mb-4 p-1 bg-[#3e60d5] opacity-[1] text-white font-jost rounded-[.25rem]  "
            >
              Save
            </button>
            <button
              onClick={() => setEditField(null)}
            className="w-[30%] mb-4 p-1 bg-[#3e60d5] opacity-[1] text-white font-jost rounded-[.25rem]  "
            >
              Cancel
            </button>
          </div>
          </div>
        </Modal>

        {/* Code Display */}
        {preview && (
          <div className="mt-8 p-4 bg-gray-800 text-white rounded-[.25rem] shadow-lg text-sm font-jost">
            <h3 className="font-bold text-xl mb-2 font-jost text-slate-200">Generated Code</h3>
            <pre className="p-4 bg-gray-900 text-slate-200 rounded-[.25rem] overflow-auto">
              {getFieldCode()}
            </pre>
          </div>
        )}
      </div>

      {/* <Test/> */}
    </>
  );
}

export default App;
