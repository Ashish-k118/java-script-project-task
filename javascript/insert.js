document.getElementById("btn1").addEventListener("click", myInsert);

function myInsert() {
  let carModel = document.getElementById("cm").value;
  let carName = document.getElementById("cnm").value;
  let carVariant = document.getElementById("cv").value;
  let carPrice = document.getElementById("cp").value;

  let url = "http://localhost:3000/cars";

  fetch(url, {
    method: "POST",

    body: JSON.stringify({
      carmodel: carModel,
      carname: carName,
      carvariant: carVariant,
      carprice: carPrice,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((val) => {
      console.log(val);
      return val.json();
    })

    .then((json) => {
      console.log(json);
      alert("Data saved successfully");
    });
}
