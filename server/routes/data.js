import express from "express";
import Data from "../model/data.js";
import { transformData } from "../utils/helperFunctions.js";

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

import PDFDocument from "pdfkit";

const dataRouter = express.Router();

dataRouter.get("/get-data", (req, res) => {
  Data.findAll().then((data) => {
    res.send(data);
  });
});

dataRouter.post("/create-data", (req, res) => {
  console.log(req.body);

  const transformedData = transformData(req.body);
  console.log(transformedData);

  //   Data.create({ name: req.body.name }).then((data) => {
  //     res.send(data);
  //   });

  Data.bulkCreate(transformedData)
    .then((data) => {
      res.status(201).send({ data, message: "Data created successfully" });
    })
    .catch((err) => {
      console.error("Error creating data:", err);
      res.status(500).send("An error occurred");
    });
});

dataRouter.get("/download-pdf/:id", async (req, res) => {
  try {
    const data = await Data.findByPk(req.params.id);

    if (!data) {
      return res.status(404).send("Data not found");
    }

    const templatePath = path.resolve("templates", "template.html");
    let templateHtml = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders with actual data
    const placeholders = {
      "{{EmployeeName}}": data.employeeName,
      "{{Designation}}": data.designation,
      "{{Department}}": data.department,
      "{{doj}}": data.doj,
      "{{PAY}}": data.pay,
      "{{GradePay}}": data.gradePay,
      "{{DA}}": data.da,
      "{{HRA}}": data.hra,
      "{{OtherAllow}}": data.otherAllow,
      "{{TotalEarnings}}": data.totalEarnings,
      "{{LeaveLossPay}}": data.leaveOnLossOfPay,
      "{{ProfessionalTax}}": data.professionalTax,
      "{{TDS}}": data.tds,
      "{{OthersDeduction}}": data.othersDeduction,
      "{{TotalDeduction}}": data.totalDeduction,
      "{{NetAmount}}": data.netAmount,
      "{{Month}}": data.month,
      "{{Year}}": data.year,
    };

    for (const [key, value] of Object.entries(placeholders)) {
      templateHtml = templateHtml.replace(new RegExp(key, "g"), value);
    }

    console.log(templateHtml);

    const browser = await puppeteer.launch({
      // Adjust timeout (in milliseconds) as needed
      timeout: 60000, // Example: 60 seconds

      // Run Chrome in headless mode for better performance
      dumpio: true,
      headless: false,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(templateHtml, { waitUntil: "domcontentloaded" });

    console.log("page");
    console.log(page);

    const pdfBuffer = await page.pdf({ format: "A4" });

    console.log("pdfBuffer");
    console.log(pdfBuffer);

    await browser.close();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="payslip-${data.id}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF", error);
    res.status(500).send("Error generating PDF");
  }
});

export default dataRouter;

// with pdfkit
// dataRouter.get("/download-pdf/:id", async (req, res) => {
//   try {
//     const data = await Data.findByPk(req.params.id);

//     if (!data) {
//       return res.status(404).send("Data not found");
//     }

//     const doc = new PDFDocument();

//     let filename = `payslip-${data.id}.pdf`;
//     filename = encodeURIComponent(filename) + ".pdf";

//     res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
//     res.setHeader("Content-type", "application/pdf");

//     doc.pipe(res);

//     // Customize your PDF content here

//     doc.fontSize(18).text(`PaySlip for Employee ID: ${data.id}`);
//     doc.fontSize(12).text(`Employee Name: ${data["employeeName"]}`);
//     doc.fontSize(12).text(`Designation: ${data.designation}`);
//     doc.fontSize(12).text(`Department: ${data.department}`);
//     doc.fontSize(12).text(`Date of Joining: ${data.doj}`);
//     doc.fontSize(12).text(`PAY: ${data.pay}`);
//     // Add more fields as needed

//     doc.end();
//   } catch (error) {
//     console.error("Error generating PDF", error);
//     res.status(500).send("Error generating PDF");
//   }
// });
