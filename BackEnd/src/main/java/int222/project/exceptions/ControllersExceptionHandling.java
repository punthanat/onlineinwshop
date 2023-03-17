package int222.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ControllersExceptionHandling extends ResponseEntityExceptionHandler {
	@ExceptionHandler(AllException.class)
	public ResponseEntity<Object> handleExceptions(AllException exception, WebRequest webRequest) {
		ExceptionResponse response = new ExceptionResponse(exception.getErrorCode(), exception.getMessage(),
				LocalDateTime.now());
		ResponseEntity<Object> entity = new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		return entity;
	}
}
