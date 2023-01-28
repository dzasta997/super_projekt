import requests
import random


def main():
    url = "http://localhost:8080"
    warehouse_id = None
    cookies = []

    try:

        # TRY TO CREATE WAREHOUSE AS NOT LOGGED IN USER - SHOULDN'T BE POSSIBLE
        json_data = {"warehouseName": "Test warehouse " + str(random.randint(0,10000)), 
        "description": "Test description", 
        "address": {"city": "Wrocław", "zipcode": "52-100", "street": "Test street", "number": "10"}}

        create_warehouse_response = requests.post(url + "/warehouses", json=json_data)

        if create_warehouse_response.status_code != 401:
            raise Exception("SHOULDN'T BE AUTHORIZED TO CREATE WAREHOUSE AS ANONYMOUS USER")

        # LOG IN AS EMPLOYEE AND TRY TO CREATE WAREHOUSE - SHOULDN'T BE POSSIBLE
        form_data = {'username': 'employee', 'password': 'pass'}
        auth_response = requests.post(url + "/login", data=form_data)
        cookies = auth_response.cookies

        if auth_response.status_code != 200:
            raise Exception("LOGIN FAILED")

        json_data = {"warehouseName": "Test warehouse " + str(random.randint(0,10000)), 
        "description": "Test description", 
        "address": {"city": "Wrocław", "zipcode": "52-100", "street": "Test street", "number": "10"}}

        create_warehouse_response = requests.post(url + "/warehouses", json=json_data, cookies=cookies)

        if create_warehouse_response.status_code != 403:
            raise Exception("SHOULDN'T BE AUTHORIZED TO CREATE WAREHOUSE AS EMPLOYEE")


        # LOG IN AS MANAGER AND TRY TO CREATE WAREHOUSE - SHOULDN'T BE POSSIBLE
        form_data = {'username': 'manager', 'password': 'pass'}
        auth_response = requests.post(url + "/login", data=form_data)
        cookies = auth_response.cookies

        if auth_response.status_code != 200:
            raise Exception("LOGIN FAILED")

        json_data = {"warehouseName": "Test warehouse " + str(random.randint(0,10000)), 
        "description": "Test description", 
        "address": {"city": "Wrocław", "zipcode": "52-100", "street": "Test street", "number": "10"}}

        create_warehouse_response = requests.post(url + "/warehouses", json=json_data, cookies=cookies)

        if create_warehouse_response.status_code != 403:
            raise Exception("SHOULDN'T BE AUTHORIZED TO CREATE WAREHOUSE AS MANAGER")

        # LOG IN AS ADMIN AND TRY TO CREATE WAREHOUSE
        form_data = {'username': 'admin', 'password': 'pass'}
        auth_response = requests.post(url + "/login", data=form_data)
        cookies = auth_response.cookies

        if auth_response.status_code != 200:
            raise Exception("LOGIN FAILED")

        json_data = {"warehouseName": "Test warehouse " + str(random.randint(0,10000)), 
        "description": "Test description", 
        "address": {"city": "Wrocław", "zipcode": "52-100", "street": "Test street", "number": "10"}}

        create_warehouse_response = requests.post(url + "/warehouses", json=json_data, cookies=cookies)

        if create_warehouse_response.status_code != 200:
            raise Exception("SHOULD BE AUTHORIZED TO CREATE WAREHOUSE AS ADMIN")

        warehouse_id = create_warehouse_response.json()["id"]

        # CHECK IF WAREHOUSE WAS CREATED

        get_warehouse_request = requests.get(url + "/warehouses/" + str(warehouse_id), cookies=cookies)
        
        if get_warehouse_request.status_code != 200:
            raise Exception("WAREHOUSE SHOULD EXIST")
     
        print("TEST PASSED")
    except Exception as e:
        print("TEST FAILED")
        print(e)
    finally:
        # CLEAN UP
        requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

if __name__ == "__main__":
    main()