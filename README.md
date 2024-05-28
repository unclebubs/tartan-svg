# tartan-svg

> A react component to create tartan svg images from a tartan's threadcount and colour palette.

## Install
if u=you are using npm install using
```
npm install tartan-svg 
```
or if you are using yarn use
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

![demo png](https://github.com/unclububs/tartan-svg/images/master/macdonald-tartan.png)


## API

### License
