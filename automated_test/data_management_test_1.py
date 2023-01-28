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

        # CREATE ITEMS
        code = random.randint(0, 100000)
        json_data = {"code" : code, "name": "Item 1", "size": 1, "description": "Test 1"}
        create_item_response = requests.post(url + "/items", json=json_data, cookies=cookies)
        requests.post(url + "/items", json=json_data, cookies=cookies)

        if create_item_response.status_code != 200:
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
                "code": code
            },
            "quantity": 3
            }]
        location_json["items"] = items_json
        put_location_response = requests.post(url + "/locations/edit", json=location_json, cookies=cookies)
        location_json["items"] = None # reset items for later comparison 

        if put_location_response.status_code != 200:
            raise Exception("LOCATION COULDN'T BE UPDATED")
        
        # GET ALL ALL INFORMATION ABOUT CREATED LOCATION AND CHECK IF DATA ABOUT ITEMS IS CORRECT

        get_location_response = requests.get(url + "/locations/" + str(location_id), cookies=cookies)

        if get_location_response.status_code != 200:
            raise Exception("COULDN'T GET LOCATION")

        assigned_items = get_location_response.json()["items"]

        if len(assigned_items) != 1:
            raise Exception("THERE SHOULD BE 1 ITEMS ASSIGNED TO THIS LOCATION")

        if assigned_items[0]["item"]["code"] != items_json[0]["item"]["code"] or assigned_items[0]["quantity"] != items_json[0]["quantity"]:
            raise Exception("ITEM DATA IS CORRUPTED")


        # NEGATIVE TEST: DELETE ALL ITEMS IN THIS LOCATION AND TRY TO UPDATE IT WITH INCORRECT QUANTITY OF 
        # ITEMS (MORE THAN CAPACITY ALLOWS). CHECK IF THERE ARE ANY ITEMS IN LOCATION - SHOULD BE FALSE
        
        get_location_response = requests.get(url + "/locations/" + str(location_id), cookies=cookies)
        location_json = get_location_response.json()
        items_json = []
        location_json["items"] = items_json
        put_location_response = requests.post(url + "/locations/edit", json=location_json, cookies=cookies)

        if put_location_response.status_code != 200:
            raise Exception("COUDLN'T DELETE ITEMS")

        get_location_response = requests.get(url + "/locations/" + str(location_id), cookies=cookies)
        location_json = get_location_response.json()
        items_json = [{
            "item": {
                "code": code
            },
            "quantity": 1000
            }]
        location_json["items"] = items_json
        put_location_response = requests.post(url + "/locations/edit", json=location_json, cookies=cookies)

        if put_location_response.status_code != 400:
            raise Exception("UPDATED ITEMS WHEN IT SHOULDN'T UPDATE")

        get_location_response = requests.get(url + "/locations/" + str(location_id), cookies=cookies)
        if get_location_response.status_code != 200:
            raise Exception("COULDN'T GET LOCATION")

        assigned_items = get_location_response.json()["items"]

        if len(assigned_items) != 0:
            raise Exception("THERE SHOULD BE NO ITEMS ASSIGNED TO THIS LOCATION")

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