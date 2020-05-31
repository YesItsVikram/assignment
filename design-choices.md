`Backend`

The backend is divided into 3 services:
  1. container_service
  2. inventory_service
  3. category_service

# Category Service
Both inventory and containers are part of a category, for example, a shirt item is a part of "Shirt" category and a basket container is a part of "Basket" category.

One of the ways to express this relationship is to create a "Basket" class (which might inherit an abstract Container class) with some properties (like colour, capacity, etc) and every instance of this class would provide their own values for these properties, i.e, new Basket(colour = "blue", capacity = 300ml). 
Each instance could have a uniquely identifiable id (barcode).
This would also ensure every instance of Basket can only hold other container and not inventory.

But this approach would require hardcoding all the different Category classes of both Inventory and Containers (i.e. Basket class, Rack class, Shirt class, etc), which causes adding new Categories difficult

Instead of hardcoding a category, this service dynamically creates a category based on data provided.

There are 2 kinds of categories: InventoryCategory and ContainerCategory

Both these category have a "schema" which is provided by user amongst other details.
A "schema" defines what the Item or Container of this Category looks like. It contains a list of properties (along with their type and default values) that the Item or Container of this category will have.

To create a new Item or Container, user must provide the id of Category this new Item or Container is part of. Then the values from their Category schema is matched with the data provided by the user.

Every Item/Container must have a category.

This service handles:
  - creating new category
  - getting category/categories from db

This service requires:
  - A mongodb connection string

# Inventory Service
This service handles:
  - creating new inventory item for a category
  - getting item/items from db
  - updating item when it is moved to a different container
  - keeping a record of number of items for each category and number of total items (in meta collection)

This service requires:
  - A mongodb connection string
  - category_service's endpoint (for http request)

Each inventory item (that is inside a container) holds the id of its parent container

# Container Service
This service handles:
  - creating a new container for a category
  - deleting an existing container if it's empty
  - getting container/containers
  - getting root container of an item (the top most parent container)
  - moving an item to a container (only if it is allowed to hold items)
  - moving a container to a container (only if it's allowed to hold containers)
  - keeping a record of number of containers for each category and number of total containers (in meta collection)

This service requires:
  - A mongodb connection string
  - category_service's endpoint (for http request)
  - inventory_service's endpoint (for http request)

Each container holds the id of its parent container
Each container has a list of its child container id or child item id, depending on whether it's holding containers or items

# Database
These services use mongodb
There are 3 DBs, one for each service

1. "category" db has these collections:
  - item_category
  - container_category
2. "inventory" db has these collections:
  - items
  - meta
3. "container" db has these collections
  - containers
  - meta

There is a mongodb.dump file in root directory, it contains some seed data, you can import it using this command: 

docker-compose exec -T mongo sh -c 'mongorestore --archive' < mongodb.dump


---------

* Both the inventory item and container have unique id which can be treated as barcode

* Please check out the models (Typescript interfaces) present in ./custom_modules/models/app to better understand the data design

* The models also have all the APIs' request and response parameters, so implementing an API on frontend or in any other service is a easy

* All the 3 database used by the 3 services can be seperated, i.e., each services manages its own database and is not depended on any other service's database or collection

* Due to lack of time, I've not handled data validation for requests, logs, errors etc

------------

`Client`

I am using Angular for client

The client code is NOT COMPLETE, I did not had much time left for frontend.

On frontend, I just implemented the server APIs in their service classes.


`custom_modules`

The code that can be decoupled from a service or is used by multiple services (for example, common Typescript interfaces and Request/Response parameters) is extracted into its own npm package.

These modules are in custom_modules.
I've deployed them on private github repo for easy installation inside docker