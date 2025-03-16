const fs = require("fs");
const readline = require("readline");

// Função que processa um arquivo CSV e escreve os registros filtrados no writeStream
async function processFile(filePath, writeStream, isFirstRecordRef) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let header = null;

    rl.on("line", (line) => {
      // Divide a linha usando ";" e remove as aspas no início e no fim
      const parts = line.split(";").map((p) => p.replace(/^"|"$/g, ""));
      if (!header) {
        // A primeira linha contém os cabeçalhos
        header = parts;
      } else {
        // Se a linha não tiver todas as colunas, ignora
        if (parts.length < header.length) return;

        let rowObj = {};
        header.forEach((col, index) => {
          rowObj[col] = parts[index];
        });

        // Filtra os registros de ARIQUEMES
        // (Ajuste a coluna caso a cidade seja registrada em outro campo, por exemplo, "estabelecimento_municipio_nome")
        if (
          rowObj["paciente_endereco_nmMunicipio"] &&
          rowObj["paciente_endereco_nmMunicipio"].toUpperCase() === "ARIQUEMES"
        ) {
          // Cria o objeto com os campos desejados
          const record = {
            paciente_idade: rowObj["paciente_idade"],
            vacina_fabricante_nome: rowObj["vacina_fabricante_nome"],
            vacina_dataAplicacao: rowObj["vacina_dataAplicacao"],
            vacina_descricao_dose: rowObj["vacina_descricao_dose"],
          };

          // Se não for o primeiro registro, adiciona uma vírgula antes
          if (!isFirstRecordRef.firstRecord) {
            writeStream.write(",\n" + JSON.stringify(record));
          } else {
            writeStream.write(JSON.stringify(record));
            isFirstRecordRef.firstRecord = false;
          }
        }
      }
    });

    rl.on("close", () => resolve());
    rl.on("error", (err) => reject(err));
  });
}

// Função principal que processa todos os arquivos e escreve os resultados em um JSON
async function processAllFiles() {
  const files = [
    "./data/inputs/part-01-RO.csv",
    "./data/inputs/part-02-RO.csv",
    "./data/inputs/part-03-RO.csv",
    "./data/inputs/part-04-RO.csv",
    "./data/inputs/part-05-RO.csv",
  ];

  // Garante que a pasta de saída exista
  const outputFolder = "./data/output";
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }
  const outputPath = `${outputFolder}/compiled.json`;
  const writeStream = fs.createWriteStream(outputPath);

  // Inicia o JSON com um array
  writeStream.write("[\n");
  // Objeto para controlar se já foi escrito algum registro
  let isFirstRecordRef = { firstRecord: true };

  for (const file of files) {
    console.log(`Processando ${file}...`);
    try {
      await processFile(file, writeStream, isFirstRecordRef);
      console.log(`Registros processados em ${file}`);
    } catch (error) {
      console.error(`Erro ao processar ${file}:`, error);
    }
  }

  // Finaliza o array JSON e fecha o stream
  writeStream.write("\n]");
  writeStream.end();
  console.log(`Dados salvos em ${outputPath}`);
}

processAllFiles().catch(console.error);
