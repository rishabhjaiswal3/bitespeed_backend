const {connectDB} = require('./Database/connection');
const {insertUser} = require('./Database/insert');
const {getUsersByEmailOrPhoneNumber} = require('./Database/find');
const {updateUserLinkPrecedenceAndLinkedId} = require('./Database/update')

let db = null;

const DBCreation = () => {
    try {
        db = connectDB();
    }
    catch(e) {
        console.log("facing error in service while DB creation")
    }
}

const insertion = async (email,phoneNumber) => {

    if(!db){
        DBCreation();
    }
    try {

        let linkPrecedence = 'primary';
        let linkedId = null;

        const data = await getUsersByEmailOrPhoneNumber(db,email,phoneNumber);  

        if(data?.length > 0) {

            let primiaryData = data[0];
            linkPrecedence = 'secondary';
            linkedId = primiaryData?.id;
    
            data.forEach(user => {
                if(user?.id != linkedId) {
                    if(user?.linkPrecedence != linkPrecedence || user?.linkedId != linkedId) 
                    {
                        updateUserLinkPrecedenceAndLinkedId(db,user?.id,linkPrecedence,linkedId);
                    }
                }
            });
        }
        let user = {
            phoneNumber: phoneNumber,
            email: email,
            linkedId,
            linkPrecedence,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        await insertUser(db,user);

        let contact = {
            "primaryContatctId":null,
            "emails": [], 
            "phoneNumbers": [], // first element being phoneNumber of primary conta
            "secondaryContactIds": [] // Array of all Contact IDs that are "seconda
        }
        const newData = await getUsersByEmailOrPhoneNumber(db,email,phoneNumber);
        newData.forEach(user => {
            if(newData[0]?.id == user?.id) {
                contact.primaryContatctId = user?.id;
                contact.emails.push(user?.email);
                contact.phoneNumbers.push(user?.phoneNumber);
            }
            else {
                if(!contact.emails.includes(user?.email))
                    contact.emails.push(user?.email);
                if(!contact.phoneNumbers.includes(user?.phoneNumber))
                    contact.phoneNumbers.push(user?.phoneNumber);
                contact.secondaryContactIds.push(user?.id);
            }
        })

        return {"contact":contact,"orders":newData};
    }
    catch (e) {
        console.log("service error is ",e)
    }  
}

module.exports = {
    DBCreation,
    insertion
}