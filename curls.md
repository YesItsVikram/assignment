# Create Item Category
curl -X POST \
  http://localhost:8082/createItemCategory \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8bc023d9-bcfa-4da6-9085-f787d486df2c' \
  -d '{
	"kind": "shirt",
	"schema": {
		"color": {
			"isRequired": true,
			"type": "string"
		},
		"buttons": {
			"isRequired": false,
			"type": "number",
			"default": 6
		}
	}
}'

# Create Item (categoryId is the _id of category returned from above cURL)
curl -X POST \
  http://localhost:8081/createItem \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: a04824e3-bd3f-462d-950b-591a947d7794' \
  -d '{
	"categoryId": "5ed3fad36360690011b18ef8",
	"details": {
		"color": "blue"
	}
}'


# Create Container Category
curl -X POST \
  http://localhost:8082/createContainerCategory \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: b45efbd0-f323-4632-b2e0-80cd85bd7d89' \
  -d '{
	"kind": "rack",
	"canHold": "CONTAINERS",
	"schema": {
		"capacity": {
			"isRequired": true,
			"type": "number"
		},
		"weight": {
			"isRequired": false,
			"type": "string",
			"default": "1kg"
		}
	}
}'


# Create Container
curl -X POST \
  http://localhost:8080/createContainer \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 7edc0716-1716-407b-b2fc-45d22961c172' \
  -d '{
	"categoryId": "5ed3fd836360690011b18efd",
	"details": {
		"capacity": 100
	}
}'


# Move Container
curl -X POST \
  http://localhost:8080/moveContainer \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 723e8f7d-78e0-4caa-aa6c-75402a2a4e3f' \
  -d '{
	"id": "5ed3fe1827baf6001219df08",
	"destinationContainerId": "5ed3fdde27baf6001219df06"
}'


# Move Item
curl -X POST \
  http://localhost:8080/moveItem \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 68bbc49d-c29e-40cc-b106-0ea8c68d95d2' \
  -d '{
	"id": "5ed3fb98b338a60012b187d8",
	"destinationContainerId": "5ed3fe1827baf6001219df08"
}'



# Get Categories
curl -X GET \
  'http://localhost:8082/getCategories?collection=CONTAINERS' \
  -H 'Cache-Control: no-cache' \
  -H 'Postman-Token: 69393915-08a1-47e3-af2d-23de846ecf20'

# Get Container
curl -X GET \
  'http://localhost:8080/getContainer?id=5ed3a562fa63430012bf2a5c' \
  -H 'Cache-Control: no-cache' \
  -H 'Postman-Token: e45d4db2-34ba-4cbc-b8fd-897892667d25'

# Get Containers
curl -X GET \
  'http://localhost:8080/getContainers?pageNumber=1&limit=10' \
  -H 'Cache-Control: no-cache' \
  -H 'Postman-Token: faadc5aa-fe1e-46ae-a5ab-07ad3196d43a'


# Get Item
curl -X GET \
  'http://localhost:8081/getItem?id=5ed3a3b9e82d1100112bb90f' \
  -H 'Cache-Control: no-cache' \
  -H 'Postman-Token: 3c4a69ad-4f41-4a65-b4a4-c1d42eb6691d'


# Get Items
curl -X GET \
  'http://localhost:8081/getItems?pageNumber=1&limit=10' \
  -H 'Cache-Control: no-cache' \
  -H 'Postman-Token: f1678b90-3a19-44f8-8129-506fae7f1dd1'


# Get Root Container
curl -X GET \
  'http://localhost:8080/getRootContainer?itemId=5ed3fb98b338a60012b187d8' \
  -H 'Cache-Control: no-cache' \
  -H 'Postman-Token: 46929a48-7bed-4bb9-a446-1a27929213ab'


# Delete Container
curl -X POST \
  http://localhost:8080/deleteContainer \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: b12621ee-6591-4381-a5db-1b4e48820294' \
  -d '{
	"id": "5ed3ff7a27baf6001219df09"
}'

