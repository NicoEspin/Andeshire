import React from "react";
import CompaniesTable from "./CompaniesTable";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="pr-8">
      <CompaniesTable />
    </div>
  );
};

export default page;
