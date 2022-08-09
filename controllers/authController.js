import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

import login_model from '../models/login_model.js'
import Student from '../models/student_model.js';
import Staff from '../models/staff_model.js';
import Alumni from  '../models/alumni_model.js';
import Partner from '../models/partner_model.js';
import Incubator from '../models/incubator_model.js';

const register = async (req, res) => {

  const { name, email, password } = req.body

    if (!name || !email || !password) {
      throw new BadRequestError('please provide all values')
    }
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
      throw new BadRequestError('Email already in use')
    }

    const user = await User.create({ name, email, password })

    const token = user.createJWT()
    
    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
      },
      token,
      location: user.location,
    })


}

const login = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
      throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ _id: req.user.userId })

    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    await user.save()

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ user, token, location: user.location })

}

const forgotpassword = async (req, res, next) => {

  const { email } = req.body;
  try {

    const user = await login_model.findOne({ email });
    
    if (!user) {
      return next(new ErrorResponse("Email could not be sent ", 404));
    }

    // const resetToken = user.getResetPasswordToken();

    // await user.save();

    const resetUrl = `http://localhost:3000/passwordreset`;

    const message = `
        <h1>You have requested a passowrd reset</h1>
        <p>Please go to this link to reset your password </p>
        <a href =${resetUrl} clicktacking=off>${resetUrl}</a> `;

      //  try {
            await sendEmail({
              to: user.email,
              subject: "Password Reset Request",
              text: message,
            });

            res.status(200).json({ success: true, data: "Email sent" });

      //  } catch (error) {

          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;

          await user.save();

          return next(new ErrorResponse("Email could not be send", 500));
        //}
  } catch (error) {
    console.log(error);
    next(error);
  }

  
};

const resetpassword = async (req, res, next) => {

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
    
    try {
        const user =await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt:Date.now()}
        })

        if(!user){
            return next (new ErrorResponse("Invalid Reset Token", 400 ))
        }

        user.password =req.body.password;
        user.resetPasswordToken =undefined;
        user.resetPasswordExpire=undefined;

        await user.save();

        res.status(201).json({
            success:true,
            data:"Password Reset Success"
        })

    } catch (error) {
        next(error)
    }
};


const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};

// ************************ new function ***************************************


const login_new = async (req, res) => {

  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await login_model.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()

  user.password = undefined

  if(user.type == 'Student'){

    const get_user = await Student.findOne({ email })

      res.status(StatusCodes.OK).json({ 
            user: {
              id: get_user._id,
              email: get_user.email,
              name: get_user.name,
              type: user.type,
              img: get_user.img,
              lastName: get_user.lastName,
              gender: get_user.gender,
              nic: get_user.nic,
              gender: get_user.gender,
              contactNo: get_user.contactNo,
              faculty: get_user.faculty,
              studentID: get_user.studentID,
              
          },
          token,
          location: get_user.name,
      })

  }else if(user.type == 'Staff'){

    const get_user = await Staff.findOne({ email })

      res.status(StatusCodes.OK).json({ 
            user: {
              id: get_user._id,
              email: get_user.email,
              name: get_user.name,
              type: user.type,
              img: get_user.img,
              lastName: get_user.lastName,
              nic: get_user.nic,
              contactNo: get_user.contactNo,
              address: get_user.address,
              department: get_user.department,
              jobRole: get_user.jobRole,

          },
          token,
          location: get_user.name,
      })

  }else if(user.type == 'Alumni'){

    const get_user = await Alumni.findOne({ email })

      res.status(StatusCodes.OK).json({ 
            user: {
              id: get_user._id,
              email: get_user.email,
              name: get_user.name,
              type: user.type,
              img: get_user.img,
              lastName: get_user.lastName,
              nic: get_user.nic,
              contactNo: get_user.contactNo,
              address: get_user.address,
              company: get_user.company,
              jobTitle: get_user.jobTitle,
              graduatedYear: get_user.graduatedYear,
          },
          token,
          location: get_user.name,
      })

  }else if(user.type == 'Partner'){

    const get_user = await Partner.findOne({ email })

      res.status(StatusCodes.OK).json({ 
            user: {
              id: get_user._id,
              email: get_user.email,
              name: get_user.name,
              type: user.type,
              img: get_user.img,
              lastName: get_user.lastName,
              nic: get_user.nic,
              location: get_user.location,
              partnerType: get_user.partnerType
          },
          token,
          location: get_user.name,
      })

  }else if(user.type == 'Incubator'){

    const get_user = await Incubator.findOne({ email })

      res.status(StatusCodes.OK).json({ 
            user: {
              id: get_user._id,
              email: get_user.email,
              name: get_user.company,
              type: user.type,
              img: get_user.img
          },
          token,
          location: get_user.name,
      })

  }



}


export { register, login, updateUser,forgotpassword,resetpassword, login_new }
