import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import axios from "./utils/axios.js";
import "./App.css";
import { trimObjectKeysAndValues } from "./utils/helperFunctions.js";
import DataList from "./components/DataList.js";

function App() {
  const fileRef = useRef();
  const [data, setData] = useState([]);
  const [uploadData, setUploadData] = useState([]);

  console.log(data);

  const handleFileUpload = (e) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = (e) => {
      const data = e.target.result;
      console.log(data);
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      console.log(parsedData);
      // setData(parsedData);
      setUploadData(parsedData);
    };
  };

  const uploadHandler = async () => {
    try {
      // Trim object keys and values
      const data = uploadData.map((data) => trimObjectKeysAndValues(data));

      // Ensure the correct API endpoint is used
      const response = await axios.post("/create-data", data);

      if (!(response.status >= 200 && response.status < 300)) {
        console.error(`Error: received status code ${response.status}`);
        return;
      }
      // Update state with the response data
      setData(response.data.data);
      console.log("Data successfully uploaded and state updated.");
    } catch (error) {
      console.error("Error occurred while uploading data:", error);
    }
  };

  const removeHandler = async () => {
    setData([]);
    setUploadData([]);
    fileRef.current.value = null;
  };

  return (
    <div className="App">
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileRef}
        onChange={handleFileUpload}
      />
      {data.length > 0 && <DataList data={data} />}
      {uploadData.length > 0 && !(data.length > 0) && (
        <button onClick={uploadHandler}>Upload</button>
      )}
      <br />
      <br />
      <button onClick={removeHandler}>Remove</button>
    </div>
  );
}

export default App;

// console.log(
//   uploadData.map((data) => {
//     const item = trimObjectKeysAndValues(data);
//     return {
//       SNO: item["S.NO"],
//       employeeName: item["EmployeeName"],
//       designation: item["Designation"],
//       department: item["Department"],
//       doj: item["doj"],
//       pay: item["PAY"],
//       gradePay: item["GRADEPAY"],
//       da: item["D.A."],
//       hra: item["HRA"],
//       otherAllow: item["Otherallow"],
//       totalEarnings: item["TotalEarnings"],
//       leaveOnLossOfPay: item["LEAVEONLOSsoFPAY"],
//       professionalTax: item["Professionaltax"],
//       tds: item["T.D.S."],
//       othersDeduction: item["Othersdeduction"],
//       totalDeduction: item["Totaldeduction"],
//       netAmount: item["NETAMOUNT"],
//       month: item["Month"],
//       year: item["Year"],
//     };
//   })
// );
