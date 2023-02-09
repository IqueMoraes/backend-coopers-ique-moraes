class RequestError extends Error {
  statusCode;
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default RequestError;
