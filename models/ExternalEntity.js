const uuid = require('uuid')

class ExternalEntity {
  constructor(name, description, socket) {
      this.ID = uuid.v4();
      this.name=name;
      this.description=description;
      this.socket=socket;
  };
};

module.exports = ExternalEntity
