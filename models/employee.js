const {  DataTypes } = require("sequelize");
const employeeTable = (Sequelize) => {
  return (employee = Sequelize.define("employees", {
    EmployeeID: {
      type: DataTypes.STRING,
      allowNull: false,
      primary: true,
    },
    EmployeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manager: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }));
};

module.exports = employeeTable;
