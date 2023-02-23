import React from "react";
import EMPLOYEEE from "../../employee.model";

import TableArrow from "./TableArrow";

const CrudTable = ({
    data, setDataToEdit, deleteEmployee
}:{
    data: EMPLOYEEE[],
    setDataToEdit: React.SetStateAction<EMPLOYEEE> | null | any,
    deleteEmployee: Function,
}): JSX.Element => {
  return (
    <div>
      <h3>Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Empresa/Proyecto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el: EMPLOYEEE) => (
              <TableArrow
                el={el}
                key={el.id}
                setDataToEdit={setDataToEdit}
                deleteEmployee={deleteEmployee}
              />
            ))
          ): (
            <tr>
              <td colSpan={3}>Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
