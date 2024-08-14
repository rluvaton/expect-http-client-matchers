#/usr/bin/bash

( cd expect-all-type-tests ; npm i )
( cd expect-partial-type-tests ; npm i )

( cd jest-all-type-tests ; npm i )
( cd jest-partial-type-tests ; npm i )

( cd vitest-all-type-tests ; npm i )
( cd vitest-partial-type-tests ; npm i )