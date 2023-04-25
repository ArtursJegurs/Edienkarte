const itemForm = document.querySelector('#Form');
const menuTabula = document.querySelector('#Menu tbody');

const db = openDatabase('edienkarte', '1.0', 'Menu Datubaze', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM menu_items', [], function (tx, result) {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            const newRow = menuTabula.insertRow();
            const nameCell = newRow.insertCell();
            const descriptionCell = newRow.insertCell();
            const priceCell = newRow.insertCell();
            nameCell.textContent = row.name;
            descriptionCell.textContent = row.description;
            priceCell.textContent = `$${ row.price }`;
        }
    });
});

    itemForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(itemForm);
    const data = Object.fromEntries(formData.entries());
    const newRow = menuTabula.insertRow();
    const nameCell = newRow.insertCell();
    const descriptionCell = newRow.insertCell();
    const priceCell = newRow.insertCell();

    nameCell.textContent = data.Nosaukums;
    descriptionCell.textContent = data.Apraksts;
    priceCell.textContent = `$${ data.Cena }`;
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)', [
            data.Nosaukums,
            data.Apraksts,
            data.Cena
        ]);
    });
    itemForm.reset();
});