// UsersManagement.jsx
import { redirect, useLoaderData } from "react-router-dom";
import SortableTable from "../../components/admin/table/SortableTable";

const { VITE_BACKEND_URL } = import.meta.env;

export const fetchDataUsers = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${VITE_BACKEND_URL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return redirect("/logout");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error("error", error);
  }
};

function UsersManagement() {
  const dataLoad = useLoaderData();

  return <SortableTable dataLoad={dataLoad} />;
}

export default UsersManagement;
