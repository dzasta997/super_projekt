package com.pwr.warehousesystem.exception;

public class NotEnoughSpaceException extends ErrorResponse{

    public NotEnoughSpaceException(){
        super("not enough space");
    }
}
