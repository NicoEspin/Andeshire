"use client";

import React, { useState } from "react";
import companiesList from "./data/companiesList.json";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CompanyDetail from "./CompanyDetail";
import TablePagination from "../jobs/TablePagination";
import { useTranslations } from "next-intl"; // 👈 Importa useTranslations
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {};

const CompaniesTable = (props: Props) => {
  const t = useTranslations("Companies");
  const [searchQuery, setSearchQuery] = useState("");
  const companies = companiesList.companies;

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("FilterTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <Input
              placeholder={t("SearchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-1/2"
            />
            <Button className="flex items-center gap-2 text-white bg-purple-600 cursor-pointer font-medium hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              {t("AddCompanyButton")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-lg p-4 space-y-4">
        <CardHeader>
          <h2 className="text-xl font-semibold">{t("TableTitle")}</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  {t("TableHead.Name")}
                </TableHead>
                <TableHead>{t("TableHead.Email")}</TableHead>
                <TableHead>{t("TableHead.Description")}</TableHead>
                <TableHead>{t("TableHead.CreatedAt")}</TableHead>
                <TableHead>{t("TableHead.UpdatedAt")}</TableHead>
                <TableHead className="text-center">
                  {t("TableHead.Jobs")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    {" "}
                    <Link
                      href={`/companies/${company.id}`}
                      className="hover:underline text-primary"
                    >
                      {company.name}
                    </Link>
                  </TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell className="line-clamp-2">
                    <CompanyDetail
                      name={company.name}
                      description={company.description}
                    />
                  </TableCell>
                  <TableCell>
                    {format(new Date(company.created_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(company.updated_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge>{company.jobs_count}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
          <TablePagination
            currentPage={2}
            totalPages={5}
            onPageChange={(page) => {
              console.log("Cambia a página:", page);
            }}
            siblingCount={1}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompaniesTable;
