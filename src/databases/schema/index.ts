import { appSchema } from '@nozbe/watermelondb'

import { userSchema } from './user-schema'
import { carSchema } from './car-schema'

const schemas = appSchema({
  version: 3,
  tables: [userSchema, carSchema],
})

export { schemas }
