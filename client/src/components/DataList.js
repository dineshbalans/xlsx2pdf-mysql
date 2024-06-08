import React from "react";
import axios from "../utils/axios";

const DataList = ({ data }) => {
  const downloadPDF = async (rowData) => {
    try {
      const response = await axios.get(`/download-pdf/${rowData.id}`, {
        responseType: "blob", // important
      });

      const contentDisposition = response.headers["content-disposition"];
      console.log("Content-Disposition header:", contentDisposition);

      console.log(rowData);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `PAYSLIP-${rowData.employeeName}-${rowData.id}.pdf`
      ); // or the actual filename
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("There was an error downloading the PDF!", error);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
            <button onClick={() => downloadPDF(row)}>Download PDF</button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataList;
