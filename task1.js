var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};
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
inheritsFrom(Student, Base);

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

var Employee = function(name, email, mobile, salary){
	this.name=name;
	this.email=email;
	this.mobile=mobile;
	this.salary=salary;
}
inheritsFrom(Employee, Base);

Employee.prototype.validate = function() {
    if(Base.prototype.validate.call(this)){
    	if (isNaN(this.salary) || this.salary =="" || this.salary== null) {
    	    alert("Salary must be filled out with Numbers");
    	    return false;
    	}
    	return true;
	}
    return false;
}

function mainFunc() {
	var selectBox = document.getElementById("selectBox");
	var selectedValue= selectBox.options[selectBox.selectedIndex].value;
	if (selectedValue.localeCompare("student")==0)
		addForm("sform", "studentTable", "studentudatebtn");
	else
		addForm("eform","employeeTable", "employeeupdatebtn");
}
function removeS(e, tablename) {
	var i = e.parentNode.parentNode.rowIndex;
    document.getElementById(tablename).deleteRow(i);


}
function updateS(e , formname, btn, tablename) {
	var rowid = e.parentNode.parentNode.rowIndex;

	document.getElementById(formname).elements[0].value=document.getElementById(tablename).rows[rowid].cells[0].innerHTML;
	document.getElementById(formname).elements[1].value=document.getElementById(tablename).rows[rowid].cells[1].innerHTML;
	document.getElementById(formname).elements[2].value=document.getElementById(tablename).rows[rowid].cells[2].innerHTML;
	document.getElementById(formname).elements[3].value=document.getElementById(tablename).rows[rowid].cells[3].innerHTML;

	
	document.getElementById(btn).style.visibility="visible";
	document.getElementById(btn).onclick=function(){updateval(rowid, formname, tablename)};
}
function updateval(e, formname, tablename) {
	var name= document.getElementById(formname).elements[0].value;
	var email= document.getElementById(formname).elements[1].value;
	var mobile= document.getElementById(formname).elements[2].value;
	var course= document.getElementById(formname).elements[3].value;

	if (tablename.localeCompare("studentTable")==0)
		var stud = new Student(name,email,mobile,course);
	else
		var stud = new Employee(name,email,mobile,course)
	
	if(stud.validate()){
		document.getElementById(tablename).rows[e].cells[0].innerHTML=name;
		document.getElementById(tablename).rows[e].cells[1].innerHTML=email;
		document.getElementById(tablename).rows[e].cells[2].innerHTML=mobile;
		document.getElementById(tablename).rows[e].cells[3].innerHTML=course;
	}

}
function add(formname, tablename, btnname ) {
	var name= document.getElementById(formname).elements[0].value;
	var email= document.getElementById(formname).elements[1].value;
	var mobile= document.getElementById(formname).elements[2].value;
	var course= document.getElementById(formname).elements[3].value;
	if (tablename.localeCompare("studentTable")==0)
		var stud = new Student(name,email,mobile,course);
	else
		var stud = new Employee(name,email,mobile,course)
	
	
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
		var btn1 = document.createElement('button');
  btn1.innerHTML = 'Remove';
  btn1.onclick = function(){removeS(btn1, tablename)};
  
		cell5.appendChild(btn1); 
	}

}

function addForm(formname, tablename, btnname){
	var f = document.createElement("form");
	f.id=formname;
	f.setAttribute('method',"post");
	if (tablename.localeCompare("studentTable")==0)
		details=[["Your Name : ","student_name"],["Your Email : ","student_email"],["Your Mobile : ","student_mobile"],["Course : ","student_course"]];
	else
		details=[["Your Name : ","employee_name"],["Your Email : ","employee_email"],["Your Mobile : ","employee_mobile"],["Salary : ","employee_salary"]];
	
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
	s.onclick = function(){add(formname,tablename,btnname)};

	f.appendChild(s);

	var s1 = document.createElement("input");
	s1.type="button"
	s1.value = "Update";
	s1.id=btnname
	s1.style.visibility="hidden";
	

	f.appendChild(s1)
	var tab= document.createElement("table");
	tab.id = tablename;
	tab.style.width  = '100%';
	tab.setAttribute('border', '1');
	if (tablename.localeCompare("studentTable")==0)
		var heading = ["Name","Email","Mobile","Course","Options"];
	else
		var heading = ["Name","Email","Mobile","Salary","Options"];
	var tr = tab.insertRow();

	for (var j = 0; j < 5; j++) {
		var td = tr.insertCell();
        td.appendChild(document.createTextNode(heading[j]));
    }
    
	document.getElementById("mainDiv").innerHTML="";
	document.getElementById("mainDiv").appendChild(f);
	document.getElementById("mainDiv").appendChild(tab);

}

