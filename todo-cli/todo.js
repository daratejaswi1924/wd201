/* eslint-disable no-undef */
const todoList = () => {
  all = []
  const dateToday = new Date();
  const formattedDate = (d) => d.toISOString().split('T')[0];
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
  const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 1)));
  
  const add = (todoItem) => {
    all.push(todoItem)
  }
  
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
      overduelist=[]
      for (let i = 0; i < all.length; i++) {
          if (all[i].dueDate=== yesterday && !all[i].completed){
              overduelist.push(all[i])
          }
      }
      return overduelist
  }

  const dueToday = () => {
      dueTodaylist=[]
      for (let i = 0; i < all.length; i++) {
          if (all[i].dueDate=== today){
              dueTodaylist.push(all[i])
          }
      }
      return dueTodaylist
  }

  const dueLater = () => {
      dueLaterlist=[]
      for (let i = 0; i < all.length; i++) {
          if (all[i].dueDate=== tomorrow && !all[i].completed){
              dueLaterlist.push(all[i])
          }
      }
      return dueLaterlist
  }

  const toDisplayableList = (list) => {
    let dl=[];
    list.forEach(item =>{
      const s=item.completed? "[x]":"[ ]";
      const t=item.title;
      const due=item.dueDate===today?"":`${item.dueDate}`;
      dl.push(`${s} ${t} ${due}`);
    });
    return dl.join("\n");
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};
module.exports = todoList;