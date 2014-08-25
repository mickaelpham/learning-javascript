(function (window, document) {

  var theTable = document.getElementById("the-table");
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numRows = 10;

  // Table caption
  var theCaption = theTable.createCaption();
  theCaption.appendChild(document.createTextNode("Hover the Grid!"));

  // Table headers
  var theHeaders = theTable.createTHead().insertRow(0);
  for (var i = 0; i < chars.length; i++)
    theHeaders.insertCell(i).appendChild(document.createTextNode(chars[i]));

  // Table content
  var theBody = document.createElement("tbody");
  theTable.appendChild(theBody);
  for (var row = 0; row < numRows; row++) {
    var theRow = theBody.insertRow(row);
    for (var col = 0; col < chars.length; col++) {
      var theCell = theRow.insertCell(col);
      theCell.appendChild(document.createTextNode(chars[col] + row));
      // Cell selection on click event
      theCell.addEventListener("click", function (currentCell) {
        return function () {
          currentCell.classList.toggle("cell-selected");
        };
      }(theCell), false);
      // Column hovering on cell mouse enter
      theCell.addEventListener("mouseenter", function (currentCol) {
        return function () {
          for (var i = 0; i < theTable.tBodies[0].rows.length; i++) {
            var row = theTable.tBodies[0].rows[i];
            row.cells[currentCol].classList.add("current-column");
          }
        };
      }(col), false);
      // Remove the class on mouse exit
      theCell.addEventListener("mouseleave", function (currentCol) {
        return function () {
          for (var i = 0; i < theTable.tBodies[0].rows.length; i++) {
            var row = theTable.tBodies[0].rows[i];
            row.cells[currentCol].classList.remove("current-column");
          }
        };
      }(col), false);
    }
  }

}(this, this.document));