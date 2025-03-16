// merge_first_dose_cumulative.js

const fs = require("fs");

function mergeData() {
  // Caminhos dos arquivos
  const dataPath = "./data/output/data.json";
  const firstDosePath = "./data/output/first_dose_summary.json";
  const outputPath = "./data/output/merged_data.json";

  // Lê os arquivos JSON
  let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const firstDoseSummary = JSON.parse(fs.readFileSync(firstDosePath, "utf8"));

  // Ordena os registros de data.json em ordem crescente (YYYY-MM-DD permite comparação lexicográfica)
  data.sort((a, b) => a.date.localeCompare(b.date));

  // Variável para armazenar a soma cumulativa das 1ª doses
  let cumulative = 0;

  // Para cada registro, se existir um valor no firstDoseSummary para a data, soma e adiciona o dado cumulativo
  data.forEach((record) => {
    if (firstDoseSummary[record.date]) {
      cumulative += firstDoseSummary[record.date];
    }
    record.first_dose_cumulative = cumulative;
  });

  // (Opcional) Se necessário, ordena os dados de volta em ordem decrescente:
  // data.sort((a, b) => b.date.localeCompare(a.date));

  // Escreve o resultado no arquivo de saída
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`Merged data written to ${outputPath}`);
}

mergeData();
