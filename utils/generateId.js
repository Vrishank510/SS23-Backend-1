const Registration = require("../models/Registration");

// Function to generate a unique ID of size 6
function generateUniqueId() {
const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let uniqueId = '';
for (let i = 0; i < 6; i++) {
    uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
}
return `SS23${uniqueId}`;
}

// Check for collisions with the referralId field in the MongoDB Registrations model
async function checkCollision(uniqueId) {
    const result = await Registration.findOne({ uniqueId: uniqueId });
    if (result) {
        return true;
    } else {
        return false;
    }
}

// Generate a unique ID and check for collisions
async function generateUniqueIdAndCheck() {
    let newId = generateUniqueId();
    let collision = await checkCollision(newId);
    while (collision) {
        newId = generateUniqueId();
        collision = await checkCollision(newId);
    }
    return newId;
}

module.exports = generateUniqueIdAndCheck;

