import { Canvas, LinearGradient, Rect, vec} from '@shopify/react-native-skia'
import { Dimensions, StyleSheet } from 'react-native'
import { Palette } from "./palette"

const { width, height } = Dimensions.get('screen')

export function Background(){
    return (
        <Canvas style={styles.background}>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
        >
          <LinearGradient
            start={vec(0,0)}
            end={vec(width, height)}
            colors={[Palette.midNightGreen, Palette.pacificCyan]}
          />
        </Rect>
      </Canvas>
    )
}

const styles = StyleSheet.create({
    background: {
      zIndex: -1, 
      width: "100%", 
      height: "100%", 
      position: 'absolute'
    }
  });