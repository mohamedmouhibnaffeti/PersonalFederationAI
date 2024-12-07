"use server"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { GetAllUsers } from "../actions/User";


const TablesPage = async () => {
  const users = await GetAllUsers()
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne fiveUsers={users} onlyFive={false} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
