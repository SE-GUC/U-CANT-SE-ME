/**
 * @jest-environment node
 */
const funcs = require('./externalEntities');
const ExternalEntity = require("../models/ExternalEntity");
this.sharedState = {
  _id: null,
  name: null,
  description: null,
  socket: null,
}

test('Create External Entity', async () => {
  expect.assertions(1);
  const body = {
    name: "test with jest",
    description: "test desc",
    socket: "test socket"
  }
  const extEntity=await funcs.createExternalEntity(body);
  //const extEntity = await ExternalEntity.findOne(body).exec();
  expect(extEntity.data.data).toMatchObject(body);
  this.sharedState._id=extEntity.data.data._id;
  this.sharedState.name=extEntity.data.data.name;
  this.sharedState.description=extEntity.data.data.description;
  this.sharedState.socket=extEntity.data.data.socket;
});

test('Get all External Entities', async () => {
  expect.assertions(1);
  const response =  await funcs.getExernalEntities();
  expect(response.data.data[response.data.data.length-1].name).toEqual('test with jest');
});

test('Get Specific External Entity', async () => {
  expect.assertions(1);
  const response =  await funcs.getSpecificExternalEntity(this.sharedState._id);
  expect(response.data.data).toMatchObject(this.sharedState);
});

test('Update External Entity', async () => {
  const body = {
    name: "updated jest name",
    description: "updated jest desc"
  }
  expect.assertions(3);
  const response =  await funcs.updateExternalEntity(this.sharedState._id,body);
  expect(body.name).toEqual(response.data.data.name);
  expect(body.description).toEqual(response.data.data.description);
  expect(this.sharedState.socket).toEqual(response.data.data.socket);
  this.sharedState.name=body.name;
  this.sharedState.description=body.description;
});

test('Delete External Entity', async () => {
  jest.setTimeout(1000);
  expect.assertions(1);
  const extEntity = await funcs.deleteExternalEntity(this.sharedState._id);
  //const extEntity = await ExternalEntity.findById(this.sharedState._id);
  const allExtEnt =  await funcs.getExernalEntities();
  expect(allExtEnt.data.data).not.toContain(extEntity.data.data);
});
