//var inheritsFrom = function (child, parent) {
  //  child.prototype = Object.create(parent.prototype);
//};

var detail=function(name,email,mobile){
   this.name=name;
   this.email=email;
   this.mobile=mobile;
}
detail.prototype.validate=function(){
   if(this.name==null || this.name=="")
      return false;
   var mail=this.mail;
}
function addstudent()
{
   var studform=document.createElement("form");
   studform.setattribute("method","post");
   studform.setattribute("action","submit.php");

   var linebreak=document.createElement("br");
   studform.appendChild(linebreak);

   var linebreak=document.createElement("br");
   var name=document.createElement("input");
   var nameLabel=document.createElement("label");
   name.setattribute("type","text");
   name.setattribute("name","username");
   name.innerHTML="Name: ";
   studform.appendChild(nameLabel);
   studform.appendChild(name);
   studform.appendChild(linebreak);
 document.getElementById("main").innerHTML="";
   document.getElementById("main").appendChild(studform);

   
}
function addemployee()
{
   window.alert("EEEEE!");
}

function mainfun()
{
   
   var temp=document.getElementById("drop");
   var t=temp.options[temp.selectedIndex].value;
   if(t==1)
      addstudent();
   else
      addemployee();
}