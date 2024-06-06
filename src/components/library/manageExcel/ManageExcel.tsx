"use client";
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import generatePDF from "react-to-pdf";
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
} from "react-datasheet-grid";
import "react-datasheet-grid/dist/style.css";

let main: any = [
  {
    No: 1,
    Name: "A",
    Address: 1234,
    Phone: 891234567,
  },
  {
    No: 2,
    Name: "B",
    Address: 5678,
    Phone: 891234568,
  },
  {
    No: 3,
    Name: "C",
    Address: 10122,
    Phone: 891234569,
  },
  {
    No: 4,
    Name: "A",
    Address: 14566,
    Phone: 891234570,
  },
  {
    No: 5,
    Name: "B",
    Address: 19010,
    Phone: 891234571,
  },
  {
    No: 6,
    Name: "C",
    Address: 23454,
    Phone: 891234572,
  },
  {
    No: 7,
    Name: "A",
    Address: 27898,
    Phone: 891234573,
  },
  {
    No: 8,
    Name: "B",
    Address: 32342,
    Phone: 891234574,
  },
  {
    No: 9,
    Name: "C",
    Address: 36786,
    Phone: 891234575,
  },
  {
    No: 10,
    Name: "A",
    Address: 41230,
    Phone: 891234576,
  },
  {
    No: 11,
    Name: "B",
    Address: 45674,
    Phone: 891234577,
  },
];

const RenderExcelUi = ({jsonData, setJsonData, columsGrid}:any) => {
  return (
    <DataSheetGrid
      value={jsonData}
      onChange={(event: any) => {
        setJsonData(event);
      }}
      columns={columsGrid}
    />
  );
};

function ManageExcel() {
  const [file, setFile] = useState<any>(null);
  const [jsonData, setJsonData] = useState<any>([]);
  const [jsonDataTemp, setJsonDataTemp] = useState<any>([]);
  const [gridsExcel, setGridsExcel] = useState<any>([]);
  const [gridsExcelKey, setGridsExcelKey] = useState<any>([]);
  const [columsGrid, setColumsGrid] = useState<any>([]);
  const [flagRenders, setFlagRenders] = useState(false)
  const targetRef = useRef<any>();

  const handleConvert = (payload: any) => {
    if (payload) {
      setFile(payload);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
        // setJsonDataTemp(json);
        // let transformedMain = transformMainToTemp(json);
        // setGridsExcel(transformedMain || [])
      };
      reader.readAsBinaryString(payload);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `${file?.name}`);
  };

  function transformMainToTemp(payload: any) {
    let result: any = [];

    payload.forEach((obj: any) => {
      let transformedObj: any = [];
      let keys = getKeys(jsonDataTemp);
      setGridsExcelKey(keys || []);
      keys.forEach((element: any) => {
        transformedObj.push({ value: obj[element] });
        return element;
      });
      result.push(transformedObj);
    });

    return result;
  }

  function getKeys(payload: any) {
    if (payload.length > 0) {
      return Object.keys(payload[0]);
    }
    return [];
  }

  useEffect(() => {
    let grids = (gridsExcelKey || []).map((item: any) => {
      return {
        ...keyColumn(`${item}`, textColumn),
        title: `${item}`,
      };
    });
    setColumsGrid(grids);
  }, [gridsExcelKey]);

  useEffect(() => {
    setJsonDataTemp(jsonData);
  }, [jsonData]);

  useEffect(() => {
    let transformedMain = transformMainToTemp(jsonDataTemp);
    setGridsExcel(transformedMain || []);
  }, [jsonDataTemp]);

  useEffect(() => {
    setFlagRenders((pre:any) => false)
    if((columsGrid || []).length > 0){
        setFlagRenders((pre:any) => true)
    }
  }, [columsGrid]);

  return (
    <div>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={(e: any) => handleConvert(e.target.files[0])}
      />
      <button
        className={` ${
          ((jsonData || []).length === 0 && " cursor-not-allowed ") ||
          "text-green-500"
        }`}
        onClick={() => {
          (jsonData || []).length > 0 && exportToExcel();
        }}
      >
        Export Excel
      </button>
      {` | `}
      <button
        className={` ${
          ((jsonData || []).length === 0 && " cursor-not-allowed ") ||
          "text-red-500"
        }`}
        onClick={() => {
          (jsonData || []).length > 0 &&
            generatePDF(targetRef, {
              filename: `${file?.name.split(".")[0]}.pdf`,
            });
        }}
      >
        Export PDF
      </button>
      {` | `}
      <span>{`(ดาวโหลดไฟล์ excel ทดสอบติดต่อ Bank Dev)`}</span>
      <div className=" text-[9px] h-[200px] overflow-y-auto border-[1px]">
        <pre className="text-black" ref={targetRef}>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>
      <div className=" h-[500px] overflow-y-auto border-[1px]">
     
        {flagRenders && <RenderExcelUi flagRenders={flagRenders} jsonData={jsonData} setJsonData={setJsonData} columsGrid={columsGrid} /> }
      </div>
    </div>
  );
}

export default ManageExcel;
