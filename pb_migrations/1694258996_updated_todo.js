/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aml51fbc102kel9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2pmgeuf",
    "name": "completed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aml51fbc102kel9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2pmgeuf",
    "name": "field",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
