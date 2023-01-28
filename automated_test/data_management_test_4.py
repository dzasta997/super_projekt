import requests
import random


def main():
    url = "http://localhost:8080"
    warehouse_id = None
    employee_id = None
    location_id = None

    try:
        # LOG IN
        form_data = {'username': 'admin', 'password': 'pass'}
        auth_response = requests.post(url + "/login", data=form_data)
        cookies = auth_response.cookies

        if auth_response.status_code != 200:
            raise Exception("LOGIN FAILED")

        # CREATE WAREHOUSE AS ADMIN
        json_data = {"warehouseName": "Test warehouse " + str(random.randint(0,10000)), 
        "description": "Test description", 
        "address": {"city": "Wrocław", "zipcode": "52-100", "street": "Test street", "number": "10"}}

        create_warehouse_response = requests.post(url + "/warehouses", json=json_data, cookies=cookies)
        warehouse_id = create_warehouse_response.json()["id"]

        if create_warehouse_response.status_code != 200:
            raise Exception("WAREHOUSE COULDN'T BE CREATED")

        # CREATE EMPLOYEE
        json_data = {"name" : "Bob", "warehouse": {"id": warehouse_id}}
        create_employee_response = requests.post(url + "/employees", json=json_data, cookies=cookies)

        if create_employee_response.status_code != 200:
            raise Exception("EMPLOYEE COULDN'T BE CREATED")

        employee_id = create_employee_response.json()["id"]

        # CREATE LOCATION
        json_data = {"rack": 20,
                    "alley": 20,
                    "capacity": 100,
                    "availability": 1,
                    "description": "Test 1",
                    "warehouse" : {
                        "id": warehouse_id
                    }}        
        create_location_response = requests.post(url + "/locations", json=json_data, cookies=cookies)

        if create_location_response.status_code != 200:
            raise Exception("LOCATION COULDN'T BE CREATED")

        location_id = create_location_response.json()["id"]

        # CHECK IF ALL NECESSARY DATA WAS REGISTERED

        get_warehouse_request = requests.get(url + "/warehouses/" + str(warehouse_id), cookies=cookies)
        get_location_request = requests.get(url + "/locations/" + str(location_id), cookies=cookies)
        get_employee_request = requests.get(url + "/employees/" + str(employee_id), cookies=cookies)

        if get_warehouse_request.status_code != 200 or get_location_request.status_code != 200 or get_employee_request.status_code != 200:
            raise Exception("LOCATION COULDN'T BE CREATED")   

        warehouse = get_warehouse_request.json()
        location = get_location_request.json()
        employee = get_employee_request.json()

        if location["warehouse"] != warehouse or employee["warehouse"] != warehouse:
            raise Exception("DATA WAS NOT REGISTERED CORRECTLY")


        # NEGATIVE TEST: DELETE WAREHOUSE AND CHECK IF DATA IS STILL REGISTERED - SHOULD BE FALSE

        delete_warehouse_request = requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

        if delete_warehouse_request.status_code != 204:
            raise Exception("COULDN'T DELETE WAREHOUSE")

        get_warehouse_request = requests.get(url + "/warehouses/" + str(warehouse_id), cookies=cookies)
        get_location_request = requests.get(url + "/locations/" + str(location_id), cookies=cookies)
        get_employee_request = requests.get(url + "/employees/" + str(employee_id), cookies=cookies)

        if get_warehouse_request.status_code != 404 or get_location_request.status_code != 404 or get_employee_request.status_code != 404:
            raise Exception("THIS DATA SHOULDN'T EXIST") 

        print("TEST PASSED")

    except Exception as e:
        print("TEST FAILED")
        print(e)

    finally:
        # CLEAN UP
        requests.delete(url + "/employees/" + str(employee_id), cookies=cookies)
        requests.delete(url + "/items/" + str(location_id), cookies=cookies)
        requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

if __name__ == "__main__":
    main()