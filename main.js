$(document).ready(function(){
	$("#student").hide();
	$("#admin").hide();
	$("#studenttab").hide();
	$("#admintab").hide();
});
function makechoice()
	{
		if($( '#choice').val()==1)
			{
				$("#student").show();
				$("#admin").hide();
				$("#studenttab").show();
				$("#admintab").hide()
			}
			else
			{
				$("#student").hide();
				$("#studenttab").hide();
				$("#admin").show();
				$("#admintab").show();
			}	
	}
var common= function(name,age){
	this.name=name;
	this.age=age;
}
var Admin = function(name,age,dept){
	this.name=name;
	this.age=age;
	this.dept=dept;
}
Admin.protoype

var Student = function(name,age,course){
	this.name=name;
	this.email=email;
	this.course=course;
}
function add()
{

}