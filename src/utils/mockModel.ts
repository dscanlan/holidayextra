const MockModel = mockJson => {
  const Model = jest.fn().mockImplementation(args => ({
    ...args,
    save: () => Promise.resolve(args)
  }));
  Object.assign(Model, {
    findOne: (args: any) => {
      const found = [mockJson].filter(item =>
        Object.keys(args).every(key => item[key] === args[key])
      );
      if (found.length > 0) {
        return {
          ...found[0],
          save: () => {
            console.log("this", this.default());
            return Promise.resolve({ ...this });
          }
        };
      }
      return null;
    }
  });
  return Model;
};

export default MockModel;
