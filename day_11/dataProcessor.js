#!/usr/bin/env node

const reader = require('xlsx');

const filePath = 'employee_data_.xlsx';

const computeBonus = (salary) => {
  if (salary < 50000) {
    return {BonusPercentage: '5%', BonusAmount: salary.AnnualSalary* 0.05};
  } else if (salary < 100000) {
    return {BonusPercentage: '7%', BonusAmount: salary.AnnualSalary * 0.07};
  } else {
    return {BonusPercentage: '10%', BonusAmount: salary.AnnualSalary * 0.1};
  }
}

const writeData = (data, fileName, sheet) => {
  const worksheet = reader.utils.json_to_sheet(data);
  const file = reader.utils.book_new();
  reader.utils.book_append_sheet(file, worksheet, sheet);
  reader.writeFile(file, fileName);
};

try {
  const file = reader.readFile(filePath);

  let data = [];
  const sheets = file.SheetNames;

  for (let i=0; i<sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[i]]
    );
    temp.forEach((res) => {
      data.push(res);
    });
  }
  data = data.map((employee) => ({...employee, ...computeBonus(employee)}));
  console.log(data);
  writeData(data, './new_file.xlsx', 'sheet1');
} catch (err) {
  console.error("Error reading the file", err);
}
