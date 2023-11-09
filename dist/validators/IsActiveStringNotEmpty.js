"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsActiveStringNotEmpty = void 0;
const class_validator_1 = require("class-validator");
function IsActiveStringNotEmpty(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsActiveStringNotEmpty',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if (!relatedValue || typeof relatedValue !== 'boolean')
                        return true;
                    return (value &&
                        typeof value === 'string' &&
                        typeof relatedValue === 'boolean' &&
                        relatedValue);
                },
            },
        });
    };
}
exports.IsActiveStringNotEmpty = IsActiveStringNotEmpty;
//# sourceMappingURL=IsActiveStringNotEmpty.js.map