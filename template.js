
$(document).ready(function(){
	$("#student").hide();
	$("#admin").hide();
	$("#studenttab").hide();
	$("#admintab").hide();
});
var student={name:"name",age:"age",third:"course",fun1:"add",fun2:"update"};
var admin={name:"name",age:"age",third:"department",fun1:"add",fun2:"update"};
var studenttab={};
var admintab={};
//var studenttab={name:"jack",age:12,third:"cse",fun1:"add",fun2:"update"};
//var admintab={name:"jack",age:12,third:"cse",fun1:"insert",fun2:"edit"};
function makechoice()
	{
		if($( '#choice').val()==1)
			{
				
				tempForm(student);
				tempTable(studenttab);
			}
			else
			{
				
				tempForm(admin);
				tempTable(admintab);
			}	
	}
function tempForm(x)
{
  // Grab the template script
  console.log("hello");
  var theTemplateScript = $("#form-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context=x;
  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.formplace').html(theCompiledHtml);

}
function tempTable(y)
{
	 var theTemplateScript = $("#table-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object

  var context=y;
  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.tableplace').html(theCompiledHtml);

}