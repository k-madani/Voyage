/**
 * user schema
 *
 */
export const userSchema = {
    'id': '/userSchema',
    'type': 'object',
    'properties': {
        'firstName': {
            'type': 'string',
            'minLength': 1
        },
        'lastName': {
            'type': 'string',
            'minLength': 1
        },
        'email': {
            'type': 'string',
            'minLength': 1
        },
        'currentPassword': {
            'type': 'string',
            'minLength': 8,
            'maxLength': 15
        },
        'previousPasswords': {
            'type': 'array',
            'items': {
                'type': 'string',
                'minLength': 8,
                'maxLength': 15
            }
        },
        'contact': {
            'type': 'string',
            'minLength': 10,
            'maxLength': 10
        },
        'userType': {
            'type': 'string',
            'minLength': 1,
            'enum': ['voyager', 'adventurer']
        },
        'milePoints': {
            'type': 'string'

        }
    },
    'required': ['userType', 'firstName', 'lastName', 'currentPassword', 'contact', 'milePoints', 'email']
}

/**
 * offers schema
 *
 */
export const offerSchema = {
    'id': '/offerSchema',
    'type': 'object',
    'properties': {
        'offerName': {
            'type': 'string',
            'minLength': 1
        },
        'offerValue': {
            'type': 'string',
            'minLength': 1
        },
        'userType': {
            'type': 'string',
            'minLength': 1,
            'enum': ['voyager', 'adventurer']
        }
    },
    'required': ['offerName', 'offerValue', 'userType']
}