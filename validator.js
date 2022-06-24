module.exports.isValidString = (value) => typeof value === 'string' && value.trim().length>0;
module.exports.isValid = (value) => value !== null || typeof value !== 'undefinded'
module.exports.isValidObject = (obj) => Object.keys(obj).length>0;

module.exports.isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email); 




// if(!a.todo||a.todo.trim().length==0||typeof a.todo!== "string"){        
//     response.success=false;
//     response.code=400;
//     response.message="Todo feild required";
//     response.error="Todo feild is required ";
//     return res.status(400).json(response)
// }
// const isValidBody=Object.keys(b).length;

