function ErrorHandler(
  err,
  _req,
  res,
  _next
) {
  const errStatus = err.statusCode || 500;
  const errMessage = err.message || "Erro interno no servidor";
  res.status(errStatus).json({
    error: err.name,
    status: errStatus,
    message: errMessage,
  });
}

export default ErrorHandler;
