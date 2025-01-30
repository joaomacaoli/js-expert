const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require("assert");

// IFEE
(async () => {
  // Variáveis criadas nesse bloco, só são válidas durante sua execução
  {
    const filePath = "./mocks/invalid-empty-file.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/invalid-header.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/invalid-five-items.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/valid-three-items.csv";
    const expected = [
      { id: 1, name: "Maria Oliveira", profession: "Professora", age: 80 },
      { id: 2, name: "José da Silva", profession: "Caminhoneiro", age: 84 },
      { id: 3, name: "Zé Augusto", profession: "developer", age: 35 },
    ];
    const result = await File.csvToJSON(filePath);
    assert.deepEqual(result, expected);
  }
})();
