import requests
import random


def main():
    url = "http://localhost:8080"
    warehouse_id = None
    employee_id = None
    codes = [random.randint(0, 100000) for _ in range(100)]
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
        request_list = []

        for code in codes:
            json_data = {"code": code, "name": "Item " + str(code), "size": 1, "desciption": "Test item"}
            create_item_request = requests.post(url + "/items", json=json_data, cookies=cookies)
            request_list.append(create_item_request)

        for request in request_list:
            if request.status_code != 200:
                raise Exception("NOT ALL ITEMS COULD BE CREATED")

        # CREATE DELIVERY

        items = [{"item": {"code": code}, "quantity": 100} for code in codes]

        json_data = {"deliveryDate": "23/10/2023",
        "warehouse": {"id": warehouse_id},
        "employee": {"id": employee_id},
        "items": items
        }

        create_delivery_response = requests.post(url + "/deliveries", json=json_data, cookies=cookies)

        if create_delivery_response.status_code != 200:
            raise Exception("DELIVERY COULDN'T BE CREATED")

        delivery_id = create_delivery_response.json()["id"]

        # GET DELIVERY AND CHECK IF RETURNED EMPLOYEE IS THE SAME AS ASSIGNED EMPLOYEE

        get_delivery_response = requests.get(url + "/deliveries/" + str(delivery_id), cookies=cookies)
        delivery = get_delivery_response.json()

        delivery_items = delivery["items"]

        delivery_items_codes = [item["item"]["code"] for item in delivery_items]

        if delivery_items_codes != codes:
            raise Exception("DELIVERY DATA WAS CORRUPTED")            

        print("TEST PASSED")
    except Exception as e:
        print("TEST FAILED")
        print(e)
    finally:
        # CLEAN UP
        requests.delete(url + "/deliveries/" + str(delivery_id), cookies=cookies)
        requests.delete(url + "/employees/" + str(employee_id), cookies=cookies)
        for code in codes:
            requests.delete(url + "/items/" + str(code), cookies=cookies)
        requests.delete(url + "/warehouses/" + str(warehouse_id), cookies=cookies)

if __name__ == "__main__":
    main()