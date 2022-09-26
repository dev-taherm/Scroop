import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";




const SelectStreet = ({names}) => {
  
  return (
    <Form.Select className="form-select" aria-label="Default select example">
      
      {names.map((names) => (
        <option value={names.name} key={names.id}>{names.name}</option>
      ))}
    </Form.Select>
  );
};

export default SelectStreet;
