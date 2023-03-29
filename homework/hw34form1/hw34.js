const form = document.getElementById('registration-form');
const table = document.getElementById('registration-data');

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = new FormData(form); 
    const tableRow = document.createElement('tr'); 

    formData.forEach((value) => {
        const tableData = document.createElement('td'); 
        tableData.textContent = value; 
        tableRow.appendChild(tableData); 
    });

    table.querySelector('tbody').appendChild(tableRow);
    form.reset();
    form.style.display = 'none';
    table.style.display = 'table';
});
