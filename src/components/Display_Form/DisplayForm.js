import { useEffect, useState } from "react";
import styles from "./display_form.module.css";

const DisplayForm = ({ data }) => {
  const [curentForm, setCurentForm] = useState({});
  const [jsonData, setJsonData] = useState([]);

  const removeAll = () => {
    setCurentForm((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((key) => {
        newState[key] = "";
      });
      return newState;
    });

    setJsonData([]);
  };

  const saveDetailsAndShow = (e) => {
    e.preventDefault();
    const arr = Object.entries(curentForm);
    let newElm = arr.map((el, idx) => {
      const [key, value] = el;
      const newKey = key.split("~")[0];
      return [newKey, value];
    });
    setJsonData(newElm);
  };

  useEffect(() => {
    data?.map((elm, index) => {
      setCurentForm({ ...curentForm, [`${elm.label}~${index + 1}`]: "" });
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurentForm({
      ...curentForm,
      [name]: value,
    });
  };

  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;

    const updatedValues = checked
      ? [...(curentForm[name] || []), value]
      : (curentForm[name] || []).filter((item) => item !== value);

    setCurentForm({
      ...curentForm,
      [name]: updatedValues,
    });
  };

  console.log(jsonData);

  return (
    <>
      <div className={styles.main_container}>
        <h1>Display Form</h1>

        <div className={styles.card}>
          <h2>Custom Form</h2>
          <form onSubmit={saveDetailsAndShow}>
            <div className={styles.formContainer}>
              {data?.map((elm, index) => {
                switch (elm.type) {
                  case "text": {
                    return (
                      <div key={index} className={styles.formValues}>
                        <label>
                          {elm.label}
                          {elm.required && (
                            <span style={{ color: "red" }}>* </span>
                          )}
                          :
                        </label>
                        <input
                          key={elm.id}
                          type={elm.pattern}
                          required={elm.required}
                          name={`${elm.label}~${index + 1}`}
                          value={curentForm[`${elm.label}~${index + 1}`]}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  }
                  case "radio": {
                    return (
                      <div key={index} className={styles.formValues}>
                        <label>
                          {elm.label}
                          {elm.required && (
                            <span style={{ color: "red" }}>* </span>
                          )}
                          :
                        </label>
                        <div>
                          {elm?.options?.map((el, idx) => (
                            <div key={idx} className={styles.checkboxAndRadio}>
                              <input
                                key={elm.id}
                                type="radio"
                                required={elm.required}
                                name={`${elm.label}~${index + 1}`}
                                value={el}
                                checked={
                                  curentForm[`${elm.label}~${index + 1}`] === el
                                }
                                onChange={handleChange}
                              />
                              <span>{el}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  case "checkbox": {
                    return (
                      <div key={index} className={styles.formValues}>
                        <label>{elm.label}:</label>
                        <div>
                          {elm?.options?.map((el, idx) => (
                            <div key={idx} className={styles.checkboxAndRadio}>
                              <input
                                key={elm.id}
                                type="checkbox"
                                name={`${elm.label}~${index + 1}`}
                                value={el}
                                checked={curentForm[
                                  `${elm.label}~${index + 1}`
                                ]?.includes(el)}
                                onChange={handleCheckbox}
                              />
                              <span>{el}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  case "textarea": {
                    return (
                      <div key={index} className={styles.formValues}>
                        <label>
                          {elm.label}
                          {elm.required && (
                            <span style={{ color: "red" }}>* </span>
                          )}
                          :
                        </label>
                        <textarea
                          key={elm.id}
                          required={elm.required}
                          name={`${elm.label}~${index + 1}`}
                          value={curentForm[`${elm.label}~${index + 1}`]}
                          onChange={handleChange}></textarea>
                      </div>
                    );
                  }
                  case "select": {
                    return (
                      <div key={index} className={styles.formValues}>
                        <label>
                          {elm.label}
                          {elm.required && (
                            <span style={{ color: "red" }}>* </span>
                          )}
                          :
                        </label>
                        <select
                          key={elm.id}
                          name={`${elm.label}~${index + 1}`}
                          required={elm.required}
                          value={curentForm[`${elm.label}~${index + 1}`]}
                          onChange={handleChange}>
                          <option value="">Select Option</option>
                          {data[index].options.map((el, idx) => (
                            <option key={idx} value={el}>
                              {el}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                }
              })}

              {data?.length > 0 && (
                <div className={styles.btnContainer}>
                  <button onClick={removeAll}>Clear</button>
                  <button type="submit">Save</button>
                </div>
              )}
            </div>
          </form>
        </div>

        {jsonData?.length > 0 && (
          <>
            <div className={styles.jsonContainer}>
              <h1>Data in JSON Format-</h1>
              <div className={styles.jsonData}>
                {jsonData?.map((elm, index) => (
                  <>
                    <div style={{ fontWeight: "700" }}>{"{"}</div>
                    <div>
                      <span style={{ fontWeight: "700" }}>{elm[0]} : </span>
                      {Array.isArray(elm[1])
                        ? elm[1].map((el) => <>{el}, </>)
                        : elm[1]}
                    </div>
                    <div style={{ fontWeight: "700" }}>
                      {"}"}
                      {","}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayForm;
