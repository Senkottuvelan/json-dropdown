$(document).ready(function(){
$('#postbtn').click(function(){
  var select = document.getElementById("dropper");
  var length = select.options.length;
for (i = length-1; i >= 0; i--) {
  select.options[i] = null;
}
  $.ajax({
    url:'https://elevate-be-staging.azurewebsites.net/best-of-luck.php',
    type:"POST",
    dataType:'json',
    success:function(data){
      //alert(data);
      var obj = JSON.parse(data);
      var noj=obj.length;
      var dropme="true";
      var subcode="test";

    for(var i=0;i<noj;i++){
    if(obj[i].source=="super"){
      //alert("true");
      obj[i].dropme="false";
      subcode=obj[i].subCode_dept_sem;
      for(var j=0;j<noj;j++){
        if((obj[j].subCode_dept_sem==subcode)&&(obj[j].source=="regular")){
          obj[j].dropme="true";
        }
      }
    }
    else if((obj[i].source=="regular")&&(obj[i].dropme=="true")){
      obj[i].dropme="true";
    }
    else{
      obj[i].dropme="false";
    }
    }

    var select = document.getElementById("dropper");
    for(var i=0; i<noj;i++){
      if(obj[i].dropme=="false"){
        var option = document.createElement("OPTION"),
        mynode=document.createTextNode(obj[i].subject_name);
        option.appendChild(mynode);
        option.setAttribute("value",obj[i].subject_name);
        option.setAttribute("id", obj[i].subCode_dept_sem);
        select.insertBefore(option,select.lastChild);
      }
    }
    //select.style.display="block";
    //document.write(JSON.stringify(obj,null,4));
    }

  });

});
});
