import { appSchema } from '@nozbe/watermelondb'

import { userSchema } from './user-schema'

const schemas = appSchema({
  version: 2,
  tables: [userSchema],
})

export { schemas }
