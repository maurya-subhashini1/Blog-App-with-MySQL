const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "Navgurukul@123",
      database: "blog"
    }
  })
  knex.schema.createTable("Users", (table) => {
    table.increments("id").primary();
    table.string("FirstName")
    table.string("lastName")
    table.string("Password")
    table.string("Email").notNullable().unique();
  
  }).then(() => {
    console.log("created");
  
  }).catch((err) => {
    console.log("already created");
  })
  knex.schema.hasTable("Posts").then(function (exists) {
    if (!exists) {
      console.log({ Success: `users table created successfully.` });
      return knex.schema.createTable("Posts", function (t) {
        t.increments("Post_id").primary();
        t.integer("user_id");
        t.string("Tittle");
        t.string("description")
      }).then(()=>{
        console.log("creted")
      }).catch(()=>{
        console.log(err)
      })
    }
  });

  knex.schema.hasTable("like_dislike").then(function (exists) {
    if (!exists) {
      // console.log({ Success: `like-dislike table created successfully.` });
      return knex.schema.createTable("like_dislike", function (t) {
        t.increments("id").primary();
        t.integer("User_id")
        t.integer("Post_id");
        t.boolean("Like");
        t.boolean("Dislike")
      }).then(()=>{
        console.log("creted")
      }).catch(()=>{
        console.log(err)
      })
    }
  });
  module.exports = knex