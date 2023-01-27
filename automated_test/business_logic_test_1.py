import requests
import random

def main():
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

        # CREATE EMPLOYEE
        json_data = {"name" : "Bob", "warehouse": {"id": warehouse_id}}
        create_employee_response = requests.post(url + "/employees", json=json_data, cookies=cookies)
        employee = create_employee_response.json()
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

        # CREATE DELIVERY

        json_data = {"deliveryDate": "23/10/2023",
        "warehouse": {"id": warehouse_id},
        "employee": {"id": employee_id},
        "items": [{"item": {"code": code_1}, "quantity": 10}, {"item": {"code": code_2}, "quantity": 30}]
        }

        create_delivery_response = requests.post(url + "/deliveries", json=json_data, cookies=cookies)
        delivery_id = create_delivery_response.json()["id"]

        if create_delivery_response.status_code != 200:
            raise Exception("DELIVERY COULDN'T BE CREATED")

        # GET DELIVERY AND CHECK IF RETURNED EMPLOYEE IS THE SAME AS ASSIGNED EMPLOYEE

        get_delivery_response = requests.get(url + "/deliveries/" + str(delivery_id), cookies=cookies)
        delivery_employee = get_delivery_response.json()["employee"]

        get_assigned_employee_response = requests.get(url + "/employees/" + str(employee_id), cookies=cookies)
        assigned_employee = get_assigned_employee_response.json()

        if assigned_employee != delivery_employee: 
            raise Exception("ASSIGNED EMPLOYEE AND RETURNED EMPLOYEE ARE NOT THE SAME")

        print("TEST PASSED")
    except Exception as e:
        print("TEST FAILED")
        print(e)

if __name__ == "__main__":
    main()