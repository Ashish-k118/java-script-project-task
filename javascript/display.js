async function dataShow() {
  let myTable = `
   <table border="2px" width="1000px" bgcolor="lightyellow" align="center" >
          <tr bgcolor="#67b3a3">
            <th>Car Model</th>
            <th> Car Name</th>
            <th>Car Variant</th>
            <th>Car Price</th>
          </tr>
         `;
  let url = "http://localhost:3000/cars";

  let myobj = await fetch(url);
  console.log(myobj);
  let myData = await myobj.json();
  console.log(myData);

  myData.map((key) => {
    myTable += `
         <tr>
          <td>${key.carmodel}</td>
          <td>${key.carname}</td>
          <td>${key.carvariant}</td>
          <td>${key.carprice}</td>
         </tr>
      `;
  });

  myTable += `</table>`;

  document.getElementById("demo").innerHTML = myTable;
}
dataShow();
