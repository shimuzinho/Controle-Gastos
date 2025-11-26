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
        await mostrarDespezas();
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
    const foto = localStorage.getItem('image');

    if (!categoria) {
        alert('Selecione uma categoria!');
        return;
    }

    if (!categoria || !data || !custo) {
        alert('Todos os campos são necessários!');
        return;
    }

    if (!foto) {
        alert('Tire uma foto da sua despeza!');
        return;
    }

    const despeza = {
        categoria: categoria.value,
        data: data.value,
        custo: custo.value,
        nota: nota.value || 'Sem nota',
        foto,
    }

    const tx = await db.transaction('despezas', 'readwrite');
    const store = tx.objectStore('despezas');
    await store.add(despeza);
    await tx.done;

    categoria.checked = false;
    data.value = '';
    custo.value = '';
    nota.value = '';
    localStorage.removeItem('image');
}

window.removerDespeza = async (id) => {
    const tx = await db.transaction('despezas', 'readwrite');
    const store = tx.objectStore('despezas');
    await store.delete(id);
    await tx.done;

    mostrarDespezas();
}

const mostrarDespezas = async () => {
    if (db === undefined) {
        return;
    }

    const tx = await db.transaction('despezas', 'readonly');
    const store = tx.objectStore('despezas');
    const despezas = await store.getAll();

    if (despezas.length > 0) {

        document.querySelector('#container-movimentacoes').innerHTML += '<h1 class="titulo-movimentacoes">Movimentações</h1><table id="saida"></table>';

        document.querySelector('#container-movimentacoes').classList.add('container-movimentacoes');

        document.getElementById('saida').innerHTML = await despezas.map(el => `
                <div class="item-movimentacao">
                    <div class="categoria-e-nota">
                        <span class="item-movimentacao-categoria">${el.categoria}</span>
                        <span class="item-movimentacao-nota">(${el.nota})</span>
                    </div>
                    <span class="item-movimentacao-data">${el.data}</span>
                    <span class="item-movimentacao-valor">${el.custo}</span>
                    <div class="item-movimentacao-lixeira" onclick="removerDespeza(${el.id});">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 11.6666H8.33333V33.3333C8.33333 34.2173 8.68452 35.0652 9.30964 35.6903C9.93476 36.3154 10.7826 36.6666 11.6667 36.6666H28.3333C29.2174 36.6666 30.0652 36.3154 30.6904 35.6903C31.3155 35.0652 31.6667 34.2173 31.6667 33.3333V11.6666H10ZM16.6667 31.6666H13.3333V16.6666H16.6667V31.6666ZM26.6667 31.6666H23.3333V16.6666H26.6667V31.6666ZM27.6967 6.66659L25 3.33325H15L12.3033 6.66659H5V9.99992H35V6.66659H27.6967Z" fill="#333333"/>
                        </svg>
                    </div>
                </div>
                <div class="linha-divisoria"></div>
            <img src="${el.foto}">
        `).join('');
    } else {
        document.querySelector('.container-movimentacoes').innerHTML = ''; 

        document.querySelector('#container-movimentacoes').classList.remove('container-movimentacoes');
    }
};

window.addEventListener('DOMContentLoaded', async event => {
    criarDB();
    document.querySelector('.adicionarDespeza').addEventListener('click', adicionarDespeza);
});
