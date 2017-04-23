function MenuChoice(){
      if (document.getElementById("menu").value == "Display Category List")     {
            document.getElementById("section1").style.display = "block";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "none";
            document.getElementById("section4").style.display = "none";
            document.getElementById("section5").style.display = "none";
            }

      else if (document.getElementById("menu").value == "Add a Product Category"){
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "block";
            document.getElementById("section3").style.display = "none";
            document.getElementById("section4").style.display = "none";
            document.getElementById("section5").style.display = "none";
        }

      else if (document.getElementById("menu").value == "Change Category Description"){
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "block";
            document.getElementById("section4").style.display = "none";
            document.getElementById("section5").style.display = "none";
        }

      else if (document.getElementById("menu").value == "Delete a Category"){
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "none";
            document.getElementById("section4").style.display = "block";
            document.getElementById("section5").style.display = "none";
        }
      else if (document.getElementById("menu").value == "About Me"){
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "none";
            document.getElementById("section4").style.display = "none";
            document.getElementById("section5").style.display = "block";
        }
      else     {
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "none";
            document.getElementById("section4").style.display = "none";
            document.getElementById("section5").style.display = "none";
        }
}

function CategoryList(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
      
      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateList(output);
            }
      }
      objRequest.open("GET", url, true);
      objRequest.send();
}

function GenerateList(result){
      var count = 0;
      var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
      
      for(count = 0; count < result.GetAllCategoriesResult.length; count++){
            displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>"+ result.GetAllCategoriesResult[count].CDescription+"</td></tr>";  
      }
      displaytext += "</table>";
      document.getElementById("Categorylist").innerHTML = displaytext;
}

function AddCategory(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";

      var categoryid =document.getElementById("catname").value;
      var categorydesc =document.getElementById("catdesc").value;

      var newcategory = '{"CName":"' + categoryid + '","CDescription":"' + categorydesc +'"}';

      objRequest.onreadystatechange = function(){
             if (objRequest.readyState == 4 && objRequest.status == 200){
                  var result = JSON.parse(objRequest.responseText);
                  if (result.WasSuccessful == 1)     {
                        document.getElementById("result1").innerHTML = "The operation was successful!";
                  }
                  else{
                        document.getElementById("result1").innerHTML = "The operation was not successful!";
                  }
            }
      }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send(newcategory);
}



function ChangeDescription(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";

      var cID = document.getElementById("catID").value;
      var cDesc = document.getElementById("catDesc2").value;


      var updateorder = '{"CID":"' + cID + '","CDescription":"' + cDesc +'"}';

      objRequest.onreadystatechange = function(){
             if (objRequest.readyState == 4 && objRequest.status == 200){
                  var result = JSON.parse(objRequest.responseText);
                  if (result.WasSuccessful == 1)     {
                        document.getElementById("result2").innerHTML = "The operation was successful!";
                  }
                  else if(result.WasSuccessful === 0){
                        document.getElementById("result2").innerHTML = "The operation failed with an unspecified error.";
                  }
                  else if(result.WasSuccessful == -2){
                        document.getElementById("result2").innerHTML = "The operation failed because the data string supplied could not be deserialized into the service object.";
                  }
                  else if(result.WasSuccessful == -3){
                        document.getElementById("result2").innerHTML = "The operation failed because a record with the supplied Order ID could not be found.";
                  }
                   else{
                        document.getElementById("result2").innerHTML = "The operation was not successful!";
                  }
            }           
            }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send(updateorder);
      }
      
function DeleteCategory(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
      url += document.getElementById("catID2").value;
      var x = confirm("Are you sure you want to delete this user?");


      objRequest.onreadystatechange = function(){
             if (objRequest.readyState == 4 && objRequest.status == 200){
                  var result = JSON.parse(objRequest.responseText);
                  if(x === true){
                        if (result.DeleteCategoryResult.WasSuccessful == 1)     {
                              document.getElementById("result3").innerHTML = "The operation was successful!";
                        }
                        else{
                              document.getElementById("result3").innerHTML = "The operation was not successful!" + "<br>" + result.Exception;
                        }
                  }
            }
      }
        objRequest.open("GET", url, true);
        objRequest.send();
      
}

