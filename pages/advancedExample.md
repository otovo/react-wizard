---

name: Advanced example

---
import { Playground, PropsTable } from 'docz';

import WizardExample from './components/WizardExample';

# Losen, reinvented 🚢


## Todo

- [ ] Add support for WIZARD_COMPLETE 
Re-implement `statemanager` support:
- [ ] `updateStep()`
- [ ] `getActiveStep()`
- [ ] `getItem()`
- [ ] `setItem()`


## Example 

This example uses async validation for step 2 and 3. Use the debug panel to tweak settings

<WizardExample />

---

## Test

- [ ] Test performance (remove unnecessary renders)
- [ ] Test nested Wizards – does it even  work?

## Feature, or bug?

- [ ] First step is not skippable (initially)
