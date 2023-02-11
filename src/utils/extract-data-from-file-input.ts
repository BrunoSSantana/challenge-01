export const convertArrayFromCsvToObject = <T>(dataFromFile: string[]) => {
  return dataFromFile.reduce(
    (listaDeObjetos, currentRow, index, listaCompleta) => {
      const keys = listaCompleta[0].split(",");

      if (index === listaCompleta.length - 1) {
        return [...listaDeObjetos];
      }

      if (index === 0) {
        listaDeObjetos = [];
        return listaDeObjetos;
      }

      const valores = currentRow.split(",");

      const novoObjeto = keys.reduce((objeto, curr, index) => {
        return {
          ...objeto,
          [curr]: valores[index],
        };
      }, {}) as T;

      const resultado = [...listaDeObjetos, novoObjeto];

      return resultado;
    },
    [] as T[]
  );
};

export const handleFileData = (body: string) => {
  return body.split("\r\n").slice(4, -2)[0].split("\n");
};
