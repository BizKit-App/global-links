/// Course creation input
class FroshCourseInput {
    constructor(name, description, topics, goals, textbooks, grading, calendar, level, price, duration, code){
	this.name = name;
	this.description = description;
	this.topics = topics;
	this.goals = goals;
	this.textbooks = textbooks;
	this.grading = grading;
	this.calendar = calendar;
	this.level = level;
	this.price = price;
	this.duration = duration;
	this.code = code;
    }

    /// Validate input
    validate(){
	// TODO:
    }
}

/// errors
const FroshCourseError = {
    InvalidInput: Error('Invalid user input'),
    InternalServer: Error('Internal server error'),
    NotFound: Error('Resource does not exist'),
    Unauthorized: Error('Unauthorized, please login')
};

const FroshCourseAPI = {
    address: "/course",

    /// Submit course
    async add_course(input) {
	if (!input instanceof FroshCourseInput){
	    throw FroshCourseError.InvalidInput;
	}

	// validate input
	input.validate();

	const formData = new FormData();

	formData.append("name", input.name);
	formData.append("description", input.description);
	formData.append("topics", input.topics);
	formData.append("goals", input.goals);
	formData.append("textbooks", input.textbooks);
	formData.append("grading", input.grading);
	formData.append("calendar", input.calendar);
	formData.append("level", input.level);
	formData.append("price", input.price);
	formData.append("duration", input.duration);
	formData.append("code", input.code);

	return fetch(this.address, {
	    method: "POST",
	    body: formData,
	})
	    .then((response) => {
		switch (response.status){
		case 201:
		    return response.json();
		case 400:
		    throw KongError.InvalidInput;
		case 401:
		    throw KongError.Unauthorized;
		case 500:
		    throw KongError.InternalServer;
		}
	    })
	    .catch((error) => {
		throw error;
	    });
    },
};
