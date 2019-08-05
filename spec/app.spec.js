process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const request = require("supertest");
const connection = require("../db/connection");
const app = require("../app");