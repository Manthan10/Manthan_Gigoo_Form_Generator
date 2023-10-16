import { useState, useEffect } from "react";
import styles from "./create_file.module.css";

import { BiText } from "react-icons/bi";
import { BsTextareaResize } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import {
  AiOutlineUnorderedList,
  AiFillEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { ImRadioChecked, ImCheckboxChecked } from "react-icons/im";

const CreateForm = ({ sendData }) => {
  const [editOpen, setEditOpen] = useState([]);
  const [formValues, setFormValues] = useState([
    {
      icon: <BiText />,
      data: "Text",
      function: () => addText("text"),
    },
    {
      icon: <BsTextareaResize />,
      data: "Text Area",
      function: () => addTextArea("textarea"),
    },
    {
      icon: <ImRadioChecked />,
      data: "Radio Group",
      function: () => addRadio("radio"),
    },
    {
      icon: <ImCheckboxChecked />,
      data: "CheckBox Group",
      function: () => addCheckbox("checkbox"),
    },
    {
      icon: <AiOutlineUnorderedList />,
      data: "Select",
      function: () => addSelect("select"),
    },
  ]);

  const [field, setField] = useState([]);

  const addText = (type) => {
    const date = new Date().getTime();
    const id = `${date}_${type}`;
    const elm = {
      id: id,
      type: type,
      label: "text",
      placeholder: "",
      required: false,
      pattern: "",
    };

    setField((prevField) => [...prevField, elm]);
  };

  const addTextArea = (type) => {
    const date = new Date().getTime();
    const id = `${date}_${type}`;
    const elm = {
      id: id,
      type: type,
      label: "textarea",
      placeholder: "",
      required: false,
    };

    setField((prevField) => [...prevField, elm]);
  };

  const addRadio = (type) => {
    const date = new Date().getTime();
    const id = `${date}_${type}`;
    const elm = {
      id: id,
      type: type,
      label: "radio",
      placeholder: "",
      required: false,
      options: ["option1", "option2", "option3"],
    };

    setField((prevField) => [...prevField, elm]);
  };

  const addCheckbox = (type) => {
    const date = new Date().getTime();
    const id = `${date}_${type}`;
    const elm = {
      id: id,
      type: type,
      label: "checkbox",
      placeholder: "",
      options: ["option1", "option2", "option3"],
    };

    setField((prevField) => [...prevField, elm]);
  };

  const addSelect = (type) => {
    const date = new Date().getTime();
    const id = `${date}_${type}`;
    const elm = {
      id: id,
      type: type,
      label: "select",
      placeholder: "",
      required: false,
      options: ["option1", "option2", "option3"],
    };

    setField((prevField) => [...prevField, elm]);
  };

  const enableEdit = (e, index) => {
    e.preventDefault();
    setEditOpen((prevEditOpen) => ({
      ...prevEditOpen,
      [index]: true,
    }));
  };

  const saveEdit = (e, index) => {
    e.preventDefault();
    setEditOpen((prevEditOpen) => ({
      ...prevEditOpen,
      [index]: false,
    }));
  };

  const handleChangeLabels = (e, index) => {
    const { value } = e.target;

    const updatedFields = [...field];

    updatedFields[index].label = value;

    setField(updatedFields);
  };

  const handleChangePattern = (e, index) => {
    const { value } = e.target;

    const updatedFields = [...field];

    updatedFields[index].pattern = value;

    setField(updatedFields);
  };

  const handleChangeRequired = (e, index) => {
    const { value } = e.target;
    const updatedFields = [...field];

    updatedFields[index].required = !updatedFields[index].required;

    setField(updatedFields);
  };

  const handleChangeOptions = (e, index, position, element) => {
    const { value } = e.target;
    let updatedFields = [...element.options];
    updatedFields[position] = value;

    let updatedElement = { ...element };
    updatedElement.options = updatedFields;

    let updatedFieldArray = [...field];
    updatedFieldArray[index] = updatedElement;
    setField(updatedFieldArray);
  };

  const addOptions = (e, index, element) => {
    e.preventDefault();

    let updatedFields = [...element.options];
    updatedFields = [...updatedFields, `option${element.options.length + 1}`];

    let updatedElement = { ...element };
    updatedElement.options = updatedFields;

    let updatedFieldArray = [...field];
    updatedFieldArray[index] = updatedElement;

    setField(updatedFieldArray);
  };

  const removeOptionField = (e, position, element, index) => {
    e.preventDefault();
    const updatedFields = [...element.options];
    updatedFields.splice(position, 1);

    let updatedElement = { ...element };
    updatedElement.options = updatedFields;

    let updatedFieldArray = [...field];
    updatedFieldArray[index] = updatedElement;

    setField(updatedFieldArray);
  };

  const removeField = (e, index) => {
    e.preventDefault();
    const updatedFields = [...field];
    updatedFields.splice(index, 1);
    setField(updatedFields);
  };

  const removeAll = (e) => {
    e.preventDefault();
    setField([]);
  };

  const saveDetailsAndShow = (e) => {
    e.preventDefault();
    sendData(field);
  };

  return (
    <>
      <div className={styles.main_container}>
        <h1>Create Form</h1>
        <div className={styles.flexContaier}>
          <div className={styles.displayContainer}>
            {field.map((elm, index) => (
              <div className={styles.contentContainer}>
                {elm.type === "text" ||
                elm.type === "radio" ||
                elm.type === "checkbox" ? (
                  <>
                    {elm.type === "text" ? (
                      <>
                        <div className={styles.inputStyle}>
                          <div className={styles.icon_container}>
                            <span>
                              {editOpen[index] ? (
                                <TiTick onClick={(e) => saveEdit(e, index)} />
                              ) : (
                                <AiFillEdit
                                  onClick={(e) => enableEdit(e, index)}
                                />
                              )}
                            </span>
                            <span onClick={(e) => removeField(e, index)}>
                              <CiCircleRemove />
                            </span>
                          </div>
                          {editOpen[index] ? (
                            <>
                              <input
                                type="text"
                                value={elm.label}
                                style={{ width: "fit-content" }}
                                onChange={(e) => handleChangeLabels(e, index)}
                              />
                              <div className={styles.listStyle}>
                                <label>Required?</label>
                                <input
                                  type="checkbox"
                                  value={elm.required}
                                  checked={elm.required === true}
                                  onChange={(e) =>
                                    handleChangeRequired(e, index)
                                  }
                                />
                              </div>
                              <div>
                                <label>Select Type: </label>
                                <select
                                  value={elm.pattern}
                                  onChange={(e) =>
                                    handleChangePattern(e, index)
                                  }>
                                  <option value="">select pattern</option>
                                  <option value="text">Text</option>
                                  <option value="number">Number</option>
                                  <option value="password">password</option>
                                  <option value="email">email</option>
                                  <option value="date">date</option>
                                </select>
                              </div>
                            </>
                          ) : (
                            <>
                              <label>{elm.label}</label>
                              <input type={elm.type} name={elm.id} />
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className={styles.inputStyle}>
                        <div className={styles.icon_container}>
                          <span>
                            {editOpen[index] ? (
                              <>
                                <TiTick onClick={(e) => saveEdit(e, index)} />
                                <AiOutlinePlus
                                  onClick={(e) => addOptions(e, index, elm)}
                                />
                              </>
                            ) : (
                              <AiFillEdit
                                onClick={(e) => enableEdit(e, index)}
                              />
                            )}
                          </span>
                          <span onClick={(e) => removeField(e, index)}>
                            <CiCircleRemove />
                          </span>
                        </div>
                        {editOpen[index] ? (
                          <>
                            <input
                              type="text"
                              value={elm.label}
                              style={{ width: "fit-content" }}
                              onChange={(e) => handleChangeLabels(e, index)}
                            />
                            {elm.type === "radio" && (
                              <div className={styles.listStyle}>
                                <label>Required?</label>
                                <input
                                  type="checkbox"
                                  value={elm.required}
                                  checked={elm.required === true}
                                  onChange={(e) =>
                                    handleChangeRequired(e, index)
                                  }
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <label>{elm.label}</label>
                        )}
                        {editOpen[index] ? (
                          <>
                            {elm.options.map((el, idx) => (
                              <div className={styles.radioAndCheckbox}>
                                <input
                                  type="text"
                                  value={el}
                                  onChange={(e) =>
                                    handleChangeOptions(e, index, idx, elm)
                                  }
                                />
                                <RxCross2
                                  onClick={(e) =>
                                    removeOptionField(e, idx, elm, index)
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {elm.options.map((el, idx) => (
                              <div className={styles.radioAndCheckbox}>
                                <>
                                  <label htmlFor={el}>{el}</label>
                                  <input
                                    id={el}
                                    name={elm.type}
                                    type={elm.type}
                                  />
                                </>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </>
                ) : elm.type === "select" ? (
                  <div className={styles.inputStyle}>
                    <div className={styles.icon_container}>
                      <span>
                        {editOpen[index] ? (
                          <>
                            <TiTick onClick={(e) => saveEdit(e, index)} />
                            <AiOutlinePlus
                              onClick={(e) => addOptions(e, index, elm)}
                            />
                          </>
                        ) : (
                          <AiFillEdit onClick={(e) => enableEdit(e, index)} />
                        )}
                      </span>
                      <span onClick={(e) => removeField(e, index)}>
                        <CiCircleRemove />
                      </span>
                    </div>
                    {editOpen[index] ? (
                      <>
                        <input
                          type="text"
                          value={elm.label}
                          style={{ width: "fit-content" }}
                          onChange={(e) => handleChangeLabels(e, index)}
                        />
                        <div className={styles.listStyle}>
                          <label>Required?</label>
                          <input
                            type="checkbox"
                            value={elm.required}
                            checked={elm.required === true}
                            onChange={(e) => handleChangeRequired(e, index)}
                          />
                        </div>
                      </>
                    ) : (
                      <label>{elm.label}</label>
                    )}
                    {editOpen[index] ? (
                      <>
                        {elm.options.map((el, idx) => (
                          <div className={styles.radioAndCheckbox}>
                            <input
                              type="text"
                              value={el}
                              onChange={(e) =>
                                handleChangeOptions(e, index, idx, elm)
                              }
                            />
                            <RxCross2
                              onClick={(e) =>
                                removeOptionField(e, idx, elm, index)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <select name="" id="">
                        <option value="">Select Value</option>
                        {elm.options.map((el, idx) => (
                          <option value={el}>{el}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ) : (
                  <div className={styles.inputStyle}>
                    <div className={styles.icon_container}>
                      <span>
                        {editOpen[index] ? (
                          <TiTick onClick={(e) => saveEdit(e, index)} />
                        ) : (
                          <AiFillEdit onClick={(e) => enableEdit(e, index)} />
                        )}
                      </span>
                      <span onClick={(e) => removeField(e, index)}>
                        <CiCircleRemove />
                      </span>
                    </div>
                    {editOpen[index] ? (
                      <>
                        <input
                          type="text"
                          value={elm.label}
                          style={{ width: "fit-content" }}
                          onChange={(e) => handleChangeLabels(e, index)}
                        />
                        <div className={styles.listStyle}>
                          <label>Required?</label>
                          <input
                            type="checkbox"
                            value={elm.required}
                            checked={elm.required === true}
                            onChange={(e) => handleChangeRequired(e, index)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <label>{elm.label}</label>
                        <textarea></textarea>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.listItems}>
            {formValues.map((elm, index) => (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  elm.function();
                }}
                className={styles.listStyle}>
                {elm.icon}
                {elm.data}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button onClick={removeAll}>Clear</button>
          <button onClick={saveDetailsAndShow}>Save</button>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
