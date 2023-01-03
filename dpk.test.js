const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('returns raw partition key if length is lower than 256', () => {
    const partitionKey = 'Tasneem'

    const candidateKey = deterministicPartitionKey({ partitionKey })

    expect(candidateKey).toBe(partitionKey)
  })

  it('returns encrypted partition id if the partition id length is more than 256', () => {
    const partitionKey = 'T'.repeat(257)

    const candidateKey = deterministicPartitionKey({ partitionKey })

    expect(candidateKey).not.toBe(partitionKey)

    const encryptedPK = crypto.createHash('sha3-512').update(partitionKey).digest('hex')

    expect(candidateKey).toBe(encryptedPK)
  })

  it('returns raw stringified partition key if the length is lower than 256', () => {
    const partitionKey = { name: 'Tasneem', relationship: 'daughter' }

    const candidateKey = deterministicPartitionKey({ partitionKey })

    expect(candidateKey).not.toEqual(partitionKey)
    expect(candidateKey).toBe(JSON.stringify(partitionKey))
  })

  it('returns raw stringified number partition key if the length is lower than 256', () => {
    const partitionKey = 5

    const candidateKey = deterministicPartitionKey({ partitionKey })

    expect(candidateKey).not.toEqual(partitionKey)
    expect(candidateKey).toBe(JSON.stringify(partitionKey))
  })

  it('returns encrypted partition key if the length is more than 256', () => {
    const partitionKey = { name: 'T'.repeat(257), relationship: 'daughter' }

    const candidateKey = deterministicPartitionKey({ partitionKey })

    expect(candidateKey).not.toEqual(partitionKey)

    const encryptedPK = crypto.createHash('sha3-512').update(JSON.stringify(partitionKey)).digest('hex')

    expect(candidateKey).toBe(encryptedPK)
  })

  it('returns encrypted event if there is no partition key', () => {
    const event = { name: 'Tasneem', relationship: 'daughter' }

    const candidateKey = deterministicPartitionKey(event)

    expect(candidateKey).not.toEqual(event)

    const encryptedPK = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')

    expect(candidateKey).toBe(encryptedPK)
  })

  it('returns encrypted event if it is a string', () => {
    const event = 'Tasneem'

    const candidateKey = deterministicPartitionKey(event)

    expect(candidateKey).not.toEqual(event)

    const encryptedPK = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')

    expect(candidateKey).toBe(encryptedPK)
  })

  it('returns encrypted event if it is a number', () => {
    const event = 5

    const candidateKey = deterministicPartitionKey(event)

    expect(candidateKey).not.toEqual(event)

    const encryptedPK = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')

    expect(candidateKey).toBe(encryptedPK)
  })
});
