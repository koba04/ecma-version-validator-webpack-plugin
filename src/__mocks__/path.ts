const mockPath = jest.createMockFromModule<any>("path");

mockPath.resolve = (...paths: string[]) => {
  return ["/home/dummy", ...paths].join("/");
};

module.exports = mockPath;
