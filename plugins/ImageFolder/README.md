# ImageFolder

This is a [BetterDiscord](https://betterdiscord.app/) plugin that adds a new tab to the expression picker window that makes it easy to store and send images.

![Preview](./images/preview.png)

## Usage

With this plugin installed, a new button will appear on the right of the text box, and a new tab will appear in the expression picker window. Within it, you can add images from elsewhere on your computer. You can also create folders within the tab to organize your images. Clicking on an image will upload it to the current channel.

If you right click an image, a menu will pop up that lets you (among other things) send the image with a caption of your choosing.

## Configuration

Right now there's only one setting, which is to re-render the images you're sending as a png. This is on by default, since discord can't display some image formats, such as animated WebP and AVIF. While this does strip any animations, it's better than just sending a download. You can turn this off in the settings.