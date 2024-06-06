"use client";
import { setExample } from "@/lib/store/slices/exampleSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ReduxExample() {
  const exampleReducer = useSelector((state: any) => state.exampleReducer);
  const { exampleId } = exampleReducer;
  const dispatch = useDispatch();

    const activeStore = async () => {
        dispatch(setExample(exampleId));
    }

  return <div className=" cursor-pointer" onClick={() => {activeStore()}}>Redux : {exampleId}</div>;
}

export default ReduxExample;
