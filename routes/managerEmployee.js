module.exports = (req, res, sequelize, employeeTable) => {
  const { manager } = req.body;

  sequelize
    .sync()
    .then(() => {
      employeeTable
        .findAll({
          where: {
            manager,
          },
        })
        .then((resp) => {
          
          res.send({ data: resp } , status = 200);
        })
        .catch((error) => {
          res.send({ error } , status =   400);
        });
    })
    .catch((err) => {
      res.send({err} , status = 400);
    });
};
