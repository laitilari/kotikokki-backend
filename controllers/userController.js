const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      user,
    },
  });
});

exports.getAllChefs = catchAsync(async(req, res)=>{
  const chefs = await User.find({isChef:true});
  res.status(200).json({
    status:"success",
    requestedAt:req.requestTime,
    results:chefs.length,
    data:{
      chefs
    }
  })
})

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    requestedAt: req.requestTime,
    data: null,
  });
});
