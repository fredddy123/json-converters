function getType(item) {
    if (Array.isArray(item)) {
        return 'array';
    }

    if (item === null) {
        return 'null';
    }

    return typeof item;
}

function generateJsonSchemaFromJson(json) {
    if (getType(json) === 'object') {
        return {
            type: 'object',
            properties: Object.keys(json).reduce((obj, key) => {
                return Object.assign(obj, {
                    [key]: generateJsonSchemaFromJson(json[key])
                });
            }, {})
        }
    }

    if (getType(json) === 'array') {
        return {
            type: 'array',
            items: json[0] ? generateJsonSchemaFromJson(json[0]) : undefined
        }
    }

    if (getType(json) === 'null') {
        return {
            type: 'object',
            properties: {}
        };
    }

    return {
        type: getType(json)
    }
}
