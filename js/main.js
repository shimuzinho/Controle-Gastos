if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg = await navigator.serviceWorker.register('/sw.js', { type: 'module' });

            console.log('Service worker registrada!', reg);
        } catch (err) {
            console.log('Service worker não registrada', err);
        }   
    });
}

window.adicionarDespeza = () => {
    const categoria = document.querySelector('input[name="categoria"]:checked');
    const data = document.querySelector('#data').value;
    const custo = document.querySelector('#custo').value;
    const nota = document.querySelector('#nota').value || 'Sem nota';

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
        data,
        custo,
        nota
    }

    console.log(despeza);
}