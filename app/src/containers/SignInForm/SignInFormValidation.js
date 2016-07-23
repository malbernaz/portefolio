import { createValidator, required, email } from '../../helpers/validation'

export default createValidator({ email: [required, email], password: required })
