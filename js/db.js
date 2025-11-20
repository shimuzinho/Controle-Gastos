import { openDB } from 'idb';

let db;

async function criarDB() {
    try {
        db = await openDB('bancoDeDados', 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                switch (oldVersion) {
                    case 0:
                    case 1:
                        const store = db.createObjectStore('despezas', {
                            keyPath: 'id'
                        });

                        store.createIndex('id', 'id');
                        showResult('Banco de dados criado!')
                }
            }
        });
        showResult('Banco de dados aberto.')
    } catch (err) {
        showResult('Erro ao criar o banco de dados: ' + err.message)
    }
}