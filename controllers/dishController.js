const Dish = require('./../models/dishModel');
const User = require('./../models/userModel');
const catchAsync = require("./../utils/catchAsync");

//get all dishes
exports.getAllDishes = catchAsync(async (req, res) => {
    const dishes = await Dish.find();
  
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: dishes.length,
      data: {
        dishes,
      },
    });
});

exports.getDish = catchAsync(async (req, res, next) => {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return next(new AppError("No dish found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        dish,
      },
    });
});

exports.createDish = catchAsync(async (req, res, next) => {
    const dish = await Dish.create(req.body);
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        dish,
      },
    });
  });
  
  exports.updateDish = catchAsync(async (req, res) => {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        dish,
      },
    });
  });
  
  exports.deleteDish = catchAsync(async (req, res) => {
    await Dish.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      requestedAt: req.requestTime,
      data: null,
    });
  });