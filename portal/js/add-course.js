document.getElementById("POST_BLOG_BTN").addEventListener("click", async () =>{
    let nameInput = document.getElementById("NAME").value;
    let descriptionInput = document.getElementById("DESCRIPTION").value;
    //let topicsInput = document.getElementById("TOPICS").value;
    //let goalsInput = document.getElementById("GOALS").value;
    //let textbooksInput = document.getElementById("TEXTBOOKS");
    //let gradingInput = document.getElementById("GRADING").value;
    let priceInput = document.getElementById("PRICE").value;
    let durationInput = document.getElementById("DURATION").value;
    let codeInput = document.getElementById("CODE").value;
    let price = null;
    let duration = null;

    if (priceInput != ""){
    	try{
    		price = parseFloat(priceInput);
    	} catch(e){
        	infoBox("🙄 Invalid price", "error");
    	}
    }

    if (durationInput != ""){
       duration = durationInput;
    }

    infoBox("📚 please wait... the course is being created", "primary");

    if(nameInput == "" || descriptionInput == "" || codeInput == ""){
	infoBox("🙄 The name, description and code cannot be empty", "error");
    } else{
	try {
	    let input = new FroshCourseInput(nameInput, descriptionInput, [], [], [], null, {weeks: []}, null, price, null, codeInput, durationInput);
	    await FroshCourseAPI.add_course(input);

	    infoBox("😃 Course has been added", "success");
	    document.location.href = '/portal/dashboard.html';
	} catch(e){
	    infoBox(e, "error");
	}
    }
});
