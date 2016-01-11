$(document).ready(function()
{
      $.get("/agencja/rest/klub/getAllProducts", function(data, textStatus)
      {
              var table = document.getElementById('presentationTable');

              for(var i in data) {
                    var row = document.createElement("tr");

                    var cellID = document.createElement("td");
                    var cellIDText = document.createTextNode(data[i].idKlub);
                    var cellProductType = document.createElement("td");
                    var cellProductTypeText = document.createTextNode(data[i].productType);
                    var cellManufacturer = document.createElement("td");
                    var cellManufacturerText = document.createTextNode(data[i].manufacturer);
                    var cellModel = document.createElement("td");
                    var cellModelText = document.createTextNode(data[i].model);
                    var cellPrice = document.createElement("td");
                    var cellPriceText = document.createTextNode(data[i].price);

                    cellID.appendChild(cellIDText);
                    cellProductType.appendChild(cellProductTypeText);
                    cellManufacturer.appendChild(cellManufacturerText);
                    cellModel.appendChild(cellModelText);
                    cellPrice.appendChild(cellPriceText);

                    //Operation cells:

                    //Read:
                    var cellRead = document.createElement("td");
                    var cellReadLink = document.createElement("a");

                    var cellReadPicture = document.createElement("img");
                    cellReadPicture.setAttribute('src', '/agencja/graphics/preview.png');

                    cellReadLink.appendChild(cellReadPicture);
                    cellReadLink.href = "../../agencja/operations/klub/readKlub.html?id=" + data[i].idKlub;
                    cellRead.appendChild(cellReadLink);

                    //Update:
                    var cellUpdate = document.createElement("td");
                    var cellUpdateLink = document.createElement("a");

                    var cellUpdatePicture = document.createElement("img");
                    cellUpdatePicture.setAttribute('src', '/agencja/graphics/edit.png');

                    cellUpdateLink.appendChild(cellUpdatePicture);
                    cellUpdateLink.href = "../../agencja/operations/klub/updateKlub.html?id=" + data[i].idKlub;
                    cellUpdate.appendChild(cellUpdateLink);

                    //Delete:
                    var cellDelete = document.createElement("td");
                    var cellDeleteLink = document.createElement("a");

                    var cellDeletePicture = document.createElement("img");
                    cellDeletePicture.setAttribute('src', '/agencja/graphics/delete.png');

                    cellDeleteLink.appendChild(cellDeletePicture);
                    cellDeleteLink.href = "../../agencja/operations/klub/deleteKlub.html?id=" + data[i].idKlub;
                    cellDelete.appendChild(cellDeleteLink);

                    row.appendChild(cellID);
                    row.appendChild(cellProductType);
                    row.appendChild(cellManufacturer);
                    row.appendChild(cellModel);
                    row.appendChild(cellPrice);
                    row.appendChild(cellRead);
                    row.appendChild(cellUpdate);
                    row.appendChild(cellDelete);

                    table.appendChild(row);
              }
      });
});