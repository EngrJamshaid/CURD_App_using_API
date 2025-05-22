// Insert Modal
const openFormBtn = document.getElementById('openForm');
const closeFormBtn = document.getElementById('closeForm');
const formContainer = document.getElementById('formContainer');

// Edit Modal
const editFormContainer = document.getElementById('editFormContainer');
const closeEditFormBtn = document.getElementById('closeEditForm');
const editForm = document.getElementById('edit-form-data');

// Open Insert Form
openFormBtn.addEventListener('click', () => {
  formContainer.style.display = 'flex';
});

// Close Insert Form
closeFormBtn.addEventListener('click', () => {
  formContainer.style.display = 'none';
});

// Open Edit Modal on clicking any Edit button
document.querySelectorAll('.edit-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    // You can later use this to fetch data from the row:
    const row = this.closest('tr');
    const name = row.children[1].textContent;
    const age = row.children[2].textContent;
    const city = row.children[3].textContent;

    // Pre-fill form
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-age').value = age;
    document.getElementById('edit-city').value = city;

    editFormContainer.style.display = 'flex';
  });
});

// Close Edit Modal
closeEditFormBtn.addEventListener('click', () => {
  editFormContainer.style.display = 'none';
});
