import React, { useState, useEffect } from "react";
import EMPLOYEEE from "../../employee.model";
import { helpHttp } from "../../helpers/helpHttp.js";
import CrudForm from "../form/CrudForm";
import Loader from "../loader/Loader";
import Message from "../message/Message";
import CrudTable from "../table/CrudTable";

const CrudApi = (): JSX.Element => {
  const [db, setDb] = useState<EMPLOYEEE[] | []>([]);
  const [dataToEdit, setDataToEdit] = useState<EMPLOYEEE | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url: string = "http://localhost:3000/employees";

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      api.get(url).then((res: EMPLOYEEE[] | any) => {
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb([]);
          setError(res.err);
        }
        setLoading(false);
      });
    }, 1000);
  }, [url]);

  const createEmployee = (data: EMPLOYEEE): void => {
    let lastPosition: number = db.length - 1;
    let lastId: number | null | undefined = db[lastPosition].id;
    let options: Object = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    if (lastId != null || lastId != undefined) {
      data.id = lastId + 1;
    }
    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateEmployee = (data: EMPLOYEEE): void => {
    let endPoint: string = `${url}/${data.id}`;
    let options: Object = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.put(endPoint, options).then((res) => {
      console.log(res);
      if (!res.err) {
        let newData: EMPLOYEEE[] = db.map((el) =>
          el.id === data.id ? data : el
        );
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteEmployee = (id: number): void => {
    let isDelete: boolean = confirm(
      `¿Estás seguro de eliminar el registro con el id = '${id}' ?`
    );
    if (isDelete) {
      let endPoint: string = `${url}/${id}`;
      let options: Object = {
        headers: { "content-type": "application/json" },
      };
      api.del(endPoint, options).then((res) => {
        if (!res.err) {
          let newData: EMPLOYEEE[] = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD API</h2>
      <article className="grid-1-2">
        <CrudForm
          createEmployee={createEmployee}
          updateEmployee={updateEmployee}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && <Message msg={`Error`} bgColor={"#dc3545"} />}
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteEmployee={deleteEmployee}
          />
        )}
      </article>
    </div>
  );
};

export default CrudApi;
