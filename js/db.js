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
                            keyPath: 'id',
                            autoIncrement: true
                        });

                        store.createIndex('id', 'id');
                        console.log('Banco de dados criado!')
                }
            }
        });
        console.log('Banco de dados aberto.')
    } catch (err) {
        console.log('Erro ao criar o banco de dados: ' + err.message)
    }
}

const adicionarDespeza = async () => {
    const categoria = document.querySelector('input[name="categoria"]:checked');
    const data = document.querySelector('#data');
    const custo = document.querySelector('#custo');
    const nota = document.querySelector('#nota');

    if (!categoria) {
        alert('Selecione uma categoria!');
        return;
    }

    if (!categoria || !data || !custo) {
        alert('Todos os campos são necessários!');
        return;
    }

    const despeza = {
        categoria: categoria.value,
        data: data.value,
        custo: custo.value,
        nota: nota.value || 'Sem nota'
    }

    const tx = await db.transaction('despezas', 'readwrite');
    const store = tx.objectStore('despezas');
    store.add(despeza);
    await tx.done;

    categoria.checked = false;
    data.value = '';
    custo.value = '';
    nota.value = '';
}

const buscarTodasDespezas = async () => {
    if (db === undefined) {
        return;
    }

    const tx = await db.transaction('despezas', 'readonly');
    const store = tx.objectStore('despezas');
    const despezas = await store.getAll();

    console.log(JSON.stringify(despezas));
}

window.addEventListener('DOMContentLoaded', async event => {
    criarDB();
    document.querySelector('.adicionarDespeza').addEventListener('click', adicionarDespeza);
    document.querySelector('.buscarDespezas').addEventListener('click', buscarTodasDespezas);
});
