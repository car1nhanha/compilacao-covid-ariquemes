const fs = require("fs");

// epidemiological_week, date, order_for_place, state, city, city_ibge_code, place_type, last_available_confirmed, last_available_confirmed_per_100k_inhabitants, new_confirmed, last_available_deaths, new_deaths, last_available_death_rate, estimated_population, is_last, is_repeated
// 202213, 2022-03-27, 717, RO, Ariquemes, 1100023, city, 22657, 20686.97899, 0, 497, 0, 0.0219, 109523, False, True

// [
//   {
//     "epidemiological_week": 202213,
//     "date": "2022-03-27",
//     "order_for_place": 717,
//     "state": "RO",
//     "city": "Ariquemes",
//     "city_ibge_code": 1100023,
//     "place_type": "city",
//     "last_available_confirmed": 22657,
//     "last_available_confirmed_per_100k_inhabitants": 20686.97899,
//     "new_confirmed": 0,
//     "last_available_deaths": 497,
//     "new_deaths": 0,
//     "last_available_death_rate": 0.0219,
//     "estimated_population": 109523,
//     "is_last": "False",
//     "is_repeated": "True"
//   }
// ]

// Lê o arquivo CSV
const file = fs.readFileSync("../caso_full.csv", "utf8");
console.log("file", JSON.stringify(file).slice(0, 200));

// Separa as linhas e remove possíveis linhas vazias
const lines = file.split("\n").filter((line) => line.trim() !== "");
const data = lines.map((line) => line.trim().split(","));
console.log("data", data[0], data[1], data[2]);

function extractData(csvData) {
  const headers = csvData[0];
  // Itera sobre todas as linhas a partir da segunda (índice 1)
  return csvData.slice(1).map((row) => {
    const rowObj = {};
    headers.forEach((header, index) => {
      rowObj[header] = row[index];
    });
    return {
      date: rowObj["date"],
      amount_confirmed: Number(rowObj["last_available_confirmed"]),
      amount_deaths: Number(rowObj["last_available_deaths"]),
    };
  });
}

function saveData(data) {
  fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 2));
  console.log("Data saved");
}

const dataExtracted = extractData(data);
saveData(dataExtracted);
console.log(dataExtracted);
