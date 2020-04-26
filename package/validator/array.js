/**
 * @param {{}} schema
 * @returns {{message: string, field: string}[]}
 */
export default function (schema) {
  const validationUtils = {
    isNeedToCheckMinItems () {
      return (
        schema &&
        Array.isArray(schema.items) &&
        typeof schema.minItems === 'number'
      )
    },

    isNeedToCheckMaxItems () {
      return (
        schema &&
        Array.isArray(schema.items) &&
        typeof schema.maxItems === 'number'
      )
    },

    isLtMinItems () {
      if (
        validationUtils.isNeedToCheckMinItems() &&
        schema.items.length < schema.minItems
      ) {
        return true
      }
      return false
    },

    isGtMaxItems () {
      if (
        validationUtils.isNeedToCheckMaxItems() &&
        schema.items.length > schema.maxItems
      ) {
        return true
      }
      return false
    }
  }

  const errors = []

  if (validationUtils.isLtMinItems()) {
    errors.push({
      message: `Element must be >= ${schema.minItems}`
    })
  }
  if (validationUtils.isGtMaxItems()) {
    errors.push({
      message: `Element must be <= ${schema.maxItems}`
    })
  }

  if (errors.length > 0) {
    return errors.map(item => ({ ...item, field: schema.prop }))
  }

  return []
}
