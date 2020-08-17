# Slugify

There is nothing special here. I've just made this for own usage and my co-workers asked for this so,

It copies your files as slug-friendly.

## There are 3 options

- '-t', '--target' to give the target folder/file to fix

- '-d', '--destination' to give to destination folder

- '--debug' consoles to file names.

### Usage

- To use it u can install globally ` $ npm install -g @halilcakar/slugify ` and then:
  - ` $ slugify -t icons -d fixed-icons `
  - ` $ slugify --target=icons ` with out destination it's gonna create a icons-fix folder on the same directory
  - ` $ slugify icons ` it's gonna get icons as target file and create destination it self
  - ` $ slugify --target=icons --debug ` same old same with target also consoles file names.
