import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
  }

  detail<T extends { id: string }>(table: string, id: string) {
    const data: T[] = this.#database[table] ?? [];

    const [task] = data.filter((element) => element.id === id);

    return task;
  }

  select<T>(table: string, search: Partial<T>) {
    let data = this.#database[table] ?? [];

    const isParameters = Object.values(search).some((value) => value);

    if (isParameters) {
      data = data.filter((row) => {
        const match = Object.entries(search).some(([key, value]) => {
          if (!value) return false;

          return row[key].includes(value);
        });

        return match;
      });
    }

    return data;
  }

  insert<T>(table: string, data: Partial<T>) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update<T>(table: string, id: string, data: Partial<T>) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    const dataFiltered = Object.fromEntries(
      Object.entries(data).filter(([_key, value]) => value !== undefined)
    );

    if (rowIndex > -1) {
      const row = this.#database[table][rowIndex];

      this.#database[table][rowIndex] = { id, ...row, ...dataFiltered };
      this.#persist();
    }
  }

  delete(table: string, id: string) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}

export const database = new Database();
