const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  numWeeks * weeklyRevenue >= 1000000
    ? (req.isValueWorth = true)
    : (req.isValueWorth = false);
  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
