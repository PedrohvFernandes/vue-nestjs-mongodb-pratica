import { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'

// Coloque "resolveJsonModule": true, no tsconfig.json
import { compilerOptions } from './tsconfig.paths.json'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
}

export default config
