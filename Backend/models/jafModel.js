const mongoose = require("mongoose");

var admin = mongoose.Schema({
  dof: String,
  orgName: String,
  website: String,
  aboutOrg: String,
  postalAddress: String,
  category: String,
  industrySector: String,
  contact: {
    headHR: {
      name: String,
      email: String,
      mobile: String,
      landline: String,
    },
    firstContactPerson: {
      name: String,
      email: String,
      mobile: String,
      landline: String,
    },
  },
  jobProfile: {
    jobOffer: String,
    selectionProcess: String,
    eligibleBatches: Array,
  },
  programs: {
    bTech: Array,
  },
  bTech: {
    jobDesignation: String,
    jobDescription: String,
    jobLocation: String,
    CTC: String,
    gross: String,
    takeHome: String,
    bonus: String,
    contract: String,
    relocationBonus: String,
  },
  salary: {
    renumeration: String,
  },
  selectionProcess: {
    mode: String,
    rounds: String,
    eligibility: String,
    pov: String,
    preferredLocation: String,
    offers: String,
  },
  logisticalDetails: {
    members: String,
    rooms: String,
    days: String,
  },
  otherRequirements: String,
});

module.exports = mongoose.model("jafDetails", admin);
