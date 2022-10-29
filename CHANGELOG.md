# Change Log

All notable changes to this project will be documented in this file
## [Unreleased] - yyyy-mm-dd
- Ability to copy token.
- Delete button inside the edit page.


## [1.1.0] - 2022-10-29

### Added
- Different manifest files for different manifest version and combining them with webpack.
- Webpack build and dev for manifest v2 and v3
- Extension made working for manifest version 3

### Changed
- All logout button in the Swagger Auth UI will be clicked. So when multiple "Authorize" or "Logout" button is present (like in the petstore.swagger.io), the apply script will work properly.
- Output directory changed, now manifest v2 will be outputted to dist/manifest-v2 directory, and similar changes for v3 manifest.
- Lint now uses the typescript lint instead of the basic javascript lint.

## [1.0.0] - 2022-10-27

### Added
- Ability to add new profile
- Ability to edit profiles
- Ability to apply token in Swagger UI
- Ability to delete token


<!-- Types of changes

    Added for new features.
    Changed for changes in existing functionality.
    Deprecated for soon-to-be removed features.
    Removed for now removed features.
    Fixed for any bug fixes.
    Security in case of vulnerabilities. -->
