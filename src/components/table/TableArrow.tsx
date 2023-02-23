import React from "react";
import EMPLOYEEE from "../../employee.model";


const TableArrow = ({
  el,
  setDataToEdit,
  deleteEmployee,
}: {
  el: EMPLOYEEE;
  setDataToEdit: React.SetStateAction<EMPLOYEEE> | null | any;
  deleteEmployee: Function;
}) => {
  let { name, enterprise, id } = el;
  return (
    <tr>
      <td>{name}</td>
      <td>{enterprise}</td>
      <td>
        <button
          onClick={()=>setDataToEdit(el)}
        >Editar</button> &nbsp;
        <button
          onClick={()=>deleteEmployee(id)}
        >Eliminar</button>
      </td>
    </tr>
  );
};

export default TableArrow;
