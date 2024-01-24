const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path=require("path");


app.use(bodyParser.json());
// set an ejs file as view engine
app.set('view engine','ejs');

app.get("/todos",  (request, response) => {
  console.log("Todo list",request.body);
  
  });

app.use(express.static(path.join(__dirname,'public')));

const { Todo } = require("./models");

app.get("/",async (request,response)=>{
  const allTodos= await Todo.getTodos();
  if(request.accepts("html")){
    response.render('index',{
      allTodos
    });
  } else{
    response.json({
      allTodos
    })
  }
  
});

  app.post("/todos",async(request,response)=>{
    console.log("Creating a todo",request.body);
    try{
      const todo=await Todo.addTodo({
        title:request.body.title,
        dueDate:request.body.dueDate,
      });
      return response.redirect("/");

    } catch (error){
      console.log(error);
      return response.status(422).json(error);
    }
  })

  
  app.put("/todos/:id/markAsCompleted", async function (request, response) {
    const todo = await Todo.findByPk(request.params.id);
    try {
      const updatedTodo = await todo.markAsCompleted();
      return response.json(updatedTodo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  });
  
  app.delete("/todos/:id", async function (request, response) {
    console.log("We have to delete a Todo with ID: ", request.params.id);
    // FILL IN YOUR CODE HERE
  
    // First, we have to query our database to delete a Todo by ID.
    // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
    // response.send(true)
  
    try {
      const todoId = request.params.id;
      const todo = await Todo.findByPk(todoId);
  
      if (!todo) {
        return response.status(404).json({ error: "Todo not found" });
      }
  
      await todo.destroy(); // Use Sequelize's destroy method to delete the To-Do
  
      return response.json({ success: true });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  
  });
  
  module.exports = app;



