async function editRow(id) {
  document.getElementById(`eno-${id}`).removeAttribute("readonly");
  document.getElementById(`nm-${id}`).removeAttribute("readonly");
  document.getElementById(`city-${id}`).removeAttribute("readonly");
  document.getElementById(`salary-${id}`).removeAttribute("readonly");

  document.getElementById(`edit-${id}`).style.display = "none";
  document.getElementById(`save-${id}`).style.display = "inline";
}

async function saveRow(id) {
  let carModel = document.getElementById(`eno-${id}`).value;
  let carName = document.getElementById(`nm-${id}`).value;
  let carVariant = document.getElementById(`city-${id}`).value;
  let carPrice = document.getElementById(`salary-${id}`).value;

  if (!carModel || !carName || !carVariant || !carPrice) {
    alert("Please fill in all fields.");
    return;
  }

  let url = `http://localhost:3000/cars/${id}`;

  try {
    let response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        carmodel: carModel,
        carname: carName,
        carvariant: carVariant,
        carprice: carPrice,
      }),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      alert("Data updated");
      dataShow();
    } else {
      throw new Error("Data not updated");
    }
  } catch (error) {
    console.log(error);
    alert("Error occurred while updating");
  }
}

async function myrecRemove(id) {
  let url = `http://localhost:3000/cars/${id}`;

  try {
    let response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Record Deleted");
      dataShow();
    } else {
      throw new Error("Record not deleted");
    }
  } catch (error) {
    console.log(error);
    alert("Error occurred while deleting record");
  }
}

async function dataShow() {
  let myTable = `
    <table>
      <tr>
        <th>Car Model</th>
        <th>Car Name</th>
        <th>Car Variant</th>
        <th>Car Price</th>
        <th>Actions</th>
      </tr>
    `;

  let url = "http://localhost:3000/cars";

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    let myData = await response.json();

    myData.forEach((key) => {
      myTable += `
        <tr>
          <td><input type="text" id="eno-${key.id}" value="${key.carmodel}" readonly></td>
          <td><input type="text" id="nm-${key.id}" value="${key.carname}" readonly></td>
          <td><input type="text" id="city-${key.id}" value="${key.carvariant}" readonly></td>
          <td><input type="text" id="salary-${key.id}" value="${key.carprice}" readonly></td>
          <td>
            <a href="#" onclick="myrecRemove('${key.id}')" class="button button-delete"><i class="fa-solid fa-trash"></i></a>
            <a href="#" onclick="editRow('${key.id}')" id="edit-${key.id}" class="button button-edit"><i class="fa-solid fa-pen-to-square"></i></a>
            <a href="#" onclick="saveRow('${key.id}')" id="save-${key.id}" class="button button-save" style="display:none"><i class="fa-solid fa-floppy-disk"></i></a>
          </td>
        </tr>
      `;
    });
    myTable += `</table>`;
    document.getElementById("demo").innerHTML = myTable;
  } catch (error) {
    console.error(error);
    alert("Error occurred while fetching data");
  }
}

dataShow();
