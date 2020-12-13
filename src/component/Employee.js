import React from "react";
import "./Employee.css";
import { useStateValue } from "../Auth";

function Employee({ setIsChoseEmployee }) {
  const [{ waiter }, dispatch] = useStateValue();
  const setSelEmployee = (employee_id) => {
    dispatch({
      type: "WAITER_SELECT",
      payload: employee_id,
    });
  };

  const setIsChoseEmp = () => {
    setIsChoseEmployee.apply();
  };

  return (
    <div className="employee__container">
      {waiter?.map(({ employee_id }) => {
        return (
          <div
            className="employee__number"
            key={employee_id}
            onClick={() => setSelEmployee(employee_id)}
          >
            <div>{employee_id}</div>
          </div>
        );
      })}
      <div className="employee__button" onClick={() => setIsChoseEmp()}>
        確認
      </div>
    </div>
  );
}

export default Employee;
