`Backend`

The backend is divided into 3 services:
  1. container_service
  2. inventory_service
  3. category_service

# Category Service
Both inventory and containers are part of a category, for example, a shirt item is a part of "Shirt" category and a basket container is a part of "Basket" category.

One of the ways to express this relationship is to create a "Basket" class (which might inherit an abstract Container class) with some properties (like colour, capacity, etc) and every instance of this class would provide their own values for these properties, i.e, new Basket(colour = "blue", capacity = 300ml). 
Each instance could have a uniquely identifiable id (barcode).
This would also ensure every instance of Basket can only hold other container.

But this approach would require hardcoding all the different Category classes of both Inventory and Containers, which causes adding new Categories difficult

Instead of hardcoding a category, this service dynamically creates a category based on data provided.

There are 2 types of categories: InventoryCategory and ContainerCategory

Both these category have a "schema" which is provided by user amongst other details.
A "schema" defines what the Item or Container of this Category looks like. It contains a list of properties (along with their type and default values) that the Item or Container of this category will have.

Every Item/Container must have a category.

This service handles:
  - creating new category
  - getting category/categories from db

# Inventory Service
This service handles:
  - creating new inventory item for a category
  - getting item/items from db
  - updating item when it is moved to a different container
  - keep a record of number of items for each category and number of total items (you could add other details too)

# Container Service
This service handles:
  - creating a new container for a category
  - deleting an existing container if it's empty
  - getting container/containers
  - getting root container of an item or a container (the top most parent container)
  - moving an item to a container (only if it is allowed to hold items)
  - moving a container to a container (only if it's allowed to hold containers)
  - keep a record of number of containers for each category and number of total containers



* Both the inventory item and container have unique id which can be treated as barcode
* Due to lack of time, I've not handled data validation for requests, logs, errors etc

------------

`Client`

------------


`custom_modules`

The code that can be decoupled from a service or is used by multiple services (for example, common Typescript interfaces and Request/Response parameters) is extracted into its own npm package.

These modules are in custom_modules.
I've deployed them on private github repo for easy installation inside docker