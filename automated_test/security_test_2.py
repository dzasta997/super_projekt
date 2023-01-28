import requests
import random


def main():
    url = "http://localhost:8080"
    warehouse_id = None
    cookies = []

    try:

        # LOG IN AS ADMIN AND  CREATE WAREHOUSE
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

        # SEND REQUEST FOR WAREHOUSE WITH GIVEN ID AND TRY TO PERFORM SQL INJECTION. REQUEST SHOULD NOT RETURN 
        # ANYTHING AS ID WON'T EXIST IN DB, BUT IF SQL INJECTION WORKS, IT SHOULD RETURN THE PREVIOUSLY CREATED
        # WAREHOUSE 

        SQL = "' OR 'TRUE"
        get_warehouse_request = requests.get(url + "/warehouses/" + str(warehouse_id+1) + SQL, cookies=cookies)

        if get_warehouse_request.status_code != 400:
            raise Exception("SHOULDN'T BE ABLE TO PERFORM SQL INJECTION")

        print("TEST PASSED")
    except Exception as e:
        print("TEST FAILED")
        print(e)
    finally:
        # CLEAN UP
        requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

if __name__ == "__main__":
    main()