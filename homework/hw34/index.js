const form = document.getElementById('registration-form');
const table = document.getElementById('registration-data');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent form submission

  const formData = new FormData(form); // get form data
  const tableRow = document.createElement('tr'); // create table row

  formData.forEach((value, key) => {
    const tableData = document.createElement('td'); // create table data cell
    tableData.textContent = value; // set cell text content
    tableRow.appendChild(tableData); // add cell to row
  });

  table.querySelector('tbody').appendChild(tableRow); // add row to table
  form.reset(); // reset form fields
  form.style.display = 'none'; // hide form
  table.style.display = 'table'; // show table
});
