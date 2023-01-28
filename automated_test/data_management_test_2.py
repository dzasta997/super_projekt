import requests
import random

def main():

    warehouse_id = None
    location_id = None
    code = None

    try:
        url = "http://localhost:8080"

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

        # CREATE LOCATION IN WAREHOUSE

        json_data = {"rack": 20,
                    "alley": 20,
                    "capacity": 100,
                    "availability": 1,
                    "description": "Test 1",
                    "warehouse" : {
                        "id": warehouse_id
                    }}

        create_location_response = requests.post(url + "/locations", json=json_data, cookies=cookies)
        location = create_location_response.json()
        location_id = create_location_response.json()["id"]

        if create_location_response.status_code != 200:
            raise Exception("LOCATION COULDN'T BE CREATED")
        
        # GET ALL ALL INFORMATION ABOUT CREATED EMPTY LOCATION AND CHECK IF IT IS CORRECT AND THERE ARE NO ITEMS

        get_location_response = requests.get(url + "/locations/" + str(location_id), cookies=cookies)

        if get_location_response.status_code != 200:
            raise Exception("COULDN'T GET LOCATION")

        response_location = get_location_response.json()
        assigned_items = get_location_response.json()["items"]

        if response_location["rack"] != location["rack"] or response_location["alley"] != location["alley"]:
            raise Exception("LOCATION DATA WAS CORRUPTED")

        if len(assigned_items) != 0:
            raise Exception("THERE SHOULDN'T BE NO ITEMS ASSIGNED TO THIS LOCATION")

        # NEGATIVE TEST: DELETE LOCATION AND CHECK IF DATA ABOUT IT CAN BE RETRIEVED - SHOULD BE FALSE

        requests.delete(url + "/locations/" + str(location_id), cookies=cookies)
        get_location_response = requests.get(url + "/locations/" + str(location_id), cookies=cookies)

        if get_location_response.status_code != 404:
            raise Exception("LOCATION SHOULDN'T EXIST")

        print("TEST PASSED")

    except Exception as e:
        print("TEST FAILED")
        print(e)

    finally:
        # CLEAN UP
        requests.delete(url + "/locations/" + str(location_id), cookies=cookies)
        requests.delete(url + "/items/" + str(code), cookies=cookies)
        requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

if __name__ == "__main__":
    main()