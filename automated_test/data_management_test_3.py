import requests
import random


def main():
    url = "http://localhost:8080"
    warehouse_id = None
    employee_id = None
    code_1 = None
    code_2 = None
    shipping_id = None
    client_id = None

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
        employee_id = create_employee_response.json()["id"]

        if create_employee_response.status_code != 200:
            raise Exception("EMPLOYEE COULDN'T BE CREATED")

        # CREATE ITEMS
        code_1 = random.randint(0, 100000)
        code_2 = random.randint(0, 100000)
        json_data_1 = {"code" : code_1, "name": "Item 1", "size": 1, "description": "Test 1"}
        json_data_2 = {"code" : code_2, "name": "Item 2", "size": 0, "description": "Test 2"}
        create_item_1_response = requests.post(url + "/items", json=json_data_1, cookies=cookies)
        create_item_2_response = requests.post(url + "/items", json=json_data_2, cookies=cookies)

        if create_item_1_response.status_code != 200 or create_item_2_response.status_code != 200:
            raise Exception("ITEMS COULDN'T BE CREATED")

        # CREATE CLIENT

        json_data = {"name": "Nokia", 
        "description": "Software company", 
        "address": {"city": "Wrocław", "zipcode": "52-100", "street": "Nokia street", "number": "40"}}
        create_client_response = requests.post(url + "/clients", json=json_data, cookies=cookies)

        if create_client_response.status_code != 200:
            raise Exception("CLIENT COULDN'T BE CREATED")

        client_id = create_client_response.json()["id"]

        # CREATE SHIPPING

        json_data = {"orderDate": "23/10/2023",
        "warehouse": {"id": warehouse_id},
        "employee": {"id": employee_id},
        "client": {"id": client_id},
        "items": [{"item": {"code": code_1}, "quantity": 100}, {"item": {"code": code_2}, "quantity": 300}]
        }

        create_shipping_response = requests.post(url + "/orders", json=json_data, cookies=cookies)

        if create_shipping_response.status_code != 200:
            raise Exception("SHIPPING COULDN'T BE CREATED")

        shipping_id = create_shipping_response.json()["id"]

        # GET SHIPPING WITH GIVEN ID AND CHECK IF IT EXISTS

        get_shipping_response = requests.get(url + "/orders/" + str(shipping_id), cookies=cookies)

        if get_shipping_response.status_code != 200:
            raise Exception("COULD NOT FIND SHIPPING")

        shipping = get_shipping_response.json()

        if shipping == None or shipping["id"] != shipping_id or shipping["client"]["id"] != client_id or shipping["employee"]["id"] != employee_id or shipping["warehouse"]["id"] != warehouse_id:
            raise Exception("SHIPPING DATA IS CORRUPTED")

        # NEGATIVE TEST: DELETE SHIPPING AND CHECK IF IT'S POSSIBLE TO RETRIEVE ITS DATA - SHOULD BE FALSE

        requests.delete(url + "/orders/" + str(shipping_id), cookies=cookies)
        get_shipping_response = requests.get(url + "/orders/" + str(shipping_id), cookies=cookies)

        if get_shipping_response.status_code != 404:
            raise Exception("SHIPPING SHOULD NOT EXIST")

        print("TEST PASSED")

    except Exception as e:
        print("TEST FAILED")
        print(e)

    finally:
        # CLEAN UP
        requests.delete(url + "/orders/" + str(shipping_id), cookies=cookies)
        requests.delete(url + "/employees/" + str(employee_id), cookies=cookies)
        requests.delete(url + "/items/" + str(code_1), cookies=cookies)
        requests.delete(url + "/items/" + str(code_2), cookies=cookies)
        requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

if __name__ == "__main__":
    main()