const generateSqlSets = (data) => {
  let sqlSets = "";

  const keys = Object.keys(data);

  keys.forEach((key, index) => {
    sqlSets += `${key} = ?`;
    sqlSets += index !== keys.length - 1 ? ", " : "";
  });

  return sqlSets;
};

module.exports = generateSqlSets;
