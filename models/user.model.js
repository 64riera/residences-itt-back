const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        required: true
    },
    controlNum: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    period: {
        type: String,
        required: true,
        trim: true
    },
    actualStep: {
     type: String
    },
    semester: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    career: {
        type: String,
        required: true,
        trim: true 
    },
    residenceData: [
        {
            stepId: { type: String, trim: true },
            stepState: { type: String, trim: true },
            fileData: [
                {
                    fileName: { type: String, trim: true },
                    fileRoute: { type: String, trim: true },
                    fileFormat: { type: String, trim: true }
                }
            ],
            email: { type: String, trim: true },
            schoolName: { type: String, trim: true },
            schoolCity: { type: String, trim: true },
            requestDate: Date,
            bossNameDivisionOfStudies: { type: String, trim: true },
            studentCareerNameCoordinator: { type: String, trim: true },
            projectName: { type: String, trim: true },
            projectOrigin: { type: String, trim: true },
            estimatedPeriod: { type: String, trim: true },
            residentsNumber: { type: String, trim: true },
            companyName: { type: String, trim: true },
            companyBranch: { type: String, trim: true },
            rfc: { type: String, trim: true },
            companyAdress: { type: String, trim: true },
            suburb: { type: String, trim: true },
            postalCode: { type: String, trim: true },
            fax: { type: String, trim: true },
            city: { type: String, trim: true },
            phone: { type: String, trim: true },
            companyMision: { type: String, trim: true },
            companyOwner: { type: String, trim: true },
            companyOwnerPosition: { type: String, trim: true },
            externalAdvisorName: { type: String, trim: true },
            advisorPosition: { type: String, trim: true },
            personWhoSignsAgree: { type: String, trim: true },
            personWhoSignPosition:{ type: String, trim: true },
            residentName: { type: String, trim: true },
            residentCareer: { type: String, trim: true },
            residentControlNumber: { type: String, trim: true },
            residentAddress: { type: String, trim: true },
            residentEmail: { type: String, trim: true },
            residentSocialSecurity: { type: String, trim: true },
            residentSecurityNumber: { type: String, trim: true },
            residentCity: { type: String, trim: true },
            residentPhone: { type: String, trim: true }
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)