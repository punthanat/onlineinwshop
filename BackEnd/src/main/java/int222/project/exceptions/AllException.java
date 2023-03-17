package int222.project.exceptions;

public class AllException extends RuntimeException {

	ExceptionResponse.ERROR_CODE errorCode;

	public AllException(ExceptionResponse.ERROR_CODE errorCode, String s) {
		super(s);
		this.errorCode = errorCode;
	}

	public ExceptionResponse.ERROR_CODE getErrorCode() {
		return this.errorCode;
	}

}
