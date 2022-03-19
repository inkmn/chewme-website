enum OptionalType {
  OPTIONS_BREED_SIZE = 'OPTIONS_BREED_SIZE',
  OPTIONS_CHEWMETER = 'OPTIONS_CHEWMETER',
  OPTIONS_FLAVOR = 'OPTIONS_FLAVOR',
}

export interface OptionalItem {
  id: string
  name: string
}

export interface OptionalInterface {
  code: OptionalType
  name: string
  optionals: OptionalItem[]
}

export default OptionalInterface
