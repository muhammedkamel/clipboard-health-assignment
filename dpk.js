const crypto = require("crypto");


const generateCandidateKey = (partitionKey = '0') => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = partitionKey;

  if (typeof candidate !== "string") candidate = JSON.stringify(candidate);

  if (candidate.length < MAX_PARTITION_KEY_LENGTH) return candidate

  return crypto.createHash("sha3-512").update(candidate).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  if (event && event.partitionKey) return generateCandidateKey(event.partitionKey)

  return generateCandidateKey(JSON.stringify(event))
};

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };