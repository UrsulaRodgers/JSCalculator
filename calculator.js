$(document).ready(function(){
	
	var entries = [];
	var entryString;
	var decCount = 0;
	var negNumCount = 0;
	
	function displayValues() {
		entryString = entries.join("");
		$("#steps").html(entryString);
	}
	
	function getCalculation() {
		entryString = entries.join("");
		var entryStringMod = entryString.replace("--","+");
		if (entryStringMod.length <=8) {
			$("#entry").html(eval(entryStringMod));
			$("#steps").html("");
			} else {
				var evaluate = eval(entryStringMod);
				$("#entry").html(eval(evaluate.toFixed(8)));
				$("#steps").html("");
			}
	}
	
	function insertNeg() {
		var negAdded = false;
		console.log(entries);
		for (var i=entries.length-1; i > -1; i--) {
		  console.log(entries[i]);
			  if (isNaN(entries[i])){
				  entries.splice(i+1,0,'-');
				  negAdded = true;
				  break;
			  }
		 }
		if (!negAdded) {
			entries.unshift('-');
		}
	}
	
	$("button").click(function(){
		var numeral = $(this).hasClass("numeral");
		var operand = $(this).hasClass("operand");
		var decimal = $(this).attr("id") == "decimal";
		var negNum = $(this).attr("id") == "negNum";
		var equals = $(this).attr("id") == "equals";
		var allClear = $(this).attr("id") == "allClear";
		var clearLast = $(this).attr("id") == "clearLast";
		if (numeral) {
			entries.push(this.id);
			displayValues();
		} else if (operand){
			decCount = 0;
			negNumCount = 0;
			if ($('#'+entries[entries.length-1]).hasClass("numeral")){
				entries.push(this.id);
				displayValues();
			}
		} else if (decimal){
			decCount++;
			if (decCount === 1){
				entries.push(".");
				displayValues();
			}
		} else if (negNum) {
			negNumCount++;
			if (negNumCount === 1) {
				insertNeg();
				displayValues();
			}
			
		} else if (clearLast) {
			entries.pop();
			displayValues();
		} else if (equals) {
			getCalculation();
			$("#clearLast").prop("disabled", true);
			$("#negNum").prop("disabled", true);
			$("#decimal").prop("disabled", true);
			$(".numeral").prop("disabled", true);
			$(".operand").prop("disabled", true);
		} else {
			if (allClear) {
			entries = [];
			negNumCount = 0;
			displayValues();
			$("#entry").html("0");
			$("#clearLast").prop("disabled", false);
			$("#negNum").prop("disabled", false);
			$("#decimal").prop("disabled", false);
			$(".numeral").prop("disabled", false);
			$(".operand").prop("disabled", false);
			}
		} 
	})
	
})
