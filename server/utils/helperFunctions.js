function transformData(data) {
  return data.map((item) => ({
    SNO: item["S.NO"],
    employeeName: item["EmployeeName"],
    designation: item["Designation"],
    department: item["Department"],
    doj: item["doj"],
    pay: item["PAY"],
    gradePay: item["GRADEPAY"],
    da: item["D.A."],
    hra: item["HRA"],
    otherAllow: item["Otherallow"],
    totalEarnings: item["TotalEarnings"],
    leaveOnLossOfPay: item["LEAVEONLOSSOFPAY"],
    professionalTax: item["Professionaltax"],
    tds: item["T.D.S."],
    othersDeduction: item["Othersdeduction"],
    totalDeduction: item["Totaldeduction"],
    netAmount: item["NETAMOUNT"],
    month: item["Month"],
    year: item["Year"],
  }));
}

export { transformData };
