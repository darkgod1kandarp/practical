const { v4: uuidv4 } = require("uuid");
module.exports = (req, res, sequelize, employeeTable) => {
  const { manager, EmployeeName, designation } = req.body;
  //   console.log(req.body)
  sequelize
    .sync()
    .then(() => {
      employeeTable
        .create({
          EmployeeID: uuidv4(),
          manager,
          EmployeeName,
          designation,
        })
        .then((resp) => {
          res.send({ done: "adding done" }, (status = 200));
        })
        .catch((error) => {
          console.error("Failed to create a new record : ", error);
          res.send({ done: error }, (status = 400));
        });
    })
    .catch((error) => {
      res.send({ done: error }, (status = 400));
    });
};
