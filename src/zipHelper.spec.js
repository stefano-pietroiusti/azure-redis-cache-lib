const expect = require('chai').expect;
const { zip, unzip } = require('./zipHelper');

describe('Will execute the tests for the zipHelper ', () => {
  it('Should test the zip command', async () => {
    const originalValue = 'Salgado';
    const expectedZippedValue = 'eJxTCk7MSU9MyVcCAA61AwA=';

    const zipped = await zip(originalValue);

    expect(zipped).to.equal(expectedZippedValue);
  });

  it('Should test the unzip command', async () => {
    const zippedString = 'eJxTCk7MSU9MyVcCAA61AwA=';
    const expectedUnzippedValue = 'Salgado';

    const unzipped = await unzip(zippedString);
    expect(unzipped).to.equal(JSON.stringify(expectedUnzippedValue));
  });
});
