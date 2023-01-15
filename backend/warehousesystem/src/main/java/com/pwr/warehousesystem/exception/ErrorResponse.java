package com.pwr.warehousesystem.exception;

public class ErrorResponse extends RuntimeException{

    public ErrorResponse(){
        super();
    }

    public ErrorResponse(String message){
        super(message);
    }
}
