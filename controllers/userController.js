const catchAsync = require('../utils/catchAync')
const User = require('../models/userModel')

exports.createUser = catchAsync(async (req, res, next) => {
    const { name, email, link_id, institution, environment } = req.body

    const user = await User.create({
        name: name,
        email: email,
        link_id: link_id,
        environment: environment,
        institution: institution,
    });

    res.status(200).json({
        status: 'success',
        data: user
    });
})