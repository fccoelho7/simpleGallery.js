# simpleGallery.js

> Easy gallery upload. Native. Just 2kb gzipped.

## Why

Upload, surely, is a hard part in programming, probably you have had problems with that. Why not simplify? No frameworks, just 2kb gzipped!

**Working**

![Upload Images](http://i.imgur.com/Yjor77e.gif)

![Change Value](http://i.imgur.com/PsR0F24.gif)

## Flow

When you send images and is returned a JSON data, it is saved in hidden input value. Same occurs when you edit title, reorder and remove images. After all actions, you just need to save that JSON in your database submitting the form.

## Dependencies

To reorder gallery, is required [Sortable](https://github.com/RubaXa/Sortable), "a minimalist JavaScript library".

## Install

You can get it on npm.

```
npm install simple-gallery-js --save-dev
```

Or bower, too.

```
bower install simple-gallery-js --save-dev
```

If you're not into package management, just [download a ZIP](https://github.com/fccoelho7/simpleGallery.js/archive/master.zip) file.

## Setup

First, include the script located on the `dist` folder.

```html
<script src="dist/simple-gallery.min.js"></script>
```

Now, you need to instantiate it.

```js
new SimpleGallery('.form-upload');
```

# Usage

When you upload images, your server needs to return a JSON data like:

```json
  [{ "url": "http://../image1.jpg" }, { "url": "http://../image2.jpg" }, ..]
```

Every data will be saved into a value of any hidden input, by default:

```html
  <input type="hidden" name="gallery">
```

Lastly, you also need to create a div that will contain the gallery.

```html
  <div class="gallery-container"></div>
```

If you are not happy with default, change it!

```js
// 1. Form container.
// 2. Name of hidden input that will receive gallery data.
// 3. Gallery container.

new SimpleGallery('.form-upload', 'gallery', '.gallery-container');
```

## Cheat

```html
<form class="form-upload" action="/" method="POST" enctype="multipart/form-data">
  <input type="hidden" name="gallery">
  <label>Image Gallery</label>
  <div class="input-upload btn">
    Upload
    <input class="upload" type="file" multiple="multiple" accept="image/*">
  </div>
  <div class="gallery-container"></div>
</form>
```

## Advanced Options

If you don't want use same URL for upload images, add a `data-action-gallery`.

```html
<form class="form-upload" action="/" method="POST" data-action-gallery='/upload' enctype="multipart/form-data"></form>
```

## Browser Support

| Chrome | Firefox | IE | Opera | Safari |
|:---:|:---:|:---:|:---:|:---:|
| 29+ ✔ | 46+ ✔ | 11+ ✔ | Nope ✘ | 9.1+ ✘ |

## License

MIT LICENSE

Copyright 2016-2016 Fabio Carvalho fccoelho7@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
