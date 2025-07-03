"use client";
import React, { useEffect } from "react";
import { fetchJobList } from "@/state/api/Jobs/fetchJobList";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import TableJobList from "./TableJobList";

const JobList = () => {
  const dispatch = useAppDispatch();
  const {
    list: jobList,
    loading: jobListLoading,
    error: jobListError,
  } = useAppSelector((state) => state.jobList);

  useEffect(() => {
    if (!jobList.length && !jobListLoading) {
      fetchJobList(dispatch);
    }
  }, [dispatch, jobList.length, jobListLoading]);
  return (
    <div>
      <TableJobList
        jobList={jobList}
        loading={jobListLoading}
        error={jobListError}
        totalPages={1}
        currentPage={1}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default JobList;
