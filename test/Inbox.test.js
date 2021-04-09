const assert = require("assert");
const ganache = require("ganache-cli");
// constructor
const Web3 = require("web3");
// new instance and to connect it to ganache
const web3 = new Web3(ganache.provider());

const {abi, bytecode} = require("../compile");

// set global variables
let accounts;
let inbox;
const INITIAL_STRING = "Hi there!"

beforeEach(async () => {
    // Get a list of all unlocked accounts for testing purposes
    accounts = await web3.eth.getAccounts();

    // Use one of these accounts to deploy a contract
    inbox = await new web3.eth.Contract((abi))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING]})
    .send({ from: accounts[0], gas: "1000000"})


});

describe("Inbox", () => {
    it("deploys a contract", () => {
        // this checks if the inbox contract gets assigned an address
        // assert.ok() checks if the value is not null
        assert.ok(inbox.options.address);
    });
    // the method is async because we need to wait to retreive the data from the contract
    it("has a default message", async () => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, INITIAL_STRING)

    });
    // to change something in the contract we need to specify in the send() 
    // the address where the change is coming from and the cost for the transaction
    it("can change the message", async() => {
        await inbox.methods.setMessage("Hola dude!").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, "Hola dude!")
    })
})