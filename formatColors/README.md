# FormatColors
[Spicetify](https://github.com/khanhas/spicetify-cli) extension to convert the current colors defined in root to color.ini format
* For use by theme developers, click the button and it will open a popup model. Click on any of the text to select the full text, then right click and hit copy.

## Install
Copy `formatColors.js` into your [Spicetify](https://github.com/khanhas/spicetify-cli) extensions directory:
| **Platform** | **Path**                                                                            |
|------------|-----------------------------------------------------------------------------------|
| **Linux**      | `~/.config/spicetify/Extensions` or `$XDG_CONFIG_HOME/.config/spicetify/Extensions/` |
| **MacOS**      | `~/spicetify_data/Extensions` or `$SPICETIFY_CONFIG/Extensions`                      |
| **Windows**    | `%appdata%\spicetify\Extensions\`                                              |

After putting the extension file into the correct folder, run the following command to install the extension or install through marketplace:
```
spicetify config extensions formatColors.js
spicetify apply
```
Note: Using the `config` command to add the extension will always append the file name to the existing extensions list. It does not replace the whole key's value.

Or you can manually edit your `config-xpui.ini` file. Add your desired extension filenames in the extensions key, separated them by the | character.
Example:

```ini
[AdditionalOptions]
...
extensions = autoSkipExplicit.js|shuffle+.js|trashbin.js|formatColors.js
```

Then run:

```
spicetify apply
```

## Usage
Toggle in the Profile menu.

![Screenshot](https://raw.githubusercontent.com/CharlieS1103/spicetify-extensions/main/formatColors/formatColors.png)

## More
🌟 Like it? Gimme some love!    
[![Github Stars badge](https://img.shields.io/github/stars/CharlieS1103/spicetify-extensions?logo=github&style=social)](https://github.com/CharlieS1103/spicetify-extensions/)

If you find any bugs, please [create a new issue](https://github.com/CharlieS1103/spicetify-extensions/issues/new/choose) on the GitHub repo.    
![https://github.com/CharlieS1103/spicetify-extensions/issues](https://img.shields.io/github/issues/CharlieS1103/spicetify-extensions?logo=github)
