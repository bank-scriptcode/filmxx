"use client";
import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import * as FileSaver from "file-saver";
import XLSXStyle from "xlsx-js-style";



function ManageExcelCus() {
  const [file, setFile] = useState<any>(null);
  const [jsonData, setJsonData] = useState<any>([]);


  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    let rows = [
      [null,null,null,null,null,null,null,null,null,null,null],
      [
        "Date",
        "Summary Pane: Balance generated on 14/02/2024 - 16:18:37",
        null,
        null,
        null,
        null,
        null,
        "Detail Pane",
        null,
        null,
        null,
      ],
      [
        null,
        "Shipper",
        "Shipper Name",
        "Contract",
        "Total Entry (MMBTU/d)",
        null,
        null,
        "Exit (MMBTU/d)",
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        "East",
        "West",
        "E-W",
        "East",
        null,
        "West",
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "GSP",
        "Bypass",
        "LMPT1",
        "LMPT2",
      ],
      // ----
      [
        "01/01/2024",
        "NGP-S16-001",
        "บริษัท ปตท. จำกัด (มหาชน)",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "01/01/2024",
        "NGP-S16-001",
        "บริษัท ปตท. จำกัด (มหาชน)",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "01/01/2024",
        "NGP-S16-001",
        "บริษัท ปตท. จำกัด (มหาชน)",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "01/01/2024",
        "TOTAL: NGP-S16-001",
        "บริษัท ปตท. จำกัด (มหาชน)",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "01/01/2024",
        "NGP-S16-001",
        "การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "01/01/2024",
        "TOTAL: NGP-S17-002",
        "การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "01/01/2024",
        "TOTAL",
        "TOTAL",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      // ---
      [
        "02/01/2024",
        "NGP-S16-001",
        "บริษัท ปตท. จำกัด (มหาชน)",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "02/01/2024",
        "NGP-S16-001",
        "บริษัท ปตท. จำกัด (มหาชน)",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "02/01/2024",
        "NGP-S16-001",
        "บริษัท ปตท. จำกัด (มหาชน)",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "02/01/2024",
        "TOTAL: NGP-S16-001",
        "บริษัท ปตท. จำกัด (มหาชน)",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "02/01/2024",
        "NGP-S16-001",
        "การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "02/01/2024",
        "TOTAL: NGP-S17-002",
        "การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
      [
        "02/01/2024",
        "TOTAL",
        "TOTAL",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
        "Data 4",
      ],
    ];

    let ws: any = XLSX.utils.aoa_to_sheet(rows);
    // console.log(ws);
    ws["A2"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "b3c1c7" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["B2"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "ffe3a1" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["H2"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "95da6a" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["B3"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "b3c1c7" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["C3"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "b3c1c7" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["D3"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "b3c1c7" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["E3"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "ffffff" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["E4"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "d4eeb5" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["F4"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "c6f3ef" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["G4"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "f0c4c4" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["H3"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "b0d7ff" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["H4"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "d4eeb5" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };
    ws["J4"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "c6f3ef" } },
      alignment: { wrapText: true, vertical: "center", horizontal: "center" },
    };

    ws["!merges"] = [
      {
        s: { r: 1, c: 0 },
        e: { r: 4, c: 0 },
      },
      {
        s: { r: 1, c: 1 },
        e: { r: 1, c: 6 },
      },
      {
        s: { r: 1, c: 7 },
        e: { r: 1, c: 10 },
      },
      {
        s: { r: 2, c: 1 },
        e: { r: 4, c: 1 },
      },
      {
        s: { r: 2, c: 2 },
        e: { r: 4, c: 2 },
      },
      {
        s: { r: 2, c: 3 },
        e: { r: 4, c: 3 },
      },
      {
        s: { r: 2, c: 4 },
        e: { r: 2, c: 6 },
      },
      {
        s: { r: 3, c: 4 },
        e: { r: 4, c: 4 },
      },
      {
        s: { r: 3, c: 5 },
        e: { r: 4, c: 5 },
      },
      {
        s: { r: 3, c: 6 },
        e: { r: 4, c: 6 },
      },
      {
        s: { r: 2, c: 7 },
        e: { r: 2, c: 10 },
      },
      {
        s: { r: 3, c: 7 },
        e: { r: 3, c: 8 },
      },
      {
        s: { r: 3, c: 9 },
        e: { r: 3, c: 10 },
      },
    ];


    ws["!cols"] = [{}, { wch: 12 }, { wch: 20 }, { wch: 30 }, { wch: 20 }];

   
      const rowBackgroundColor = { fgColor: { rgb: "9cfcff" } };
      const rowNumbers = [8, 10, 15, 17]; 
      const range = XLSX.utils.decode_range(ws['!ref']);
      rowNumbers.forEach(rowNumber => {
          for (let C = range.s.c; C <= range.e.c; ++C) {
              const cellAddress = XLSX.utils.encode_cell({ r: rowNumber, c: C });
              if (!ws[cellAddress]) ws[cellAddress] = {};
              ws[cellAddress].s = { ...ws[cellAddress].s, fill: rowBackgroundColor };
          }
      });

      const rowBackgroundColorToTalAll = { fgColor: { rgb: "fffd9c" } };
      const rowNumbersToTalAll = [11, 18]; 
      const rangeToTalAll = XLSX.utils.decode_range(ws['!ref']);
      rowNumbersToTalAll.forEach(rowNumber => {
          for (let C = rangeToTalAll.s.c; C <= rangeToTalAll.e.c; ++C) {
              const cellAddress = XLSX.utils.encode_cell({ r: rowNumber, c: C });
              if (!ws[cellAddress]) ws[cellAddress] = {};
              ws[cellAddress].s = { ...ws[cellAddress].s, fill: rowBackgroundColorToTalAll };
          }
      });


      const hiddenRowIndex = 0; // Row 1 is at index 0
      if (!ws['!rows']) ws['!rows'] = [];
      ws['!rows'][hiddenRowIndex] = { hidden: true };

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    console.log(wb);
    XLSXStyle.writeFile(wb, "xlsx-js-style-demo.xlsx");
  };

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


  useEffect(() => {
    console.log(jsonData);
  }, [jsonData]);

  return (
    <div>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={(e: any) => handleConvert(e.target.files[0])}
      />
      <button
        className={`"text-green-500`}
        onClick={() => {
          exportToExcel();
        }}
      >
        Export Excel
      </button>

      <div className=" h-[700px] overflow-y-auto border-[1px]">
        <table className="min-w-full bg-white shadow-md overflow-hidden">
          <thead className="">
            <tr>
              <th
                rowSpan={4}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#b3c1c7]"
              >
                {`Date`}
              </th>
              <th
                colSpan={6}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#ffe3a1]"
              >
                {`Summary Pane: Balance generated on  14/02/2024 - 16:18:37`}
              </th>
              <th
                colSpan={4}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#95da6a]"
              >
                {`Detail Pane`}
              </th>
            </tr>
            <tr>
              <th
                rowSpan={3}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#b3c1c7]"
              >
                {`Shipper`}
              </th>
              <th
                rowSpan={3}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#b3c1c7]"
              >
                {`Shipper Name`}
              </th>
              <th
                rowSpan={3}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#b3c1c7]"
              >
                {`Contract`}
              </th>
              <th
                colSpan={3}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#ffffff]"
              >
                {`Total Entry (MMBTU/d)`}
              </th>
              <th
                colSpan={4}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#b0d7ff]"
              >
                {`Exit (MMBTU/d)`}
              </th>
            </tr>
            <tr>
              <th
                rowSpan={2}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#d4eeb5]"
              >{`East`}</th>
              <th
                rowSpan={2}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#c6f3ef]"
              >{`West`}</th>
              <th
                rowSpan={2}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#f0c4c4]"
              >{`E-W`}</th>
              <th
                colSpan={2}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#d4eeb5]"
              >{`East`}</th>
              <th
                colSpan={2}
                className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#c6f3ef]"
              >{`West`}</th>
            </tr>
            <tr>
              <th className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#ffffff]">{`GSP`}</th>
              <th className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#ffffff]">{`Bypass`}</th>
              <th className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#ffffff]">{`LMPT1`}</th>
              <th className="align-middle justify-center text-center px-4 py-2 border border-black bg-[#ffffff]">{`LMPT2`}</th>
            </tr>
          </thead>
          <tbody className="">
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`01/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`บริษัท ปตท. จำกัด (มหาชน)`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`2022-CLF-018`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`1002149.8917`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`177964.8695`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`744917.1009`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`73.407`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`257159.3838`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`01/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`บริษัท ปตท. จำกัด (มหาชน)`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`2023-CNF-021`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`370757.5333`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`23823.731`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`126237.826`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`01/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`บริษัท ปตท. จำกัด (มหาชน)`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`2023-CSF-015`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`176056.931`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`57097.0685`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`107379.6608`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`0`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`68677.2702`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`01/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`TOTAL: NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`บริษัท ปตท. จำกัด (มหาชน)`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`1548964.356`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`258885.669`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`126237.826`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`01/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`2023-CNF-021`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`199621.77`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`126237.826`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`01/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`TOTAL: NGP-S17-002`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`199621.77`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`126237.826`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`01/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`TOTAL`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`TOTAL`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`1748586.126`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`258885.669`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`126237.826`}</td>
            </tr>
            {/* --- */}
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`02/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`บริษัท ปตท. จำกัด (มหาชน)`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`2022-CLF-018`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`1002149.8917`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`177964.8695`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`744917.1009`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`73.407`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`257159.3838`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`02/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`บริษัท ปตท. จำกัด (มหาชน)`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`2023-CNF-021`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`370757.5333`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`23823.731`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`126237.826`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`02/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`บริษัท ปตท. จำกัด (มหาชน)`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`2023-CSF-015`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`176056.931`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`57097.0685`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`107379.6608`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`0`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`68677.2702`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`02/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`TOTAL: NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`บริษัท ปตท. จำกัด (มหาชน)`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`1548964.356`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`258885.669`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`126237.826`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`02/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`NGP-S16-001`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`2023-CNF-021`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`199621.77`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#ffffff]">{`126237.826`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`02/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`TOTAL: NGP-S17-002`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`199621.77`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#9cfcff]">{`126237.826`}</td>
            </tr>
            <tr>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`02/01/2024`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`TOTAL`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`TOTAL`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`1748586.126`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`258885.669`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`244495.2383`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`24.469`}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{``}</td>
              <td className="border text-left border-black px-4 py-2 bg-[#fffd9c]">{`126237.826`}</td>
            </tr>
            {/* --- */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageExcelCus;
