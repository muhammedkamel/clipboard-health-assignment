const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('returns raw partition key if length is lower than 256')

  it('returns encrypted partition id if the partition id length is more than 256')

  it('returns raw stringified partition key if the length is lower than 256')

  it('returns encrypted partition key if the length is more than 256')

  it('returns encrypted event if there is no partition key')
});
