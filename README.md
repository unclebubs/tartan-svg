# tartan-svg

> A react component to create tartan svg images from a tartan's threadcount and colour palette.

## Install
if you are using npm install using
```
npm install tartan-svg 
```
or if you are using yarn 
```
yarn add tartan-svg
```

## Example Usage
```js
import TartanSVG from 'tartan-img';

function App () {
  return (
    <TartanSVG
      id='tartanImg'
      name='Hunting MacDonald of The Isles'
      threadCount='CW8G60K2G2K2G6K24DB20R/6'
      colourPalette='G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;'
      noOfSetts={1}
      imageSize={500}
      xOffsetThreadCount={0}
      yOffsetThreadCount={0}
      useBlur={false}
    />
  )
}

export default App;
```


![demo png](./images/macdonald-tartan.png?raw=true)


## API

| Parameter | Type | Description |
| --- | --- | --- |
| id | string | The id of the svg element |
| style | object | Custom styles to be used with the svg element |
| className | string | Custom class names to be used with the svg element |
| useBlur | boolean | Use an SVG blux filter over the image to provide a revel of realism. Defaults to false. |
| blurValue | number |  The level of bluring to be used bewteen 0 and 1. Defaults to 0
| name | string | The name of the tartan which is used as an SVG title element |
| threadCount | string | The tartan threadcount. See [below] (#Thread Count) for expected formats |
| colourPalette | string | The tartan colour palette. See [below] (#Colour Palette Count) for expected formats|
| imageSize | number | The display size of the image. Both height and width are fixed at this size. Defaults to 500 |
| noOfSetts | number | The number of setts to display in the image. Defaults to 1. |
| xOffsetThreadCount | number | The number of threads to offset in the x direction Defaults to 0.|
| yOffsetThreadCount | number | The number of threads to offset in the y direction. Defaults to 0. |

## Thread Count

Here is a bit about the thread count.

## Colour Palette

Here is  a bit about the colour palette


## License

[MIT](https://github.com/unclebubs/react-easy-crop/blob/master/LICENSE)
