package com.pwr.warehousesystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ElementNotFoundException extends ErrorResponse{
    public ElementNotFoundException(){
        super("Element does not exist");
    }

}
