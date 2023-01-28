import requests
import random

def main():

    warehouse_id = None
    location_id = None
    code_1 = None
    code_2 = None

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

        # CREATE ITEMS
        code_1 = random.randint(0, 100000)
        code_2 = random.randint(0, 100000)
        json_data_1 = {"code" : code_1, "name": "Item 1", "size": 1, "description": "Test 1"}
        json_data_2 = {"code" : code_2, "name": "Item 2", "size": 0, "description": "Test 2"}
        create_item_1_response = requests.post(url + "/items", json=json_data_1, cookies=cookies)
        create_item_2_response = requests.post(url + "/items", json=json_data_2, cookies=cookies)

        if create_item_1_response.status_code != 200 or create_item_2_response.status_code != 200:
            raise Exception("ITEMS COULDN'T BE CREATED")

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
        location_id = create_location_response.json()["id"]

        if create_location_response.status_code != 200:
            raise Exception("LOCATION COULDN'T BE CREATED")

        # PUT ITEMS IN LOCATION
        
        get_location_response = requests.get(url + "/locations/" + str(location_id), cookies=cookies)
        location_json = get_location_response.json()
        items_json = [{
            "item": {
                "code": code_1
            },
            "quantity": 3
            },
            {
            "item": {
                "code": code_2
            },
            "quantity": 1
            }]
        location_json["items"] = items_json
        put_location_response = requests.post(url + "/locations/edit", json=location_json, cookies=cookies)
        location_json["items"] = None # reset items for later comparison 

        if put_location_response.status_code != 200:
            raise Exception("LOCATION COULDN'T BE UPDATED")
        
        # GET ALL ITEMS ABOUT WITH CODE_1 AND CHECK IF THEY HAVE SUFFICIENT AND CORRECT INFORMATION ABOUT THEIR LOCATION

        get_items_response = requests.get(url + "/items/location/itemcode/" + str(code_1) + "/" + str(warehouse_id), cookies=cookies)
        item_locations = get_items_response.json()

        if len(item_locations) != 1:
            raise Exception("AMOUNT OF ITEMS NOT RIGHT")

        item_location = item_locations[0]
        assigned_location = item_location["location"]

        if assigned_location != location_json:
            raise Exception("ASSIGNED LOCATION DOES NOT HAVE CORRECT INFORMATION")

        # NEGATIVE TEST: DELETE ITEMS WITH CODE_1 FROM ALL LOCATIONS AND CHECK IF DATA ABOUT THEM IS RETURNED - SHOULD BE FALSE
        get_location_response = requests.get(url + "/locations/" + str(location_id), cookies=cookies)
        location_json = get_location_response.json()
        items_json = []
        location_json["items"] = items_json
        put_location_response = requests.post(url + "/locations/edit", json=location_json, cookies=cookies)

        get_items_response = requests.get(url + "/items/location/itemcode/" + str(code_1) + "/" + str(warehouse_id), cookies=cookies)
        item_locations = get_items_response.json()

        if len(item_locations) != 0:
            raise Exception("THERE SHOULDN'T BE ANY ITEMS WITH THIS CODE IN ANY LOCATIONS")

        print("TEST PASSED")

    except Exception as e:
        print("TEST FAILED")
        print(e)

    finally:
        # CLEAN UP
        requests.delete(url + "/locations/" + str(location_id), cookies=cookies)
        requests.delete(url + "/items/" + str(code_1), cookies=cookies)
        requests.delete(url + "/items/" + str(code_2), cookies=cookies)
        requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

if __name__ == "__main__":
    main()