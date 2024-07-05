const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Joi = require("joi");



// Harvest_app

const schema = Joi.object({
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30).required(),
    company: Joi.string().min(1).max(50).optional(),
    email: Joi.string().email().min(6).max(50).required(),
    contactPhone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    password: Joi.string().min(10).required(),
    secureSite: Joi.string().pattern(/^[a-zA-Z0-9]+$/).required(),
    teamSize: Joi.string().valid('1-5', '6-10', '11-20', '21-50', '51+').required()
});

app.put("/harvest", async (req, res) => {
    try {
        const val = await schema.validateAsync(req.body);
        res.status(200).send({ message: "Validation successful", data: val });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


// School-Form


const school = Joi.object({
    studentFirstName: Joi.string().min(1).max(30).required(),
    studentLastName: Joi.string().min(1).max(30).required(),
    class: Joi.string().min(1).max(50).required(),
    dob: Joi.date().less('now').iso().required(),
    parentFirstName: Joi.string().min(1).max(30).required(),
    parentLastName: Joi.string().min(1).max(30).required(),
    addressLine1: Joi.string().min(1).max(100).required(),
    addressLine2: Joi.string().min(1).max(100).optional(),
    city: Joi.string().min(1).max(50).required(),
    region: Joi.string().min(1).max(50).required(),
    postalCode: Joi.string()
    .pattern(/^\d{6}$/) 
    .required()
    .messages({
        "string.pattern.base": "postalCode must be a 6-digit number"
    }),
    country:  Joi.string().min(1).max(30).required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
    email: Joi.string().email().min(6).max(50).required()
});

app.put("/school-form", async (req, res) => {
    try {
        const val = await school.validateAsync(req.body);
        
        res.status(200).send({ message: "Validation successful", data: val });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


// Vehical authentication


const vehical = Joi.object({
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30).required(),
    department: Joi.string().min(1).max(50).required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    driversLicenseNo: Joi.string().pattern(/^[A-Z][0-9]*$/).min(1).max(10).required().messages({
    "string.min": "driversLicenseNo must be at least 1 character long",
    "string.max": "driversLicenseNo must be at most 10 characters long",
    "string.pattern.base":
      "driversLicenseNo must start with an uppercase letter followed by numbers"
  })
,
    fromDate: Joi.date().iso().required(),
    toDate: Joi.date().iso().required(),
    policy: Joi.boolean().valid(true).required(),
    companySignature: Joi.string().min(1).max(100).optional(),
    
});

app.put("/vehical", async (req, res) => {
    try {
        const val = await vehical.validateAsync(req.body);
        
        res.status(200).send({ message: "Validation successful", data: val });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });


//   gst customer


const Gst = Joi.object({
    Account: Joi.string()
      .regex(/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Account" must contain at least one uppercase letter and one number',
      }),
    Title_of_acccount: Joi.string()
      .min(5)
      .max(100)
      .regex(/^[A-Z]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Title_of_acccount" should contain only uppercase letters',
      }),
    Address: Joi.string()
      .min(5)
      .max(100)
      .regex(/^[A-Z0-9 ]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Address" should contain only uppercase letters, numbers, and spaces',
      }),
    Register_Office_Address: Joi.string()
      .min(5)
      .max(100)
      .regex(/^[A-Z0-9 ]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Register_Office_Address" should contain only uppercase letters, numbers, and spaces',
      }),
    Industry: Joi.string()
      .min(2)
      .max(100)
      .regex(/^[A-Z]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Industry" should contain only uppercase letters',
      }),
    Contact_person: Joi.string()
      .max(15)
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': '"Contact_person" must be a valid phone number with 10 to 15 digits',
      }),
    Designation: Joi.string().regex(/^[A-Z]+$/).optional()
      .messages({
        'string.pattern.base': '"Designation" should contain only uppercase letters',
      }),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': '"phone" must be a valid phone number with 10 to 15 digits',
      }),
    NTN: Joi.string()
      .regex(/^[A-Z0-9]+$/)
      .required()
      .messages({
        'string.pattern.base': '"NTN" must contain only uppercase letters and numbers',
      }),
    GST: Joi.string()
      .regex(/^[A-Z0-9]+$/)
      .required()
      .messages({
        'string.pattern.base': '"GST" must contain only uppercase letters and numbers',
      }),
    Telephone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': '"Telephone" must be a valid phone number with 10 to 15 digits',
      }),
    Fax: Joi.string()
      .regex(/^\+?\d{1,4}[-\s]?\(?\d{1,5}\)?[-\s]?\d{1,15}$/)
      .required()
      .messages({
        'string.pattern.base': '"Fax" must be a valid fax number in the format +<country code>-<area code>-<number>',
      }),
    UAN: Joi.string().length(12).pattern(/^\d+$/).required()
      .messages({
        'string.length': '"UAN" must be exactly 12 digits',
        'string.pattern.base': '"UAN" must contain only numeric characters',
      }),
    email: Joi.string().email().min(6).max(26).regex(/^[A-Z0-9]/)
      .messages({
        'string.pattern.base': '"email" must start with an alphanumeric character',
      }),
    website: Joi.string().uri().optional()
      .messages({
        'string.uri': '"website" must be a valid URL',
      }),
});

app.put("/Gst", async (req, res) => {
  try {
    const val = await Gst.validateAsync(req.body);
    res.status(200).send({ message: "Validation successful", data: val });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


const employee = Joi.object({
    firstName: Joi.string().min(3).max(16).required(),
    lastName: Joi.string().min(3).max(10).required(),
    dob: Joi.date().less('now').iso().required(),
    Address: Joi.string().min(5).max(100).required(),
    streetAddress1: Joi.string().min(5).max(100).required(),
    streetAddress2: Joi.string().min(5).max(100).optional(),
    city: Joi.string().min(2).max(50).required(),
    region: Joi.string().min(2).max(50).required(),
    zipcode: Joi.string().pattern(/^[0-9]{5,10}$/).required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    email: Joi.string().email().min(6).max(30).required(),
    EmegencyContact: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    citizenship: Joi.string().min(2).max(50).required(),
    Disability: Joi.string().required(),
    CompanyName: Joi.string().required(),
    Position: Joi.string().required(),
    ReportTO: Joi.string().required(),
    EmploymentType: Joi.string().required(),
    Mon: Joi.boolean().required().messages({
      'boolean.base': '"Mon" must be a boolean',
      'any.required': '"Mon" is required'
    }),
    Tue: Joi.boolean().required().messages({
      'boolean.base': '"Tue" must be a boolean',
      'any.required': '"Tue" is required'
    }),
    Web: Joi.boolean().required().messages({
      'boolean.base': '"Web" must be a boolean',
      'any.required': '"Web" is required'
    }),
    Thu: Joi.boolean().required().messages({
      'boolean.base': '"Thu" must be a boolean',
      'any.required': '"Thu" is required'
    }),
    Fri: Joi.boolean().required().messages({
      'boolean.base': '"Fri" must be a boolean',
      'any.required': '"Fri" is required'
    }),
    Sat: Joi.boolean().required().messages({
      'boolean.base': '"Sat" must be a boolean',
      'any.required': '"Sat" is required'
    }),
    startingDate: Joi.date().greater(Joi.ref('dob')).iso().required().messages({
      'date.base': '"startingDate" should be a valid date',
      'date.greater': '"startingDate" must be later than the "dob"',
      'date.isoDate': '"startingDate" must be a valid ISO 8601 date',
      'any.required': '"startingDate" is a required field'
    }),
    contractDate: Joi.date().greater(Joi.ref('startingDate')).iso().required().messages({
      'date.base': '"contractDate" should be a valid date',
      'date.greater': '"contractDate" must be later than the "startingDate"',
      'date.isoDate': '"contractDate" must be a valid ISO 8601 date',
      'any.required': '"contractDate" is a required field'
    })
  });
  
  app.put("/employee", async (req, res) => {
    try {
      const val = await employee.validateAsync(req.body);
      res.status(200).send({ message: "Validation successful", data: val });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });