import requests
import random


def main():
    url = "http://localhost:8080"
    warehouse_id = None
    employee_id = None
    code = None
    delivery_id = None

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
        code = random.randint(0, 100000)
        json_data = {"code" : code, "name": "Item 1", "size": 1, "description": "Test 1"}
        create_item_response = requests.post(url + "/items", json=json_data, cookies=cookies)

        if create_item_response.status_code != 200:
            raise Exception("ITEMS COULDN'T BE CREATED")

        # CREATE DELIVERY WITH CORRECT DATA

        json_data = {"deliveryDate": "23/10/2023",
        "warehouse": {"id": warehouse_id},
        "employee": {"id": employee_id},
        "items": [{"item": {"code": code}, "quantity": 2}]
        }

        create_delivery_response = requests.post(url + "/deliveries", json=json_data, cookies=cookies)
        delivery_id = create_delivery_response.json()["id"]

        if create_delivery_response.status_code != 200:
            raise Exception("DELIVERY COULDN'T BE CREATED")

        # GET DELIVERY AND TRY TO UPDATE IT WITH INCORRECT DATA - SHOULDN'T BE POSSIBLE

        get_delivery_response = requests.get(url + "/deliveries/" + str(delivery_id), cookies=cookies)
        delivery= get_delivery_response.json()
        json_data = delivery.copy()
        json_data["items"] = [{"item": {"code": code}, "quantity": 21474836480}]
        put_delivery_response = requests.post(url + "/deliveries/edit", json=json_data, cookies=cookies)

        if put_delivery_response.status_code != 400:
            raise Exception("THIS OPERATION SHOULD RESULT IN ERROR")

        # CHECK IF DELIVERY DATA WAS NOT CORRUPTED

        get_delivery_response = requests.get(url + "/deliveries/" + str(delivery_id), cookies=cookies)

        if get_delivery_response.status_code != 200:
            raise Exception("DELIVERY DATA WAS DESTROYED")

        delivery_after = get_delivery_response.json()

        if delivery != delivery_after:
            raise Exception("DELIVERY DATA WAS CORRUPTED")

        print("TEST PASSED")
    except Exception as e:
        print("TEST FAILED")
        print(e)
    finally:
        # CLEAN UP
        requests.delete(url + "/deliveries/" + str(delivery_id), cookies=cookies)
        requests.delete(url + "/employees/" + str(employee_id), cookies=cookies)
        requests.delete(url + "/items/" + str(code), cookies=cookies)
        requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

if __name__ == "__main__":
    main()