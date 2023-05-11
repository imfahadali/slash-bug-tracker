import React, { useEffect, useState } from "react";
import { ITicketInput } from "../components/ProjectList";

const useForm = (ticketToEdit?: ITicketInput) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    priority: "low",
    // add other properties here with default values
    // for example: assignedTo: ""
    ...(ticketToEdit || {}),
  });

  // const handleChange = (e: any) => {
  //   const isFile = e.target.type === "file";
  //   console.log(e.target.name)
  //   console.log({...formData})
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: isFile ? e.target.files[0] : e.target.value,
  //   });
  // };

  const handleChange = (e: any) => {
    const isFile = e.target.type === "file";
    const isRadio = e.target.type === "radio";

    if (isRadio) {
      setFormData({
        ...formData,
        priority: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: isFile ? e.target.files[0] : e.target.value,
      });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return { formData, handleChange };
};

export default useForm;
