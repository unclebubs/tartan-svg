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
      threadCount='CW8 G60 K2 G2 K2 G6 K24 DB20 R/6'
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
| threadCount | string | The tartan threadcount. See [below](#thread-count) for expected formats |
| colourPalette | string | The tartan colour palette. See [below](#color-palette) for expected formats|
| imageSize | number | The display size of the image. Both height and width are fixed at this size. Defaults to 500 |
| noOfSetts | number | The number of setts to display in the image. Defaults to 1. |
| xOffsetThreadCount | number | The number of threads to offset in the x direction Defaults to 0.|
| yOffsetThreadCount | number | The number of threads to offset in the y direction. Defaults to 0. |


## About Tartans
Tartans are a traditional textile pattern characterized by crisscrossed horizontal and vertical bands in multiple colors. Historically, tartans are associated with Scottish heritage and are used to represent different clans, families, and regions. Each unique tartan pattern is defined by its specific sequence of colors and thread counts, creating the distinct checks and stripes that are visually recognizable. Tartans are woven to a precise design specification to maintain consistency in their appearance, which is crucial for their cultural and symbolic significance.

## Threadcount
```
'CW8 G60 K2 G2 K2 G6 K24 DB20 R/6' //Threadcount for Hunting McDonald Of The Isles
```
The threadcount of a tartan is a detailed notation that specifies the sequence and number of threads for each color in the design. This sequence dictates the pattern's appearance when woven. Each thread in the threadcount is compromised of one or more uppercase letters (the colour code) followed by a number representing the thread numbers. 

**Color Codes:** These are typically single letters or abbreviations representing each color in the tartan. For example, "K" might stand for black, "R" for red, "CW" for clear white, and "G" for green.

**Thread Numbers:** The number following each color code specifies how many threads of that color are to be woven in sequence. In the example above there are 8 clear white threads, followed by 60 green threads, 2 black  threads, 2 green threads, and so on.
The sequence of colors and thread numbers is then repeated creating the full tartan pattern. The last thread in the threadcount denotes how the pattern is repeated. In the above example the last thread has a '/' between the colour code and the thread number. This means that the pattern should be repeated by going backwards through the threadcount until it reaches the first thread. This is know as a half sett. If the last token in the threadcount doesn't have a '/' it is know as a full sett and once the end is reached the pattern simply starts from the first token again

## Colour Palette
```
'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;'  ////Colour palette for Hunting McDonald Of The Isles
```
The colour palette is a string that defines the specific shades of colors used in the tartan design. Each color in the threadcount corresponds to an entry in the color palette, ensuring that the correct hues are used in the pattern. The palette is usually represented as a list of color codes and their corresponding hexadecimal color values. For example:

"G" (green) is defined as #006818,
"K" (black) is defined as #101010,
"CW" (clear) is defined as #FCFCFC,
"DB" (dark blue) is defined as #202060,
"R" (red) is defined as #C80000.

When creating the SVG representation of the tartan, the threadcount sequence is matched with these color codes to ensure that each section of the pattern is rendered with the correct color. This system allows for precise and consistent reproduction of tartan designs, maintaining their traditional and aesthetic integrity.

## Full sett v Half sett tartans
Once a tartan threadcount has been rendered the next step is to repeat the pattern. How this attern is repeated is decided on whether the threadcount is full sett of half sett. With a full sett tartan the threadcount will be repeated fromt he start again. While half sett tartans will then be rendered in reverse working back to the start. Half sett tartans are denoted using a backslash between the colour code and thread number as in the example above. To specify a full sett just omit the backslash


## License

[MIT](https://github.com/unclebubs/react-easy-crop/blob/master/LICENSE)
