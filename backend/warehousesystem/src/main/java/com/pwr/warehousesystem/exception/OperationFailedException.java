package com.pwr.warehousesystem.exception;

public class OperationFailedException extends ErrorResponse{

    public OperationFailedException(){
        super("operation failed");
    }
}
