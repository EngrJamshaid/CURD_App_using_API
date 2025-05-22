// this file contain the fetch api which fetch backend data using fetch function.
function loadtable() {
  fetch("http://localhost/Rest_Api/Backend/all_user.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      // console.log(result);
      const table_body = document.getElementById("data-table");
      // console.log(table_body);
      table_body.innerHTML = "";
      result.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.city}</td>
        <td><button class="edit-btn" 
                      data-id="${user.id}" 
                      data-name="${user.name}" 
                      data-age="${user.age}" 
                      data-city="${user.city}">Edit</button></td>
                      <td><button class="delete-btn" data-id="${user.id}">Delete</button></td>
       
        `;

        table_body.appendChild(row);
      });
    });
}
loadtable();

// now insert data into database work start using api
document.getElementById("form-data").addEventListener("submit", function (e) 
{
  e.preventDefault(); //stop default form submission
  const name = document.getElementById("name").value.trim();
  //   console.log(name);
  const age = document.getElementById("age").value.trim();
  //   console.log(age);
  const city = document.getElementById("city").value.trim();
  //   console.log(city);

  // Validate
  if (!name || !age || !city) {
    alert("Please fill in all fields.");
    return;
  }

  //   prepare data object
  const formData = {
    name: name,
    age: age,
    city: city,
  };
  // Send data using fetch API
  fetch("http://localhost/Rest_Api/Backend/create.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (result.status) {
        alert("Data Inserted Successfully!");
        document.getElementById("form-data").reset();
        document.getElementById("formContainer").style.display = "none";
        loadtable();
      } else {
        alert("Failed to insert data.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    });
});



// update record

// 1. Edit button click par modal open kar ke data populate karna

document.addEventListener("click",function(e){
    if(e.target.classList.contains("edit-btn")){
    const id = e.target.getAttribute("data-id");
    const name = e.target.getAttribute("data-name");
    const age = e.target.getAttribute("data-age");
    const city = e.target.getAttribute("data-city");

         // Modal inputs me data bhar do
    document.getElementById("edit-name").value = name;
    document.getElementById("edit-age").value = age;
    document.getElementById("edit-city").value = city;

    // Update form me id attribute set karo
    document.getElementById("edit-form-data").setAttribute("data-id", id);

    // Modal dikhado
    document.getElementById("editFormContainer").style.display = "block";

    }
// update form submit handler
document.getElementById('edit-form-data').addEventListener('submit',function(e){
    e.preventDefault();
 const form = this;
      const id = form.getAttribute("data-id");
  const name = document.getElementById("edit-name").value.trim();
  const age = document.getElementById("edit-age").value.trim();
  const city = document.getElementById("edit-city").value.trim();

  if (!name || !age || !city) {
    alert("Please fill in all fields.");
    return;
  }


  const updatedData = {
    sid: id,
    name: name,
    age: age,
    city: city,
  };

  fetch("http://localhost/Rest_Api/Backend/update.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
  .then(function(response){
    return response.json();
  })
  .then(function(result){
    if(result.status){
        // alert('Data Updated Sucessfully');
        form.reset();
        document.getElementById("editFormContainer").style.display = "none"; // Modal hide
        loadtable(); 
    }else{
      alert("Failed to update data.");  
    }
  })   
   .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong.");
    });


})

});




// delete Record
// DELETE RECORD
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");

    if (confirm("Are you sure you want to delete this record?")) {
      fetch("http://localhost/Rest_Api/Backend/delete.php", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid: id }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status) {
            // Record deleted successfully
        
            loadtable(); // Reload table after deletion
            alert("Record deleted successfully!", "success");
          } else {
            alert("Failed to delete the record.", "error");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Something went wrong.", "error");
        });
    }
  }
});
