const fs = require("fs");

fs.copyFileSync("file1.txt", "file2.txt");
//copia il contenuto del file 1 e lo copia in un nuovo file chiamato file2.txt (se non esiste lo crea)
//eseguiamo il file tramite terminale con il comando node index.js
