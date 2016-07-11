$(document).ready(function(){
	addForm("sform", "studentTable");
	$("#sform").show();

});

function mainFunc()
{
   
   var temp=document.getElementById("choice");
   var t=temp.options[temp.selectedIndex].value;
   if(t==1)
      addForm("sform", "studentTable");
   else
      addForm("admin","adtable");
}
var Base = function(name, email, mobile){
	this.name=name;
	this.email=email;
	this.mobile=mobile;
}
Base.prototype.validate = function() {

	if (this.name == null || this.name == "") {
        alert("Name must be filled out");
        return false;
    }
    
	var mail = this.email;
    var atpos = mail.indexOf("@");
    var dotpos = mail.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=mail.length) {
        alert("Not a valid e-mail address");
        return false;
    }

    var number = this.mobile;
	var phoneno = /^\d{10}$/;  
  	if(!number.match(phoneno))    
        {  
        alert("Enter a valid Phone Number");  
        return false;  
        }  

  return true;
}

var Student = function(name, email, mobile, course){
	this.name=name;
	this.email=email;
	this.mobile=mobile;
	this.course=course;
}
Student.prototype=Object.create(Base.prototype);

Student.prototype.validate = function() {
    if(Base.prototype.validate.call(this)){
    	if (this.course == null || this.course == "") {
    	    alert("Course must be filled out");
    	    return false;
    	}
    	return true;
	}
    return false;
    
}

var Admin = function(name, email, mobile, dept){
	this.name=name;
	this.email=email;
	this.mobile=mobile;
	this.dept=dept;
}
Admin.prototype=Object.create(Base.prototype);

Admin.prototype.validate = function() {
    if(Base.prototype.validate.call(this)){
    	if (this.dept =="" || this.dept== null) {
    	    alert("Department must be filled out");
    	    return false;
    	}
    	return true;
	}
    return false;
}
function addForm(formname, tablename){
	var f = document.createElement("form");
	f.id=formname;
	f.setAttribute('method',"post");
	if (tablename.localeCompare("studentTable")==0)
		details=[["Your Name : ","student_name"],["Your Email : ","student_email"],["Your Mobile : ","student_mobile"],["Course : ","student_course"]];
	else
		details=[["Your Name : ","admin_name"],["Your Email : ","admin_email"],["Your Mobile : ","admin_mobile"],["Department : ","admin_department"]];
	
	details.forEach(function(item){
		var namelabel = document.createElement('label'); // Create Label for Name Field
		namelabel.innerHTML = item[0]; // Set Field Labels
		f.appendChild(namelabel);
		var nameElement = document.createElement("input");
		nameElement.type = "text";
		nameElement.name = item[1];
		nameElement.id = item[1];
		f.appendChild(nameElement);

		var linebreak = document.createElement('br');
		f.appendChild(linebreak);
		var linebreak = document.createElement('br');
		f.appendChild(linebreak);
	})

	var linebreak = document.createElement('br');
	f.appendChild(linebreak);
	var linebreak = document.createElement('br');
	f.appendChild(linebreak);

	var s = document.createElement("input");
	s.type="button"
	s.value = "Add";
	s.id="addbtn"
	s.onclick = function(){add(formname,tablename,"btnname")};

	f.appendChild(s);

	var r = document.createElement("input");
	r.type="button"
	r.value = "Reset";
	r.id="rbtn"
	r.onclick = function(){reset(formname)};

	f.appendChild(r);

	var s1 = document.createElement("input");
	s1.type="button"
	s1.value = "Update";
	s1.id='btnname'
	s1.style.visibility="hidden";
	

	f.appendChild(s1)
	var tab= document.createElement("table");
	tab.id = tablename;
	tab.style.width  = '100%';
	//tab.setAttribute('border', '1');
	if (tablename.localeCompare("studentTable")==0)
		var heading = ["Name","Email","Mobile","Course","Options"];
	else
		var heading = ["Name","Email","Mobile","Department","Options"];
	var tr = tab.insertRow();

	for (var j = 0; j < 5; j++) {
		var td = tr.insertCell();
        td.appendChild(document.createTextNode(heading[j]));
    }
    
	$(".mainDiv").innerHTML="";
	$(".mainDiv").append(f);
	$(".mainDiv").append(tab);

}
function reset(formname)
{
	$("input").empty();
	/*$("#"+formname).find('input')[0].value="";
	$("#"+formname).find('input')[1].value="";
	$("#"+formname).find('input')[2].value="";
	$("#"+formname).find('input')[3].value="";
	*/
}
function add(formname, tablename,btnname) {
	var name= $("#"+formname).find('input')[0].value;
	var email= $("#"+formname).find('input')[1].value;
	var mobile= $("#"+formname).find('input')[2].value;
	var course= $("#"+formname).find('input')[3].value;
	if (tablename.localeCompare("studentTable")==0)
		var stud = new Student(name,email,mobile,course);
	else
		var stud = new Admin(name,email,mobile,course)
	
	
	if(stud.validate()){
		var table = document.getElementById(tablename);
		var row = table.insertRow(-1);
		
	
		row.insertCell(0).innerHTML = name;
		row.insertCell(1).innerHTML = email;
		row.insertCell(2).innerHTML = mobile;
		row.insertCell(3).innerHTML = course;
		var cell5 = row.insertCell(4);
		var btn = document.createElement("BUTTON");        // Create a <button> element
		btn.innerHTML = 'Edit';
  		btn.onclick = function(){updateS(btn, formname, btnname, tablename)};                                // Append the text to <button>
		cell5.appendChild(btn); 
		//var cell6 = row.insertCell(5);
		var btn1 = document.createElement('button');
  		btn1.innerHTML = 'Remove';
  		btn1.onclick = function(){removeS(btn1, tablename)};
		cell5.appendChild(btn1); 
	}

}

function removeS(e, tablename) {
	var i = e.parentNode.parentNode.rowIndex;
    document.getElementById(tablename).deleteRow(i);
    //$("tablename").deleteRow(i);

}
function updateS(e , formname, btn, tablename) {
	var rowid = e.parentNode.parentNode.rowIndex;
$("#"+formname).find('input')[0].value=$("#"+tablename+'tr:eq(0)').find('td:eq(0)').html();
//$("#"+formname).find('input')[1].value=$("#"+tablename+'tr:eq(1)').find('td:eq(0)').html();
//$("#"+formname).find('input')[2].value=$("#"+tablename+'tr:eq(2)').find('td:eq(0)').html();
//$("#"+formname).find('input')[3].value=$("#"+tablename+'tr:eq(3)').find('td:eq(0)').html();

$("#"+formname).find('input')[0].value=document.getElementById(tablename).rows[rowid].cells[0].innerHTML;
	$("#"+formname).find('input')[1].value=document.getElementById(tablename).rows[rowid].cells[1].innerHTML;
	$("#"+formname).find('input')[2].value=document.getElementById(tablename).rows[rowid].cells[2].innerHTML;
	$("#"+formname).find('input')[3].value=document.getElementById(tablename).rows[rowid].cells[3].innerHTML;

	
	document.getElementById(btn).style.visibility="visible";
	document.getElementById(btn).onclick=function(){updateval(rowid, formname, tablename)};
}
function updateval(e, formname, tablename) {
	var name= $("#"+formname).find('input')[0].value;
	var email= $("#"+formname).find('input')[1].value;
	var mobile= $("#"+formname).find('input')[2].value;
	var course= $("#"+formname).find('input')[3].value;

	if (tablename.localeCompare("studentTable")==0)
		var stud = new Student(name,email,mobile,course);
	else
		var stud = new Admin(name,email,mobile,course)
	
	if(stud.validate()){
		document.getElementById(tablename).rows[e].cells[0].innerHTML=name;
		document.getElementById(tablename).rows[e].cells[1].innerHTML=email;
		document.getElementById(tablename).rows[e].cells[2].innerHTML=mobile;
		document.getElementById(tablename).rows[e].cells[3].innerHTML=course;
	}
}