import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';


import Student from '../models/student_model.js';
import Staff from '../models/staff_model.js';
import Alumni from  '../models/alumni_model.js';
import Partner from '../models/partner_model.js';
import Incubator from '../models/incubator_model.js';

import Login from '../models/login_model.js';


const register = async (req, res) => {

    const { type, name, email, password, gender, department, jobRole, jobTitle, partnerType, company } = req.body

    if(type == "Student"){

        if (!name || !email || !password) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Student.findOne({ email })
        if (userAlreadyExists) {
            throw new BadRequestError('Email already in used')
        }

        const user = await Student.create({ name, email });
        const userID = user._id
        const login = await Login.create({ userID, type, email, password });

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                gender: user.gender,
                nic: user.nic,
                gender: user.gender,
                contactNo: user.contactNo,
                faculty: user.faculty,
                studentID: user.studentID,
            },
            token,
            location: user.name,
        })

    }else if(type == "Staff"){

        if (!name || !email || !password || !department || !jobRole) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Staff.findOne({ email })
        if (userAlreadyExists) {
            throw new BadRequestError('Email already in used')
        }

        const user = await Staff.create({ name, email, department, jobRole });
        const userID = user._id
        const login = await Login.create({ userID, type, email, password });

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                contactNo: user.contactNo,
                address: user.address,
                department: user.department,
                jobRole: user.jobRole,
            },
            token,
            location: user.name,
        })



    }else if(type == "Alumni"){

        if (!name || !email || !password || !jobTitle) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Alumni.findOne({ email })
        if (userAlreadyExists) {
            throw new BadRequestError('Email already in used')
        }

        const user = await Alumni.create({ name, email, jobTitle });
        const userID = user._id
        const login = await Login.create({ userID, type, email, password });

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                contactNo: user.contactNo,
                address: user.address,
                company: user.company,
                jobTitle: user.jobTitle,
                graduatedYear: user.graduatedYear,
            },
            token,
            location: user.name,
        })


    }else if(type == "Partner"){

        if (!name || !email || !password || !partnerType) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Partner.findOne({ email })
        if (userAlreadyExists) {
            throw new BadRequestError('Email already in used')
        }

        const user = await Partner.create({ name, email, partnerType });
        const userID = user._id
        const login = await Login.create({ userID, type, email, password });

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                location: user.location
            },
            token,
            location: user.name,
        })



    }else if(type == "Incubator"){

        if (!company || !email || !password) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Incubator.findOne({ email })
        if (userAlreadyExists) {
            throw new BadRequestError('Email already in used')
        }

        const user = await Incubator.create({ company, email });
        const userID = user._id
        const login = await Login.create({ userID, type, email, password });

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.company,
                type: type,
                img: user.img
            },
            token,
            location: user.company,
        })


    }

}

const updateUser = async (req, res) => {

    const { id, type, name, email, password, gender, department, jobRole, jobTitle, partnerType, company, lastName, nic, contactNo, address,graduatedYear, location, faculty, studentID } = req.body
    
    if(type == "Student"){

        if (!name || !email || !lastName || !nic) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Student.findOne({ email })

       // const user = await Student.create({ name, email });
        const data = {
                name: name,
                lastName: lastName,
                nic: nic,
                email: email,
                gender: gender,
                studentID: studentID,
                contactNo: contactNo,
                faculty: faculty,
        }

        const user = await Student.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })

        const userID = user._id

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                gender: user.gender,
                nic: user.nic,
                gender: user.gender,
                contactNo: user.contactNo,
                faculty: user.faculty,
                studentID: user.studentID,
            },
            token,
            location: user.name,
        })

    }else if(type == "Staff"){

        if (!name || !email || !department || !jobRole) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Staff.findOne({ email })
        
        //const user = await Staff.create({ name, email, department, jobRole });
        const data = {
            name: name,
            lastName: lastName,
            nic: nic,
            email: email,
            contactNo: contactNo,
            address: address,
            department: department,
            jobRole: jobRole
        }

        const user = await Staff.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                contactNo: user.contactNo,
                address: user.address,
                department: user.department,
                jobRole: user.jobRole,
            },
            token,
            location: user.name,
        })



    }else if(type == "Alumni"){

        if (!name || !email || !jobTitle || !company ) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Alumni.findOne({ email })
        // if (userAlreadyExists) {
        //     throw new BadRequestError('Email already in used')
        // }

        //const user = await Alumni.create({ name, email, jobTitle });
        console.log(lastName);
        const data = {
            name: name,
            lastName: lastName,
            nic: nic,
            email: email,
            contactNo: contactNo,
            address: address,
            company: company,
            jobTitle: jobTitle,
            graduatedYear: graduatedYear,
        }

        const user = await Alumni.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })
        

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                contactNo: user.contactNo,
                address: user.address,
                company: user.company,
                jobTitle: user.jobTitle,
                graduatedYear: user.graduatedYear,
            },
            token,
            location: user.name,
        })


    }else if(type == "Partner"){

        if (!name || !email || !nic) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Partner.findOne({ email })


        //const user = await Partner.create({ name, email, partnerType });
        const data = {
            name: name,
            lastName: lastName,
            nic: nic,
            email: email,
            location: location
        }

        const user = await Partner.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                location: user.location
            },
            token,
            location: user.name,
        })



    }else if(type == "Incubator"){

        if (!company || !email || !password) {
            throw new BadRequestError('please provide all values')
        }

        const userAlreadyExists = await Incubator.findOne({ email })
        if (userAlreadyExists) {
            throw new BadRequestError('Email already in used')
        }

        const user = await Incubator.create({ company, email });
        const userID = user._id
        const login = await Login.create({ userID, type, email, password });

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.company,
                type: type,
                img: user.img
            },
            token,
            location: user.company,
        })


    }

}

const getUserByID = async (req, res) => {


    const { email , type } = req.body;

    if(type == "Student"){

        const getData = await Student.findOne({ email }).select('-createdAt -updatedAt -__v')
        console.log(getData);
        res.status(StatusCodes.OK).json({ getData })

    }

}

const updateProfileImage = async (req, res) => {

    const { id, type } = req.body
    console.log("run");
    console.log(req.body.id);
    console.log(req.body.type);
    //console.log(req.file.filename);
    console.log("run");  
    
    if(type == "Student"){

        const data = {
            img: req.file.filename,
        }

        const user = await Student.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })

        const userID = user._id

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                gender: user.gender,
                nic: user.nic,
                gender: user.gender,
                contactNo: user.contactNo,
                faculty: user.faculty,
                studentID: user.studentID,
            },
            token,
            location: user.name,
        })

    }else if(type == "Staff"){

        const data = {
            img: req.file.filename,
        }

        const user = await Staff.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                contactNo: user.contactNo,
                address: user.address,
                department: user.department,
                jobRole: user.jobRole,
            },
            token,
            location: user.name,
        })



    }else if(type == "Alumni"){

        const data = {
            img: req.file.filename,
        }
        const user = await Alumni.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })
        

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                contactNo: user.contactNo,
                address: user.address,
                company: user.company,
                jobTitle: user.jobTitle,
                graduatedYear: user.graduatedYear,
            },
            token,
            location: user.name,
        })


    }else if(type == "Partner"){

        const data = {
            img: req.file.filename,
        }

        const user = await Partner.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                type: type,
                img: user.img,
                lastName: user.lastName,
                nic: user.nic,
                location: user.location
            },
            token,
            location: user.name,
        })



    }else if(type == "Incubator"){

        const data = {
            img: req.file.filename,
        }

        const user = await Incubator.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        })

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.company,
                type: type,
                img: user.img
            },
            token,
            location: user.company,
        })


    }

}

const getAllStaff = async (req, res) => {
   
    let result = Staff.find()
  
    // setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
  
    result = result.skip(skip).limit(limit)
  
    const staffList = await result
  
    const totalJobs = await Staff.countDocuments()
    const numOfPages = Math.ceil(totalJobs / limit)
  
    res.status(StatusCodes.OK).json({ staffList, totalJobs, numOfPages })
  
}

const getAllAlumni = async (req, res) => {
   
    let result = Alumni.find()
  
    // setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
  
    result = result.skip(skip).limit(limit)
  
    const alumniList = await result
  
    const totalJobs = await Alumni.countDocuments()
    const numOfPages = Math.ceil(totalJobs / limit)
  
    res.status(StatusCodes.OK).json({ alumniList, totalJobs, numOfPages })
  
}

const getAllPartner = async (req, res) => {
   
    let result = Partner.find()
  
    // setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
  
    result = result.skip(skip).limit(limit)
  
    const partnerList = await result
  
    const totalJobs = await Partner.countDocuments()
    const numOfPages = Math.ceil(totalJobs / limit)
  
    res.status(StatusCodes.OK).json({ partnerList, totalJobs, numOfPages })
  
}

const getAllStudent = async (req, res) => {
   
    let result = Student.find()
  
    // setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
  
    result = result.skip(skip).limit(limit)
  
    const studentList = await result
  
    const totalJobs = await Student.countDocuments()
    const numOfPages = Math.ceil(totalJobs / limit)
  
    res.status(StatusCodes.OK).json({ studentList, totalJobs, numOfPages })
  
}





export { register, getUserByID, updateUser, updateProfileImage, getAllStaff, getAllAlumni, getAllPartner, getAllStudent }