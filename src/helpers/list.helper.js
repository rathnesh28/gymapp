function makeList(rows, valueKey, labelKey) {
    return rows.map((row) => ({
        value: row[valueKey],
        label: row[labelKey]
    }));
}

module.exports = { makeList };
