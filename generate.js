module.exports = function () {
  const { faker } = require("@faker-js/faker");
  const _ = require("lodash");
  return {
    employees:_.times(20,function(n){
        return {
            id:n+1,
            username:faker.random.alphaNumeric(7),
            password:faker.internet.password(10),
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            address:faker.address.city()+"-"+faker.address.street(),
            email:faker.internet.email(),
            age:faker.datatype.number({ min:23,max:50 }),
            role:faker.helpers.arrayElement(['securityman', 'employee']),
            isconfirmed: faker.datatype.boolean(),
            avatar:faker.internet.avatar()
        }
    })
  }
};
