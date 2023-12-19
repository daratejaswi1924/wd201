/* eslint-disable no-undef */
const todoList = require('../todo');
let todos
todos=todoList();


describe ("Todolist Test Suite", () => {
    test("Should add new todo", () => {
        const todoItemsCount = todos.all.length;
        todos.add(
            {
                title: "Test todo",
                completed: false,
                dueDate: 2023-12-18
            }
        );
        expect(todos.all.length).toBe(todoItemsCount + 1);
    });

    
    test("Should mark a todo as complete", () => {
        expect(todos.all[0].completed).toBe(false);
        todos.markAsComplete(0);
        expect(todos.all[0].completed).toBe(true);
    });


    test("Should retrieve over due items", () => {
        const overdueItems = todos.all.length;
        todos.add(
            {
                title: "Test todo",
                completed: false,
                dueDate: 2023-12-18
            }
        );
        expect(todos.all.length).toBe(overdueItems + 1);
    });


  test('Should retrieve due today items', () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split('T')[0];
    const today = formattedDate(dateToday);
    const todayAdd={title: 'Do laundry',dueDate: today,completed:false};
    const duetic=todos.dueToday().length;
    todos.add(todayAdd);
    const todayItems = todos.dueToday();
    expect(todayItems.length).toBe(duetic+1);
  });
  test("Should retrieve due later items", () => {
    const dueLaterItems = todos.all.length;
    todos.add(
        {
            title: "Test todo",
            completed: false,
            dueDate: 2023-12-18
        }
    );
    expect(todos.all.length).toBe(dueLaterItems + 1);
});



  
});

    