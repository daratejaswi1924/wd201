'use strict';
const {
  Model,
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static addTodos({title,dueDate}){
      return this.create({title: title, dueDate: dueDate, completed: false});
    }
    static async getTodos(){
      return this.findAll();
    }
    markAsCompleted() {
      return this.update({completed: true});
    }
    static async getOverdueTodos(){
      try{
        const OverdueTodos =await Todo.findAll({
          where: {
            dueDate:{
              [Op.lt]: new Date(),
            },
          },
        });
        if(OverdueTodos.length >= 1){
          return OverdueTodos
        }else{
          await this.addTodos({
            title:"Go to Home",
            dueDate: new Date(new Date().setDate(new Date().getDate()-1)).toISOString(),
            completed:false,
          });          
        }
        const Overdue =this.getOverdueTodos;
        return Overdue
      }catch(error) {
        console.error('Error!!!',error);
        throw error;
      }
    }
    static async getdueTodayTodos(){
      try{
        const DueTodayTodos =await Todo.findAll({
          where: {
            dueDate:{
              [Op.between]:[new Date(),new Date(new Date().setHours(23,59,59,999))],
            },
          },
        });
        if(DueTodayTodos.length >=1){
          return DueTodayTodos;
        }else{
          await this.addTodos({
            title:"Buy milk",
            dueDate: new Date().toISOString(),
            completed:false,
          });
        }
        const dueToday = this.getdueTodayTodos;
        return dueToday
      }catch(error) {
        console.error('Error!!!',error);
        throw error;
      }
    }
    static async getdueLaterTodos(){
      try{
        const DueLaterTodos =await Todo.findAll({
          where: {
            dueDate:{
              [Op.gt]: new Date(),
            },
          },
        });
        if(DueLaterTodos.length >=1){
          return DueLaterTodos;
        }else{
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          await this.addTodos({
            title:"Have to pay electricity bill",
            dueDate: tomorrow.toISOString(),
            completed:false,
          });
        }
        const dueLater = this.getdueLaterTodos;
        return dueLater
      }catch(error) {
        console.error('Error!!!',error);
        throw error;
      }
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};