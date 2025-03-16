const fs = require("fs");

/**
 * Função para classificar a dose de acordo com a descrição.
 * Se a dose for "Única", conta como primeira dose.
 * Caso contrário, tenta extrair um número para identificar:
 *   1 -> first_dose
 *   2 -> second_dose
 *   3 -> third_dose
 *   4 -> fourth_dose
 */
function classifyDose(doseDesc) {
  if (!doseDesc) return undefined;
  const lower = doseDesc.toLowerCase();
  if (lower.includes("única")) return "first_dose";
  const match = doseDesc.match(/(\d+)/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num === 1) return "first_dose";
    if (num === 2) return "second_dose";
    if (num === 3) return "third_dose";
    if (num === 4) return "fourth_dose";
  }
  return undefined;
}

/**
 * Compila os dados gerais:
 * - Para cada dose (first_dose, second_dose, third_dose, fourth_dose), acumula
 *   o número de registros por dia (vacina_dataAplicacao).
 * - Para cada fabricante, acumula o número de doses aplicadas por dia.
 */
function compileData(records) {
  const summary = {
    first_dose: {},
    second_dose: {},
    third_dose: {},
    fourth_dose: {},
    company: {}
  };

  records.forEach(record => {
    const date = record.vacina_dataAplicacao;
    const doseType = classifyDose(record.vacina_descricao_dose);
    const company = record.vacina_fabricante_nome;

    // Incrementa contagem para a dose, se identificada
    if (doseType) {
      summary[doseType][date] = (summary[doseType][date] || 0) + 1;
    }

    // Incrementa contagem por fabricante para a data
    if (company) {
      if (!summary.company[company]) {
        summary.company[company] = {};
      }
      summary.company[company][date] = (summary.company[company][date] || 0) + 1;
    }
  });

  return summary;
}

/**
 * Compila somente os dados referentes à 1ª dose por dia.
 */
function compileFirstDose(records) {
  const firstDose = {};
  records.forEach(record => {
    const date = record.vacina_dataAplicacao;
    const doseType = classifyDose(record.vacina_descricao_dose);
    if (doseType === "first_dose") {
      firstDose[date] = (firstDose[date] || 0) + 1;
    }
  });
  return firstDose;
}

function main() {
  // Lê o arquivo base compilado
  const inputPath = "./data/output/compiled.json";
  const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  // Gera a compilação geral e a de 1ª dose
  const summary = compileData(data);
  const firstDoseSummary = compileFirstDose(data);

  // Garante que a pasta de saída exista
  const outputFolder = "./data/output";
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  // Salva os dois arquivos JSON
  fs.writeFileSync(`${outputFolder}/compiled_summary.json`, JSON.stringify(summary, null, 2));
  fs.writeFileSync(`${outputFolder}/first_dose_summary.json`, JSON.stringify(firstDoseSummary, null, 2));

  console.log("Compilação concluída.");
}

main();

