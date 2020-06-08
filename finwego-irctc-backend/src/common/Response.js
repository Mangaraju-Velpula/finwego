class Response {
	constructor(status, response) {
		this.status = status;
		this.response = response;
	}

	setStatus(status) {
		this.status = status;
	}

	getStatus() {
		return this.status;
	}

	setResponse(response) {
		this.response = response;
	}

	getResponse() {
		return this.response;
	}
}
export default Response;
