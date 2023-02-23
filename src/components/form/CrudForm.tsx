import React, { useState, useEffect } from "react";
import EMPLOYEEE from "../../employee.model";

const INITIALFORM: EMPLOYEEE = {
    id: null,
    name: "",
    enterprise: "",
  }

const CrudForm = ({
  createEmployee,
  updateEmployee,
  dataToEdit,
  setDataToEdit,
}: {
  createEmployee: Function;
  updateEmployee: Function;
  dataToEdit: EMPLOYEEE | null;
  setDataToEdit: React.SetStateAction<EMPLOYEEE> | null | any;
}): JSX.Element => {

  // States donde se almacena el valor de los inputs del form.
  const [form, setForm] = useState<EMPLOYEEE>(INITIALFORM);

  useEffect(()=>{
    if(dataToEdit){
      setForm(dataToEdit)
    } else {
      setForm(INITIALFORM)
    }
  }, [dataToEdit])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!form.name || !form.enterprise) {
      alert("Datos incompletos.");
      return;
    }
    if (form.id === null) {
      createEmployee(form);
    } else {
      updateEmployee(form);
    }
    handleReset();
  };

  const handleReset = (): void => {
    setForm(INITIALFORM);
    setDataToEdit(null);
  };

  const handleChange = (e: React.ChangeEvent): void => {
    const $e: HTMLInputElement = e.target as HTMLInputElement;
    setForm({
      ...form,
      [$e.name]: $e.value,
    });
  };

  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={(e) => handleChange(e)}
          value={form.name}
        />
        &nbsp;
        <input
          type="text"
          name="enterprise"
          placeholder="Empresa/Proyecto"
          onChange={(e) => handleChange(e)}
          value={form.enterprise}
        />
        &nbsp;
        <input type="submit" value="ENVIAR" /> &nbsp;
        <input type="reset" value="LIMPIAR" onClick={handleReset} />
      </form>
    </div>
  );
};

export default CrudForm;
