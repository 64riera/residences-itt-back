/* eslint-disable no-unreachable */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')
const SECRET_KEY = 'userSignMaster'
const expiresIn = 24 * 60 * 60

var userController = {}

userController.registerUser = async (req, res) => {
  var userData = new User()

  userData.email = req.body.email
  userData.password = bcrypt.hashSync(req.body.password, 10)
  userData.name = req.body.name
  userData.lastName = req.body.lastName
  userData.age = req.body.age
  userData.controlNum = req.body.controlNum
  userData.period = req.body.period
  userData.semester = req.body.semester
  userData.isActive = req.body.isActive
  userData.career = req.body.career

  await userData.save((err, userStored) => {
    if (err) return res.status(500).send({ err })
    if (!userStored) return res.status(409).send({ message: 'User not saved' })
    const accessToken = jwt.sign({
      id: userStored._id,
      email: userStored.email,
      name: userStored.name
    }, SECRET_KEY, { expiresIn: expiresIn })

    res.status(200).send({ accessToken, expiresIn, controlNum: userStored.controlNum })
  })
}

userController.loginUser = async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  }

  await User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send({ err })
    if (!user) return res.status(500).send({ msg: 'Something is wrong' }) /* Email not exists */
    const isPasswordCorrect = bcrypt.compareSync(userData.password, user.password)

    if (isPasswordCorrect) {
      const accessToken = jwt.sign({
        id: user._id,
        email: user.email,
        user: user.user
      }, SECRET_KEY, { expiresIn: expiresIn })
      return res.status(200).send({
        accessToken,
        expiresIn,
        controlNum: user.controlNum,
        name: user.name,
        id: user._id
      })
    } else {
      // Incorrect password
      return res.status(500).send({ msg: 'Something is wrong' })
    }
  })
}

userController.registerResApplication = async (req, res) => {
  var auth = req.headers['auth-token']

  try {
    jwt.verify(auth, SECRET_KEY)
  } catch (err) {
    return res.status(403).send({ msg: 'Unauthorized request' })
  }

  const userData = {
    controlNum: req.body.controlNum,
    residenceData: [
      {
        stepId: '1-C',
        stepState: 'Submited',
        fileData: [
          {
            fileName: req.body.fileName,
            fileRoute: req.body.fileRoute,
            fileFormat: req.body.fileFormat
          }
        ],
        email: req.body.email,
        schoolName: req.body.schoolName,
        schoolCity: req.body.schoolCity,
        requestDate: req.body.requestDate,
        bossNameDivisionOfStudies: req.body.bossNameDivisionOfStudies,
        studentCareerNameCoordinator: req.body.studentCareerNameCoordinator,
        projectName: req.body.projectName,
        projectOrigin: req.body.projectOrigin,
        estimatedPeriod: req.body.estimatedPeriod,
        residentsNumber: req.body.residentsNumber,
        companyName: req.body.companyName,
        companyBranch: req.body.companyBranch,
        rfc: req.body.rfc,
        companyAdress: req.body.companyAdress,
        suburb: req.body.suburb,
        postalCode: req.body.postalCode,
        fax: req.body.fax,
        city: req.body.city,
        phone: req.body.phone,
        companyMision: req.body.companyMision,
        companyOwner: req.body.companyOwner,
        companyOwnerPosition: req.body.companyOwnerPosition,
        externalAdvisorName: req.body.externalAdvisorName,
        advisorPosition: req.body.advisorPosition,
        personWhoSignsAgree: req.body.personWhoSignsAgree,
        personWhoSignPosition: req.body.personWhoSignPosition,
        residentName: req.body.residentName,
        residentCareer: req.body.residentCareer,
        residentControlNumber: req.body.residentControlNumber,
        residentAddress: req.body.residentAddress,
        residentEmail: req.body.residentEmail,
        residentSocialSecurity: req.body.residentSocialSecurity,
        residentSecurityNumber: req.body.residentSecurityNumber,
        residentCity: req.body.residentCity,
        residentPhone: req.body.residentPhone
      }
    ]
  }

  try {
    var user = await User.findOne({ controlNum: userData.controlNum })
  } catch (err) {
    return res.status(500).send({ err })
  }

  if (!user) return res.status(409).send({ msg: 'User doesnt exists' })

  try {
    var updatedUser = await User.updateOne({ controlNum: userData.controlNum }, userData, { new: true })
  } catch (err) {
    return res.status(500).send({ err })
  }

  if (!updatedUser) return res.status(409).send({ msg: 'User not updated' })
  return res.status(200).send({ updatedUser })
}

userController.getUsers = async (req, res) => {
  try {
    var users = await User.find()
    res.status(200).send({ users })
  } catch (err) {
    res.status(500).send({ err })
  }
}

userController.getUser = async (req, res) => {
  const userData = req.body

  try {
    var user = await User.findOne({ controlNum: userData.controlNum })
    res.status(200).send({
      id: user._id,
      residenceData: user.residenceData,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      controlNum: user.controlNum
    })
  } catch (err) {
    res.status(500).send({ err })
  }
}

// Files Upload Section
userController.uploadFileStep = async (req, res) => {
  const auth = req.headers['auth-token']

  try {
    jwt.verify(auth, SECRET_KEY)
  } catch (err) {
    return res.status(403).send({ msg: 'Unauthorized req' })
  }

  const userData = req.body

  try {
    var user = await User.findOne({ controlNum: userData.controlNum })
  } catch (err) {
    return res.status(500).send({ err })
  }

  if (!user) return res.status(409).send({ msg: 'User doesnot exists' })

  user.residenceData.push({
    stepId: userData.stepId,
    stepState: userData.stepState,
    fileData: [
      {
        fileName: req.file.filename,
        fileRoute: req.file.path,
        fileFormat: req.file.originalname
      }
    ]
  })

  user.save((err, savedUser) => {
    if (err) return res.status(500).send({ msg: err })
    if (!savedUser) return res.status(409).send({ msg: 'User not saved' })

    return res.status(200).send({ savedUser })
  })
}

module.exports = userController
