module.exports = (req , res, sequelize, employeeTable)=>{
  const { id } = req.body;
  console.log(id)
  sequelize
    .sync()
    .then(() => {
      employeeTable
        .findOne({
          where: {
            EmployeeID: id,
          },
        })
        .then((resp) => {
            console.log(resp)
          res.send({ data: resp }, status =  200);
        })
        .catch((error) => {
          res.send({ error }, status =   400);
        });
    })
    .catch((err) => {
      res.send(err , status =  400);
    });
}