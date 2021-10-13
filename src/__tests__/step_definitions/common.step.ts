/* eslint-disable no-invalid-this */

import {AWholeNewWorld} from '__tests__/world'
import {Then} from '@cucumber/cucumber'
import assert from 'assert'

Then<AWholeNewWorld>(
    'we get a response with a message saying {string}',
    function(string) {
      assert.equal(
          this.lot.message,
          string
      )
    }
)
